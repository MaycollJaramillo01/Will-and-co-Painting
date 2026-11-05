import { z } from "zod";

// The contact page posts the visitor's site journey here while they use the
// Jobber form. Once a request shows up in Jobber during that visit, the
// journey is added to it as a pinned note, once per request.
const marker = "Website visit before this request";
const graphqlVersion = "2026-05-12";
const userAgent = "WilAndCoWebsite/1.0";
const maxWindowMs = 2 * 60 * 60 * 1000;

const text = z.string().max(300);
const bodySchema = z.object({
  since: z.number().int(),
  journey: z.object({
    source: z
      .object({ t: z.number().int(), landing: text, referrer: text })
      .optional(),
    events: z
      .array(
        z.object({
          t: z.number().int(),
          e: z.enum(["view", "call", "whatsapp", "form-new-tab"]),
          p: text,
        }),
      )
      .max(60),
  }),
});
type Journey = z.infer<typeof bodySchema>["journey"];

const time = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});
const labels = {
  view: "Viewed",
  call: "Tapped Call on",
  whatsapp: "Tapped WhatsApp on",
  "form-new-tab": "Opened the form in a new tab from",
};

function renderNote(journey: Journey) {
  const lines = [`${marker} (reported by the visitor's browser):`];
  const { source } = journey;
  if (source) {
    lines.push(
      `Arrived ${time.format(source.t)} from ${source.referrer || "a direct visit"}, landing on ${source.landing}`,
    );
  }
  for (const event of journey.events) {
    lines.push(`${time.format(event.t)} - ${labels[event.e]} ${event.p}`);
  }
  return lines.join("\n");
}

async function jobber(
  accessToken: string,
  query: string,
  variables: object,
): Promise<Record<string, unknown>> {
  const response = await fetch("https://api.getjobber.com/api/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "User-Agent": userAgent,
      "X-JOBBER-GRAPHQL-VERSION": graphqlVersion,
    },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(10_000),
  });
  const result = await response.json();
  if (!response.ok || result.errors) {
    throw new Error(
      `Jobber API ${response.status}: ${JSON.stringify(result.errors ?? result).slice(0, 300)}`,
    );
  }
  return result.data;
}

const requestsQuery = `
  query RecentRequests($filter: RequestFilterAttributes) {
    requests(first: 10, filter: $filter) {
      nodes {
        id
        notes { nodes { ... on RequestNote { message } } }
      }
    }
  }
`;
const noteMutation = `
  mutation AddJourney($requestId: EncodedId!, $input: RequestCreateNoteInput!) {
    requestCreateNote(requestId: $requestId, input: $input) {
      requestNote { id }
      userErrors { message }
    }
  }
`;

type RecentRequests = {
  requests: {
    nodes: { id: string; notes: { nodes: { message?: string }[] } }[];
  };
};

export async function POST(request: Request) {
  const clientId = process.env.JOBBER_CLIENT_ID;
  const clientSecret = process.env.JOBBER_CLIENT_SECRET;
  const refreshToken = process.env.JOBBER_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    return Response.json({ requestId: null }, { status: 503 });
  }

  const raw = await request.text();
  let parsed;
  try {
    parsed = raw.length <= 20_000 && bodySchema.safeParse(JSON.parse(raw));
  } catch {}
  const now = Date.now();
  if (
    !parsed ||
    !parsed.success ||
    parsed.data.since > now + 60_000 ||
    parsed.data.since < now - maxWindowMs
  ) {
    return Response.json({ requestId: null }, { status: 400 });
  }
  const { since, journey } = parsed.data;

  try {
    // ponytail: refreshes on every call, fine for a few leads a day. Needs
    // refresh token rotation OFF, or the stored token dies on first use.
    const tokenResponse = await fetch(
      "https://api.getjobber.com/api/oauth/token",
      {
        method: "POST",
        headers: { "User-Agent": userAgent, Accept: "application/json" },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
        signal: AbortSignal.timeout(10_000),
      },
    );
    // A rejected refresh comes back as plain text, not JSON.
    const tokenText = await tokenResponse.text();
    let token;
    try {
      token = JSON.parse(tokenText);
    } catch {}
    if (!tokenResponse.ok || typeof token?.access_token !== "string") {
      console.error(
        "Jobber token refresh rejected. If rotation is ON in the Jobber app, turn it OFF and reconnect.",
        tokenResponse.status,
        token
          ? (token.error_description ?? token.error)
          : tokenText.slice(0, 200),
      );
      return Response.json({ requestId: null }, { status: 502 });
    }
    if (token.refresh_token && token.refresh_token !== refreshToken) {
      console.warn(
        "Jobber rotated the refresh token, so JOBBER_REFRESH_TOKEN just stopped working. Turn rotation OFF in the Jobber app and reconnect.",
      );
    }

    const data = (await jobber(token.access_token, requestsQuery, {
      filter: {
        // Iso8601DateTimeRangeInput: both bounds inclusive.
        createdAt: {
          after: new Date(since - 60_000).toISOString(),
          before: new Date(now + 60_000).toISOString(),
        },
      },
    })) as RecentRequests;
    const pending = data.requests.nodes.filter(
      (node) =>
        !node.notes.nodes.some((note) => note.message?.startsWith(marker)),
    );
    // ponytail: two visitors sending requests in the same window is rare for
    // one painting company, so an ambiguous match is skipped, not guessed.
    if (pending.length !== 1) {
      if (pending.length > 1) {
        console.warn("Jobber journey skipped: several new requests match");
      }
      return Response.json({ requestId: null });
    }

    const requestId = pending[0].id;
    const created = (await jobber(token.access_token, noteMutation, {
      requestId,
      input: { message: renderNote(journey), pinned: true },
    })) as { requestCreateNote: { userErrors: { message: string }[] } };
    const errors = created.requestCreateNote.userErrors;
    if (errors.length > 0) {
      console.error("Jobber journey note rejected", errors);
      return Response.json({ requestId: null }, { status: 502 });
    }

    console.info("Jobber journey added to request", requestId);
    return Response.json({ requestId });
  } catch (error) {
    console.error("Jobber journey failed", error);
    return Response.json({ requestId: null }, { status: 502 });
  }
}

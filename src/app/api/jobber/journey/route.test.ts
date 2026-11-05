import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST } from "./route.ts";

process.env.JOBBER_CLIENT_ID = "client";
process.env.JOBBER_CLIENT_SECRET = "secret";
process.env.JOBBER_REFRESH_TOKEN = "refresh";

const realFetch = globalThis.fetch;
let notesCreated: { requestId: string; input: { message: string } }[];

function fakeJobber(requests: { id: string; notes: string[] }[]) {
  notesCreated = [];
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    if (url.endsWith("/oauth/token")) {
      return Response.json({
        access_token: "access",
        refresh_token: "refresh",
      });
    }
    const { query, variables } = JSON.parse(String(init.body));
    if (query.includes("requestCreateNote")) {
      notesCreated.push(variables);
      return Response.json({
        data: {
          requestCreateNote: { requestNote: { id: "note" }, userErrors: [] },
        },
      });
    }
    // Jobber rejects anything but after/before on Iso8601DateTimeRangeInput.
    assert.deepEqual(Object.keys(variables.filter.createdAt).sort(), [
      "after",
      "before",
    ]);
    return Response.json({
      data: {
        requests: {
          nodes: requests.map(({ id, notes }) => ({
            id,
            notes: { nodes: notes.map((message) => ({ message })) },
          })),
        },
      },
    });
  }) as typeof fetch;
}

beforeEach(() => fakeJobber([]));
afterEach(() => {
  globalThis.fetch = realFetch;
});

function send(body: unknown) {
  return POST(
    new Request("https://example.com/api/jobber/journey", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  );
}

const journey = {
  source: {
    t: Date.now() - 600_000,
    landing: "/services/interior-painting?gclid=abc",
    referrer: "www.google.com",
  },
  events: [
    { t: Date.now() - 500_000, e: "view", p: "/services/interior-painting" },
    { t: Date.now() - 400_000, e: "call", p: "/contact" },
  ],
};

test("adds the journey to the one new request and returns its ID", async () => {
  fakeJobber([{ id: "req-1", notes: [] }]);
  const response = await send({ since: Date.now() - 300_000, journey });
  assert.deepEqual(await response.json(), { requestId: "req-1" });
  assert.equal(notesCreated.length, 1);
  const message = notesCreated[0].input.message;
  assert.match(message, /^Website visit before this request/);
  assert.match(message, /from www\.google\.com, landing on .*gclid=abc/);
  assert.match(message, /Tapped Call on \/contact/);
});

test("never adds a second journey to the same request", async () => {
  fakeJobber([{ id: "req-1", notes: ["Website visit before this request…"] }]);
  const response = await send({ since: Date.now() - 300_000, journey });
  assert.deepEqual(await response.json(), { requestId: null });
  assert.equal(notesCreated.length, 0);
});

test("skips when no request or several requests match", async () => {
  assert.deepEqual(await (await send({ since: Date.now(), journey })).json(), {
    requestId: null,
  });
  fakeJobber([
    { id: "req-1", notes: [] },
    { id: "req-2", notes: [] },
  ]);
  assert.deepEqual(await (await send({ since: Date.now(), journey })).json(), {
    requestId: null,
  });
  assert.equal(notesCreated.length, 0);
});

test("rejects stale or malformed visits", async () => {
  const stale = await send({ since: Date.now() - 3 * 60 * 60 * 1000, journey });
  assert.equal(stale.status, 400);
  const bad = await send({ since: Date.now(), journey: { events: "x" } });
  assert.equal(bad.status, 400);
});

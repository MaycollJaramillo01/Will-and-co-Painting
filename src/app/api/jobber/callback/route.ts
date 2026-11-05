// OAuth redirect for the Jobber app. Jobber sends the account owner here with
// a one-time code after they approve the connection.
function text(body: string, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const clientId = process.env.JOBBER_CLIENT_ID;
  const clientSecret = process.env.JOBBER_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return text("Jobber is not configured on this site.", 503);
  }
  if (!code) {
    return text("Jobber did not send an authorization code.", 400);
  }

  try {
    const response = await fetch("https://api.getjobber.com/api/oauth/token", {
      method: "POST",
      // Jobber's Cloudflare can block Node's default "node" user agent.
      headers: {
        "User-Agent": "WilAndCoWebsite/1.0",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: `${url.origin}${url.pathname}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const raw = await response.text();
    let result;
    try {
      result = JSON.parse(raw);
    } catch {
      result = null;
    }
    if (!response.ok || typeof result?.refresh_token !== "string") {
      // Logs Jobber's OAuth error, or the start of a non-JSON page such as a
      // Cloudflare block. Never logs a JSON body, which could hold tokens.
      console.error(
        "Jobber token exchange rejected",
        response.status,
        result
          ? (result.error_description ?? result.error ?? "no refresh token")
          : raw.replace(/\s+/g, " ").slice(0, 200),
      );
      return text("Jobber rejected the connection. Try connecting again.", 502);
    }

    // ponytail: shown once instead of stored, the site has no database.
    // Needs refresh token rotation OFF so this token keeps working.
    return text(
      "Jobber is connected.\n\n" +
        "Save this refresh token in Vercel as JOBBER_REFRESH_TOKEN, then redeploy:\n\n" +
        `${result.refresh_token}\n`,
    );
  } catch (error) {
    console.error("Jobber token exchange could not reach Jobber", error);
    return text("Jobber could not be reached. Try connecting again.", 502);
  }
}

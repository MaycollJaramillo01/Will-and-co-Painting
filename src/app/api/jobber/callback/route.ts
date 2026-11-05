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
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: `${url.origin}${url.pathname}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const result = await response.json();
    if (!response.ok || typeof result.refresh_token !== "string") {
      console.error("Jobber token exchange rejected", response.status);
      return text("Jobber rejected the connection. Try connecting again.", 502);
    }

    // ponytail: shown once instead of stored, the site has no database.
    // Needs refresh token rotation OFF so this token keeps working.
    return text(
      "Jobber is connected.\n\n" +
        "Save this refresh token in Vercel as JOBBER_REFRESH_TOKEN, then redeploy:\n\n" +
        `${result.refresh_token}\n`,
    );
  } catch {
    console.error("Jobber token exchange could not reach Jobber");
    return text("Jobber could not be reached. Try connecting again.", 502);
  }
}

import { createHmac, timingSafeEqual } from "node:crypto";

// Jobber signs each webhook with a base64 HMAC-SHA256 of the raw body, keyed
// with the app's client secret, and expects a reply within 1 second.
export async function POST(request: Request) {
  const secret = process.env.JOBBER_CLIENT_SECRET;
  if (!secret) return new Response(null, { status: 503 });

  const body = await request.text();
  const given = Buffer.from(
    request.headers.get("x-jobber-hmac-sha256") ?? "",
    "base64",
  );
  const expected = createHmac("sha256", secret).update(body).digest();
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return new Response(null, { status: 401 });
  }

  let event;
  try {
    event = JSON.parse(body)?.data?.webHookEvent;
  } catch {
    return new Response(null, { status: 400 });
  }

  // Jobber delivers at least once, so the same itemId can arrive twice.
  if (event?.topic === "REQUEST_CREATE") {
    console.info("Jobber request created", event.itemId, event.occurredAt);
  }

  return new Response(null, { status: 200 });
}

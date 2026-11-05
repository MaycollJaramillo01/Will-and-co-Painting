import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { test } from "node:test";
import { POST } from "./route.ts";

process.env.JOBBER_CLIENT_SECRET = "test_secret_only";

const body = JSON.stringify({
  data: {
    webHookEvent: {
      topic: "REQUEST_CREATE",
      appId: "app",
      accountId: "account",
      itemId: "request-1",
      occurredAt: "2026-11-05T12:00:00-06:00",
    },
  },
});

function send(signature: string) {
  return POST(
    new Request("https://example.com/api/jobber/webhook", {
      method: "POST",
      headers: { "X-Jobber-Hmac-SHA256": signature },
      body,
    }),
  );
}

test("accepts a webhook signed with the client secret", async () => {
  const signature = createHmac("sha256", "test_secret_only")
    .update(body)
    .digest("base64");
  assert.equal((await send(signature)).status, 200);
});

test("rejects a missing or forged signature", async () => {
  const forged = createHmac("sha256", "wrong").update(body).digest("base64");
  assert.equal((await send("")).status, 401);
  assert.equal((await send(forged)).status, 401);
});

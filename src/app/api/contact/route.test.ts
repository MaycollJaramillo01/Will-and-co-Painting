import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST } from "./route.ts";
import { renderContactEmail } from "../../../lib/contact-email.ts";

const validRequest = {
  name: "Resend Test",
  email: "customer@example.com",
  phone: "",
  service: "Interior Painting",
  propertyType: "Residential",
  message: "This is a test quote request.",
  consent: true,
  website: "",
};
const envNames = [
  "RESEND_API_KEY",
  "CONTACT_FROM_EMAIL",
  "CONTACT_TO_EMAIL",
  "CONTACT_CC_EMAIL",
] as const;
let originalEnv: (string | undefined)[];

beforeEach(() => {
  originalEnv = envNames.map((name) => process.env[name]);
  process.env.RESEND_API_KEY = "re_test_only";
  process.env.CONTACT_FROM_EMAIL = "Quotes <quotes@example.com>";
  process.env.CONTACT_TO_EMAIL = "owner@example.com";
  process.env.CONTACT_CC_EMAIL = "reviewer@example.com";
});

afterEach(() => {
  envNames.forEach((name, index) => {
    if (originalEnv[index] === undefined) delete process.env[name];
    else process.env[name] = originalEnv[index];
  });
});

function request(body: unknown = validRequest) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("sends through Resend using server recipients and the customer's reply-to", async (t) => {
  const fetchMock = t.mock.method(
    globalThis,
    "fetch",
    async (_url: string | URL | Request, options?: RequestInit) => {
      const payload = JSON.parse(String(options?.body));
      assert.equal(_url, "https://api.resend.com/emails");
      assert.deepEqual(payload.to, ["owner@example.com"]);
      assert.deepEqual(payload.cc, ["reviewer@example.com"]);
      assert.equal(payload.from, "Quotes <quotes@example.com>");
      assert.equal(payload.reply_to, validRequest.email);
      assert.match(payload.text, /Resend Test/);
      assert.match(payload.html, /New quote request/);
      assert.match(payload.html, /mailto:customer%40example.com/);
      assert.match(payload.html, /logo-white.png/);
      assert.doesNotMatch(payload.html, /quote-header|New project\.|Let's get to work/);
      assert.match(payload.html, /font-family:'Manrope'/);
      assert.match(payload.html, /font-family:'Barlow Condensed'/);
      assert.deepEqual(
        payload.attachments.map(
          (attachment: { content_id: string }) => attachment.content_id,
        ),
        ["logo-white.png"],
      );
      assert.ok(payload.attachments[0].content.startsWith("iVBORw0KGgo"));
      assert.equal(
        (options?.headers as Record<string, string>).Authorization,
        "Bearer re_test_only",
      );
      return Response.json({ id: "test-email-id" });
    },
  );
  const response = await POST(
    request({ ...validRequest, to: "attacker@example.com" }),
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    success: true,
    id: "test-email-id",
  });
  assert.equal(fetchMock.mock.callCount(), 1);
});

test("escapes customer content in the HTML email and preserves message line breaks", () => {
  const { html, text } = renderContactEmail({
    ...validRequest,
    propertyType: "Residential",
    name: 'Taylor <img src=x onerror="alert(1)">',
    message: "Kitchen & living room\n<script>alert(1)</script>",
    phone: "+1 (608) 555-0147",
  });
  assert.ok(!html.includes("<img src=x"));
  assert.ok(!html.includes("<script>"));
  assert.match(html, /Kitchen &amp; living room<br \/>&lt;script&gt;/);
  assert.match(html, /href="tel:\+16085550147"/);
  assert.match(text, /Kitchen & living room\n<script>/);
});

test("omits the call action when no callable phone number is supplied", () => {
  const { html } = renderContactEmail({
    ...validRequest,
    propertyType: "Residential",
  });
  assert.ok(!html.includes('href="tel:'));
  assert.ok(!html.includes("Call client"));
  assert.match(html, /Phone number/);
  assert.match(html, /Not provided by the client/);
});

test("shows every client detail with explicit labels and the complete project message", () => {
  const details = {
    ...validRequest,
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 (608) 555-0147",
    service: "Residential Interior Painting",
    propertyType: "Commercial" as const,
    message: `${"Project details. ".repeat(100)}\nFINAL DETAIL: include the upstairs hallway.`,
  };
  const { html, text } = renderContactEmail(
    details,
    new Date("2026-10-12T18:15:00Z"),
  );
  for (const value of [
    details.name,
    details.email,
    details.phone,
    details.service,
    details.propertyType,
    details.message.split("\n")[1],
  ]) {
    assert.ok(html.includes(value), `HTML email is missing ${value}`);
    assert.ok(text.includes(value), `Plain text email is missing ${value}`);
  }
  for (const label of [
    "Full name",
    "Phone number",
    "Email address",
    "REQUESTED SERVICE",
    "Property type:",
    "PROJECT DETAILS / CLIENT MESSAGE",
    "Received:",
    "Contact consent:",
    "Source:",
  ]) {
    assert.ok(html.includes(label), `Missing field label: ${label}`);
  }
  assert.ok(html.includes(details.message.replace(/\n/g, "<br />")));
  assert.ok(text.includes(details.message));
  assert.match(html, /Oct 12, 2026, 1:15 PM CDT/);
});

test("supports disabling the temporary copy", async (t) => {
  process.env.CONTACT_CC_EMAIL = "";
  t.mock.method(
    globalThis,
    "fetch",
    async (_url: string | URL | Request, options?: RequestInit) => {
      assert.equal("cc" in JSON.parse(String(options?.body)), false);
      return Response.json({ id: "test-email-id" });
    },
  );
  assert.equal((await POST(request())).status, 200);
});

test("rejects invalid JSON and unconsented requests without sending", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch");
  const malformed = new Request("http://localhost/api/contact", {
    method: "POST",
    body: "{",
  });
  assert.equal((await POST(malformed)).status, 400);
  assert.equal(
    (await POST(request({ ...validRequest, consent: false }))).status,
    400,
  );
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("silently discards honeypot submissions without sending", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch");
  const response = await POST(
    request({ ...validRequest, website: "spam.test" }),
  );
  assert.equal(response.status, 200);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("reports missing credentials without sending or exposing the key", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch");
  delete process.env.RESEND_API_KEY;
  assert.equal((await POST(request())).status, 503);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("does not report success when Resend rejects or omits the email ID", async (t) => {
  t.mock.method(console, "error", () => {});
  const fetchMock = t.mock.method(globalThis, "fetch", async () =>
    Response.json({ message: "rejected" }, { status: 403 }),
  );
  assert.equal((await POST(request())).status, 502);
  fetchMock.mock.mockImplementation(async () => Response.json({}));
  assert.equal((await POST(request())).status, 502);
});

test("reports network failures without claiming the email was sent", async (t) => {
  t.mock.method(console, "error", () => {});
  t.mock.method(globalThis, "fetch", async () => {
    throw new Error("Network unavailable");
  });
  assert.equal((await POST(request())).status, 502);
});

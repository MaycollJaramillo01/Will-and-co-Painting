import assert from "node:assert/strict";
import test from "node:test";
import { contactSchema } from "./contact-schema.ts";
import { contactConsentVersion } from "./contact-consent.ts";

const validRequest = {
  name: "Taylor Customer",
  email: "taylor@example.com",
  phone: "6085550100",
  service: "Residential Interior Painting",
  propertyType: "Residential",
  message: "Please quote painting for my living room.",
  consent: true,
  website: "",
};

test("accepts a complete quote request", () => {
  assert.equal(contactSchema.safeParse(validRequest).success, true);
});

test("accepts an empty optional phone number", () => {
  assert.equal(
    contactSchema.safeParse({ ...validRequest, phone: "" }).success,
    true,
  );
});

test("rejects an invalid email", () => {
  assert.equal(
    contactSchema.safeParse({ ...validRequest, email: "not-an-email" }).success,
    false,
  );
});

test("rejects a request without terms acceptance", () => {
  assert.equal(
    contactSchema.safeParse({ ...validRequest, consent: false }).success,
    false,
  );
});

test("allows a quote request when both automated communication permissions are declined", () => {
  const parsed = contactSchema.safeParse({
    ...validRequest,
    phone: "",
    smsConsent: false,
    aiCallConsent: false,
    consentVersion: contactConsentVersion,
  });
  assert.equal(parsed.success, true);
});

test("terms acceptance and a phone number do not grant automated communication consent", () => {
  const parsed = contactSchema.parse(validRequest);
  assert.notEqual(parsed.smsConsent, true);
  assert.notEqual(parsed.aiCallConsent, true);
});

test("records SMS and AI call permissions independently", () => {
  for (const [smsConsent, aiCallConsent] of [
    [true, false],
    [false, true],
  ]) {
    const parsed = contactSchema.parse({
      ...validRequest,
      smsConsent,
      aiCallConsent,
      consentVersion: contactConsentVersion,
    });
    assert.equal(parsed.smsConsent, smsConsent);
    assert.equal(parsed.aiCallConsent, aiCallConsent);
  }
});

test("requires a valid phone number for either automated communication permission", () => {
  for (const field of ["smsConsent", "aiCallConsent"]) {
    for (const phone of ["", "123", "not-a-number"]) {
      const parsed = contactSchema.safeParse({
        ...validRequest,
        phone,
        [field]: true,
        consentVersion: contactConsentVersion,
      });
      assert.equal(parsed.success, false);
      if (!parsed.success)
        assert.ok(
          parsed.error.issues.some((issue) => issue.path[0] === "phone"),
        );
    }
  }
});

test("rejects automated permission without the reviewed disclosure version", () => {
  for (const consentVersion of [undefined, "2026-11-03"]) {
    assert.equal(
      contactSchema.safeParse({
        ...validRequest,
        smsConsent: true,
        consentVersion,
      }).success,
      false,
    );
  }
});

test("rejects a short project description", () => {
  assert.equal(
    contactSchema.safeParse({ ...validRequest, message: "Paint" }).success,
    false,
  );
});

test("lets a filled honeypot through so the form can handle it", () => {
  assert.equal(
    contactSchema.safeParse({ ...validRequest, website: "bot-site.test" })
      .success,
    true,
  );
});

import assert from "node:assert/strict";
import test from "node:test";
import { contactSchema } from "./contact-schema.ts";

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
    contactSchema.safeParse({ ...validRequest, email: "not-an-email" })
      .success,
    false,
  );
});

test("rejects a request without contact consent", () => {
  assert.equal(
    contactSchema.safeParse({ ...validRequest, consent: false }).success,
    false,
  );
});

test("rejects a short project description", () => {
  assert.equal(
    contactSchema.safeParse({ ...validRequest, message: "Paint" }).success,
    false,
  );
});

test("rejects a filled honeypot field", () => {
  assert.equal(
    contactSchema.safeParse({ ...validRequest, website: "bot-site.test" })
      .success,
    false,
  );
});

import { Resend } from "resend";
import { NextResponse } from "next/server";
import { services } from "@/content/en";
import { contactSchema } from "@/lib/contact-schema";

let resendClient: Resend | null = null;

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  resendClient ??= new Resend(process.env.RESEND_API_KEY);
  return resendClient;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "The request could not be read." },
      { status: 400 },
    );
  }

  const result = contactSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      { message: "Review the form fields and try again." },
      { status: 422 },
    );
  }

  if (result.data.website) {
    return NextResponse.json({ message: "Request received." });
  }

  const allowedServices = new Set([
    ...services.map((service) => service.name),
    "Not sure",
  ]);
  if (!allowedServices.has(result.data.service)) {
    return NextResponse.json(
      { message: "Choose a valid service." },
      { status: 422 },
    );
  }

  const resend = getResend();
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!resend || !to || !from) {
    return NextResponse.json(
      {
        message:
          "Online requests are not configured yet. Please try again later.",
      },
      { status: 503 },
    );
  }

  const { name, email, phone, propertyType, service, message } = result.data;
  const emailBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Property type: ${propertyType}`,
    `Service: ${service}`,
    "",
    "Project details:",
    message,
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Quote request: ${service}`,
    text: emailBody,
  });

  if (error) {
    return NextResponse.json(
      { message: "We could not send your request. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Your request has been sent. We will be in touch.",
  });
}

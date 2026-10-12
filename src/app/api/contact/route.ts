import { business } from "../../../config/business.ts";
import { contactSchema } from "../../../lib/contact-schema.ts";
import { renderContactEmail } from "../../../lib/contact-email.ts";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Check your request details." },
      { status: 400 },
    );
  }

  const data = parsed.data;
  if (data.website) {
    return Response.json({ success: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || business.quoteRequestEmail;
  const cc = process.env.CONTACT_CC_EMAIL ?? business.quoteRequestCc;
  if (!apiKey || !from || !to) {
    return Response.json({ error: "Email is unavailable." }, { status: 503 });
  }

  try {
    const logoImage = await readFile(
      path.join(process.cwd(), "public/images/brand/logo-white.png"),
    );
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        ...(cc ? { cc: [cc] } : {}),
        reply_to: data.email,
        subject: `Quote request: ${data.service.replace(/[\r\n]/g, " ").slice(0, 120)}`,
        ...renderContactEmail(data),
        attachments: [
          {
            filename: "logo-white.png",
            content: logoImage.toString("base64"),
            content_id: "logo-white.png",
          },
        ],
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const result = await response.json();
    if (!response.ok || typeof result.id !== "string" || !result.id) {
      console.error("Contact email rejected by Resend", response.status);
      return Response.json(
        { error: "Email could not be sent." },
        { status: 502 },
      );
    }

    return Response.json({ success: true, id: result.id });
  } catch {
    console.error("Contact email could not reach Resend");
    return Response.json(
      { error: "Email could not be sent." },
      { status: 502 },
    );
  }
}

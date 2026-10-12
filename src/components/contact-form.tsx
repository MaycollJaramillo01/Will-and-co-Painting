"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { services } from "@/content/en";
import { business } from "@/config/business";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";

// "handoff" = it could not be emailed, so the visitor sends it themselves.
type SubmitState = { status: "idle" | "sent" | "handoff" };

const fieldClass =
  "min-h-12 w-full rounded-lg border border-[color:var(--line)] bg-[color:var(--background)] px-4 text-[color:var(--ink)] placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:outline-none";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });
  const [textRequest, setTextRequest] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      propertyType: "Residential",
      message: "",
      consent: false,
      website: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setTextRequest(
      [
        `Quote request: ${data.service}`,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "Not provided"}`,
        `Property type: ${data.propertyType}`,
        data.message,
      ].join("\n"),
    );
    const sent = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(
        async (response) =>
          response.ok && (await response.json()).success === true,
      )
      .catch(() => false);
    setSubmitState({ status: sent ? "sent" : "handoff" });
  }

  if (submitState.status !== "idle") {
    const sent = submitState.status === "sent";
    return (
      <div
        className="hairline flex min-h-[28rem] flex-col items-start justify-center rounded-xl border bg-[color:var(--background)] p-8"
        role="status"
      >
        {sent && (
          <CheckCircle2
            aria-hidden="true"
            className="text-[color:var(--accent)]"
            size={40}
            strokeWidth={1.8}
          />
        )}
        <h2 className="font-display mt-5 text-4xl font-bold">
          {sent ? "Request sent." : "One more step."}
        </h2>
        <p className="mt-3 max-w-md leading-7 text-[color:var(--muted)]">
          {sent
            ? "Thank you. We have your request and will be in touch."
            : "We could not send your request automatically. Send it with WhatsApp or call us so it reaches us."}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {!sent && (
            <a
              className="button-primary"
              href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(textRequest)}`}
              target="_blank"
              rel="noreferrer"
            >
              Send with WhatsApp
            </a>
          )}
          <a className="button-secondary" href={`tel:${business.phone}`}>
            Call {business.displayPhone}
          </a>
        </div>
        <button
          type="button"
          className="button-secondary mt-4"
          onClick={() => {
            setSubmitState({ status: "idle" });
            reset();
          }}
        >
          Start another request
        </button>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message} htmlFor="name">
          <input
            id="name"
            autoComplete="name"
            className={fieldClass}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
        </Field>
        <Field label="Email" error={errors.email?.message} htmlFor="email">
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className={fieldClass}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Phone (optional)"
          error={errors.phone?.message}
          htmlFor="phone"
        >
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={fieldClass}
            placeholder="Your phone number"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
        </Field>
        <Field
          label="Property type"
          error={errors.propertyType?.message}
          htmlFor="propertyType"
        >
          <select
            id="propertyType"
            className={fieldClass}
            aria-invalid={Boolean(errors.propertyType)}
            {...register("propertyType")}
          >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Not sure">Not sure</option>
          </select>
        </Field>
      </div>

      <Field label="Service" error={errors.service?.message} htmlFor="service">
        <select
          id="service"
          className={fieldClass}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? "service-error" : undefined}
          {...register("service")}
        >
          <option value="">Choose a service</option>
          {services.map((service) => (
            <option key={service.slug} value={service.name}>
              {service.name}
            </option>
          ))}
          <option value="Not sure">Not sure yet</option>
        </select>
      </Field>

      <Field
        label="Project details"
        error={errors.message?.message}
        htmlFor="message"
      >
        <textarea
          id="message"
          rows={6}
          className={`${fieldClass} resize-y py-3`}
          placeholder="Tell us about the property, the surfaces, and what you would like to change."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-help"}
          {...register("message")}
        />
        <p id="message-help" className="mt-2 text-xs text-[color:var(--muted)]">
          Please do not include payment or other sensitive information.
        </p>
      </Field>

      <div
        className="absolute top-auto -left-[10000px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[color:var(--muted)]">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[color:var(--accent)]"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            {...register("consent")}
          />
          <span>
            I agree that Wil & Co. Painting may contact me about this request.
          </span>
        </label>
        {errors.consent?.message && (
          <p
            id="consent-error"
            className="mt-2 text-sm font-bold text-red-700 dark:text-red-300"
          >
            {errors.consent.message}
          </p>
        )}
      </div>

      <button
        className="button-primary w-full sm:w-fit"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending request..." : "Request a Quote"}
        {!isSubmitting && (
          <ArrowRight aria-hidden="true" size={17} strokeWidth={2} />
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-extrabold" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          className="mt-2 text-sm font-bold text-red-700 dark:text-red-300"
        >
          {error}
        </p>
      )}
    </div>
  );
}

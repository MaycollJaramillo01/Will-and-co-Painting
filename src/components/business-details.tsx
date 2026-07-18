import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { business, hasPublicEmail, hasPublicPhone } from "@/config/business";

export function BusinessDetails() {
  return (
    <div className="grid gap-7">
      <Detail
        icon={<MapPin aria-hidden="true" size={21} strokeWidth={2} />}
        label="Service area"
      >
        Madison, WI and surrounding areas
      </Detail>
      <Detail
        icon={<Clock3 aria-hidden="true" size={21} strokeWidth={2} />}
        label="Hours"
      >
        {business.openingHours[0].display}
      </Detail>
      {hasPublicPhone && (
        <Detail
          icon={<Phone aria-hidden="true" size={21} strokeWidth={2} />}
          label="Phone"
        >
          <a
            className="font-bold hover:underline"
            href={`tel:${business.phone}`}
          >
            {business.displayPhone}
          </a>
        </Detail>
      )}
      {hasPublicEmail && (
        <Detail
          icon={<Mail aria-hidden="true" size={21} strokeWidth={2} />}
          label="Email"
        >
          <a
            className="font-bold hover:underline"
            href={`mailto:${business.email}`}
          >
            {business.email}
          </a>
        </Detail>
      )}
      <p className="hairline border-t pt-5 text-sm leading-6 text-[color:var(--muted)]">
        Wil & Co. Painting operates as a Service Area Business. No public street
        address is listed.
      </p>
    </div>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[2rem_1fr] gap-3">
      <div className="pt-0.5 text-[color:var(--accent)]">{icon}</div>
      <div>
        <h3 className="text-sm font-extrabold">{label}</h3>
        <div className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
          {children}
        </div>
      </div>
    </div>
  );
}

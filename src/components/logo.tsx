import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center rounded-lg bg-[#f7f9fb] px-1.5"
      aria-label="Wil & Co. Painting home"
    >
      <Image
        src="/images/brand/logo-white.png"
        alt="Wil & Co. Painting"
        width={1314}
        height={691}
        className={compact ? "h-12 w-auto" : "h-14 w-auto"}
        priority
      />
    </Link>
  );
}

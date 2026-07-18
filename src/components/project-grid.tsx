import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/en";

export function ProjectGrid({ limit }: { limit?: number }) {
  const visibleProjects =
    typeof limit === "number" ? projects.slice(0, limit) : projects;

  return (
    <div className="grid gap-5 md:grid-cols-12">
      {visibleProjects.map((project, index) => {
        const layout =
          index % 5 === 0
            ? "md:col-span-7"
            : index % 5 === 1
              ? "md:col-span-5"
              : index % 5 === 2
                ? "md:col-span-4"
                : "md:col-span-4";
        const height = index < 2 ? "h-[24rem]" : "h-[20rem]";

        return (
          <article
            key={`${project.title}-${index}`}
            className={`${layout} group`}
          >
            <div className={`relative overflow-hidden rounded-xl ${height}`}>
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 720px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
              />
            </div>
            <div className="flex items-start justify-between gap-4 pt-4">
              <div>
                <h3 className="font-display text-2xl font-semibold">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-[color:var(--muted)]">
                  {project.category}
                </p>
              </div>
              <ArrowUpRight
                aria-hidden="true"
                className="mt-1 text-[color:var(--accent)]"
                size={20}
                strokeWidth={2}
              />
            </div>
          </article>
        );
      })}
      {limit && (
        <div className="flex items-end md:col-span-4">
          <Link className="button-secondary" href="/projects">
            View Projects
            <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2} />
          </Link>
        </div>
      )}
    </div>
  );
}

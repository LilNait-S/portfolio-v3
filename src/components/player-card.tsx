"use client";

import { Download, Focus, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { site } from "@/lib/site";

export function PlayerCard() {
  const ts = useTranslations("social");
  const th = useTranslations("hero");
  const ta = useTranslations("a11y");
  const locale = useLocale();
  const cvHref = locale === "en" ? site.cv.en : site.cv.es;

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cierra al hacer click fuera o con Escape.
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const actions = [
    { label: ts("github"), href: site.links.github, Icon: GithubIcon, external: true },
    { label: ts("linkedin"), href: site.links.linkedin, Icon: LinkedinIcon, external: true },
    { label: ts("email"), href: site.links.email, Icon: Mail, external: false },
    { label: th("ctaCv"), href: cvHref, Icon: Download, external: false, download: true },
  ];

  return (
    <div ref={ref} className="fixed bottom-6 left-5.5 z-40">
      {/* Acciones desplegables (aparecen encima del avatar) */}
      {open && (
        <div className="brackets absolute bottom-full left-0 mb-3 w-56 rounded-tr-xl rounded-bl-xl border border-border bg-card/95 p-2 shadow-xl backdrop-blur-md">
          {actions.map(({ label, href, Icon, external, download }) => (
            <a
              key={label}
              href={href}
              download={download}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Icon className="size-4 text-primary" />
              {label}
            </a>
          ))}
        </div>
      )}

      {/* Tarjeta de jugador: avatar + nick + rol */}
      <button
        type="button"
        aria-label={ta("contact")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-3 rounded-full border border-border/60 bg-background/50 p-1.5 pr-5 backdrop-blur-md transition-transform hover:scale-[1.02]"
      >
        <span className="relative flex size-16 shrink-0 rounded-full border-[0.5px] border-muted-foreground/60 p-1.5 bg-background">
          <img
            src={site.avatar}
            alt={site.nick}
            width={160}
            height={160}
            className="size-full rounded-full border border-muted-foreground/60 object-cover"
          />
          {/* Badge con icono (fondo inverso al tema) */}
          <span className="absolute bottom-0 right-0 flex size-6 items-center justify-center rounded-full bg-foreground text-background">
            <Focus className="size-3.5" />
          </span>
        </span>

        <span className="flex flex-col text-left leading-tight">
          <span className="font-display text-xl tracking-wide text-foreground">
            {site.nick}
          </span>
          <span className="text-xs text-muted-foreground">{site.role}</span>
        </span>
      </button>
    </div>
  );
}

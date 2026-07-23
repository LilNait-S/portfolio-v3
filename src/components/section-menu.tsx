"use client";

import { LayoutDashboard, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const SECTIONS = ["work", "experience", "stack", "about"] as const;

export function SectionMenu() {
  const t = useTranslations("nav");
  const ta = useTranslations("a11y");
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

  return (
    <div ref={ref} className="fixed left-4 top-4 z-50 lg:left-10 lg:top-7">
      <button
        type="button"
        aria-label={ta("menu")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex size-10 items-center justify-center rounded-lg border border-border bg-card/70 text-foreground backdrop-blur-md transition-colors hover:border-primary/50 hover:text-primary"
      >
        {open ? (
          <X className="size-5" />
        ) : (
          <LayoutDashboard className="size-5" />
        )}
      </button>

      {open && (
        <nav className="brackets absolute left-12 top-0 w-56 rounded-tr-lg rounded-bl-lg border border-border bg-card/95 p-2 shadow-xl backdrop-blur-md">
          <p className="px-3 py-2 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
            {t("sections")}
          </p>
          {SECTIONS.map((key, i) => (
            <a
              key={key}
              href={`#${key}`}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <span className="font-mono text-xs text-primary">
                0{i + 1}
              </span>
              {t(key)}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";

// Etiqueta de sección: línea corta morada (que "crece") + texto en mono.
export function SectionLabel({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <div className="flex items-center gap-3">
      <motion.span
        className="h-px w-8 origin-left bg-primary"
        initial={reduce ? undefined : { scaleX: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <span className="font-mono text-xs font-medium tracking-[0.3em] text-primary">
        {children}
      </span>
    </div>
  );
}

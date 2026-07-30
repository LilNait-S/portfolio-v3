"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

// Galería con imagen principal + miniaturas clicables.
// Click en la imagen principal abre un lightbox a tamaño grande.
export function Gallery({
  images,
  alt,
}: {
  images: readonly string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen]);

  return (
    <div>
      {/* Imagen principal */}
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label="Ampliar imagen"
        className="brackets block w-full cursor-zoom-in overflow-hidden rounded-xl border border-border"
      >
        <img
          src={images[active]}
          alt={alt}
          className="aspect-video w-full object-cover object-top"
        />
      </button>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`overflow-hidden rounded-lg border transition-all ${
                i === active
                  ? "border-primary"
                  : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt=""
                className="aspect-video w-full object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Cerrar"
              className="absolute top-5 right-5 rounded-full border border-border/50 bg-black/40 p-2 text-white transition-colors hover:border-primary/50 hover:text-primary"
            >
              <X className="size-5" />
            </button>
            <motion.img
              key={images[active]}
              src={images[active]}
              alt={alt}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full cursor-default rounded-xl border border-border object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

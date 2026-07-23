"use client";

import { useState } from "react";

// Galería con imagen principal + miniaturas clicables.
export function Gallery({
  images,
  alt,
}: {
  images: readonly string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Imagen principal */}
      <div className="brackets overflow-hidden rounded-xl border border-border">
        <img
          src={images[active]}
          alt={alt}
          className="aspect-video w-full object-cover object-top"
        />
      </div>

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
    </div>
  );
}

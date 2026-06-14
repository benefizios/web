"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Revela su contenido (fade + sube) cuando entra en el viewport.
 * Una sola vez. El estilo vive en globals.css (.reveal / .is-visible).
 *
 * @param delay  ms de retraso — úsalo para escalonar items de una grilla.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    let reported = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        reported = true;
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);

    // Red de seguridad: si el navegador no entrega callbacks de IO,
    // revelamos igual para que el contenido nunca quede oculto.
    const fallback = setTimeout(() => {
      if (!reported) setVisible(true);
    }, 700);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={visible && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

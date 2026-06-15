"use client";

import { useEffect, useRef } from "react";

type TurnstileAPI = {
  render: (
    el: HTMLElement,
    opts: { sitekey: string; theme?: string },
  ) => string;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileAPI;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

/**
 * Widget de Cloudflare Turnstile. Inyecta un input oculto
 * `cf-turnstile-response` en el formulario que lo contiene; la server action
 * lo lee y lo pasa como captchaToken a Supabase.
 */
export default function Turnstile() {
  const ref = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) return;
    let widgetId: string | undefined;

    function render() {
      const el = ref.current;
      if (window.turnstile && el && el.childElementCount === 0) {
        widgetId = window.turnstile.render(el, { sitekey: siteKey!, theme: "light" });
      }
    }

    if (window.turnstile) {
      render();
    } else if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SCRIPT_SRC;
      s.async = true;
      s.defer = true;
      s.onload = render;
      document.head.appendChild(s);
    } else {
      const id = window.setInterval(() => {
        if (window.turnstile) {
          window.clearInterval(id);
          render();
        }
      }, 200);
    }

    return () => {
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          // ignore
        }
      }
    };
  }, [siteKey]);

  if (!siteKey) return null;
  return <div ref={ref} />;
}

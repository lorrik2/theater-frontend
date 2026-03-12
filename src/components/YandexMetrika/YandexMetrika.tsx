"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SITE_URL } from "@/lib/site-config";

const METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

/**
 * Яндекс.Метрика: скрипт, инициализация и учёт переходов (hit) при смене страниц SPA.
 * Работает только при наличии NEXT_PUBLIC_YANDEX_METRIKA_ID в .env
 */
export default function YandexMetrika() {
  const pathname = usePathname();

  useEffect(() => {
    if (!METRIKA_ID || typeof window === "undefined" || !window.ym) return;
    const id = Number(METRIKA_ID);
    if (Number.isNaN(id)) return;

    const url = `${SITE_URL}${pathname || "/"}`;
    window.ym(id, "hit", url);
  }, [pathname]);

  if (!METRIKA_ID) return null;

  const counterId = Number(METRIKA_ID);
  if (Number.isNaN(counterId)) return null;

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
  			   })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${counterId}', 'ym');
            ym(${counterId}, "init", {
				  ssr:true,
				  webvisor:true,
              clickmap:true,
				  referrer: document.referrer,
				  url: location.href,
              trackLinks:true,
              accurateTrackBounce:true,
            });
          `,
        }}
      />
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${counterId}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}

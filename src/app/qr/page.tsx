"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { restaurant } from "../../config/restaurant";

/** صفحة طباعة أكواد QR لكل الطاولات: /qr?tables=12 */
export default function PrintQR() {
  const [origin, setOrigin] = useState(restaurant.siteUrl);
  const [tables, setTables] = useState(12);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (!restaurant.siteUrl) setOrigin(window.location.origin);
      const n = Number(new URLSearchParams(window.location.search).get("tables"));
      if (n > 0 && n <= 200) setTables(n);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="mx-auto max-w-4xl p-6" dir="rtl">
      <div className="mb-6 flex items-center justify-between print:hidden">
        <h1 className="text-xl font-bold">أكواد QR للطاولات ({tables})</h1>
        <button onClick={() => window.print()} className="rounded-lg bg-burgundy px-5 py-2 font-semibold text-white">طباعة</button>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {Array.from({ length: tables }, (_, i) => i + 1).map((n) => (
          <div key={n} className="break-inside-avoid rounded-2xl border-2 border-burgundy p-4 text-center">
            <p className="text-lg font-bold text-burgundy">{restaurant.name.ar}</p>
            <QRCodeSVG value={`${origin}/?table=${n}`} size={150} className="mx-auto my-3" marginSize={1} />
            <p className="text-2xl font-bold">طاولة {n}</p>
            <p className="text-xs text-text-secondary">امسح لعرض القائمة وطلب طعامك</p>
          </div>
        ))}
      </div>
    </div>
  );
}

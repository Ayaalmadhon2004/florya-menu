"use client";

import { useState } from "react";
import { restaurant } from "../config/restaurant";
import type { Dish } from "../data/menu";
import type { Lang, UiKey } from "../lib/i18n";

interface Props {
  lang: Lang;
  lines: { dish: Dish; qty: number }[];
  total: number;
  tableParam: string | null;
  money: (n: number) => string;
  t: (k: UiKey) => string;
  onQty: (id: string, qty: number) => void;
  onClear: () => void;
  onClose: () => void;
}

export default function CartSheet({ lang, lines, total, tableParam, money, t, onQty, onClear, onClose }: Props) {
  const [notes, setNotes] = useState("");
  const [type, setType] = useState<"dine" | "take">("dine");
  const [tableInput, setTableInput] = useState("");

  const table = tableParam || (type === "dine" ? tableInput.trim() : "");

  const send = () => {
    if (!lines.length) return;
    const head = tableParam || type === "dine"
      ? `${t("dineIn")}${table ? ` — ${t("table")} ${table}` : ""}`
      : t("takeaway");
    const body = lines.map((l) => `• ${l.qty}× ${l.dish.name[lang]} — ${money(l.qty * l.dish.price)}`);
    const msg = [
      `${t("hello")} (${restaurant.name[lang]})`,
      head,
      "",
      ...body,
      "",
      `${t("total")}: ${money(total)}`,
      ...(notes.trim() ? ["", `${t("notes")}: ${notes.trim()}`] : []),
    ].join("\n");
    window.open(`https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={onClose} role="dialog" aria-modal="true" aria-label={t("yourOrder")}>
      <div className="flex max-h-[90vh] w-full max-w-lg animate-slideUp flex-col rounded-t-3xl bg-beige" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pb-2 pt-5">
          <h2 className="text-lg font-bold text-burgundy">{t("yourOrder")}</h2>
          <div className="flex items-center gap-3">
            <button onClick={() => { onClear(); onClose(); }} className="min-h-11 text-sm text-text-muted underline">{t("clear")}</button>
            <button onClick={onClose} aria-label={t("close")} className="grid h-11 w-11 place-items-center rounded-full bg-white text-lg">✕</button>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 pb-3">
          {lines.map(({ dish, qty }) => (
            <div key={dish.id} className="flex items-center gap-3 rounded-xl bg-white p-2.5">
              <img src={dish.image} alt="" width={56} height={56} className="h-14 w-14 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{dish.name[lang]}</p>
                <p className="text-xs font-bold text-burgundy">{money(dish.price * qty)}</p>
              </div>
              <div className="flex items-center rounded-full border border-beige-dark">
                <button onClick={() => onQty(dish.id, qty - 1)} aria-label={t("decrease")} className="h-11 w-10 text-lg">−</button>
                <span className="min-w-5 text-center text-sm font-bold">{qty}</span>
                <button onClick={() => onQty(dish.id, qty + 1)} aria-label={t("increase")} className="h-11 w-10 text-lg">+</button>
              </div>
            </div>
          ))}

          {!tableParam && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">{t("orderType")}</p>
              <div className="flex gap-2">
                {(["dine", "take"] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => setType(k)}
                    aria-pressed={type === k}
                    className={`min-h-11 flex-1 rounded-xl text-sm font-semibold ${type === k ? "bg-burgundy text-white" : "border border-beige-dark bg-white"}`}
                  >
                    {k === "dine" ? t("dineIn") : t("takeaway")}
                  </button>
                ))}
              </div>
              {type === "dine" && (
                <input
                  value={tableInput}
                  onChange={(e) => setTableInput(e.target.value)}
                  inputMode="numeric"
                  placeholder={t("tableNo")}
                  aria-label={t("tableNo")}
                  className="mt-2 h-11 w-full rounded-xl border border-beige-dark bg-white px-4 text-sm outline-none focus:border-burgundy"
                />
              )}
            </div>
          )}

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t("notesPh")}
            aria-label={t("notes")}
            rows={2}
            className="w-full resize-none rounded-xl border border-beige-dark bg-white p-3 text-sm outline-none focus:border-burgundy"
          />
        </div>

        <div className="border-t border-beige-dark bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-text-secondary">{t("total")}</span>
            <span className="text-xl font-bold text-burgundy">{money(total)}</span>
          </div>
          <button onClick={send} className="min-h-12 w-full rounded-xl bg-[#25D366] text-base font-bold text-white active:scale-[.99]">
            {t("sendWhatsApp")}
          </button>
        </div>
      </div>
    </div>
  );
}

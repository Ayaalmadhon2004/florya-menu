"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { Dish, Badge } from "../data/menu";
import type { Lang, UiKey } from "../lib/i18n";

interface Props {
  dish: Dish;
  lang: Lang;
  qty: number;
  onQty: (id: string, qty: number) => void;
  money: (n: number) => string;
  t: (k: UiKey) => string;
}

const badgeKey: Record<Badge, UiKey> = { hot: "bestseller", new: "new", veg: "veg", spicy: "spicy" };

function DishCard({ dish, lang, qty, onQty, money, t }: Props) {
  const name = dish.name[lang];
  return (
    <article className={`flex gap-3 border-b border-gold/30 px-1 py-4 last:border-b-0 ${dish.soldOut ? "opacity-60" : ""}`}>
      <img
        src={dish.image}
        alt={name}
        width={96}
        height={112}
        loading="lazy"
        decoding="async"
        className="h-28 w-24 shrink-0 rounded-t-full rounded-b-md border-2 border-gold/60 bg-beige-dark object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-baseline gap-2">
          <h3 className="font-display text-[17px] font-bold leading-snug text-text-primary">{name}</h3>
          <span aria-hidden className="mb-1 min-w-3 flex-1 border-b-2 border-dotted border-gold/60" />
          <span className="shrink-0 font-display text-base font-bold text-burgundy">{money(dish.price)}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-text-secondary">{dish.description[lang]}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex flex-wrap gap-x-3 text-[11px] font-semibold uppercase tracking-wide text-gold-dark">
            {dish.badges.map((b) => (
              <span key={b}>{t(badgeKey[b])}</span>
            ))}
          </div>
          {dish.soldOut ? (
            <span className="text-xs font-semibold text-text-muted">{t("soldOut")}</span>
          ) : qty === 0 ? (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onQty(dish.id, 1)}
              aria-label={`${t("add")} ${name}`}
              className="min-h-11 shrink-0 rounded-full border border-burgundy px-5 text-sm font-semibold text-burgundy transition hover:bg-burgundy hover:text-white"
            >
              {t("add")}
            </motion.button>
          ) : (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex shrink-0 items-center rounded-full bg-burgundy text-white">
              <button onClick={() => onQty(dish.id, qty - 1)} aria-label={`${t("decrease")} ${name}`} className="h-11 w-11 text-xl">−</button>
              <motion.span key={qty} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="min-w-5 text-center text-sm font-bold" aria-live="polite">{qty}</motion.span>
              <button onClick={() => onQty(dish.id, qty + 1)} aria-label={`${t("increase")} ${name}`} className="h-11 w-11 text-xl">+</button>
            </motion.div>
          )}
        </div>
      </div>
    </article>
  );
}

export default memo(DishCard);

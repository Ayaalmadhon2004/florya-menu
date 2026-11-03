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

const badgeStyle: Record<Badge, string> = {
  hot: "bg-accent-hot/10 text-accent-hot",
  new: "bg-accent-new/10 text-accent-new",
  veg: "bg-accent-veg/10 text-accent-veg",
  spicy: "bg-accent-hot/10 text-accent-hot",
};
const badgeKey: Record<Badge, UiKey> = { hot: "bestseller", new: "new", veg: "veg", spicy: "spicy" };

function DishCard({ dish, lang, qty, onQty, money, t }: Props) {
  const name = dish.name[lang];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className={`flex gap-3 rounded-2xl bg-white p-3 shadow-sm ${dish.soldOut ? "opacity-60" : ""}`}
    >
      <motion.img
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        src={dish.image}
        alt={name}
        width={104}
        height={104}
        loading="lazy"
        decoding="async"
        className="h-[104px] w-[104px] shrink-0 rounded-xl bg-beige-dark object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap gap-1.5">
          {dish.badges.map((b) => (
            <span key={b} className={`rounded px-2 py-0.5 text-[11px] font-semibold ${badgeStyle[b]}`}>
              {t(badgeKey[b])}
            </span>
          ))}
        </div>
        <h3 className="mt-1 text-[15px] font-semibold leading-snug text-text-primary">{name}</h3>
        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-text-secondary">{dish.description[lang]}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-sm font-bold text-burgundy">{money(dish.price)}</span>
          {dish.soldOut ? (
            <span className="text-xs font-semibold text-text-muted">{t("soldOut")}</span>
          ) : qty === 0 ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onQty(dish.id, 1)}
              aria-label={`${t("add")} ${name}`}
              className="min-h-11 rounded-full border-2 border-burgundy px-5 text-sm font-semibold text-burgundy transition hover:bg-burgundy hover:text-white active:scale-95"
            >
              + {t("add")}
            </motion.button>
          ) : (
            <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="flex items-center gap-1 rounded-full bg-burgundy text-white">
              <button onClick={() => onQty(dish.id, qty - 1)} aria-label={`${t("decrease")} ${name}`} className="h-11 w-11 text-xl">−</button>
              <motion.span key={qty} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="min-w-5 text-center text-sm font-bold" aria-live="polite">{qty}</motion.span>
              <button onClick={() => onQty(dish.id, qty + 1)} aria-label={`${t("increase")} ${name}`} className="h-11 w-11 text-xl">+</button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default memo(DishCard);

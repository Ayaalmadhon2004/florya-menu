"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { restaurant } from "../config/restaurant";
import { categories, allDishes } from "../data/menu";
import { ui, type Lang, type UiKey } from "../lib/i18n";
import DishCard from "./DishCard";
import CartSheet from "./CartSheet";

const QRModal = dynamic(() => import("./QRModal"), { ssr: false });

export type Cart = Record<string, number>;

const rise = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function MenuApp() {
  const params = useSearchParams();
  const tableParam = params.get("table");

  const [lang, setLang] = useState<Lang>(restaurant.defaultLang);
  const [cart, setCart] = useState<Cart>({});
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(categories[0].id);
  const [showCart, setShowCart] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const chipsRef = useRef<HTMLDivElement>(null);

  const t = useCallback((k: UiKey) => ui[k][lang], [lang]);
  const money = useCallback(
    (n: number) => `${n.toLocaleString(lang === "ar" ? "ar-EG" : "en-US")} ${restaurant.currency[lang]}`,
    [lang]
  );

  // restore saved language & cart (must run after hydration, so it lives in an effect)
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const l = localStorage.getItem("lang") as Lang | null;
      if (l === "ar" || l === "en") setLang(l);
      const c = localStorage.getItem("cart");
      if (c) setCart(JSON.parse(c));
    } catch {}
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);
  useEffect(() => {
    try { localStorage.setItem("cart", JSON.stringify(cart)); } catch {}
  }, [cart]);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, 99);
      return next;
    });
  }, []);

  const cartLines = useMemo(
    () => allDishes.filter((d) => cart[d.id]).map((d) => ({ dish: d, qty: cart[d.id] })),
    [cart]
  );
  const count = cartLines.reduce((s, l) => s + l.qty, 0);
  const total = cartLines.reduce((s, l) => s + l.qty * l.dish.price, 0);

  // search
  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      categories
        .map((c) => ({
          ...c,
          dishes: q
            ? c.dishes.filter((d) =>
                `${d.name.ar} ${d.name.en} ${d.description.ar} ${d.description.en}`.toLowerCase().includes(q)
              )
            : c.dishes,
        }))
        .filter((c) => c.dishes.length > 0),
    [q]
  );

  // highlight the category being read
  useEffect(() => {
    const els = categories.map((c) => document.getElementById(`cat-${c.id}`)).filter(Boolean) as HTMLElement[];
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id.replace("cat-", ""));
      },
      { rootMargin: "-120px 0px -65% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [visible]);

  // keep the active chip in view
  useEffect(() => {
    const chip = chipsRef.current?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    chip?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  const jump = (id: string) => {
    setActive(id);
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pageUrl = typeof window !== "undefined" ? window.location.origin + window.location.pathname : "";

  return (
    <MotionConfig reducedMotion="user">
    <div className="mx-auto min-h-screen max-w-lg bg-beige shadow-2xl pb-28">
      {/* hero */}
      <header className="relative overflow-hidden bg-burgundy text-white">
        <motion.div aria-hidden animate={{ scale: [1, 1.12, 1], x: [0, -10, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -top-16 -end-16 h-56 w-56 rounded-full bg-white/5" />
        <motion.div aria-hidden animate={{ scale: [1.1, 1, 1.1], y: [0, -12, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -bottom-24 -start-10 h-64 w-64 rounded-full bg-white/5" />
        <div className="relative flex items-center justify-between px-4 pt-4">
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="min-h-11 rounded-full border border-white/30 bg-white/10 px-4 text-sm font-semibold backdrop-blur hover:bg-white/20"
            aria-label="Switch language"
          >
            {t("lang")}
          </button>
          <button
            onClick={() => setShowQR(true)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-lg backdrop-blur hover:bg-white/20"
            aria-label={t("share")}
          >
            ⤴
          </button>
        </div>
        <motion.div
          className="relative px-6 pb-8 pt-4 text-center"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div
            variants={{ hidden: { scale: 0.5, opacity: 0, rotate: -20 }, show: { scale: 1, opacity: 1, rotate: 0 } }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full border-2 border-white/40 bg-white/10 text-4xl font-bold"
          >
            {restaurant.name[lang].charAt(0)}
          </motion.div>
          <motion.h1 variants={rise} className="text-3xl font-bold tracking-wide">{restaurant.name[lang]}</motion.h1>
          <motion.p variants={rise} className="mt-1 text-sm uppercase tracking-[0.25em] text-white/80">{restaurant.type[lang]}</motion.p>
          <motion.p variants={rise} className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/85">{restaurant.tagline[lang]}</motion.p>
          {tableParam && (
            <p className="mt-4 inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-burgundy" role="status">
              {t("table")} {tableParam}
            </p>
          )}
        </motion.div>
      </header>

      {/* sticky search + categories */}
      <div className="sticky top-0 z-30 border-b border-beige-dark bg-beige/95 backdrop-blur">
        <div className="px-4 pt-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search")}
            aria-label={t("search")}
            className="h-11 w-full rounded-full border border-beige-dark bg-white px-5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-burgundy"
          />
        </div>
        <div ref={chipsRef} className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3" role="tablist">
          {categories.map((c) => (
            <button
              key={c.id}
              data-chip={c.id}
              role="tab"
              aria-selected={active === c.id}
              onClick={() => jump(c.id)}
              className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-medium transition ${
                active === c.id ? "bg-burgundy text-white" : "border border-beige-dark bg-white text-text-primary"
              }`}
            >
              {c.title[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* menu */}
      <main className="px-4 pt-2">
        {visible.length === 0 && <p className="py-16 text-center text-text-secondary">{t("noResults")}</p>}
        {visible.map((c) => (
          <section key={c.id} id={`cat-${c.id}`} className="scroll-mt-32 pt-5">
            <motion.h2 initial={{ opacity: 0, x: lang === "ar" ? 24 : -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4 }} className="text-xl font-bold text-burgundy">{c.title[lang]}</motion.h2>
            <p className="mb-3 text-sm text-text-secondary">{c.subtitle[lang]}</p>
            <div className="space-y-3">
              {c.dishes.map((d) => (
                <DishCard key={d.id} dish={d} lang={lang} qty={cart[d.id] ?? 0} onQty={setQty} money={money} t={t} />
              ))}
            </div>
          </section>
        ))}

        {/* contact */}
        <footer className="mt-10 rounded-2xl bg-white p-5 text-center shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-burgundy">{t("contact")}</h2>
          <p className="text-sm text-text-secondary">{restaurant.address[lang]}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-text-muted">{t("hours")}</p>
          <p className="text-sm text-text-primary">{restaurant.hours[lang]}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <a href={`tel:${restaurant.phone.replace(/\s/g, "")}`} className="min-h-11 rounded-full bg-burgundy px-5 py-2.5 text-sm font-semibold text-white">
              📞 {t("call")}
            </a>
            <a href={restaurant.mapsUrl} target="_blank" rel="noopener noreferrer" className="min-h-11 rounded-full border border-burgundy px-5 py-2.5 text-sm font-semibold text-burgundy">
              📍 {t("directions")}
            </a>
            <a href={`https://instagram.com/${restaurant.instagram}`} target="_blank" rel="noopener noreferrer" className="min-h-11 rounded-full border border-burgundy px-5 py-2.5 text-sm font-semibold text-burgundy">
              @{restaurant.instagram}
            </a>
          </div>
        </footer>
      </main>

      {/* floating cart bar */}
      <AnimatePresence>
      {count > 0 && !showCart && (
        <motion.div
          key="bar"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-lg p-3"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowCart(true)}
            className="flex min-h-14 w-full items-center justify-between rounded-2xl bg-burgundy px-5 text-white shadow-xl"
          >
            <span className="flex items-center gap-3">
              <motion.span key={count} initial={{ scale: 1.5 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className="grid h-8 min-w-8 place-items-center rounded-full bg-white px-2 text-sm font-bold text-burgundy">{count}</motion.span>
              <span className="font-semibold">{t("viewOrder")}</span>
            </span>
            <span className="font-bold">{money(total)}</span>
          </motion.button>
        </motion.div>
      )}
      </AnimatePresence>

      <AnimatePresence>
      {showCart && (
        <CartSheet
          lang={lang}
          lines={cartLines}
          total={total}
          tableParam={tableParam}
          money={money}
          t={t}
          onQty={setQty}
          onClear={() => setCart({})}
          onClose={() => setShowCart(false)}
        />
      )}
      </AnimatePresence>
      <AnimatePresence>
      {showQR && <QRModal url={pageUrl} t={t} onClose={() => setShowQR(false)} />}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}

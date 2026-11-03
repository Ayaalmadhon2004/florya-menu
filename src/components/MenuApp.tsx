"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

const flipTransition = { duration: 0.55, ease: [0.32, 0.72, 0, 1] as const };

export const rise = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function MenuApp() {
  const params = useSearchParams();
  const tableParam = params.get("table");

  const [lang, setLang] = useState<Lang>(restaurant.defaultLang);
  const [cart, setCart] = useState<Cart>({});
  const [page, setPage] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [showQR, setShowQR] = useState(false);

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

  // pages: cover, index, one per category, contact
  const total_pages = categories.length + 3;
  const lastPage = total_pages - 1;
  const goTo = useCallback(
    (n: number) => {
      if (n < 0 || n > lastPage || n === page) return;
      setPage(n);
    },
    [page, lastPage]
  );
  const next = useCallback(() => goTo(page + 1), [goTo, page]);
  const prev = useCallback(() => goTo(page - 1), [goTo, page]);

  // keyboard + swipe (direction follows the book: RTL books turn the other way)
  const rtl = lang === "ar";
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showCart || showQR) return;
      if (e.key === "ArrowRight") (rtl ? prev : next)();
      if (e.key === "ArrowLeft") (rtl ? next : prev)();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, rtl, showCart, showQR]);
  const [touchX, setTouchX] = useState<number | null>(null);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX === null) return;
    const diff = e.changedTouches[0].clientX - touchX;
    setTouchX(null);
    if (Math.abs(diff) < 60) return;
    // swiping toward the spine side goes back; away from it goes forward
    const forward = rtl ? diff > 0 : diff < 0;
    (forward ? next : prev)();
  };

  // flip animation: the old page turns over the spine while the new one waits underneath
  const sign = rtl ? 1 : -1;
  const origin = rtl ? "right center" : "left center";
  const flip = {
    enter: { rotateY: 0, zIndex: 0 },
    center: { rotateY: 0, zIndex: 1, transition: { ...flipTransition, zIndex: { duration: 0 } } },
    exit: { rotateY: sign * 100, zIndex: 2, transition: { ...flipTransition, zIndex: { duration: 0 } } },
  };

  const pageUrl = typeof window !== "undefined" ? window.location.origin + window.location.pathname : "";
  const pageNo = (n: number) => `${(n + 1).toLocaleString(rtl ? "ar-EG" : "en-US")} / ${total_pages.toLocaleString(rtl ? "ar-EG" : "en-US")}`;

  const category = page >= 2 && page <= lastPage - 1 ? categories[page - 2] : null;

  const pageHeader = (title: string, subtitle?: string) => (
    <div className="relative overflow-hidden bg-burgundy px-6 pb-5 pt-5 text-center text-white">
      <div aria-hidden className="absolute -top-12 -end-12 h-40 w-40 rounded-full bg-white/5" />
      <p className="text-xs tracking-widest text-white/70">{pageNo(page)}</p>
      <h2 className="mt-1 text-2xl font-bold">{title}</h2>
      {subtitle && <p className="mt-0.5 text-sm text-white/80">{subtitle}</p>}
    </div>
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto flex h-dvh max-w-lg flex-col overflow-hidden bg-[#EADFD2] shadow-2xl">
        {/* top bar */}
        <div className="flex items-center justify-between bg-burgundy-dark px-4 py-2 text-white">
          <button onClick={() => setLang(rtl ? "en" : "ar")} className="min-h-11 rounded-full border border-white/30 bg-white/10 px-4 text-sm font-semibold hover:bg-white/20" aria-label="Switch language">
            {t("lang")}
          </button>
          <span className="text-sm font-semibold tracking-wide">
            {restaurant.name[lang]}
            {tableParam && <span className="ms-2 rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-burgundy">{t("table")} {tableParam}</span>}
          </span>
          <button onClick={() => setShowQR(true)} className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-lg hover:bg-white/20" aria-label={t("share")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>
          </button>
        </div>

        {/* the book */}
        <div className="relative flex-1 overflow-hidden p-2" style={{ perspective: 1600 }} onTouchStart={(e) => setTouchX(e.touches[0].clientX)} onTouchEnd={onTouchEnd}>
          <AnimatePresence initial={false}>
            <motion.div
              key={page}
              variants={flip}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformOrigin: origin, backfaceVisibility: "hidden", willChange: "transform" }}
              className="absolute inset-2 overflow-hidden rounded-lg bg-beige shadow-lg"
            >
              {/* spine shadow */}
              <div aria-hidden className={`pointer-events-none absolute inset-y-0 z-10 w-5 ${rtl ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"} from-black/15 to-transparent`} />
              <div className="no-scrollbar h-full overflow-y-auto">
                {page === 0 && (
                  <div className="flex min-h-full flex-col">
                    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } } }} className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-burgundy px-6 py-16 text-center text-white">
                      <motion.div aria-hidden animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 9, repeat: Infinity }} className="absolute -top-16 -end-16 h-56 w-56 rounded-full bg-white/5" />
                      <motion.div aria-hidden animate={{ scale: [1.1, 1, 1.1] }} transition={{ duration: 11, repeat: Infinity }} className="absolute -bottom-24 -start-10 h-64 w-64 rounded-full bg-white/5" />
                      <motion.div variants={{ hidden: { scale: 0.5, opacity: 0, rotate: -20 }, show: { scale: 1, opacity: 1, rotate: 0 } }} transition={{ type: "spring", stiffness: 180, damping: 14 }} className="relative mb-5 grid h-24 w-24 place-items-center rounded-full border-2 border-white/40 bg-white/10 text-5xl font-bold">
                        {restaurant.name[lang].charAt(0)}
                      </motion.div>
                      <motion.h1 variants={rise} className="relative text-4xl font-bold tracking-wide">{restaurant.name[lang]}</motion.h1>
                      <motion.p variants={rise} className="relative mt-1 text-sm uppercase tracking-[0.3em] text-white/80">{restaurant.type[lang]}</motion.p>
                      <motion.p variants={rise} className="relative mt-4 max-w-xs text-sm leading-relaxed text-white/85">{restaurant.tagline[lang]}</motion.p>
                    </motion.div>
                    <div className="px-8 py-8 text-center">
                      <motion.button whileTap={{ scale: 0.96 }} onClick={() => goTo(1)} className="min-h-12 rounded-xl bg-burgundy px-8 font-semibold text-white shadow-md">
                        {t("explore")} {rtl ? "←" : "→"}
                      </motion.button>
                    </div>
                  </div>
                )}

                {page === 1 && (
                  <div className="min-h-full">
                    {pageHeader(t("menu"), restaurant.tagline[lang])}
                    <nav className="px-5 py-4" aria-label={t("menu")}>
                      {categories.map((c, i) => (
                        <button key={c.id} onClick={() => goTo(i + 2)} className="flex min-h-14 w-full items-center gap-3 border-b border-beige-dark px-1 text-start transition hover:bg-white/60">
                          <span className="grid h-9 w-9 place-items-center rounded-full bg-burgundy/10 text-sm font-bold text-burgundy">{(i + 1).toLocaleString(rtl ? "ar-EG" : "en-US")}</span>
                          <span className="flex-1">
                            <span className="block text-[15px] font-semibold">{c.title[lang]}</span>
                            <span className="block text-xs text-text-secondary">{c.subtitle[lang]}</span>
                          </span>
                          <span className="text-text-muted">{rtl ? "‹" : "›"}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                )}

                {category && (
                  <div className="min-h-full pb-4">
                    {pageHeader(category.title[lang], category.subtitle[lang])}
                    <div className="space-y-3 px-3 pt-3">
                      {category.dishes.map((d) => (
                        <DishCard key={d.id} dish={d} lang={lang} qty={cart[d.id] ?? 0} onQty={setQty} money={money} t={t} />
                      ))}
                    </div>
                  </div>
                )}

                {page === lastPage && (
                  <div className="min-h-full">
                    {pageHeader(t("contact"))}
                    <div className="space-y-4 p-6 text-center">
                      <p className="text-sm text-text-secondary">{restaurant.address[lang]}</p>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">{t("hours")}</p>
                        <p className="text-sm">{restaurant.hours[lang]}</p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2">
                        <a href={`tel:${restaurant.phone.replace(/\s/g, "")}`} className="min-h-11 rounded-full bg-burgundy px-5 py-2.5 text-sm font-semibold text-white">{t("call")}</a>
                        <a href={restaurant.mapsUrl} target="_blank" rel="noopener noreferrer" className="min-h-11 rounded-full border border-burgundy px-5 py-2.5 text-sm font-semibold text-burgundy">{t("directions")}</a>
                        <a href={`https://instagram.com/${restaurant.instagram}`} target="_blank" rel="noopener noreferrer" className="min-h-11 rounded-full border border-burgundy px-5 py-2.5 text-sm font-semibold text-burgundy">@{restaurant.instagram}</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* cart bar */}
        <AnimatePresence>
          {count > 0 && (
            <motion.div key="bar" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-3">
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowCart(true)} className="mb-2 flex min-h-14 w-full items-center justify-between rounded-2xl bg-burgundy px-5 text-white shadow-xl">
                <span className="flex items-center gap-3">
                  <motion.span key={count} initial={{ scale: 1.5 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className="grid h-8 min-w-8 place-items-center rounded-full bg-white px-2 text-sm font-bold text-burgundy">{count}</motion.span>
                  <span className="font-semibold">{t("viewOrder")}</span>
                </span>
                <span className="font-bold">{money(total)}</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* page controls */}
        <nav className="flex items-center justify-between bg-white px-4 py-2" aria-label="Pages">
          <button onClick={prev} disabled={page === 0} aria-label="Previous page" className="grid h-12 w-12 place-items-center rounded-full border border-beige-dark text-xl text-burgundy disabled:opacity-30">{rtl ? "→" : "←"}</button>
          <div className="flex items-center gap-1.5" role="tablist">
            {Array.from({ length: total_pages }, (_, i) => (
              <button key={i} role="tab" aria-selected={i === page} aria-label={`${i + 1}`} onClick={() => goTo(i)} className="grid h-6 place-items-center px-0.5">
                <span className={`block h-2 rounded-full transition-all ${i === page ? "w-5 bg-burgundy" : "w-2 bg-beige-dark"}`} />
              </button>
            ))}
          </div>
          <button onClick={next} disabled={page === lastPage} aria-label="Next page" className="grid h-12 w-12 place-items-center rounded-full border border-beige-dark text-xl text-burgundy disabled:opacity-30">{rtl ? "←" : "→"}</button>
        </nav>

        <AnimatePresence>
          {showCart && (
            <CartSheet lang={lang} lines={cartLines} total={total} tableParam={tableParam} money={money} t={t} onQty={setQty} onClear={() => setCart({})} onClose={() => setShowCart(false)} />
          )}
        </AnimatePresence>
        <AnimatePresence>{showQR && <QRModal url={pageUrl} t={t} onClose={() => setShowQR(false)} />}</AnimatePresence>
      </div>
    </MotionConfig>
  );
}

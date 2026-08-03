"use client";

import { useState, useCallback, useEffect, lazy, Suspense, memo } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { menuPages, Dish } from "../data/menu";
import Header from "../components/Header";
import DishCard from "../components/DishCard";
import BottomNav from "../components/BottomNav";
import CartBar from "../components/CartBar";

// ✅ Lazy load QRModal (reduce initial JS)
const QRModal = lazy(() => import("../components/QRModal"));

const WHATSAPP_NUMBER = "966501234567";

// ✅ Memoized components to prevent re-renders
const MemoizedDishCard = memo(DishCard);

export default function MenuContent() {
  const searchParams = useSearchParams();
  const tableNumber = searchParams.get("table") || "Unknown";

  const [currentPage, setCurrentPage] = useState(0);
  const [cart, setCart] = useState<Dish[]>([]);
  const [showQR, setShowQR] = useState(false);
  const [direction, setDirection] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalPages = menuPages.length;
  const page = menuPages[currentPage];

  const goToPage = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalPages) return;
      setDirection(index > currentPage ? 1 : -1);
      setCurrentPage(index);
    },
    [currentPage, totalPages]
  );

  const nextPage = useCallback(() => goToPage(currentPage + 1), [goToPage, currentPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [goToPage, currentPage]);

  const addToCart = useCallback((dish: Dish) => {
    setCart((prev) => {
      const exists = prev.find((d) => d.id === dish.id);
      if (exists) return prev.filter((d) => d.id !== dish.id);
      return [...prev, dish];
    });
  }, []);

  const isInCart = useCallback(
    (dishId: string) => cart.some((d) => d.id === dishId),
    [cart]
  );

  const sendWhatsAppOrder = useCallback(() => {
    if (cart.length === 0) return;
    const lines = cart.map((d) => `• ${d.name} - ${d.price} SAR`);
    const total = cart.reduce((sum, d) => sum + d.price, 0);
    const message = [
      `Hello! Order from Table ${tableNumber}:`,
      "",
      ...lines,
      "",
      `Total: ${total} SAR`,
      "",
      "From Florya Digital Menu",
    ].join("%0A");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  }, [cart, tableNumber]);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  // Swipe handling
  const [touchStartX, setTouchStartX] = useState(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  }, []);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextPage();
        else prevPage();
      }
    },
    [touchStartX, nextPage, prevPage]
  );

  // ✅ Simpler animation = less CPU (reduces TBT)
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <div className="text-burgundy text-xl font-semibold" role="status" aria-live="polite">
          Florya
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-beige flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden"
      role="application"
      aria-label="Florya digital menu"
    >
      {/* Table Number Badge */}
      {tableNumber !== "Unknown" && (
        <div
          className="absolute top-3 left-3 z-40 px-3 py-1 rounded-full bg-burgundy text-white text-xs font-semibold shadow-md"
          role="status"
        >
          Table {tableNumber}
        </div>
      )}

      {/* QR Button */}
      <button
        onClick={() => setShowQR(true)}
        aria-label="Share menu QR code"
        className="absolute top-3 right-3 z-40 w-11 h-11 rounded-full bg-white/90 border border-beige-dark flex items-center justify-center text-sm shadow-sm hover:bg-white transition"
      >
        🔗
      </button>

      {/* Page Content */}
      <div
        className="flex-1 overflow-hidden relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }} // ✅ Faster = less blocking
            className="absolute inset-0 overflow-y-auto no-scrollbar will-change-transform"
          >
            {/* COVER */}
            {page.type === "cover" && (
              <div className="min-h-full flex flex-col">
                <div className="bg-burgundy text-white flex flex-col items-center justify-center py-16 px-6">
                  <div className="w-24 h-24 rounded-full border-2 border-white/30 flex items-center justify-center mb-6">
                    <span className="text-4xl font-bold">F</span>
                  </div>
                  <h1 className="text-3xl font-bold tracking-wider">Florya</h1>
                  <p className="text-sm text-white/60 mt-2 tracking-widest uppercase">
                    Restaurant
                  </p>
                  {tableNumber !== "Unknown" && (
                    <p className="text-xs text-white/40 mt-4 tracking-wider">
                      Table {tableNumber}
                    </p>
                  )}
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
                  <p className="text-text-secondary text-center leading-relaxed mb-8">
                    Welcome to an unforgettable dining experience
                  </p>
                  <button
                    onClick={() => goToPage(1)}
                    aria-label="Explore menu"
                    className="px-8 py-3 rounded-xl bg-burgundy text-white font-medium hover:bg-burgundy-dark transition min-h-[48px]"
                  >
                    Explore Menu →
                  </button>
                </div>
              </div>
            )}

            {/* INDEX */}
            {page.type === "index" && (
              <div className="min-h-full flex flex-col">
                <Header
                  title={page.title}
                  subtitle={page.subtitle}
                  pageNum={`0${page.id} / 0${totalPages - 1}`}
                  onBack={() => goToPage(0)}
                />
                <nav className="flex-1 px-6 py-8" aria-label="Menu categories">
                  <div className="space-y-1">
                    {page.items?.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => goToPage(item.page)}
                        aria-label={`Go to ${item.name}`}
                        className="w-full flex items-center justify-between py-4 border-b border-beige-dark hover:bg-white/50 transition px-2 rounded-lg min-h-[48px]"
                      >
                        <span className="text-[15px] font-medium text-text-primary">
                          {item.name}
                        </span>
                        <span className="text-sm text-text-muted font-medium">
                          0{item.page}
                        </span>
                      </button>
                    ))}
                  </div>
                </nav>
              </div>
            )}

            {/* CATEGORY */}
            {page.type === "category" && (
              <div className="min-h-full flex flex-col">
                <Header
                  title={page.title}
                  subtitle={page.subtitle}
                  pageNum={`0${page.id} / 0${totalPages - 1}`}
                  onBack={() => goToPage(1)}
                />
                <div className="flex-1 px-4 py-4 space-y-3">
                  {page.dishes?.map((dish) => (
                    <MemoizedDishCard
                      key={dish.id}
                      dish={dish}
                      onAdd={addToCart}
                      added={isInCart(dish.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT */}
            {page.type === "contact" && (
              <div className="min-h-full flex flex-col">
                <Header
                  title={page.title}
                  pageNum={`0${page.id} / 0${totalPages - 1}`}
                  onBack={() => goToPage(1)}
                  showBack={true}
                />
                <div className="flex-1 px-6 py-8 space-y-6">
                  {page.contact && (
                    <>
                      <div className="flex items-start gap-3">
                        <span className="text-xl">📍</span>
                        <div>
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                            Address
                          </p>
                          <p className="text-sm text-text-primary">
                            {page.contact.address}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xl">📞</span>
                        <div>
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                            Phone
                          </p>
                          <p className="text-sm text-text-primary" dir="ltr">
                            {page.contact.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xl">🕐</span>
                        <div>
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                            Hours
                          </p>
                          <p className="text-sm text-text-primary">
                            {page.contact.hours}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xl">📱</span>
                        <div>
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                            Instagram
                          </p>
                          <p className="text-sm text-text-primary">
                            {page.contact.instagram}
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-beige-dark text-center">
                        <p className="text-xs text-text-muted mb-3">
                          Scan to share this menu
                        </p>
                        <Image
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(pageUrl)}`}
                          alt="Menu QR code for sharing"
                          width={144}
                          height={144}
                          className="mx-auto"
                          unoptimized
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <CartBar items={cart} onCheckout={sendWhatsAppOrder} />

      <BottomNav
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={prevPage}
        onNext={nextPage}
        onDotClick={goToPage}
      />

      {/* ✅ Lazy loaded QR Modal */}
      {showQR && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6">Loading...</div>
            </div>
          }
        >
          <QRModal url={pageUrl} onClose={() => setShowQR(false)} />
        </Suspense>
      )}
    </div>
  );
}
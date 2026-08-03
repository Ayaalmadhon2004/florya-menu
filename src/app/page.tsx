"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { menuPages, Dish } from "@/data/menu";
import Header from "@/components/Header";
import DishCard from "@/components/DishCard";
import BottomNav from "@/components/BottomNav";
import CartBar from "@/components/CartBar";
import QRModal from "@/components/QRModal";

// WhatsApp number - CHANGE THIS to the restaurant's number
const WHATSAPP_NUMBER = "966501234567";

export default function Home() {
  const searchParams = useSearchParams();
  const tableNumber = searchParams.get("table") || "Unknown";

  const [currentPage, setCurrentPage] = useState(0);
  const [cart, setCart] = useState<Dish[]>([]);
  const [showQR, setShowQR] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  const addToCart = (dish: Dish) => {
    setCart((prev) => {
      const exists = prev.find((d) => d.id === dish.id);
      if (exists) {
        return prev.filter((d) => d.id !== dish.id);
      }
      return [...prev, dish];
    });
  };

  const isInCart = (dishId: string) => cart.some((d) => d.id === dishId);

  const sendWhatsAppOrder = () => {
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

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, "_blank");
  };

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  // Swipe handling
  const [touchStart, setTouchStart] = useState(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextPage();
      else prevPage();
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      rotateY: dir > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      rotateY: dir > 0 ? -15 : 15,
    }),
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <div className="text-burgundy text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden">
      {/* Table Number Badge */}
      {tableNumber !== "Unknown" && (
        <div className="absolute top-3 left-3 z-40 px-3 py-1 rounded-full bg-burgundy text-white text-xs font-semibold shadow-md">
          Table {tableNumber}
        </div>
      )}

      {/* QR Button */}
      <button
        onClick={() => setShowQR(true)}
        className="absolute top-3 right-3 z-40 w-9 h-9 rounded-full bg-white/90 border border-beige-dark flex items-center justify-center text-sm shadow-sm hover:bg-white transition"
        title="Share Menu"
      >
        🔗
      </button>

      {/* Page Content with Flip Animation */}
      <div
        className="flex-1 overflow-hidden relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ perspective: "1200px" }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0 overflow-y-auto no-scrollbar"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* COVER PAGE */}
            {page.type === "cover" && (
              <div className="min-h-full flex flex-col">
                <div className="bg-burgundy text-white flex flex-col items-center justify-center py-16 px-6">
                  <div className="w-24 h-24 rounded-full border-2 border-white/30 flex items-center justify-center mb-6">
                    <span className="text-4xl font-bold">F</span>
                  </div>
                  <h1 className="text-3xl font-bold tracking-wider">Florya</h1>
                  <p className="text-sm text-white/60 mt-2 tracking-widest uppercase">Restaurant</p>
                  {tableNumber !== "Unknown" && (
                    <p className="text-xs text-white/40 mt-4 tracking-wider">Table {tableNumber}</p>
                  )}
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
                  <p className="text-text-secondary text-center leading-relaxed mb-8">
                    Welcome to an unforgettable dining experience
                  </p>
                  <button
                    onClick={() => goToPage(1)}
                    className="px-8 py-3 rounded-xl bg-burgundy text-white font-medium hover:bg-burgundy-dark transition"
                  >
                    Explore Menu →
                  </button>
                </div>
              </div>
            )}

            {/* INDEX PAGE */}
            {page.type === "index" && (
              <div className="min-h-full flex flex-col">
                <Header
                  title={page.title}
                  subtitle={page.subtitle}
                  pageNum={`0${page.id} / 0${totalPages - 1}`}
                  onBack={() => goToPage(0)}
                />
                <div className="flex-1 px-6 py-8">
                  <div className="space-y-1">
                    {page.items?.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => goToPage(item.page)}
                        className="w-full flex items-center justify-between py-4 border-b border-beige-dark hover:bg-white/50 transition px-2 rounded-lg"
                      >
                        <span className="text-[15px] font-medium text-text-primary">{item.name}</span>
                        <span className="text-sm text-text-muted font-medium">0{item.page}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CATEGORY PAGE */}
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
                    <DishCard
                      key={dish.id}
                      dish={dish}
                      onAdd={addToCart}
                      added={isInCart(dish.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT PAGE */}
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
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Address</p>
                          <p className="text-sm text-text-primary">{page.contact.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xl">📞</span>
                        <div>
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Phone</p>
                          <p className="text-sm text-text-primary" dir="ltr">{page.contact.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xl">🕐</span>
                        <div>
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Hours</p>
                          <p className="text-sm text-text-primary">{page.contact.hours}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xl">📱</span>
                        <div>
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Instagram</p>
                          <p className="text-sm text-text-primary">{page.contact.instagram}</p>
                        </div>
                      </div>

                      {/* QR Code */}
                      <div className="mt-8 pt-6 border-t border-beige-dark text-center">
                        <p className="text-xs text-text-muted mb-3">Scan to share this menu</p>
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(pageUrl)}`}
                          alt="Menu QR"
                          className="w-36 h-36 mx-auto"
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

      {/* Cart Bar */}
      <CartBar items={cart} onCheckout={sendWhatsAppOrder} />

      {/* Bottom Navigation */}
      <BottomNav
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={prevPage}
        onNext={nextPage}
        onDotClick={goToPage}
      />

      {/* QR Modal */}
      {showQR && <QRModal url={pageUrl} onClose={() => setShowQR(false)} />}
    </div>
  );
}
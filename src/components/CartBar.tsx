"use client";

import { Dish } from "@/data/menu";

interface CartBarProps {
  items: Dish[];
  onCheckout: () => void;
}

export default function CartBar({ items, onCheckout }: CartBarProps) {
  if (items.length === 0) return null;

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-burgundy text-white px-6 py-3 flex items-center justify-between animate-slideUp">
      <div className="flex items-center gap-2">
        <span className="text-lg">🛒</span>
        <span className="text-sm font-medium">
          {items.length} item{items.length > 1 ? "s" : ""} · {total} SAR
        </span>
      </div>
      <button
        onClick={onCheckout}
        className="bg-white text-burgundy px-4 py-2 rounded-lg text-sm font-semibold hover:bg-beige transition"
      >
        Order via WhatsApp
      </button>
    </div>
  );
}

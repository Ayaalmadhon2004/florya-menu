"use client";

import { Dish, badgeLabels, badgeColors } from "../data/menu";

interface DishCardProps {
  dish: Dish;
  onAdd: (dish: Dish) => void;
  added: boolean;
}

export default function DishCard({ dish, onAdd, added }: DishCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 flex gap-4 items-start border border-transparent hover:border-beige-dark transition-all duration-200 shadow-sm hover:shadow-md">
      {/* صورة حقيقية دائرية */}
      <div className="w-[72px] h-[72px] rounded-full overflow-hidden shrink-0 border-2 border-beige-dark bg-beige">
        <img
          src={dish.image}
          alt={dish.name}
          width={72}
          height={72}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3 className="text-[15px] font-semibold text-text-primary leading-tight">
            {dish.name}
          </h3>
          <span className="text-sm font-bold text-burgundy shrink-0">
            {dish.price} SAR
          </span>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed mb-3">
          {dish.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
            {dish.badges.map((badge) => (
              <span
                key={badge}
                className={`text-[10px] font-semibold px-2 py-0.5 rounded ${badgeColors[badge]}`}
              >
                {badgeLabels[badge]}
              </span>
            ))}
          </div>
          <button
            onClick={() => onAdd(dish)}
            aria-label={`Add ${dish.name} to order`}
            className={`w-11 h-11 rounded-full border-2 flex items-center justify-center text-lg font-light transition-all duration-150 ${
              added
                ? "bg-accent-new border-accent-new text-white"
                : "border-beige-dark text-burgundy hover:bg-burgundy hover:text-white hover:border-burgundy"
            }`}
          >
            {added ? "✓" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
}
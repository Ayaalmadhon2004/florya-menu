import type { L10n } from "../lib/i18n";

/**
 * 🍽️ بيانات القائمة — عدّل الأصناف والأسعار هنا فقط.
 * badges: "hot" (الأكثر طلبًا) | "new" (جديد) | "veg" (نباتي) | "spicy" (حار)
 * soldOut: true لإخفاء زر الإضافة مؤقتًا.
 */
export type Badge = "hot" | "new" | "veg" | "spicy";

export interface Dish {
  id: string;
  name: L10n;
  description: L10n;
  price: number;
  image: string;
  badges: Badge[];
  soldOut?: boolean;
}

export interface Category {
  id: string;
  title: L10n;
  subtitle: L10n;
  dishes: Dish[];
}

export const categories: Category[] = [
  {
    id: "starters",
    title: { ar: "المقبلات والسلطات", en: "Starters & Salads" },
    subtitle: { ar: "ابدأ رحلتك", en: "Begin your journey" },
    dishes: [
      {
        id: "s1",
        name: { ar: "سلطة فلوريا الخاصة", en: "Florya Special Salad" },
        description: { ar: "خس طازج، جبنة فيتا، زيتون، صلصة بلسميك", en: "Fresh greens, feta cheese, olives, balsamic dressing" },
        price: 45,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop&q=80",
        badges: ["veg"],
      },
      {
        id: "s2",
        name: { ar: "روبيان مقرمش", en: "Crispy Fried Shrimp" },
        description: { ar: "روبيان مغطى بالبقسماط مع صلصة كوكتيل", en: "Fresh shrimp coated in breadcrumbs, cocktail sauce" },
        price: 68,
        image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=400&fit=crop&q=80",
        badges: ["hot"],
      },
      {
        id: "s3",
        name: { ar: "حمص بيروتي", en: "Beirut Hummus" },
        description: { ar: "حمص أصيل بالطحينة والليمون وزيت الزيتون", en: "Authentic hummus with tahini, lemon, olive oil" },
        price: 32,
        image: "https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?w=400&h=400&fit=crop&q=80",
        badges: ["veg"],
      },
      {
        id: "s4",
        name: { ar: "بوراتا بالترفل", en: "Truffle Burrata" },
        description: { ar: "جبنة بوراتا كريمية، زيت الترفل، طماطم محمصة", en: "Creamy burrata, truffle oil, roasted tomatoes" },
        price: 58,
        image: "https://images.unsplash.com/photo-1529312266912-b33cf6227e24?w=400&h=400&fit=crop&q=80",
        badges: ["new"],
      },
    ],
  },
  {
    id: "grills",
    title: { ar: "اللحوم والمشاوي", en: "Meat & Grills" },
    subtitle: { ar: "من قلب النار", en: "From the fire" },
    dishes: [
      {
        id: "m1",
        name: { ar: "ستيك أنغوس مشوي", en: "Angus Grilled Steak" },
        description: { ar: "300 غ قطعة أنغوس مشوية على الفحم مع صلصة الفلفل الأسود", en: "300g Angus cut, charcoal grilled, black pepper sauce" },
        price: 129,
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=400&fit=crop&q=80",
        badges: ["hot"],
      },
      {
        id: "m2",
        name: { ar: "ريش لحم الضأن بالفرن", en: "Oven Lamb Ribs" },
        description: { ar: "ريش ضأن طرية بتوابل خاصة مع بطاطس محمصة", en: "Tender lamb ribs with special spices, roasted potatoes" },
        price: 145,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop&q=80",
        badges: ["new"],
      },
      {
        id: "m3",
        name: { ar: "برجر فلوريا المزدوج", en: "Florya Double Burger" },
        description: { ar: "لحم بقري مزدوج، شيدر، خس، طماطم، صلصة خاصة", en: "Double fresh beef, cheddar, lettuce, tomato, special sauce" },
        price: 75,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop&q=80",
        badges: [],
      },
    ],
  },
  {
    id: "seafood",
    title: { ar: "الدجاج والمأكولات البحرية", en: "Chicken & Seafood" },
    subtitle: { ar: "من البحر والمزرعة", en: "Ocean & farm" },
    dishes: [
      {
        id: "c1",
        name: { ar: "دجاج مشوي بالأعشاب", en: "Herb Grilled Chicken" },
        description: { ar: "دجاجة كاملة محمّرة بالزعتر والليمون مع أرز بسمتي", en: "Whole chicken roasted with thyme & lemon, basmati rice" },
        price: 98,
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop&q=80",
        badges: ["hot"],
      },
      {
        id: "c2",
        name: { ar: "فيليه سمك مشوي", en: "Grilled Fish Fillet" },
        description: { ar: "فيليه سمك طازج بصلصة الليمون والزبدة مع خضار سوتيه", en: "Fresh fish fillet, lemon butter sauce, sautéed vegetables" },
        price: 110,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop&q=80",
        badges: [],
      },
      {
        id: "c3",
        name: { ar: "باستا دجاج ألفريدو", en: "Chicken Alfredo Pasta" },
        description: { ar: "فيتوتشيني بصلصة كريمة وفطر وبارميزان", en: "Fettuccine pasta, cream sauce, mushrooms, parmesan" },
        price: 72,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop&q=80",
        badges: ["new"],
      },
    ],
  },
  {
    id: "desserts",
    title: { ar: "الحلويات", en: "Desserts" },
    subtitle: { ar: "نهاية حلوة", en: "Sweet endings" },
    dishes: [
      {
        id: "d1",
        name: { ar: "تيراميسو إيطالي", en: "Italian Tiramisu" },
        description: { ar: "بسكويت مبلل بالقهوة، ماسكربوني، كاكاو", en: "Coffee-soaked biscuits, mascarpone, cocoa" },
        price: 42,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop&q=80",
        badges: ["hot"],
      },
      {
        id: "d2",
        name: { ar: "وافل بلجيكي", en: "Belgian Waffle" },
        description: { ar: "وافل مقرمش مع آيس كريم فانيلا وشوكولاتة وفراولة", en: "Crispy waffle, vanilla ice cream, chocolate, strawberry" },
        price: 38,
        image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&h=400&fit=crop&q=80",
        badges: [],
      },
      {
        id: "d3",
        name: { ar: "كريم كراميل", en: "Caramel Custard" },
        description: { ar: "كاسترد فانيلا ناعم بطبقة كراميل مقرمشة", en: "Smooth vanilla custard, crispy caramel layer" },
        price: 35,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop&q=80",
        badges: [],
      },
    ],
  },
  {
    id: "drinks",
    title: { ar: "المشروبات", en: "Beverages" },
    subtitle: { ar: "انتعاش", en: "Refreshments" },
    dishes: [
      {
        id: "b1",
        name: { ar: "قهوة فلوريا العربية", en: "Florya Arabic Coffee" },
        description: { ar: "قهوة عربية أصيلة بالهيل والزعفران", en: "Authentic Arabic coffee with cardamom & saffron" },
        price: 18,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop&q=80",
        badges: [],
      },
      {
        id: "b2",
        name: { ar: "موكتيل فلوريا الخاص", en: "Florya Special Mocktail" },
        description: { ar: "مانجو، فراولة، نعناع، ليمون، صودا", en: "Mango, strawberry, mint, lemon, soda" },
        price: 28,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=400&fit=crop&q=80",
        badges: ["new"],
      },
      {
        id: "b3",
        name: { ar: "عصير مشكّل طازج", en: "Fresh Mixed Juice" },
        description: { ar: "برتقال، جزر، ليمون، زنجبيل طازج", en: "Orange, carrot, lemon, fresh ginger" },
        price: 24,
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=400&fit=crop&q=80",
        badges: [],
      },
    ],
  },
]

export const allDishes: Dish[] = categories.flatMap((c) => c.dishes);

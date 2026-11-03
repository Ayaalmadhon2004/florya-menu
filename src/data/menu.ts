import type { L10n } from "../lib/i18n";

/**
 * بيانات القائمة — عدّل الأصناف والأسعار هنا فقط.
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
    subtitle: { ar: "لتبدأ السفرة", en: "To start the table" },
    dishes: [
      {
        id: "s1",
        name: { ar: "سلطة فلوريا الخاصة", en: "Florya Special Salad" },
        description: { ar: "خس مقرمش وجبنة فيتا وزيتون أسود، وفوقها صوص البلسميك", en: "Crisp lettuce, feta and black olives, dressed with balsamic." },
        price: 45,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop&q=80",
        badges: ["veg"],
      },
      {
        id: "s2",
        name: { ar: "روبيان مقرمش", en: "Crispy Fried Shrimp" },
        description: { ar: "روبيان مقلي بقشرة مقرمشة، ويجي معه صوص كوكتيل", en: "Shrimp in a crunchy crust, with cocktail sauce on the side." },
        price: 68,
        image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=400&fit=crop&q=80",
        badges: ["hot"],
      },
      {
        id: "s3",
        name: { ar: "حمص بيروتي", en: "Beirut Hummus" },
        description: { ar: "حمص ناعم بالطحينة والليمون، وزيت زيتون فوقه", en: "Smooth hummus with tahini and lemon, finished with olive oil." },
        price: 32,
        image: "https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?w=400&h=400&fit=crop&q=80",
        badges: ["veg"],
      },
      {
        id: "s4",
        name: { ar: "بوراتا بالترفل", en: "Truffle Burrata" },
        description: { ar: "بوراتا طرية مع طماطم مشوية وقطرات من زيت الترفل", en: "Soft burrata, roasted tomatoes and a few drops of truffle oil." },
        price: 58,
        image: "https://images.unsplash.com/photo-1529312266912-b33cf6227e24?w=400&h=400&fit=crop&q=80",
        badges: ["new"],
      },
    ],
  },
  {
    id: "grills",
    title: { ar: "اللحوم والمشاوي", en: "Meat & Grills" },
    subtitle: { ar: "على الفحم", en: "Off the charcoal" },
    dishes: [
      {
        id: "m1",
        name: { ar: "ستيك أنغوس مشوي", en: "Angus Grilled Steak" },
        description: { ar: "ستيك أنغوس ٣٠٠ غ على الفحم، مع صوص الفلفل الأسود", en: "300g Angus steak off the charcoal, with black pepper sauce." },
        price: 129,
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=400&fit=crop&q=80",
        badges: ["hot"],
      },
      {
        id: "m2",
        name: { ar: "ريش لحم الضأن بالفرن", en: "Oven Lamb Ribs" },
        description: { ar: "ريش ضأن تنضج ببطء في الفرن بتوابل البيت، مع بطاطس محمّرة", en: "Lamb ribs slow-roasted with our house spices, roast potatoes alongside." },
        price: 145,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop&q=80",
        badges: ["new"],
      },
      {
        id: "m3",
        name: { ar: "برجر فلوريا المزدوج", en: "Florya Double Burger" },
        description: { ar: "قطعتين لحم وجبنة شيدر وخس وطماطم، وصوص البيت", en: "Two beef patties, cheddar, lettuce, tomato and our house sauce." },
        price: 75,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop&q=80",
        badges: [],
      },
    ],
  },
  {
    id: "seafood",
    title: { ar: "الدجاج والمأكولات البحرية", en: "Chicken & Seafood" },
    subtitle: { ar: "من البحر ومن المزرعة", en: "From the sea and the farm" },
    dishes: [
      {
        id: "c1",
        name: { ar: "دجاج مشوي بالأعشاب", en: "Herb Grilled Chicken" },
        description: { ar: "دجاجة كاملة بالزعتر والليمون، تقدّم مع رز بسمتي", en: "A whole chicken roasted with thyme and lemon, served with basmati rice." },
        price: 98,
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop&q=80",
        badges: ["hot"],
      },
      {
        id: "c2",
        name: { ar: "فيليه سمك مشوي", en: "Grilled Fish Fillet" },
        description: { ar: "فيليه سمك بصوص الزبدة والليمون، مع خضار سوتيه", en: "Fish fillet in lemon butter sauce, with sautéed vegetables." },
        price: 110,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop&q=80",
        badges: [],
      },
      {
        id: "c3",
        name: { ar: "باستا دجاج ألفريدو", en: "Chicken Alfredo Pasta" },
        description: { ar: "فيتوتشيني بالكريمة والفطر والبارميزان، مع قطع دجاج", en: "Fettuccine in a creamy mushroom and parmesan sauce, with chicken." },
        price: 72,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop&q=80",
        badges: ["new"],
      },
    ],
  },
  {
    id: "desserts",
    title: { ar: "الحلويات", en: "Desserts" },
    subtitle: { ar: "ختامها حلو", en: "Something sweet to finish" },
    dishes: [
      {
        id: "d1",
        name: { ar: "تيراميسو إيطالي", en: "Italian Tiramisu" },
        description: { ar: "طبقات بسكويت بالقهوة مع ماسكربوني وكاكاو", en: "Coffee-soaked biscuit layers, mascarpone and cocoa." },
        price: 42,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop&q=80",
        badges: ["hot"],
      },
      {
        id: "d2",
        name: { ar: "وافل بلجيكي", en: "Belgian Waffle" },
        description: { ar: "وافل سخن مع آيس كريم فانيلا وشوكولاتة وفراولة", en: "Warm waffle with vanilla ice cream, chocolate and strawberries." },
        price: 38,
        image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&h=400&fit=crop&q=80",
        badges: [],
      },
      {
        id: "d3",
        name: { ar: "كريم كراميل", en: "Caramel Custard" },
        description: { ar: "كاسترد فانيلا ناعم وفوقه طبقة كراميل", en: "Silky vanilla custard under a layer of caramel." },
        price: 35,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop&q=80",
        badges: [],
      },
    ],
  },
  {
    id: "drinks",
    title: { ar: "المشروبات", en: "Beverages" },
    subtitle: { ar: "شي يبرّد", en: "Something cold" },
    dishes: [
      {
        id: "b1",
        name: { ar: "قهوة فلوريا العربية", en: "Florya Arabic Coffee" },
        description: { ar: "قهوة عربية بالهيل والزعفران", en: "Arabic coffee with cardamom and saffron." },
        price: 18,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop&q=80",
        badges: [],
      },
      {
        id: "b2",
        name: { ar: "موكتيل فلوريا الخاص", en: "Florya Special Mocktail" },
        description: { ar: "مانجو وفراولة ونعناع وليمون مع صودا", en: "Mango, strawberry, mint and lemon topped with soda." },
        price: 28,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=400&fit=crop&q=80",
        badges: ["new"],
      },
      {
        id: "b3",
        name: { ar: "عصير مشكّل طازج", en: "Fresh Mixed Juice" },
        description: { ar: "برتقال وجزر وليمون وزنجبيل طازج", en: "Orange, carrot, lemon and fresh ginger." },
        price: 24,
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=400&fit=crop&q=80",
        badges: [],
      },
    ],
  },
]

export const allDishes: Dish[] = categories.flatMap((c) => c.dishes);

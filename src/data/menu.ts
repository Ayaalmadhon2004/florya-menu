export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  badges: ("hot" | "new" | "veg")[];
}

export interface MenuPage {
  id: number;
  type: "cover" | "index" | "category" | "contact";
  title: string;
  subtitle?: string;
  dishes?: Dish[];
  items?: { name: string; page: number }[];
  contact?: {
    address: string;
    phone: string;
    hours: string;
    instagram: string;
  };
}

export const menuPages: MenuPage[] = [
  {
    id: 0,
    type: "cover",
    title: "Florya",
    subtitle: "Restaurant",
  },
  {
    id: 1,
    type: "index",
    title: "Menu",
    subtitle: "Welcome to an unforgettable dining experience",
    items: [
      { name: "Starters & Salads", page: 2 },
      { name: "Meat & Grills", page: 3 },
      { name: "Chicken & Seafood", page: 4 },
      { name: "Desserts", page: 5 },
      { name: "Beverages", page: 6 },
    ],
  },
  {
    id: 2,
    type: "category",
    title: "Starters & Salads",
    subtitle: "Begin your journey",
    dishes: [
      {
        id: "s1",
        name: "Florya Special Salad",
        description: "Fresh greens, feta cheese, olives, balsamic dressing",
        price: 45,
        emoji: "🥗",
        badges: ["veg"],
      },
      {
        id: "s2",
        name: "Crispy Fried Shrimp",
        description: "Fresh shrimp coated in breadcrumbs, cocktail sauce",
        price: 68,
        emoji: "🍤",
        badges: ["hot"],
      },
      {
        id: "s3",
        name: "Beirut Hummus",
        description: "Authentic hummus with tahini, lemon, olive oil",
        price: 32,
        emoji: "🥙",
        badges: ["veg"],
      },
      {
        id: "s4",
        name: "Truffle Burrata",
        description: "Creamy burrata, truffle oil, roasted tomatoes",
        price: 58,
        emoji: "🧀",
        badges: ["new"],
      },
    ],
  },
  {
    id: 3,
    type: "category",
    title: "Meat & Grills",
    subtitle: "From the fire",
    dishes: [
      {
        id: "m1",
        name: "Angus Grilled Steak",
        description: "300g Angus cut, charcoal grilled, black pepper sauce",
        price: 129,
        emoji: "🥩",
        badges: ["hot"],
      },
      {
        id: "m2",
        name: "Oven Lamb Ribs",
        description: "Tender lamb ribs with special spices, roasted potatoes",
        price: 145,
        emoji: "🍖",
        badges: ["new"],
      },
      {
        id: "m3",
        name: "Florya Double Burger",
        description: "Double fresh beef, cheddar, lettuce, tomato, special sauce",
        price: 75,
        emoji: "🍔",
        badges: [],
      },
    ],
  },
  {
    id: 4,
    type: "category",
    title: "Chicken & Seafood",
    subtitle: "Ocean & farm",
    dishes: [
      {
        id: "c1",
        name: "Herb Grilled Chicken",
        description: "Whole chicken roasted with thyme & lemon, basmati rice",
        price: 98,
        emoji: "🍗",
        badges: ["hot"],
      },
      {
        id: "c2",
        name: "Grilled Fish Fillet",
        description: "Fresh fish fillet, lemon butter sauce, sautéed vegetables",
        price: 110,
        emoji: "🐟",
        badges: [],
      },
      {
        id: "c3",
        name: "Chicken Alfredo Pasta",
        description: "Fettuccine pasta, cream sauce, mushrooms, parmesan",
        price: 72,
        emoji: "🍝",
        badges: ["new"],
      },
    ],
  },
  {
    id: 5,
    type: "category",
    title: "Desserts",
    subtitle: "Sweet endings",
    dishes: [
      {
        id: "d1",
        name: "Italian Tiramisu",
        description: "Coffee-soaked biscuits, mascarpone, cocoa",
        price: 42,
        emoji: "🍰",
        badges: ["hot"],
      },
      {
        id: "d2",
        name: "Belgian Waffle",
        description: "Crispy waffle, vanilla ice cream, chocolate, strawberry",
        price: 38,
        emoji: "🧇",
        badges: [],
      },
      {
        id: "d3",
        name: "Caramel Custard",
        description: "Smooth vanilla custard, crispy caramel layer",
        price: 35,
        emoji: "🍮",
        badges: [],
      },
    ],
  },
  {
    id: 6,
    type: "category",
    title: "Beverages",
    subtitle: "Refreshments",
    dishes: [
      {
        id: "b1",
        name: "Florya Arabic Coffee",
        description: "Authentic Arabic coffee with cardamom & saffron",
        price: 18,
        emoji: "☕",
        badges: [],
      },
      {
        id: "b2",
        name: "Florya Special Mocktail",
        description: "Mango, strawberry, mint, lemon, soda",
        price: 28,
        emoji: "🍹",
        badges: ["new"],
      },
      {
        id: "b3",
        name: "Fresh Mixed Juice",
        description: "Orange, carrot, lemon, fresh ginger",
        price: 24,
        emoji: "🧃",
        badges: [],
      },
    ],
  },
  {
    id: 7,
    type: "contact",
    title: "Contact",
    contact: {
      address: "King Fahd Road, Riyadh, Saudi Arabia",
      phone: "+966 11 234 5678",
      hours: "Daily 12 PM - 12 AM",
      instagram: "@florya_rest",
    },
  },
];

export const badgeLabels: Record<string, string> = {
  hot: "Bestseller",
  new: "New",
  veg: "Vegetarian",
};

export const badgeColors: Record<string, string> = {
  hot: "bg-accent-hot/10 text-accent-hot",
  new: "bg-accent-new/10 text-accent-new",
  veg: "bg-accent-veg/10 text-accent-veg",
};

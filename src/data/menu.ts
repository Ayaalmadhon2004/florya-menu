export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
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
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop&q=80",
        badges: ["veg"],
      },
      {
        id: "s2",
        name: "Crispy Fried Shrimp",
        description: "Fresh shrimp coated in breadcrumbs, cocktail sauce",
        price: 68,
        image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=200&h=200&fit=crop&q=80",
        badges: ["hot"],
      },
      {
        id: "s3",
        name: "Beirut Hummus",
        description: "Authentic hummus with tahini, lemon, olive oil",
        price: 32,
        image: "https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?w=200&h=200&fit=crop&q=80",
        badges: ["veg"],
      },
      {
        id: "s4",
        name: "Truffle Burrata",
        description: "Creamy burrata, truffle oil, roasted tomatoes",
        price: 58,
        image: "https://images.unsplash.com/photo-1529312266912-b33cf6227e24?w=200&h=200&fit=crop&q=80",
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
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=200&h=200&fit=crop&q=80",
        badges: ["hot"],
      },
      {
        id: "m2",
        name: "Oven Lamb Ribs",
        description: "Tender lamb ribs with special spices, roasted potatoes",
        price: 145,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop&q=80",
        badges: ["new"],
      },
      {
        id: "m3",
        name: "Florya Double Burger",
        description: "Double fresh beef, cheddar, lettuce, tomato, special sauce",
        price: 75,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop&q=80",
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
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=200&h=200&fit=crop&q=80",
        badges: ["hot"],
      },
      {
        id: "c2",
        name: "Grilled Fish Fillet",
        description: "Fresh fish fillet, lemon butter sauce, sautéed vegetables",
        price: 110,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200&h=200&fit=crop&q=80",
        badges: [],
      },
      {
        id: "c3",
        name: "Chicken Alfredo Pasta",
        description: "Fettuccine pasta, cream sauce, mushrooms, parmesan",
        price: 72,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop&q=80",
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
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&h=200&fit=crop&q=80",
        badges: ["hot"],
      },
      {
        id: "d2",
        name: "Belgian Waffle",
        description: "Crispy waffle, vanilla ice cream, chocolate, strawberry",
        price: 38,
        image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=200&h=200&fit=crop&q=80",
        badges: [],
      },
      {
        id: "d3",
        name: "Caramel Custard",
        description: "Smooth vanilla custard, crispy caramel layer",
        price: 35,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop&q=80",
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
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&h=200&fit=crop&q=80",
        badges: [],
      },
      {
        id: "b2",
        name: "Florya Special Mocktail",
        description: "Mango, strawberry, mint, lemon, soda",
        price: 28,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=200&h=200&fit=crop&q=80",
        badges: ["new"],
      },
      {
        id: "b3",
        name: "Fresh Mixed Juice",
        description: "Orange, carrot, lemon, fresh ginger",
        price: 24,
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=200&h=200&fit=crop&q=80",
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
      phone: "+966 50 123 4567",
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
export type Category =
  | "Starters"
  | "Main Course"
  | "Breads"
  | "Rice & Biryani"
  | "Desserts"
  | "Beverages";

export const CATEGORIES: Category[] = [
  "Starters",
  "Main Course",
  "Breads",
  "Rice & Biryani",
  "Desserts",
  "Beverages",
];

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  veg: boolean;
  image: string;
  signature?: boolean;
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const DISHES: Dish[] = [
  {
    id: "d1",
    name: "Shahi Paneer Tikka",
    description:
      "Cottage cheese marinated in royal spices, kissed by tandoor smoke, brushed with saffron butter.",
    price: 520,
    category: "Starters",
    veg: true,
    image: img("photo-1631452180519-c014fe946bc7"),
    signature: true,
  },
  {
    id: "d2",
    name: "Galouti Kebab",
    description:
      "Silken minced lamb kebabs from the Nawabs of Lucknow, spiced with a hundred hidden aromatics.",
    price: 680,
    category: "Starters",
    veg: false,
    image: img("photo-1601050690597-df0568f70950"),
    signature: true,
  },
  {
    id: "d3",
    name: "Tandoori Jhinga",
    description:
      "Tiger prawns cloaked in yogurt, ajwain and Kashmiri chilli, charred over glowing embers.",
    price: 890,
    category: "Starters",
    veg: false,
    image: img("photo-1633504581786-316c8002b1b9"),
  },
  {
    id: "d4",
    name: "Dahi Ke Kebab",
    description:
      "Hung yogurt patties with cashew and green chilli, crisp outside, molten within.",
    price: 460,
    category: "Starters",
    veg: true,
    image: img("photo-1567337710282-00832b415979"),
  },
  {
    id: "d5",
    name: "Laal Maas",
    description:
      "Fiery Rajasthani lamb curry from Mewar's royal kitchens, smouldering with Mathania chillies.",
    price: 780,
    category: "Main Course",
    veg: false,
    image: img("photo-1585937421612-70a008356fbe"),
    signature: true,
  },
  {
    id: "d6",
    name: "Butter Chicken Maharaja",
    description:
      "Tandoor chicken folded into a velvet tomato-cream gravy, finished with kasoori methi and gold.",
    price: 720,
    category: "Main Course",
    veg: false,
    image: img("photo-1603894584373-5ac82b2ae398"),
    signature: true,
  },
  {
    id: "d7",
    name: "Dal Maharani",
    description:
      "Black lentils slow-simmered overnight over charcoal with cream, butter and heirloom spices.",
    price: 480,
    category: "Main Course",
    veg: true,
    image: img("photo-1626074353765-517a681e40be"),
    signature: true,
  },
  {
    id: "d8",
    name: "Paneer Makhanwala",
    description:
      "Handmade cottage cheese in a silky makhani gravy, perfumed with fenugreek and cardamom.",
    price: 560,
    category: "Main Course",
    veg: true,
    image: img("photo-1631452180775-06d7f6be1cc4"),
  },
  {
    id: "d9",
    name: "Rogan Josh",
    description:
      "A Kashmiri heirloom — lamb shanks braised in ratanjot, fennel and dry ginger.",
    price: 740,
    category: "Main Course",
    veg: false,
    image: img("photo-1574484284002-952d92456975"),
  },
  {
    id: "d10",
    name: "Garlic Naan",
    description:
      "Pillowy tandoor bread crowned with roasted garlic, fresh coriander and clarified butter.",
    price: 120,
    category: "Breads",
    veg: true,
    image: img("photo-1626100134240-71f7f9d1c9d1"),
  },
  {
    id: "d11",
    name: "Sheermal Zafrani",
    description:
      "Saffron-scented sweet flatbread from the royal ovens of Awadh, glazed with milk and ghee.",
    price: 160,
    category: "Breads",
    veg: true,
    image: img("photo-1565557623262-b51c2513a641"),
  },
  {
    id: "d12",
    name: "Lachha Paratha",
    description:
      "Hand-pulled layered wholewheat bread, crisp, flaky, brushed with mountain butter.",
    price: 140,
    category: "Breads",
    veg: true,
    image: img("photo-1619221882220-947b3d3c8861"),
  },
  {
    id: "d13",
    name: "Hyderabadi Dum Biryani",
    description:
      "Aged basmati and lamb sealed in a copper handi, opened tableside — steam of saffron and mint.",
    price: 820,
    category: "Rice & Biryani",
    veg: false,
    image: img("photo-1563379091339-03b21ab4a4f8"),
    signature: true,
  },
  {
    id: "d14",
    name: "Awadhi Vegetable Biryani",
    description:
      "Basmati layered with garden vegetables, kewra, saffron and slow-cooked under dough seal.",
    price: 620,
    category: "Rice & Biryani",
    veg: true,
    image: img("photo-1596797038530-2c107229654b"),
  },
  {
    id: "d15",
    name: "Jeera Pulao",
    description:
      "Fragrant basmati tempered with cumin, bay and whole spices from the Malabar coast.",
    price: 380,
    category: "Rice & Biryani",
    veg: true,
    image: img("photo-1596560548464-f010549b84d7"),
  },
  {
    id: "d16",
    name: "Shahi Tukda",
    description:
      "Saffron-milk soaked bread of the Mughal courts, crowned with pistachio, rose and silver leaf.",
    price: 340,
    category: "Desserts",
    veg: true,
    image: img("photo-1590080875515-8a3a8dc5735e"),
    signature: true,
  },
  {
    id: "d17",
    name: "Gulab Jamun",
    description:
      "Warm khoya dumplings bathed in cardamom-rose syrup, a timeless royal indulgence.",
    price: 260,
    category: "Desserts",
    veg: true,
    image: img("photo-1601303516361-4b2c3d70e2e2"),
  },
  {
    id: "d18",
    name: "Kesar Pista Kulfi",
    description:
      "Slow-reduced milk ice, dense as marble, veined with saffron and Iranian pistachio.",
    price: 280,
    category: "Desserts",
    veg: true,
    image: img("photo-1567206563064-6f60f40a2b57"),
  },
  {
    id: "d19",
    name: "Masala Chai",
    description:
      "Assam leaves simmered with cardamom, clove and ginger — poured tableside in brass.",
    price: 140,
    category: "Beverages",
    veg: true,
    image: img("photo-1571934811356-5cc061b6821f"),
  },
  {
    id: "d20",
    name: "Rose Falooda",
    description:
      "Rose syrup, vermicelli, basil seeds and kulfi in a chilled goblet — the summer drink of queens.",
    price: 260,
    category: "Beverages",
    veg: true,
    image: img("photo-1541696490-8744a5dc0228"),
  },
];

export const SIGNATURE_DISHES = DISHES.filter((d) => d.signature).slice(0, 6);

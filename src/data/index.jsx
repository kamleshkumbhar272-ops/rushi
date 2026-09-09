import {
  FaPizzaSlice,
  FaLeaf,
  FaMugHot,
  FaIceCream,
  FaUtensils,
  FaHeart,
} from "react-icons/fa";




import gallery1 from "../assets/images/gallery/gallery1.webp";
import gallery2 from "../assets/images/gallery/gallery2.webp";
import gallery3 from "../assets/images/gallery/gallery3.webp";
import gallery4 from "../assets/images/gallery/gallery4.webp";
import gallery5 from "../assets/images/gallery/gallery5.webp";




// ─── NAV LINKS ────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',    href: '/' },
  { label: 'Menu',    href: '/menu' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About',   href: '/about' },
  { label: 'Contact', href: '/contact' },
  
];





export const CRAFT_ITEMS = [
  {
    id: 1,
    icon: FaPizzaSlice,
    title: "Freshly Made Pizzas",
    description:
      "Our pizzas are prepared with handcrafted dough, premium cheese, fresh vegetables, and baked to perfection for an authentic taste.",
  },
  {
    id: 2,
    icon: FaLeaf,
    title: "Fresh & Quality Ingredients",
    description:
      "We use carefully selected fresh vegetables, herbs, and high-quality ingredients to ensure every dish is delicious and healthy.",
  },
  {
    id: 3,
    icon: FaUtensils,
    title: "Wide Variety of Dishes",
    description:
      "From pizzas and burgers to Chinese, pasta, momos, fries, shakes, and mocktails, there's something for everyone.",
  },
  {
    id: 4,
    icon: FaMugHot,
    title: "Refreshing Beverages",
    description:
      "Enjoy our signature cold coffees, thick shakes, mojitos, and refreshing mocktails crafted to complement your meal.",
  },
  {
    id: 5,
    icon: FaIceCream,
    title: "Comfortable Dining Experience",
    description:
      "Relax in our clean, cozy, and family-friendly atmosphere where great food meets warm hospitality.",
  },
  {
    id: 6,
    icon: FaHeart,
    title: "Made With Love",
    description:
      "Every meal is prepared with passion and attention to detail because we believe great food creates unforgettable memories.",
  },
];


export const GALLERY_ITEMS = [
  {
    image: gallery1,
    label: "Butter paneer ",
  },
  {
    image: gallery2,
    label: "Dal Makhani",
  },
  {
    image: gallery3,
    label: "MOMOS",
  },
  {
    image: gallery4,
    label: "Green Bowl",
  },
  {
    image: gallery5,
    label: "Special Thali",
  },
];





// ─── TESTIMONIALS ─────────────────────────────────────
export const TESTIMONIALS = [
  {
    text: 'We are immensely committed to our customers. Wherever we are, they are always satisfied. Our dedication to quality and warmth shows in every dish — I cannot recommend New Vatika Café enough.',
    author: 'Sarry Sayar',
    role: 'Regular Guest, Hingoli',
    stars: '★★★★★',
  },
  {
    text: 'The ambiance is simply magical in the evenings. Fairy lights, gold accents, and the most incredible paneer makhani I have ever tasted. This place is a hidden gem.',
    author: 'Priya Mehta',
    role: 'Food Blogger, Aurangabad',
    stars: '★★★★★',
  },
  {
    text: 'From the moment we walked in, the warmth was palpable. The signature starters are an absolute must. We have made New Vatika Café our monthly tradition.',
    author: 'Rahul Deshmukh',
    role: 'Family Visitor, Nanded',
    stars: '★★★★☆',
  },
];

// ─── VISIT INFO ───────────────────────────────────────
export const VISIT_INFO = [
  {
    icon: '🕐',
    title: 'Opening Hours',
    lines: ['Open Daily: 12 PM to 9 PM', 'Visit our evening special hours for dinner.'],
  },
  {
    icon: '📍',
    title: 'Address',
    lines: [
      '230, Gattin Chee, Rarathe,',
      'Horochomaaro Road, Nava Miots,',
      'Hingoli, Maharashtra — 431513',
    ],
  },
  {
    icon: '📞',
    title: 'Reservations',
    lines: ['Call us to book your table.', 'Walk-ins welcome during off-peak hours.'],
  },
];

// ─── FOOTER LINKS ─────────────────────────────────────
export const FOOTER_HOURS = [
  { label: 'Mon – Fri: 12–9 PM', href: '#' },
  { label: 'Sat – Sun: 11–9 PM', href: '#' },
  { label: 'Public Holidays: 12–8 PM', href: '#' },
];

export const FOOTER_LEGAL = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Use', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

export const FOOTER_SOCIALS = [
  { icon: '📸', label: 'Instagram', href: '#' },
  { icon: '👤', label: 'Facebook', href: '#' },
  { icon: '🐦', label: 'Twitter', href: '#' },
];

// ─── MAP EMBED ────────────────────────────────────────
export const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.6!2d77.15!3d19.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDQzJzA3LjIiTiA3N8KwMDknMDAuMCJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin';



  // ─── MENU DATA ────────────────────────────────────────

export const STARTERS = [
  {
    name: 'Chicken Tikka',
    price: 15,
    description: 'Tender chicken marinated in spiced yogurt, grilled in a tandoor until charred and smoky.',
  },
  {
    name: 'Paneer Makhani',
    price: 18,
    description: 'Soft paneer cubes in a rich, buttery tomato gravy with a hint of cream and kasuri methi.',
  },
  {
    name: 'Dal Makhani',
    price: 12,
    description: 'Black lentils slow-cooked overnight with butter, cream, and a medley of whole spices.',
  },
  {
    name: 'Chicken Tikka',
    price: 15,
    description: 'Our signature tandoori starter — juicy, smoky, and served with green chutney.',
  },
  {
    name: 'Tandoori Roti',
    price: 3,
    description: 'Whole wheat flatbread baked fresh in a clay oven, brushed with butter.',
  },
];

export const MAIN_COURSE = [
  {
    name: 'Paneer Makhani',
    price: 18,
    description: 'Rich cottage cheese curry with a velvety tomato-butter sauce, a house favourite.',
  },
  {
    name: 'Dal Makhani',
    price: 12,
    description: 'Black lentils simmered low and slow with cream and aromatic spices.',
  },
  {
    name: 'Shahi Paneer',
    price: 16,
    description: 'Royal paneer in a cashew-onion gravy, fragrant with saffron and cardamom.',
  },
  {
    name: 'Shahi Paneer',
    price: 16,
    description: 'Paneer in a luscious Mughlai-style gravy — rich, fragrant, and deeply satisfying.',
  },
  {
    name: 'Basmati Rice',
    price: 4,
    description: 'Long-grain aged basmati, steamed to perfection — the ideal companion to any curry.',
  },
];

export const BRICK_OVEN = {
  basePrice: 12,
  items: [
    {
      name: 'Classic Cheese',
      description: 'A description of the item on the menu.',
    },
    {
      name: 'Prosciutto + Honey',
      description: 'A description of the item on the menu.',
    },
    {
      name: 'Truffle + Mushroom',
      description: 'A description of the item on the menu.',
    },
  ],
  note: 'This is a description of the specialty items above. Here you can add any additional information.',
};

export const SIDES = [
  { name: 'Menu Item Name', price: 12 },
  { name: 'Menu Item Name', price: 12 },
  { name: 'Menu Item Name', price: 12 },
  { name: 'Menu Item Name', price: 12 },
];

export const DESSERTS_SIMPLE = [
  { name: 'Menu Item Name', price: 12 },
  { name: 'Menu Item Name', price: 12 },
  { name: 'Menu Item Name', price: 12 },
  { name: 'Menu Item Name', price: 12 },
];

export const SIDES_FEATURED = [
  {
    name: 'Chicken Tikka',
    price: 15,
    description: 'This is a description of the item on the menu, list all the ingredients and details here.',
  },
];

export const DESSERTS_FEATURED = [
  {
    name: 'Gulab Jamun',
    price: 8,
    description: 'This is a description of the item on the menu, ingredients and details here.',
  },
];

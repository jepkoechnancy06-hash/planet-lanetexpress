import { Category, Store } from './types';
import { GroceriesIcon, PharmacyIcon, RestaurantIcon, ElectronicsIcon, GiftsIcon, PetsIcon, PackagesIcon, HardwareIcon } from './components/Icons';

export const CATEGORIES: Category[] = [
  { id: 'groceries', name: 'Groceries', description: 'Fresh produce & daily essentials', icon: GroceriesIcon },
  { id: 'pharmacy', name: 'Pharmacy', description: 'Medicines & wellness products', icon: PharmacyIcon },
  { id: 'restaurants', name: 'Restaurants', description: 'Your favorite local food', icon: RestaurantIcon },
  { id: 'electronics', name: 'Electronics', description: 'Gadgets and accessories', icon: ElectronicsIcon },
  { id: 'gifts', name: 'Flowers & Gifts', description: 'For every special occasion', icon: GiftsIcon },
  { id: 'pets', name: 'Pet Supplies', description: 'Everything for your furry friends', icon: PetsIcon },
  { id: 'packages', name: 'Packages', description: 'Send & receive parcels', icon: PackagesIcon },
  { id: 'hardware', name: 'Hardware', description: 'DIY tools and supplies', icon: HardwareIcon },
];

export const USER_LOCATION = {
  latitude: -1.286389, // Nairobi CBD
  longitude: 36.817223,
};

export const STORES: Record<string, Store[]> = {
  groceries: [
    { id: 'g1', name: 'Naivas Supermarket', deliveryTime: '25-35 min', rating: 4.8, image: 'https://picsum.photos/seed/naivas/400/300', category: 'Groceries', description: "Kenya's trusted supermarket for fresh groceries, household goods, and everyday essentials.", popularItems: ["Unga ya Dola", "Brookside Milk", "Sukuma Wiki", "Farmer's Choice Sausages"], deliveryAddress: "Moi Avenue, Nairobi", deliveryFee: 250, latitude: -1.2842, longitude: 36.8219, products: [
      { id: 'g1p1', name: 'Unga ya Dola (2kg)', price: 210 },
      { id: 'g1p2', name: 'Brookside Milk (500ml)', price: 65 },
      { id: 'g1p3', name: 'Sukuma Wiki (Bunch)', price: 50 },
      { id: 'g1p4', name: "Farmer's Choice Sausages", price: 350 },
      { id: 'g1p5', name: 'Broadways Bread', price: 60 },
      { id: 'g1p6', name: 'Kimbo Cooking Oil (1L)', price: 320 },
      { id: 'g1p7', name: 'Onions (kg)', price: 150 },
      { id: 'g1p8', name: 'Tomatoes (kg)', price: 120 },
    ]},
    { id: 'g2', name: 'Carrefour Kenya', deliveryTime: '30-45 min', rating: 4.7, image: 'https://picsum.photos/seed/carrefour/400/300', category: 'Groceries', description: "Great deals on a wide selection of groceries, electronics, and home appliances.", popularItems: ["Fresh Tilapia", "Imported Cheese", "Rotisserie Chicken", "Blueband"], deliveryAddress: "The Hub, Karen", deliveryFee: 350, latitude: -1.3216, longitude: 36.7345, products: [
      { id: 'g2p1', name: 'Fresh Tilapia (per kg)', price: 600 },
      { id: 'g2p2', name: 'Cheddar Cheese (200g)', price: 450 },
      { id: 'g2p3', name: 'Whole Rotisserie Chicken', price: 800 },
      { id: 'g2p4', name: 'Blueband (500g)', price: 280 },
      { id: 'g2p5', name: 'Barilla Pasta', price: 300 },
      { id: 'g2p6', name: 'Carrefour Bottled Water', price: 50 },
    ] },
    { id: 'g3', name: 'Quickmart', deliveryTime: '20-30 min', rating: 4.6, image: 'https://picsum.photos/seed/quickmart/400/300', category: 'Groceries', description: "Fresh and easy shopping. Your convenient stop for groceries, fresh bakes, and ready-to-eat meals.", popularItems: ["Freshly Baked Bread", "Deli Meats", "Tuzo Yogurt", "Vegetable Samosas"], deliveryAddress: "Lavington Mall, Nairobi", deliveryFee: 200, latitude: -1.2782, longitude: 36.7821, products: [
      { id: 'g3p1', name: 'Freshly Baked White Bread', price: 70 },
      { id: 'g3p2', name: 'Smoked Ham (100g)', price: 250 },
      { id: 'g3p3', name: 'Tuzo Yogurt (500ml)', price: 130 },
      { id: 'g3p4', name: 'Vegetable Samosa (each)', price: 60 },
      { id: 'g3p5', name: 'Fresh Orange Juice', price: 200 },
      { id: 'g3p6', name: 'Maziwa Lala', price: 60 },
    ] },
  ],
  pharmacy: [
    { id: 'p1', name: 'Goodlife Pharmacy', deliveryTime: '20-30 min', rating: 4.9, image: 'https://picsum.photos/seed/goodlife/400/300', category: 'Pharmacy', description: "Your partner in health and wellness. Wide range of pharmaceuticals, supplements, and personal care products.", popularItems: ["Action Painkillers", "Multivitamins", "Sunscreen", "First-Aid Kits"], deliveryAddress: "Westgate Mall, Westlands", deliveryFee: 300, latitude: -1.2588, longitude: 36.8011, products: [
      { id: 'p1p1', name: 'Action Painkillers (strip)', price: 50 },
      { id: 'p1p2', name: 'Wellman Multivitamins', price: 1500 },
      { id: 'p1p3', name: 'Nivea Sunscreen SPF50', price: 1200 },
      { id: 'p1p4', name: 'Complete First-Aid Kit', price: 2500 },
      { id: 'p1p5', name: 'Vitamin C Tablets', price: 400 },
    ] },
    { id: 'p2', name: 'Haltons Pharmacy', deliveryTime: '30-40 min', rating: 4.7, image: 'https://picsum.photos/seed/haltons/400/300', category: 'Pharmacy', description: "Affordable and accessible healthcare. Professional pharmacy services and genuine medication.", popularItems: ["Antihistamines", "Prescription Refills", "Blood Pressure Monitors", "Dettol"], deliveryAddress: "Buruburu Shopping Centre", deliveryFee: 350, latitude: -1.2862, longitude: 36.8741, products: [
      { id: 'p2p1', name: 'Cetirizine Antihistamine', price: 150 },
      { id: 'p2p2', name: 'Omron BP Monitor', price: 5500 },
      { id: 'p2p3', name: 'Dettol Antiseptic (250ml)', price: 300 },
      { id: 'p2p4', name: 'Hand Sanitizer', price: 120 },
    ] },
  ],
  restaurants: [
    { id: 'r1', name: 'Java House', deliveryTime: '30-40 min', rating: 4.7, image: 'https://picsum.photos/seed/java/400/300', category: 'Restaurants', description: "The authentic Kenyan coffee house experience. Enjoy our signature coffee, delicious meals, and pastries.", popularItems: ["Chicken Stir-fry", "Java Dawa", "Carrot Cake", "Beef Samosas"], deliveryAddress: "Mama Ngina Street, CBD", deliveryFee: 300, latitude: -1.2868, longitude: 36.8234, products: [
      { id: 'r1p1', name: 'Chicken Stir-fry', price: 950 },
      { id: 'r1p2', name: 'Java Dawa', price: 350 },
      { id: 'r1p3', name: 'Carrot Cake Slice', price: 450 },
      { id: 'r1p4', name: 'Beef Samosas (3 pcs)', price: 400 },
      { id: 'r1p5', name: 'Classic Burger', price: 1000 },
      { id: 'r1p6', name: 'House Coffee', price: 250 },
    ] },
    { id: 'r2', name: 'Artcaffe', deliveryTime: '40-50 min', rating: 4.8, image: 'https://picsum.photos/seed/artcaffe/400/300', category: 'Restaurants', description: "A vibrant social space with artisanal coffee, fresh pastries, and a creative European-inspired menu.", popularItems: ["Artisanal Pizza", "Urban Gourmet Burger", "Salted Caramel Latte", "Croissants"], deliveryAddress: "The Oval, Westlands", deliveryFee: 400, latitude: -1.2644, longitude: 36.8052, products: [
      { id: 'r2p1', name: 'Margherita Pizza', price: 1200 },
      { id: 'r2p2', name: 'Urban Gourmet Burger', price: 1400 },
      { id: 'r2p3', name: 'Salted Caramel Latte', price: 420 },
      { id: 'r2p4', name: 'Almond Croissant', price: 350 },
    ] },
    { id: 'r3', name: 'Mama Oliech Restaurant', deliveryTime: '45-55 min', rating: 4.9, image: 'https://picsum.photos/seed/mamaoliech/400/300', category: 'Restaurants', description: "Famous for the best-fried tilapia in town. An authentic taste of lakeside Kenyan cuisine.", popularItems: ["Whole Fried Tilapia", "Ugali", "Kachumbari", "Managu"], deliveryAddress: "Marcus Garvey Road, Hurlingham", deliveryFee: 350, latitude: -1.2941, longitude: 36.7905, products: [
      { id: 'r3p1', name: 'Whole Fried Tilapia', price: 900 },
      { id: 'r3p2', name: 'Ugali', price: 100 },
      { id: 'r3p3', name: 'Kachumbari', price: 100 },
      { id: 'r3p4', name: 'Managu (traditional greens)', price: 200 },
    ] },
    { id: 'r4', name: 'Big Square', deliveryTime: '25-35 min', rating: 4.6, image: 'https://picsum.photos/seed/bigsquare/400/300', category: 'Restaurants', description: "Casual dining with square-patty burgers, ribs, and crispy fried chicken. Perfect for families.", popularItems: ["The Big Square Burger", "BBQ Ribs", "Cajun Fries", "Oreo Milkshake"], deliveryAddress: "Adlife Plaza, Kilimani", deliveryFee: 250, latitude: -1.2982, longitude: 36.7842, products: [
      { id: 'r4p1', name: 'The Big Square Burger', price: 850 },
      { id: 'r4p2', name: 'Half Rack BBQ Ribs', price: 1300 },
      { id: 'r4p3', name: 'Cajun Fries', price: 250 },
      { id: 'r4p4', name: 'Oreo Milkshake', price: 500 },
    ] },
  ],
  electronics: [
    { id: 'e1', name: 'Hotpoint Appliances', deliveryTime: '60-90 min', rating: 4.8, image: 'https://picsum.photos/seed/hotpoint/400/300', category: 'Electronics', description: "Kenya's leading retailer for home and kitchen appliances from top international brands.", popularItems: ["LG Refrigerators", "Von Cookers", "Samsung TVs", "Ariston Water Heaters"], deliveryAddress: "Sarit Centre, Westlands", deliveryFee: 600, latitude: -1.2625, longitude: 36.8048, products: [] },
    { id: 'e2', name: 'PhoneXpress Kenya', deliveryTime: '45-60 min', rating: 4.7, image: 'https://picsum.photos/seed/phonexpress/400/300', category: 'Electronics', description: "Your trusted dealer for genuine smartphones, tablets, and mobile accessories.", popularItems: ["iPhone Chargers", "Samsung Galaxy Phones", "Screen Protectors", "Power Banks"], deliveryAddress: "Luthuli Avenue, CBD", deliveryFee: 500, latitude: -1.2885, longitude: 36.8250, products: [] },
  ],
  gifts: [
    { id: 'gf1', name: 'Purpink Gifts', deliveryTime: 'Same-day', rating: 4.9, image: 'https://picsum.photos/seed/purpink/400/300', category: 'Gifts', description: "Curated gift boxes, beautiful flower arrangements, and personalized items for every special moment.", popularItems: ["Flower Bouquets", "Custom Mugs", "Wine & Chocolate Baskets", "Perfume Sets"], deliveryAddress: "Online, Nairobi Hub", deliveryFee: 450, latitude: -1.2750, longitude: 36.8150, products: [] },
  ],
  pets: [
    { id: 'pt1', name: 'The Pet Store Kenya', deliveryTime: '30-40 min', rating: 4.9, image: 'https://picsum.photos/seed/petstore/400/300', category: 'Pet Supplies', description: "A one-stop shop for all your pet needs, from premium food and treats to toys and grooming supplies.", popularItems: ["Royal Canin Dog Food", "Cat Litter", "Chew Toys", "Fish Food"], deliveryAddress: "Yaya Centre, Hurlingham", deliveryFee: 300, latitude: -1.2974, longitude: 36.7865, products: [] },
  ],
  packages: [
    { id: 'pk1', name: 'Sendy Express', deliveryTime: 'Varies', rating: 4.8, image: 'https://picsum.photos/seed/sendy/400/300', category: 'Packages', description: "On-demand and scheduled parcel delivery across the city. Fast, reliable, and trackable.", popularItems: ["Motorbike Delivery", "Document Courier", "Small Package Shipping", "Errand Running"], deliveryAddress: "Ngong Road, Nairobi", deliveryFee: 500, latitude: -1.3000, longitude: 36.7819, products: [] },
  ],
  hardware: [
    { id: 'h1', name: 'SuperBrite Hardware', deliveryTime: '45-60 min', rating: 4.7, image: 'https://picsum.photos/seed/hardware2/400/300', category: 'Hardware', description: "Your local hardware for all DIY projects. Find everything from paint and tools to plumbing and electrical supplies.", popularItems: ["Crown Paint", "Padlocks", "LED Bulbs", "Hammer & Nails"], deliveryAddress: "Industrial Area, Nairobi", deliveryFee: 700, latitude: -1.3179, longitude: 36.8488, products: [] },
  ],
};

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

export const STORES: Record<string, Store[]> = {
  groceries: [
    { id: 'g1', name: 'Organic Oasis', deliveryTime: '25-35 min', rating: 4.8, image: 'https://picsum.photos/seed/groceries1/400/300', category: 'Groceries' },
    { id: 'g2', name: 'QuickMart', deliveryTime: '15-25 min', rating: 4.5, image: 'https://picsum.photos/seed/groceries2/400/300', category: 'Groceries' },
    { id: 'g3', name: 'The Global Pantry', deliveryTime: '30-45 min', rating: 4.9, image: 'https://picsum.photos/seed/groceries3/400/300', category: 'Groceries' },
  ],
  pharmacy: [
    { id: 'p1', name: 'Wellness Pharmacy', deliveryTime: '20-30 min', rating: 4.9, image: 'https://picsum.photos/seed/pharmacy1/400/300', category: 'Pharmacy' },
    { id: 'p2', name: 'HealthFirst Meds', deliveryTime: '30-40 min', rating: 4.7, image: 'https://picsum.photos/seed/pharmacy2/400/300', category: 'Pharmacy' },
  ],
  restaurants: [
    { id: 'r1', name: 'Pizza Planet', deliveryTime: '30-40 min', rating: 4.6, image: 'https://picsum.photos/seed/food1/400/300', category: 'Restaurants' },
    { id: 'r2', name: 'Sushi Universe', deliveryTime: '40-50 min', rating: 4.9, image: 'https://picsum.photos/seed/food2/400/300', category: 'Restaurants' },
    { id: 'r3', name: 'Taco Galaxy', deliveryTime: '25-35 min', rating: 4.7, image: 'https://picsum.photos/seed/food3/400/300', category: 'Restaurants' },
    { id: 'r4', name: 'Burger Barn', deliveryTime: '20-30 min', rating: 4.4, image: 'https://picsum.photos/seed/food4/400/300', category: 'Restaurants' },
  ],
  electronics: [
    { id: 'e1', name: 'Gadget Hub', deliveryTime: '45-60 min', rating: 4.8, image: 'https://picsum.photos/seed/tech1/400/300', category: 'Electronics' },
    { id: 'e2', name: 'Connect IT', deliveryTime: '60-90 min', rating: 4.6, image: 'https://picsum.photos/seed/tech2/400/300', category: 'Electronics' },
  ],
  gifts: [
    { id: 'gf1', name: 'Blooms & More', deliveryTime: '30-45 min', rating: 4.9, image: 'https://picsum.photos/seed/gifts1/400/300', category: 'Gifts' },
    { id: 'gf2', name: 'The Gifting Tree', deliveryTime: '40-55 min', rating: 4.8, image: 'https://picsum.photos/seed/gifts2/400/300', category: 'Gifts' },
  ],
  pets: [
    { id: 'pt1', name: 'Paws & Whiskers', deliveryTime: '25-35 min', rating: 4.9, image: 'https://picsum.photos/seed/pets1/400/300', category: 'Pet Supplies' },
  ],
  packages: [
    { id: 'pk1', name: 'Express Courier', deliveryTime: 'Varies', rating: 4.9, image: 'https://picsum.photos/seed/packages1/400/300', category: 'Packages' },
  ],
  hardware: [
    { id: 'h1', name: 'Bolt & Nut Hardware', deliveryTime: '45-60 min', rating: 4.7, image: 'https://picsum.photos/seed/hardware1/400/300', category: 'Hardware' },
  ],
};

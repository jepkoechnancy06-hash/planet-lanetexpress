import React from 'react';

export enum View {
  Home = 'home',
  Stores = 'stores',
  StoreDetail = 'storeDetail',
  Cart = 'cart',
  Tracking = 'tracking',
  History = 'history',
  SearchResults = 'searchResults',
}

export interface Category {
  id: string;
  name:string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Store {
  id: string;
  name: string;
  deliveryTime: string;
  rating: number;
  image: string;
  category: string;
  description: string;
  popularItems: string[];
  deliveryAddress: string;
  deliveryFee: number;
  latitude: number;
  longitude: number;
  products: Product[];
}

export interface PastOrder {
  id: string;
  storeName: string;
  storeImage: string;
  date: string;
  itemCount: number;
}
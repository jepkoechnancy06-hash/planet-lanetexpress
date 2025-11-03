import React from 'react';

export enum View {
  Home = 'home',
  Stores = 'stores',
  Tracking = 'tracking',
  History = 'history',
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface Store {
  id: string;
  name: string;
  deliveryTime: string;
  rating: number;
  image: string;
  category: string;
}

export interface PastOrder {
  id: string;
  storeName: string;
  storeImage: string;
  date: string;
  itemCount: number;
}

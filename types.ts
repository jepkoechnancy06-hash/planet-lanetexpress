
import React from 'react';

export enum View {
  Home = 'home',
  Stores = 'stores',
  Tracking = 'tracking',
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

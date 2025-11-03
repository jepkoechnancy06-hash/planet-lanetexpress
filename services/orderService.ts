import { PastOrder } from '../types';

const STORAGE_KEY = 'planet-lanet-express-orders';

export const getPastOrders = (): PastOrder[] => {
  try {
    const storedOrders = localStorage.getItem(STORAGE_KEY);
    return storedOrders ? JSON.parse(storedOrders) : [];
  } catch (error) {
    console.error("Failed to parse orders from localStorage", error);
    return [];
  }
};

export const saveOrder = (order: Omit<PastOrder, 'id'>): void => {
  try {
    const pastOrders = getPastOrders();
    const newOrder: PastOrder = {
        ...order,
        id: new Date().toISOString() + Math.random(), // simple unique id
    }
    const updatedOrders = [newOrder, ...pastOrders];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
  } catch (error) {
    console.error("Failed to save order to localStorage", error);
  }
};

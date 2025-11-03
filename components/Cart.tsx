import React from 'react';
import { CartItem, Store } from '../types';
import { ArrowLeftIcon, PlusIcon, MinusIcon, TrashIcon } from './Icons';

interface CartProps {
  cart: CartItem[];
  store: Store;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onPlaceOrder: () => void;
  onGoBack: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, store, onUpdateQuantity, onPlaceOrder, onGoBack }) => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const total = subtotal + store.deliveryFee;

    if (cart.length === 0) {
        return (
            <div className="text-center p-8 animate-fade-in">
                <h2 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h2>
                <p className="text-slate-400 mb-6">Add some products to get started!</p>
                <button
                    onClick={onGoBack}
                    className="bg-cyan-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-cyan-500 transition-colors duration-300 flex items-center gap-2 mx-auto"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                    Continue Shopping
                </button>
            </div>
        );
    }

  return (
    <div className="p-4 md:p-8 animate-fade-in">
        <button
            onClick={onGoBack}
            className="flex items-center gap-2 mb-6 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
        >
            <ArrowLeftIcon />
            Back to Store
        </button>

        <h1 className="text-3xl font-bold text-white mb-6">Your Cart from {store.name}</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
                <div className="space-y-4">
                    {cart.map(({ product, quantity }) => (
                        <div key={product.id} className="bg-slate-800 rounded-lg p-4 flex items-center gap-4 border border-slate-700">
                            <div className="flex-grow">
                                <h3 className="font-semibold text-white">{product.name}</h3>
                                <p className="text-sm text-cyan-400">KES {product.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => onUpdateQuantity(product.id, quantity - 1)} className="p-1 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"><MinusIcon className="w-4 h-4" /></button>
                                <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                                <button onClick={() => onUpdateQuantity(product.id, quantity + 1)} className="p-1 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"><PlusIcon className="w-4 h-4" /></button>
                            </div>
                            <div className="text-right w-24">
                                <p className="font-bold text-white">KES {(product.price * quantity).toFixed(2)}</p>
                            </div>
                            <button onClick={() => onUpdateQuantity(product.id, 0)} className="text-slate-500 hover:text-red-400 transition-colors"><TrashIcon className="w-5 h-5"/></button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:w-1/3">
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 sticky top-24">
                    <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
                    <div className="space-y-2 text-slate-300 mb-6">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>KES {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery Fee</span>
                            <span>KES {store.deliveryFee.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between font-bold text-white text-lg border-t border-slate-700 pt-2 mt-2">
                            <span>Total</span>
                            <span>KES {total.toFixed(2)}</span>
                        </div>
                    </div>
                    <button 
                        onClick={onPlaceOrder}
                        className="w-full bg-cyan-600 text-white font-bold py-3 rounded-md hover:bg-cyan-500 transition-colors duration-300"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>

    </div>
  );
};

export default Cart;

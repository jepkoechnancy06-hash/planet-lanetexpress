import React, { useState, useEffect } from 'react';
import { PastOrder } from '../types';
import { getPastOrders } from '../services/orderService';
import { ArrowLeftIcon } from './Icons';

interface OrderHistoryProps {
    onGoHome: () => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ onGoHome }) => {
    const [orders, setOrders] = useState<PastOrder[]>([]);

    useEffect(() => {
        setOrders(getPastOrders());
    }, []);

    if (orders.length === 0) {
        return (
            <div className="text-center p-8 animate-fade-in">
                <h2 className="text-3xl font-bold text-white mb-4">Your Order History is Empty</h2>
                <p className="text-slate-400 mb-6">Looks like you haven't placed any orders yet. Let's change that!</p>
                <button
                    onClick={onGoHome}
                    className="bg-cyan-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-cyan-500 transition-colors duration-300"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 animate-fade-in">
            <button
              onClick={onGoHome}
              className="flex items-center gap-2 mb-6 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
            >
              <ArrowLeftIcon />
              Back to Home
            </button>
            <h2 className="text-3xl font-bold mb-6 text-white">Your Past Orders</h2>
            <div className="space-y-4">
                {orders.map(order => {
                    // Generate placeholder items for display
                    const placeholderItems = Array.from({ length: order.itemCount }, (_, i) => `Item ${i + 1}`);

                    return (
                        <div key={order.id} className="bg-slate-800 rounded-lg p-4 flex items-start gap-4 border border-slate-700">
                            <img src={order.storeImage} alt={order.storeName} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                            <div className="flex-grow">
                                <h3 className="font-bold text-lg text-white">{order.storeName}</h3>
                                <p className="text-sm text-slate-400 mb-3">
                                    {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                                <div className="border-t border-slate-700 pt-3">
                                    <h4 className="text-xs font-semibold uppercase text-slate-500 mb-2">Items</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {placeholderItems.map((item, index) => (
                                            <span key={index} className="bg-slate-700 text-slate-300 text-xs font-medium px-2 py-1 rounded">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="font-bold text-white">{order.itemCount} items</p>
                                <p className="text-sm text-slate-500">Delivered</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderHistory;

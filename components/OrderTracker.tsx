
import React, { useState, useEffect } from 'react';
import { Store } from '../types';
import { CheckCircleIcon } from './Icons';

interface OrderTrackerProps {
  store: Store;
}

const STATUSES = [
  "Order Placed",
  "Preparing Your Order",
  "Rider Dispatched",
  "Out for Delivery",
  "Delivered"
];

const OrderTracker: React.FC<OrderTrackerProps> = ({ store }) => {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatusIndex(prevIndex => {
        if (prevIndex < STATUSES.length - 1) {
          return prevIndex + 1;
        }
        clearInterval(interval);
        return prevIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">Tracking Your Order</h2>
      <p className="text-slate-400 mb-8">From <span className="font-semibold text-cyan-400">{store.name}</span></p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="font-bold text-lg mb-4 text-white">Delivery Status</h3>
            <div className="relative pl-4">
                <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-slate-700" />
                 {STATUSES.map((status, index) => {
                    const isActive = index <= currentStatusIndex;
                    return (
                        <div key={status} className="flex items-start gap-4 mb-6 relative">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'bg-cyan-500 border-cyan-400' : 'bg-slate-700 border-slate-600'} transition-all duration-500`}>
                                {isActive && <CheckCircleIcon className="w-5 h-5 text-white" />}
                            </div>
                            <div>
                                <p className={`font-semibold ${isActive ? 'text-white' : 'text-slate-400'} transition-colors duration-500`}>{status}</p>
                                {index === 0 && <p className="text-sm text-slate-500">We've received your order.</p>}
                                {index === 1 && isActive && <p className="text-sm text-slate-500">{store.name} is preparing your items.</p>}
                            </div>
                        </div>
                    )
                 })}
            </div>
        </div>
        <div className="lg:col-span-2 rounded-lg overflow-hidden border border-slate-700">
            <img src={`https://picsum.photos/seed/${store.id}map/800/600`} alt="Delivery Map" className="w-full h-full object-cover min-h-[300px] lg:min-h-0"/>
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;

import React, { useState, useEffect, useRef } from 'react';
import { Store } from '../types';
import { CheckCircleIcon } from './Icons';
import { saveOrder } from '../services/orderService';

interface OrderTrackerProps {
  store: Store;
}

const STATUSES = [
  { name: "Order Placed", description: "We've received your order." },
  { name: "Preparing Your Order", description: (storeName: string) => `${storeName} is preparing your items.` },
  { name: "Rider Dispatched", description: "Your rider is on the way to the store." },
  { name: "Out for Delivery", description: "Almost there! Your order is nearby." },
  { name: "Delivered", description: "Enjoy! Thank you for your order." }
];


const OrderTracker: React.FC<OrderTrackerProps> = ({ store }) => {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState("123 Cosmic Way, Nebula City, 98765");
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const orderSaved = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatusIndex(prevIndex => {
        const newIndex = prevIndex < STATUSES.length - 1 ? prevIndex + 1 : prevIndex;

        if (newIndex === STATUSES.length - 1 && !orderSaved.current) {
          saveOrder({
            storeName: store.name,
            storeImage: store.image,
            date: new Date().toISOString(),
            itemCount: Math.floor(Math.random() * 10) + 2, // Mock item count
          });
          orderSaved.current = true;
        }
        
        if (newIndex === prevIndex) {
            clearInterval(interval);
        }

        return newIndex;
      });
    }, 2500); // Faster interval for a more dynamic feel

    return () => clearInterval(interval);
  }, [store]);

  const progressPercentage = (currentStatusIndex / (STATUSES.length - 1)) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">Tracking Your Order</h2>
      <p className="text-slate-400 mb-8">From <span className="font-semibold text-cyan-400">{store.name}</span></p>
      
      <div className="mb-8">
          <div className="w-full bg-slate-700 rounded-full h-2.5">
              <div 
                className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: `${progressPercentage}%` }}>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="font-bold text-lg mb-4 text-white">Delivery Status</h3>
            <div className="relative pl-4">
                <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-slate-700" />
                 {STATUSES.map((status, index) => {
                    const isActive = index <= currentStatusIndex;
                    let descriptionText = '';
                    if (isActive) {
                        if (typeof status.description === 'function') {
                            descriptionText = status.description(store.name);
                        } else {
                            descriptionText = status.description;
                        }
                    }

                    return (
                        <div key={status.name} className="flex items-start gap-4 mb-6 relative">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'bg-cyan-500 border-cyan-400' : 'bg-slate-700 border-slate-600'} transition-all duration-500`}>
                                {isActive && <CheckCircleIcon className="w-5 h-5 text-white" />}
                            </div>
                            <div>
                                <p className={`font-semibold ${isActive ? 'text-white' : 'text-slate-400'} transition-colors duration-500`}>{status.name}</p>
                                {descriptionText && <p className="text-sm text-slate-500">{descriptionText}</p>}
                            </div>
                        </div>
                    )
                 })}
            </div>

            {/* Delivery Address Section */}
            {currentStatusIndex >= 3 && (
              <div className="mt-6 pt-6 border-t border-slate-700 animate-fade-in">
                <h3 className="font-bold text-lg mb-4 text-white">
                    {addressConfirmed || currentStatusIndex === 4 ? 'Delivery Address Confirmed' : 'Confirm Delivery Address'}
                </h3>
                {addressConfirmed || currentStatusIndex === 4 ? (
                    <p className="bg-slate-900/50 rounded-md p-3 text-slate-300 text-sm">{deliveryAddress}</p>
                ) : (
                    <div className="space-y-3">
                        <p className="text-sm text-slate-400">Please confirm or update your address for a smooth delivery.</p>
                        <input
                            type="text"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <button
                            onClick={() => setAddressConfirmed(true)}
                            className="w-full bg-cyan-600 text-white font-semibold py-2 rounded-md hover:bg-cyan-500 transition-colors duration-300"
                        >
                            Confirm Address
                        </button>
                    </div>
                )}
              </div>
            )}
        </div>
        <div className="lg:col-span-2 rounded-lg overflow-hidden border border-slate-700">
            <img src={`https://picsum.photos/seed/${store.id}map/800/600`} alt="Delivery Map" className="w-full h-full object-cover min-h-[300px] lg:min-h-0"/>
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;
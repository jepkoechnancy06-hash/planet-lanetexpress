import React, { useState, useEffect, useMemo } from 'react';
import { Store, CartItem } from '../types';
import { saveOrder } from '../services/orderService';
import { CheckCircleIcon } from './Icons';
import Map from './Map';
import { USER_LOCATION } from '../constants';

interface OrderTrackerProps {
  store: Store;
  cart: CartItem[];
}

const ORDER_STATUSES = [
  'Order placed',
  'Preparing your order',
  'Rider Dispatched',
  'Out for delivery',
  'Delivered',
];

const MOCK_RIDER = {
  name: 'James K.',
  avatar: 'https://i.pravatar.cc/150?u=jamesk',
}

// Haversine formula to calculate distance
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const OrderTracker: React.FC<OrderTrackerProps> = ({ store, cart }) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const orderSummary = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const distance = getDistance(USER_LOCATION.latitude, USER_LOCATION.longitude, store.latitude, store.longitude);
    const distanceFee = distance * 50; // KES 50 per KM
    const totalFee = store.deliveryFee + distanceFee;
    const total = subtotal + totalFee;
    return { subtotal, distance: distance.toFixed(2), distanceFee: distanceFee.toFixed(2), totalFee: totalFee.toFixed(2), total };
  }, [store, cart]);

  useEffect(() => {
    setStatusIndex(0);
    setProgress(0);
  
    const statusTimeouts = ORDER_STATUSES.slice(1).map((_, index) => {
      return setTimeout(() => {
        setStatusIndex(index + 1);
        
        if (index + 1 === ORDER_STATUSES.length - 1) {
          saveOrder({
            storeName: store.name,
            storeImage: store.image,
            date: new Date().toISOString(),
            itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
          });
        }
      }, (index + 1) * 4000);
    });

    const totalDuration = (ORDER_STATUSES.length - 1) * 4000;
    const updateInterval = 100;
    const progressIncrement = 100 / (totalDuration / updateInterval);

    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + progressIncrement;
      });
    }, updateInterval);

    return () => {
      statusTimeouts.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, [store, cart]);

  const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${store.latitude},${store.longitude}&zoom=14&size=800x800&maptype=roadmap&style=feature:all|element:labels|visibility:off&style=feature:road|element:geometry|color:0x374151&style=feature:landscape|element:geometry|color:0x1f2937&style=feature:water|element:geometry|color:0x4f46e5&key=${process.env.API_KEY}`;
  
  const showRiderInfo = statusIndex >= 2;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-grow lg:w-2/3 space-y-8">
        <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
           <div className="relative h-64 md:h-96">
             <Map store={store} progress={progress} imageUrl={mapImageUrl} />
           </div>
           <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <img src={store.image} alt={store.name} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                        <p className="text-sm text-slate-400">Your order from</p>
                        <h2 className="text-2xl font-bold text-white">{store.name}</h2>
                    </div>
                </div>
                <p className="text-lg text-cyan-400 font-semibold animate-pulse">{ORDER_STATUSES[statusIndex]}</p>
           </div>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`bg-slate-800 rounded-lg p-6 border border-slate-700 transition-opacity duration-500 ${showRiderInfo ? 'opacity-100' : 'opacity-0'}`}>
                <h3 className="text-xl font-bold mb-4 text-white">Your Rider</h3>
                {showRiderInfo ? (
                    <div className="flex items-center gap-4 animate-fade-in">
                        <img src={MOCK_RIDER.avatar} alt="Rider" className="w-12 h-12 rounded-full border-2 border-cyan-400"/>
                        <div>
                            <p className="font-bold text-white">{MOCK_RIDER.name}</p>
                            <p className="text-sm text-slate-400">Is on the way!</p>
                        </div>
                    </div>
                ) : (
                    <div className="h-12"></div>
                )}
            </div>
             <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-xl font-bold mb-4 text-white">Order Summary</h3>
                <div className="space-y-2 text-slate-300">
                    <div className="flex justify-between"><span>Subtotal</span> <span>KES {orderSummary.subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Base Fee</span> <span>KES {store.deliveryFee.toFixed(2)}</span></div>
                     <div className="flex justify-between text-sm text-slate-400"><span>Distance Fee ({orderSummary.distance} km)</span> <span>KES {orderSummary.distanceFee}</span></div>
                    <div className="flex justify-between font-bold text-white text-lg border-t border-slate-700 pt-2 mt-2"><span>Total</span> <span>KES {orderSummary.total.toFixed(2)}</span></div>
                </div>
            </div>
        </div>

      </div>

      <div className="lg:w-1/3">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 h-full">
          <h3 className="text-xl font-bold mb-6 text-white">Order Progress</h3>
            <ul className="flex flex-col">
              {ORDER_STATUSES.map((status, index) => (
                <li key={status} className="flex gap-4 flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-colors duration-500 ${
                        index <= statusIndex
                          ? 'bg-cyan-500 border-cyan-400'
                          : 'bg-slate-700 border-slate-600'
                      }`}
                    >
                      {index <= statusIndex ? (
                        <CheckCircleIcon className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-slate-400 font-bold">
                          {index + 1}
                        </span>
                      )}
                    </div>
                    {index < ORDER_STATUSES.length - 1 && (
                      <div
                        className={`w-0.5 flex-1 my-2 transition-colors duration-500 ${
                          index < statusIndex ? 'bg-cyan-400' : 'bg-slate-600'
                        }`}
                      ></div>
                    )}
                  </div>
                  <div className="pb-8 mt-1">
                    <p
                      className={`font-medium transition-colors duration-500 ${
                        index <= statusIndex ? 'text-white' : 'text-slate-500'
                      }`}
                    >
                      {status}
                    </p>
                    {index === ORDER_STATUSES.length - 1 &&
                      statusIndex === index && (
                        <p className="text-sm text-green-400 mt-1">
                          Thank you for your order!
                        </p>
                      )}
                  </div>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;

import React, { useState } from 'react';
import { Store } from '../types';
import { StarIcon, ClockIcon } from './Icons';

interface StoreCardProps {
  store: Store;
  onSelect: (store: Store) => void;
}

const StoreCard: React.FC<StoreCardProps> = ({ store, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the card's click handler from firing
    onSelect(store);
  };

  return (
    <div 
      className="bg-slate-800 rounded-lg overflow-hidden group border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img src={store.image} alt={store.name} className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-bold text-white">{store.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center text-sm text-slate-300 mb-4">
            <div className="flex items-center gap-1.5">
                <ClockIcon className="w-4 h-4 text-cyan-400" />
                <span>{store.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span>{store.rating}</span>
            </div>
        </div>

        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
          <div className="pt-4 mt-4 border-t border-slate-700">
            <p className="text-sm text-slate-400 mb-4">{store.description}</p>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Popular Items</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {store.popularItems.map((item, index) => (
                  <span key={index} className="bg-slate-700 text-slate-300 text-xs font-medium px-2 py-1 rounded">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={handleButtonClick}
              className="w-full bg-cyan-600 text-white font-semibold py-2 rounded-md hover:bg-cyan-500 transition-colors duration-300"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;

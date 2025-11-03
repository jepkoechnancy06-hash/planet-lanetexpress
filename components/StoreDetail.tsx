import React from 'react';
import { Store, Product } from '../types';
import { ArrowLeftIcon, PlusIcon } from './Icons';

interface StoreDetailProps {
  store: Store;
  onAddToCart: (product: Product) => void;
  onGoBack: () => void;
}

const StoreDetail: React.FC<StoreDetailProps> = ({ store, onAddToCart, onGoBack }) => {
  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <button
        onClick={onGoBack}
        className="flex items-center gap-2 mb-6 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
      >
        <ArrowLeftIcon />
        Back to Stores
      </button>

      <div className="relative rounded-lg overflow-hidden mb-8 h-48 md:h-64">
        <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-4xl font-extrabold text-white">{store.name}</h1>
          <p className="text-slate-300 mt-1">{store.description}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-white">Shop Products</h2>
      
      {store.products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {store.products.map(product => (
            <div key={product.id} className="bg-slate-800 rounded-lg p-4 flex flex-col justify-between border border-slate-700">
              <div>
                <h3 className="font-bold text-lg text-white">{product.name}</h3>
                <p className="text-cyan-400 font-semibold">KES {product.price.toFixed(2)}</p>
              </div>
              <button 
                onClick={() => onAddToCart(product)}
                className="mt-4 w-full bg-cyan-600 text-white font-semibold py-2 rounded-md hover:bg-cyan-500 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
         <div className="text-center py-16 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-lg text-slate-400">No products available for this store yet.</p>
            <p className="text-sm text-slate-500">Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default StoreDetail;

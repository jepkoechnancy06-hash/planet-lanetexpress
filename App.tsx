
import React, { useState, useCallback, useEffect } from 'react';
import { Category, Store, View } from './types';
import { CATEGORIES, STORES } from './constants';
import Header from './components/Header';
import CategoryCard from './components/CategoryCard';
import StoreCard from './components/StoreCard';
import OrderTracker from './components/OrderTracker';
import SmartAssistant from './components/SmartAssistant';
import { ArrowLeftIcon } from './components/Icons';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const handleSelectCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
    setCurrentView(View.Stores);
  }, []);

  const handleSelectStore = useCallback((store: Store) => {
    setSelectedStore(store);
    setCurrentView(View.Tracking);
  }, []);

  const handleGoBack = useCallback(() => {
    if (currentView === View.Tracking) {
      setCurrentView(View.Stores);
    } else if (currentView === View.Stores) {
      setSelectedCategory(null);
      setCurrentView(View.Home);
    }
  }, [currentView]);
  
  const handleGoHome = useCallback(() => {
    setSelectedCategory(null);
    setSelectedStore(null);
    setCurrentView(View.Home);
  }, []);
  
  useEffect(() => {
    // Scroll to top on view change
    window.scrollTo(0, 0);
  }, [currentView]);


  const renderContent = () => {
    switch (currentView) {
      case View.Stores:
        if (!selectedCategory) return null;
        return (
          <div className="p-4 md:p-8 animate-fade-in">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 mb-6 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
            >
              <ArrowLeftIcon />
              Back to Categories
            </button>
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
              <selectedCategory.icon className="w-8 h-8 text-cyan-400" />
              {selectedCategory.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STORES[selectedCategory.id].map(store => (
                <StoreCard key={store.id} store={store} onSelect={handleSelectStore} />
              ))}
            </div>
          </div>
        );
      case View.Tracking:
        if (!selectedStore) return null;
        return (
           <div className="p-4 md:p-8 animate-fade-in">
             <button
              onClick={handleGoBack}
              className="flex items-center gap-2 mb-6 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
            >
              <ArrowLeftIcon />
              Back to Stores
            </button>
            <OrderTracker store={selectedStore} />
          </div>
        );
      case View.Home:
      default:
        return (
          <div className="p-4 md:p-8 animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Anything, delivered.</h1>
                <p className="text-lg text-slate-400">Your one-stop solution for fast & reliable local delivery.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {CATEGORIES.map(category => (
                <CategoryCard key={category.id} category={category} onSelect={handleSelectCategory} />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header onLogoClick={handleGoHome} />
      <main className="max-w-7xl mx-auto">
        {renderContent()}
      </main>
      <SmartAssistant />
       <footer className="text-center p-8 mt-12 border-t border-slate-800 text-slate-500">
        <p>&copy; {new Date().getFullYear()} Planet Lanet Express. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

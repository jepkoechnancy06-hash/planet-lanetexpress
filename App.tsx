import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Category, Store, View, Product, CartItem } from './types';
import { CATEGORIES, STORES } from './constants';
import Header from './components/Header';
import CategoryCard from './components/CategoryCard';
import StoreCard from './components/StoreCard';
import OrderTracker from './components/OrderTracker';
import SmartAssistant from './components/SmartAssistant';
import OrderHistory from './components/OrderHistory';
import SearchBar from './components/SearchBar';
import { ArrowLeftIcon } from './components/Icons';
import StoreDetail from './components/StoreDetail';
import Cart from './components/Cart';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [viewHistory, setViewHistory] = useState<View[]>([View.Home]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Store[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const navigateTo = (view: View) => {
    setViewHistory(prev => [...prev, view]);
    setCurrentView(view);
  }

  const handleSelectCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
    navigateTo(View.Stores);
  }, []);

  const handleSelectStore = useCallback((store: Store) => {
    // If there are items in the cart from a different store, ask for confirmation
    if (cart.length > 0 && selectedStore?.id !== store.id) {
        if (window.confirm("You have items in your cart from another store. Starting a new order will clear your current cart. Do you want to continue?")) {
            setCart([]); // Clear cart
        } else {
            return; // User cancelled
        }
    }
    setSelectedStore(store);
    navigateTo(View.StoreDetail);
  }, [cart, selectedStore]);
  
  const handleAddToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  }, []);
  
  const handleUpdateCartQuantity = useCallback((productId: string, quantity: number) => {
    setCart(prevCart => {
        if (quantity <= 0) {
            return prevCart.filter(item => item.product.id !== productId);
        }
        return prevCart.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
        );
    });
  }, []);
  
  const handlePlaceOrder = useCallback(() => {
    if (cart.length === 0 || !selectedStore) return;
    navigateTo(View.Tracking);
  }, [cart, selectedStore]);


  const handleSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    
    const lowerCaseQuery = query.toLowerCase();
    const uniqueResults = new Map<string, Store>();

    Object.values(STORES).flat().forEach(store => {
      const match = 
        store.name.toLowerCase().includes(lowerCaseQuery) ||
        store.category.toLowerCase().includes(lowerCaseQuery) ||
        store.description.toLowerCase().includes(lowerCaseQuery) ||
        store.popularItems.some(item => item.toLowerCase().includes(lowerCaseQuery));

      if (match) {
        uniqueResults.set(store.id, store);
      }
    });

    setSearchQuery(query);
    setSearchResults(Array.from(uniqueResults.values()));
    navigateTo(View.SearchResults);
  }, []);

  const handleGoBack = useCallback(() => {
    const history = [...viewHistory];
    history.pop();
    const previousView = history[history.length - 1] || View.Home;

    if (currentView === View.Tracking) {
      setCart([]); // Clear cart after order is complete and user navigates away
    }

    setCurrentView(previousView);
    setViewHistory(history);
  }, [viewHistory, currentView]);
  
  const handleGoHome = useCallback(() => {
    setSelectedCategory(null);
    setSearchQuery('');
    setSearchResults([]);
    setCurrentView(View.Home);
    setViewHistory([View.Home]);
  }, []);

  const handleGoToHistory = useCallback(() => {
    navigateTo(View.History);
  }, []);

  const handleGoToCart = useCallback(() => {
    navigateTo(View.Cart);
  }, []);

  const cartItemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  
  useEffect(() => {
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
      case View.StoreDetail:
        if (!selectedStore) return null;
        return <StoreDetail store={selectedStore} onAddToCart={handleAddToCart} onGoBack={handleGoBack} />;
      case View.Cart:
        if (!selectedStore) return null;
        return <Cart cart={cart} store={selectedStore} onUpdateQuantity={handleUpdateCartQuantity} onPlaceOrder={handlePlaceOrder} onGoBack={handleGoBack} />;
      case View.Tracking:
        if (!selectedStore) return null;
        return (
           <div className="p-4 md:p-8 animate-fade-in">
             <button
              onClick={handleGoBack}
              className="flex items-center gap-2 mb-6 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
            >
              <ArrowLeftIcon />
              Back
            </button>
            <OrderTracker store={selectedStore} cart={cart} />
          </div>
        );
      case View.History:
        return <OrderHistory onGoHome={handleGoHome} onGoBack={handleGoBack} />;
      case View.SearchResults:
        return (
          <div className="p-4 md:p-8 animate-fade-in">
             <button
              onClick={handleGoBack}
              className="flex items-center gap-2 mb-6 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
            >
              <ArrowLeftIcon />
              Back to Home
            </button>
            <h2 className="text-3xl font-bold mb-6 text-white">
              Results for "{searchQuery}"
            </h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(store => (
                  <StoreCard key={store.id} store={store} onSelect={handleSelectStore} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                 <p className="text-lg text-slate-400">No stores or items found. Try a different search.</p>
              </div>
            )}
          </div>
        );
      case View.Home:
      default:
        return (
          <div className="p-4 md:p-8 animate-fade-in">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Anything, delivered.</h1>
                <p className="text-lg text-slate-400">Your one-stop solution for fast & reliable local delivery.</p>
            </div>
            <SearchBar onSearch={handleSearch} />
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
      <Header onLogoClick={handleGoHome} onHistoryClick={handleGoToHistory} onCartClick={handleGoToCart} cartItemCount={cartItemCount}/>
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
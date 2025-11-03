import React from 'react';
import { LogoIcon, HistoryIcon } from './Icons';

interface HeaderProps {
    onLogoClick: () => void;
    onHistoryClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onHistoryClick }) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={onLogoClick} className="flex-shrink-0 flex items-center gap-3 group">
                <LogoIcon className="h-8 w-auto text-cyan-400 group-hover:animate-spin" />
                <span className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    Planet Lanet Express
                </span>
            </button>
          </div>
          <div className="flex items-center">
            <button 
              onClick={onHistoryClick} 
              className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
              aria-label="View order history"
            >
              <HistoryIcon className="w-6 h-6" />
              <span className="hidden sm:block font-medium">History</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

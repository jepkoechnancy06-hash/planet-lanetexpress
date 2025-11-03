
import React from 'react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onSelect: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(category)}
      className="bg-slate-800 rounded-lg p-4 text-center group hover:bg-cyan-900/50 hover:-translate-y-1 transition-all duration-300 ease-in-out border border-slate-700 hover:border-cyan-500"
    >
      <category.icon className="w-12 h-12 mx-auto mb-3 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      <h3 className="font-bold text-white text-md">{category.name}</h3>
      <p className="text-xs text-slate-400">{category.description}</p>
    </button>
  );
};

export default CategoryCard;

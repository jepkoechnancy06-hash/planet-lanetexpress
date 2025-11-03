
import React, { useState, useCallback } from 'react';
import { getShoppingList } from '../services/geminiService';
import { WandIcon, LoadingIcon, AlertTriangleIcon, BotIcon } from './Icons';

const SmartAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    // Reset on close
    if(isOpen) {
        setPrompt('');
        setResponse('');
        setError(null);
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setResponse('');
    try {
      const result = await getShoppingList(`I want to make ${prompt}. What do I need?`);
      setResponse(result);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleToggle}
          className="bg-cyan-600 text-white rounded-full p-4 shadow-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-110"
          aria-label="Open Smart Assistant"
        >
          <WandIcon className="w-7 h-7" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in" onClick={handleToggle}></div>
      )}

      <div
        className={`fixed bottom-0 right-0 md:bottom-6 md:right-24 bg-slate-800 border-t md:border border-slate-700 w-full md:w-96 rounded-t-lg md:rounded-lg shadow-2xl transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <BotIcon className="w-6 h-6 text-cyan-400" />
                <h3 className="text-lg font-bold">Smart Shopping Assistant</h3>
            </div>
            <button onClick={handleToggle} className="text-slate-400 hover:text-white">&times;</button>
        </div>
        <div className="p-4 space-y-4">
            <p className="text-sm text-slate-400">What are you planning to cook or create? I'll list the ingredients for you.</p>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                    placeholder="e.g., chocolate chip cookies"
                    className="flex-grow bg-slate-900 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    disabled={isLoading}
                />
                <button
                    onClick={handleGenerate}
                    className="bg-cyan-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-cyan-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center w-28"
                    disabled={isLoading || !prompt.trim()}
                >
                    {isLoading ? <LoadingIcon className="animate-spin w-5 h-5"/> : 'Generate'}
                </button>
            </div>
          {error && (
            <div className="bg-red-900/50 text-red-300 border border-red-700 rounded-md p-3 text-sm flex items-start gap-2">
                <AlertTriangleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
            </div>
          )}
          {response && (
             <div className="bg-slate-700/50 p-4 rounded-md">
                <h4 className="font-semibold text-white mb-2">Shopping List:</h4>
                <div className="flex flex-wrap gap-2">
                    {response.split(',').map(item => item.trim()).filter(Boolean).map((item, index) => (
                        <span key={index} className="bg-cyan-400/20 text-cyan-300 text-sm font-medium px-2.5 py-1 rounded-full">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SmartAssistant;

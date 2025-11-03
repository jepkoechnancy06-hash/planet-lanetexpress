import React from 'react';
import { Store } from '../types';
import { StoreIcon, HomeIcon } from './Icons';

interface MapProps {
  store: Store;
  progress: number;
  imageUrl: string;
}

const Map: React.FC<MapProps> = ({ progress, imageUrl }) => {
  // Define static start and end points (as percentages of the container)
  const storePos = { x: 20, y: 80 };
  const homePos = { x: 80, y: 20 };

  // Interpolate rider position based on progress
  const riderX = storePos.x + (homePos.x - storePos.x) * (progress / 100);
  const riderY = storePos.y + (homePos.y - storePos.y) * (progress / 100);

  return (
    <div className="relative w-full h-full bg-slate-900">
      <img src={imageUrl} alt="Delivery Map" className="w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Route line */}
          <line
            x1={`${storePos.x}%`}
            y1={`${storePos.y}%`}
            x2={`${homePos.x}%`}
            y2={`${homePos.y}%`}
            stroke="white"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.6"
          />
          
          {/* Store Marker */}
          <foreignObject x={`${storePos.x}%`} y={`${storePos.y}%`} width="40" height="40" className="-translate-x-1/2 -translate-y-1/2">
            <div className="bg-slate-900 rounded-full p-2 border-2 border-cyan-400 shadow-lg" title="Store Location">
              <StoreIcon className="w-5 h-5 text-cyan-400" />
            </div>
          </foreignObject>

          {/* Home Marker */}
          <foreignObject x={`${homePos.x}%`} y={`${homePos.y}%`} width="40" height="40" className="-translate-x-1/2 -translate-y-1/2">
            <div className="bg-slate-900 rounded-full p-2 border-2 border-white shadow-lg" title="Delivery Address">
              <HomeIcon className="w-5 h-5 text-white" />
            </div>
          </foreignObject>
        </svg>

        {/* Rider Icon */}
        <div
          className="absolute transition-all duration-1000 ease-linear"
          style={{ left: `${riderX}%`, top: `${riderY}%` }}
          title="Rider's Location"
        >
          <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border-2 border-white shadow-md"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;

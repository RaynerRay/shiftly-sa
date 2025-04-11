"use client"
import Image from 'next/image';
import React, { useState } from 'react';

interface Logo {
  id: number;
  name: string;
  imageUrl?: string;
}

const defaultLogos: Logo[] = [
  { id: 1, name: 'Brand 1' },
  { id: 2, name: 'Brand 2' },
  { id: 3, name: 'Brand 3' },
  { id: 4, name: 'Brand 4' },
  { id: 5, name: 'Brand 5' },
  { id: 6, name: 'Brand 6' },
];

interface InfiniteLogoSliderProps {
  speed?: number;
  logos?: Logo[];
}

const InfiniteLogoSlider: React.FC<InfiniteLogoSliderProps> = ({
  speed = 20,
  logos = defaultLogos,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full overflow-hidden bg-white py-4">
      {/* Main wrapper */}
      <div className="relative w-full">
        {/* Animation container */}
        <div 
          className="flex"
          style={{
            animation: `scroll ${speed}s linear infinite`,
            animationPlayState: isHovered ? 'paused' : 'running'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* First set of logos */}
          <div className="flex min-w-full justify-around gap-8 px-4">
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="group flex min-w-[150px] items-center justify-center rounded-lg border border-gray-200 bg-white px-8 py-4 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <Image
                  src={logo.imageUrl || `/api/placeholder/150/50`}
                  alt={`${logo.name} logo`}
                  width={100}
                  height={100}
                  className="h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
          {/* Duplicate set of logos for seamless loop */}
          <div className="flex min-w-full justify-around gap-8 px-4">
            {logos.map((logo) => (
              <div
                key={`duplicate-${logo.id}`}
                className="group flex min-w-[150px] items-center justify-center rounded-lg border border-gray-200 bg-white px-8 py-4 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <Image
                width={100}
                height={100}
                  src={logo.imageUrl || `/api/placeholder/150/50`}
                  alt={`${logo.name} logo`}
                  className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Gradient overlays for smooth fade effect */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
};

export default InfiniteLogoSlider;
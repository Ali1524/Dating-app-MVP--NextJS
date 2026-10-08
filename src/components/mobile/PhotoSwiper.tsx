'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoSwiperProps {
  images: string[];
  className?: string;
}

export default function PhotoSwiper({ images, className = '' }: PhotoSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (images.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={images[currentIndex]}
          alt={`Photo ${currentIndex + 1}`}
          className="w-full h-80 object-cover"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-white' 
                    : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
            {currentIndex + 1}/{images.length}
          </div>
        )}
      </div>
    </div>
  );
}
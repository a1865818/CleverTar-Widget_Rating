"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define interfaces for Rating and context value
interface Rating {
  id?: string;
  score: number;
  comment?: string;
  timestamp?: number;
}

interface RatingContextType {
  ratings: Rating[];
  addRating: (rating: Rating) => void;
  clearRatings: () => void;
}

interface RatingProviderProps {
  children: ReactNode;
}

const RatingContext = createContext<RatingContextType | undefined>(undefined);

export function RatingProvider({ children }: RatingProviderProps) {
  const [ratings, setRatings] = useState<Rating[]>([]);

  // Load ratings from localStorage on component mount
  useEffect(() => {
    // Check if code is running in browser environment
    if (typeof window !== 'undefined') {
      const storedRatings = localStorage.getItem('website-ratings');
      if (storedRatings) {
        try {
          setRatings(JSON.parse(storedRatings));
        } catch (error) {
          console.error('Failed to parse stored ratings:', error);
          localStorage.removeItem('website-ratings');
        }
      }
    }
  }, []);

  // Save ratings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('website-ratings', JSON.stringify(ratings));
    }
  }, [ratings]);

  const addRating = (rating: Rating) => {
    setRatings((prevRatings) => [...prevRatings, rating]);
  };

  const clearRatings = () => {
    setRatings([]);
  };

  return (
    <RatingContext.Provider value={{ ratings, addRating, clearRatings }}>
      {children}
    </RatingContext.Provider>
  );
}

export function useRatingContext(): RatingContextType {
  const context = useContext(RatingContext);
  if (context === undefined) {
    throw new Error('useRatingContext must be used within a RatingProvider');
  }
  return context;
}
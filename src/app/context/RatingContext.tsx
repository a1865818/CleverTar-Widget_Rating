/*
 * RatingContext.tsx
 * 
 * This file implements a React Context for managing website ratings throughout the application.
 * 
 * Key features:
 * - Provides a central store for website ratings data
 * - Persists ratings to localStorage to maintain data between sessions
 * - Offers methods to add new ratings and clear existing ones
 * - Uses React Context API to make rating data accessible to all components
 * 
 * The context exposes:
 * - ratings: Array of Rating objects
 * - addRating: Function to add a new rating
 * - clearRatings: Function to remove all ratings
 * 
 * This pattern allows any component in the component tree to access or modify
 * rating data without prop drilling.
 * 
 * @params: children - ReactNode - Child components to be wrapped by the RatingContext provider
 * 
 * @returns A RatingContext provider component and a custom hook for consuming the context
 */

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Rating } from '../interfaces/Rating';

// Define interface for context value
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
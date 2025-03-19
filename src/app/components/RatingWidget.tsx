// components/RatingWidget.tsx
"use client";

import { useState, useCallback } from 'react';
import { useRatingContext } from '../context/RatingContext';
import FeedbackForm from './FeedbackForm';

export default function RatingWidget() {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { addRating } = useRatingContext();

  const handleRatingClick = useCallback((rating: number) => {
    setSelectedRating(rating);
    setShowFeedback(true);
  }, []);

  const handleSubmitFeedback = useCallback((feedback: string) => {
    const newRating = {
      id: Date.now().toString(),
      score: selectedRating,
      comment: feedback,
      timestamp: Date.now(),
    };

    addRating(newRating);
    setSubmitted(true);
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedRating(0);
      setSubmitted(false);
    }, 3000);
  }, [addRating, selectedRating]);

  const handleMouseEnter = useCallback((rating: number) => {
    setHoverRating(rating);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverRating(0);
  }, []);

  if (submitted) {
    return (
      <div className="max-w-md mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
        <div className="text-center py-4 sm:py-6">
          <div className="text-green-500 text-4xl sm:text-5xl mb-3 sm:mb-4">✓</div>
          <h3 className="text-lg sm:text-xl font-medium text-gray-800">Thank you for your feedback!</h3>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Your rating has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      {!showFeedback ? (
        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-3 sm:mb-4">How would you rate this website?</h3>
          <div className="flex justify-center space-x-1 sm:space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                className={`p-2 sm:p-3 rounded-full transition-all duration-200 ${
                  rating <= (hoverRating || selectedRating)
                    ? 'bg-blue-500 text-white transform scale-110'
                    : 'bg-gray-200 text-gray-600'
                }`}
                onClick={() => handleRatingClick(rating)}
                onMouseEnter={() => handleMouseEnter(rating)}
                onMouseLeave={handleMouseLeave}
                aria-label={`Rate ${rating} star${rating > 1 ? 's' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </button>
            ))}
          </div>
          <p className="mt-3 sm:mt-4 text-gray-500 text-xs sm:text-sm">Click on a star to rate our website</p>
        </div>
      ) : (
        <FeedbackForm onSubmit={handleSubmitFeedback} rating={selectedRating} />
      )}
    </div>
  );
}
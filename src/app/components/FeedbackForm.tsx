/**
 * FeedbackForm Component
 * 
 * A responsive feedback collection form that displays after a user has provided a star rating.
 * The form shows the user's selected rating (1-5 stars) and provides a textarea for additional
 * written feedback.
 * 
 * Features:
 * - Displays the user's previously provided star rating
 * - Collects textual feedback through a textarea
 * - Validates that feedback is not empty before submission
 * - Provides accessibility features (ARIA labels)
 * - Responsive design for different screen sizes
 * - Clears the form after successful submission
 * 
 * @params :
 * onSubmit: A function to handle the form submission
 * rating: The user's selected rating (1-5 stars)
 * 
 * @returns A feedback form component
 */
/*
  

*/
"use client";
import { useState } from 'react';

interface FeedbackFormProps {
  onSubmit: (feedback: string) => void;
  rating: number;
}

export default function FeedbackForm({ onSubmit, rating }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (feedback.trim()) {
      onSubmit(feedback);
      setFeedback(''); // Clear feedback after submission
    } else {
      alert('Please enter your feedback before submitting.');
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">Thanks for your rating!</h3>
      <div className="flex justify-center mb-3 sm:mb-4" aria-label={`Rating: ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-xl sm:text-2xl">
            {star <= rating ? (
              <span className="text-yellow-500" aria-hidden="true">★</span>
            ) : (
              <span className="text-gray-300" aria-hidden="true">★</span>
            )}
          </span>
        ))}
      </div>
      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Would you like to share any additional feedback?</p>
      <form role='form' onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <textarea
          className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Your feedback is valuable to us..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          aria-label="Feedback input"
        ></textarea>
        <button
          type="submit"
          className="w-full py-2 px-3 sm:px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium rounded-md transition-colors"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
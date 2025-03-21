/**
 * FeedbackForm Component
 * 
 * A responsive feedback collection form that displays after a user has provided a star rating.
 * The form shows the user's selected rating (1-5 stars) and provides inputs for username
 * and additional written feedback.
 * 
 * Features:
 * - Displays the user's previously provided star rating
 * - Collects username and textual feedback
 * - Validates that required fields are not empty before submission
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
"use client";
import { useState } from 'react';

interface FeedbackFormProps {
  onSubmit: (feedback: string, username: string) => void;
  rating: number;
}

export default function FeedbackForm({ onSubmit, rating }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({ username: false, feedback: false });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = {
      username: !username.trim(),
      feedback: !feedback.trim()
    };
    
    setErrors(newErrors);
    
    // If no errors, submit the form
    if (!newErrors.username && !newErrors.feedback) {
      onSubmit(feedback, username);
      setFeedback('');
      setUsername('');
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
      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Please share your feedback with us:</p>
      <form role='form' onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Username input */}
        <div>
          <input
            className={`w-full p-2 sm:p-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (e.target.value.trim()) {
                setErrors(prev => ({ ...prev, username: false }));
              }
            }}
            aria-label="Username input"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1 text-left">Please enter your name</p>
          )}
        </div>
        
        {/* Feedback textarea */}
        <div>
          <textarea
            className={`w-full p-2 sm:p-3 border ${errors.feedback ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            rows={3}
            placeholder="Your feedback is valuable to us..."
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
              if (e.target.value.trim()) {
                setErrors(prev => ({ ...prev, feedback: false }));
              }
            }}
            aria-label="Feedback input"
          />
          {errors.feedback && (
            <p className="text-red-500 text-sm mt-1 text-left">Please enter your feedback</p>
          )}
        </div>
        
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
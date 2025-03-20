/**
 * RatingItem Component
 * 
 * This component renders an individual rating item in the ratings list.
 * It displays a rating score (1-5) with a visual star representation,
 * the timestamp of when the rating was submitted, and any feedback text
 * that was provided with the rating.
 * 
 * Features:
 * - Displays numeric rating in a blue badge
 * - Shows visual star representation (filled yellow stars for the rating)
 * - Formats the timestamp to a human-readable date and time
 * - Conditionally renders feedback text when available
 * - Includes hover effects for better UI interaction
 * - Uses data-testid attributes for testing purposes
 * 
 * @params:
 * rating: A DisplayRating object containing rating details
 * 
 * @returns A formatted rating item card
 */
/*
 */

import { DisplayRating } from '../interfaces/Rating';

interface RatingItemProps {
  rating: DisplayRating;
}

export default function RatingItem({ rating }: RatingItemProps) {
  // Format the date string to a human-readable format
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="bg-blue-100 rounded-full p-2 mr-3">
            <span className="text-blue-800 font-bold">{rating.rating}</span>
          </div>
          <div>
            <div className="flex mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-lg">
                  {star <= rating.rating ? (
                    <span className="text-yellow-500">★</span>
                  ) : (
                    <span className="text-gray-300">★</span>
                  )}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500">{formatDate(rating.timestamp)}</p>
          </div>
        </div>
      </div>
      {rating.feedback && (
        <div className="mt-3 pl-10">
          <p className="text-gray-700" data-testid="rating-feedback">{rating.feedback}</p>
        </div>
      )}
    </div>
  );
}
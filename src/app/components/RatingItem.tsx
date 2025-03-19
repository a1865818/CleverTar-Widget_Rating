// components/RatingItem.tsx
interface Rating {
  rating: number;
  timestamp: string;
  feedback?: string;
}

interface RatingItemProps {
  rating: Rating;
}

export default function RatingItem({ rating }: RatingItemProps) {
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
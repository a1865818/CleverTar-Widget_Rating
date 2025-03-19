"use client";

import { useRatingContext } from '../context/RatingContext';
import RatingItem from './RatingItem';
import { useState } from 'react';

export default function Dashboard() {
  const { ratings, clearRatings } = useRatingContext();
  const [filterValue, setFilterValue] = useState<string>('all');

  const getAverageRating = (): string => {
    if (ratings.length === 0) return '0.0';
    const sum = ratings.reduce((acc, rating) => acc + rating.score, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const getRatingDistribution = (): number[] => {
    const distribution = [0, 0, 0, 0, 0];
    ratings.forEach((rating) => {
      distribution[rating.score - 1]++;
    });
    return distribution;
  };

  // Filter ratings based on selection and then sort by timestamp (newest first)
  const filteredRatings = filterValue === 'all'
    ? [...ratings].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
    : [...ratings]
        .filter((rating) => rating.score === parseInt(filterValue))
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Ratings Dashboard</h2>
        <button
          onClick={clearRatings}
          className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
        >
          Clear All Ratings
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Total Ratings</h3>
          <p className="text-3xl font-bold text-blue-600">{ratings.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Average Rating</h3>
          <p className="text-3xl font-bold text-green-600">{getAverageRating()}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Highest Rating</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {ratings.length > 0 ? Math.max(...ratings.map((r) => r.score)) : 0}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Rating Distribution</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          {getRatingDistribution().map((count, index) => {
            const percentage = ratings.length > 0 ? (count / ratings.length) * 100 : 0;
            return (
              <div key={index} className="mb-2">
                <div className="flex items-center">
                  <span className="w-16 text-sm font-medium text-gray-700">{index + 1} Stars</span>
                  <div className="flex-1 h-4 mx-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-16 text-sm font-medium text-gray-700">{count} ({percentage.toFixed(1)}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">Rating List</h3>
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Ratings</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
      </div>

      {filteredRatings.length > 0 ? (
        <div className="space-y-4">
          {filteredRatings.map((rating) => (
            <RatingItem
              key={rating.id}
              rating={{
                rating: rating.score, 
                timestamp: new Date(rating.timestamp || 0).toISOString(),
                feedback: rating.comment,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No ratings found.</p>
        </div>
      )}
    </div>
  );
}
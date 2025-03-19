"use client";

import RatingWidget from '../components/RatingWidget';
import Link from 'next/link';

export default function RatePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 md:mb-4 border-b-2 pb-2 inline-block">
            Website Rating Widget
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto px-2">
            We value your feedback! Please rate your experience with our website to help us improve.
          </p>
        </header>
        
        <div className="mb-6 md:mb-8">
          <RatingWidget />
        </div>
        
        <div className="text-center mt-8 md:mt-12 space-y-3">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base transition-colors duration-200 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </Link>
          
          <Link 
            href="/dashboard" 
            className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base transition-colors duration-200 flex items-center justify-center"
          >
            <span>View Ratings Dashboard</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

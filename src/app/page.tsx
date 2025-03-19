"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to Our Website
        </h1>
        <p className="text-gray-600 mb-8">
          We value your feedback! Help us improve by sharing your experience with our website.
        </p>
        <Link 
          href="/rate" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-6 py-3 transition-colors duration-200"
        >
          Rate Our Website
        </Link>
      </div>
    </div>
  );
}
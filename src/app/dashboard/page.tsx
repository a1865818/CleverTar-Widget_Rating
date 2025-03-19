// app/dashboard/page.tsx
"use client";

import Dashboard from '../components/Dashboard';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Ratings Dashboard</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            View and analyze all the ratings submitted by users.
          </p>
        </header>

        <div className="mb-8">
          <Dashboard />
        </div>

        <div className="text-center mt-12 space-y-3">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium block">
            ← Back to Home
          </Link>
          <Link href="/rate" className="text-blue-600 hover:text-blue-800 font-medium block">
            Rate Our Website
          </Link>
        </div>
      </div>
    </div>
  );
}
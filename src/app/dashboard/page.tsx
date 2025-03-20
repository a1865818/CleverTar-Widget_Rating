/**
 * This file defines the `DashboardPage` component, which serves as the main page
 * for displaying the Ratings Dashboard in the application. It provides a user-friendly
 * interface for viewing and analyzing user-submitted ratings.
 *
 * The page includes:
 * - A header section with a title and description of the dashboard.
 * - The `Dashboard` component, which is responsible for rendering the core dashboard content.
 * - Navigation links for user convenience:
 * - A "Back to Home" button that navigates to the homepage.
 * - A "Rate Our Website" button that navigates to the rating submission page.
 *
 * The layout is styled using Tailwind CSS classes to ensure a responsive and visually appealing design.
 * 
 * @returns A responsive dashboard page with the ratings dashboard and navigation links
*/

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

        <div className="flex justify-center gap-4 mt-12">
          <Link 
            href="/" 
            className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium rounded-md px-5 py-2.5 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
          <Link 
            href="/rate" 
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-5 py-2.5 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Rate Our Website
          </Link>
        </div>
      </div>
    </div>
  );
}
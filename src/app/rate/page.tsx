/**
 * Rate Page Component
 * 
 * This component renders a user-friendly rating page where visitors can provide feedback
 * about their website experience. It includes:
 * 
 * - A clear, descriptive header with page title and explanation
 * - The main RatingWidget component that handles the actual rating functionality
 * - Navigation links to return to the home page or view the ratings dashboard
 * 
 * The layout is responsive with different spacing and sizing for various viewport sizes
 * using Tailwind CSS utility classes. The component utilizes Next.js's built-in Link
 * component for client-side navigation between pages.
 * 
 * @returns A responsive rating page with a rating widget and navigation links
 */
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
        
        <div className="flex justify-center gap-4 mt-8 md:mt-12">
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
            href="/dashboard" 
            className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md px-5 py-2.5 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            View Ratings Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

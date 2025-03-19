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
        <div className="flex flex-col space-y-4">
          <Link 
            href="/rate" 
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-6 py-3 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Rate Our Website
          </Link>
          
          <Link 
            href="/dashboard" 
            className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md px-6 py-3 transition-colors duration-200"
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
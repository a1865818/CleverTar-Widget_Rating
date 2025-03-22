/**
 * Root Layout Component for the Rating Widget App
 * 
 * This is the main layout component that wraps the entire application.
 * It provides a consistent structure for all pages including:
 * - HTML document structure
 * - Meta tags for SEO and viewport settings
 * - Global styles
 * - RatingProvider context for state management across the app
 *
 * @param props - Component props
 * @param props.children - Child components to be rendered within the layout
 * @returns The application's root layout structure 
 */

import './globals.css';
import { RatingProvider } from './context/RatingContext';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Rating Widget App',
  description: 'A website rating widget application',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>
        <RatingProvider>
          {children}
        </RatingProvider>
      </body>
    </html>
  );
}
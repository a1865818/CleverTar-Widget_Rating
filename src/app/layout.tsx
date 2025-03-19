
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
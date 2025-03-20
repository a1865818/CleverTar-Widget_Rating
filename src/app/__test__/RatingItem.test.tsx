import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RatingItem from '../components/RatingItem';

describe('RatingItem Component', () => {
  // Mock the formatDate functionality
  const mockDate = new Date('2023-05-15T10:30:00Z');
  const mockTimestamp = mockDate.toISOString();
  const mockFormattedDate = mockDate.toLocaleString();

  // Test data
  const baseRating = {
    rating: 4,
    timestamp: mockTimestamp
  };

  it('renders the rating correctly', () => {
    render(<RatingItem rating={baseRating} />);
    
    // Check if the rating number is displayed
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('displays the correct number of filled stars', () => {
    render(<RatingItem rating={baseRating} />);
    
    const stars = screen.getAllByText('★');
    expect(stars).toHaveLength(5);
    
    // First 4 stars should be yellow (filled)
    for (let i = 0; i < 4; i++) {
      expect(stars[i]).toHaveClass('text-yellow-500');
    }
    
    // Last star should be gray (unfilled)
    expect(stars[4]).toHaveClass('text-gray-300');
  });

  it('displays the timestamp in a formatted way', () => {
    render(<RatingItem rating={baseRating} />);
    
    // Check if the formatted date is displayed
    expect(screen.getByText(mockFormattedDate)).toBeInTheDocument();
  });

  it('displays feedback when provided', () => {
    const ratingWithFeedback = {
      ...baseRating,
      feedback: 'This is a great product!'
    };
    
    render(<RatingItem rating={ratingWithFeedback} />);
    
    // Check if the feedback text is displayed
    expect(screen.getByTestId('rating-feedback')).toHaveTextContent('This is a great product!');
  });

  it('does not display feedback section when no feedback is provided', () => {
    render(<RatingItem rating={baseRating} />);
    
    // Check that the feedback element is not present
    expect(screen.queryByTestId('rating-feedback')).not.toBeInTheDocument();
  });

  it('renders different star ratings correctly', () => {
    const twoStarRating = {
      ...baseRating,
      rating: 2
    };
    
    render(<RatingItem rating={twoStarRating} />);
    
    const stars = screen.getAllByText('★');
    
    // First 2 stars should be yellow (filled)
    for (let i = 0; i < 2; i++) {
      expect(stars[i]).toHaveClass('text-yellow-500');
    }
    
    // Last 3 stars should be gray (unfilled)
    for (let i = 2; i < 5; i++) {
      expect(stars[i]).toHaveClass('text-gray-300');
    }
  });

  it('displays the correct rating number in the blue circle', () => {
    const fiveStarRating = {
      ...baseRating,
      rating: 5
    };
    
    render(<RatingItem rating={fiveStarRating} />);
    
    // Check if the rating number is displayed and has the correct value
    const ratingNumber = screen.getByText('5');
    expect(ratingNumber).toBeInTheDocument();
    expect(ratingNumber).toHaveClass('text-blue-800');
    expect(ratingNumber).toHaveClass('font-bold');
  });

  it('contains the correct item structure', () => {
    render(<RatingItem rating={baseRating} />);

    // Select the main container
    const container = screen.getByText('4').closest('.border');

    // Ensure the container exists
    expect(container).not.toBeNull();

    // Check that the main container has the correct classes
    expect(container).toHaveClass('border');
    expect(container).toHaveClass('border-gray-200');
    expect(container).toHaveClass('rounded-lg');
    expect(container).toHaveClass('hover:shadow-md');
});
});
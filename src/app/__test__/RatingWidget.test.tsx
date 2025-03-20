import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import RatingWidget from '../components/RatingWidget';
import { useRatingContext } from '../context/RatingContext';

// Mock the RatingContext hook
jest.mock('../context/RatingContext', () => ({
  useRatingContext: jest.fn(),
}));

// Mock the FeedbackForm component
jest.mock('../components/FeedbackForm', () => ({
  __esModule: true,
  default: ({ onSubmit, rating }: { onSubmit: (feedback: string) => void, rating: number }) => (
    <div data-testid="feedback-form">
      <span data-testid="selected-rating">{rating}</span>
      <button 
        data-testid="submit-feedback"
        onClick={() => onSubmit('This is test feedback')}
      >
        Submit Feedback
      </button>
    </div>
  ),
}));

// Mock setTimeout
jest.useFakeTimers();

describe('RatingWidget Component', () => {
  const mockAddRating = jest.fn();

  beforeEach(() => {
    // Setup default mock implementation
    (useRatingContext as jest.Mock).mockReturnValue({
      addRating: mockAddRating,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the initial rating widget with prompt text', () => {
    render(<RatingWidget />);
    expect(screen.getByText('How would you rate this website?')).toBeInTheDocument();
    expect(screen.getByText('Click on a star to rate our website')).toBeInTheDocument();
  });

  it('displays 5 star buttons', () => {
    render(<RatingWidget />);
    const starButtons = screen.getAllByRole('button');
    expect(starButtons).toHaveLength(5);
  });

  it('highlights stars on hover', () => {
    render(<RatingWidget />);
    const starButtons = screen.getAllByRole('button');
    
    // Initially no stars should be highlighted (blue background)
    starButtons.forEach(button => {
      expect(button).toHaveClass('bg-gray-200');
    });
    
    // Hover over the third star
    fireEvent.mouseEnter(starButtons[2]);
    
    // First three stars should now be highlighted
    for (let i = 0; i < 3; i++) {
      expect(starButtons[i]).toHaveClass('bg-blue-500');
    }
    
    // Last two stars should still be gray
    for (let i = 3; i < 5; i++) {
      expect(starButtons[i]).toHaveClass('bg-gray-200');
    }
    
    // Mouse leave should remove highlighting
    fireEvent.mouseLeave(starButtons[2]);
    starButtons.forEach(button => {
      expect(button).toHaveClass('bg-gray-200');
    });
  });

  it('shows feedback form after selecting a rating', () => {
    render(<RatingWidget />);
    const starButtons = screen.getAllByRole('button');
    
    // Click on the fourth star
    fireEvent.click(starButtons[3]);
    
    // Feedback form should now be visible
    expect(screen.getByTestId('feedback-form')).toBeInTheDocument();
    
    // Check that the selected rating was passed to the feedback form
    expect(screen.getByTestId('selected-rating').textContent).toBe('4');
  });

  it('adds a rating and shows thank you message when feedback is submitted', async () => {
    render(<RatingWidget />);
    const starButtons = screen.getAllByRole('button');
    
    // Click on the fifth star
    fireEvent.click(starButtons[4]);
    
    // Submit the feedback
    fireEvent.click(screen.getByTestId('submit-feedback'));
    
    // Check that addRating was called with correct data
    expect(mockAddRating).toHaveBeenCalledTimes(1);
    expect(mockAddRating).toHaveBeenCalledWith(expect.objectContaining({
      score: 5,
      comment: 'This is test feedback'
    }));
    
    // Thank you message should be displayed
    expect(screen.getByText('Thank you for your feedback!')).toBeInTheDocument();
    expect(screen.getByText('Your rating has been submitted successfully.')).toBeInTheDocument();
  });

  it('resets the form after submission timeout', async () => {
    render(<RatingWidget />);
    const starButtons = screen.getAllByRole('button');
    
    // Click on a star and submit feedback
    fireEvent.click(starButtons[2]);
    fireEvent.click(screen.getByTestId('submit-feedback'));
    
    // Use act to properly handle state updates from setTimeout
    await act(async () => {
      // Fast-forward timer to trigger reset
      jest.advanceTimersByTime(3000);
    });
    
    // Component should be back to initial state
    expect(screen.getByText('How would you rate this website?')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<RatingWidget />);
    const starButtons = screen.getAllByRole('button');
    
    expect(starButtons[0]).toHaveAttribute('aria-label', 'Rate 1 star');
    expect(starButtons[1]).toHaveAttribute('aria-label', 'Rate 2 stars');
    expect(starButtons[4]).toHaveAttribute('aria-label', 'Rate 5 stars');
  });
});
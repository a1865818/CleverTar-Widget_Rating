import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeedbackForm from '../components/FeedbackForm';

// Mock the window.alert
const mockAlert = jest.fn();
window.alert = mockAlert;

describe('FeedbackForm Component', () => {
  const mockSubmit = jest.fn();
  const defaultProps = {
    onSubmit: mockSubmit,
    rating: 4
  };

  beforeEach(() => {
    // Clear mocks before each test
    mockSubmit.mockClear();
    mockAlert.mockClear();
  });

  it('renders with correct title and rating stars', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    // Check title
    expect(screen.getByText('Thanks for your rating!')).toBeInTheDocument();
    
    // Check prompt text
    expect(screen.getByText('Would you like to share any additional feedback?')).toBeInTheDocument();
    
    // Check that the rating display has proper aria-label
    expect(screen.getByLabelText('Rating: 4 out of 5')).toBeInTheDocument();
  });

  it('displays the correct number of filled stars', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    // All stars should be present
    const stars = screen.getAllByText('★');
    expect(stars).toHaveLength(5);
    
    // First 4 stars should be yellow (filled)
    for (let i = 0; i < 4; i++) {
      expect(stars[i]).toHaveClass('text-yellow-500');
    }
    
    // Last star should be gray (unfilled)
    expect(stars[4]).toHaveClass('text-gray-300');
  });

  it('displays different ratings correctly', () => {
    render(<FeedbackForm onSubmit={mockSubmit} rating={2} />);
    
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

  it('updates feedback when typing in textarea', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    const textarea = screen.getByLabelText('Feedback input');
    fireEvent.change(textarea, { target: { value: 'This is my feedback' } });
    
    expect(textarea).toHaveValue('This is my feedback');
  });

  it('calls onSubmit with feedback when form is submitted', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    const textarea = screen.getByLabelText('Feedback input');
    const submitButton = screen.getByText('Submit Feedback');
    
    // Type feedback and submit
    fireEvent.change(textarea, { target: { value: 'This is my feedback' } });
    fireEvent.click(submitButton);
    
    // Check if onSubmit was called with the correct feedback
    expect(mockSubmit).toHaveBeenCalledWith('This is my feedback');
    
    // Check if textarea is cleared after submission
    expect(textarea).toHaveValue('');
  });

  it('shows alert when submitting empty feedback', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    const submitButton = screen.getByText('Submit Feedback');
    
    // Submit with empty feedback
    fireEvent.click(submitButton);
    
    // Check that alert was called and onSubmit was not
    expect(mockAlert).toHaveBeenCalledWith('Please enter your feedback before submitting.');
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('shows alert when submitting only whitespace', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    const textarea = screen.getByLabelText('Feedback input');
    const submitButton = screen.getByText('Submit Feedback');
    
    // Type only spaces and submit
    fireEvent.change(textarea, { target: { value: '   ' } });
    fireEvent.click(submitButton);
    
    // Check that alert was called and onSubmit was not
    expect(mockAlert).toHaveBeenCalledWith('Please enter your feedback before submitting.');
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('handles form submission correctly', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    const form = screen.getByRole('form');
    const textarea = screen.getByLabelText('Feedback input');
    
    // Type feedback
    fireEvent.change(textarea, { target: { value: 'This is my feedback' } });
    
    // Submit the form
    fireEvent.submit(form);
    
    // Check if onSubmit was called with the correct feedback
    expect(mockSubmit).toHaveBeenCalledWith('This is my feedback');
  });
});
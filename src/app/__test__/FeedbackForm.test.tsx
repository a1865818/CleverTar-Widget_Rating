import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeedbackForm from '../components/FeedbackForm';

describe('FeedbackForm Component', () => {
  const mockSubmit = jest.fn();
  const defaultProps = {
    onSubmit: mockSubmit,
    rating: 4
  };

  beforeEach(() => {
    // Clear mocks before each test
    mockSubmit.mockClear();
  });

  it('renders with correct title and rating stars', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    // Check title
    expect(screen.getByText('Thanks for your rating!')).toBeInTheDocument();
    
    // Check prompt text - updated to match the new text
    expect(screen.getByText('Please share your feedback with us:')).toBeInTheDocument();
    
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

  it('calls onSubmit with feedback and username when form is submitted', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    const usernameInput = screen.getByLabelText('Username input');
    const feedbackInput = screen.getByLabelText('Feedback input');
    const submitButton = screen.getByText('Submit Feedback');
    
    // Type username and feedback
    fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
    fireEvent.change(feedbackInput, { target: { value: 'This is my feedback' } });
    fireEvent.click(submitButton);
    
    // Check that onSubmit was called with both parameters
    expect(mockSubmit).toHaveBeenCalledWith('This is my feedback', 'John Doe');
    
    // Check if textarea is cleared after submission
    expect(feedbackInput).toHaveValue('');
    expect(usernameInput).toHaveValue('');
  });

  it('shows validation errors when submitting empty fields', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    const submitButton = screen.getByText('Submit Feedback');
    
    // Submit with empty feedback
    fireEvent.click(submitButton);
    
    // Check that validation errors are shown
    expect(screen.getByText('Please enter your name')).toBeInTheDocument();
    expect(screen.getByText('Please enter your feedback')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('shows validation errors when submitting only whitespace', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    const usernameInput = screen.getByLabelText('Username input');
    const feedbackInput = screen.getByLabelText('Feedback input');
    const submitButton = screen.getByText('Submit Feedback');
    
    // Type only spaces and submit
    fireEvent.change(usernameInput, { target: { value: '   ' } });
    fireEvent.change(feedbackInput, { target: { value: '   ' } });
    fireEvent.click(submitButton);
    
    // Check that validation errors appear
    expect(screen.getByText('Please enter your name')).toBeInTheDocument();
    expect(screen.getByText('Please enter your feedback')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('handles form submission correctly', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    const form = screen.getByRole('form');
    const usernameInput = screen.getByLabelText('Username input');
    const feedbackInput = screen.getByLabelText('Feedback input');
    
    // Type username and feedback
    fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
    fireEvent.change(feedbackInput, { target: { value: 'This is my feedback' } });
    
    // Submit the form
    fireEvent.submit(form);
    
    // Check if onSubmit was called with the correct feedback
    expect(mockSubmit).toHaveBeenCalledWith('This is my feedback', 'John Doe');
  });

  // New tests for username field
  it('updates username when typing in the input field', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    const usernameInput = screen.getByLabelText('Username input');
    fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
    
    expect(usernameInput).toHaveValue('John Doe');
  });

  it('shows validation errors when submitting empty fields', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    const submitButton = screen.getByText('Submit Feedback');
    fireEvent.click(submitButton);
    
    // Check that error messages are displayed
    expect(screen.getByText('Please enter your name')).toBeInTheDocument();
    expect(screen.getByText('Please enter your feedback')).toBeInTheDocument();
    
    // Check that onSubmit was not called
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('hides validation error when filling in a field', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    // Submit with empty fields to trigger errors
    fireEvent.click(screen.getByText('Submit Feedback'));
    
    // Check that both errors are shown
    expect(screen.getByText('Please enter your name')).toBeInTheDocument();
    expect(screen.getByText('Please enter your feedback')).toBeInTheDocument();
    
    // Fill in the username field
    const usernameInput = screen.getByLabelText('Username input');
    fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
    
    // Username error should disappear, but feedback error should remain
    expect(screen.queryByText('Please enter your name')).not.toBeInTheDocument();
    expect(screen.getByText('Please enter your feedback')).toBeInTheDocument();
  });

  it('calls onSubmit with both feedback and username when form is submitted', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    const usernameInput = screen.getByLabelText('Username input');
    const feedbackInput = screen.getByLabelText('Feedback input');
    const submitButton = screen.getByText('Submit Feedback');
    
    // Type username and feedback
    fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
    fireEvent.change(feedbackInput, { target: { value: 'This is my feedback' } });
    
    // Submit the form
    fireEvent.click(submitButton);
    
    // Check if onSubmit was called with the correct values
    expect(mockSubmit).toHaveBeenCalledWith('This is my feedback', 'John Doe');
    
    // Check if fields are cleared after submission
    expect(usernameInput).toHaveValue('');
    expect(feedbackInput).toHaveValue('');
  });

  it('validates whitespace in both username and feedback fields => Fill in these fields', () => {
    render(<FeedbackForm {...defaultProps} />);
    
    const usernameInput = screen.getByLabelText('Username input');
    const feedbackInput = screen.getByLabelText('Feedback input');
    const submitButton = screen.getByText('Submit Feedback');
    
    // Type only whitespace
    fireEvent.change(usernameInput, { target: { value: '   ' } });
    fireEvent.change(feedbackInput, { target: { value: '   ' } });
    
    // Submit the form
    fireEvent.click(submitButton);
    
    // Check that error messages are still displayed
    expect(screen.getByText('Please enter your name')).toBeInTheDocument();
    expect(screen.getByText('Please enter your feedback')).toBeInTheDocument();
    
    // Check that onSubmit was not called
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
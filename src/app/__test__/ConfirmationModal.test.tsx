/**
 * Test suite for the ConfirmationModal component.
 * 
 * These tests verify the component's functionality including:
 * - Proper rendering when open and closed
 * - Default button text fallback behavior
 * - Event handling (confirm/cancel buttons, Escape key, outside clicks)
 * - Callback invocation patterns
 * - Accessibility compliance (ARIA attributes)
 * 
 * The suite uses mock implementations for:
 * - The onClose and onConfirm callback functions
 * - Default props for the modal
 * 
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmationModal from '../components/ConfirmationModal';

describe('ConfirmationModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onConfirm: mockOnConfirm,
    title: 'Test Modal Title',
    message: 'This is a test modal message',
    confirmButtonText: 'Confirm Test',
    cancelButtonText: 'Cancel Test',
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders correctly when isOpen is true', () => {
    render(<ConfirmationModal {...defaultProps} />);
    
    // Check if title and message are rendered
    expect(screen.getByText('Test Modal Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test modal message')).toBeInTheDocument();
    
    // Check if buttons with correct text are rendered
    expect(screen.getByText('Confirm Test')).toBeInTheDocument();
    expect(screen.getByText('Cancel Test')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<ConfirmationModal {...defaultProps} isOpen={false} />);
    
    // Check that nothing is rendered
    expect(screen.queryByText('Test Modal Title')).not.toBeInTheDocument();
    expect(screen.queryByText('This is a test modal message')).not.toBeInTheDocument();
  });

  it('uses default button text when not specified', () => {
    const { confirmButtonText, cancelButtonText, ...propsWithoutButtonText } = defaultProps;
    render(<ConfirmationModal {...propsWithoutButtonText} />);
    
    // Check that default button text is used
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onConfirm and onClose when confirm button is clicked', () => {
    render(<ConfirmationModal {...defaultProps} />);
    
    // Click the confirm button
    fireEvent.click(screen.getByText('Confirm Test'));
    
    // Check if both functions were called
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls only onClose when cancel button is clicked', () => {
    render(<ConfirmationModal {...defaultProps} />);
    
    // Click the cancel button
    fireEvent.click(screen.getByText('Cancel Test'));
    
    // Check if only onClose was called
    expect(mockOnConfirm).not.toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    render(<ConfirmationModal {...defaultProps} />);
    
    // Simulate pressing Escape key
    fireEvent.keyDown(document, { key: 'Escape' });
    
    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when a different key is pressed', () => {
    render(<ConfirmationModal {...defaultProps} />);
    
    // Simulate pressing Enter key
    fireEvent.keyDown(document, { key: 'Enter' });
    
    // Check that onClose was not called
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('calls onClose when clicking outside the modal', () => {
    render(<ConfirmationModal {...defaultProps} />);
    
    // Get the overlay element (parent of the modal)
    const overlay = screen.getByRole('dialog').parentElement;
    
    // Click on the overlay but outside the modal
    if (overlay) {
      fireEvent.mouseDown(overlay);
    }
    
    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('has the correct accessibility attributes', () => {
    render(<ConfirmationModal {...defaultProps} />);
    
    // Get dialog element
    const dialogElement = screen.getByRole('dialog');
    
    // Check accessibility attributes
    expect(dialogElement).toHaveAttribute('aria-modal', 'true');
    expect(dialogElement).toHaveAttribute('aria-labelledby', 'modal-title');
    
    // Check title has correct ID
    const titleElement = screen.getByText('Test Modal Title');
    expect(titleElement).toHaveAttribute('id', 'modal-title');
  });
});

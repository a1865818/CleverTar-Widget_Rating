/*
 * Confirmation Modal Component
 * 
 * This component creates a reusable modal dialog for confirming user actions.
 * It handles displaying a custom title, message, and customizable button text.
 * 
 * Features:
 * - Fully accessible with proper ARIA attributes
 * - Closes when clicking outside the modal or pressing ESC key
 * - Customizable confirm/cancel button text
 * - Smooth animations with CSS transitions
 * - Backdrop blur effect for better UX
 * - Responsive design that works on all screen sizes
 * 
 * @param isOpen: A boolean to control the modal visibility
 * @param onClose: A function to close the modal
 * @param onConfirm: A function to handle the confirmation action
 * @param title: The title of the modal
 * @param message: The message to display in the modal
 * @param confirmButtonText: The text to display on the confirm button
 * @param cancelButtonText: The text to display on the cancel button
 * 
 * @returns A confirmation modal component
 */

"use client";

import { useRef, useEffect } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel"
}: ConfirmationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    // Close on escape key press
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl p-6 m-4 max-w-sm w-full border border-gray-200 animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h3 id="modal-title" className="text-lg font-medium text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex justify-end space-x-3">
          <button 
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={onClose}
          >
            {cancelButtonText}
          </button>
          <button 
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

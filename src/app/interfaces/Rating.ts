/**
 * Core Rating interface used throughout the application
 *
 * This interface represents the data storage model used for:
 * - Storing ratings in the context state
 * - Persisting ratings to localStorage
 * - Creating new rating entries from user input
 *
 * It uses field names and types optimized for storage efficiency and
 * matches the structure of how the data is managed internally.
 */
export interface Rating {
  id?: string;
  score: number;
  comment?: string;
  timestamp?: number;
}

/**
 * Formatted Rating interface used for display in components
 *
 * This interface represents the presentation model used for:
 * - Rendering rating items in the UI
 * - Displaying formatted dates and scores
 * - Maintaining consistent terminology in the UI layer
 *
 * It uses field names that match the UI language and types that are
 * ready for display, requiring no further transformation in the components.
 *
 * The separation between Rating and DisplayRating provides:
 * 1. Clear separation between data and presentation concerns
 * 2. Type safety for UI components that only need display properties
 * 3. Flexibility to change either model without affecting the other
 */
export interface DisplayRating {
  rating: number;
  timestamp: string;
  feedback?: string;
}

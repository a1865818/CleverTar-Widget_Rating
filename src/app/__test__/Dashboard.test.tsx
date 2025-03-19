import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "../components/Dashboard";
import { useRatingContext } from "../context/RatingContext";

// Define the type for the mock rating
interface MockRating {
  id: string;
  score: number;
  comment: string;
  timestamp: number;
}

// Mock the RatingContext hook
jest.mock("../context/RatingContext", () => ({
  useRatingContext: jest.fn(),
}));

// Mock the RatingItem component
jest.mock("../components/RatingItem", () => ({
  __esModule: true,
  default: ({ rating }: { rating: { rating: number, timestamp: string, feedback?: string } }) => (
    <div data-testid="rating-item">
      <span data-testid="rating-score">{rating.rating}</span>
      {rating.feedback && <p data-testid="rating-feedback">{rating.feedback}</p>}
    </div>
  ),
}));

describe("Dashboard Component", () => {
  // Sample test data
 const mockRatings: MockRating[] = [
  { id: "1", score: 5, comment: "Excellent service", timestamp: Date.now() - 1000 },
  { id: "2", score: 4, comment: "Very good", timestamp: Date.now() - 2000 },
  { id: "3", score: 3, comment: "Average", timestamp: Date.now() - 3000 },
  { id: "4", score: 2, comment: "Below average", timestamp: Date.now() - 4000 },
  { id: "5", score: 1, comment: "Poor service", timestamp: Date.now() - 5000 },
];

  const mockClearRatings = jest.fn();

  beforeEach(() => {
    // Setup default mock implementation
    (useRatingContext as jest.Mock).mockReturnValue({
      ratings: mockRatings,
      clearRatings: mockClearRatings,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the dashboard with correct title", () => {
    render(<Dashboard />);
    expect(screen.getByText("Ratings Dashboard")).toBeInTheDocument();
  });

  it("displays the correct total number of ratings", () => {
    render(<Dashboard />);
    expect(screen.getByText("Total Ratings")).toBeInTheDocument();
    
    // Find the total ratings container and check its value
    const totalRatingsContainer = screen.getByText("Total Ratings").closest('.bg-blue-50');
    expect(totalRatingsContainer).toHaveTextContent("5");
  });

  it("calculates and displays the correct average rating", () => {
    render(<Dashboard />);
    expect(screen.getByText("Average Rating")).toBeInTheDocument();
    // Average of [5,4,3,2,1] is 3.0
    expect(screen.getByText("3.0")).toBeInTheDocument();
  });

  it("displays the correct highest rating", () => {
    render(<Dashboard />);
    expect(screen.getByText("Highest Rating")).toBeInTheDocument();
    
    // Find the highest rating container and check its value
    const highestRatingContainer = screen.getByText("Highest Rating").closest('.bg-yellow-50');
    expect(highestRatingContainer).toHaveTextContent("5");
  });

  it('shows "No ratings found" when there are no ratings', () => {
    (useRatingContext as jest.Mock).mockReturnValue({
      ratings: [],
      clearRatings: mockClearRatings,
    });

    render(<Dashboard />);
    expect(screen.getByText("No ratings found.")).toBeInTheDocument();
  });

  it("calls clearRatings when clear button is clicked", () => {
    render(<Dashboard />);

    const clearButton = screen.getByText("Clear All Ratings");
    fireEvent.click(clearButton);

    expect(mockClearRatings).toHaveBeenCalledTimes(1);
  });

  it("filters ratings when filter is changed", () => {
    render(<Dashboard />);

    // Initially should show all 5 ratings
    expect(screen.getAllByTestId("rating-item").length).toBe(5);

    // Change filter to only show 5-star ratings
    const filterSelect = screen.getByRole("combobox");
    fireEvent.change(filterSelect, { target: { value: "5" } });

    // Now should only show 1 rating (the 5-star one)
    expect(screen.getAllByTestId("rating-item").length).toBe(1);
  });

  it("displays correct zero values when no ratings exist", () => {
    (useRatingContext as jest.Mock).mockReturnValue({
      ratings: [],
      clearRatings: mockClearRatings,
    });

    render(<Dashboard />);

    // Check Total Ratings is 0
    const totalRatingsContainer = screen.getByText("Total Ratings").closest('.bg-blue-50');
    expect(totalRatingsContainer).toHaveTextContent("0");

    // Check Average Rating is 0.0
    const averageRatingContainer = screen.getByText("Average Rating").closest('.bg-green-50');
    expect(averageRatingContainer).toHaveTextContent("0.0");

    // Check Highest Rating is 0
    const highestRatingContainer = screen.getByText("Highest Rating").closest('.bg-yellow-50');
    expect(highestRatingContainer).toHaveTextContent("0");
  });

  it("displays the rating distribution correctly", () => {
    render(<Dashboard />);

    // Check counts and percentages for each rating
    const ratingTexts = screen.getAllByText((content, element) => {
      // Check if the element is within the rating distribution section
      const isInDistribution = element?.closest('.bg-gray-100') !== null;
      // Check if the text matches our pattern (number followed by percentage)
      const matchesPattern = /1\s*\(\s*20\.0\s*%\)/.test(content);
      return isInDistribution && matchesPattern;
    });

    expect(ratingTexts.length).toBeGreaterThan(0);
  });

  it("sorts ratings by timestamp with newest first", () => {
    render(<Dashboard />);

    const ratingFeedbacks = screen.getAllByTestId("rating-feedback");
    
    // Debug: Log all feedbacks to see their order
    // console.log('Rating feedbacks:', ratingFeedbacks.map(fb => fb.textContent));

    // First item (index 0) should be the newest rating
    expect(ratingFeedbacks[0]).toHaveTextContent("Excellent service");
    
    // Last item (index 4) should be the oldest rating
    expect(ratingFeedbacks[4]).toHaveTextContent("Poor service");
  });
});

# Website Rating Widget

A responsive, interactive rating widget that allows visitors to rate your website on a scale of 1-5 stars and provide additional feedback. Built with Next.js and TypeScript, this application features a clean UI, persistent data storage, and a comprehensive analytics dashboard.

## 📋 Features

### Rating Widget
- Interactive 5-star rating system with hover effects
- Two-step feedback collection (rating + username and comment)
- User identification with personalized username inputs
- Success confirmation after submission
- Fully responsive design for all device sizes
- Accessible with proper ARIA labels and keyboard navigation

### Analytics Dashboard
- Visual summary of all collected ratings
- Rating statistics (total count, average rating, highest rating)
- Interactive rating distribution chart
- Filterable list of individual ratings
- Reviewer identification with usernames displayed
- Option to clear all ratings (with confirmation)

### Technical Features
- Modern React with Next.js App Router
- TypeScript for type safety
- Data persistence using localStorage
- Component-based architecture
- Comprehensive test coverage
- Tailwind CSS for styling

## ✅ Requirements Fulfilled

This implementation satisfies all requirements from the take-home test:

- ✓ **Interactive rating selection**: Users can select from 1-5 stars with hover effects
- ✓ **Clear visual feedback**: Selected stars change color and scale up when selected
- ✓ **Easy integration**: Implemented as modular components that can be placed on any page
- ✓ **Record user ratings**: All ratings are stored with usernames, timestamps and comments
- ✓ **Dashboard UI**: Comprehensive dashboard showing all ratings with filtering options
- ✓ **Visually appealing**: Clean, modern design with responsive layouts
- ✓ **Simple storage**: Using localStorage for persistent data without backend requirements

## 🎨 Figma Design

The design for this project was created using Figma. You can view the Figma file here:

[View Figma Design](https://www.figma.com/design/OgbLPRaIf37eHHjurpfatK/Widget-Rating?node-id=0-1&t=g0grjMqidd1aaSY7-1)


## 🚀 Live Demo

View the live demo at: [https://clever-tar-widget-rating.vercel.app/](https://clever-tar-widget-rating.vercel.app/)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Testing**: Jest & React Testing Library
- **Storage**: localStorage

## 📦 Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # Global state management
│   │   ├── interfaces/       # TypeScript interfaces
│   │   ├── __tests__/        # Test files
│   │   ├── dashboard/        # Dashboard page
│   │   ├── rate/             # Rating page
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   └── ...
├── public/                   # Static assets
└── ...
```

## 🔍 Key Design Decisions

### 1. Separation of Data and Presentation
Created distinct interfaces for data storage (`Rating`) and UI presentation (`DisplayRating`) to maintain clean separation of concerns.

### 2. Progressive Disclosure
Implemented a stepped rating experience to reduce cognitive load - first stars, then feedback form with username input.

### 3. User Identity Capture
Added username field to personalize feedback and make the dashboard more informative with attributed reviews.

### 4. Responsive Design
All components adapt to different screen sizes with appropriate spacing and sizing.

### 5. Accessibility
Added proper ARIA labels, keyboard navigation, and focus management for screen readers.

### 6. Confirmation Flows
Added modal confirmations for destructive actions like clearing all ratings.

## 📋 Installation & Setup

### Prerequisites
- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/a1865818/CleverTar-Widget_Rating.git
   cd my-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

### Running Tests

```bash
npm run test
# or
yarn test
```

## 🖥️ Usage

### Home Page
The home page features navigation buttons to access the rating widget or view the dashboard.

### Rating Widget
1. Click on a star (1-5) to select your rating
2. Enter your name in the username field
3. Provide detailed feedback in the comment area
4. Submit your feedback
5. View the success confirmation

### Dashboard
1. View summary statistics at the top (total ratings, average, highest)
2. See the distribution of ratings in the chart
3. Filter ratings by star count using the dropdown
4. View individual ratings with usernames, timestamps and comments

## 🧪 Testing

The application includes comprehensive test coverage for all components:
- Unit tests for individual components and their logic
- Test mocks for context and localStorage

## 📱 Responsive Design

The application is fully responsive and works well on:
- Desktop browsers
- Tablets
- Mobile devices

## 🚶 Next Steps

If I were to extend this project, I would consider:
- Adding user authentication
- Implementing server-side storage with a database
- Allow users to edit or delete their ratings
- Implementing custom theming options
- Adding user profile pictures alongside reviews
- Implementing rating verification to prevent spam

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

# Genesis Frontend

This directory contains the React frontend application for the Genetic Trait Predictor and Family Tree Visualizer project.

## Technology Stack

- **React 19**: Modern UI library for building component-based interfaces
- **Vite**: Next-generation frontend tooling for faster development and optimized builds
- **React Router DOM**: Client-side routing library
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **Axios**: Promise-based HTTP client for API requests
- **React Toastify**: For notification handling
- **D3.js/Cytoscape.js**: Data visualization libraries for the family tree visualizer

## Application Structure

```
frontend/
├── public/                 # Static files
├── src/                    # Source code
│   ├── assets/             # Images, icons, and other static assets
│   ├── components/         # Reusable React components
│   │   ├── Banner.jsx      # Hero banner component
│   │   ├── DoctorsCard.jsx # Doctor profile card component
│   │   ├── Footer.jsx      # Site footer component
│   │   ├── GeneticForm.jsx # Genetic trait prediction form
│   │   ├── Header.jsx      # Site header component
│   │   ├── Navbar.jsx      # Navigation component
│   │   ├── SpecialityMenu.jsx # Medical speciality selector
│   │   └── TopDoctors.jsx  # Featured doctors component
│   ├── context/            # React context providers
│   │   └── AppContext.jsx  # Application-wide state management
│   ├── pages/              # Page components
│   │   ├── about.jsx       # About page
│   │   ├── appointment.jsx # Appointment scheduling page
│   │   ├── contact.jsx     # Contact page
│   │   ├── doctors.jsx     # Doctors directory
│   │   ├── doctorsData.jsx # Doctor data provider
│   │   ├── DoctorsDetailspage.jsx # Individual doctor profile
│   │   ├── Home.jsx        # Homepage
│   │   ├── login.jsx       # User authentication page
│   │   ├── myappointment.jsx # User appointments page
│   │   ├── myprofile.jsx   # User profile page
│   │   └── signup.jsx      # User registration page
│   ├── App.jsx             # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css           # Global styles
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # TailwindCSS configuration
└── postcss.config.js       # PostCSS configuration
```

## Key Features

### 1. Genetic Trait Prediction Form
The `GeneticForm.jsx` component allows users to input their genetic data and family history to receive trait predictions:

```jsx
// Example form submission
<form onSubmit={handleSubmit}>
  <input type="text" name="name" placeholder="Your Name" />
  <input type="number" name="age" placeholder="Age" />
  <select name="gender">
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
  <textarea name="familyHistory" placeholder="Family Genetic History"></textarea>
  <button type="submit">Predict</button>
</form>
```

### 2. Family Tree Visualization
(Planned feature) An interactive family tree visualization that will display genetic relationships and trait inheritance patterns across generations.

### 3. User Authentication
User registration and authentication system for securing personal genetic data.

### 4. Doctor Directory
Browse and connect with genetic counselors and specialists.

### 5. Appointment Scheduling
Book appointments with genetic counselors for personalized consultations.

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Configuration
Create a `.env` file in the frontend directory for environment-specific settings:

```
VITE_API_URL=http://localhost:5000/api
VITE_ENABLE_MOCK_DATA=false
```

## Adding New Components
When adding new components:

1. Create the component file in `src/components/`
2. Export the component as the default export
3. Import and use in pages or other components
4. Update this README if it's a major feature

## State Management
The application uses React Context API for state management. The main context provider is located in `src/context/AppContext.jsx`.

## Styling Guidelines
The project uses TailwindCSS for styling with the following conventions:

- Use utility classes directly in JSX
- Extract common patterns into components
- Use the `@apply` directive for complex, reusable styles
- Follow the color palette defined in `tailwind.config.js`

## Future Enhancements

1. Advanced D3.js-based family tree visualization
2. Real-time genetic trait prediction with WebSocket integration
3. Enhanced data visualization for genetic relationships
4. Mobile-responsive design improvements
5. Accessibility enhancements
# Genesis Backend

This directory contains the Express.js backend server for the Genetic Trait Predictor and Family Tree Visualizer application.

## Architecture

The backend follows a RESTful API architecture with the following components:

- **Express Server**: Handles HTTP requests and responses
- **MongoDB Database**: Stores user data, genetic information, and prediction results
- **Authentication**: JWT-based user authentication system
- **API Routes**: Endpoints for user management, genetic data processing, and ML predictions
- **Python Integration**: Communication with Python ML models for genetic trait prediction
- **Security**: Advanced security with helmet, rate limiting, and CORS protection

## Directory Structure

```
backend/
├── models/              # MongoDB schemas
│   ├── user.js          # User model definition
│   ├── Genetic.js       # Genetic data schema
│   └── FamilyTree.js    # Family tree schema
├── routes/              # API route definitions
│   ├── auth.js          # Authentication routes
│   ├── genetics.js      # Genetic prediction routes
│   └── familyTree.js    # Family tree visualization routes
├── middleware/          # Custom middleware
│   ├── auth.js          # Authentication middleware
│   └── validate.js      # Request validation middleware
├── server.js            # Main server entry point
├── API.md               # API documentation
├── package.json         # Dependencies and scripts
└── .env.example         # Example environment variables
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables (see `.env.example`):

```
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
ML_SERVICE_URL=http://localhost:8000
ML_API_KEY=your_ml_service_api_key
CORS_ORIGIN=http://localhost:5173
```

> **Important**: Never commit your `.env` file to version control. Make sure it's included in your `.gitignore` file.

## Available Scripts

```bash
# Install dependencies
npm install

# Start the server in production mode
npm start

# Start the server in development mode (requires nodemon)
npm run dev
```

## API Endpoints

See [API.md](./API.md) for detailed API documentation.

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate a user and return a JWT
- `GET /api/auth/me`: Get current user information
- `PUT /api/auth/update-profile`: Update user profile

### Genetic Prediction
- `POST /api/genetics/predict`: Submit genetic data and receive trait predictions
- `GET /api/genetics/history`: Get user's prediction history
- `GET /api/genetics/prediction/:id`: Get specific prediction details

### Family Tree
- `POST /api/family-tree`: Create a new family tree
- `GET /api/family-tree`: Get all user's family trees
- `GET /api/family-tree/:id`: Get specific family tree
- `POST /api/family-tree/:id/member`: Add member to family tree
- `POST /api/family-tree/:id/relationship`: Add relationship to family tree
- `PUT /api/family-tree/:id/visualization`: Update visualization settings

## Genetic Trait Prediction

The genetic prediction system implements:

1. SNP (Single Nucleotide Polymorphism) data collection and storage
2. Mock ML prediction models (to be replaced with real models)
3. Prediction history tracking and retrieval
4. Risk assessment for various genetic traits

## Family Tree Visualization

The family tree system supports:

1. Creating and managing multiple family trees
2. Adding family members with genetic trait information
3. Establishing relationships between members
4. Customizable visualization settings
5. Genetic trait inheritance visualization

## Security Features

- JWT-based authentication with secure token handling
- Request validation with express-validator
- Rate limiting to prevent abuse
- Helmet for securing HTTP headers
- CORS protection for API endpoints
- Mongoose schema validation

## Future Improvements

1. Integration with actual Python ML models via Flask API
2. Real-time data processing with WebSockets
3. Advanced visualization options for genetic data
4. Batch processing for large genetic datasets
5. Enhanced security with 2FA and audit logging
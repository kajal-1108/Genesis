# Genesis: Genetic Trait Predictor and Family Tree Visualizer

## Project Abstract
Genesis is an AI-driven system capable of predicting human phenotypic traits based on genomic data. By utilizing Single Nucleotide Polymorphism (SNP) information and applying machine learning algorithms, the system predicts traits such as eye color, height, and possible disease predispositions. Explainable Artificial Intelligence (XAI) techniques are integrated to enhance the transparency and interpretability of model predictions.

An interactive family tree visualizer has been implemented to represent hereditary patterns and genetic relationships across generations. This visualization aids users, healthcare professionals, and genetic counselors in understanding trait inheritance in an intuitive manner. 

The system is developed using Python with frameworks like TensorFlow, Flask, and D3.js for visualization, and ensures secure data storage with privacy compliance.

Overall, the project represents a convergence of bioinformatics, artificial intelligence, and data visualization to promote awareness of genetic inheritance and proactive healthcare planning. It provides an accessible and educational platform for both researchers and individuals interested in exploring their genetic background.

## Repository Structure

```
Genesis/
├── backend/                 # Express server with MongoDB integration
│   ├── models/              # Database models
│   │   ├── user.js          # User model
│   │   ├── Genetic.js       # Genetic data schema
│   │   └── FamilyTree.js    # Family tree schema
│   ├── routes/              # API endpoints
│   │   ├── auth.js          # Authentication routes
│   │   ├── genetics.js      # Genetic prediction routes
│   │   └── familyTree.js    # Family tree visualization routes
│   ├── middleware/          # Custom middleware
│   │   ├── auth.js          # Authentication middleware
│   │   └── validate.js      # Request validation middleware
│   ├── server.js            # Server entry point
│   ├── API.md               # API documentation
│   └── .env.example         # Example environment variables
│
└── frontend/                # React application built with Vite
    ├── public/              # Static files
    ├── src/                 # Source code
    │   ├── assets/          # Images and other static assets
    │   ├── components/      # Reusable React components
    │   ├── context/         # React context providers
    │   ├── pages/           # Page components
    │   ├── App.jsx          # Main application component
    │   └── main.jsx         # Application entry point
    └── index.html           # HTML entry point
```

## Technology Stack

- **Frontend**: React, Vite, TailwindCSS, D3.js for visualization
- **Backend**: Express.js, MongoDB with Mongoose ODM
- **Security**: JWT authentication, Helmet, Rate limiting, CORS protection
- **ML Components**: Python, TensorFlow, scikit-learn, Flask for serving models
- **Data Handling**: Genetic marker analysis, Family relationship modeling

## Key Features

- **Genetic Trait Prediction**: Analysis of SNPs to predict likelihood of various traits
- **Family Tree Visualization**: Interactive visualization of family relationships and trait inheritance
- **User Authentication**: Secure registration and login system
- **Profile Management**: Manage personal genetic data and family trees
- **Data Security**: Comprehensive security measures to protect sensitive genetic information
- **API Documentation**: Detailed API documentation for integration and development

## Installation and Setup

### Prerequisites
- Node.js (v18+)
- MongoDB
- Python 3.8+ (for ML components, future integration)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Documentation

Detailed API documentation can be found in [backend/API.md](backend/API.md).

## Development Roadmap

1. ✅ Initial project setup and repository structure
2. ✅ Basic authentication system
3. ✅ Frontend UI components and routing
4. ✅ Genetic trait prediction form implementation
5. ✅ Family tree visualization component
6. ✅ Backend API for genetic predictions and family trees
7. ⬜ Integration with Python ML models
8. ⬜ Implementation of XAI techniques
9. ⬜ Advanced data privacy and security enhancements
10. ⬜ User testing and feedback integration
11. ⬜ Production deployment and documentation

## Machine Learning Implementation

The system uses a multi-stage approach for genetic trait prediction:

1. **Data Preprocessing**: Normalization and feature extraction from SNP data
2. **Model Training**: Ensemble methods combining Random Forests and Neural Networks
3. **Prediction Generation**: Risk assessment for various traits based on genetic markers
4. **Explainability**: Visualization of feature importance and prediction confidence

Currently, the backend includes mock prediction logic that will be replaced with actual ML models in future iterations.

## Security Considerations

- Genetic data is highly sensitive and protected with multiple security layers
- JWT-based authentication with secure token handling
- Rate limiting to prevent brute force attacks
- Input validation and sanitization to prevent injection attacks
- CORS protection for API endpoints
- Secure HTTP headers with Helmet

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Genomic data sources: NCBI dbSNP, 1000 Genomes Project, HapMap
- Research papers and methodologies that inspired this work
- Open source libraries and frameworks that made this project possible
# API Documentation - Genetic Trait Predictor & Family Tree Visualizer

This document provides comprehensive information about the API endpoints available in this application.

## Base URL

- Development: `http://localhost:5000/api`
- Production: `https://yourproductionsite.com/api`

## Authentication Endpoints

### Register a new user
```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // Optional, defaults to "user"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Get Current User
```
GET /auth/me
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Update User Profile
```
PUT /auth/update-profile
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "role": "user"
  }
}
```

## Genetic Trait Prediction Endpoints

### Submit Genetic Data for Prediction
```
POST /genetics/predict
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "age": 35,
  "gender": "male",
  "familyHistory": "diabetes, heart disease",
  "snpData": [
    { "id": "rs429358", "genotype": "CT" },
    { "id": "rs7412", "genotype": "TT" }
  ],
  "traits": ["diabetes", "heart_disease", "alzheimers"]
}
```

**Response:**
```json
{
  "success": true,
  "predictionId": "60d21b4667d0d8992e610c85",
  "results": {
    "diabetes": {
      "risk": "moderate",
      "score": 0.45,
      "confidence": 0.82
    },
    "heart_disease": {
      "risk": "low",
      "score": 0.22,
      "confidence": 0.91
    },
    "alzheimers": {
      "risk": "low",
      "score": 0.15,
      "confidence": 0.78
    }
  },
  "summary": "Based on your genetic profile, you have a moderate risk of diabetes. We recommend consulting with a healthcare provider for personalized advice."
}
```

### Get Prediction History
```
GET /genetics/history
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "createdAt": "2023-05-15T10:30:40Z",
      "traits": ["diabetes", "heart_disease", "alzheimers"],
      "results": {
        "diabetes": {
          "risk": "moderate",
          "score": 0.45
        },
        "heart_disease": {
          "risk": "low",
          "score": 0.22
        },
        "alzheimers": {
          "risk": "low",
          "score": 0.15
        }
      }
    },
    {
      "_id": "60d21b4667d0d8992e610c86",
      "createdAt": "2023-05-10T14:22:15Z",
      "traits": ["cancer", "parkinsons"],
      "results": {
        "cancer": {
          "risk": "low",
          "score": 0.18
        },
        "parkinsons": {
          "risk": "very_low",
          "score": 0.05
        }
      }
    }
  ]
}
```

### Get Specific Prediction
```
GET /genetics/prediction/:id
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "createdAt": "2023-05-15T10:30:40Z",
    "age": 35,
    "gender": "male",
    "familyHistory": "diabetes, heart disease",
    "snpData": [
      { "id": "rs429358", "genotype": "CT" },
      { "id": "rs7412", "genotype": "TT" }
    ],
    "traits": ["diabetes", "heart_disease", "alzheimers"],
    "results": {
      "diabetes": {
        "risk": "moderate",
        "score": 0.45,
        "confidence": 0.82
      },
      "heart_disease": {
        "risk": "low",
        "score": 0.22,
        "confidence": 0.91
      },
      "alzheimers": {
        "risk": "low",
        "score": 0.15,
        "confidence": 0.78
      }
    },
    "summary": "Based on your genetic profile, you have a moderate risk of diabetes. We recommend consulting with a healthcare provider for personalized advice."
  }
}
```

## Family Tree Endpoints

### Create a New Family Tree
```
POST /family-tree
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "name": "Smith Family Tree",
  "description": "Genetic history of the Smith family"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "Smith Family Tree",
    "description": "Genetic history of the Smith family",
    "owner": "60d21b4667d0d8992e610c85",
    "createdAt": "2023-05-15T10:30:40Z",
    "updatedAt": "2023-05-15T10:30:40Z",
    "members": []
  }
}
```

### Get All User's Family Trees
```
GET /family-tree
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "Smith Family Tree",
      "description": "Genetic history of the Smith family",
      "owner": "60d21b4667d0d8992e610c85",
      "createdAt": "2023-05-15T10:30:40Z",
      "updatedAt": "2023-05-15T10:30:40Z",
      "memberCount": 12
    },
    {
      "_id": "60d21b4667d0d8992e610c86",
      "name": "Johnson Family Tree",
      "description": "Tracking genetic traits in Johnson lineage",
      "owner": "60d21b4667d0d8992e610c85",
      "createdAt": "2023-05-10T14:22:15Z",
      "updatedAt": "2023-05-11T09:15:22Z",
      "memberCount": 8
    }
  ]
}
```

### Get Specific Family Tree
```
GET /family-tree/:id
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "Smith Family Tree",
    "description": "Genetic history of the Smith family",
    "owner": {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "John Smith"
    },
    "createdAt": "2023-05-15T10:30:40Z",
    "updatedAt": "2023-05-15T10:30:40Z",
    "members": [
      {
        "_id": "60d21b4667d0d8992e610c87",
        "name": "John Smith",
        "gender": "male",
        "birthYear": 1980,
        "traits": [
          {
            "name": "diabetes",
            "status": "affected"
          },
          {
            "name": "heart_disease",
            "status": "carrier"
          }
        ]
      },
      {
        "_id": "60d21b4667d0d8992e610c88",
        "name": "Jane Smith",
        "gender": "female",
        "birthYear": 1982,
        "traits": [
          {
            "name": "diabetes",
            "status": "unaffected"
          },
          {
            "name": "heart_disease",
            "status": "unknown"
          }
        ]
      }
    ],
    "relationships": [
      {
        "type": "spouse",
        "from": "60d21b4667d0d8992e610c87",
        "to": "60d21b4667d0d8992e610c88"
      }
    ],
    "visualizationSettings": {
      "layout": "hierarchical",
      "displayTraits": ["diabetes", "heart_disease"],
      "colorScheme": "default"
    }
  }
}
```

### Add Member to Family Tree
```
POST /family-tree/:id/member
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "name": "Robert Smith",
  "gender": "male",
  "birthYear": 2010,
  "traits": [
    {
      "name": "diabetes",
      "status": "unaffected"
    },
    {
      "name": "heart_disease",
      "status": "unknown"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c89",
    "name": "Robert Smith",
    "gender": "male",
    "birthYear": 2010,
    "traits": [
      {
        "name": "diabetes",
        "status": "unaffected"
      },
      {
        "name": "heart_disease",
        "status": "unknown"
      }
    ]
  }
}
```

### Add Relationship to Family Tree
```
POST /family-tree/:id/relationship
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "type": "parent-child",
  "from": "60d21b4667d0d8992e610c87",
  "to": "60d21b4667d0d8992e610c89"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type": "parent-child",
    "from": "60d21b4667d0d8992e610c87",
    "to": "60d21b4667d0d8992e610c89",
    "_id": "60d21b4667d0d8992e610c90"
  }
}
```

### Update Visualization Settings
```
PUT /family-tree/:id/visualization
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "layout": "radial",
  "displayTraits": ["diabetes", "heart_disease", "cancer"],
  "colorScheme": "contrast"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "layout": "radial",
    "displayTraits": ["diabetes", "heart_disease", "cancer"],
    "colorScheme": "contrast"
  }
}
```

## Health Check Endpoint

### Server Health
```
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running",
  "environment": "development",
  "timestamp": "2023-05-15T10:30:40Z"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Not authorized to access this resource"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "You do not have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Server error"
}
```

## Rate Limiting

All API endpoints are rate-limited to protect the server from abuse. The current limit is 100 requests per 15-minute window per IP address. If you exceed this limit, you will receive a 429 Too Many Requests response:

```json
{
  "success": false,
  "error": "Too many requests, please try again later"
}
```

---

For additional help or to report issues with the API, please contact the development team.
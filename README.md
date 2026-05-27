# Forum App – Backend

A REST API built with Node.js, Express, and MongoDB for a full-stack Q&A forum application.

The API supports JWT-based authentication, protected routes, questions, answers, and answer reactions such as likes and dislikes. Authenticated users can create content and delete only the questions or answers they have created. Joi validation is used to help keep request data consistent. It is built to work with a dedicated React/Next.js frontend.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Joi
- dotenv
- CORS
- uuid
- Nodemon
- ESLint

## Features

### Authentication

- User registration and login with hashed passwords using `bcryptjs`
- JWT-based authentication middleware protects restricted API routes
- Registration and login data is validated using Joi schemas

### Questions & Answers

- Authenticated users can create questions and submit answers
- All users can view questions and answers
- Questions are returned in reverse chronological order
- Answers for a question are sorted by like score
- Users can delete only their own questions and answers
- A question’s `isAnswered` status updates when an answer is added or its last answer is deleted

### Likes & Dislikes

- Authenticated users can like or dislike answers
- Users can remove or switch reactions between like and dislike
- Reaction counts are updated after each action

### Validation, Access Control & Structure

- Joi validation for key request bodies
- Ownership checks for deleting questions and answers
- Clear HTTP status codes and error messages for common API responses
- Modular folder structure with separate concerns for controllers, routes, models, schemas, middleware, and utilities
- Environment-based configuration using `.env` variables

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/JustinaVilcinskaite/forum-api-node-express.git
cd forum-api-node-express
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
PORT=3002
MONGO_CONNECTION=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the placeholder values with your MongoDB connection string and JWT secret.

### 4. Run the development server

```bash
npm run dev
```

The API will be available at:

```bash
http://localhost:3002
```

### 5. Run the frontend

This backend is built to work with a separate React/Next.js frontend.  
To use the full application in the browser, run the frontend locally as well:

[forum-app-react-next-ts](https://github.com/JustinaVilcinskaite/forum-app-react-next-ts)

## Project Structure

```text
forum-api-node-express/
├── src/
│   ├── controller/         # Request handlers for users, questions, and answers
│   ├── route/              # Express route definitions
│   ├── model/              # Mongoose data models
│   ├── schema/             # Joi validation schemas
│   ├── middleware/         # Authentication and validation middleware
│   └── utils/              # Helper functions
├── index.js                # Server entry point
├── eslint.config.js
├── package.json
└── README.md
```

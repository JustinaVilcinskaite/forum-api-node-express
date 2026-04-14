# Forum API – Node.js, Express

A modular backend REST API built with Node.js, Express, and MongoDB for a full-stack Q&A forum application. It supports user authentication with JWT, question and answer management, and answer reactions such as likes and dislikes. The project uses schema validation to help keep request data consistent.

## Project Overview

This API provides the backend for a Q&A-style forum application. Authenticated users can post questions, submit answers, and interact with answers through like/dislike functionality. Users can only delete content they have created. Core features include token-based authentication, route protection via middleware, and Joi validation. Mongoose is used to model and manage application data. The API is built to work with a dedicated React frontend.

## Key Features

### Authentication & Security

- User registration and login with hashed passwords using bcryptjs
- JWT-based authentication for protected API routes
- Registration and login inputs are validated using Joi schemas
- Restricted routes are protected by middleware that verifies JWT tokens

### Question Management

- Authenticated users can post new questions
- All users, including unauthenticated visitors, can view the full list of questions
- Questions are returned in reverse chronological order (newest first)
- Only the question author can delete a question
- A question’s `isAnswered` status is updated when an answer is added or when its last answer is deleted

### Answer Management

- Authenticated users can submit answers to existing questions
- Answers for a question are visible to all users and sorted by number of likes
- Only the answer author can delete an answer
- Question answer status updates automatically based on whether answers exist

### Likes & Dislikes

- Authenticated users can like or dislike answers
- Likes and dislikes are mutually exclusive and reversible
- Like/dislike state and counts are updated when the action is processed

### Validation & Access Control

- Joi validation is used for key request bodies such as registration, login, question creation, and answer submission
- Middleware enforces authentication on protected endpoints
- The API uses clear HTTP status codes and error messages for common failure cases

### Architecture & Design

- Modular folder structure with separate concerns for controllers, routes, models, schemas, middleware, and utilities
- Mongoose ODM used for schema modeling and for referencing related entities
- Environment-based configuration using `.env` variables
- Structured to be easier to maintain and extend
- Uses a clear REST-style route structure for core forum actions

## Getting Started

Follow these steps to set up and run the project locally:

1. **Clone the Repository**

```bash
git clone https://github.com/JustinaVilcinskaite/forum-api-node-express.git
cd forum-api-node-express
```

2. **Install Dependencies**

```bash
npm install
```

3. **Configure Environment Variables**

Create a `.env` file in the root directory and add the following:

```env
PORT=3002
MONGO_CONNECTION=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
```

Replace the placeholder values with your actual MongoDB URI and secret key.

4. **Start the Development Server**

```bash
npm run dev
```

By default, the server will run on `http://localhost:3002`, or on the port specified in your `.env` file.

5. **Test the API (Optional)**  
   Use tools like Thunder Client, Postman, or curl.

> **Note:** This is the backend for a full-stack Q&A forum application.  
> To launch the full application in the browser, the corresponding frontend (built with React) must also be running.  
> Refer to the [`forum-app-react-next-ts`](https://github.com/JustinaVilcinskaite/forum-app-react-next-ts) repository for frontend setup instructions.

## Project Structure

```
forum-api-node-express/
├── index.js
├── .env
├── .gitignore
├── package.json
├── eslint.config.js
├── src/
│   ├── controller/     # Controllers for users, questions, and answers
│   ├── route/          # Express routes
│   ├── model/          # Mongoose models
│   ├── schema/         # Joi validation schemas
│   ├── middleware/     # Authentication and validation middleware
│   └── utils/          # Utility functions
```

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Token (JWT), bcryptjs
- **Validation:** Joi
- **Configuration & Utilities:** dotenv, uuid, CORS
- **Tooling:** Nodemon, ESLint
- **Language Features:** ES Modules

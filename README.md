# Forum API – Node.js, Express

A secure and modular backend RESTful API built with Node.js, Express, and MongoDB for a full-stack Q&A forum application. It supports user authentication with JWT tokens, question and answer management, and interactive features like liking/disliking answers. The backend follows clean architectural practices and uses schema validation to ensure robust data integrity.

## Project Overview

This API provides the backend for a Q&A-style forum application. Authenticated users can post questions, submit answers, and interact with content through like/dislike functionality. Authenticated users can only delete content they have created. Core features include token-based authentication, route protection via middleware, and schema-based validation. Mongoose is used for data modeling and managing relationships between users, questions, and answers. The API is designed to integrate seamlessly with a dedicated React frontend.

## Key Features

### Authentication & Security
- User registration and login with hashed passwords using bcryptjs  
- JWT-based authentication for protected API routes  
- Middleware extracts and verifies tokens on restricted endpoints  
- Registration and login inputs are validated using Joi schemas  

### Question Management
- Authenticated users can post new questions  
- All users (including unauthenticated) can view the full list of questions  
- Questions are returned in reverse chronological order (newest first)  
- Only the question’s author can delete it  
- Related question’s `isAnswered` status is updated automatically when an answer is posted or all answers are deleted  

### Answer Management
- Authenticated users can submit answers to any question  
- Answers to a question are visible to all users and sorted by number of likes  
- Only the author of an answer can delete it  
- Related question’s `isAnswered` status updates automatically  

### Likes & Dislikes
- Authenticated users can like or dislike answers  
- Likes and dislikes are mutually exclusive and reversible  
- Like/dislike count is updated immediately on each action  

### Validation & Access Control
- Joi schema validation is applied to all incoming request bodies (e.g., registration, login, question/answer submission)  
- Middleware enforces authentication on protected endpoints  
- Consistent use of HTTP status codes and centralized error messages for failed operations  

### Architecture & Design
- Modular folder structure with separate concerns for controllers, routes, models, schemas, middleware, and utilities  
- Mongoose ODM used for schema modeling and populating related entities (e.g., user → question → answers)  
- Environment-based configuration using .env variables  
- Designed for maintainability and scalability in future development  
- Clean and consistent RESTful API design aligned with best practices  

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

By default, the server will start on `http://localhost:3002` (or the port specified in .env).

5. **Test the API (Optional)**  
Use tools like Thunder Client, Postman, or curl.

> **Note:** This is the backend for a full-stack Q&A forum application.  
> To launch the full application in the browser, the corresponding frontend (built with React) must also be running.  
> Refer to the [`forum-app-react-next-ts`](https://github.com/JustinaVilcinskaite/forum-app-react-next-ts) repository for frontend setup instructions.


## Project Structure

```
forum-api-node-express/
├── index.js               # Application entry point: sets up Express app, DB connection, and routes
├── .env                   # Environment variables (not committed to version control)
├── .gitignore             # Excludes node_modules, .env, etc. from Git
├── package.json           # Project metadata, dependencies, and scripts
├── eslint.config.js       # ESLint configuration for code style and quality
├── src/
│   ├── controller/        # Route handler logic for users, questions, and answers
│   ├── route/             # Express routes mapped to controller functions
│   ├── model/             # Mongoose models (User, Question, Answer)
│   ├── schema/            # Joi schemas for validating request payloads
│   ├── middleware/        # Middleware for authentication and validation
│   └── utils/             # Utility functions (e.g., string formatter, regex)
```

## API Endpoints Overview

### User
| Method | Endpoint         | Description                         | Access        |
|--------|------------------|-------------------------------------|---------------|
| POST   | /register        | Register a new user                 | Public        |
| POST   | /login           | Authenticate user and receive token| Public        |
| GET    | /login/validate  | Validate token and return user info| Auth required |

### Question
| Method | Endpoint         | Description                         | Access        |
|--------|------------------|-------------------------------------|---------------|
| GET    | /questions       | Retrieve all questions              | Public        |
| POST   | /questions       | Create a new question               | Auth required |
| DELETE | /questions/:id   | Delete a question (only by author)  | Auth required |

### Answer
| Method | Endpoint                  | Description                                | Access        |
|--------|---------------------------|--------------------------------------------|---------------|
| GET    | /questions/:id/answers    | Get a question with all its answers        | Public        |
| POST   | /questions/:id/answers    | Submit an answer to a question             | Auth required |
| DELETE | /answers/:id              | Delete an answer (only by author)          | Auth required |
| POST   | /answers/:id/like         | Like or unlike an answer                   | Auth required |
| POST   | /answers/:id/dislike      | Dislike or undo dislike of an answer       | Auth required |

## Technologies Used

- **Node.js** & **Express.js** – JavaScript runtime and backend web framework  
- **MongoDB** with **Mongoose** – NoSQL database and ODM for schema modeling and population  
- **JWT (jsonwebtoken)** – Token-based authentication and route protection  
- **bcryptjs** – Password hashing for secure credential storage  
- **Joi** – Schema-based validation for incoming request bodies  
- **dotenv** – Environment variable configuration management  
- **uuid** – Unique identifier generation for users, questions, and answers  
- **CORS** – Middleware for enabling cross-origin requests  
- **ES Modules** – Modern JavaScript syntax using `import`/`export` (enabled via `"type": "module"`)  
- **Nodemon** – Development utility for automatic server restarts (`npm run dev`)  
- **ESLint** – Code linting and style consistency  

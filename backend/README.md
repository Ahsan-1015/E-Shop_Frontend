# E-commerce Backend API

Backend API for the E-commerce Store built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, profile)
- Product management (list, search, filter by category)
- Order management (create, view, track)
- JWT-based authentication
- MongoDB database with Mongoose ODM

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search/:query` - Search products

### Orders

- `POST /api/orders` - Create new order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

3. Make sure MongoDB is running on your system.

4. Seed the database with initial data:

```bash
npm run seed
```

5. Start the server:

```bash
# Development
npm run dev

# Production
npm start
```

## Test User

After running the seed script, you can use the following test credentials:

- Email: test@example.com
- Password: password123

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- CORS for cross-origin requests

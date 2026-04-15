# E-Shop E-Commerce Platform

A full-stack e-commerce application built with React, Node.js, Express, and MongoDB.

## Tech Stack

### Frontend
- React 18 with Vite
- React Router v6
- Tailwind CSS
- Context API for state management
- React Compiler

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   ├── context/          # React contexts (Auth, Cart, Wishlist, Toast)
│   ├── pages/           # Page components
│   ├── services/       # API services
│   ├── hooks/           # Custom hooks
│   ├── layouts/         # Layout components
│   └── routes/         # Route definitions
├── backend/
│   ├── config/          # Database config
│   ├── controllers/    # Route controllers
│   ├── middleware/    # Auth middleware
│   ├── models/         # Mongoose models
│   └── routes/         # API routes
```

## Features

- User authentication (register/login)
- Product catalog with categories
- Shopping cart
- Wishlist
- Admin dashboard
- Product search and filters
- Responsive design
- Dark mode support
- Toast notifications
- Pagination

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

4. Configure environment variables:
   Create `.env` file in backend/:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

### Running the Project

1. Start backend server:
   ```bash
   cd backend
   node server.js
   ```

2. Start frontend development server:
   ```bash
   npm run dev
   ```

3. Seed database with sample products:
   ```bash
   cd backend
   node seed.js
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add to cart (protected)
- `DELETE /api/cart/:productId` - Remove from cart (protected)

### Wishlist
- `GET /api/wishlist` - Get user wishlist (protected)
- `POST /api/wishlist` - Add to wishlist (protected)
- `DELETE /api/wishlist/:productId` - Remove from wishlist (protected)

### Orders
- `GET /api/orders` - Get user orders (protected)
- `POST /api/orders` - Create order (protected)

## Default Users

After running `node seed.js`:
- Test User: `test@example.com` / `password123`
- Admin: `aaaa.ahshanhabib@gmail.com` / `admin123`

## License

MIT
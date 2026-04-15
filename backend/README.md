# E-commerce Backend API

Backend API for the E-commerce Store built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, profile, social login)
- Product management (list, search, filter by category)
- Shopping cart management
- Wishlist management
- Order management
- Admin dashboard endpoints
- JWT-based authentication
- MongoDB database with Mongoose ODM

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/social-login` - Social login (Google, GitHub)
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `DELETE /api/auth/logout` - Logout user (protected)

### Products

- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search/:query` - Search products

### Cart

- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add to cart (protected)
- `PUT /api/cart/:productId` - Update cart item (protected)
- `DELETE /api/cart/:productId` - Remove from cart (protected)

### Wishlist

- `GET /api/wishlist` - Get user wishlist (protected)
- `POST /api/wishlist` - Add to wishlist (protected)
- `DELETE /api/wishlist/:productId` - Remove from wishlist (protected)

### Orders

- `POST /api/orders` - Create new order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)

### Admin

- `GET /api/admin/products` - Get all products (admin)
- `POST /api/admin/products` - Create product (admin)
- `PUT /api/admin/products/:id` - Update product (admin)
- `DELETE /api/admin/products/:id` - Delete product (admin)
- `GET /api/admin/users` - Get all users (admin)
- `GET /api/admin/orders` - Get all orders (admin)
- `GET /api/admin/analytics` - Get analytics (admin)

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
node seed.js
```

5. Start the server:

```bash
node server.js
```

## Test Users

After running the seed script, you can use the following test credentials:

- Test User: `test@example.com` / `password123`
- Admin: `aaaa.ahshanhabib@gmail.com` / `admin123`

## Database Models

### User
- name, email, password
- role (user/admin)
- provider (local/google/github)
- photoURL
- cart, wishlist arrays

### Product
- name, description, price
- originalPrice, discount
- image, category
- rating, reviews
- inStock

### Order
- user, products array
- totalAmount
- shippingAddress
- status
- paymentStatus

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- CORS for cross-origin requests
- dotenv for environment variables

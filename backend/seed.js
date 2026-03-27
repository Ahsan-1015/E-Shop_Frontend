const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const products = [
  {
    name: "Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    category: "Electronics",
    rating: 4.8,
    reviews: 256,
    inStock: true,
    discount: 20,
  },
  {
    name: "Smart Watch",
    description:
      "Feature-rich smartwatch with health monitoring and GPS tracking.",
    price: 299.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    category: "Electronics",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    discount: 15,
  },
  {
    name: "Running Shoes",
    description:
      "Lightweight running shoes with superior cushioning and breathable material.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    category: "Sports",
    rating: 4.7,
    reviews: 312,
    inStock: true,
  },
  {
    name: "Backpack",
    description:
      "Durable backpack with multiple compartments and laptop sleeve.",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    category: "Accessories",
    rating: 4.5,
    reviews: 178,
    inStock: true,
    discount: 20,
  },
  {
    name: "Coffee Maker",
    description:
      "Programmable coffee maker with thermal carafe and auto-shutoff.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400",
    category: "Home",
    rating: 4.4,
    reviews: 145,
    inStock: true,
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat with extra cushioning for comfort.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
    category: "Sports",
    rating: 4.6,
    reviews: 234,
    inStock: true,
  },
  {
    name: "Desk Lamp",
    description:
      "LED desk lamp with adjustable brightness and color temperature.",
    price: 49.99,
    originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    category: "Home",
    rating: 4.3,
    reviews: 98,
    inStock: true,
    discount: 30,
  },
  {
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    category: "Electronics",
    rating: 4.7,
    reviews: 267,
    inStock: true,
  },
];

const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    // Insert products
    await Product.insertMany(products);

    // Create a test user
    await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    console.log("Data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();

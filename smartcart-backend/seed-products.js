const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./src/models/Product');
const User = require('./src/models/User');

const products = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 299.99,
    originalPrice: 399.99,
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    rating: 4.8,
    reviews: 324,
    inStock: true,
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '280g',
      'Noise Cancellation': 'Active'
    },
    tags: ['wireless', 'noise-cancelling', 'premium'],
    createdBy: '507f1f77bcf86cd799439001'
  },
  {
    _id: '507f1f77bcf86cd799439012',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery.',
    price: 249.99,
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    rating: 4.6,
    reviews: 156,
    inStock: true,
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery': '7 days',
      'Water Resistance': '5ATM',
      'GPS': 'Built-in'
    },
    tags: ['fitness', 'smartwatch', 'gps'],
    createdBy: '507f1f77bcf86cd799439001'
  },
  {
    _id: '507f1f77bcf86cd799439013',
    name: 'Designer Running Shoes',
    description: 'Lightweight running shoes with advanced cushioning and breathable mesh upper.',
    price: 129.99,
    originalPrice: 159.99,
    category: 'Fashion',
    images: ['https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    rating: 4.4,
    reviews: 89,
    inStock: true,
    specifications: {
      'Material': 'Mesh Upper',
      'Sole': 'Rubber',
      'Weight': '240g',
      'Cushioning': 'EVA Foam'
    },
    tags: ['running', 'lightweight', 'breathable'],
    createdBy: '507f1f77bcf86cd799439001'
  },
  {
    _id: '507f1f77bcf86cd799439014',
    name: 'Ergonomic Office Chair',
    description: 'Premium office chair with lumbar support, adjustable height, and breathable fabric.',
    price: 399.99,
    category: 'Home & Garden',
    images: ['https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    rating: 4.7,
    reviews: 203,
    inStock: true,
    specifications: {
      'Material': 'Mesh & Fabric',
      'Adjustability': 'Height, Arms, Lumbar',
      'Weight Capacity': '300 lbs',
      'Warranty': '5 years'
    },
    tags: ['office', 'ergonomic', 'adjustable'],
    createdBy: '507f1f77bcf86cd799439001'
  },
  {
    _id: '507f1f77bcf86cd799439015',
    name: 'Professional Tennis Racket',
    description: 'High-performance tennis racket used by professionals, with carbon fiber construction.',
    price: 199.99,
    category: 'Sports',
    images: ['https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    rating: 4.5,
    reviews: 67,
    inStock: true,
    specifications: {
      'Weight': '300g',
      'Length': '27 inches',
      'String Pattern': '16x19',
      'Material': 'Carbon Fiber'
    },
    tags: ['tennis', 'professional', 'carbon-fiber'],
    createdBy: '507f1f77bcf86cd799439001'
  },
  {
    _id: '507f1f77bcf86cd799439016',
    name: 'Modern LED Desk Lamp',
    description: 'Adjustable LED desk lamp with touch controls, USB charging port, and eye protection.',
    price: 79.99,
    category: 'Home & Garden',
    images: ['https://images.pexels.com/photos/1749900/pexels-photo-1749900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    rating: 4.3,
    reviews: 142,
    inStock: true,
    specifications: {
      'Power': '12W LED',
      'Brightness Levels': '5',
      'Color Temperature': '3000K-6500K',
      'USB Port': 'Yes'
    },
    tags: ['led', 'adjustable', 'usb-charging'],
    createdBy: '507f1f77bcf86cd799439001'
  },
  {
    _id: '507f1f77bcf86cd799439017',
    name: 'Premium Skincare Set',
    description: 'Complete skincare routine with vitamin C serum, moisturizer, and SPF protection.',
    price: 89.99,
    originalPrice: 120.00,
    category: 'Health & Beauty',
    images: ['https://images.pexels.com/photos/3685548/pexels-photo-3685548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    rating: 4.6,
    reviews: 234,
    inStock: true,
    specifications: {
      'Set Includes': '4 products',
      'Skin Type': 'All types',
      'Key Ingredients': 'Vitamin C, Hyaluronic Acid',
      'Cruelty Free': 'Yes'
    },
    tags: ['skincare', 'vitamin-c', 'anti-aging'],
    createdBy: '507f1f77bcf86cd799439001'
  },
  {
    _id: '507f1f77bcf86cd799439018',
    name: 'Educational Robot Kit',
    description: 'STEM learning robot kit for kids with programmable features and sensors.',
    price: 149.99,
    category: 'Toys',
    images: ['https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    rating: 4.8,
    reviews: 98,
    inStock: false,
    specifications: {
      'Age Range': '8-14 years',
      'Programming': 'Block-based',
      'Sensors': 'Ultrasonic, Light, Touch',
      'Battery': 'Rechargeable'
    },
    tags: ['stem', 'educational', 'programmable'],
    createdBy: '507f1f77bcf86cd799439001'
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
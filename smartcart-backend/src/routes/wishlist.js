const express = require('express');
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Get user's wishlist
router.get('/', protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('items.productId');
    if (!wishlist) {
      return res.json({ success: true, data: { items: [] } });
    }
    
    // Transform the data to match frontend expectations
    const transformedItems = wishlist.items.map(item => {
      const product = item.productId;
      if (!product) return null;
      
      return {
        id: product._id.toString(),
        _id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category,
        image: product.images?.[0] || '',
        images: product.images || [],
        rating: product.rating,
        reviews: product.reviews,
        inStock: product.inStock,
        specifications: product.specifications,
        tags: product.tags
      };
    }).filter(product => product);
    
    res.json({ success: true, data: { items: transformedItems } });
  } catch (error) {

    res.status(500).json({ success: false, error: error.message });
  }
});

// Add item to wishlist
router.post('/add/:productId', protect, async (req, res) => {
  try {
    const { productId } = req.params;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ userId: req.user.id });
    
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user.id, items: [] });
    }

    const existingItem = wishlist.items.find(item => 
      item.productId.toString() === productId
    );

    if (existingItem) {
      return res.status(400).json({ success: false, error: 'Item already in wishlist' });
    }

    wishlist.items.push({ productId });
    await wishlist.save();
    await wishlist.populate('items.productId');
    
    const transformedItems = wishlist.items.map(item => {
      const product = item.productId;
      if (!product) return null;
      
      return {
        id: product._id.toString(),
        _id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category,
        image: product.images?.[0] || '',
        images: product.images || [],
        rating: product.rating,
        reviews: product.reviews,
        inStock: product.inStock,
        specifications: product.specifications,
        tags: product.tags
      };
    }).filter(product => product);
    
    res.json({ success: true, data: { items: transformedItems }, message: 'Item added to wishlist' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Remove item from wishlist
router.delete('/remove/:productId', protect, async (req, res) => {
  try {
    const { productId } = req.params;
    
    const wishlist = await Wishlist.findOne({ userId: req.user.id });
    if (!wishlist) {
      return res.status(404).json({ success: false, error: 'Wishlist not found' });
    }

    wishlist.items = wishlist.items.filter(item => 
      item.productId.toString() !== productId
    );
    
    await wishlist.save();
    await wishlist.populate('items.productId');
    
    const transformedItems = wishlist.items.map(item => {
      const product = item.productId;
      if (!product) return null;
      
      return {
        id: product._id.toString(),
        _id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category,
        image: product.images?.[0] || '',
        images: product.images || [],
        rating: product.rating,
        reviews: product.reviews,
        inStock: product.inStock,
        specifications: product.specifications,
        tags: product.tags
      };
    }).filter(product => product);
    
    res.json({ success: true, data: { items: transformedItems }, message: 'Item removed from wishlist' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Clear wishlist
router.delete('/clear', protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.id });
    if (wishlist) {
      wishlist.items = [];
      await wishlist.save();
    }
    
    res.json({ success: true, message: 'Wishlist cleared' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
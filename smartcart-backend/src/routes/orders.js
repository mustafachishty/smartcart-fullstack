const express = require('express');
const { protect } = require('../middleware/auth');
const Cart = require('../models/Cart');
const emailService = require('../services/emailService');
const router = express.Router();

// Create order from cart
router.post('/create', protect, async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, error: 'Cart is empty' });
    }

    // Generate order ID
    const orderId = 'ORD' + Date.now();
    
    // Send order confirmation email
    try {
      await emailService.sendOrderConfirmation(req.user.email, req.user.name, {
        orderId,
        totalAmount: cart.totalAmount.toFixed(2),
        itemCount: cart.items.length
      });
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
    }

    // Clear cart after order
    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      data: {
        orderId,
        totalAmount: cart.totalAmount,
        status: 'confirmed'
      },
      message: 'Order placed successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
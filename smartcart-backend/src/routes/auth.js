const express = require('express');
const { register, login, getMe, forgotPassword, resetPassword, deleteAccount } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.delete('/delete-account', protect, deleteAccount);

module.exports = router;
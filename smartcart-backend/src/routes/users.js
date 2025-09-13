const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  res.json({ success: true, message: 'User profile endpoint - Coming soon!' });
});

router.put('/profile', (req, res) => {
  res.json({ success: true, message: 'Update profile endpoint - Coming soon!' });
});

module.exports = router;
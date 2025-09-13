const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Get products endpoint - Coming soon!' });
});

router.get('/:id', (req, res) => {
  res.json({ success: true, message: 'Get single product endpoint - Coming soon!' });
});

router.post('/', (req, res) => {
  res.json({ success: true, message: 'Create product endpoint - Coming soon!' });
});

module.exports = router;
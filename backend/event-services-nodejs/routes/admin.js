const express = require('express');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Admin-only route
router.get('/dashboard', authenticate, authorizeAdmin, (req, res) => {
    res.json({ message: "Welcome, Admin!" });
});

module.exports = router;

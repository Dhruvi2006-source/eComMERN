const express = require('express');
const router = express.Router();
const User = require('../model/User'); // Adjust path if needed

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signup failed' });
  }
});

module.exports = router;

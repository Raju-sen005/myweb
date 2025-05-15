const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // import model

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save(); // save to MongoDB
    res.status(200).json({ message: 'Message received and saved successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/authMiddleware');
const allowRole = require('../middleware/roleMiddleware');

// Add book (admin only)
router.post('/', auth, allowRole('admin'), async (req, res) => {
  const { title, author, description } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });
  try {
    const book = new Book({
      title,
      author,
      description,
      createdBy: req.user._id
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get all books (public for logged-in users; we can also allow public access if desired)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('createdBy', 'name email role');
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

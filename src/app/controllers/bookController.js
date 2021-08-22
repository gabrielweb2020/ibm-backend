const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Book = require('../models/Book');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const books = await Book.find().sort({title: 1});

        return res.send({ books });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading books!' });
    }
});

router.get('/:bookId', async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);

        return res.send({ book });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading book!' });
    }
});

router.post('/', async (req, res) => {
    try {
        const book = await Book.create({ ...req.body });

        return res.send({ book });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new book!' });
    }
});

router.put('/:bookId', async (req, res) => {
    try {
        const { title, description, author, stock } = req.body;

        const book = await Book.findByIdAndUpdate(req.params.bookId, { 
            title, 
            description,
            author,
            stock 
        }, { new: true });

        await book.save();

        return res.send({ book });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating book!' });
    }
});

router.delete('/:bookId', async (req, res) => {
    try {
        await Book.findByIdAndRemove(req.params.bookId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting book!' });
    }
});

module.exports = app => app.use('/books', router);
const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const BookSchema = new mongoose.Schema({
    srn: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    stock: {
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;


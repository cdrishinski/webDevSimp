const express = require('express')
const router = express.Router()
const Book = require('../models/book')

//All Books Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if(req.query.name !== null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try {
        const books = await Book.find(searchOptions)
        res.render('books/index', { 
            books: books, 
            searchOptions: req.query 
        })
    } catch (error) {
        res.redirect('/')
    }
})

//New Books Route
router.get('/new', (req, res) => {
    res.render('books/new', { book: new Book() })

})

// Create Books Route
router.post('/', async (req, res) => {
    book = new Book({
        title: req.body.title
    })
    try {
        const newBook = await book.save()
        // res.redirect(`/authors/$(newAuthor.id)`)
        res.redirect('books')
    } catch {
        res.render('books/new', {
            book: book,
            errorMessage: 'Error creating book'
        })
    }
})

module.exports = router
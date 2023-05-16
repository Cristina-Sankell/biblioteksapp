const bookModel = require('../models/bookModel')
const db_context = require('../db_context')

async function getAllBooks() {
    let books = []
    let data = await db_context.getAllBooks()

    data.forEach((book) => {
        books.push(
            new bookModel(
                book.book_id,
                book.title,
                book.author,
                book.year,
                book.availability
            )
        )
    })

    return books
}

async function getBookByKeyword(keyword) {
    let books = []
    let data = await db_context.selectBookByKeyword(keyword)

    data.forEach((book) => {
        books.push(
            new bookModel(book.book_id, book.title, book.author, book.year)
        )
    })

    return books
}

async function addBook(title, author, year) {
    db_context.insertBook(title, author, year)
}

async function editBook(bookId, title, author, year) {
    db_context.updateBook(bookId, title, author, year)
}

async function deleteBook(bookId) {
    db_context.deleteBook(bookId)
}

module.exports = {
    getAllBooks,
    getBookByKeyword,
    addBook,
    editBook,
    deleteBook
}

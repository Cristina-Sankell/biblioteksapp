const pgp = require('pg-promise')()
require('dotenv').config()
const connection = `postgres://postgres:${process.env.PG_PASSWORD}@localhost:5432/mydatabase`
const db = pgp(connection)

async function getAllBooks() {
    let data = await db.any(`SELECT * FROM book`)
    return data
}

async function selectBookByKeyword(keyword) {
    let data = await db.any(
        `SELECT * FROM book WHERE title LIKE '%${keyword}%' OR author LIKE '%${keyword}%'`
    )
    return data
}

async function insertBook(title, author, year) {
    db.none(`INSERT INTO book (title, author, year, availability)
           VALUES ('${title}', '${author}', '${year}', true)`)
}

async function updateBook(bookId, title, author, year) {
    await db.none(
        `UPDATE book SET title = '${title}', author = '${author}', year = '${year}' WHERE book_id = ${bookId}`
    )
}

async function deleteBook(bookId) {
    await db.none(`DELETE FROM book WHERE book_id = ${bookId}`)
}

module.exports = {
    getAllBooks,
    selectBookByKeyword,
    insertBook,
    updateBook,
    deleteBook
}

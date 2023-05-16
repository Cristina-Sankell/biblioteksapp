const {
    getAllBooks,
    addBook,
    getBookByKeyword,
    editBook,
    deleteBook
} = require('../repositories/bookRepository')

async function getAll(req, res) {
    let data = await getAllBooks(req)
    return res.json(data)
}

async function search(req, res) {
    let data = await getBookByKeyword(req.query.keyword)
    return res.json(data)
}

async function add(req, res) {
    await addBook(req.body.title, req.body.author, req.body.year)
}

async function edit(req, res) {
    await editBook(
        req.body.bookId,
        req.body.title,
        req.body.author,
        req.body.year
    )
}

async function remove(req, res) {
    await deleteBook(req.body.bookId)
}

module.exports = {
    getAll,
    search,
    add,
    edit,
    remove
}

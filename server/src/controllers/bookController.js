const {searchBook,searchBooks,searchBooksOnTitle} = require('../services/bookService')

const getBooks = async (req, res, next) => {
    try{
        const books = await searchBooks()

        res.status(200).json(books);
    }catch(error){
        next(error)
    }
}

const getBook = async(req,res,next) => {
    try{
        const {id} = req.params;

        const book = await searchBook(id)

        res.status(200).json(book);
    }catch(error){
        next(error)
    }
}

const getBooksByTitle = async(req,res,next) => {
    try{
        const {title} = req.query;
        const books = await searchBooksOnTitle(title)
        res.status(200).json(books);
    }catch(error){
        next(error)
    }
}

module.exports = {
    getBooks,
    getBook,
    getBooksByTitle
}
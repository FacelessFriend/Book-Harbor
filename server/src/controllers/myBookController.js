const {searchBooks,createBook,updateUserBook,deleteUsersBook} = require('../services/myBookService')

const getUserBook = async (req, res, next) => {
    try{
        const {id} = req.params;

        const books = await searchBooks(id)

        res.status(200).json(books)
    }catch(error){
        next(error)
    }
}

const postBook = async (req,res,next) => {
    try{
        const newBook = req.body

        const book = await createBook(newBook)

        res.status(201).json(book)
    }catch(error){
        next(error)
    }
}

const updateBook = async (req,res,next) => {
    try{
        const { id } = req.params;
        const newBook = req.body

        const book = await updateUserBook(id, newBook)

        res.status(201).json(book)
    }catch(error){
        next(error)
    }
}

const deleteBook = async (req,res,next) => {
    try{
        const { id } = req.params;

        const del = await deleteUsersBook(id);

        res.status(200).json(del);
    }catch(error){
        next(error)
    }
}

module.exports ={
    getUserBook,
    postBook,
    updateBook,
    deleteBook
}
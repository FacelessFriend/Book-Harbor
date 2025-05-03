const {serchBooksOnLike,placeLike,delLike} = require('../services/likeService')

const getUsersLike = async (req,res,next) => {
    try{
        const {id} = req.params;

        const book = await serchBooksOnLike(id)

        res.status(200).json(book)
    }catch(error){
        next(error)
    }
}

const postLike = async (req,res,next) => {
    try{
        const ids = req.body

        const like = await placeLike(ids)

        res.status(201).json(like)
    }catch(error){
        next(error)
    }
}

const deleteLike = async (req,res,next) => {
    try{
        const ids = req.body

        const del = await delLike(ids)

        res.status(200).json(del)
    }catch(error){
        next(error)
    }
}

module.exports = {getUsersLike,postLike,deleteLike}
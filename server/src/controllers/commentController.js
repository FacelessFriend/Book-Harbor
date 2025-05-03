const {leaveComment,updateUserComment,deleteUserComment} = require('../services/commentService')

const postComment = async (req,res,next) => {
    try{
        const newComment = req.body

        const comment = await leaveComment(newComment)

        res.status(201).json(comment)
    }catch(error){
        next(error)
    }
}

const updateComment = async (req,res,next) => {
    try{
        const {id} = req.params
        const newComment = req.body

        const comment = await updateUserComment(newComment,id)

        res.status(201).json(comment)
    }catch(error){
        next(error)
    }
}

const deleteComment = async (req,res,next) => {
    try{
        const {id} = req.params

        const del = await deleteUserComment(id)

        res.status(200).json(del)
    }catch(error){
        next(error)
    }
}

module.exports = {postComment,updateComment,deleteComment}
const router = require("express").Router();
const {postComment,updateComment,deleteComment} = require('../../controllers/commentController')
const authMiddleware = require("../../middlewares/authMiddleware");

router.post('/',authMiddleware, postComment)
router.put('/:id',authMiddleware, updateComment)
router.delete('/:id',authMiddleware, deleteComment)

module.exports = router;
const router = require("express").Router();
const {getUserBook,postBook,updateBook,deleteBook} = require('../../controllers/myBookController')
const authMiddleware = require("../../middlewares/authMiddleware");

router.get('/:id',authMiddleware, getUserBook)//добавить authMiddleware
router.post('/',authMiddleware, postBook)//добавить authMiddleware
router.put('/:id',authMiddleware, updateBook)//добавить authMiddleware
router.delete('/:id',authMiddleware, deleteBook)//добавить authMiddleware

module.exports = router;
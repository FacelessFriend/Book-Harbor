const router = require("express").Router();
const {getBooks,getBook, getBooksByTitle} = require('../../controllers/bookController')
const authMiddleware = require("../../middlewares/authMiddleware");

router.get('/', getBooks)
router.get('/search',authMiddleware, getBooksByTitle)
router.get('/:id',authMiddleware, getBook)

module.exports = router;
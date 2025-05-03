const router = require("express").Router();
const {getUsersLike,postLike,deleteLike} = require('../../controllers/likeController')
const authMiddleware = require("../../middlewares/authMiddleware");

router.get('/:id',authMiddleware, getUsersLike)
router.post('/',authMiddleware,postLike)
router.delete('/',authMiddleware, deleteLike)

module.exports = router;
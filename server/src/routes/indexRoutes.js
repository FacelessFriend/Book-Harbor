const router = require("express").Router();//для использования роутов

const registrationRouter = require('./api/userApi/registrationRouter')//импортируем все роуты
const loginRouter = require('./api/userApi/loginRouter')
const logoutRouter = require('./api/userApi/logoutRouter')
const refreshRouter = require('./api/userApi/refreshRouter');

const bookRouter = require('./api/bookRouter')
const mybookRouter = require('./api/mybookRouter')
const likeRouter = require('./api/likeRouter')
const commentRouter = require('./api/commentRouter')

router.use("/registration", registrationRouter)
router.use("/login", loginRouter)
router.use("/logout", logoutRouter)
router.use("/refresh", refreshRouter)

router.use("/book", bookRouter)
router.use("/mybook", mybookRouter)
router.use("/like", likeRouter)
router.use("/comment", commentRouter)

module.exports = router;
// {
//     "title": "book",
//     "description": "description description",
//     "opinion": "opinion opinion opinion",
//     "link": "http",
//     "user_id": 1
// }
// {
//     "name": "test",
//     "email": "test3@test.com",
//     "password": "test"
//   }
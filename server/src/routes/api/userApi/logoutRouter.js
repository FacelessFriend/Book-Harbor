const router = require("express").Router();
const {logout} = require("../../../controllers/userController/logoutController")

router.post('/', logout);

module.exports = router;
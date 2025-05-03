const router = require("express").Router();
const {login} = require("../../../controllers/userController/loginController")

router.post('/', login);

module.exports = router;
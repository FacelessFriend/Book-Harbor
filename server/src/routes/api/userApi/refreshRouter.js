const router = require("express").Router();
const {refresh} = require("../../../controllers/userController/refreshController")

router.get('/', refresh);

module.exports = router;
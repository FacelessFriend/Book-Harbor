const router = require("express").Router();
const {registration} = require("../../../controllers/userController/registrationController")

router.post('/', registration);

module.exports = router;
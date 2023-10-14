const experss = require('express');
const router = experss.Router();
const authController = require('../Controllers/AuthController')

router.post('/',authController.handleLogin);

module.exports = router;
const experss = require('express');
const router = experss.Router();
const LogoutController = require('../Controllers/LogoutController')

router.get('/',LogoutController.handleLogout);

module.exports = router;
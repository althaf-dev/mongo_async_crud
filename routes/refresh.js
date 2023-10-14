const experss = require('express');
const router = experss.Router();
const refreshController = require('../Controllers/RefreshController')

router.get('/',refreshController.handleRefreshToken);

module.exports = router;
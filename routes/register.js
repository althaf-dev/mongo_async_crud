const express = require('express');
const router = express.Router();

const RegisterController = require('../Controllers/RegisterController');

router.post('/',RegisterController.handleNewUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const {checkAuthorization} = require('../middlewares/checkAuthorization');
const {checkAuth} = require('../middlewares/authentication');
const {getAllTasks} = require('../controllers/adminController');

router.get('/', checkAuth, checkAuthorization, getAllTasks);

module.exports = router;
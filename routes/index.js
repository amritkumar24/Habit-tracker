const express = require('express');

// Creates a new router object using Express.js, which is used to define and organize routes.
const router = express.Router();
const firstPageController = require("../controller/firstPageController");

router.get('/', firstPageController.firstPage);
router.use('/main', require('./mainRoutes'));

module.exports = router;
const express = require('express');

// Creates a new router object using Express.js, which is used to define and organize routes.
const router = express.Router();
const firstPageAction = require("../controller/firstPageAction");

router.get('/', firstPageAction.firstPage);
router.use('/main', require('./mainRoutes'));

module.exports = router;
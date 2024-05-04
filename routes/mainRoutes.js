const express = require('express');
const router = express.Router();
const mainPageController = require('../controller/mainPageController');
const weekViewController = require('../controller/weekViewController.js'); 

router.get('/dayView', mainPageController.main);
router.post('/createHabit', mainPageController.create);
router.get('/deleteHabit/:id', mainPageController.delete);
router.get('/toggleStatus', mainPageController.toggleStatus);

router.get('/weekView', weekViewController.weekView );
router.get('/weekView/toggleStatus', weekViewController.toggleStatus);



module.exports = router;
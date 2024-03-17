const express = require('express');
const router = express.Router();
const mainPageController = require('../controller/mainPageController'); 

router.get('/dayView', mainPageController.main);
router.post('/createHabit', mainPageController.create);
router.get('/deleteHabit/:id', mainPageController.delete);
router.get('/toggleStatus', mainPageController.toggleStatus);



module.exports = router;
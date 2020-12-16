const express = require('express');
const hospitalController = require('../controllers/hospitalController');

const router = express.Router();

router.get('/viable', hospitalController.get_viable_hospitals);

module.exports = router;
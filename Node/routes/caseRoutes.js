const express = require('express');
const caseController = require('../controllers/caseController')

const router = express.Router();

module.exports = router;

router.post('/', caseController.case_post);

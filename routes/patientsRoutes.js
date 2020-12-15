const express = require('express');
const patientController = require('../controllers/patientController')

const router = express.Router();

module.exports = router;

router.get('/', patientController.patient_index_get);

router.get('/:id', patientController.patient_info_get);

router.post('/', patientController.patient_index_post);

router.delete('/:id', patientController.patient_index_delete);

router.put('/:id', patientController.patient_index_put);
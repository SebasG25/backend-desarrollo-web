const express = require('express');

const router = express.Router();

const _personaController = require('../controllers/personas/personas.controller');
const _reporteController = require('../controllers/reportes/reportes.controller');

router
  .get('/personas', _personaController.getPersonas)
  .post('/personas', _personaController.createPersona)
  .post('/reportes', _reporteController.createReporte)
  .put('/personas', _personaController.updatePersona)
  .delete('/personas', _personaController.deletePersona);
module.exports = router;
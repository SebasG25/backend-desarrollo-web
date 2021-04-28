const express = require('express');

const router = express.Router();

const _personaController = require('../controllers/personas/personas.controller');
const _reporteController = require('../controllers/reportes/reportes.controller');

router
  .get('/personas', _personaController.getPersonas)
  .get('/personas/:id', _personaController.getPersona)
  .post('/personas', _personaController.createPersona)
  .put('/personas/:id', _personaController.updatePersona)
  .delete('/personas/:id', _personaController.deletePersona)

  .post('/reportes', _reporteController.createReporte)
  .post('/send-email', _reporteController.enviarCorreo);

module.exports = router;
const express = require('express');

const router = express.Router();

const _personaController = require('../controllers/personas.controller');

router
  .get('/personas', _personaController.getPersonas)
  .get('/reporte-personas', _personaController.getReportePersonas)
  .get('/personas/:id', _personaController.getPersona)
  .post('/personas', _personaController.createPersona)
  .put('/personas/:id', _personaController.updatePersona)
  .delete('/personas/:id', _personaController.deletePersona);

module.exports = router;
const express = require('express');

const router = express.Router();

router.get('/usuarios', (req, res) => {
    res.send('¡Hola mundo desde routers!');
  });

module.exports = router;
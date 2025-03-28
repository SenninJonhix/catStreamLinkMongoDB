const express = require('express')
const router = express.Router()
const controlador = require("../controlador/controlador")

router.get('/', controlador.log_lista);
router.get('');
router.post('');
router.post('');
router.delete('');
router.delete('');

module.exports = router;
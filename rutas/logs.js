const express = require('express');
const router = express.Router();
const controlador = require("../controlador/controlador");

router.get('/', controlador.control_lista);        
router.get('/:id', controlador.control_detalle);    
router.post('/', controlador.control_crear);        
router.put('/:id', controlador.control_actualizar);
router.delete('/:id', controlador.control_eliminar); 

module.exports = router;
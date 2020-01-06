var express = require('express')
var router = express.Router()

var rkbuController = require('../controllers/rkbuController')

router.get('/', rkbuController.getAll)
router.get('/:divisi', rkbuController.getDivisi)
router.post('/', rkbuController.postRKBU)
router.put('/:id', rkbuController.putRKBU)
router.delete('/:id', rkbuController.delRKBU)
router.put('/otor/:id', rkbuController.otorRKBU)

module.exports = router

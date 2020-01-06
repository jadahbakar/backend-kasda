var express = require('express')
var router = express.Router()

var bangrenController = require('../controllers/bangrenController')

router.get('/', bangrenController.getAll)
router.get('/:divisi', bangrenController.getDivisi)
router.post('/', bangrenController.postBangRen)
router.put('/:id', bangrenController.putBangRen)
router.delete('/:id', bangrenController.delBangRen)

module.exports = router

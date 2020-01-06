var express = require('express')
var router = express.Router()

var pabController = require('../controllers/pabController')

router.get('/', pabController.getAll)
router.get('/:rkfId', pabController.getPAB)
router.post('/', pabController.postPAB)
router.put('/:rkfId', pabController.putPAB)
router.delete('/:rkfId', pabController.delPAB)

module.exports = router

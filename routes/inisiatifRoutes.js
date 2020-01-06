var express = require('express')
var router = express.Router()

var inisiatifController = require('../controllers/inisiatifController')

router.get('/', inisiatifController.getAll)
router.get('/:masterId', inisiatifController.getMaster)
router.get('/detail/:inisiatifId', inisiatifController.getDetail)

// Detail------------------------------------------------------------------------

module.exports = router

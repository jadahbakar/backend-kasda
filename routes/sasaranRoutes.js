var express = require('express')
var router = express.Router()

var sasaranController = require('../controllers/sasaranController')

router.get('/', sasaranController.getAll)
router.get('/:masterId', sasaranController.getMaster)
router.get('/detail/:sasaranId', sasaranController.getDetail)

module.exports = router

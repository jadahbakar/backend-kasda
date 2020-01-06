var express = require('express')
var router = express.Router()

var notifController = require('../controllers/notifController')

router.get('/:divisiId/:tahun', notifController.getNotif)
router.get('/sum/:divisiId/:tahun', notifController.getSumNotif)

module.exports = router

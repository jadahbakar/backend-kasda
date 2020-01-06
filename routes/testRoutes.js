var express = require('express')
var router = express.Router()

var testController = require('../controllers/testController')

// const wrap = require("../middleware/wrap");

router.get('/', testController.getTest)
router.get('/async', testController.getAsync)

module.exports = router

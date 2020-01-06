var express = require('express')
var router = express.Router()

var Login = require('../controllers/loginController')

// router.post('/', Login.postLogin)
router.get('/:userId', Login.getLogin)
router.get('/divisi/all', Login.getAllDivisi)
router.get('/divisi/:id', Login.getDivisi)

router.get('/subdiv/all', Login.getAllSubDivisi)
router.get('/subdiv/:id', Login.getSubDivisi)
router.get('/subdivpegawai/:id', Login.getPegawaiPerSubdiv)
router.get('/divpegawai/:id', Login.getPegawaiPerDiv)

// router.get("/:username", Login.getLoginSDM);

module.exports = router

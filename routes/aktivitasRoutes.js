var express = require('express')
var router = express.Router()

var aktivitasController = require('../controllers/aktivitasController')

router.get('/:prokerId', aktivitasController.getAktivitasProkerId)
router.post('/', aktivitasController.postAktivitas)
router.put('/:aktivitasId', aktivitasController.putAktivitas)
router.delete('/:aktivitasId', aktivitasController.delAktivitas)
router.put('/otor/:prokerId', aktivitasController.otorAktivitas)
router.put('/lapor/:aktivitasId', aktivitasController.putAktivitasLapor)
router.post('/attach/:aktivitasId', aktivitasController.postAttach)
router.get('/attach/:aktivitasId', aktivitasController.getAttach)

router.post('/attach2/:aktivitasId', aktivitasController.postAttach2)

router.get('/docupload/all', aktivitasController.getUploadAll)
router.get('/docupload/:aktivitasId', aktivitasController.getUploadDocument)
router.post('/docupload', aktivitasController.postUploadDocument)
router.put('/docupload/:aktivitasId', aktivitasController.putUploadDocument)
router.delete('/docupload/:aktivitasId', aktivitasController.delUploadDocument)

module.exports = router

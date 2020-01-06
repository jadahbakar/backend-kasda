var express = require('express')
var router = express.Router()

var aktivitasController = require('../controllers/aktivitasController')

router.get('/:prokerId', aktivitasController.getAktivitasProkerId)
router.post('/', aktivitasController.postAktivitas)
router.put('/:aktivitasId', aktivitasController.putAktivitas)
router.delete('/:aktivitasId', aktivitasController.delAktivitas)

// Detail-------------------------------------------------------------------------------------------

router.get('/detail/:aktivitasId', aktivitasController.getAktivitasDetailId)
router.get(
  '/detail/last/:aktivitasId',
  aktivitasController.getLastAktivitasDetail
)
router.post('/detail/:aktivitasId', aktivitasController.postAktivitasDetail)
router.put('/detail/:detailId', aktivitasController.putAktivitasDetail)
router.delete('/detail/:detailId', aktivitasController.delAktivitasDetail)
router.put('/detail/otor/:detailId', aktivitasController.otorAktivitasDetail)

module.exports = router

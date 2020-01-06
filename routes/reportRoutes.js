var express = require('express')
var router = express.Router()

var reportContorller = require('../controllers/reportContorller')
// var middleware = require('../middleware/middleware')

router.get('/kud/:divisi/:tahun/:jenis', reportContorller.getKUD)
router.get('/kud/:tahun/:jenis', reportContorller.getAdminKUD)
router.get('/isu/:divisi/:tahun/:jenis', reportContorller.getIsu)
router.get('/isu/:tahun/:jenis', reportContorller.getAdminIsu)

router.get(
  '/transformasi/:divisi/:tahun/:jenis',
  reportContorller.getTransformasiBPD
)
router.get(
  '/transformasi/:tahun/:jenis',
  reportContorller.getAdminTransformasiBPD
)
router.get('/rakb/:divisi/:tahun/:jenis', reportContorller.getRAKB)
router.get('/rakb/:tahun/:jenis', reportContorller.getAdminRAKB)
router.get('/audit/:divisi/:tahun/:jenis', reportContorller.getAudit)
router.get('/audit/:tahun/:jenis', reportContorller.getAdminAudit)

router.get('/laporanrkf/:tahun/:jenis', reportContorller.getLaporanRKF)

router.get('/katproker/:tahun/:jenis', reportContorller.getAdminKatProker)

module.exports = router

var express = require('express')
var router = express.Router()

var dashboardController = require('../controllers/adminController')

router.get('/totalrkf/:tahun', dashboardController.dashboardTotalRKF)
router.get('/quickwin/:tahun', dashboardController.dashboardQuickWin)
router.get(
  '/totalaktivitas/:tahun',
  dashboardController.dashboardTotalAktivitas
)
router.get('/persebaran/:tahun', dashboardController.dashboardPersebaran)
router.get(
  '/penyelesaianrkf/:tahun',
  dashboardController.dashboardPenyelesaianRKF
)

router.get(
  '/penyelesaianaktivitas/:tahun',
  dashboardController.dashboardPenyelesaianAktivitas
)

router.get('/monitoring/:tahun', dashboardController.dashboardMonitoring)
router.get(
  '/detailaktivitas/:tahun/:bulan',
  dashboardController.dashboardDetailAktivitas
)
module.exports = router

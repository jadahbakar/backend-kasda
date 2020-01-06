var express = require('express')
var router = express.Router()

var dashboardController = require('../controllers/dashboardController')

router.get('/totalrkf/:divisiId/:tahun', dashboardController.dashboardTotalRKF)
router.get('/quickwin/:divisiId/:tahun', dashboardController.dashboardQuickWin)

router.get(
  '/totalaktivitas/:divisiId/:tahun',
  dashboardController.dashboardTotalAktivitas
)
router.get(
  '/persebaran/:divisiId/:tahun',
  dashboardController.dashboardPersebaran
)
router.get(
  '/penyelesaianrkf/:divisiId/:tahun',
  dashboardController.dashboardPenyelesaianRKF
)
router.get(
  '/penyelesaianaktivitas/:divisiId/:tahun',
  dashboardController.dashboardPenyelesaianAktivitas
)

router.get(
  '/monitoring/:divisiId/:tahun',
  dashboardController.dashboardMonitoring
)
router.get(
  '/detailaktivitas/:divisiId/:tahun/:bulan',
  dashboardController.dashboardDetailAktivitas
)

module.exports = router

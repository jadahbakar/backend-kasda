var express = require('express')
var router = express.Router()

var rkfController = require('../controllers/rkfController')
// var middleware = require("../middleware/middleware");
// var middleware = require("../middlewares");
// router.get("*", middleware.verifyJWT_MW);
// router.post("*", middleware.verifyJWT_MW);

router.post('/', rkfController.postRKF)
router.post('/update', rkfController.updateRKF)
router.put('/', rkfController.updateRKF)
router.post('/otorkf', rkfController.postOtoRKF)
router.get('/:divisi/:tahun/:jenis', rkfController.getRKF)
router.get('/rkfdetail', rkfController.getRKFDetail)
router.get('/report/:divisi/:tahun/:jenis', rkfController.getReport)
router.get('/report/:tahun/:jenis', rkfController.getReportAll)

router.post('/gantijenis', rkfController.postRKFGantiJenis)

router.get('/sumdetail/:divisi/:tahun/:jenis', rkfController.getRKFSumDetail)
router.get('/sumperdiv/:tahun/:jenis', rkfController.getRKFGroupAll)
router.get('/sumall/:tahun/:jenis', rkfController.getRKFSumAll)

router.post('/awal/', rkfController.postAwal)
router.delete('/:id', rkfController.delRKF)

router.post('/supportv1', rkfController.postSupportRKFv1)
router.post('/support', rkfController.postSupportRKF)
router.get('/support/:divisi', rkfController.getSupportRKF)

router.post('/temporary', rkfController.postSupportTempRKF)
router.delete('/temporary/:id', rkfController.delSupportTempRKF)
router.get('/temporary/:id', rkfController.getSupportTempRKF)
router.put('/temporary/:id', rkfController.putSupportTempRKF)

module.exports = router

var express = require('express')
var router = express.Router()

var masterController = require('../controllers/masterController')

var middleware = require('../middleware/middleware')
// var middleware = require("../middlewares");
// router.get("*", middleware.verifyJWT_MW);
// router.post("*", middleware.verifyJWT_MW);

router.get('/all', masterController.getAllMaster)
router.get('/visimisi', masterController.getVisiMisi)
router.get('/cpkud/:tahun', masterController.getCPKUD)
// router.get('/coreplan', masterController.getCorePlan);
// router.post('/coreplan', masterController.postCorePlan);
// router.put('/coreplan/:cpId', masterController.putCorePlan);
// router.delete('/coreplan/:cpId', masterController.delCorePlan);

router.get('/kud', masterController.getKUD)
router.get('/kud/:kudId', masterController.getKUDOne)
router.post('/kud', masterController.postKUD)
router.put('/kud/:kudId', masterController.putKUD)
router.delete('/kud/:kudId', masterController.delKUD)

router.get('/stsprokerall', masterController.getStsProKerAll)
router.get('/stsproker', masterController.getStsProKer)
router.post('/stsproker', masterController.postStsProKer)
router.put('/stsproker/:spId', masterController.putStsProKer)
router.delete('/stsproker/:spId', masterController.delStsProKer)

router.get('/skalaprokerall', masterController.getSkalaProKerAll)
router.get('/skalaproker', masterController.getSkalaProKer)
router.post('/skalaproker', masterController.postSkalaProKer)
router.put('/skalaproker/:spId', masterController.putSkalaProKer)
router.delete('/skalaproker/:spId', masterController.delSkalaProKer)

router.get('/katprokerall', masterController.getKatProKerAll)
router.get('/katproker', masterController.getKatProKer)
router.post('/katproker', masterController.postKatProKer)
router.put('/katproker/:kpId', masterController.putKatProKer)
router.delete('/katproker/:kpId', masterController.delKatProKer)

router.get('/bscall', masterController.getBSCAll)
router.get('/bsc', masterController.getBSC)
router.post('/bsc', masterController.postBSC)
router.put('/bsc/:bscId', masterController.putBSC)
router.delete('/bsc/:bscId', masterController.delBSC)

router.get('/tlauditall', masterController.getTLAuditAll)
router.get('/tlaudit', masterController.getTLAudit)
router.post('/tlaudit', masterController.postTLAudit)
router.put('/tlaudit/:tlaId', masterController.putTLAudit)
router.delete('/tlaudit/:tlaId', masterController.delTLAudit)

router.get('/satuanall', masterController.getSatuanAll)
router.get('/satuan', masterController.getSatuan)
router.post('/satuan', masterController.postSatuan)
router.put('/satuan/:satId', masterController.putSatuan)
router.delete('/satuan/:satId', masterController.delSatuan)

router.get('/posbiayaall', masterController.getPosBiayaAll)
router.get('/posbiaya', masterController.getPosBiaya)
router.post('/posbiaya', masterController.postPosBiaya)
router.put('/posbiaya/:posId', masterController.putPosBiaya)
router.delete('/posbiaya/:posId', masterController.delPosBiaya)

// Program Kerja

// router.get('/unitkerja', masterController.getUnitKerja);
// router.get('/pegawaiunitkerja', masterController.getPegawaiUnitKerja);
// router.get('/pegawaidivisi', masterController.getPegawaiDivisi);

router.get('/jenisrkf', masterController.getJenisRKF)
router.get('/perioderkf/:tahun', masterController.getPeriodeRKF)
router.post('/perioderkf', masterController.postPeriodeRKF)

router.get('/docupload/', masterController.getUploadAll)
router.get('/docupload/:tahun/:jenis', masterController.getUploadDocument)
router.post('/docupload', masterController.postUploadDocument)
router.put('/docupload/:documentId', masterController.putUploadDocument)
router.delete('/docupload/:documentId', masterController.delUploadDocument)

router.get('/tahun/', masterController.getTahun)
router.get('/poscoa/', masterController.getPosCoa)

router.get('/inisiatif/', masterController.getInisiatif)
router.get('/inisiatifTahun/:inisiatifId', masterController.getInisiatifTahun)
router.get('/sasaran/:masterId', masterController.getSasaran)
router.get('/sasaranTahun/:sasaranId', masterController.getSasaranTahun)

router.get('/coreplan/tahun', masterController.getCorePlanTahun)
router.get('/coreplan/:tahun', masterController.getCorePlanByTahun)
router.get('/coreplan/detail/:Id', masterController.getCorePlanById)

router.get('/transformasibpdall', masterController.getTransformasiBPDAll)
router.get('/transformasibpd/:id', masterController.getTransformasiBPD)
router.post('/transformasibpd', masterController.postTransformasiBPD)
router.put('/transformasibpd/:id', masterController.putTransformasiBPD)
router.delete('/transformasibpd/:id', masterController.delTransformasiBPD)

router.get('/rakball', masterController.getRAKBAll)
router.get('/rakb/:id', masterController.getRAKB)
router.post('/rakb', masterController.postRAKB)
router.put('/rakb/:id', masterController.putRAKB)
router.delete('/rakb/:id', masterController.delRAKB)

router.get('/barangall', masterController.getBarangAll)
router.get('/barang/kelompok/:kelompok', masterController.getBarangKelompok)
router.get('/barang/:id', masterController.getBarang)
router.post('/barang', masterController.postBarang)
router.put('/barang/:id', masterController.putBarang)
router.delete('/barang/:id', masterController.delBarang)

router.get('/kepemilikanaset', masterController.getKepemimikanAsetAll)
router.get('/jenisbangunrenovasi', masterController.getJenisBangunRenovasi)
router.get('/jenisaktiva', masterController.getJenisAktiva)
router.get('/jenispab', masterController.getPABAll)
router.get('/isustrategis/:tahun', masterController.getIsuStrategis)

module.exports = router

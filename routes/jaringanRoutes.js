var express = require('express')
var router = express.Router()

var jaringanController = require('../controllers/jaringanController')

var middleware = require('../middleware/middleware')

router.get('/jeniskantor', jaringanController.getJenisKantor)
router.get('/pengusul', jaringanController.getPengusul)
router.get('/jenistanahbangunan', jaringanController.getJenisTanahBangunan)
router.get(
  '/rencanapengadaantanah',
  jaringanController.getRencanaPengadaanTanah
)

router.get(
  '/rencanapengadaanbangunan',
  jaringanController.getRencanaPengadaanBangunan
)
router.get('/propinsi', jaringanController.getPropinsi)
router.get('/kota/:propinsiId', jaringanController.getKota)
router.get('/kecamatan/:kotaId', jaringanController.getKecamatan)
router.get('/kelurahan/:kecamatanId', jaringanController.getKelurahan)

router.get('/pembukaan/tahun/:tahun', jaringanController.getPembukaan)
router.get('/pembukaan/id/:id', jaringanController.getPembukaanId)
router.post('/pembukaan', jaringanController.postPembukaan)
router.delete('/pembukaan/:id', jaringanController.deletePembukaan)

router.post('/perubahan', jaringanController.postPerubahan)
router.get('/perubahan/tahun/:tahun', jaringanController.getPerubahan)
router.get('/perubahan/id/:id', jaringanController.getPerubahanId)
router.delete('/perubahan/:id', jaringanController.deletePerubahan)

router.post('/relokasi', jaringanController.postRelokasi)
router.get('/relokasi/tahun/:tahun', jaringanController.getRelokasi)
router.get('/relokasi/id/:id', jaringanController.getRelokasiId)
router.delete('/relokasi/:id', jaringanController.deleteRelokasi)

router.post('/penutupan', jaringanController.postPenutupan)
router.get('/penutupan/tahun/:tahun', jaringanController.getPenutupan)
router.get('/penutupan/id/:id', jaringanController.getPenutupanId)
router.delete('/penutupan/:id', jaringanController.deletePenutupan)

router.get(
  '/dashboard/pembukaan/:tahun',
  jaringanController.getDashboardPembukaan
)
router.get(
  '/dashboard/perubahan/:tahun',
  jaringanController.getDashboardPerubahan
)
router.get(
  '/dashboard/relokasi/:tahun',
  jaringanController.getDashboardRelokasi
)
router.get(
  '/dashboard/penutupan/:tahun',
  jaringanController.getDashboardPenutupan
)

router.get(
  '/rekap',
  jaringanController.getRekap
)


module.exports = router

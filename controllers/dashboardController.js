var db = require('../db/db')
var asyncro = require('../middleware/asyncro')

const dashboardTotalRKF = asyncro.asyncHandler(
  async (request, response, next) => {
    const divisiId = request.params.divisiId
    const tahun = request.params.tahun

    const getDashboardRkf = await db.any(
      'SELECT jml_rkf, jml_selesai, jml_jt, jml_terlambat FROM mst.dashboard_total_rkf2(${divisiId}, ${tahun})',
      { divisiId, tahun }
    )
    try {
      response.json(getDashboardRkf)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const dashboardQuickWin = asyncro.asyncHandler(
  async (request, response, next) => {
    const divisiId = request.params.divisiId
    const tahun = request.params.tahun
    const getQuickWin = await db.any(
      'SELECT jml_rkf, jml_selesai, jml_jt, jml_terlambat FROM mst.dashboard_total_quickwin2(${divisiId}, ${tahun})',
      { divisiId, tahun }
    )
    try {
      response.json(getQuickWin)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const dashboardTotalAktivitas = asyncro.asyncHandler(
  async (request, response, next) => {
    const divisiId = request.params.divisiId
    const tahun = request.params.tahun

    const getTotalAktivitas = await db.any(
      'SELECT jml_aktivitas, jml_selesai, jml_jt, jml_terlambat FROM mst.dashboard_total_aktivitas(${divisiId}, ${tahun})',
      { divisiId, tahun }
    )
    try {
      response.json(getTotalAktivitas)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const dashboardPersebaran = asyncro.asyncHandler(
  async (request, response, next) => {
    const divisiId = request.params.divisiId
    const tahun = request.params.tahun
    const getPersebaran = await db.any(
      'SELECT bulan, jenis, jumlah FROM mst.dashboard_persebaran(${divisiId}, ${tahun}) ORDER BY bulan, jenis',
      { divisiId, tahun }
    )

    try {
      response.json(getPersebaran)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const dashboardPenyelesaianRKF = asyncro.asyncHandler(
  async (request, response, next) => {
    const divisiId = request.params.divisiId
    const tahun = request.params.tahun
    const getPenyelesaianRKF = await db.any(
      'SELECT jml_selesai, jml_proses, jml_belum FROM mst.dashboard_penyelesaian_rkf(${divisiId}, ${tahun})',
      { divisiId, tahun }
    )

    try {
      response.json(getPenyelesaianRKF)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const dashboardPenyelesaianAktivitas = asyncro.asyncHandler(
  async (request, response, next) => {
    const divisiId = request.params.divisiId
    const tahun = request.params.tahun
    const getPenyelesaianAktivitas = await db.any(
      'SELECT jml_selesai, jml_proses, jml_belum FROM mst.dashboard_penyelesaian_aktivitas(${divisiId}, ${tahun})',
      { divisiId, tahun }
    )

    try {
      response.json(getPenyelesaianAktivitas)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const dashboardMonitoring = asyncro.asyncHandler(
  async (request, response, next) => {
    const divisiId = request.params.divisiId
    const tahun = request.params.tahun

    const getMonitoring = await db.any(
      'SELECT * FROM mst.dashboard_monitoring_pegawai(${divisiId}, ${tahun})',
      { divisiId, tahun }
    )

    try {
      response.json(getMonitoring)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const dashboardDetailAktivitas = asyncro.asyncHandler(
  async (request, response, next) => {
    const divisiId = request.params.divisiId
    const tahun = request.params.tahun
    const bulan = request.params.bulan

    const getDetailAktivitas = await db.any(
      'SELECT * FROM mst.detail_aktivitas(${divisiId}, ${tahun}, ${bulan})',
      { divisiId, tahun, bulan }
    )

    try {
      response.json(getDetailAktivitas)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

module.exports = {
  dashboardTotalRKF: dashboardTotalRKF,
  dashboardQuickWin: dashboardQuickWin,
  dashboardTotalAktivitas: dashboardTotalAktivitas,
  dashboardPersebaran: dashboardPersebaran,
  dashboardPenyelesaianRKF: dashboardPenyelesaianRKF,
  dashboardPenyelesaianAktivitas: dashboardPenyelesaianAktivitas,
  dashboardQuickWin: dashboardQuickWin,
  dashboardMonitoring: dashboardMonitoring,
  dashboardDetailAktivitas: dashboardDetailAktivitas
}

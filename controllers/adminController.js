var db = require('../db/db')
var asyncro = require('../middleware/asyncro')

const dashboardTotalRKF = asyncro.asyncHandler(
  async (request, response, next) => {
    const tahun = request.params.tahun

    const getDashboardRkf = await db.any(
      `SELECT divisi, jmlrkf, jmlselesai, jmljt, jmlterlambat FROM mst.admin_total_rkf(${tahun})`,
      { tahun }
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
    const tahun = request.params.tahun
    const getQuickWin = await db.any(
      `SELECT divisi, jmlrkf, jmlselesai, jmljt, jmlterlambat FROM mst.admin_total_quickwin(${tahun})`,
      { tahun }
    )
    try {
      response.status(200).json(getQuickWin)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const dashboardTotalAktivitas = asyncro.asyncHandler(
  async (request, response, next) => {
    const tahun = request.params.tahun
    const getTotalAktivitas = await db.any(
      `SELECT jml_aktivitas, jml_selesai, jml_jt, jml_terlambat FROM mst.admin_total_aktivitas(${tahun})`,
      { tahun }
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
    const tahun = request.params.tahun
    const getPersebaran = await db.any(
      `SELECT bulan, jenis, jumlah FROM mst.admin_persebaran(${tahun}) ORDER BY bulan, jenis`,
      { tahun }
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
    const tahun = request.params.tahun
    const getPenyelesaianRKF = await db.any(
      `SELECT jml_selesai, jml_proses, jml_belum FROM mst.admin_penyelesaian_rkf(${tahun})`,
      { tahun }
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
    const tahun = request.params.tahun
    const getPenyelesaianAktivitas = await db.any(
      `SELECT jml_selesai, jml_proses, jml_belum FROM mst.admin_penyelesaian_aktivitas(${tahun})`,
      { tahun }
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
    const tahun = request.params.tahun

    const getMonitoring = await db.any(
      `SELECT * FROM mst.admin_monitoring_pegawai(${tahun})`,
      { tahun }
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
      `SELECT * FROM mst.detail_aktivitas(${divisiId}, ${tahun}, ${bulan})`,
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
  dashboardMonitoring: dashboardMonitoring,
  dashboardDetailAktivitas: dashboardDetailAktivitas
}

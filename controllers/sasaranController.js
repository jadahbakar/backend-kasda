var db = require('../db/db')
var asyncro = require('../middleware/asyncro')

const getAll = asyncro.asyncHandler(async (request, response, next) => {
  const ambil = await db.any(
    'SELECT strategis_sasaran_master, strategis_sasaran_id, strategis_sasaran_nama FROM mst.strategis_sasaran'
  )
  response.json(ambil)
})

const getMaster = asyncro.asyncHandler(async (request, response, next) => {
  const masterId = request.params.masterId
  const ambil = await db.any(
    'SELECT strategis_sasaran_id, strategis_sasaran_nama FROM mst.strategis_sasaran WHERE strategis_sasaran_master = ${masterId} ORDER BY strategis_sasaran_id',
    { masterId }
  )
  response.json(ambil)
})

const getDetail = asyncro.asyncHandler(async (request, response, next) => {
  const sasaranId = request.params.sasaranId
  const ambil = await db.any(
    'SELECT strategis_sasaran_tahun, strategis_sasaran_value FROM mst.strategis_sasaran_tahun WHERE strategis_sasaran_id = ${sasaranId} ORDER BY strategis_sasaran_tahun',
    { sasaranId }
  )
  response.json(ambil)
})

module.exports = {
  getAll: getAll,
  getMaster: getMaster,
  getDetail: getDetail
}

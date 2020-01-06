var db = require('../db/db')
var asyncro = require('../middleware/asyncro')

const getAll = asyncro.asyncHandler(async (request, response, next) => {
  const ambil = await db.any(
    'SELECT strategis_inisiatif_master, strategis_inisiatif_id, strategis_inisiatif_nama FROM mst.strategis_inisiatif'
  )
  response.json(ambil)
})

const getMaster = asyncro.asyncHandler(async (request, response, next) => {
  const masterId = request.params.masterId
  const ambil = await db.any(
    'SELECT strategis_inisiatif_id, strategis_inisiatif_nama FROM mst.strategis_inisiatif WHERE strategis_inisiatif_master = ${masterId} ORDER BY strategis_inisiatif_id',
    { masterId }
  )
  response.json(ambil)
})

const getDetail = asyncro.asyncHandler(async (request, response, next) => {
  const inisiatifId = request.params.inisiatifId
  const ambil = await db.any(
    'SELECT strategis_inisiatif_tahun, strategis_inisiatif_value FROM mst.strategis_inisiatif_tahun WHERE strategis_inisiatif_id = ${inisiatifId} ORDER BY strategis_inisiatif_tahun',
    { inisiatifId }
  )
  response.json(ambil)
})

module.exports = {
  getAll: getAll,
  getMaster: getMaster,
  getDetail: getDetail
}

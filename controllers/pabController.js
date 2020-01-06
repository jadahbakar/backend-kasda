var db = require('../db/db')
var asyncro = require('../middleware/asyncro')

const getAll = asyncro.asyncHandler(async (request, response, next) => {
  const ambil = await db.any(
    'SELECT pab_rkf_id, pab_jenis, pab_nama, pab_jadwal_bulan, pab_tujuan_bank, pab_tujuan_nasabah, pab_keterkaitan, pab_deskripsi, pab_resiko, pab_mitigasi_resiko \
    FROM mst.pab ORDER BY pab_rkf_id'
  )
  response.json(ambil)
})

const getPAB = asyncro.asyncHandler(async (request, response, next) => {
  const rkfId = request.params.rkfId
  const ambil = await db.any(
    'SELECT pab_rkf_id, pab_jenis, pab_nama, pab_jadwal_bulan, pab_tujuan_bank, pab_tujuan_nasabah, pab_keterkaitan, pab_deskripsi, pab_resiko, pab_mitigasi_resiko \
    FROM mst.pab WHERE pab_rkf_id = ${rkfId}',
    { rkfId }
  )
  response.json(ambil)
})

const postPAB = asyncro.asyncHandler(async (request, response, next) => {
  const {
    rkfId,
    jenis,
    nama,
    jadwal,
    tujuanBank,
    tujuanNasabah,
    keterkaitan,
    deskripsi,
    resiko,
    mitigasiResiko
  } = request.body
  const procPost = await db.any(
    'INSERT INTO mst.pab(pab_rkf_id, pab_jenis, pab_nama, pab_jadwal_bulan, pab_tujuan_bank, pab_tujuan_nasabah, pab_keterkaitan, pab_deskripsi, pab_resiko, pab_mitigasi_resiko) \
    VALUES (${rkfId},${jenis},${nama},${jadwal},${tujuanBank},${tujuanNasabah},${keterkaitan},${deskripsi},${resiko},${mitigasiResiko})',
    {
      rkfId,
      jenis,
      nama,
      jadwal,
      tujuanBank,
      tujuanNasabah,
      keterkaitan,
      deskripsi,
      resiko,
      mitigasiResiko
    }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const putPAB = asyncro.asyncHandler(async (request, response, next) => {
  const {
    jenis,
    nama,
    jadwal,
    tujuanBank,
    tujuanNasabah,
    keterkaitan,
    deskripsi,
    resiko,
    mitigasiResiko
  } = request.body
  const rkfId = request.params.rkfId
  const procUpdate = await db.any(
    'UPDATE mst.pab SET \
    pab_jenis = ${jenis} , \
    pab_nama = ${nama} , \
    pab_jadwal_bulan = ${jadwal} , \
    pab_tujuan_bank = ${tujuanBank} , \
    pab_tujuan_nasabah = ${tujuanNasabah} , \
    pab_keterkaitan = ${keterkaitan} , \
    pab_deskripsi = ${deskripsi}, \
    pab_resiko =  ${resiko}, \
    pab_mitigasi_resiko =  ${mitigasiResiko} \
    WHERE pab_rkf_id  = ${rkfId}',
    {
      jenis,
      nama,
      jadwal,
      tujuanBank,
      tujuanNasabah,
      keterkaitan,
      deskripsi,
      resiko,
      mitigasiResiko,
      rkfId
    }
  )
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const delPAB = asyncro.asyncHandler(async (request, response, next) => {
  const rkfId = request.params.rkfId
  const procDel = await db.any(
    'DELETE FROM mst.pab WHERE pab_rkf_id = ${rkfId} ',
    {
      rkfId
    }
  )
  try {
    return response.status(200).send('deleted')
  } catch (error) {
    return response.status(400).send(error)
  }
})

module.exports = {
  getAll: getAll,
  getPAB: getPAB,
  postPAB: postPAB,
  putPAB: putPAB,
  delPAB: delPAB
}

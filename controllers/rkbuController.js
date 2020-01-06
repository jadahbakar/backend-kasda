var db = require('../db/db')
var asyncro = require('../middleware/asyncro')

const getAll = asyncro.asyncHandler(async (request, response, next) => {
  const ambil = await db.any(
    'SELECT rkbu_id, rkbu_barang_kelompok, rkbu_barang_kode, rkbu_barang_nama, rkbu_status, rkbu_jumlah, rkbu_estimasi_harga, rkbu_tahun, rkbu_jadwal_bulan, rkbu_divisi \
    FROM mst.rkbu ORDER BY rkbu_id'
  )
  response.json(ambil)
})

const getDivisi = asyncro.asyncHandler(async (request, response, next) => {
  const divisi = request.params.divisi
  const ambil = await db.any(
    'SELECT rkbu_id, rkbu_barang_kelompok, rkbu_barang_kode, rkbu_barang_nama, rkbu_status, rkbu_jumlah, rkbu_estimasi_harga, rkbu_tahun, rkbu_jadwal_bulan, rkbu_divisi \
    FROM mst.rkbu  WHERE rkbu_divisi = ${divisi} ORDER BY rkbu_id',
    { divisi }
  )
  response.json(ambil)
})

const postRKBU = asyncro.asyncHandler(async (request, response, next) => {
  const {
    kelompok,
    kode,
    nama,
    status,
    jumlah,
    harga,
    tahun,
    jadwal,
    divisi
  } = request.body
  const procPost = await db.any(
    'INSERT INTO mst.rkbu(rkbu_barang_kelompok, rkbu_barang_kode, rkbu_barang_nama, rkbu_status, rkbu_jumlah, rkbu_estimasi_harga, rkbu_tahun, rkbu_jadwal_bulan, rkbu_divisi) \
    VALUES (${kelompok},${kode},${nama},${status},${jumlah},${harga},${tahun},${jadwal},${divisi} )',
    { kelompok, kode, nama, status, jumlah, harga, tahun, jadwal, divisi }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const putRKBU = asyncro.asyncHandler(async (request, response, next) => {
  const {
    kelompok,
    kode,
    nama,
    status,
    jumlah,
    harga,
    tahun,
    jadwal
  } = request.body
  const id = request.params.id
  const procUpdate = await db.any(
    'UPDATE mst.rkbu SET \
    rkbu_barang_kelompok = ${kelompok} , \
    rkbu_barang_kode = ${kode} , \
    rkbu_barang_nama = ${nama} , \
    rkbu_status = ${status} , \
    rkbu_jumlah = ${jumlah} , \
    rkbu_estimasi_harga = ${harga} , \
    rkbu_tahun = ${tahun} , \
    rkbu_jadwal_bulan = ${jadwal} \
    WHERE rkbu_id= ${id} ',
    { kelompok, kode, nama, status, jumlah, harga, tahun, jadwal, id }
  )
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const delRKBU = asyncro.asyncHandler(async (request, response, next) => {
  const id = request.params.id
  const procDel = await db.any('DELETE FROM mst.rkbu WHERE rkbu_id = ${id} ', {
    id
  })
  try {
    return response.status(200).send('deleted')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const otorRKBU = asyncro.asyncHandler(async (request, response, next) => {
  const id = request.params.id
  const user = request.body.user
  const procDel = await db.any('UPDATE mst.rkbu SET rkbu_otor_time = now(), rkbu_otor_user=$(user) WHERE rkbu_id = $(id) ', {
    user, id
  })
  try {
    return response.status(200).send('otor')
  } catch (error) {
    return response.status(400).send(error)
  }
})

module.exports = {
  getAll: getAll,
  getDivisi: getDivisi,
  postRKBU: postRKBU,
  putRKBU: putRKBU,
  delRKBU: delRKBU,
  otorRKBU: otorRKBU
}

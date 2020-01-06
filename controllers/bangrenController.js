var db = require('../db/db')
var asyncro = require('../middleware/asyncro')

const getAll = asyncro.asyncHandler(async (request, response, next) => {
  const ambil = await db.any(
    'SELECT bangun_renovasi_id, bangun_renovasi_jenis, bangun_renovasi_uraian, bangun_renovasi_status, bangun_renovasi_kepemilikan_aset, bangun_renovasi_alamat, bangun_renovasi_anggaran, bangun_renovasi_jadwal_bulan, bangun_renovasi_divisi \
    FROM mst.bangun_renovasi ORDER BY bangun_renovasi_id'
  )
  response.json(ambil)
})

const getDivisi = asyncro.asyncHandler(async (request, response, next) => {
  const divisi = request.params.divisi
  const ambil = await db.any(
    'SELECT bangun_renovasi_id, bangun_renovasi_jenis, bangun_renovasi_uraian, bangun_renovasi_status, bangun_renovasi_kepemilikan_aset, bangun_renovasi_alamat, bangun_renovasi_anggaran, bangun_renovasi_jadwal_bulan, bangun_renovasi_divisi \
    FROM mst.bangun_renovasi  WHERE bangun_renovasi_divisi = ${divisi} ORDER BY bangun_renovasi_id',
    { divisi }
  )
  response.json(ambil)
})

const postBangRen = asyncro.asyncHandler(async (request, response, next) => {
  const {
    jenis,
    uraian,
    status,
    pemilik,
    alamat,
    anggaran,
    jadwal,
    divisi
  } = request.body
  let jadwalPelaksanaan
  if (jadwal.length > 0) {
    jadwalPelaksanaan = JSON.stringify(jadwal.sort())
  } else {
    jadwalPelaksanaan = JSON.stringify([])
  }
  const procPost = await db.any(
    'INSERT INTO mst.bangun_renovasi(bangun_renovasi_jenis, bangun_renovasi_uraian, bangun_renovasi_status, bangun_renovasi_kepemilikan_aset, bangun_renovasi_alamat, bangun_renovasi_anggaran, bangun_renovasi_jadwal_bulan, bangun_renovasi_divisi) \
    VALUES (${jenis},${uraian},${status},${pemilik},${alamat},${anggaran},${jadwalPelaksanaan},${divisi})',
    {
      jenis,
      uraian,
      status,
      pemilik,
      alamat,
      anggaran,
      jadwalPelaksanaan,
      divisi
    }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const putBangRen = asyncro.asyncHandler(async (request, response, next) => {
  const {
    jenis,
    uraian,
    status,
    pemilik,
    alamat,
    anggaran,
    jadwal
  } = request.body
  const id = request.params.id
  let jadwalPelaksanaan
  if (jadwal.length > 0) {
    jadwalPelaksanaan = JSON.stringify(jadwal.sort())
  } else {
    jadwalPelaksanaan = JSON.stringify([])
  }
  const procUpdate = await db.any(
    'UPDATE mst.bangun_renovasi SET \
    bangun_renovasi_jenis = ${jenis} , \
    bangun_renovasi_uraian = ${uraian} , \
    bangun_renovasi_status = ${status} , \
    bangun_renovasi_kepemilikan_aset = ${pemilik} , \
    bangun_renovasi_alamat = ${alamat} , \
    bangun_renovasi_anggaran = ${anggaran} , \
    bangun_renovasi_jadwal_bulan = ${jadwalPelaksanaan} \
    WHERE bangun_renovasi_id  = ${id}',
    {
      jenis,
      uraian,
      status,
      pemilik,
      alamat,
      anggaran,
      jadwalPelaksanaan,
      id
    }
  )
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const delBangRen = asyncro.asyncHandler(async (request, response, next) => {
  const id = request.params.id
  const procDel = await db.any(
    'DELETE FROM mst.bangun_renovasi WHERE bangun_renovasi_id = ${id} ',
    {
      id
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
  getDivisi: getDivisi,
  postBangRen: postBangRen,
  putBangRen: putBangRen,
  delBangRen: delBangRen
}

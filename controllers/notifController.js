var db = require('../db/db')
// var asyncro = require('../middleware/asyncro');

const getNotif = async (request, response, next) => {
  const divisiId = request.params.divisiId
  const tahun = request.params.tahun

  const ambilNotif = await db.any(
    'SELECT rkfId, rkfProker, rkfUserFrom, rkfUserFromName, rkfNotes, rkfJadwal  FROM mst.get_notes(${divisiId},${tahun})',
    { divisiId, tahun }
  )
  // response.json(ambilNotif);
  try {
    return response.json(ambilNotif)
  } catch (error) {
    return response.status(400).send(error)
  }
}

const getSumNotif = async (request, response, next) => {
  const divisiId = request.params.divisiId
  const tahun = request.params.tahun

  const ambilSumNotif = await db.any(
    'SELECT rkfUserFrom, rkfUserFromName, jumlahSupport FROM mst.get_notes_sum(${divisiId},${tahun})',
    { divisiId, tahun }
  )
  try {
    return response.json(ambilSumNotif)
  } catch (error) {
    return response.status(400).send(error)
  }
}

module.exports = {
  getNotif: getNotif,
  getSumNotif: getSumNotif
}

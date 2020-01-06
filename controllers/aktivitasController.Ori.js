var db = require('../db/db')
var asyncro = require('../middleware/asyncro')

const getAktivitasProkerId = asyncro.asyncHandler(
  async (request, response, next) => {
    const prokerId = request.params.prokerId
    // console.log(request.params.prokerId);

    const getAktivitas = await db.any(
      'SELECT aktivitas_proker, aktivitas_id, aktivitas_nama, aktivitas_target, aktivitas_pic, aktivitas_bulan FROM mst.aktivitas WHERE aktivitas_proker = ${prokerId}',
      { prokerId }
    )

    response.json(getAktivitas)
    // try {
    //   return response.status(201).send('created');
    // } catch (error) {
    //   return response.status(400).send(error);
    // }
  }
)

const postAktivitas = asyncro.asyncHandler(async (request, response, next) => {
  const {
    aktivitasProker,
    aktivitasNama,
    aktivitasTarget,
    aktivitasPic,
    aktivitasBulan
  } = request.body
  const pic = JSON.stringify(aktivitasPic)
  const procPost = await db.any(
    'INSERT INTO mst.aktivitas(aktivitas_proker, aktivitas_nama, aktivitas_target, aktivitas_pic, aktivitas_bulan ) VALUES (${aktivitasProker}, ${aktivitasNama}, ${aktivitasTarget}, ${pic}, ${aktivitasBulan})',
    { aktivitasProker, aktivitasNama, aktivitasTarget, pic, aktivitasBulan }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const putAktivitas = asyncro.asyncHandler(async (request, response, next) => {
  const {
    aktivitasNama,
    aktivitasPic,
    aktivitasTarget,
    aktivitasBulan
  } = request.body
  const aktivitasId = request.params.aktivitasId
  const pic = JSON.stringify(aktivitasPic)
  const procUpdate = await db.any(
    'UPDATE mst.aktivitas SET aktivitas_nama = ${aktivitasNama}, aktivitas_target = ${aktivitasTarget}, aktivitas_pic = ${pic}, aktivitas_bulan = ${aktivitasBulan} WHERE aktivitas_id = ${aktivitasId} ',
    { aktivitasNama, aktivitasId, aktivitasTarget, pic, aktivitasBulan }
  )
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const delAktivitas = asyncro.asyncHandler(async (request, response, next) => {
  const aktivitasId = request.params.aktivitasId
  const procUpdate = await db.any(
    'DELETE FROM mst.aktivitas WHERE aktivitas_id = ${aktivitasId} ',
    { aktivitasId }
  )
  try {
    return response.status(200).send('deleted')
  } catch (error) {
    return response.status(400).send(error)
  }
})

// Detail-------------------------------------------------------------------------------------------

const getAktivitasDetailId = asyncro.asyncHandler(
  async (request, response, next) => {
    const aktivitasId = request.params.aktivitasId
    // console.log(request.params.detailId);

    const getAktivitasDetail = await db.any(
      'SELECT  aktivitas_master_id, aktivitas_detail_id, aktivitas_detail_bulan, aktivitas_detail_status, aktivitas_detail_penjelasan, aktivitas_detail_date, aktivitas_detail_otor_user, aktivitas_detail_otor_time  FROM mst.aktivitas_detail WHERE aktivitas_master_id = ${aktivitasId} ORDER BY aktivitas_detail_date',
      { aktivitasId }
    )
    response.json(getAktivitasDetail)
  }
)

const getLastAktivitasDetail = asyncro.asyncHandler(
  async (request, response, next) => {
    const aktivitasId = request.params.aktivitasId
    // console.log(request.params.detailId);

    const getAktivitasDetail = await db.any(
      'SELECT aktivitas_master_id, aktivitas_detail_id, aktivitas_detail_bulan, aktivitas_detail_status, aktivitas_detail_penjelasan, aktivitas_detail_otor_user, aktivitas_detail_otor_time FROM mst.aktivitas_detail WHERE aktivitas_detail_id = ${aktivitasId} ORDER BY aktivitas_detail_date DESC LIMIT 1',
      { aktivitasId }
    )
    response.json(getAktivitasDetail)
  }
)

const postAktivitasDetail = asyncro.asyncHandler(
  async (request, response, next) => {
    const aktivitasDetailId = request.params.aktivitasId
    const {
      aktivitasDetailBulan,
      aktivitasDetailStatus,
      aktivitasDetailPenjelasan
    } = request.body
    const procPost = await db.any(
      'INSERT INTO mst.aktivitas_detail(aktivitas_master_id, aktivitas_detail_bulan, aktivitas_detail_status, aktivitas_detail_penjelasan) VALUES (${aktivitasDetailId}, ${aktivitasDetailBulan}, ${aktivitasDetailStatus}, ${aktivitasDetailPenjelasan} )',
      {
        aktivitasDetailId,
        aktivitasDetailBulan,
        aktivitasDetailStatus,
        aktivitasDetailPenjelasan
      }
    )
    try {
      return response.status(201).send('created')
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const putAktivitasDetail = asyncro.asyncHandler(
  async (request, response, next) => {
    const detailId = request.params.detailId
    const { aktivitasDetailStatus, aktivitasDetailPenjelasan } = request.body
    const procUpdate = await db.any(
      'UPDATE mst.aktivitas_detail SET aktivitas_detail_status = ${aktivitasDetailStatus}, aktivitas_detail_penjelasan = ${aktivitasDetailPenjelasan}, aktivitas_detail_date = now() WHERE  aktivitas_detail_id = ${detailId}',
      {
        aktivitasDetailStatus,
        aktivitasDetailPenjelasan,
        detailId
      }
    )
    try {
      return response.status(200).send('updated')
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const delAktivitasDetail = asyncro.asyncHandler(
  async (request, response, next) => {
    const detailId = request.params.detailId
    const procUpdate = await db.any(
      'DELETE FROM mst.aktivitas_detail WHERE aktivitas_detail_id = ${detailId} ',
      { detailId }
    )
    try {
      return response.status(200).send('deleted')
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const otorAktivitasDetail = asyncro.asyncHandler(
  async (request, response, next) => {
    const detailId = request.params.detailId
    const { detailAction, detailUser } = request.body
    if (detailAction === '1') {
      const procOtor = await db.any(
        'UPDATE mst.aktivitas_detail SET aktivitas_detail_otor_user = ${detailUser}, aktivitas_detail_otor_time = now() WHERE aktivitas_detail_id = ${detailId}',
        { detailUser, detailId }
      )
    } else {
      const procOtor = await db.any(
        'UPDATE mst.aktivitas_detail SET aktivitas_detail_otor_user = null, aktivitas_detail_otor_time = null WHERE aktivitas_detail_id = ${detailId}',
        { detailId }
      )
    }

    try {
      return response.status(200).send('otor')
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

module.exports = {
  getAktivitasProkerId: getAktivitasProkerId,
  postAktivitas: postAktivitas,
  putAktivitas: putAktivitas,
  delAktivitas: delAktivitas,

  getAktivitasDetailId: getAktivitasDetailId,
  postAktivitasDetail: postAktivitasDetail,
  putAktivitasDetail: putAktivitasDetail,
  delAktivitasDetail: delAktivitasDetail,
  getLastAktivitasDetail: getLastAktivitasDetail,
  otorAktivitasDetail: otorAktivitasDetail
}

const db = require('../db/db')
const asyncro = require('../middleware/asyncro')
var path = require('path')
const fs = require('fs')

const getAktivitasProkerId = asyncro.asyncHandler(
  async (request, response, next) => {
    const prokerId = request.params.prokerId
    const getAktivitas = await db.any(
      `SELECT aktivitas_id, aktivitas_nama, aktivitas_target, aktivitas_pic, aktivitas_bulan, aktivitas_status, aktivitas_penjelasan, aktivitas_otor_user, aktivitas_otor_time FROM mst.aktivitas WHERE aktivitas_proker = ${prokerId} ORDER BY aktivitas_urut ASC`,
      { prokerId }
    )
    try {
      //   return response.status(201).send(`created`);
      response.json(getAktivitas)
    } catch (error) {
      return response.status(400).send(error)
    }
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
    `SELECT mst.aktivitas_w($(aktivitasProker), $(aktivitasNama), $(aktivitasTarget), $(pic), $(aktivitasBulan))`,
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
    aktivitasBulan,
    aktivitasStatus,
    aktivitasPenjelasan
  } = request.body
  const aktivitasId = request.params.aktivitasId
  const pic = JSON.stringify(aktivitasPic)
  const procUpdate = await db.any(
    'UPDATE mst.aktivitas SET aktivitas_nama = ${aktivitasNama}, aktivitas_target = ${aktivitasTarget}, aktivitas_pic = ${pic}, aktivitas_bulan = ${aktivitasBulan}, aktivitas_status = ${ aktivitasStatus }, aktivitas_penjelasan = ${ aktivitasPenjelasan } WHERE aktivitas_id = ${aktivitasId} ',
    {
      aktivitasNama,
      aktivitasTarget,
      pic,
      aktivitasBulan,
      aktivitasPenjelasan,
      aktivitasStatus,
      aktivitasPenjelasan,
      aktivitasId
    }
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
    `DELETE FROM mst.aktivitas WHERE aktivitas_id = ${aktivitasId} `,
    { aktivitasId }
  )
  try {
    return response.status(200).send('deleted')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const otorAktivitas = asyncro.asyncHandler(async (request, response, next) => {
  const prokerId = request.params.prokerId
  const { detailAction, detailUser } = request.body
  if (detailAction === '1') {
    const procOtor = await db.any(
      'UPDATE mst.aktivitas SET aktivitas_otor_user = ${detailUser}, aktivitas_otor_time = now() WHERE aktivitas_proker = ${prokerId}',
      { detailUser, prokerId }
    )
  } else {
    const procOtor = await db.any(
      'UPDATE mst.aktivitas SET aktivitas_otor_user = null, aktivitas_otor_time = null WHERE aktivitas_proker = ${prokerId}',
      { prokerId }
    )
  }

  try {
    return response.status(200).send('otor')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const putAktivitasLapor = asyncro.asyncHandler(
  async (request, response, next) => {
    const { aktivitasStatus, aktivitasPenjelasan } = request.body
    const aktivitasId = request.params.aktivitasId
    const procUpdate = await db.any(
      'UPDATE mst.aktivitas SET aktivitas_status = ${aktivitasStatus}, aktivitas_penjelasan = ${aktivitasPenjelasan}, aktivitas_otor_user = null, aktivitas_otor_time = null WHERE aktivitas_id = ${aktivitasId} ',
      {
        aktivitasStatus,
        aktivitasPenjelasan,
        aktivitasId
      }
    )
    try {
      return response.status(200).send('updated')
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

// https://attacomsian.com/blog/uploading-files-nodejs-express

const postAttach = asyncro.asyncHandler(async (request, response, next) => {
  const aktivitasId = request.params.aktivitasId
  // console.log(aktivitasId);
  if (Object.keys(request.files).length == 0) {
    return res.status(400).send('No files were uploaded.')
  }
  const fileUpload = request.files.fileUpload

  // let location = path.join(
  //   path.resolve(__dirname, '..'),
  //   'attachment',
  //   aktivitasId,
  //   request.files.fileUpload.name
  // );

  const location = path.join(
    path.resolve(__dirname, '..'),
    'attachment',
    aktivitasId
  )

  // create folder
  try {
    if (!fs.existsSync(location)) {
      fs.mkdirSync(location)
    }
  } catch (err) {
    console.error(err)
  }

  const locFile = path.join(
    path.resolve(__dirname, '..'),
    'attachment',
    aktivitasId,
    'upload.pdf'
  )
  fileUpload.mv(locFile, function (err) {
    if (err) return response.status(500).send(err)
    response.send('File uploaded!')
  })
})

const getAttach = asyncro.asyncHandler(async (request, response, next) => {
  const aktivitasId = request.params.aktivitasId
  const location = path.join(
    path.resolve(__dirname, '..'),
    'attachment',
    aktivitasId,
    'upload.pdf'
  )
  response.download(location)
})

const postAttach2 = asyncro.asyncHandler(async (request, response, next) => {
  const aktivitasId = request.params.aktivitasId
  try {
    if (!request.files) {
      response.send({
        status: false,
        message: 'No file uploaded'
      })
    } else {
      // Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      const avatar = request.files.fileUpload

      // Use the mv() method to place the file in upload directory (i.e. "uploads")
      const location = path.join(
        path.resolve(__dirname, '..'),
        'attachment',
        aktivitasId
      )

      const locFile = path.join(
        path.resolve(__dirname, '..'),
        'attachment',
        aktivitasId,
        'upload.pdf'
      )

      // create folder
      try {
        if (!fs.existsSync(location)) {
          fs.mkdirSync(location)
        }
      } catch (err) {
        console.error(err)
      }

      // avatar.mv(location + avatar.name);
      avatar.mv(locFile)

      // fileUpload.mv(location, function(err) {
      //   if (err) return response.status(500).send(err);
      //   response.send('File uploaded!');
      // });

      // send response
      response.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size
        }
      })
    }
  } catch (err) {
    response.status(500).send(err)
  }
})

// Upload Document ----------------------------------------------------

const getUploadAll = asyncro.asyncHandler(async (request, response, next) => {
  const all = await db.any(
    'SELECT doc_aktivitas_id, doc_aktivitas_nama \
  FROM mst.upload_dokumen_aktivitas '
  )
  response.json(all)
})

const getUploadDocument = asyncro.asyncHandler(
  async (request, response, next) => {
    const aktivitasId = request.params.aktivitasId
    const allUploadDocument = await db.any(
      'SELECT doc_aktivitas_id, doc_aktivitas_nama \
  FROM mst.upload_dokumen_aktivitas WHERE doc_aktivitas_id = ${aktivitasId}  ',
      { aktivitasId }
    )
    response.json(allUploadDocument)
  }
)

const postUploadDocument = asyncro.asyncHandler(
  async (request, response, next) => {
    const { aktivitasId, namaDokumen } = request.body
    const procPost = await db.any(
      'INSERT INTO mst.upload_dokumen_aktivitas(doc_aktivitas_id,doc_aktivitas_nama)   VALUES (${aktivitasId}, ${namaDokumen} )',
      { aktivitasId, namaDokumen }
    )
    try {
      return response.status(201).send('created')
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const putUploadDocument = asyncro.asyncHandler(
  async (request, response, next) => {
    const { namaDokumen } = request.body
    const aktivitasId = request.params.aktivitasId
    const procUpdate = await db.any(
      'UPDATE mst.upload_dokumen_aktivitas SET doc_aktivitas_nama = ${namaDokumen} WHERE doc_aktivitas_id = ${aktivitasId} ',
      { namaDokumen, aktivitasId }
    )
    try {
      return response.status(200).send('updated')
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const delUploadDocument = asyncro.asyncHandler(
  async (request, response, next) => {
    const aktivitasId = request.params.aktivitasId
    const procDel = await db.any(
      'DELETE FROM mst.upload_dokumen_aktivitas WHERE doc_aktivitas_id = ${aktivitasId} ',
      { aktivitasId }
    )
    try {
      return response.status(200).send('deleted')
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
  otorAktivitas: otorAktivitas,
  putAktivitasLapor: putAktivitasLapor,
  postAttach: postAttach,
  getAttach: getAttach,
  postAttach2: postAttach2,
  getUploadAll: getUploadAll,
  getUploadDocument: getUploadDocument,
  postUploadDocument: postUploadDocument,
  putUploadDocument: putUploadDocument,
  delUploadDocument: delUploadDocument
}

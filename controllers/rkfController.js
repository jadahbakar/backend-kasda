var db = require('../db/db')
var asyncro = require('../middleware/asyncro')

const postRKF = async (request, response, next) => {
  const {
    rkfUser,
    rkfUserFrom,
    rkfTahun,
    rkfJenisId,
    selectedVisi,
    selectedMisi,
    selectedCorePlan,
    kudArr,
    proker,
    stsProker,
    skalaProker,
    katProker,
    bsc,
    tindakLanjutAudit,
    konsultan,
    tujuanProkerArr,
    indikatorKeberhasilanArr,
    targetFinansial,
    selectedBulan,
    anggaran,
    unitPelaksana,
    fungsiLain,
    rkfTransformasiBPD,
    rkfRAKB,
    isuStrategis
  } = request.body
  const unitPel = JSON.stringify(unitPelaksana)
  const visi = JSON.stringify(selectedVisi)
  const misi = JSON.stringify(selectedMisi)
  const cp = JSON.stringify(selectedCorePlan)
  const kud = JSON.stringify(kudArr)
  const tlAudit = JSON.stringify(tindakLanjutAudit)
  const tujuanProker = JSON.stringify(tujuanProkerArr)
  const indikatorKeberhasilan = JSON.stringify(indikatorKeberhasilanArr)
  const targetFin = JSON.stringify(targetFinansial)
  let jadwalPelaksanaan
  if (selectedBulan.length > 0) {
    jadwalPelaksanaan = JSON.stringify(selectedBulan.sort())
  } else {
    jadwalPelaksanaan = JSON.stringify([])
  }
  // console.log(jadwalPelaksanaan);

  const anggaranArr = JSON.stringify(anggaran)
  const fungsiLainArr = JSON.stringify(fungsiLain)

  const param_rkfTransformasiBPD = rkfTransformasiBPD || 0
  const param_rkfRAKB = rkfRAKB || 0
  const param_stsProker = stsProker || 0
  const param_skalaProker = skalaProker || 0
  const param_katProker = katProker || 0
  const param_bsc = bsc || 0
  const param_konsultan = konsultan || 0
  const rkfIsuStrategis = JSON.stringify(isuStrategis)

  try {
    const input = await db.any(
      'INSERT INTO mst.rkf (\
      rkf_user, rkf_user_from, rkf_tahun, rkf_jenis_id, \
      rkf_unit_pelaksana, \
      rkf_visi, rkf_misi, rkf_coreplan, rkf_kud, \
      rkf_proker, \
      rkf_status_proker, rkf_skala_proker, rkf_kat_proker, rkf_bsc, \
      rkf_tlaudit, rkf_konsultan, \
      rkf_tujuan_proker, rkf_indikator, \
      rkf_targetfin, \
      rkf_jadwal, \
      rkf_anggaran, \
      rkf_fungsilain, \
      rkf_transformasi_bpd, \
      rkf_rakb, \
      rkf_isu_strategis \
      ) VALUES ( \
      ${rkfUser}, ${rkfUserFrom}, ${rkfTahun}, ${rkfJenisId}, \
      ${unitPel}, \
      ${visi},  ${misi},  ${cp},  ${kud}, \
      ${proker}, \
      ${param_stsProker}, ${param_skalaProker}, ${param_katProker}, ${param_bsc}, \
      ${tlAudit}, ${param_konsultan}, \
      ${tujuanProker}, ${indikatorKeberhasilan}, \
      ${targetFin}, \
      ${jadwalPelaksanaan}, \
      ${anggaranArr}, \
      ${fungsiLainArr}, \
      ${param_rkfTransformasiBPD}, \
      ${param_rkfRAKB}, \
      ${rkfIsuStrategis}) \
      RETURNING rkf_id',
      {
        rkfUser,
        rkfUserFrom,
        rkfTahun,
        rkfJenisId,
        unitPel,
        visi,
        misi,
        cp,
        kud,
        proker,
        param_stsProker,
        param_skalaProker,
        param_katProker,
        param_bsc,
        tlAudit,
        param_konsultan,
        tujuanProker,
        indikatorKeberhasilan,
        targetFin,
        jadwalPelaksanaan,
        anggaranArr,
        fungsiLainArr,
        param_rkfTransformasiBPD,
        param_rkfRAKB,
        rkfIsuStrategis
      }
    )
    // console.log(input);
    response.json(input)
  } catch (error) {
    response.json(error)
    console.log(error)
  }
}

const updateRKF = asyncro.asyncHandler(async (request, response, next) => {
  // darisini----------
  const {
    rkfUser,
    rkfUserFrom,
    rkfTahun,
    rkfJenisId,
    selectedVisi,
    selectedMisi,
    selectedCorePlan,
    kudArr,
    proker,
    stsProker,
    skalaProker,
    katProker,
    bsc,
    tindakLanjutAudit,
    konsultan,
    tujuanProkerArr,
    indikatorKeberhasilanArr,
    targetFinansial,
    selectedBulan,
    anggaran,
    unitPelaksana,
    fungsiLain,
    rkfId,
    rkfTransformasiBPD,
    rkfRAKB,
    isuStrategis
  } = request.body

  // define let for jsonb field
  const unitPel = JSON.stringify(unitPelaksana)
  const visi = JSON.stringify(selectedVisi)
  const misi = JSON.stringify(selectedMisi)
  const cp = JSON.stringify(selectedCorePlan)
  const kud = JSON.stringify(kudArr)
  const tlAudit = JSON.stringify(tindakLanjutAudit)
  const tujuanProker = JSON.stringify(tujuanProkerArr)
  const indikatorKeberhasilan = JSON.stringify(indikatorKeberhasilanArr)
  const targetFin = JSON.stringify(targetFinansial)
  let jadwalPelaksanaan
  if (selectedBulan.length > 0) {
    jadwalPelaksanaan = JSON.stringify(selectedBulan.sort())
  } else {
    jadwalPelaksanaan = JSON.stringify([])
  }
  const anggaranArr = JSON.stringify(anggaran)
  const fungsiLainArr = JSON.stringify(fungsiLain)
  console.log(fungsiLain)

  const param_rkfTransformasiBPD = rkfTransformasiBPD || 0
  const param_rkfRAKB = rkfRAKB || 0
  const param_stsProker = stsProker || 0
  const param_skalaProker = skalaProker || 0
  const param_katProker = katProker || 0
  const param_bsc = bsc || 0
  const param_konsultan = konsultan || 0
  const rkfIsuStrategis = JSON.stringify(isuStrategis)
  try {
    const update = await db.none(
      'UPDATE mst.rkf \
      SET rkf_visi= ${visi}, rkf_misi= ${misi}, rkf_coreplan= ${cp}, rkf_kud= ${kud},  \
      rkf_proker= ${proker}, \
      rkf_status_proker= ${param_stsProker}, rkf_skala_proker= ${param_skalaProker}, rkf_kat_proker= ${param_katProker}, rkf_bsc= ${param_bsc}, \
      rkf_tlaudit= ${tlAudit}, rkf_konsultan= ${param_konsultan}, \
      rkf_unit_pelaksana= ${unitPel}, \
      rkf_tujuan_proker= ${tujuanProker}, rkf_indikator= ${indikatorKeberhasilan}, \
      rkf_targetfin= ${targetFin}, \
      rkf_jadwal= ${jadwalPelaksanaan}, \
      rkf_anggaran= ${anggaranArr}, \
      rkf_fungsilain= ${fungsiLainArr}, \
      rkf_transformasi_bpd= ${param_rkfTransformasiBPD}, \
      rkf_rakb= ${param_rkfRAKB}, \
      rkf_isu_strategis= ${rkfIsuStrategis} \
      WHERE rkf_id= ${rkfId} ',
      {
        rkfUser,
        rkfUserFrom,
        rkfTahun,
        rkfJenisId,
        unitPel,
        visi,
        misi,
        cp,
        kud,
        proker,

        param_stsProker,
        param_skalaProker,
        param_katProker,
        param_bsc,

        tlAudit,
        param_konsultan,
        tujuanProker,
        indikatorKeberhasilan,
        targetFin,
        jadwalPelaksanaan,
        anggaranArr,
        fungsiLainArr,
        rkfId,
        param_rkfTransformasiBPD,
        param_rkfRAKB,
        rkfIsuStrategis
      }
    )
    response.json('pass')
  } catch (error) {
    response.json(error)
    console.log(error)
  }
})

const getRKF = asyncro.asyncHandler(async (request, response, next) => {
  const divisi = request.params.divisi
  const tahun = request.params.tahun
  const jenisId = request.params.jenis

  const rkfdata = await db.any(
    'SELECT rkf_id, rkf_sts, bsc_nama, rkf_proker, skala_proker_nama, kat_proker_nama, \
      rkf_jadwal, \
      rkf_unit_pelaksana, rkf_transformasi_bpd, rkf_rakb, rkf_isu_strategis \
      FROM mst.rkf r \
      INNER JOIN mst.rkf_jenis j ON r.rkf_jenis_id = j.rkf_jenis_id \
      INNER JOIN mst.skala_proker ON rkf_skala_proker = skala_proker_id \
      INNER JOIN mst.kategori_proker ON rkf_kat_proker = kat_proker_id \
      INNER JOIN mst.bsc ON rkf_bsc = bsc_id \
      WHERE rkf_user_from = ${divisi} AND rkf_tahun = ${tahun} AND r.rkf_jenis_id = ${jenisId} ORDER BY rkf_id',
    { divisi, tahun, jenisId }
  )
  // karena menggunakan Function di PostgreSQL
  response.json(rkfdata)
})

const getRKFDetail = asyncro.asyncHandler(async (request, response, next) => {
  const rkfId = request.query.rkfId
  const rkfDetail = await db.any(
    'SELECT rkf_sts, rkf_id, rkf_user, rkf_user_from, rkf_tahun, rkf_jenis_id, \
      rkf_proker, rkf_status_proker, rkf_skala_proker, rkf_kat_proker, rkf_bsc, \
      rkf_tlaudit, rkf_konsultan, rkf_unit_pelaksana, rkf_visi, \
      rkf_misi, rkf_coreplan, rkf_kud, rkf_tujuan_proker, rkf_indikator, \
      rkf_targetfin, rkf_jadwal, rkf_anggaran, rkf_fungsilain, rkf_time_input, \
      rkf_note_otor, rkf_transformasi_bpd, rkf_rakb, rkf_isu_strategis \
      FROM mst.rkf \
      WHERE rkf_id = ${rkfId}',
    { rkfId }
  )
  response.json(rkfDetail)
})

const postOtoRKF = asyncro.asyncHandler(async (request, response, next) => {
  const rkfId = request.body.rkfId
  const rkfOtorUser = request.body.rkfOtorUser
  const rkfNewStatus = request.body.rkfNewStatus
  const rkfCatatanReview = request.body.rkfCatatanReview

  const otor = await db.none(
    'UPDATE mst.rkf SET \
      rkf_sts = ${rkfNewStatus}, \
      rkf_otor = ${rkfOtorUser}, \
      rkf_note_otor = ${rkfCatatanReview}, \
      rkf_time_otor = now() \
      WHERE rkf_id = ${rkfId}',
    { rkfNewStatus, rkfOtorUser, rkfCatatanReview, rkfId }
  )
  response.json('pass')
})

const getReport = asyncro.asyncHandler(async (request, response, next) => {
  const divisi = request.params.divisi
  const tahun = request.params.tahun
  const jenisId = request.params.jenis

  const report = await db.any(
    "SELECT rkf_id, rkf_proker, rkf_tujuan_proker, \
    rkf_indikator, rkf_jadwal, rkf_fungsilain, rkf_unit_pelaksana, rkf_kud, \
    rkf_kud, array(select mst.kud_get_nama((jsonb_array_elements(rkf_kud)->> 'kud')::int, rkf_tahun)) AS kud_nama, \
    rkf_bsc, 'PERSPEKTIF '|| upper(bsc_nama) AS perspektif, rkf_anggaran, \
    array( \
	select mst.posbiaya_get_nama((jsonb_array_elements(rkf_anggaran)->> 'posBiaya')::int) ||'|'||\
	(jsonb_array_elements(rkf_anggaran)->> 'posBiaya')||'|'||\
	(jsonb_array_elements(rkf_anggaran)->> 'coa')||'|'||\
	(jsonb_array_elements(rkf_anggaran)->> 'bulan')||'|'||\
	(jsonb_array_elements(rkf_anggaran)->> 'nominal')\
	) AS posbiaya, \
    rkf_status_proker, sts_proker_nama, rkf_skala_proker, skala_proker_nama, rkf_kat_proker, kat_proker_nama, \
    rkf_konsultan, rkf_tlaudit, \
    array(select mst.tlaudit_get_nama((jsonb_array_elements(rkf_tlaudit)->> 'tlAudit')::int)\
	 ||'|'||(jsonb_array_elements(rkf_tlaudit)->> 'tahunAudit')) AS audit_nama, \
    rkf_indikator, rkf_targetfin, rkf_fungsilain \
    , rkf_transformasi_bpd, rkf_rakb, rkf_isu_strategis \
    FROM mst.rkf \
    INNER JOIN mst.bsc ON rkf_bsc = bsc_id \
    INNER JOIN mst.status_proker ON rkf_status_proker = sts_proker_id \
    INNER JOIN mst.skala_proker ON rkf_skala_proker = skala_proker_id \
    INNER JOIN mst.kategori_proker ON rkf_kat_proker = kat_proker_id \
    WHERE rkf_user_from = ${divisi} AND rkf_tahun = ${tahun} AND rkf_jenis_id = ${jenisId} ORDER BY rkf_bsc, rkf_kud ",
    { divisi, tahun, jenisId }
  )
  try {
    return response.json(report)
  } catch (error) {
    return response.status(400).send(error)
  }
})

const getReportAll = asyncro.asyncHandler(async (request, response, next) => {
  const tahun = request.params.tahun
  const jenisId = request.params.jenis
  const report = await db.any(
    "SELECT rkf_user_from, rkf_proker, jsonb_array_elements(rkf_tujuan_proker) AS rkf_tujuan_proker, \
     rkf_jadwal, rkf_fungsilain, rkf_unit_pelaksana, \
    rkf_kud, rkf_bsc, 'PERSPEKTIF '|| upper(bsc_nama) AS perspektif, rkf_anggaran, \
    rkf_transformasi_bpd, rkf_rakb, \
    jsonb_array_elements_text(rkf_indikator->'rkf_indikator_output') AS rkf_indikator \
    FROM mst.rkf INNER JOIN mst.bsc ON rkf_bsc = bsc_id \
    WHERE rkf_tahun = ${tahun} AND rkf_jenis_id = ${jenisId} ORDER BY rkf_user_from, rkf_bsc, rkf_kud ",
    { tahun, jenisId }
  )
  // console.log('masuk pak eko....')
  try {
    return response.json(report)
  } catch (error) {
    return response.status(400).send(error)
  }
})


const postRKFGantiJenis = asyncro.asyncHandler(
  async (request, response, next) => {
    const rkfTahun = request.body.rkfTahun
    const rkfJenisBefore = request.body.rkfJenisBefore
    const rkfJenisAfter = request.body.rkfJenisAfter

    const otor = await db.any(
      'SELECT mst.rkf_ganti_jenis(${rkfTahun},${rkfJenisBefore},${rkfJenisAfter})',
      { rkfTahun, rkfJenisBefore, rkfJenisAfter }
    )
    response.json({ message: otor[0].rkf_ganti_jenis })
  }
)

const getRKFSumAll = asyncro.asyncHandler(async (request, response, next) => {
  const tahun = request.params.tahun
  const jenisId = request.params.jenis

  // console.log(jenisId);
  const allRKF = await db.any(
    "SELECT CASE WHEN rkf_sts = 0 THEN 'DRAFT' WHEN rkf_sts = 1 THEN 'APPROVED' WHEN rkf_sts = 2 THEN 'REVIEW' END as status, Count(*) as jumlah \
    FROM mst.rkf WHERE rkf_tahun = ${tahun} AND rkf_jenis_id = ${jenisId} GROUP BY rkf_sts ",
    { tahun, jenisId }
  )
  response.json(allRKF)
})

const getRKFGroupAll = asyncro.asyncHandler(async (request, response, next) => {
  const tahun = request.params.tahun
  const jenisId = request.params.jenis
  const allRKF = await db.any(
    "SELECT rkf_user_from, unit_kerja_nama, CASE WHEN rkf_sts = 0 THEN 'DRAFT' \
      WHEN rkf_sts = 1 THEN 'APPROVED' WHEN rkf_sts = 2 THEN 'REVIEW' END, Count(*) \
      FROM mst.rkf INNER JOIN mst.unit_kerja ON rkf_user_from = unit_kerja_id \
      WHERE rkf_tahun = ${tahun} AND rkf_jenis_id = ${jenisId} \
      GROUP BY rkf_user_from, unit_kerja_nama, rkf_sts  ORDER BY rkf_user_from, unit_kerja_nama, rkf_sts",
    { tahun, jenisId }
  )
  response.json(allRKF)
})

const getRKFSumDetail = asyncro.asyncHandler(
  async (request, response, next) => {
    const divisiId = request.params.divisi
    const tahun = request.params.tahun
    const jenisId = request.params.jenis
    const rkfsumdetail = await db.any(
      "SELECT CASE WHEN rkf_sts = 0 THEN 'DRAFT' WHEN rkf_sts = 1 THEN 'APPROVED' WHEN rkf_sts = 2 THEN 'REVIEW' END as status, Count(*) as jumlah \
    FROM mst.rkf WHERE rkf_user_from = ${divisiId} AND rkf_tahun = ${tahun} AND rkf_jenis_id = ${jenisId}  \
    GROUP BY rkf_sts",
      { divisiId, tahun, jenisId }
    )
    // console.log(divisiId);
    response.json(rkfsumdetail)
  }
)

const postAwal = asyncro.asyncHandler(async (request, response, next) => {
  const { tahun, jenis } = request.body
  const procAwal = await db.any(
    'UPDATE mst.periode SET periode_tahun = ${tahun}, periode_jenis =  ${jenis}',
    { tahun, jenis }
  )
  try {
    return response.status(201).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const delRKF = asyncro.asyncHandler(async (request, response, next) => {
  const id = request.params.id
  const deleteRKF = await db.any('DELETE FROM mst.rkf  WHERE rkf_id = ${id} ', {
    id
  })
  try {
    return response.status(200).send('deleted')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const postSupportRKFv1 = async (request, response, next) => {
  const { fromRKFId, toDivisi, toUser } = request.body

  try {
    const moveIt = await db.any(
      'SELECT mst.support_fungsi_lain (${fromRKFId}, ${toDivisi}, ${toUser}) AS rkf_id_new',
      { fromRKFId, toDivisi, toUser }
    )
    response.json(moveIt[0])
  } catch (error) {
    response.json(error)
  }
}

const postSupportRKF = async (request, response, next) => {
  const { rkfIdSupport } = request.body

  try {
    const moveIt = await db.any(
      'SELECT mst.support_fungsi_lain (${rkfIdSupport}) AS rkf_id_new',
      { rkfIdSupport }
    )
    response.json(moveIt[0])
  } catch (error) {
    response.json(error)
  }
}

const getSupportRKF = asyncro.asyncHandler(async (request, response, next) => {
  const divisi = request.params.divisi
  const rkfsumdetail = await db.any(
    'SELECT rkf_map_id_to \
    FROM mst.rkf_map WHERE rkf_map_divisi_to = ${divisi}  \
    ORDER BY rkf_map_id_to',
    { divisi }
  )
  response.json(rkfsumdetail)
})

const postSupportTempRKF = async (request, response, next) => {
  const { fromRKFId, toDivisi, toUser } = request.body

  try {
    const moveIt = await db.any(
      'SELECT tmp.temporary_support_fungsi_lain (${fromRKFId}, ${toDivisi}, ${toUser})',
      { fromRKFId, toDivisi, toUser }
    )
    response.json('created')
  } catch (error) {
    response.json(error)
  }
}

const delSupportTempRKF = asyncro.asyncHandler(async (request, response, next) => {
  const id = request.params.id
  const deleteRKF = await db.any('DELETE FROM tmp.rkf_support  WHERE rkf_id = ${id} ', {
    id
  })
  try {
    return response.status(200).send('deleted')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const getSupportTempRKF = asyncro.asyncHandler(async (request, response, next) => {
  const id = request.params.id
  const rkfDetail = await db.any(
    'SELECT rkf_id, rkf_user, rkf_user_from, rkf_tahun, rkf_jenis_id, \
      rkf_proker, rkf_status_proker, rkf_skala_proker, rkf_kat_proker, rkf_bsc, \
      rkf_tlaudit, rkf_konsultan, rkf_unit_pelaksana, rkf_visi, \
      rkf_misi, rkf_coreplan, rkf_kud, rkf_tujuan_proker, rkf_indikator, \
      rkf_targetfin, rkf_jadwal, rkf_anggaran, rkf_fungsilain, rkf_time_input, \
      rkf_note_otor, rkf_transformasi_bpd, rkf_rakb, rkf_isu_strategis \
      FROM tmp.rkf_support \
      WHERE rkf_id = ${id}',
    { id }
  )
  response.json(rkfDetail)
})

const putSupportTempRKF = asyncro.asyncHandler(async (request, response, next) => {
  // darisini----------
  const id = request.params.id
  const {
    rkfUser,
    rkfUserFrom,
    rkfTahun,
    rkfJenisId,
    selectedVisi,
    selectedMisi,
    selectedCorePlan,
    kudArr,
    proker,
    stsProker,
    skalaProker,
    katProker,
    bsc,
    tindakLanjutAudit,
    konsultan,
    tujuanProkerArr,
    indikatorKeberhasilanArr,
    targetFinansial,
    selectedBulan,
    anggaran,
    unitPelaksana,
    fungsiLain,
    rkfTransformasiBPD,
    rkfRAKB,
    isuStrategis
  } = request.body

  // define let for jsonb field
  const unitPel = JSON.stringify(unitPelaksana)
  const visi = JSON.stringify(selectedVisi)
  const misi = JSON.stringify(selectedMisi)
  const cp = JSON.stringify(selectedCorePlan)
  const kud = JSON.stringify(kudArr)
  const tlAudit = JSON.stringify(tindakLanjutAudit)
  const tujuanProker = JSON.stringify(tujuanProkerArr)
  const indikatorKeberhasilan = JSON.stringify(indikatorKeberhasilanArr)
  const targetFin = JSON.stringify(targetFinansial)
  let jadwalPelaksanaan
  if (selectedBulan.length > 0) {
    jadwalPelaksanaan = JSON.stringify(selectedBulan.sort())
  } else {
    jadwalPelaksanaan = JSON.stringify([])
  }
  const anggaranArr = JSON.stringify(anggaran)
  const fungsiLainArr = JSON.stringify(fungsiLain)
  console.log(fungsiLain)

  const param_rkfTransformasiBPD = rkfTransformasiBPD || 0
  const param_rkfRAKB = rkfRAKB || 0
  const param_stsProker = stsProker || 0
  const param_skalaProker = skalaProker || 0
  const param_katProker = katProker || 0
  const param_bsc = bsc || 0
  const param_konsultan = konsultan || 0
  const rkfIsuStrategis = JSON.stringify(isuStrategis)
  try {
    const update = await db.none(
      'UPDATE tmp.rkf_support \
      SET rkf_visi= ${visi}, rkf_misi= ${misi}, rkf_coreplan= ${cp}, rkf_kud= ${kud},  \
      rkf_proker= ${proker}, \
      rkf_status_proker= ${param_stsProker}, rkf_skala_proker= ${param_skalaProker}, rkf_kat_proker= ${param_katProker}, rkf_bsc= ${param_bsc}, \
      rkf_tlaudit= ${tlAudit}, rkf_konsultan= ${param_konsultan}, \
      rkf_unit_pelaksana= ${unitPel}, \
      rkf_tujuan_proker= ${tujuanProker}, rkf_indikator= ${indikatorKeberhasilan}, \
      rkf_targetfin= ${targetFin}, \
      rkf_jadwal= ${jadwalPelaksanaan}, \
      rkf_anggaran= ${anggaranArr}, \
      rkf_fungsilain= ${fungsiLainArr}, \
      rkf_transformasi_bpd= ${param_rkfTransformasiBPD}, \
      rkf_rakb= ${param_rkfRAKB}, \
      rkf_isu_strategis= ${rkfIsuStrategis} \
      WHERE rkf_id= ${id} ',
      {
        rkfUser,
        rkfUserFrom,
        rkfTahun,
        rkfJenisId,
        unitPel,
        visi,
        misi,
        cp,
        kud,
        proker,
        param_stsProker,
        param_skalaProker,
        param_katProker,
        param_bsc,
        tlAudit,
        param_konsultan,
        tujuanProker,
        indikatorKeberhasilan,
        targetFin,
        jadwalPelaksanaan,
        anggaranArr,
        fungsiLainArr,
        param_rkfTransformasiBPD,
        param_rkfRAKB,
        rkfIsuStrategis,
	id
      }
    )
    response.json('pass')
  } catch (error) {
    response.json(error)
    console.log(error)
  }
})

module.exports = {
  postRKF: postRKF,
  getRKF: getRKF,
  updateRKF: updateRKF,
  postOtoRKF: postOtoRKF,
  getRKFDetail: getRKFDetail,
  getReport: getReport,

  getReportAll: getReportAll,

  postRKFGantiJenis: postRKFGantiJenis,
  getRKFSumDetail: getRKFSumDetail,
  getRKFGroupAll: getRKFGroupAll,
  getRKFSumAll: getRKFSumAll,
  postAwal: postAwal,
  delRKF: delRKF,
  postSupportRKFv1: postSupportRKFv1,
  postSupportRKF: postSupportRKF,
  getSupportRKF: getSupportRKF,

  postSupportTempRKF: postSupportTempRKF,
  delSupportTempRKF: delSupportTempRKF,
  getSupportTempRKF: getSupportTempRKF,
  putSupportTempRKF: putSupportTempRKF

}

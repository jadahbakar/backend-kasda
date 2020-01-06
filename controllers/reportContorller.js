var db = require('../db/db')
var asyncro = require('../middleware/asyncro')

const getKUD = asyncro.asyncHandler(async (request, response, next) => {
  const divisi = request.params.divisi
  const tahun = request.params.tahun
  const jenisId = request.params.jenis

  const rkfdata = await db.any(
    "SELECT rkf_id, rkf_sts, rkf_proker,\
        rkf_bsc, bsc_nama,\
        r.rkf_jenis_id, rkf_jenis_nama,\
        rkf_skala_proker, skala_proker_nama,\
        rkf_kat_proker, kat_proker_nama,\
        rkf_jadwal,\
        rkf_unit_pelaksana, rkf_transformasi_bpd, rkf_rakb, rkf_isu_strategis, \
        (jsonb_array_elements\
            ( \
		    case \
            when jsonb_typeof(rkf_kud) = 'array' then rkf_kud \
            else jsonb_build_array(rkf_kud) \
            end  \
            ) ->> 'kud'):: int as kud \
        FROM mst.rkf r \
        LEFT JOIN mst.bsc ON rkf_bsc = bsc_id \
        LEFT JOIN mst.rkf_jenis j ON r.rkf_jenis_id = j.rkf_jenis_id \
        LEFT JOIN mst.skala_proker ON rkf_skala_proker = skala_proker_id \
        LEFT JOIN mst.kategori_proker ON rkf_kat_proker = kat_proker_id \
        WHERE rkf_user_from = ${divisi} AND rkf_tahun = ${tahun} AND r.rkf_jenis_id = ${jenisId} \
        ORDER BY kud, rkf_id",
    { divisi, tahun, jenisId }
  )

  response.json(rkfdata)
})

const getAdminKUD = asyncro.asyncHandler(async (request, response, next) => {
  const tahun = request.params.tahun
  const jenisId = request.params.jenis

  const rkfdata = await db.any(
    "SELECT SUBSTRING(rkf_user_from FROM 4 FOR 3) AS rkf_user_from, rkf_id, rkf_sts, rkf_proker,\
        rkf_bsc, bsc_nama,\
        r.rkf_jenis_id, rkf_jenis_nama,\
        rkf_skala_proker, skala_proker_nama,\
        rkf_kat_proker, kat_proker_nama,\
        rkf_jadwal,\
        rkf_unit_pelaksana, rkf_transformasi_bpd, rkf_rakb, rkf_isu_strategis, \
        (jsonb_array_elements\
            ( \
		    case \
            when jsonb_typeof(rkf_kud) = 'array' then rkf_kud \
            else jsonb_build_array(rkf_kud) \
            end  \
            ) ->> 'kud')::int as kud \
        FROM mst.rkf r \
        LEFT JOIN mst.bsc ON rkf_bsc = bsc_id \
        LEFT JOIN mst.rkf_jenis j ON r.rkf_jenis_id = j.rkf_jenis_id \
        LEFT JOIN mst.skala_proker ON rkf_skala_proker = skala_proker_id \
        LEFT JOIN mst.kategori_proker ON rkf_kat_proker = kat_proker_id \
        WHERE rkf_tahun = ${tahun} AND r.rkf_jenis_id = ${jenisId} \
        ORDER BY kud, rkf_user_from,  rkf_id",
    { tahun, jenisId }
  )

  response.json(rkfdata)
})

const getIsu = asyncro.asyncHandler(async (request, response, next) => {
  const divisi = request.params.divisi
  const tahun = request.params.tahun
  const jenisId = request.params.jenis

  const rkfdata = await db.any(
    "SELECT rkf_id, rkf_sts, rkf_proker,\
        rkf_bsc, bsc_nama,\
        r.rkf_jenis_id, rkf_jenis_nama,\
        rkf_skala_proker, skala_proker_nama,\
        rkf_kat_proker, kat_proker_nama,\
        rkf_jadwal,\
        rkf_unit_pelaksana, rkf_transformasi_bpd, rkf_rakb, rkf_isu_strategis, \
        (jsonb_array_elements\
            ( \
		    case \
            when jsonb_typeof(rkf_isu_strategis) = 'array' then rkf_isu_strategis \
            else jsonb_build_array(rkf_isu_strategis) \
            end  \
            ) ) as isu_strategis \
        FROM mst.rkf r \
        LEFT JOIN mst.bsc ON rkf_bsc = bsc_id \
        LEFT JOIN mst.rkf_jenis j ON r.rkf_jenis_id = j.rkf_jenis_id \
        LEFT JOIN mst.skala_proker ON rkf_skala_proker = skala_proker_id \
        LEFT JOIN mst.kategori_proker ON rkf_kat_proker = kat_proker_id \
        WHERE rkf_user_from = ${divisi} AND rkf_tahun = ${tahun} AND r.rkf_jenis_id = ${jenisId} \
        ORDER BY isu_strategis, rkf_id",
    { divisi, tahun, jenisId }
  )
  response.json(rkfdata)
})

const getAdminIsu = asyncro.asyncHandler(async (request, response, next) => {
  const divisi = request.params.divisi
  const tahun = request.params.tahun
  const jenisId = request.params.jenis

  const rkfdata = await db.any(
    "SELECT SUBSTRING(rkf_user_from FROM 4 FOR 3) AS rkf_user_from, rkf_id, rkf_sts, rkf_proker,\
        rkf_bsc, bsc_nama,\
        r.rkf_jenis_id, rkf_jenis_nama,\
        rkf_skala_proker, skala_proker_nama,\
        rkf_kat_proker, kat_proker_nama,\
        rkf_jadwal,\
        rkf_unit_pelaksana, rkf_transformasi_bpd, rkf_rakb, rkf_isu_strategis, \
        (jsonb_array_elements\
            ( \
		    case \
            when jsonb_typeof(rkf_isu_strategis) = 'array' then rkf_isu_strategis \
            else jsonb_build_array(rkf_isu_strategis) \
            end  \
            ) ) as isu_strategis \
        FROM mst.rkf r \
        LEFT JOIN mst.bsc ON rkf_bsc = bsc_id \
        LEFT JOIN mst.rkf_jenis j ON r.rkf_jenis_id = j.rkf_jenis_id \
        LEFT JOIN mst.skala_proker ON rkf_skala_proker = skala_proker_id \
        LEFT JOIN mst.kategori_proker ON rkf_kat_proker = kat_proker_id \
        WHERE rkf_tahun = ${tahun} AND r.rkf_jenis_id = ${jenisId} \
        ORDER BY rkf_user_from, isu_strategis, rkf_id",
    { tahun, jenisId }
  )
  response.json(rkfdata)
})

const getTransformasiBPD = asyncro.asyncHandler(
  async (request, response, next) => {
    const divisi = request.params.divisi
    const tahun = request.params.tahun
    const jenisId = request.params.jenis

    const transformasiData = await db.any(
      'SELECT rkf_id, rkf_sts, rkf_proker,\
        rkf_bsc, bsc_nama,\
        r.rkf_jenis_id, rkf_jenis_nama,\
        rkf_skala_proker, skala_proker_nama,\
        rkf_kat_proker, kat_proker_nama,\
        rkf_jadwal,\
        rkf_unit_pelaksana, rkf_rakb, \
        rkf_transformasi_bpd, transformasi_bpd_nama \
        FROM mst.rkf r \
        LEFT JOIN mst.bsc ON rkf_bsc = bsc_id \
        LEFT JOIN mst.rkf_jenis j ON r.rkf_jenis_id = j.rkf_jenis_id \
        LEFT JOIN mst.skala_proker ON rkf_skala_proker = skala_proker_id \
        LEFT JOIN mst.kategori_proker ON rkf_kat_proker = kat_proker_id \
        LEFT JOIN mst.transformasi_bpd ON rkf_transformasi_bpd = transformasi_bpd_id \
        WHERE rkf_user_from = ${divisi} AND rkf_tahun = ${tahun} AND r.rkf_jenis_id = ${jenisId} \
        ORDER BY rkf_transformasi_bpd, rkf_id',
      { divisi, tahun, jenisId }
    )
    response.json(transformasiData)
  }
)

const getAdminTransformasiBPD = asyncro.asyncHandler(
  async (request, response, next) => {
    const tahun = request.params.tahun
    const jenisId = request.params.jenis

    const transformasiData = await db.any(
      'SELECT SUBSTRING(rkf_user_from FROM 4 FOR 3) AS rkf_user_from, rkf_id, rkf_sts, rkf_proker,\
        rkf_bsc, bsc_nama,\
        r.rkf_jenis_id, rkf_jenis_nama,\
        rkf_skala_proker, skala_proker_nama,\
        rkf_kat_proker, kat_proker_nama,\
        rkf_jadwal,\
        rkf_unit_pelaksana, rkf_rakb, \
        rkf_transformasi_bpd, transformasi_bpd_nama \
        FROM mst.rkf r \
        LEFT JOIN mst.bsc ON rkf_bsc = bsc_id \
        LEFT JOIN mst.rkf_jenis j ON r.rkf_jenis_id = j.rkf_jenis_id \
        LEFT JOIN mst.skala_proker ON rkf_skala_proker = skala_proker_id \
        LEFT JOIN mst.kategori_proker ON rkf_kat_proker = kat_proker_id \
        LEFT JOIN mst.transformasi_bpd ON rkf_transformasi_bpd = transformasi_bpd_id \
        WHERE rkf_tahun = ${tahun} AND r.rkf_jenis_id = ${jenisId} \
        ORDER BY rkf_user_from, rkf_transformasi_bpd, rkf_id',
      { tahun, jenisId }
    )
    response.json(transformasiData)
  }
)

const getRAKB = asyncro.asyncHandler(async (request, response, next) => {
  const divisi = request.params.divisi
  const tahun = request.params.tahun
  const jenisId = request.params.jenis

  const rakbData = await db.any(
    'SELECT rkf_id, rkf_sts, rkf_proker,\
        rkf_bsc, bsc_nama,\
        r.rkf_jenis_id, rkf_jenis_nama,\
        rkf_skala_proker, skala_proker_nama,\
        rkf_kat_proker, kat_proker_nama,\
        rkf_jadwal,\
        rkf_unit_pelaksana, rkf_transformasi_bpd, rkf_rakb, rakb_nama \
        FROM mst.rkf r \
        LEFT JOIN mst.bsc ON rkf_bsc = bsc_id \
        LEFT JOIN mst.rkf_jenis j ON r.rkf_jenis_id = j.rkf_jenis_id \
        LEFT JOIN mst.skala_proker ON rkf_skala_proker = skala_proker_id \
        LEFT JOIN mst.kategori_proker ON rkf_kat_proker = kat_proker_id \
        LEFT JOIN mst.rakb ON rkf_rakb = rakb_id \
        WHERE rkf_user_from = ${divisi} AND rkf_tahun = ${tahun} AND r.rkf_jenis_id = ${jenisId} \
        ORDER BY rkf_transformasi_bpd, rkf_id',
    { divisi, tahun, jenisId }
  )
  response.json(rakbData)
})

const getAdminRAKB = asyncro.asyncHandler(async (request, response, next) => {
  const tahun = request.params.tahun
  const jenisId = request.params.jenis

  const rakbData = await db.any(
    'SELECT SUBSTRING(rkf_user_from FROM 4 FOR 3) AS rkf_user_from, rkf_id, rkf_sts, rkf_proker,\
        rkf_bsc, bsc_nama,\
        r.rkf_jenis_id, rkf_jenis_nama,\
        rkf_skala_proker, skala_proker_nama,\
        rkf_kat_proker, kat_proker_nama,\
        rkf_jadwal,\
        rkf_unit_pelaksana, rkf_transformasi_bpd, rkf_rakb, rakb_nama \
        FROM mst.rkf r \
        LEFT JOIN mst.bsc ON rkf_bsc = bsc_id \
        LEFT JOIN mst.rkf_jenis j ON r.rkf_jenis_id = j.rkf_jenis_id \
        LEFT JOIN mst.skala_proker ON rkf_skala_proker = skala_proker_id \
        LEFT JOIN mst.kategori_proker ON rkf_kat_proker = kat_proker_id \
        LEFT JOIN mst.rakb ON rkf_rakb = rakb_id \
        WHERE rkf_tahun = ${tahun} AND r.rkf_jenis_id = ${jenisId} \
        ORDER BY rkf_user_from, rkf_transformasi_bpd, rkf_id',
    { tahun, jenisId }
  )
  response.json(rakbData)
})

const getAudit = asyncro.asyncHandler(async (request, response, next) => {
  const divisi = request.params.divisi
  const tahun = request.params.tahun
  const jenisId = request.params.jenis

  const auditData = await db.any(
    "SELECT rkf_id, rkf_sts, rkf_proker,\
        rkf_bsc, bsc_nama,\
        r.rkf_jenis_id, rkf_jenis_nama,\
        rkf_skala_proker, skala_proker_nama,\
        rkf_kat_proker, kat_proker_nama,\
        rkf_jadwal,\
        rkf_unit_pelaksana, rkf_tlaudit, \
        array(select mst.tlaudit_get_nama((jsonb_array_elements(rkf_tlaudit)->> 'tlAudit')::int) \
        || '|' || (jsonb_array_elements(rkf_tlaudit) ->> 'tahunAudit')) AS audit_nama \
        FROM mst.rkf r \
        LEFT JOIN mst.bsc ON rkf_bsc = bsc_id \
        LEFT JOIN mst.rkf_jenis j ON r.rkf_jenis_id = j.rkf_jenis_id \
        LEFT JOIN mst.skala_proker ON rkf_skala_proker = skala_proker_id \
        LEFT JOIN mst.kategori_proker ON rkf_kat_proker = kat_proker_id \
        LEFT JOIN mst.rakb ON rkf_rakb = rakb_id \
        WHERE rkf_user_from = ${divisi} AND rkf_tahun = ${tahun} AND r.rkf_jenis_id = ${jenisId} \
        ORDER BY rkf_transformasi_bpd, rkf_id",
    { divisi, tahun, jenisId }
  )
  response.json(auditData)
})

const getAdminAudit = asyncro.asyncHandler(async (request, response, next) => {
  const tahun = request.params.tahun
  const jenisId = request.params.jenis

  const auditData = await db.any(
    "SELECT SUBSTRING(rkf_user_from FROM 4 FOR 3) AS rkf_user_from, rkf_id, rkf_sts, rkf_proker,\
        rkf_bsc, bsc_nama,\
        r.rkf_jenis_id, rkf_jenis_nama,\
        rkf_skala_proker, skala_proker_nama,\
        rkf_kat_proker, kat_proker_nama,\
        rkf_jadwal,\
         rkf_unit_pelaksana, rkf_tlaudit, \
        array(select mst.tlaudit_get_nama((jsonb_array_elements(rkf_tlaudit)->> 'tlAudit')::int) \
        || '| ' || (jsonb_array_elements(rkf_tlaudit) ->> 'tahunAudit')) AS audit_nama \
        FROM mst.rkf r \
        LEFT JOIN mst.bsc ON rkf_bsc = bsc_id \
        LEFT JOIN mst.rkf_jenis j ON r.rkf_jenis_id = j.rkf_jenis_id \
        LEFT JOIN mst.skala_proker ON rkf_skala_proker = skala_proker_id \
        LEFT JOIN mst.kategori_proker ON rkf_kat_proker = kat_proker_id \
        LEFT JOIN mst.rakb ON rkf_rakb = rakb_id \
        WHERE rkf_tahun = ${tahun} AND r.rkf_jenis_id = ${jenisId} \
        ORDER BY rkf_user_from, rkf_transformasi_bpd, rkf_id",
    { tahun, jenisId }
  )
  response.json(auditData)
})

const getLaporanRKF = asyncro.asyncHandler(async (request, response, next) => {
  const tahun = request.params.tahun
  const jenisId = request.params.jenis

  const laporanRKF = await db.any(
    "SELECT rkf_id, rkf_user_from, rkf_proker, jsonb_array_elements(rkf_tujuan_proker) AS rkf_tujuan_proker, \
     rkf_jadwal, rkf_fungsilain, rkf_unit_pelaksana, \
    rkf_kud, rkf_bsc, 'PERSPEKTIF '|| upper(bsc_nama) AS perspektif, rkf_anggaran, \
    rkf_transformasi_bpd, rkf_rakb, \
    jsonb_array_elements_text(rkf_indikator->'rkf_indikator_output') AS rkf_indikator \
    FROM mst.rkf INNER JOIN mst.bsc ON rkf_bsc = bsc_id \
    WHERE rkf_tahun = ${tahun} AND rkf_jenis_id = ${jenisId} ORDER BY rkf_user_from, rkf_bsc, rkf_kud ",
    { tahun, jenisId }
  )
  response.json(laporanRKF)
})

const getAdminKatProker = asyncro.asyncHandler(async (request, response, next) => {
  const tahun = request.params.tahun
  const jenisId = request.params.jenis

  const rkfdata = await db.any(
    'SELECT SUBSTRING(rkf_user_from FROM 4 FOR 3) AS rkf_user_from, rkf_id, rkf_sts, rkf_proker,\
        rkf_bsc, bsc_nama,\
        r.rkf_jenis_id, rkf_jenis_nama,\
        rkf_skala_proker, skala_proker_nama,\
        rkf_kat_proker, kat_proker_nama,\
        rkf_jadwal,\
        rkf_unit_pelaksana, rkf_transformasi_bpd, rkf_rakb, rkf_isu_strategis \
        FROM mst.rkf r \
        LEFT JOIN mst.bsc ON rkf_bsc = bsc_id \
        LEFT JOIN mst.rkf_jenis j ON r.rkf_jenis_id = j.rkf_jenis_id \
        LEFT JOIN mst.skala_proker ON rkf_skala_proker = skala_proker_id \
        LEFT JOIN mst.kategori_proker ON rkf_kat_proker = kat_proker_id \
        WHERE rkf_tahun = ${tahun} AND r.rkf_jenis_id = ${jenisId} \
        ORDER BY rkf_user_from, rkf_id',
    { tahun, jenisId }
  )

  response.json(rkfdata)
})

module.exports = {
  getKUD: getKUD,
  getAdminKUD: getAdminKUD,
  getIsu: getIsu,
  getAdminIsu: getAdminIsu,
  getTransformasiBPD: getTransformasiBPD,
  getAdminTransformasiBPD: getAdminTransformasiBPD,
  getRAKB: getRAKB,
  getAdminRAKB: getAdminRAKB,
  getAudit: getAudit,
  getAdminAudit: getAdminAudit,
  getLaporanRKF: getLaporanRKF,
  getAdminKatProker: getAdminKatProker
}

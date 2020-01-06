var db = require('../db/db')
var asyncro = require('../middleware/asyncro')

const getAllMaster = asyncro.asyncHandler(async (request, response, next) => {
  const yearNow = new Date().getFullYear()
  // let allJabatan = await db.any(
  //   'SELECT jabatan_id, jabatan_nama FROM mst.jabatan'
  // );
  const allVisi = await db.any('SELECT visi_id, visi_nama FROM mst.visi')
  const allMisi = await db.any('SELECT misi_id, misi_nama FROM mst.misi')
  const allCorePlan = await db.any(
    'SELECT cp_id, cp_kode, cp_nama FROM mst.coreplan'
  )
  const allKUD = await db.any(
    'SELECT kud_tahun, kud_id, kud_nama FROM mst.kud ORDER BY kud_tahun, kud_id'
  )
  const allStsProker = await db.any(
    'SELECT sts_proker_id, sts_proker_nama FROM mst.status_proker WHERE sts_proker_sts = 1 ORDER BY sts_proker_id'
  )
  const allKatProker = await db.any(
    'SELECT kat_proker_id, kat_proker_nama FROM mst.kategori_proker WHERE kat_proker_sts = 1 ORDER BY kat_proker_id'
  )
  const allSkalaProker = await db.any(
    'SELECT skala_proker_id, skala_proker_nama FROM mst.skala_proker WHERE skala_proker_sts = 1 ORDER BY skala_proker_id'
  )
  const allBSC = await db.any(
    'SELECT bsc_id, bsc_nama FROM mst.bsc WHERE bsc_sts = 1 ORDER BY bsc_id'
  )
  const allTLAudit = await db.any(
    'SELECT tindak_lanjut_id, tindak_lanjut_nama FROM mst.tindak_lanjut WHERE tindak_lanjut_sts = 1 ORDER BY tindak_lanjut_id'
  )
  const allSatuan = await db.any(
    'SELECT satuan_id, satuan_nama FROM mst.satuan WHERE satuan_sts = 1 ORDER BY satuan_id'
  )
  // let allUnitKerja = await db.any(
  //   "SELECT uker_id, uker_nama FROM mst.unitkerja WHERE uker_sts = 1 AND uker_kategori= 'new'"
  // );
  const allPosBiaya = await db.any(
    'SELECT posbiaya_id, posbiaya_nama FROM mst.posbiaya WHERE posbiaya_sts = 1 ORDER BY posbiaya_id'
  )
  const allDivisi = await db.any('SELECT mst.divisi()')
  const divisi = allDivisi[0].divisi

  response.json({
    // allJabatan,
    allVisi,
    allMisi,
    allCorePlan,
    allKUD,
    allStsProker,
    allKatProker,
    allSkalaProker,
    allBSC,
    allTLAudit,
    allSatuan,
    // allUnitKerja,
    allPosBiaya,
    divisi
  })
})

const getVisiMisi = asyncro.asyncHandler(async (request, response, next) => {
  const allVisi = await db.any('SELECT visi_id, visi_nama FROM mst.visi')
  const allMisi = await db.any('SELECT misi_id, misi_nama FROM mst.misi')
  response.json({ allVisi, allMisi })
})

const getCPKUD = asyncro.asyncHandler(async (request, response, next) => {
  // const yearNow = new Date().getFullYear();
  const tahun = request.params.tahun
  const allCorePlan = await db.any(
    'SELECT cp_id, cp_kode, cp_nama FROM mst.coreplan'
  )
  const allKUD = await db.any(
    'SELECT kud_tahun, kud_id, kud_nama FROM mst.kud WHERE kud_tahun = ${tahun} ORDER BY kud_id',
    { tahun }
  )
  response.json({ allCorePlan, allKUD })
})

const getIsuStrategis = asyncro.asyncHandler(
  async (request, response, next) => {
    const tahun = request.params.tahun
    const allIsuStrategis = await db.any(
      'SELECT isu_strategis_id, isu_strategis_nama FROM mst.isu_strategis \
    WHERE isu_strategis_tahun = ${tahun} \
    ORDER BY isu_strategis_id',
      { tahun }
    )

    response.json(allIsuStrategis)
  }
)

// const getUnitKerja = asyncro.asyncHandler(async (request, response, next) => {
//   let unitKerjaId = request.query.unitKerjaId;
//   let jabatanId = request.query.jabatanId;
//   let unitKerja = await db.any(
//     'SELECT mst.jabatan_per_unitkerja(${unitKerjaId},${jabatanId})',
//     { unitKerjaId, jabatanId }
//   );
//   // karena menggunakan Function di PostgreSQL
//   response.json(unitKerja[0].jabatan_per_unitkerja);
// });

// const getPegawaiUnitKerja = asyncro.asyncHandler(
//   async (request, response, next) => {
//     let unitKerjaId = request.query.unitKerjaId;
//     let jabatanId = request.query.jabatanId;
//     let unitKerja = await db.any(
//       'SELECT mst.pegawai_per_unitkerja(${unitKerjaId},${jabatanId})',
//       { unitKerjaId, jabatanId }
//     );
//     // karena menggunakan Function di PostgreSQL
//     response.json(unitKerja[0].pegawai_per_unitkerja);
//   }
// );

// const getPegawaiDivisi = asyncro.asyncHandler(
//   async (request, response, next) => {
//     let unitKerjaId = request.query.unitKerjaId;
//     let pegawaiDivisi = await db.any(
//       'SELECT mst.pegawai_per_divisi(${unitKerjaId})',
//       { unitKerjaId }
//     );
//     // karena menggunakan Function di PostgreSQL
//     response.json(pegawaiDivisi[0].pegawai_per_divisi);
//   }
// );

// CorePlan ---------------------------------------
const getCorePlan = asyncro.asyncHandler(async (request, response, next) => {
  const allCorePlan = await db.any(
    'SELECT cp_id, cp_kode, cp_nama FROM mst.coreplan'
  )
  response.json({ allCorePlan })
})

const postCorePlan = asyncro.asyncHandler(async (request, response, next) => {
  const { cpKode, cpNama } = request.body
  const allCorePlan = await db.any(
    'INSERT INTO mst.coreplan(cp_kode, cp_nama) VALUES ( ${cpKode}, ${cpNama} )',
    { cpKode, cpNama }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

// const putCorePlan = asyncro.asyncHandler(async (request, response, next) => {
//   // console.log(request.body);
//   const { cpKode, cpNama } = request.body;
//   const cpId = request.params.cpId;
//   let allCorePlan = await db.any(
//     'UPDATE mst.coreplan SET cp_kode = ${cpKode}, cp_nama = ${cpNama} WHERE cp_id = ${cpId} ',
//     { cpKode, cpNama, cpId }
//   );
//   try {
//     return response.status(200).send('updated');
//   } catch (error) {
//     return response.status(400).send(error);
//   }
// });

// const delCorePlan = asyncro.asyncHandler(async (request, response, next) => {
//   const cpId = request.params.cpId;
//   let allCorePlan = await db.any(
//     'DELETE FROM mst.coreplan  WHERE cp_id = ${cpId} ',
//     { cpId }
//   );
//   try {
//     return response.status(200).send('deleted');
//   } catch (error) {
//     return response.status(400).send(error);
//   }
// });

// KUD ---------------------------------------
const getKUD = asyncro.asyncHandler(async (request, response, next) => {
  const allKUD = await db.any('SELECT kud_id, kud_tahun, kud_nama FROM mst.kud')
  response.json(allKUD)
})

const getKUDOne = asyncro.asyncHandler(async (request, response, next) => {
  const kudId = request.params.kudId
  const allKUD = await db.any(
    'SELECT kud_id, kud_tahun, kud_nama FROM mst.kud WHERE kud_id = ${kudId} ',
    { kudId }
  )
  response.json(allKUD)
})

const postKUD = asyncro.asyncHandler(async (request, response, next) => {
  const { kudTahun, kudNama } = request.body
  const allCorePlan = await db.any(
    'INSERT INTO mst.kud(kud_tahun, kud_nama) VALUES ( ${kudTahun}, ${kudNama} )',
    { kudTahun, kudNama }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const putKUD = asyncro.asyncHandler(async (request, response, next) => {
  const { kudTahun, kudNama } = request.body
  const kudId = request.params.kudId
  const allCorePlan = await db.any(
    'UPDATE mst.kud SET kud_tahun = ${kudTahun}, kud_nama = ${kudNama} WHERE kud_id = ${kudId} ',
    { kudTahun, kudNama, kudId }
  )
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const delKUD = asyncro.asyncHandler(async (request, response, next) => {
  const kudId = request.params.kudId
  const allCorePlan = await db.any(
    'DELETE FROM mst.kud  WHERE kud_id = ${kudId} ',
    { kudId }
  )
  try {
    return response.status(200).send('deleted')
  } catch (error) {
    return response.status(400).send(error)
  }
})

// Status ProKer ---------------------------------------
const getStsProKerAll = asyncro.asyncHandler(
  async (request, response, next) => {
    const allStsProker = await db.any(
      'SELECT sts_proker_id, sts_proker_sts, sts_proker_nama FROM mst.status_proker'
    )
    response.json({ allStsProker })
  }
)

const getStsProKer = asyncro.asyncHandler(async (request, response, next) => {
  const allStsProker = await db.any(
    'SELECT sts_proker_id, sts_proker_nama FROM mst.status_proker WHERE sts_proker_sts = 1 ORDER BY sts_proker_id'
  )
  response.json(allStsProker)
})

const postStsProKer = asyncro.asyncHandler(async (request, response, next) => {
  const { spNama } = request.body
  const allCorePlan = await db.any(
    'INSERT INTO mst.status_proker(sts_proker_nama) VALUES (  ${spNama} )',
    { spNama }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const putStsProKer = asyncro.asyncHandler(async (request, response, next) => {
  const { spSts, spNama } = request.body
  const spId = request.params.spId
  const allCorePlan = await db.any(
    'UPDATE mst.status_proker SET sts_proker_sts = ${spSts}, sts_proker_nama = ${spNama} WHERE sts_proker_id = ${spId} ',
    { spSts, spNama, spId }
  )
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const delStsProKer = asyncro.asyncHandler(async (request, response, next) => {
  const spId = request.params.spId
  const allCorePlan = await db.any(
    'DELETE FROM mst.status_proker  WHERE sts_proker_id = ${spId} ',
    { spId }
  )
  try {
    return response.status(200).send('deleted')
  } catch (error) {
    return response.status(400).send(error)
  }
})

// Skala ProKer ---------------------------------------
const getSkalaProKerAll = asyncro.asyncHandler(
  async (request, response, next) => {
    const allSkalaProker = await db.any(
      'SELECT skala_proker_id, skala_proker_sts, skala_proker_nama FROM mst.skala_proker'
    )
    response.json(allSkalaProker)
  }
)

const getSkalaProKer = asyncro.asyncHandler(async (request, response, next) => {
  const skalaProker = await db.any(
    'SELECT skala_proker_id, skala_proker_nama FROM mst.skala_proker WHERE skala_proker_sts = 1'
  )
  response.json(skalaProker)
})

const postSkalaProKer = asyncro.asyncHandler(
  async (request, response, next) => {
    const { spNama } = request.body
    const procPost = await db.any(
      'INSERT INTO mst.skala_proker(skala_proker_nama) VALUES (${spNama} )',
      { spNama }
    )
    try {
      return response.status(201).send('created')
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const putSkalaProKer = asyncro.asyncHandler(async (request, response, next) => {
  const { spSts, spNama } = request.body
  const spId = request.params.spId
  const procUpdate = await db.any(
    'UPDATE mst.skala_proker SET skala_proker_sts = ${spSts}, skala_proker_nama = ${spNama} WHERE skala_proker_id = ${spId} ',
    { spSts, spNama, spId }
  )
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const delSkalaProKer = asyncro.asyncHandler(async (request, response, next) => {
  const spId = request.params.spId
  const procDel = await db.any(
    'DELETE FROM mst.skala_proker WHERE skala_proker_id = ${spId} ',
    { spId }
  )
  try {
    return response.status(200).send('deleted')
  } catch (error) {
    return response.status(400).send(error)
  }
})

// Katergori ProKer ---------------------------------------
const getKatProKerAll = asyncro.asyncHandler(async (request, respon, next) => {
  const allKatProker = await db.any(
    'SELECT kat_proker_id, kat_proker_sts, kat_proker_nama FROM mst.kategori_proker'
  )
  respon.json(allKatProker)
})

const getKatProKer = asyncro.asyncHandler(async (request, respon, next) => {
  const KatProker = await db.any(
    'SELECT kat_proker_id, kat_proker_nama FROM mst.kategori_proker WHERE kat_proker_sts = 1'
  )
  respon.json(KatProker)
})

const postKatProKer = asyncro.asyncHandler(async (request, response, next) => {
  const { kpNama } = request.body
  const procPost = await db.any(
    'INSERT INTO mst.kategori_proker(kat_proker_nama) VALUES (${kpNama} )',
    { kpNama }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const putKatProKer = asyncro.asyncHandler(async (request, response, next) => {
  const { kpSts, kpNama } = request.body
  const kpId = request.params.kpId
  const procUpdate = await db.any(
    'UPDATE mst.kategori_proker SET kat_proker_sts = ${kpSts}, kat_proker_nama = ${kpNama} WHERE kat_proker_id = ${kpId} ',
    { kpSts, kpNama, kpId }
  )
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const delKatProKer = asyncro.asyncHandler(async (request, response, next) => {
  const kpId = request.params.kpId
  const procDel = await db.any(
    'DELETE FROM mst.kategori_proker WHERE kat_proker_id = ${kpId} ',
    { kpId }
  )
  try {
    return response.status(200).send('deleted')
  } catch (error) {
    return response.status(400).send(error)
  }
})

// BSC ----------------------------------------------------
const getBSCAll = asyncro.asyncHandler(async (request, response, next) => {
  const getBSCAll = await db.any('SELECT bsc_id, bsc_sts, bsc_nama FROM mst.bsc')
  response.json(getBSCAll)
})

const getBSC = asyncro.asyncHandler(async (request, response, next) => {
  const getBSC = await db.any(
    'SELECT bsc_id, bsc_nama FROM mst.bsc WHERE bsc_sts = 1'
  )
  response.json(getBSC)
})

const postBSC = asyncro.asyncHandler(async (request, response, next) => {
  const { bscNama } = request.body
  const procPost = await db.any(
    'INSERT INTO mst.bsc(bsc_nama) VALUES (${bscNama} )',
    { bscNama }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const putBSC = asyncro.asyncHandler(async (request, response, next) => {
  const { bscSts, bscNama } = request.body
  const bscId = request.params.bscId
  const procUpdate = await db.any(
    'UPDATE mst.bsc SET bsc_sts = ${bscSts}, bsc_nama = ${bscNama} WHERE bsc_id = ${bscId} ',
    { bscSts, bscNama, bscId }
  )
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const delBSC = asyncro.asyncHandler(async (request, response, next) => {
  const bscId = request.params.bscId
  const procDel = await db.any('DELETE FROM mst.bsc WHERE bsc_id = ${bscId} ', {
    bscId
  })
  try {
    return response.status(200).send('deleted')
  } catch (error) {
    return response.status(400).send(error)
  }
})

// TL Audit ----------------------------------------------------
const getTLAuditAll = asyncro.asyncHandler(async (request, response, next) => {
  const allTL = await db.any(
    'SELECT tindak_lanjut_id, tindak_lanjut_sts, tindak_lanjut_nama FROM mst.tindak_lanjut'
  )
  response.json(allTL)
})

const getTLAudit = asyncro.asyncHandler(async (request, response, next) => {
  const TL = await db.any(
    'SELECT tindak_lanjut_id, tindak_lanjut_nama FROM mst.tindak_lanjut WHERE tindak_lanjut_sts = 1'
  )
  response.json(TL)
})

const postTLAudit = asyncro.asyncHandler(async (request, response, next) => {
  const { tlaNama } = request.body
  const procPost = await db.any(
    'INSERT INTO mst.tindak_lanjut(tindak_lanjut_nama) VALUES (${tlaNama} )',
    { tlaNama }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const putTLAudit = asyncro.asyncHandler(async (request, response, next) => {
  const { tlaSts, tlaNama } = request.body
  const tlaId = request.params.tlaId
  const procUpdate = await db.any(
    'UPDATE mst.tindak_lanjut SET tindak_lanjut_sts = ${tlaSts}, tindak_lanjut_nama = ${tlaNama} WHERE tindak_lanjut_id = ${tlaId} ',
    { tlaSts, tlaNama, tlaId }
  )
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const delTLAudit = asyncro.asyncHandler(async (request, response, next) => {
  const tlaId = request.params.tlaId
  const procDel = await db.any(
    'DELETE FROM mst.tindak_lanjut WHERE tindak_lanjut_id = ${tlaId} ',
    { tlaId }
  )
  try {
    return response.status(200).send('deleted')
  } catch (error) {
    return response.status(400).send(error)
  }
})

// Satuan ----------------------------------------------------
const getSatuanAll = asyncro.asyncHandler(async (request, response, next) => {
  const allSatuan = await db.any(
    'SELECT satuan_id, satuan_sts, satuan_nama FROM mst.satuan'
  )
  response.json(allSatuan)
})

const getSatuan = asyncro.asyncHandler(async (request, response, next) => {
  const Satuan = await db.any(
    'SELECT satuan_id, satuan_nama FROM mst.satuan WHERE satuan_sts = 1'
  )
  response.json(Satuan)
})

const postSatuan = asyncro.asyncHandler(async (request, response, next) => {
  const { satNama } = request.body
  const procPost = await db.any(
    'INSERT INTO mst.satuan(satuan_nama) VALUES (${satNama} )',
    { satNama }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const putSatuan = asyncro.asyncHandler(async (request, response, next) => {
  const { satSts, satNama } = request.body
  const satId = request.params.satId
  const procUpdate = await db.any(
    'UPDATE mst.satuan SET satuan_sts = ${satSts}, satuan_nama = ${satNama} WHERE satuan_id = ${satId} ',
    { satSts, satNama, satId }
  )
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const delSatuan = asyncro.asyncHandler(async (request, response, next) => {
  const satId = request.params.satId
  const procDel = await db.any(
    'DELETE FROM mst.satuan WHERE satuan_id = ${satId} ',
    { satId }
  )
  try {
    return response.status(200).send('deleted')
  } catch (error) {
    return response.status(400).send(error)
  }
})

// Pos Biaya ----------------------------------------------------
const getPosBiayaAll = asyncro.asyncHandler(async (request, response, next) => {
  const allPosBiaya = await db.any(
    'SELECT posbiaya_id, posbiaya_sts, posbiaya_nama FROM mst.posbiaya'
  )
  response.json(allPosBiaya)
})

const getPosBiaya = asyncro.asyncHandler(async (request, response, next) => {
  const posbiaya = await db.any(
    'SELECT posbiaya_id, posbiaya_nama FROM mst.posbiaya WHERE posbiaya_sts = 1'
  )
  response.json(posbiaya)
})

const postPosBiaya = asyncro.asyncHandler(async (request, response, next) => {
  const { posNama } = request.body
  const procPost = await db.any(
    'INSERT INTO mst.posbiaya(posbiaya_nama) VALUES (${posNama} )',
    { posNama }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const putPosBiaya = asyncro.asyncHandler(async (request, response, next) => {
  const { posSts, posNama } = request.body
  const posId = request.params.posId
  const procUpdate = await db.any(
    'UPDATE mst.posbiaya SET posbiaya_sts = ${posSts}, posbiaya_nama = ${posNama} WHERE posbiaya_id = ${posId} ',
    { posSts, posNama, posId }
  )
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const delPosBiaya = asyncro.asyncHandler(async (request, response, next) => {
  const posId = request.params.posId
  const procDel = await db.any(
    'DELETE FROM mst.posbiaya WHERE posbiaya_id = ${posId} ',
    { posId }
  )
  try {
    return response.status(200).send('deleted')
  } catch (error) {
    return response.status(400).send(error)
  }
})

// Jenis RKF ----------------------------------------------------
const getJenisRKF = asyncro.asyncHandler(async (request, response, next) => {
  const allJenisRKF = await db.any(
    'SELECT rkf_jenis_id, rkf_jenis_nama FROM mst.rkf_jenis'
  )
  response.json(allJenisRKF)
})

// Periode RKF ----------------------------------------------------
const getPeriodeRKF = asyncro.asyncHandler(async (request, response, next) => {
  const tahun = request.params.tahun
  const allperiodeRKF = await db.any(
    'SELECT periode_jenis, rkf_jenis_nama FROM mst.periode INNER JOIN mst.rkf_jenis ON periode_jenis = rkf_jenis_id WHERE periode_tahun = ${tahun}',
    { tahun }
  )
  response.json(allperiodeRKF[0])
})

const postPeriodeRKF = asyncro.asyncHandler(async (request, response, next) => {
  const { tahun } = request.body
  const allperiodeRKF = await db.any(
    'INSERT INTO mst.periode(periode_tahun,periode_jenis ) VALUES (${tahun}, 1)',
    { tahun }
  )

  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

// Upload Document ----------------------------------------------------

const getUploadAll = asyncro.asyncHandler(async (request, response, next) => {
  const all = await db.any(
    'SELECT upload_dokumen_id, upload_dokument_tahun, upload_dokumen_jenis, upload_dokumen_nama, upload_dokumen_link \
  FROM mst.upload_dokumen '
  )
  response.json(all)
})

const getUploadDocument = asyncro.asyncHandler(
  async (request, response, next) => {
    const tahun = request.params.tahun
    const jenis = request.params.jenis
    const allUploadDocument = await db.any(
      'SELECT upload_dokumen_id, upload_dokument_tahun, upload_dokumen_jenis, upload_dokumen_nama, upload_dokumen_link \
  FROM mst.upload_dokumen WHERE upload_dokument_tahun = ${tahun} AND upload_dokumen_jenis = ${jenis} ',
      { tahun, jenis }
    )
    response.json(allUploadDocument)
  }
)

const postUploadDocument = asyncro.asyncHandler(
  async (request, response, next) => {
    const { tahun, jenis, nama, link } = request.body
    const procPost = await db.any(
      'INSERT INTO mst.upload_dokumen(upload_dokument_tahun, upload_dokumen_jenis, upload_dokumen_nama, upload_dokumen_link) \
    VALUES (${tahun}, ${jenis}, ${nama}, ${link} )',
      { tahun, jenis, nama, link }
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
    const { tahun, jenis, nama, link } = request.body
    const documentId = request.params.documentId
    const procUpdate = await db.any(
      'UPDATE mst.upload_dokumen SET upload_dokument_tahun = ${tahun}, upload_dokumen_jenis = ${jenis}, \
    upload_dokumen_nama = ${nama}, upload_dokumen_link = ${link} \
    WHERE upload_dokumen_id = ${documentId} ',
      { tahun, jenis, nama, link, documentId }
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
    const documentId = request.params.documentId
    const procDel = await db.any(
      'DELETE FROM mst.upload_dokumen WHERE upload_dokumen_id = ${documentId} ',
      { documentId }
    )
    try {
      return response.status(200).send('deleted')
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const getTahun = asyncro.asyncHandler(async (request, response, next) => {
  const allTahun = await db.any('SELECT tahun FROM mst.tahun')
  response.json(allTahun)
})

const getPosCoa = asyncro.asyncHandler(async (request, response, next) => {
  const allPosCoa = await db.any(
    'SELECT pos_coa_jenis, pos_coa_jenis_nama, pos_coa_header_id, pos_coa_header_nama, pos_coa_sub1_id, pos_coa_sub1_nama, pos_coa_sub2_id,pos_coa_sub2_nama, pos_coa_sub3_id, pos_coa_sub3_nama FROM mst.pos_coa'
  )
  response.json(allPosCoa)
})

// Inisiatif ----------------------------------------------------
const getInisiatif = asyncro.asyncHandler(async (request, response, next) => {
  const allInisiatif = await db.any(
    'SELECT strategis_inisiatif_master, strategis_inisiatif_id,strategis_inisiatif_nama from mst.strategis_inisiatif ORDER BY strategis_inisiatif_master, strategis_inisiatif_id'
  )
  response.json(allInisiatif)
})

const getInisiatifTahun = asyncro.asyncHandler(
  async (request, response, next) => {
    const inisiatifId = request.params.inisiatifId

    const allInisiatifTahun = await db.any(
      'SELECT strategis_inisiatif_tahun, strategis_inisiatif_value FROM mst.strategis_inisiatif_tahun WHERE strategis_inisiatif_id = ${inisiatifId} ORDER BY strategis_inisiatif_tahun ',
      { inisiatifId }
    )
    response.json(allInisiatifTahun)
  }
)

// Sasaran ----------------------------------------------------
const getSasaran = asyncro.asyncHandler(async (request, response, next) => {
  const masterId = request.params.masterId
  const allsasaran = await db.any(
    'SELECT  strategis_sasaran_id, strategis_sasaran_nama from mst.strategis_sasaran WHERE strategis_sasaran_master = ${masterId} ORDER BY strategis_sasaran_id',
    { masterId }
  )
  response.json(allsasaran)
})

const getSasaranTahun = asyncro.asyncHandler(
  async (request, response, next) => {
    const sasaranId = request.params.sasaranId

    const allsasaranTahun = await db.any(
      'SELECT strategis_sasaran_tahun, strategis_sasaran_value FROM mst.strategis_sasaran_tahun WHERE strategis_sasaran_id = ${sasaranId} ORDER BY strategis_sasaran_tahun ',
      { sasaranId }
    )
    response.json(allsasaranTahun)
  }
)

const getCorePlanTahun = asyncro.asyncHandler(
  async (request, response, next) => {
    const allCPTahun = await db.any(
      'SELECT is_tahun FROM mst.inisiatif_sasaran GROUP BY is_tahun ORDER BY is_tahun ASC'
    )
    response.json(allCPTahun)
  }
)

const getCorePlanByTahun = asyncro.asyncHandler(
  async (request, response, next) => {
    const tahun = request.params.tahun
    const getCorePlanByTahun = await db.any(
      'SELECT * FROM mst.inisiatif_sasaran WHERE is_tahun =  ${tahun}',
      { tahun }
    )
    response.json(getCorePlanByTahun)
  }
)

const getCorePlanById = asyncro.asyncHandler(
  async (request, response, next) => {
    const Id = request.params.Id
    const getCorePlanById = await db.any(
      'SELECT * FROM mst.inisiatif_sasaran WHERE is_id =  ${Id}',
      { Id }
    )
    response.json(getCorePlanById)
  }
)

// TRANSFORMASI BPD ----------------------------------------------------
const getTransformasiBPDAll = asyncro.asyncHandler(
  async (request, response, next) => {
    const alltransformasi_bpd = await db.any(
      'SELECT transformasi_bpd_id, transformasi_bpd_nama FROM mst.transformasi_bpd ORDER BY transformasi_bpd_id'
    )
    response.json(alltransformasi_bpd)
  }
)

const getTransformasiBPD = asyncro.asyncHandler(
  async (request, response, next) => {
    const id = request.params.id
    const transformasi_bpd = await db.any(
      'SELECT transformasi_bpd_id, transformasi_bpd_nama FROM mst.transformasi_bpd WHERE transformasi_bpd_id = ${id} ',
      { id }
    )
    response.json(transformasi_bpd)
  }
)

const postTransformasiBPD = asyncro.asyncHandler(
  async (request, response, next) => {
    const { nama } = request.body
    const procPost = await db.any(
      'INSERT INTO mst.transformasi_bpd(transformasi_bpd_nama) VALUES (${nama})',
      { nama }
    )
    try {
      return response.status(201).send('created')
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const putTransformasiBPD = asyncro.asyncHandler(
  async (request, response, next) => {
    const { nama } = request.body
    const id = request.params.id
    const procUpdate = await db.any(
      'UPDATE mst.transformasi_bpd SET transformasi_bpd_nama = ${nama} WHERE transformasi_bpd_id = ${id} ',
      { nama, id }
    )
    try {
      return response.status(200).send('updated')
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const delTransformasiBPD = asyncro.asyncHandler(
  async (request, response, next) => {
    const id = request.params.id
    const procDel = await db.any(
      'DELETE FROM mst.transformasi_bpd WHERE transformasi_bpd_id = ${id} ',
      { id }
    )
    try {
      return response.status(200).send('deleted')
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

// RAKB ----------------------------------------------------
const getRAKBAll = asyncro.asyncHandler(async (request, response, next) => {
  const allrakb = await db.any(
    'SELECT rakb_id, rakb_nama FROM mst.rakb ORDER BY rakb_id'
  )
  response.json(allrakb)
})

const getRAKB = asyncro.asyncHandler(async (request, response, next) => {
  const id = request.params.id
  const rakb = await db.any(
    'SELECT rakb_id, rakb_nama FROM mst.rakb WHERE rakb_id = ${id} ',
    { id }
  )
  response.json(rakb)
})

const postRAKB = asyncro.asyncHandler(async (request, response, next) => {
  const { nama } = request.body
  const procPost = await db.any(
    'INSERT INTO mst.rakb(rakb_nama) VALUES (${nama})',
    { nama }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const putRAKB = asyncro.asyncHandler(async (request, response, next) => {
  const { nama } = request.body
  const id = request.params.id
  const procUpdate = await db.any(
    'UPDATE mst.rakb SET rakb_nama = ${nama} WHERE rakb_id = ${id} ',
    { nama, id }
  )
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const delRAKB = asyncro.asyncHandler(async (request, response, next) => {
  const id = request.params.id
  const procDel = await db.any('DELETE FROM mst.rakb WHERE rakb_id = ${id} ', {
    id
  })
  try {
    return response.status(200).send('deleted')
  } catch (error) {
    return response.status(400).send(error)
  }
})

// Barang ----------------------------------------------------
const getBarangAll = asyncro.asyncHandler(async (request, response, next) => {
  const allBarang = await db.any(
    'SELECT barang_id, barang_kelompok, barang_nama, barang_harga FROM mst.barang ORDER BY barang_kelompok, barang_id'
  )
  response.json(allBarang)
})

const getBarangKelompok = asyncro.asyncHandler(
  async (request, response, next) => {
    const kelompok = request.params.kelompok
    console.log('TCL: kelompok', kelompok)
    const allBarang = await db.any(
      'SELECT barang_id, barang_nama, barang_harga FROM mst.barang WHERE barang_kelompok= ${kelompok} ORDER BY barang_id',
      { kelompok }
    )
    response.json(allBarang)
  }
)

const getBarang = asyncro.asyncHandler(async (request, response, next) => {
  const id = request.params.id
  const Barang = await db.any(
    'SELECT barang_id, barang_kelompok, barang_nama, barang_harga FROM mst.barang WHERE barang_id = ${id} ',
    { id }
  )
  response.json(Barang)
})

const postBarang = asyncro.asyncHandler(async (request, response, next) => {
  const { kelompok, nama, harga } = request.body
  const procPost = await db.any(
    'INSERT INTO mst.barang(barang_kelompok, barang_nama, barang_harga) VALUES (${kelompok},${nama},${harga})',
    { kelompok, nama, harga }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const putBarang = asyncro.asyncHandler(async (request, response, next) => {
  const { kelompok, nama, harga } = request.body
  const id = request.params.id
  const procUpdate = await db.any(
    'UPDATE mst.barang SET barang_kelompok = ${kelompok}, barang_nama = ${nama}, barang_harga = ${harga} WHERE barang_id = ${id} ',
    { kelompok, nama, harga, id }
  )
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const delBarang = asyncro.asyncHandler(async (request, response, next) => {
  const id = request.params.id
  const procDel = await db.any(
    'DELETE FROM mst.barang WHERE barang_id = ${id} ',
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

// Kepemilikan asset ----------------------------------------------------
const getKepemimikanAsetAll = asyncro.asyncHandler(
  async (request, response, next) => {
    const allKepemimikanAsetAll = await db.any(
      'SELECT kepemilikan_aset_id, kepemilikan_aset_nama FROM mst.kepemilikan_aset ORDER BY kepemilikan_aset_id'
    )
    response.json(allKepemimikanAsetAll)
  }
)

// Jenis Bangun Renovasi ----------------------------------------------------
const getJenisBangunRenovasi = asyncro.asyncHandler(
  async (request, response, next) => {
    const allJenisBangunRenovasiAll = await db.any(
      'SELECT jenis_bangun_renovasi_id, jenis_bangun_renovasi_nama FROM mst.jenis_bangun_renovasi ORDER BY jenis_bangun_renovasi_id'
    )
    response.json(allJenisBangunRenovasiAll)
  }
)

// Jenis Aktiva ----------------------------------------------------
const getJenisAktiva = asyncro.asyncHandler(async (request, response, next) => {
  const allJenisAktivaAll = await db.any(
    'SELECT jenis_aktiva_id, jenis_aktiva_nama FROM mst.jenis_aktiva ORDER BY jenis_aktiva_id'
  )
  response.json(allJenisAktivaAll)
})

// Jenis PAB ----------------------------------------------------
const getPABAll = asyncro.asyncHandler(async (request, response, next) => {
  const allPABAll = await db.any(
    'SELECT jenis_pab_id, jenis_pab_nama FROM mst.jenis_pab ORDER BY jenis_pab_id'
  )
  response.json(allPABAll)
})

module.exports = {
  getAllMaster: getAllMaster,
  getVisiMisi: getVisiMisi,
  getCPKUD: getCPKUD,

  // getCorePlan: getCorePlan,
  // postCorePlan: postCorePlan,
  // putCorePlan: putCorePlan,
  // delCorePlan: delCorePlan,

  getKUD: getKUD,
  getKUDOne: getKUDOne,
  postKUD: postKUD,
  putKUD: putKUD,
  delKUD: delKUD,

  getStsProKerAll: getStsProKerAll,
  getStsProKer: getStsProKer,
  postStsProKer: postStsProKer,
  putStsProKer: putStsProKer,
  delStsProKer: delStsProKer,

  getSkalaProKerAll: getSkalaProKerAll,
  getSkalaProKer: getSkalaProKer,
  postSkalaProKer: postSkalaProKer,
  putSkalaProKer: putSkalaProKer,
  delSkalaProKer: delSkalaProKer,

  getKatProKerAll: getKatProKerAll,
  getKatProKer: getKatProKer,
  postKatProKer: postKatProKer,
  putKatProKer: putKatProKer,
  delKatProKer: delKatProKer,

  getBSCAll: getBSCAll,
  getBSC: getBSC,
  postBSC: postBSC,
  putBSC: putBSC,
  delBSC: delBSC,

  getTLAuditAll: getTLAuditAll,
  getTLAudit: getTLAudit,
  postTLAudit: postTLAudit,
  putTLAudit: putTLAudit,
  delTLAudit: delTLAudit,

  getSatuanAll: getSatuanAll,
  getSatuan: getSatuan,
  postSatuan: postSatuan,
  putSatuan: putSatuan,
  delSatuan: delSatuan,

  getPosBiayaAll: getPosBiayaAll,
  getPosBiaya: getPosBiaya,
  postPosBiaya: postPosBiaya,
  putPosBiaya: putPosBiaya,
  delPosBiaya: delPosBiaya,

  // getUnitKerja: getUnitKerja,
  // getPegawaiUnitKerja: getPegawaiUnitKerja,
  // getPegawaiDivisi: getPegawaiDivisi,
  getJenisRKF: getJenisRKF,
  getPeriodeRKF: getPeriodeRKF,
  postPeriodeRKF: postPeriodeRKF,

  getUploadAll: getUploadAll,
  getUploadDocument: getUploadDocument,
  postUploadDocument: postUploadDocument,
  putUploadDocument: putUploadDocument,
  delUploadDocument: delUploadDocument,

  getTahun: getTahun,
  getPosCoa: getPosCoa,
  getInisiatif: getInisiatif,
  getInisiatifTahun: getInisiatifTahun,
  getSasaran: getSasaran,
  getSasaranTahun: getSasaranTahun,

  getCorePlanTahun: getCorePlanTahun,
  getCorePlanByTahun: getCorePlanByTahun,
  getCorePlanById: getCorePlanById,

  getTransformasiBPDAll: getTransformasiBPDAll,
  getTransformasiBPD: getTransformasiBPD,
  postTransformasiBPD: postTransformasiBPD,
  putTransformasiBPD: putTransformasiBPD,
  delTransformasiBPD: delTransformasiBPD,

  getRAKBAll: getRAKBAll,
  getRAKB: getRAKB,
  postRAKB: postRAKB,
  putRAKB: putRAKB,
  delRAKB: delRAKB,

  getBarangAll: getBarangAll,
  getBarangKelompok: getBarangKelompok,
  getBarang: getBarang,
  postBarang: postBarang,
  putBarang: putBarang,
  delBarang: delBarang,

  getKepemimikanAsetAll: getKepemimikanAsetAll,
  getJenisBangunRenovasi: getJenisBangunRenovasi,
  getJenisAktiva: getJenisAktiva,
  getPABAll: getPABAll,

  getIsuStrategis: getIsuStrategis
}

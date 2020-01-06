var db = require('../db/db')
var asyncro = require('../middleware/asyncro')

const getJenisKantor = asyncro.asyncHandler(async (request, response, next) => {
  const getJenisKantor = await db.any(
    'SELECT jenis_kantor_id, jenis_kantor_nama FROM jaringan.jenis_kantor'
  )
  response.json(getJenisKantor)
})

const getPengusul = asyncro.asyncHandler(async (request, response, next) => {
  const getPengusul = await db.any(
    'SELECT pengusul_id, pengusul_nama FROM jaringan.pengusul'
  )
  response.json(getPengusul)
})

const getJenisTanahBangunan = asyncro.asyncHandler(
  async (request, response, next) => {
    const getJenisTanahBangunan = await db.any(
      'SELECT jenis_tanah_bangunan_id, jenis_tanah_bangunan_nama FROM jaringan.jenis_tanah_bangunan'
    )
    response.json(getJenisTanahBangunan)
  }
)

const getRencanaPengadaanTanah = asyncro.asyncHandler(
  async (request, response, next) => {
    const getRencanaPengadaanTanah = await db.any(
      'SELECT rencana_pengadaan_tanah_id, rencana_pengadaan_tanah_nama FROM jaringan.rencana_pengadaan_tanah'
    )
    response.json(getRencanaPengadaanTanah)
  }
)

const getRencanaPengadaanBangunan = asyncro.asyncHandler(
  async (request, response, next) => {
    const getRencanaPengadaanBangunan = await db.any(
      'SELECT rencana_pengadaan_bangunan_id, rencana_pengadaan_bangunan_nama FROM jaringan.rencana_pengadaan_bangunan'
    )
    response.json(getRencanaPengadaanBangunan)
  }
)

const getPropinsi = asyncro.asyncHandler(async (request, response, next) => {
  const propinsi = await db.any(
    'SELECT propinsi_id, propinsi_nama FROM jaringan.propinsi'
  )
  try {
    response.json(propinsi)
  } catch (error) {
    return response.status(400).send(error)
  }
})

const getKota = asyncro.asyncHandler(async (request, response, next) => {
  const propinsiId = request.params.propinsiId
  const kota = await db.any(
    'SELECT kota_id, kota_nama FROM jaringan.kota WHERE kota_propinsi = ${propinsiId} ',
    { propinsiId }
  )
  try {
    response.json(kota)
  } catch (error) {
    return response.status(400).send(error)
  }
})

const getKecamatan = asyncro.asyncHandler(async (request, response, next) => {
  const kotaId = request.params.kotaId
  const kecamatan = await db.any(
    'SELECT kecamatan_id, kecamatan_nama FROM jaringan.kecamatan WHERE kecamatan_kota = ${kotaId} ',
    { kotaId }
  )
  try {
    response.json(kecamatan)
  } catch (error) {
    return response.status(400).send(error)
  }
})

const getKelurahan = asyncro.asyncHandler(async (request, response, next) => {
  const kecamatanId = request.params.kecamatanId
  const kelurahan = await db.any(
    'SELECT kelurahan_id, kelurahan_nama FROM jaringan.kelurahan WHERE kelurahan_kecamatan = ${kecamatanId} ',
    { kecamatanId }
  )
  try {
    response.json(kelurahan)
  } catch (error) {
    return response.status(400).send(error)
  }
})

// Pembukaan ------------------------------------------------------------------------

const getPembukaan = asyncro.asyncHandler(async (request, response, next) => {
  const tahun = request.params.tahun
  const pembukaan = await db.any(
    'SELECT * FROM jaringan.pembukaan WHERE pembukaan_tahun = ${tahun} ORDER BY pembukaan_id',
    { tahun }
  )
  try {
    response.json(pembukaan)
  } catch (error) {
    return response.status(400).send(error)
  }
})

const getPembukaanId = asyncro.asyncHandler(async (request, response, next) => {
  const PembukaanId = request.params.id
  const pembukaan = await db.any(
    'SELECT * FROM jaringan.pembukaan WHERE pembukaan_id = ${PembukaanId}',
    { PembukaanId }
  )
  try {
    response.json(pembukaan)
  } catch (error) {
    return response.status(400).send(error)
  }
})

const postPembukaan = asyncro.asyncHandler(async (request, response, next) => {
  const {
    tahun,
    jenis_kantor,
    pengusul,
    propinsi,
    kota,
    kecamatan,
    kelurahan,
    tanah,
    bangunan,
    rencana_pengadaan_tanah,
    anggaran_pengadaan_tanah,
    rencana_pengadaan_bangunan,
    anggaran_pengadaan_bangunan,
    status,
    kajian_kelayakan_bisnis_start,
    kajian_kelayakan_tanah_bangunan_start,
    pengadaan_tanah_bangunan_start,
    penyiapan_tanah_bangunan_start,
    penyiapan_infrastruktur_pendukung_start,
    penyiapan_infrastruktur_it_start,
    pengadaan_sdm_start,
    perijinan_start,
    pembukaan_start,
    kajian_kelayakan_bisnis_finish,
    kajian_kelayakan_tanah_bangunan_finish,
    pengadaan_tanah_bangunan_finish,
    penyiapan_tanah_bangunan_finish,
    penyiapan_infrastruktur_pendukung_finish,
    penyiapan_infrastruktur_it_finish,
    pengadaan_sdm_finish,
    perijinan_finish,
    pembukaan_finish,
    kajian_kelayakan_bisnis_divisi,
    kajian_kelayakan_tanah_bangunan_divisi,
    pengadaan_tanah_bangunan_divisi,
    penyiapan_tanah_bangunan_divisi,
    penyiapan_infrastruktur_pendukung_divisi,
    penyiapan_infrastruktur_it_divisi,
    pengadaan_sdm_divisi,
    perijinan_divisi,
    pembukaan_divisi
  } = request.body

  const postPembukaan = await db.none(
    'INSERT INTO jaringan.pembukaan( \
      pembukaan_tahun,\
      pembukaan_jenis_kantor,\
      pembukaan_pengusul,\
      pembukaan_propinsi,\
      pembukaan_kota,\
      pembukaan_kecamatan,\
      pembukaan_kelurahan,\
      pembukaan_tanah,\
      pembukaan_bangunan,\
      pembukaan_rencana_pengadaan_tanah,\
      pembukaan_anggaran_pengadaan_tanah,\
      pembukaan_rencana_pengadaan_bangunan,\
      pembukaan_anggaran_pengadaan_bangunan,\
      pembukaan_status, \
      pembukaan_kajian_kelayakan_bisnis_start,\
      pembukaan_kajian_kelayakan_tanah_bangunan_start,\
      pembukaan_pengadaan_tanah_bangunan_start,\
      pembukaan_penyiapan_tanah_bangunan_start,\
      pembukaan_penyiapan_infrastruktur_pendukung_start,\
      pembukaan_penyiapan_infrastruktur_it_start,\
      pembukaan_pengadaan_sdm_start,\
      pembukaan_perijinan_start,\
      pembukaan_pembukaan_start,\
      pembukaan_kajian_kelayakan_bisnis_finish,\
      pembukaan_kajian_kelayakan_tanah_bangunan_finish,\
      pembukaan_pengadaan_tanah_bangunan_finish,\
      pembukaan_penyiapan_tanah_bangunan_finish,\
      pembukaan_penyiapan_infrastruktur_pendukung_finish,\
      pembukaan_penyiapan_infrastruktur_it_finish,\
      pembukaan_pengadaan_sdm_finish,\
      pembukaan_perijinan_finish,\
      pembukaan_pembukaan_finish,\
      pembukaan_kajian_kelayakan_bisnis_divisi,\
      pembukaan_kajian_kelayakan_tanah_bangunan_divisi,\
      pembukaan_pengadaan_tanah_bangunan_divisi,\
      pembukaan_penyiapan_tanah_bangunan_divisi,\
      pembukaan_penyiapan_infrastruktur_pendukung_divisi,\
      pembukaan_penyiapan_infrastruktur_it_divisi,\
      pembukaan_pengadaan_sdm_divisi,\
      pembukaan_perijinan_divisi,\
      pembukaan_pembukaan_divisi) VALUES ( \
      ${tahun},\
      ${jenis_kantor},\
      ${pengusul},\
      ${propinsi},\
      ${kota},\
      ${kecamatan},\
      ${kelurahan},\
      ${tanah},\
      ${bangunan},\
      ${rencana_pengadaan_tanah},\
      ${anggaran_pengadaan_tanah},\
      ${rencana_pengadaan_bangunan},\
      ${anggaran_pengadaan_bangunan},\
      ${status},\
      ${kajian_kelayakan_bisnis_start},\
      ${kajian_kelayakan_tanah_bangunan_start},\
      ${pengadaan_tanah_bangunan_start},\
      ${penyiapan_tanah_bangunan_start},\
      ${penyiapan_infrastruktur_pendukung_start},\
      ${penyiapan_infrastruktur_it_start},\
      ${pengadaan_sdm_start},\
      ${perijinan_start},\
      ${pembukaan_start},\
      ${kajian_kelayakan_bisnis_finish},\
      ${kajian_kelayakan_tanah_bangunan_finish},\
      ${pengadaan_tanah_bangunan_finish},\
      ${penyiapan_tanah_bangunan_finish},\
      ${penyiapan_infrastruktur_pendukung_finish},\
      ${penyiapan_infrastruktur_it_finish},\
      ${pengadaan_sdm_finish},\
      ${perijinan_finish},\
      ${pembukaan_finish},\
      ${kajian_kelayakan_bisnis_divisi},\
      ${kajian_kelayakan_tanah_bangunan_divisi},\
      ${pengadaan_tanah_bangunan_divisi},\
      ${penyiapan_tanah_bangunan_divisi},\
      ${penyiapan_infrastruktur_pendukung_divisi},\
      ${penyiapan_infrastruktur_it_divisi},\
      ${pengadaan_sdm_divisi},\
      ${perijinan_divisi},\
      ${pembukaan_divisi })',
    {
      tahun,
      jenis_kantor,
      pengusul,
      propinsi,
      kota,
      kecamatan,
      kelurahan,
      tanah,
      bangunan,
      rencana_pengadaan_tanah,
      anggaran_pengadaan_tanah,
      rencana_pengadaan_bangunan,
      anggaran_pengadaan_bangunan,
      status,
      kajian_kelayakan_bisnis_start,
      kajian_kelayakan_tanah_bangunan_start,
      pengadaan_tanah_bangunan_start,
      penyiapan_tanah_bangunan_start,
      penyiapan_infrastruktur_pendukung_start,
      penyiapan_infrastruktur_it_start,
      pengadaan_sdm_start,
      perijinan_start,
      pembukaan_start,
      kajian_kelayakan_bisnis_finish,
      kajian_kelayakan_tanah_bangunan_finish,
      pengadaan_tanah_bangunan_finish,
      penyiapan_tanah_bangunan_finish,
      penyiapan_infrastruktur_pendukung_finish,
      penyiapan_infrastruktur_it_finish,
      pengadaan_sdm_finish,
      perijinan_finish,
      pembukaan_finish,
      kajian_kelayakan_bisnis_divisi,
      kajian_kelayakan_tanah_bangunan_divisi,
      pengadaan_tanah_bangunan_divisi,
      penyiapan_tanah_bangunan_divisi,
      penyiapan_infrastruktur_pendukung_divisi,
      penyiapan_infrastruktur_it_divisi,
      pengadaan_sdm_divisi,
      perijinan_divisi,
      pembukaan_divisi
    }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const deletePembukaan = asyncro.asyncHandler(
  async (request, response, next) => {
    const id = request.params.id
    const delPembukaan = await db.any(
      'DELETE FROM jaringan.pembukaan WHERE pembukaan_id = ${id} ',
      { id }
    )
    try {
      return response.status(201).send('deleted')
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

// Perubahan ------------------------------------------------------------------------

const postPerubahan = asyncro.asyncHandler(async (request, response, next) => {
  const {
    tahun,
    jenis_kantor_semula,
    jenis_kantor_menjadi,
    nama_semula,
    nama_menjadi,
    pengusul,
    propinsi,
    kota,
    kecamatan,
    kelurahan,
    tanah,
    bangunan,
    rencana_pengadaan_tanah,
    anggaran_pengadaan_tanah,
    rencana_pengadaan_bangunan,
    anggaran_pengadaan_bangunan,
    status,
    kajian_kelayakan_bisnis_start,
    kajian_kelayakan_tanah_bangunan_start,
    pengadaan_tanah_bangunan_start,
    penyiapan_tanah_bangunan_start,
    penyiapan_infrastruktur_pendukung_start,
    penyiapan_infrastruktur_it_start,
    pengadaan_sdm_start,
    perijinan_start,
    perubahan_start,
    kajian_kelayakan_bisnis_finish,
    kajian_kelayakan_tanah_bangunan_finish,
    pengadaan_tanah_bangunan_finish,
    penyiapan_tanah_bangunan_finish,
    penyiapan_infrastruktur_pendukung_finish,
    penyiapan_infrastruktur_it_finish,
    pengadaan_sdm_finish,
    perijinan_finish,
    perubahan_finish,
    kajian_kelayakan_bisnis_divisi,
    kajian_kelayakan_tanah_bangunan_divisi,
    pengadaan_tanah_bangunan_divisi,
    penyiapan_tanah_bangunan_divisi,
    penyiapan_infrastruktur_pendukung_divisi,
    penyiapan_infrastruktur_it_divisi,
    pengadaan_sdm_divisi,
    perijinan_divisi,
    perubahan_divisi
  } = request.body

  const postperubahan = await db.none(
    'INSERT INTO jaringan.perubahan( \
      perubahan_tahun,\
      perubahan_jenis_kantor_semula,\
      perubahan_jenis_kantor_menjadi,\
      perubahan_nama_semula,\
    	perubahan_nama_menjadi,\
      perubahan_pengusul,\
      perubahan_propinsi,\
      perubahan_kota,\
      perubahan_kecamatan,\
      perubahan_kelurahan,\
      perubahan_tanah,\
      perubahan_bangunan,\
      perubahan_rencana_pengadaan_tanah,\
      perubahan_anggaran_pengadaan_tanah,\
      perubahan_rencana_pengadaan_bangunan,\
      perubahan_anggaran_pengadaan_bangunan,\
      perubahan_status, \
      perubahan_kajian_kelayakan_bisnis_start,\
      perubahan_kajian_kelayakan_tanah_bangunan_start,\
      perubahan_pengadaan_tanah_bangunan_start,\
      perubahan_penyiapan_tanah_bangunan_start,\
      perubahan_penyiapan_infrastruktur_pendukung_start,\
      perubahan_penyiapan_infrastruktur_it_start,\
      perubahan_pengadaan_sdm_start,\
      perubahan_perijinan_start,\
      perubahan_perubahan_start,\
      perubahan_kajian_kelayakan_bisnis_finish,\
      perubahan_kajian_kelayakan_tanah_bangunan_finish,\
      perubahan_pengadaan_tanah_bangunan_finish,\
      perubahan_penyiapan_tanah_bangunan_finish,\
      perubahan_penyiapan_infrastruktur_pendukung_finish,\
      perubahan_penyiapan_infrastruktur_it_finish,\
      perubahan_pengadaan_sdm_finish,\
      perubahan_perijinan_finish,\
      perubahan_perubahan_finish,\
      perubahan_kajian_kelayakan_bisnis_divisi,\
      perubahan_kajian_kelayakan_tanah_bangunan_divisi,\
      perubahan_pengadaan_tanah_bangunan_divisi,\
      perubahan_penyiapan_tanah_bangunan_divisi,\
      perubahan_penyiapan_infrastruktur_pendukung_divisi,\
      perubahan_penyiapan_infrastruktur_it_divisi,\
      perubahan_pengadaan_sdm_divisi,\
      perubahan_perijinan_divisi,\
      perubahan_perubahan_divisi) VALUES ( \
      ${tahun},\
      ${jenis_kantor_semula},\
      ${jenis_kantor_menjadi}, \
      ${nama_semula},\
	    ${nama_menjadi},\
      ${pengusul},\
      ${propinsi},\
      ${kota},\
      ${kecamatan},\
      ${kelurahan},\
      ${tanah},\
      ${bangunan},\
      ${rencana_pengadaan_tanah},\
      ${anggaran_pengadaan_tanah},\
      ${rencana_pengadaan_bangunan},\
      ${anggaran_pengadaan_bangunan},\
      ${status},\
      ${kajian_kelayakan_bisnis_start},\
      ${kajian_kelayakan_tanah_bangunan_start},\
      ${pengadaan_tanah_bangunan_start},\
      ${penyiapan_tanah_bangunan_start},\
      ${penyiapan_infrastruktur_pendukung_start},\
      ${penyiapan_infrastruktur_it_start},\
      ${pengadaan_sdm_start},\
      ${perijinan_start},\
      ${perubahan_start},\
      ${kajian_kelayakan_bisnis_finish},\
      ${kajian_kelayakan_tanah_bangunan_finish},\
      ${pengadaan_tanah_bangunan_finish},\
      ${penyiapan_tanah_bangunan_finish},\
      ${penyiapan_infrastruktur_pendukung_finish},\
      ${penyiapan_infrastruktur_it_finish},\
      ${pengadaan_sdm_finish},\
      ${perijinan_finish},\
      ${perubahan_finish},\
      ${kajian_kelayakan_bisnis_divisi},\
      ${kajian_kelayakan_tanah_bangunan_divisi},\
      ${pengadaan_tanah_bangunan_divisi},\
      ${penyiapan_tanah_bangunan_divisi},\
      ${penyiapan_infrastruktur_pendukung_divisi},\
      ${penyiapan_infrastruktur_it_divisi},\
      ${pengadaan_sdm_divisi},\
      ${perijinan_divisi},\
      ${perubahan_divisi })',
    {
      tahun,
      jenis_kantor_semula,
      jenis_kantor_menjadi,
      nama_semula,
      nama_menjadi,
      pengusul,
      propinsi,
      kota,
      kecamatan,
      kelurahan,
      tanah,
      bangunan,
      rencana_pengadaan_tanah,
      anggaran_pengadaan_tanah,
      rencana_pengadaan_bangunan,
      anggaran_pengadaan_bangunan,
      status,
      kajian_kelayakan_bisnis_start,
      kajian_kelayakan_tanah_bangunan_start,
      pengadaan_tanah_bangunan_start,
      penyiapan_tanah_bangunan_start,
      penyiapan_infrastruktur_pendukung_start,
      penyiapan_infrastruktur_it_start,
      pengadaan_sdm_start,
      perijinan_start,
      perubahan_start,
      kajian_kelayakan_bisnis_finish,
      kajian_kelayakan_tanah_bangunan_finish,
      pengadaan_tanah_bangunan_finish,
      penyiapan_tanah_bangunan_finish,
      penyiapan_infrastruktur_pendukung_finish,
      penyiapan_infrastruktur_it_finish,
      pengadaan_sdm_finish,
      perijinan_finish,
      perubahan_finish,
      kajian_kelayakan_bisnis_divisi,
      kajian_kelayakan_tanah_bangunan_divisi,
      pengadaan_tanah_bangunan_divisi,
      penyiapan_tanah_bangunan_divisi,
      penyiapan_infrastruktur_pendukung_divisi,
      penyiapan_infrastruktur_it_divisi,
      pengadaan_sdm_divisi,
      perijinan_divisi,
      perubahan_divisi
    }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const getPerubahan = asyncro.asyncHandler(async (request, response, next) => {
  const tahun = request.params.tahun
  const perubahan = await db.any(
    'SELECT * FROM jaringan.perubahan WHERE perubahan_tahun = ${tahun} ORDER BY perubahan_id',
    { tahun }
  )
  try {
    response.json(perubahan)
  } catch (error) {
    return response.status(400).send(error)
  }
})

const getPerubahanId = asyncro.asyncHandler(async (request, response, next) => {
  const perubahanId = request.params.id
  const perubahan = await db.any(
    'SELECT * FROM jaringan.perubahan WHERE perubahan_id = ${perubahanId}',
    { perubahanId }
  )
  try {
    response.json(perubahan)
  } catch (error) {
    return response.status(400).send(error)
  }
})

const deletePerubahan = asyncro.asyncHandler(
  async (request, response, next) => {
    const id = request.params.id
    const delperubahan = await db.any(
      'DELETE FROM jaringan.perubahan WHERE perubahan_id = ${id} ',
      { id }
    )
    try {
      return response.status(201).send('deleted')
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

// Relokasi ------------------------------------------------------------------------

const postRelokasi = asyncro.asyncHandler(async (request, response, next) => {
  const {
    tahun,
    jenis_kantor,
    pengusul,
    propinsi_semula,
    kota_semula,
    kecamatan_semula,
    kelurahan_semula,
    alamat_semula,
    propinsi_menjadi,
    kota_menjadi,
    kecamatan_menjadi,
    kelurahan_menjadi,
    alamat_menjadi,
    tanah,
    bangunan,
    rencana_pengadaan_tanah,
    anggaran_pengadaan_tanah,
    rencana_pengadaan_bangunan,
    anggaran_pengadaan_bangunan,
    status,
    kajian_kelayakan_bisnis_start,
    kajian_kelayakan_tanah_bangunan_start,
    pengadaan_tanah_bangunan_start,
    penyiapan_tanah_bangunan_start,
    penyiapan_infrastruktur_pendukung_start,
    penyiapan_infrastruktur_it_start,
    pengadaan_sdm_start,
    perijinan_start,
    relokasi_start,
    kajian_kelayakan_bisnis_finish,
    kajian_kelayakan_tanah_bangunan_finish,
    pengadaan_tanah_bangunan_finish,
    penyiapan_tanah_bangunan_finish,
    penyiapan_infrastruktur_pendukung_finish,
    penyiapan_infrastruktur_it_finish,
    pengadaan_sdm_finish,
    perijinan_finish,
    relokasi_finish,
    kajian_kelayakan_bisnis_divisi,
    kajian_kelayakan_tanah_bangunan_divisi,
    pengadaan_tanah_bangunan_divisi,
    penyiapan_tanah_bangunan_divisi,
    penyiapan_infrastruktur_pendukung_divisi,
    penyiapan_infrastruktur_it_divisi,
    pengadaan_sdm_divisi,
    perijinan_divisi,
    relokasi_divisi
  } = request.body

  const postrelokasi = await db.none(
    'INSERT INTO jaringan.relokasi( \
      relokasi_tahun,\
      relokasi_jenis_kantor,\
      relokasi_pengusul,\
      relokasi_propinsi_semula,\
      relokasi_kota_semula,\
      relokasi_kecamatan_semula,\
      relokasi_kelurahan_semula,\
      relokasi_alamat_semula,\
      relokasi_propinsi_menjadi,\
      relokasi_kota_menjadi,\
      relokasi_kecamatan_menjadi,\
      relokasi_kelurahan_menjadi,\
      relokasi_alamat_menjadi,\
      relokasi_tanah,\
      relokasi_bangunan,\
      relokasi_rencana_pengadaan_tanah,\
      relokasi_anggaran_pengadaan_tanah,\
      relokasi_rencana_pengadaan_bangunan,\
      relokasi_anggaran_pengadaan_bangunan,\
      relokasi_status,\
      relokasi_kajian_kelayakan_bisnis_start,\
      relokasi_kajian_kelayakan_tanah_bangunan_start,\
      relokasi_pengadaan_tanah_bangunan_start,\
      relokasi_penyiapan_tanah_bangunan_start,\
      relokasi_penyiapan_infrastruktur_pendukung_start,\
      relokasi_penyiapan_infrastruktur_it_start,\
      relokasi_pengadaan_sdm_start,\
      relokasi_perijinan_start,\
      relokasi_relokasi_start,\
      relokasi_kajian_kelayakan_bisnis_finish,\
      relokasi_kajian_kelayakan_tanah_bangunan_finish,\
      relokasi_pengadaan_tanah_bangunan_finish,\
      relokasi_penyiapan_tanah_bangunan_finish,\
      relokasi_penyiapan_infrastruktur_pendukung_finish,\
      relokasi_penyiapan_infrastruktur_it_finish,\
      relokasi_pengadaan_sdm_finish,\
      relokasi_perijinan_finish,\
      relokasi_relokasi_finish,\
      relokasi_kajian_kelayakan_bisnis_divisi,\
      relokasi_kajian_kelayakan_tanah_bangunan_divisi,\
      relokasi_pengadaan_tanah_bangunan_divisi,\
      relokasi_penyiapan_tanah_bangunan_divisi,\
      relokasi_penyiapan_infrastruktur_pendukung_divisi,\
      relokasi_penyiapan_infrastruktur_it_divisi,\
      relokasi_pengadaan_sdm_divisi,\
      relokasi_perijinan_divisi,\
      relokasi_relokasi_divisi) VALUES ( \
      ${tahun},\
      ${jenis_kantor},\
      ${pengusul},\
      ${propinsi_semula},\
      ${kota_semula},\
      ${kecamatan_semula},\
      ${kelurahan_semula},\
      ${alamat_semula},\
      ${propinsi_menjadi},\
      ${kota_menjadi},\
      ${kecamatan_menjadi},\
      ${kelurahan_menjadi},\
      ${alamat_menjadi},\
      ${tanah},\
      ${bangunan},\
      ${rencana_pengadaan_tanah},\
      ${anggaran_pengadaan_tanah},\
      ${rencana_pengadaan_bangunan},\
      ${anggaran_pengadaan_bangunan},\
      ${status},\
      ${kajian_kelayakan_bisnis_start},\
      ${kajian_kelayakan_tanah_bangunan_start},\
      ${pengadaan_tanah_bangunan_start},\
      ${penyiapan_tanah_bangunan_start},\
      ${penyiapan_infrastruktur_pendukung_start},\
      ${penyiapan_infrastruktur_it_start},\
      ${pengadaan_sdm_start},\
      ${perijinan_start},\
      ${relokasi_start},\
      ${kajian_kelayakan_bisnis_finish},\
      ${kajian_kelayakan_tanah_bangunan_finish},\
      ${pengadaan_tanah_bangunan_finish},\
      ${penyiapan_tanah_bangunan_finish},\
      ${penyiapan_infrastruktur_pendukung_finish},\
      ${penyiapan_infrastruktur_it_finish},\
      ${pengadaan_sdm_finish},\
      ${perijinan_finish},\
      ${relokasi_finish},\
      ${kajian_kelayakan_bisnis_divisi},\
      ${kajian_kelayakan_tanah_bangunan_divisi},\
      ${pengadaan_tanah_bangunan_divisi},\
      ${penyiapan_tanah_bangunan_divisi},\
      ${penyiapan_infrastruktur_pendukung_divisi},\
      ${penyiapan_infrastruktur_it_divisi},\
      ${pengadaan_sdm_divisi},\
      ${perijinan_divisi},\
      ${relokasi_divisi })',
    {
      tahun,
      jenis_kantor,
      pengusul,
      propinsi_semula,
      kota_semula,
      kecamatan_semula,
      kelurahan_semula,
      alamat_semula,
      propinsi_menjadi,
      kota_menjadi,
      kecamatan_menjadi,
      kelurahan_menjadi,
      alamat_menjadi,
      tanah,
      bangunan,
      rencana_pengadaan_tanah,
      anggaran_pengadaan_tanah,
      rencana_pengadaan_bangunan,
      anggaran_pengadaan_bangunan,
      status,
      kajian_kelayakan_bisnis_start,
      kajian_kelayakan_tanah_bangunan_start,
      pengadaan_tanah_bangunan_start,
      penyiapan_tanah_bangunan_start,
      penyiapan_infrastruktur_pendukung_start,
      penyiapan_infrastruktur_it_start,
      pengadaan_sdm_start,
      perijinan_start,
      relokasi_start,
      kajian_kelayakan_bisnis_finish,
      kajian_kelayakan_tanah_bangunan_finish,
      pengadaan_tanah_bangunan_finish,
      penyiapan_tanah_bangunan_finish,
      penyiapan_infrastruktur_pendukung_finish,
      penyiapan_infrastruktur_it_finish,
      pengadaan_sdm_finish,
      perijinan_finish,
      relokasi_finish,
      kajian_kelayakan_bisnis_divisi,
      kajian_kelayakan_tanah_bangunan_divisi,
      pengadaan_tanah_bangunan_divisi,
      penyiapan_tanah_bangunan_divisi,
      penyiapan_infrastruktur_pendukung_divisi,
      penyiapan_infrastruktur_it_divisi,
      pengadaan_sdm_divisi,
      perijinan_divisi,
      relokasi_divisi
    }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const getRelokasi = asyncro.asyncHandler(async (request, response, next) => {
  const tahun = request.params.tahun
  const relokasi = await db.any(
    'SELECT * FROM jaringan.relokasi WHERE relokasi_tahun = ${tahun} ORDER BY relokasi_id',
    { tahun }
  )
  try {
    response.json(relokasi)
  } catch (error) {
    return response.status(400).send(error)
  }
})

const getRelokasiId = asyncro.asyncHandler(async (request, response, next) => {
  const relokasiId = request.params.id
  const relokasi = await db.any(
    'SELECT * FROM jaringan.relokasi WHERE relokasi_id = ${relokasiId}',
    { relokasiId }
  )
  try {
    response.json(relokasi)
  } catch (error) {
    return response.status(400).send(error)
  }
})

const deleteRelokasi = asyncro.asyncHandler(async (request, response, next) => {
  const id = request.params.id
  const delrelokasi = await db.any(
    'DELETE FROM jaringan.relokasi WHERE relokasi_id = ${id} ',
    { id }
  )
  try {
    return response.status(201).send('deleted')
  } catch (error) {
    return response.status(400).send(error)
  }
})

// Penutupan ------------------------------------------------------------------------

const postPenutupan = asyncro.asyncHandler(async (request, response, next) => {
  const {
    tahun,
    jenis_kantor,
    pengusul,
    propinsi,
    kota,
    kecamatan,
    kelurahan,
    status,
    kajian_kelayakan_bisnis_start,
    perijinan_start,
    penutupan_start,
    kajian_kelayakan_bisnis_finish,
    perijinan_finish,
    penutupan_finish,
    kajian_kelayakan_bisnis_divisi,
    perijinan_divisi,
    penutupan_divisi
  } = request.body

  const postpenutupan = await db.none(
    'INSERT INTO jaringan.penutupan( \
      penutupan_tahun,\
      penutupan_jenis_kantor,\
      penutupan_pengusul,\
      penutupan_propinsi,\
      penutupan_kota,\
      penutupan_kecamatan,\
      penutupan_kelurahan,\
      penutupan_status,\
      penutupan_kajian_kelayakan_bisnis_start,\
      penutupan_perijinan_start,\
      penutupan_penutupan_start,\
      penutupan_kajian_kelayakan_bisnis_finish,\
      penutupan_perijinan_finish,\
      penutupan_penutupan_finish,\
      penutupan_kajian_kelayakan_bisnis_divisi,\
      penutupan_perijinan_divisi,\
      penutupan_penutupan_divisi) VALUES ( \
      ${tahun},\
      ${jenis_kantor },\
      ${pengusul},\
      ${propinsi},\
      ${kota},\
      ${kecamatan},\
      ${kelurahan},\
      ${status}, \
      ${kajian_kelayakan_bisnis_start},\
      ${perijinan_start},\
      ${penutupan_start},\
      ${kajian_kelayakan_bisnis_finish},\
      ${perijinan_finish},\
      ${penutupan_finish},\
      ${kajian_kelayakan_bisnis_divisi},\
      ${perijinan_divisi},\
      ${penutupan_divisi})',
    {
      tahun,
      jenis_kantor,
      pengusul,
      propinsi,
      kota,
      kecamatan,
      kelurahan,
      status,
      kajian_kelayakan_bisnis_start,
      perijinan_start,
      penutupan_start,
      kajian_kelayakan_bisnis_finish,
      perijinan_finish,
      penutupan_finish,
      kajian_kelayakan_bisnis_divisi,
      perijinan_divisi,
      penutupan_divisi
    }
  )
  try {
    return response.status(201).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
})

const getPenutupan = asyncro.asyncHandler(async (request, response, next) => {
  const tahun = request.params.tahun
  const penutupan = await db.any(
    'SELECT * FROM jaringan.penutupan WHERE penutupan_tahun = ${tahun} ORDER BY penutupan_id',
    { tahun }
  )
  try {
    response.json(penutupan)
  } catch (error) {
    return response.status(400).send(error)
  }
})

const getPenutupanId = asyncro.asyncHandler(async (request, response, next) => {
  const penutupanId = request.params.id
  const penutupan = await db.any(
    'SELECT * FROM jaringan.penutupan WHERE penutupan_id = ${penutupanId}',
    { penutupanId }
  )
  try {
    response.json(penutupan)
  } catch (error) {
    return response.status(400).send(error)
  }
})

const deletePenutupan = asyncro.asyncHandler(
  async (request, response, next) => {
    const id = request.params.id
    const delpenutupan = await db.any(
      'DELETE FROM jaringan.penutupan WHERE penutupan_id = ${id} ',
      { id }
    )
    try {
      return response.status(201).send('deleted')
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const getDashboardPembukaan = asyncro.asyncHandler(
  async (request, response, next) => {
    const tahun = request.params.tahun
    const pembukaan = await db.any(
      "select  pembukaan_kajian_kelayakan_bisnis_start || '-' || pembukaan_kajian_kelayakan_bisnis_finish AS kajian_kelayakan_bisnis,\
    pembukaan_kajian_kelayakan_tanah_bangunan_start || '-' || pembukaan_kajian_kelayakan_tanah_bangunan_finish AS kajian_kelayakan_tanah_bangunan,\
    pembukaan_pengadaan_tanah_bangunan_start || '-' || pembukaan_pengadaan_tanah_bangunan_finish AS pengadaan_tanah_bangunan,\
    pembukaan_penyiapan_tanah_bangunan_start || '-' || pembukaan_penyiapan_tanah_bangunan_finish AS penyiapan_tanah_bangunan,\
    pembukaan_penyiapan_infrastruktur_pendukung_start || '-' || pembukaan_penyiapan_infrastruktur_pendukung_finish AS penyiapan_infrastruktur_pendukung,\
    pembukaan_penyiapan_infrastruktur_it_start || '-' || pembukaan_penyiapan_infrastruktur_it_finish AS penyiapan_infrastruktur_it,\
    pembukaan_pengadaan_sdm_start || '-' || pembukaan_pengadaan_sdm_finish AS pengadaan_sdm,\
    pembukaan_perijinan_start || '-' || pembukaan_perijinan_finish AS perijinan,\
    pembukaan_pembukaan_start || '-' || pembukaan_pembukaan_finish AS pembukaan\
    from jaringan.pembukaan\
    where pembukaan_tahun = ${tahun}",
      { tahun }
    )
    try {
      response.json(pembukaan)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const getDashboardPerubahan = asyncro.asyncHandler(
  async (request, response, next) => {
    const tahun = request.params.tahun
    const perubahan = await db.any(
      "select  perubahan_kajian_kelayakan_bisnis_start || '-' || perubahan_kajian_kelayakan_bisnis_finish AS kajian_kelayakan_bisnis,\
    perubahan_kajian_kelayakan_tanah_bangunan_start || '-' || perubahan_kajian_kelayakan_tanah_bangunan_finish AS kajian_kelayakan_tanah_bangunan,\
    perubahan_pengadaan_tanah_bangunan_start || '-' || perubahan_pengadaan_tanah_bangunan_finish AS pengadaan_tanah_bangunan,\
    perubahan_penyiapan_tanah_bangunan_start || '-' || perubahan_penyiapan_tanah_bangunan_finish AS penyiapan_tanah_bangunan,\
    perubahan_penyiapan_infrastruktur_pendukung_start || '-' || perubahan_penyiapan_infrastruktur_pendukung_finish AS penyiapan_infrastruktur_pendukung,\
    perubahan_penyiapan_infrastruktur_it_start || '-' || perubahan_penyiapan_infrastruktur_it_finish AS penyiapan_infrastruktur_it,\
    perubahan_pengadaan_sdm_start || '-' || perubahan_pengadaan_sdm_finish AS pengadaan_sdm,\
    perubahan_perijinan_start || '-' || perubahan_perijinan_finish AS perijinan,\
    perubahan_perubahan_start || '-' || perubahan_perubahan_finish AS perubahan\
    from jaringan.perubahan\
    where perubahan_tahun = ${tahun}",
      { tahun }
    )
    try {
      response.json(perubahan)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const getDashboardRelokasi = asyncro.asyncHandler(
  async (request, response, next) => {
    const tahun = request.params.tahun
    const relokasi = await db.any(
      "select  relokasi_kajian_kelayakan_bisnis_start || '-' || relokasi_kajian_kelayakan_bisnis_finish AS kajian_kelayakan_bisnis,\
    relokasi_kajian_kelayakan_tanah_bangunan_start || '-' || relokasi_kajian_kelayakan_tanah_bangunan_finish AS kajian_kelayakan_tanah_bangunan,\
    relokasi_pengadaan_tanah_bangunan_start || '-' || relokasi_pengadaan_tanah_bangunan_finish AS pengadaan_tanah_bangunan,\
    relokasi_penyiapan_tanah_bangunan_start || '-' || relokasi_penyiapan_tanah_bangunan_finish AS penyiapan_tanah_bangunan,\
    relokasi_penyiapan_infrastruktur_pendukung_start || '-' || relokasi_penyiapan_infrastruktur_pendukung_finish AS penyiapan_infrastruktur_pendukung,\
    relokasi_penyiapan_infrastruktur_it_start || '-' || relokasi_penyiapan_infrastruktur_it_finish AS penyiapan_infrastruktur_it,\
    relokasi_pengadaan_sdm_start || '-' || relokasi_pengadaan_sdm_finish AS pengadaan_sdm,\
    relokasi_perijinan_start || '-' || relokasi_perijinan_finish AS perijinan,\
    relokasi_relokasi_start || '-' || relokasi_relokasi_finish AS relokasi\
    from jaringan.relokasi\
    where relokasi_tahun = ${tahun}",
      { tahun }
    )
    try {
      response.json(relokasi)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const getDashboardPenutupan = asyncro.asyncHandler(
  async (request, response, next) => {
    const tahun = request.params.tahun
    const penutupan = await db.any(
      "SELECT  penutupan_kajian_kelayakan_bisnis_start || '-' || penutupan_kajian_kelayakan_bisnis_finish AS kajian_kelayakan_bisnis,\
    penutupan_perijinan_start || '-' || penutupan_perijinan_finish AS perijinan,\
    penutupan_penutupan_start || '-' || penutupan_penutupan_finish AS penutupan\
    from jaringan.penutupan\
    where penutupan_tahun = ${tahun}",
      { tahun }
    )
    try {
      response.json(penutupan)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

const getRekap = asyncro.asyncHandler(
  async (request, response, next) => {
    const getRekap = await db.any(
      `SELECT 
        jenis_kantor_id, jenis_kantor_nama, 
        sum_pembukaan_perijinan_finish, sum_pembukaan_kelayakan_bisnis_finish, 
        sum_relokasi_perijinan_finish, sum_relokasi_kelayakan_bisnis_finish,
        sum_penutupan_perijinan_finish, sum_penutupan_kelayakan_bisnis_finish
      FROM jaringan.jenis_kantor LEFT JOIN jaringan.v_rekap ON jenis_kantor_id = v_rekap.jenis_kantor
      ORDER BY jenis_kantor_id`
    )
    try {
      response.json(getRekap)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
)

module.exports = {
  getJenisKantor: getJenisKantor,
  getPengusul: getPengusul,
  getJenisTanahBangunan: getJenisTanahBangunan,
  getRencanaPengadaanTanah: getRencanaPengadaanTanah,
  getRencanaPengadaanBangunan: getRencanaPengadaanBangunan,

  getPropinsi: getPropinsi,
  getKota: getKota,
  getKecamatan: getKecamatan,
  getKelurahan: getKelurahan,

  getPembukaan: getPembukaan,
  getPembukaanId: getPembukaanId,
  postPembukaan: postPembukaan,
  deletePembukaan: deletePembukaan,

  postPerubahan: postPerubahan,
  getPerubahan: getPerubahan,
  getPerubahanId: getPerubahanId,
  deletePerubahan: deletePerubahan,

  postRelokasi: postRelokasi,
  getRelokasi: getRelokasi,
  getRelokasiId: getRelokasiId,
  deleteRelokasi: deleteRelokasi,

  postPenutupan: postPenutupan,
  getPenutupan: getPenutupan,
  getPenutupanId: getPenutupanId,
  deletePenutupan: deletePenutupan,

  getDashboardPembukaan: getDashboardPembukaan,
  getDashboardPerubahan: getDashboardPerubahan,
  getDashboardRelokasi: getDashboardRelokasi,
  getDashboardPenutupan: getDashboardPenutupan,
  getRekap: getRekap
}

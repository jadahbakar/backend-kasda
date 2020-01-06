var db = require('../db')
// var auth = require('../auth/authentication')
var asyncro = require('../middleware/asyncro')

// function postLogin2 (req, response, next) {
//   db.task(t => {
//     return t
//       .one('SELECT sec.users_login(${username}, ${userpass})', req.body)
//       .then(userku => {
//         return t
//           .any(
//             'SELECT sec.generate_parent($1) AS menu',
//             userku.users_login.userrole
//           )
//           .then(menu => {
//             return { userku, menu }
//           })
//         return { userku }
//       })
//   })
//     .then(data => {
//       data.menu.forEach((element, index) => {
//         if (
//           element.menu.children === null &&
//           element.menu.name !== 'Dashboard'
//         ) {
//           data.menu.splice(index, 1)
//         }
//       })

//       response.status(200).json({
//         token: auth.createJWToken({
//           sessionData: data.userku.users_login.userid,
//           maxAge: 3600
//         }),
//         userId: data.userku.users_login.userid,
//         userName: data.userku.users_login.username,
//         userStatus: data.userku.users_login.usersts,
//         userRole: data.userku.users_login.userrole,
//         pegawaiNama: data.userku.users_login.pegawai_nama,
//         pegawaiUnitKerja: data.userku.users_login.pegawai_unit_kerja,
//         unitKerjaNama: data.userku.users_login.unit_kerja_nama,
//         pegawaiJabatan: data.userku.users_login.pegawai_jabatan,
//         jabatanNama: data.userku.users_login.jabatan_nama,
//         usermenu: data.menu

//         // hapus menu yang tidak punya Children
//       })
//     })
//     .catch(error => {
//       // failed
//       response.status(401).json({
//         message:
//           error ||
//           "Validation failed. Given username and password aren't matching."
//       })
//     })
// }

// const postLogin = asyncro.asyncHandler(async (request, response, next) => {
//   const getUser = await db.oneOrNone(
//     'SELECT sec.users_login(${username}, ${userpass})',
//     request.body
//   )
//   if (getUser === null) {
//     response.status(401).json({
//       message:
//         error ||
//         "Validation failed. Given username and password aren't matching."
//     })
//   }

//   if (getUser !== null) {
//     const getMenu = await db.any(
//       'SELECT sec.generate_parent($1) AS menu',
//       getUser.users_login.userrole
//     )
//     getMenu.forEach((element, index) => {
//       if (element.menu.children === null && element.menu.name !== 'Dashboard') {
//         getMenu.splice(index, 1)
//       }
//     })
//     response.json({ getUser, getMenu })
//   }
// })

// function postLogin3 (request, response, next) {
//   db.oneOrNone('SELECT sec.users_login(${username}, ${userpass})', request.body)
//     .then(data => {
//       response.status(200).json({
//         data: data.users_login
//       })
//     })
//     .catch(function (err) {
//       return next(err)
//     })
// }

const getLogin = asyncro.asyncHandler(async (request, response, next) => {
  const userId = request.params.userId
  const getAktivitasDetail = await db.any(
    'SELECT  userid_role as userrole FROM sec.userid WHERE userid_kode = ${userId}',
    { userId }
  )
  response.json(getAktivitasDetail)
})

const getLoginOfline = asyncro.asyncHandler(async (request, response, next) => {
  const userId = request.params.userId
  const getUserDetail = await db.any(
    `SELECT pegawai_id, pegawai_nama, jabatan_id, \
    jabatan_nama, unit_kerja_id, unit_kerja_nama, \
    jenjang_jabatan_id, subdiv_id, subdiv_nama \
    FROM sec.pegawai WHERE pegawai_id = ${userId}::text`,
    { userId }
  )
  response.json(getUserDetail)
})

const getAllDivisi = async (request, response, next) => {
  const AllDivisi = await db.any(
    'SELECT unit_kerja_id, unit_kerja_nama FROM sec.divisi'
  )
  response.json(AllDivisi)
}

const getDivisi = asyncro.asyncHandler(async (request, response, next) => {
  const id = request.params.id
  const getDivisi = await db.any(
    `SELECT unit_kerja_id, unit_kerja_nama FROM sec.divisi WHERE unit_kerja_id = '${id}'`, { id }
  )
  response.json(getDivisi)
})

const getAllSubDivisi = async (request, response, next) => {
  const All = await db.any(
    'SELECT subdiv_id, subdiv_nama FROM sec.subdiv'
  )
  response.json(All)
}

const getSubDivisi = asyncro.asyncHandler(async (request, response, next) => {
  const id = request.params.id
  const getSubDivisi = await db.any(
    `SELECT subdiv_id, subdiv_nama FROM sec.subdiv WHERE subdiv_id = '${id}'`, { id }
  )
  response.json(getSubDivisi)
})

const getPegawaiPerSubdiv = async (request, response, next) => {
  const id = request.params.id
  const getPegawai = await db.any(
    `SELECT pegawai_id, pegawai_nama FROM sec.pegawai WHERE subdiv_id = '${id}' ORDER BY pegawai_id`, { id }
  )
  response.json(getPegawai)
}

const getPegawaiPerDiv = async (request, response, next) => {
  const id = request.params.id
  const getPegawai = await db.any(
    `SELECT subdiv_id, subdiv_nama, pegawai_id, pegawai_nama FROM sec.pegawai WHERE unit_kerja_id = '${id}' ORDER BY subdiv_id, pegawai_id`, { id }
  )
  response.json(getPegawai)
}

module.exports = {
  getLoginOfline: getLoginOfline,
  getLogin: getLogin,
  getAllDivisi: getAllDivisi,
  getDivisi: getDivisi,
  getAllSubDivisi: getAllSubDivisi,
  getSubDivisi: getSubDivisi,
  getPegawaiPerSubdiv: getPegawaiPerSubdiv,
  getPegawaiPerDiv: getPegawaiPerDiv

}

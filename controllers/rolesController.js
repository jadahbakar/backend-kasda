var db = require('../db/db')
var asyncro = require('../middleware/asyncro')

const getAllRoles = asyncro.asyncHandler(async (request, response, next) => {
  const allRoles = await db.any(
    'SELECT role_id, role_status, role_name FROM sec.roles ORDER BY role_id'
  )
  const fields = 'role_id,role_status,role_name'
  const fieldDesc = await db.any(
    'SELECT sec.get_fld_dsc(${fields}) AS fielddesc',
    {
      fields
    }
  )
  const allMenu = await db.any('SELECT sec.generate_menu() AS menus')
  const allField = fieldDesc[0].fielddesc
  response.json({ allRoles, allField, allMenu })
})

const getMenuAuth = asyncro.asyncHandler(async (request, response, next) => {
  const roleID = parseInt(request.query.id)
  const roleAuth = await db.any(
    'SELECT role_menu_cld, role_menu_auth FROM sec.role_menu WHERE role_menu_id = ${roleID} ORDER BY role_menu_cld',
    { roleID }
  )
  response.json(roleAuth)
})

const postRoles = asyncro.asyncHandler(async (request, response, next) => {
  const insert = await db.one(
    'SELECT sec.roles_wud(${action}, ${roleID}, ${roleStatus}, ${roleName})',
    request.body
  )
  response.json(insert)
})

const postMenu = asyncro.asyncHandler(async (request, response, next) => {
  // console.log("body ->", request.body);
  // ----- hapus data dari sec.role_menu untuk roleID user
  const hapus = await db.none(
    'DELETE FROM sec.role_menu WHERE role_menu_id = ${roleID}',
    { roleID: request.body.roleID }
  )

  // ----- loop dengan untuk mengambil menu Authentication
  request.body.menuAuth.map(async detail => {
    // -----ambil kode child menu
    const childId = detail.child

    let authField = {}
    detail.hasOwnProperty('insert')
      ? (authField = { ...authField, ...{ insert: 1 } })
      : ''
    detail.hasOwnProperty('update')
      ? (authField = { ...authField, ...{ update: 1 } })
      : ''
    detail.hasOwnProperty('delete')
      ? (authField = { ...authField, ...{ delete: 1 } })
      : ''
    detail.hasOwnProperty('otor')
      ? (authField = { ...authField, ...{ otor: 1 } })
      : ''

    // -----inputkan data ke dalam database
    const input = await db.none(
      'INSERT INTO sec.role_menu VALUES (${roleID}, ${roleCld}, ${roleAuth})',
      {
        roleID: request.body.roleID,
        roleCld: childId,
        roleAuth: authField
      }
    )
  })
  response.json('masuk pak eko')
})

module.exports = {
  getAllRoles: getAllRoles,
  getMenuAuth: getMenuAuth,
  postRoles: postRoles,
  postMenu: postMenu
}

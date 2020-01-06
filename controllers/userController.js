var db = require('../db/db')
var asyncro = require('../middleware/asyncro')

const getAllUsers = asyncro.asyncHandler(async (request, response, next) => {
  const allUser = await db.any(
    'SELECT duserid, dusername, duserfullname, duseremail, duserrole FROM sec.dummyku'
  )
  const fields = 'duserid,dusername,duserfullname,duseremail,duserrole'
  const fieldDesc = await db.any(
    'SELECT sec.get_fld_dsc(${fields}) AS fielddesc',
    {
      fields
    }
  )
  const alldata = allUser
  const allfield = fieldDesc[0].fielddesc
  response.json({ alldata, allfield })
})

module.exports = {
  getAllUsers: getAllUsers
}

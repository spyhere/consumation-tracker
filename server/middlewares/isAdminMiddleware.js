const isAdmin = require('../helpers/isAdmin')

const isAdminMiddleware = (req, res, next) => {
  if (!isAdmin(req, res)) {
    return
  }
  return next()
}

module.exports = isAdminMiddleware


const isAdminMiddleware = (req, res, next) => {
  const role = req.user.role

  if (role !== 'ADMIN') {
    return res.status(403).send("You are not authorized for this actions")
  }

  return next()
}

module.exports = isAdminMiddleware

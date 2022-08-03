
const isAdmin = (req, res) => {
  const role = req.user.role

  if (role !== 'ADMIN') {
    res.status(403).send("You are not authorized for this action")
    return false
  }

  return true
}

module.exports = isAdmin

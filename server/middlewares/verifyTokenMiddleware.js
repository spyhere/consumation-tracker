const jwt = require("jsonwebtoken")

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]

  if (!token) {
    return res.status(403).send("No token provided")
  }

  try {
    req.user = jwt.decode(token, process.env.TOKEN)
    if (!req.user) {
      throw new Error()
    }
  } catch (e) {
    return res.status(401).send("Invalid token")
  }

  return next()
}

module.exports = verifyTokenMiddleware

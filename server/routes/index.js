require("express-group-routes")
const express = require("express")
const router = express()
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware")
const UserController = require("../controllers/userController")

router.use(verifyTokenMiddleware)

router.group("/users", (router) => {
  router.get("/", UserController.index)
})

module.exports = router

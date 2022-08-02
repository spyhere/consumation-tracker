require("express-group-routes")
const express = require("express")
const router = express()
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware")
const isAdminMiddleware = require("../middlewares/isAdminMiddleware")
const UserController = require("../controllers/userController")

router.use(verifyTokenMiddleware)

router.group("/users", (router) => {
  router.use(isAdminMiddleware)
  router.get("/", UserController.index)
})

module.exports = router

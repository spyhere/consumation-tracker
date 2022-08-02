require("express-group-routes")
const express = require("express")
const router = express()
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware")
const isAdminMiddleware = require("../middlewares/isAdminMiddleware")
const UserController = require("../controllers/userController")
const EntryController = require("../controllers/entryController")

router.use(verifyTokenMiddleware)

router.group("/users", (router) => {
  router.use(isAdminMiddleware)
  router.get("/", UserController.index)
})

router.group("/entries", (router) => {
  router.get("/", EntryController.index)
})

module.exports = router

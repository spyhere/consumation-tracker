require("express-group-routes")
const express = require("express")
const router = express()
const UserController = require("../controllers/userController")

router.group("/users", (router) => {
  router.get("/", UserController.index)
})

module.exports = router

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
  router.post("/", EntryController.store)
  router.put("/:entry", isAdminMiddleware, EntryController.update)
  router.delete("/:entry", isAdminMiddleware, EntryController.destroy)
  router.get("/stats", EntryController.getStats)
})

module.exports = router

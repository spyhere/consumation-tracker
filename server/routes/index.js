require("express-group-routes")
const express = require("express")
const router = express()
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware")
const isAdminMiddleware = require("../middlewares/isAdminMiddleware")
const UserController = require("../controllers/userController")
const EntryController = require("../controllers/entryController")

router.use(verifyTokenMiddleware)

router.group("/admin", (router) => {
  router.use(isAdminMiddleware)
  router.group("/users", (router) => {
    router.get("/", UserController.index)
    router.get("/:user/entries/stats", EntryController.getStats)
    router.get("/:user/entries", EntryController.index)
    router.post("/:user/entries", EntryController.store)
  })
})

router.group("/entries", (router) => {
  router.get("/", EntryController.index)
  router.get("/by-dates", EntryController.filterEntriesByDates)
  router.post("/", EntryController.store)
  router.put("/:entry", isAdminMiddleware, EntryController.update)
  router.delete("/:entry", isAdminMiddleware, EntryController.destroy)
  router.get("/stats", EntryController.getStats)
})

module.exports = router

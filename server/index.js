const app = require("./app")
const http = require("http")
const server = http.createServer(app)

const port = process.env.PORT || process.env.PORT

server.listen(port, () => {
  console.log("\x1b[32m%s\x1b[0m", "Server is started on localhost:" + port)
})

require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const {log} = require("mercedlogger")
const cors = require("cors")
const userInfoRouter = require("./controllers/usersGithub")
const repoRouter = require("./controllers/repos")
const rateLimit = require('express-rate-limit')
const port =3000

const app = express()

app.use(cors())
app.use(morgan("tiny"))
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({limit: '2mb'}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Rate limit exceeded'
})

app.use(limiter)

app.use("/api/users", userInfoRouter)
app.use("/api/repos", repoRouter)

app.listen(port, () => log.green("SERVER STATUS", `Listening on port ${port}`))

module.exports = {
  app
}
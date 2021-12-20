const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const { sessionList, initialise } = require("./sessionEventHub")

const app = express()

const sessionEventHub = initialise()

const port = process.env.PORT || 3000
const jsonParser = bodyParser.json()

app.use(express.static(path.join(__dirname, '../client/build')))

app.use(session({
  secret: 'treepollSessions',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 60000
  }
}))

app.listen(port, () => {
  console.log("Server listening on port " + port)
})

// CLIENT
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

// API
app.post('/session', jsonParser, (req, res) => {
  const sessionId = Date.now().toString(36) + Math.random().toString(36).substring(2)
  req.session.authedSessionIds = [...req.session.authedSessionIds || [], sessionId]
  sessionEventHub.emit("sessionAdd", req.body, sessionId)
  res.end(sessionId)
})

app.get('/session/:sessionId/all', (req, res) => {
  const sessionId = req.params.sessionId
  if (sessionList[sessionId]) {
    res.status(200)
    res.write(JSON.stringify(sessionList[sessionId]))
  } else {
    res.status(404)
    res.write(sessionId + "not found.")
  }
  res.end()
})

app.post('/session/:sessionId/feed', jsonParser, (req, res) => {
  sessionEventHub.emit("feedAdd", req.body, req.params.sessionId)
})

app.get('/time', (req, res) => {
  res.end(Date.now().toString())
})

//All other endpoints
app.get('/:session', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

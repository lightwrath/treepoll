const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

const port = process.env.PORT || 3000
const jsonParser = bodyParser.json()
const sessionList = {}

app.use(express.static(path.join(__dirname, '../client/build')))

app.listen(port, () => {
  console.log("Server listening on port " + port)
})

// CLIENT
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

// API
app.post('/session', jsonParser,(req, res) => {
  console.log("Recieved new session request", req.body)
  const sessionId = Date.now().toString(36) + Math.random().toString(36).substring(2)
  console.log(req.body)
  sessionList[sessionId] = req.body
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

app.get('/session/:sessionId', (req, res) => {
  console.log("API endpoint here")
  res.send(config)
})

app.get('/session/:sessionId/signals', (req, res) => {
  console.log("API endpoint here")
  res.send(config)
})

app.get('/time', (req, res) => {
  res.end(Date.now().toString())
})

//All other endpoints
app.get('/:session', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

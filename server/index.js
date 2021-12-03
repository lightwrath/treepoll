const express = require('express')
const app = express()

const port = process.env.PORT || 3000

let config
app.get('/', (req, res) => {
  config = require("./test/testConfig.json")
  res.send('Hello')
})

app.get('/testEndPoint', (req, res) => {
  console.log("testEndPoint")
  res.send(config)
})

app.listen(port, () => {
  console.log("Server listening on port " + port)
})

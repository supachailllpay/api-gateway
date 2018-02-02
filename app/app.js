const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

const api = require('./routes/api')
const data = require('./routes/data')

app.use('/api', api)
app.use('/data', data)

app.use('/editor', (req, res, next) => {
  res.sendFile(path.resolve('views/index.html'))
})

app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({ ok: false, message: err.message })
})

module.exports = app

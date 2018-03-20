const express = require('express')
const app = express()

app.use(express.static('public'))

const api = require('./routes/api')
const data = require('./routes/data')
const editor = require('./routes/editor')

app.use('/api', api)
app.use('/data', data)
app.use('/editor', editor)

module.exports = app

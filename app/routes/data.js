const express = require('express')
const bodyParser = require('body-parser')
const debug = require('debug')
const database = require('../database')

const router = express.Router()
const log = debug('app:data')

router.use(bodyParser.json())

router.get('/', (req, res, next) => {
  database.get().then(data => {
    res.json({ ok: true, data })
  }).catch(next)
})

router.put('/', (req, res, next) => {
  database.set(req.body.data).then(() => {
    res.json({ ok: true })
  }).catch(next)
})

router.use((err, req, res, next) => {
  log(err)
  res.status(err.status || 500)
  res.json({ ok: false, message: err.message })
})

module.exports = router

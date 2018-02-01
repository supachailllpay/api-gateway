const express = require('express')
const database = require('../database')
const router = express.Router()

router.get('/', (req, res, next) => {
  let data = database.get()
  res.json(data)
})

router.post('/', (req, res, next) => {
  let data = req.body.data
  database.set(data)
  res.json({ ok: true })
})

module.exports = router

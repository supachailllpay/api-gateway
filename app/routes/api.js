const express = require('express')
const database = require('../database')
const router = express.Router()

router.use((req, res, next) => {
  let path = req.path
  let method = req.method

  let data = database.get('data')
  let routes = data.routes
  let found = false

  routes.forEach(route => {
    if (found) return
    let pathExp = new RegExp(`^${route.path}$`)
    let methodExp = new RegExp(route.method, 'i')
    if (pathExp.test(path) && methodExp.test(method)) {
      res.json(route.response)
      found = true
    }
  })

  if (!found) next()
})

module.exports = router

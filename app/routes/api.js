const express = require('express')
const request = require('request')
const vm = require('vm')
const debug = require('debug')
const database = require('../database')

const router = express.Router()
const log = debug('app:api')

const makeGenerator = function * (array) {
  let index = 0
  while (index < array.length) {
    yield array[index]
    index += 1
  }
}

const testRoute = function (route, req) {
  let { path, method } = route
  let pathExp = new RegExp(`^${path}$`)
  let methodExp = new RegExp(method, 'i')
  return pathExp.test(req.path) && methodExp.test(req.method)
}

const useRoute = function (route, req, res, next) {
  let { type, response } = route
  if (testRoute(route, req)) {
    switch (type) {
      case 'json':
        res.json(response)
        return
      case 'proxy':
        req.pipe(request(response)).pipe(res)
        return
      case 'function':
        let sandbox = { req, res, next }
        vm.createContext(sandbox)
        vm.runInContext(response, sandbox)
        return
    }
  }
  next()
}

router.use((req, res, next) => {
  database.get().then(data => {
    let generator = makeGenerator(data.routes)
    ;(function next () {
      let route = generator.next().value
      if (route) {
        log(route.method, route.path)
        useRoute(route, req, res, next)
      }
    }())
  }).catch(next)
})

router.use((err, req, res, next) => {
  log(err)
  res.status(err.status || 500)
  res.json({ ok: false, message: err.message })
})

module.exports = router

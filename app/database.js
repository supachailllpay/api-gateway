const fs = require('fs')
const util = require('util')

const read = util.promisify(fs.readFile)
const write = util.promisify(fs.writeFile)
const file = process.env.FILE

module.exports.get = function () {
  return read(file).then(data => JSON.parse(data))
}

module.exports.set = function (data) {
  return write(file, JSON.stringify(data, null, 2))
}

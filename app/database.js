const fs = require('fs')

module.exports.get = function () {
  let data = {}
  let path = process.env.FILE
  if (fs.existsSync(path)) {
    let file = fs.readFileSync(path)
    data = JSON.parse(file)
  }
  return data
}

module.exports.set = function (data) {
  let path = process.env.FILE
  let string = JSON.stringify(data, null, 2)
  fs.writeFileSync(path, string)
}

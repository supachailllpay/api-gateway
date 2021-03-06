const http = require('http')
const chalk = require('chalk')

const app = require('./app')
const server = http.createServer(app)

const host = '0.0.0.0'
const port = parseInt(process.env.PORT, 10)
const file = process.env.FILE

server.listen(port, host, () => {
  let address = server.address()
  let host = address.address
  let port = address.port
  let { blue, magenta, yellow } = chalk
  process.stdout.write([
    ``,
    `${yellow('api-gateway')} ${magenta('(∩｀-´)⊃━☆ﾟ.*･｡ﾟ')}`,
    ``,
    `- API serving at ${blue(`${host}:${port}/api`)}`,
    `- Editor serving at ${blue(`${host}:${port}/editor`)}`,
    `- Data file using at ${blue(file)}`,
    ``
  ].join('\n') + '\n')
})

/*****************************************/
/* Этапы выполнения событий в Event Loop */
/*****************************************/

const fs = require('fs')
const dns = require('dns')

function info(text) {
  console.log(text, performance.now().toFixed(2))
}

console.log('start')

setTimeout(() => info('setTimeout 1'), 0)

setTimeout(() => {
  process.nextTick(() => info('nextTick 2'))
  info('setTimeout 2')
}, 10)

// Close event
fs.writeFile('./test.txt', 'Some text', () => info('File written'))

Promise.resolve().then(() => info('Promise 1'))

process.nextTick(() => info('nextTick 1'))

// Check event
setImmediate(() => info('setImmediate 1'))

// I/O event
dns.lookup('localhost', (error, address, family) => {
  info(`DNS 1 localhost:: ${address}`)
  Promise.resolve().then(() => info('Promise 2'))
  process.nextTick(() => info('ne xtTick 3'))
})

console.log('end')

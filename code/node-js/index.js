//* dotenv
const dotenv = require('dotenv')
dotenv.config()
// console.log(process.env)

//* path
const path = require('path')
// console.log(path.join('one', 'two', 'three'))
// console.log(path.join(__dirname, 'one', 'two', 'three'))
// console.log(path.join(__dirname, '..'))
// console.log(path.resolve('one', 'two', 'three'))
// console.log(path.resolve('/one', 'two', 'three'))
// console.log(path.parse('/home/t_tarantul/NodeJSCourse/one/two/three'))

//* fs, fsPromise
const fs = require('fs')
const fsPromise = require('fs/promises')

//* Создание папки
// fs.mkdir(path.resolve(__dirname, 'dir'), (error) => {
// 	if (error) console.log(error)
// 	else console.log('dir was created!')
// })

//* Создание рекурсивную иерархию папок
// fs.mkdir(path.resolve(__dirname, 'dir1', 'dir2'), { recursive : true }, (error) => {
// 	if (error) console.log(error)
// 	else console.log('dir was created!')
// })

//* Удаление папки
// fs.rmdir(path.resolve(__dirname, 'dir'), (error) => {
// 	if (error) console.log(error)
// 	else console.log('dir was removed!')
// })

//* Создание файла и запись(перезапись) его содержимого
// fs.writeFile(path.resolve(__dirname, 'file.txt'), 'some text', (error) => {
// 	if (error) console.log(error)
// })

//* Добавление данных в файл (создание файла, если такого нет)
// fs.appendFile(path.resolve(__dirname, 'file.txt'), '\nsome data in the end', (error) => {
// 	if (error) console.log(error)
// })

//* Удаление файла
// fs.rm(path.resolve(__dirname, 'file.txt'), (error) => {
// 	if (error) console.log(error)
// })

//* Создание файла, дозапись и чтение данных с помощью Promise
//* Старый способ
// const filePath = path.resolve(__dirname, 'file.txt')

// async function writeFileAsync(path, data) {
// 	return new Promise((resolve, reject) => fs.writeFile(path, data, (error) => {
// 		if (error) reject(error.message)
// 		else resolve()
// 	}))
// }

// async function appendFileAsync(path, data) {
// 	return new Promise((resolve, reject) => fs.appendFile(path, data, (error) => {
// 		if (error) reject(error.message)
// 		else resolve()
// 	}))
// }

// async function readFileAsync(path) {
// 	return new Promise((resolve, reject) => fs.readFile(path, { encoding: 'utf-8' }, (error, data) => {
// 		if (error) reject(error.message)
// 		else resolve(data)
// 	}))
// }

// async function removeFileAsync(path) {
// 	return new Promise((resolve, reject) => fs.rm(path, (error) => {
// 		if (error) reject(error.message)
// 		else resolve()
// 	}))
// }

// writeFileAsync(filePath, 'some text')
// 	.then(() => appendFileAsync(filePath, '\nHello'))
// 	.then(() => appendFileAsync(filePath, ' World!'))
// 	.then(() => readFileAsync(filePath))
// 	.then((data) => console.log(data))
// 	.then(() => removeFileAsync(filePath))
// 	.catch(error => console.log(error))

//* Современный способ
// const filePath = path.resolve(__dirname, 'file.txt')

// fsPromise.writeFile(filePath, 'some text')
// .then(() => fsPromise.appendFile(filePath, '\nHello World!'))
// .then(() => fsPromise.readFile(filePath, { encoding: 'utf-8' }))
// .then(() => fsPromise.rm(filePath))
// .catch((error) => console.log(error))

//* Задача
// const text = process.env.TEXT || ''
// const textFile = path.resolve(__dirname, 'text.txt')
// const countFile = path.resolve(__dirname, 'count.txt')

// fsPromise.writeFile(textFile, text)
// .then(() => fsPromise.readFile(textFile, { encoding: 'utf-8' }))
// .then((data) => fsPromise.writeFile(countFile, String(data.split(' ').length)))
// .then(() => fsPromise.rm(textFile))
// .catch(error => console.log(error))

//* os, cluster
const os = require('os')
const cluster = require('cluster')

// console.log(os.platform())
// console.log(os.arch())
// console.log(os.cpus())

// if (cluster.isPrimary) {
// 	for (let i = 0; i < os.cpus().length - 10; i++) {
// 		cluster.fork()
// 	}

// 	cluster.on('exit', (worker, code, signal) => {
// 		console.log(`Worker pid=${worker.process.pid} KILLED`)
// 		cluster.fork()
// 	})

// } else {
// 	console.log(`Worker pid=${process.pid} ALREADY works.`)
// 	setInterval(() => console.log(`Worker pid=${process.pid} STILL working`), 5000)
// }

//* events
const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

// eventEmitter.on('message', (msg) => console.log(msg))
// eventEmitter.emit('message', process.env.MESSAGE)
// eventEmitter.emit('message', process.env.MESSAGE)

// eventEmitter.once('messageOnce', (msg) => console.log(msg))
// eventEmitter.emit('messageOnce', process.env.MESSAGE)
// eventEmitter.emit('messageOnce', process.env.MESSAGE)

//* stream
// const readableStream = fs.createReadStream(path.resolve(__dirname, 'readStream.txt'))

// readableStream.on('data', (chunk) => console.log(chunk))
// 			.on('open', () => console.log('Start reading!\n'))
// 			.on('end', () => console.log('\nFinish reading!'))
// 			.on('error', (error) => console.log(error))

// const writableStream = fs.createWriteStream(path.resolve(__dirname, 'writeStream.txt'))

// for (let i = 0; i < 100; i++) {
// 	writableStream.write(i + ' - ')
// }
// writableStream.end() // writableStrem.close(), writableStream.destroy()

//* http
// const events = [
//   {
//     "id": 1,
//     "day": "30.12.2023",
//     "title": "Приютили кошку",
//     "photos": [],
//     "description": "Взяли у тёти Вали 6-месячную кошечку, назвали её Мёрси (с англ. Mercy - милосердие)",
//     "tags": ["кошка", "животные"]
//   }
// ]
const http = require('http')
// const PORT = process.env.PORT || 5000
// const baseURL = 'http://localhost:5000'

// const server = http.createServer((req, res) => {
//   const parsedURL = new URL(req.url, baseURL)
//   const pathname = parsedURL.pathname
//   const method = req.method
//   const params = Object.fromEntries(parsedURL.searchParams)

// 	if (pathname === '/events') {
//     res.writeHead(200, {
//       'Content-Type': 'application/json'
//     })

// 		res.end(JSON.stringify(events))

// 	} else if (pathname === '/books') {
//     res.writeHead(200, {
//       'Content-Type': 'text/html'
//     })

// 		res.end(`<h1>books</h1>`)

// 	} else if (pathname === '/movies') {
//     res.writeHead(200, {
//       'Content-Type': 'text/html'
//     })

// 		res.end(`<h1>movies</h1>`)

// 	} else res.end()
// })

// server.listen(PORT, (error) => {
//   if (error) console.log(error)
//   else console.log(`Server started on PORT=${PORT}.`)
// })

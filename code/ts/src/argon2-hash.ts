import 'reflect-metadata'
import { argon2, randomBytes } from 'crypto'

console.time('foo')
const hashSet = new Set<string>
const message = 'qwerty123'
const secretFromENV = randomBytes(16)
const associatedDataFromENV = randomBytes(16)

const easyHashParams = {
	nonce: randomBytes(16),
	parallelism: 4,
	tagLength: 128,
	memory: 131072,
	passes: 4,
	secret: secretFromENV,
	associatedData: associatedDataFromENV
}
// const hardHashParams = {
// 	nonce: randomBytes(128),
// 	parallelism: 128,
// 	tagLength: 128,
// 	memory: 1000000,
// 	passes: 128,
// 	secret: randomBytes(128),
// 	associatedData: randomBytes(128)
// }

argon2(
	'argon2id',
	{ message, ...easyHashParams },
	getHash
)

function getHash(error: any, derivedKey: Buffer){
	const hash = derivedKey.toString('hex')
	
	hashSet.add(hash)
	console.log(hash)
}

function verifyHash(error: any, derivedKey: Buffer) {
	const hash = derivedKey.toString('hex')

	if (hashSet.has(hash))
		console.log(true)
	else
		console.log(false)
}

argon2(
	'argon2id',
	{ message, ...easyHashParams },
	verifyHash
)

argon2(
	'argon2id',
	{ message: 'wrongmessage', ...easyHashParams },
	verifyHash
)

console.timeEnd('foo')
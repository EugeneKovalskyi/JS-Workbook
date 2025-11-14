import type { BinaryLike, CipherKey } from 'crypto'
import { createDecipheriv, createCipheriv, randomBytes } from 'crypto'

const data = ['Content-Type:', 'application/json']
const aad = randomBytes(16)
const key = randomBytes(32)
const iv = randomBytes(15)

function encrypt(data: any, key: CipherKey, iv: BinaryLike, aad: Buffer) {
	const cipher = createCipheriv('aes-256-ocb', key, iv, { authTagLength: 15 })

	cipher.setAAD(aad)

	const encrypted = Buffer.concat([
		cipher.update(data[0], 'utf-8'),
		cipher.update(data[1], 'utf-8'),
		cipher.final()
	])

	const tag = cipher.getAuthTag()

	return { encrypted, tag }
}

function decrypt(
	encrypted: Buffer,
	key: CipherKey,
	iv: BinaryLike,
	aad: Buffer,
	tag: Buffer
) {
	const decipher = createDecipheriv('aes-256-ocb', key, iv, { authTagLength: 15 })

	decipher.setAAD(aad)
	decipher.setAuthTag(tag)

	const decrypted = Buffer.concat([
		decipher.update(encrypted),
		decipher.final()
	])

	return decrypted
}

const { encrypted, tag } = encrypt(data, key, iv, aad)
const decrypted = decrypt(encrypted, key, iv, aad, tag)

console.log('encrypted:', encrypted)
console.log('tag:', tag)
console.log('decrypted:', decrypted)
console.log('data:', decrypted.toString('utf-8'))

/*
* При 'aes-256-ocb':
	. key === 32 байта (256 бит)
 	. iv === 15 байт
 	. authTagLength === от 1 до 16 байт
	
* При 'aes-256-gcm':
	. key === 32 байта (256 бит)
 	. iv === 12 байт
	. authTagLength === от 4 до 16 байт

* cipher.setADD(aad) - устанавливает дополнительные данные для аутентификации
* cipher.getAuthTag() - возвращает тег аутентификации
* decipher.setAuthTag(tag) - устанавливает тег аутентификации для расшифровки
*/
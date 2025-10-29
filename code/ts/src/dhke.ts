import { createDiffieHellman } from 'crypto'

console.time('\nghke')

const alpha = createDiffieHellman(2048)
const alphaKey = alpha.generateKeys() //* A

const prime = alpha.getPrime() //* p
const generator = alpha.getGenerator() //* g

const bravo = createDiffieHellman(prime, generator)
const bravoKey = bravo.generateKeys() //* B

const alphaSecret = alpha.computeSecret(bravoKey) //* s = B ** a % p
const bravoSecret = bravo.computeSecret(alphaKey) //* s = A ** b % p


console.log('\nalpha:\n', alpha)
console.log('\nalphaKey:\n', alphaKey.toString('hex'))
console.log('\nbravo:\n', bravo)
console.log('\nbravoKey:\n', bravoKey.toString('hex'))
console.log('\nprime:\n', prime.toString('hex'))
console.log('\ngenerator:\n', generator.toString('hex'))
console.log('\nalphaSecret:\n', alphaSecret.toString('hex'))
console.log('\nbravoSecret:\n', bravoSecret.toString('hex'))

console.timeEnd('\nghke')

///		Псевдослучайный генератор

function* pseudoRandom(seed) {
	while (true) {
		seed = (seed * 16807) % 2147483647

		yield seed
	}
}

const generator = pseudoRandom(99)

console.log(generator.next().value)
console.log(generator.next().value)
console.log(generator.next().value)

///		Определить вернется ли путник в то место, откуда он начинал свой путь.
///		Проверить на валидность массив, содержащий 4 разных направления.

const route1 = ['N', 'E', 'W', 'S', 'W', 'E', 'E', 'S', 'W', 'N']
const route2 = ['N', 'W', 'S', 'W', 'E', 'E', 'W', 'N']

function isValidRoute(route) {
	let sidesCounter = {
		N: 0,
		E: 0,
		W: 0,
		S: 0,
	}

	for (let i = 0; i < route.length; i++) {
		sidesCounter[route[i]]++
	}

	return sidesCounter.W === sidesCounter.E && 
				 sidesCounter.S === sidesCounter.N 
				 ? true : false
}

console.log(isValidRoute(route1))
console.log(isValidRoute(route2))

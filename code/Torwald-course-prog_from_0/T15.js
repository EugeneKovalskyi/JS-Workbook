///		Найти самую длинную последовательность единиц

const array = [0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0]

let max = 0
let current = 0

for (let i = 0; i < array.length; i++) {
	if (array[i] === 0) {
		if (current > max) 
			max === current

		current = 0
		continue
	}

	current++
}

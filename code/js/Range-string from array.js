function range(array) {
	const sortedArray = [...array].sort((prev, next) => prev - next)
	const result = []
	let from = sortedArray[0]
	let to = sortedArray[0]

	for (let i = 0; i < sortedArray.length; i++) {
		if (sortedArray[i] + 1 === sortedArray[i + 1]) 
			to = sortedArray[i + 1]
		else {
			if (from !== to) 
				result.push(from + '-' + to)
			else 
				result.push(from)

			from = to = sortedArray[i + 1]
		}
	}

	return result.join(', ')
}

// '0-5, 8-9, 11, 19-21'
console.log(range([1, 4, 5, 2, 3, 9, 8, 11, 19, 20, 21, 0]))
// '1-4'
console.log(range([1, 4, 3, 2]))

///		2-х мерная непрерывная последовательность 'x' рисует пряиоугольные фигуры
///		Линейная сложность 5N - C

const matrix = ['xooxo', 'xooxo', 'oooxo', 'xxoxo', 'oxooo']

function perimeter(matrix) {
	let result = 0

	for (let i = 0; i < matrix.length; i++) {
		const currentRow = matrix[i]
		const topRow = matrix[i - 1]
		const bottomRow = matrix[i + 1]

		for (let k = 0; k < currentRow.length; k++) {
			const currentElem = currentRow[k]

			if (currentElem === 'o') continue
			else result += 4

			const leftElem = currentRow?.[k - 1]
			const rightElem = currentRow?.[k + 1]
			const topElem = topRow?.[k]
			const bottomElem = bottomRow?.[k]

			if (leftElem === 'x') result--
			if (rightElem === 'x') result--
			if (topElem === 'x') result--
			if (bottomElem === 'x') result--
		}
	}

	return result
}

console.log(perimeter(matrix))

///		Группировка анаграмм

const groupAnagrams = (arr) => {
	const map = new Map()

	for (const str of arr) {
		const sortedStr = str.split('').sort().join('')

		if (map.has(sortedStr)) map.get(sortedStr).push(str)
		else map.set(sortedStr, [str])
	}
	return [...map.values()]
}

// [[abc, cba, bca], [led, del], [offer,reffo], [ez]]
console.log(
	groupAnagrams(['offer', 'reffo', 'abc', 'cba', 'bca', 'led', 'del', 'ez']),
	'group Anagram'
)

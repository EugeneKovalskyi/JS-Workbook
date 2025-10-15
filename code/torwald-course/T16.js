///		Проверить на валидность строку.
///		Каждой открытой скобке должна соответствовать закрытая скобка в правильном соответствующем месте.
///		"{[](){}([()])}" - пример валидной строки.

const str1 = '{[](){}([()])}'
const str2 = '[[{}]](((()))[[]]{{}}){}'

function isValidString(str) {
	let array = new Array()
	let brackets = {
		')': '(',
		'}': '{',
		']': '[',
	}

	if (str.length % 2 === 1) 
		return false

	for (let i = 0; i < str.length; i++) {
		if (str[i] in brackets) {
			if (brackets[str[i]] === array.at(-1)) {
				array.pop()
				continue
			} else 
				return false
		}

		array.push(str[i])
	}

	return array.length ? false : true
}

console.log(isValidString(str1))
console.log(isValidString(str2))

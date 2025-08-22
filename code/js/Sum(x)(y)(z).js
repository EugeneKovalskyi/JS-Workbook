/// Сумма с произвольным количеством скобок

let result = 0

function sum(x) {
	result += x
	return sum
}

sum[Symbol.toPrimitive] = function () {
	let temp = result
	result = 0
	return temp
}

console.log(sum(1)(2)(3)) // 6

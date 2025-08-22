///		Алгоритмы чисел Фибоначчи

// Константная сложность, но с увеличением последовательности растет погрешность
function fib1(n) {
	return Math.round(
		(((1 + Math.sqrt(5)) / 2) ** n - ((1 - Math.sqrt(5)) / 2) ** n) / Math.sqrt(5)
	)
}

console.log(fib1(77))

// Линейная сложность (2N)
function fib2(n) {
	let arr = [1, 1]

	for (let i = 2; i < n; i++) {
		const temp = arr[0] + arr[1]
		arr[0] = arr[1]
		arr[1] = temp
	}

	return arr[1]
}

console.log(fib2(77))

// Экспоненциальная сложность (1.6 ** n)
function fib3(n) {
	return n <= 1 ? n : fib3(n - 1) + fib3(n - 2)
}

console.log(fib3(20))

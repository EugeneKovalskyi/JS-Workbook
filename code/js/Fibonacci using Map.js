/// 	Последовательность Фибоначчи с помощью Map

const cache = new Map()

function fibonacci(n) {
	return new Promise((resolve) => {
		if (n === 0 || n === 1) 
			return resolve(n)

		if (cache.has(n)) 
			return resolve(cache.get(n))

		Promise.all([
			fibonacci(n - 1), 
			fibonacci(n - 2)]
		).then(([fib1, fib2]) => {
			cache.set(n, fib1 + fib2)
			resolve(fib1 + fib2)
		})
	})
}

fibonacci(1000).then((result) => console.log(result))

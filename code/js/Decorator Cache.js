let workers = {
	someProp: 10,
	someMethod(arg1, arg2) {
		return arg1 + arg2 + this.someProp
	},
}

workers.someMethod = cachingDecorator(workers.someMethod, hash)

function hash() {
	return [].join.call(arguments)
}

function cachingDecorator(func, hash) {
	const cache = new Map()

	return function (...args) {
		let key = hash(arguments)
		if (cache.has(key)) return cache.get(key)
		let result = func.apply(this, args)
		cache.set(key, result)

		return result
	}
}

console.log(workers.someMethod(1, 2))

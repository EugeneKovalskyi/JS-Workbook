///		Результат декоратора debounce(f, ms) – это обёртка, которая откладывает
///		вызовы f, пока не пройдёт ms миллисекунд бездействия (без вызовов,
///		«cooldown period»), а затем вызывает f один раз с последними аргументами.

function foo(x) {
	console.log(x)
}

function debounce(func, ms) {
	let runIndicator = false

	return function () {
		if (runIndicator) return
		func.apply(this, arguments)
		runIndicator = true
		setTimeout(() => (runIndicator = false), ms)
	}
}

foo = debounce(foo, 2000)

foo(1)
foo(2)
setTimeout(foo, 1000, 3)
setTimeout(foo, 3000, 4)
foo(5)
setTimeout(foo, 8000, 6)

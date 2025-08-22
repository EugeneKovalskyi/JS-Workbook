/// 	Создайте декоратор delay(f, ms),
/// 	который задерживает каждый вызов f на ms миллисекунд.

function foo(x) {
	console.log(x)
}

function delay(func, ms) {
	return function () {
		setTimeout(() => {
			func.apply(this, arguments)
		}, ms)
	}
}

const bar = delay(foo, 1000)
const snafu = delay(foo, 2000)

bar('test 1000')
snafu('test 2000')

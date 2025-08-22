///		Создайте «тормозящий» декоратор throttle(f, ms), который возвращает обёртку.
/// 	При многократном вызове он передает вызов f не чаще одного раза в ms миллисекунд.
///		По сравнению с декоратором debounce поведение совершенно другое:
///			- debounce запускает функцию один раз после периода «бездействия».
/// 			Подходит обработки конечного результата.
///			- throttle запускает функцию не чаще, чем указанное время ms.
/// 			Подходит для регулярных обновлений, которые не должны быть слишком частыми.

function foo(x) {
	console.log(x)
}

function throttle(func, ms) {
	let runIndicator = false
	let savedArgs = null
	let savedThis = null

	return function wrapper() {
		if (runIndicator) {
			savedArgs = arguments
			savedThis = this

			return
		}

		func.apply(this, arguments)
		runIndicator = true
		setTimeout(() => {
			runIndicator = false

			if (savedArgs) {
				wrapper.apply(savedThis, savedArgs)
				savedArgs = null
				savedThis = null
			}
		}, ms)
	}
}

const bar = throttle(foo, 1000)

bar(1)
bar(2)
bar(3)

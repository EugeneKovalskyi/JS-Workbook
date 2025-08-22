///		Расширяемый калькулятор

function Calculator() {
	this.operationStorage = {
		'+': (x, y) => x + y,
		'-': (x, y) => x - y,
	}

	this.calculate = (str) => {
		let [x, operator, y] = str.split(' ')

		return this.operationStorage[operator](+x, +y)
	}

	this.addMethod = (operator, func) => (
		this.operationStorage[operator] = func
	)
}

let powerCalc = new Calculator()

powerCalc.addMethod('*', (a, b) => a * b)
powerCalc.addMethod('/', (a, b) => a / b)
powerCalc.addMethod('**', (a, b) => a ** b)

console.log(powerCalc.calculate('3 + 7'))
console.log(powerCalc.calculate('2 * 3'))
console.log(powerCalc.calculate('2 ** 3'))

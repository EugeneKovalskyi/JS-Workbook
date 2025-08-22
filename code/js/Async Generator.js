///		Асинхронный генератор

async function* generateAsyncSequence(start, end) {
	for (let i = start; i <= end; i++) {
		await new Promise((resolve) => setTimeout(resolve, 1000))

		yield i
	}
}

;(async () => {
	let asyncGenerator = generateAsyncSequence(1, 5)

	for await (let value of asyncGenerator) console.log(value)
})()

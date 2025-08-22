///		Асинхронный запрос async await

// fetch then
function showAwatarThen() {
	fetch('https://api.github.com/users/EugeneKovalskyi')
		.then((response) => response.json())
		.then(
			(user) =>
				new Promise((resolve) => {
					let img = document.createElement('img')

					img.src = user.avatar_url
					document.body.append(img)
					setTimeout(() => resolve(user))
				})
		)
		.then((user) => console.log(user.name))
		.catch((error) => console.log(error))
}

showAwatarThen()

// async await
async function showAwatarAsync() {
	let response = await fetch('https://api.github.com/users/EugeneKovalskyi')
	let user = await response.json()
	let img = document.createElement('img')

	img.src = user.avatar_url
	document.body.append(img)
	await new Promise((resolve, reject) => setTimeout(resolve, 3000))
	img.remove()

	return user
}

showAwatarAsync()

const str = 'web-site-you-know-about-it-some-times-old-are-crazy'

function camelize(str) {
	return str
		.split('-')
		.map((word, index) => {
			if (index)
				return word[0].toUpperCase() + word.slice(1)
			else 
				return word
		})
		.join('')
}

console.log(camelize(str))

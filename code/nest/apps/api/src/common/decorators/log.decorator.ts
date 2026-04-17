import { Logger } from '@nestjs/common'

export default function Log<T extends new (...args: any[]) => any>() {
	const logger = new Logger('Log.decorator')

	return function (target: T) {
		const fields = Object.getOwnPropertyNames(target.prototype).filter(
			property => property !== 'constructor',
		)

		return class extends target {
			constructor(...superArgs: any[]) {
				super(...superArgs)

				for (const field of fields) {
					if (this[field] instanceof Function) {
						this[field] = new Proxy(this[field], {
							apply(method, thisArg, args) {
								let result: any

								logger.log(`${field} called: ${JSON.stringify(args, null, 2)}`)

								try {
									result = Reflect.apply(method, thisArg, args)
								} catch (error) {
									logger.error(`${field} threw error: ${error}`)
									throw error
								}

								logger.log(`${field} completed: ${JSON.stringify(result, null, 2)}`)

								return result
							},
						})
					} else {
						logger.log(`${field} === ${JSON.stringify(this[field], null, 2)}`)
					}
				}
			}
		}
	}
}

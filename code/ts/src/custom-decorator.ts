import 'reflect-metadata'

const CALLED = '\x1b[1;34mCALLED\x1b[0m'
const SUCCESS = '\x1b[1;32mSUCCESS\x1b[0m'
const ERROR = '\x1b[1;31mERROR\x1b[0m'
const PROPERTY = '\x1b[2;32mPROPERTY\x1b[0m'
const CACHE = '\x1b[1;38;5;215mCACHE\x1b[0m'

//* Class Decorator
//: Главная идея:
// - логгирование всех методов и свойств класса
// - логгирование отмеченных функций внутри метода (например someFunc().log())
function Log<T extends new (...args: any[]) => any>() {
  return function(target: T) {
		const fields = Object.getOwnPropertyNames(target.prototype).filter(
			(property) => property !== 'constructor'
		)

		return class extends target {
			constructor(...superArgs: any[]) {
				super(...superArgs)

				for (const field of fields) {
					const styledFieldStr = '\x1b[38;2;30;190;10m' + field + '\x1b[0m'

					if (this[field] instanceof Function) {
						this[field] = new Proxy(this[field], {
							apply(method, thisArg, args) {
                let result: any

								console.info(
									`\n${CALLED}: ${styledFieldStr} with arguments: ` +
									`\x1b[33m${JSON.stringify(args, null, 2)}\x1b[0m`
								)

								try {
									result = Reflect.apply(method, thisArg, args)
								} catch (error) {
									console.error(`${ERROR}: ${styledFieldStr} throw ${error}`)
									throw error
								}

                console.info(
								  `${SUCCESS}: ${styledFieldStr} return: ` +
									`\x1b[33m${JSON.stringify(result, null, 2)}\x1b[0m`
								)

								return result
							},
						})
					} else {
						console.info(
							`${PROPERTY}: ${styledFieldStr} === ` +
							`\x1b[33m${JSON.stringify(this[field], null, 2)}\x1b[0m`
						)
					}
				}
			}
		}
	}
}

//* Property Decorator
function IsString() {
  return function(target: any, propertyKey: string) {
    const metadataPropertyKey = Symbol(propertyKey)

    Object.defineProperty(target, propertyKey, {
      get: function (this: any) {
        return Reflect.getOwnMetadata(metadataPropertyKey, this)
      },

      set: function (this: any, value: string) {
        if (typeof value !== 'string')
          throw new Error('\x1b[31m"name" must be <string>.\x1b[0m')

        Reflect.defineMetadata(metadataPropertyKey, value, this)
      }
    })
  }
}

//* Method Decorator
function CacheResult() {
  return function (target: any, methodKey: string, descriptor: any) {
    descriptor.value = new Proxy(descriptor.value, {
			apply(method, thisArg, args) {
				const cacheKey = 'cache::' + args

				const cache = Reflect.getOwnMetadata(cacheKey, target, methodKey)

				if (cache) {
					console.warn(`${CACHE}: "\x1b[33m${thisArg.name}\x1b[0m": returned from cache`)
					return cache
				}

				const result = Reflect.apply(method, thisArg, args)
        
				Reflect.defineMetadata(cacheKey, result, target, methodKey)

				console.warn(`${CACHE}: "\x1b[33m${thisArg.name}\x1b[0m": value cached`)
				return result
			},
		})
    
    return descriptor
  }
}

//* Parameter Decorator
function Max(value: number) {
  return function (target: any, methodKey: string, paramIndex: number) {
    const decoKey = 'Max'
    const params = Reflect.getOwnMetadata(decoKey, target, methodKey) || []
    const paramKey = target[methodKey].toString()
      .match(/\(([^)]*?)\)/)?.[1]?.split(',')[paramIndex].trim()

    params.push({ 
      key: paramKey,
      index: paramIndex,
      maxValue: value
    })

    Reflect.defineMetadata(decoKey, params, target, methodKey)
  }
}
//* Method Decorator
// Uses metadata that param decorator initialized before
function Validate() {
  return function (target: any, methodKey: string, descriptor: any) {
    const originalMethod = target[methodKey]
    const decoKey = 'Max'

    descriptor.value = function (...args: any[]) {
      const params = Reflect.getOwnMetadata(decoKey, target, methodKey)

      for (const param of params)
        if (args[param.index] > param.maxValue)
          throw new Error(`\x1b[31mParameter "${param.key}" of method "${methodKey}" must be <= ${param.maxValue}.\x1b[0m`)

      return originalMethod.apply(this, args)
    }

    return descriptor
  }
}

@Log()
class User {
  constructor(name: any) {
    this.name = name
  }
  
  @IsString()
  name: any

  @CacheResult()
  @Validate()
  calcSalary(
    @Max(9999) rate: number,
    @Max(1) efficiency: number
  ) {
    return rate * efficiency
  }
}

//* Class instance
const users = [
  new User('Axel'),
  new User('Bob'),
  // new User(123) //* Error
]

//* Execute methods
for (const user of users){
  const efficiency = Number(Math.random().toFixed(3))

  user.calcSalary(500, efficiency)
  user.calcSalary(1000, efficiency)
  user.calcSalary(1000, efficiency) //* Cached
  // user.calcSalary(10000, 10) //* Error
}

//* Decoration sequence
showDecorationSequence()
function showDecorationSequence() {
	console.log('\n\x1b[1;37mDecoration sequence:\x1b[0m')

	@ClassDeco()
	class Class {
		@PropDeco()
		prop: any

		@MethodDeco()
		method(@ParamDeco() param: any) {}
	}

	function ClassDeco() {
		console.log('\t7. Class factory')
		return function (...args: any[]) {
			console.log('\t8. Class deco')
		}
	}

	function PropDeco() {
		console.log('\t1. Prop factory')
		return function (...args: any[]) {
			console.log('\t2. Prop deco')
		}
	}

	function MethodDeco() {
		console.log('\t3. Method factory')
		return function (...args: any[]) {
			console.log('\t6. Method deco')
		}
	}

	function ParamDeco() {
		console.log('\t4. Param factory')
		return function (...args: any[]) {
			console.log('\t5. Param deco')
		}
	}

	console.log('\n')
}

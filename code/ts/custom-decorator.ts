//* tsc custom-decorator.ts --t es2020 -m esnext --strict true --experimentalDecorators true --emitDecoratorMetadata true && node custom-decorator.js

const CALLED = '\x1b[1;34mCALLED\x1b[0m'
const SUCCESS = '\x1b[1;32mSUCCESS\x1b[0m'
const ERROR = '\x1b[1;31mERROR\x1b[0m'
const PROPERTY = '\x1b[2;32mPROPERTY\x1b[0m'
const CACHE = '\x1b[1;38;5;215mCACHE\x1b[0m'

const METADATA = {} as any

//* Class Decorator
function Log<T extends new (...args: any[]) => any>() {
  return function(target: T) {
    const fields = Object.getOwnPropertyNames(target.prototype)
      .filter(property => property !== 'constructor')

    return class extends target {
      constructor(...superArgs: any[]) {
        super(...superArgs)

        for (const field of fields) {
          const styledFieldStr = '\x1b[38;2;30;190;10m' + field + '\x1b[0m'

          if (this[field] instanceof Function) {
            const method = this[field].bind(this) // this[field]

            this[field] = (...args: any[]) => {
              try {
                console.info(
                  `\n${CALLED}: ${styledFieldStr} with arguments: \x1b[33m${JSON.stringify(args, null, 2)}\x1b[0m`
                )

                const result = method(...args)

                console.info(
                  `${SUCCESS}: ${styledFieldStr} return: \x1b[33m${JSON.stringify(result, null, 2)}\x1b[0m`
                )

                return result

              } catch(error) {
                console.error(
                  `${ERROR}: ${styledFieldStr} throw ${error}`
                )
              }
            }
          } else {
            console.info(`${PROPERTY}: ${styledFieldStr} === \x1b[33m${JSON.stringify(this[field], null, 2)}\x1b[0m`)
          }
        }
      }
    }
  }
}

//* Property Decorator
function IsString<T>() {
  return function(target: T, propertyKey: string) {
    let value: string

    const getter = () => value

    const setter = (newValue: string) => {
      if (typeof newValue !== 'string')
        throw new Error('\x1b[31m"name" must be <string>.\x1b[0m')
        
      value = newValue
    }

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter
    })
  }
}

//* Method Decorator
function CacheResult() {
  return function (target: any, methodKey: string, descriptor: any) {
    const originalMethod = descriptor.value

    if (!target.cache)
      target.cache = new Map<string, any>()
    
    descriptor.value = function(...args: any[]) {
      const cacheKey = methodKey + JSON.stringify(args)
      let cacheValue: any
      
      if (target.cache.has(cacheKey)) {
        console.warn(`${CACHE}: Returned from cache!`)
        return target.cache.get(cacheKey)
      }
      
      cacheValue = originalMethod(...args)
      target.cache.set(cacheKey, cacheValue)

      console.warn(`${CACHE}: New value cached!`)
      return cacheValue
    }
    
    return descriptor
  }
}

//* Parameter Decorator
function Max(value: number) {
  return function (target: any, methodKey: string, paramIndex: number) {
    const paramKey = target[methodKey].toString()
    .match(/\(([^)]*?)\)/)?.[1]?.split(',')[paramIndex].trim()
    
    const maxDecoKey = target.name + methodKey + 'Max'
    const paramMetadata = METADATA[maxDecoKey] ??= []
    
    paramMetadata.push({ 
      key: paramKey,
      index: paramIndex,
      maxValue: value
    })
  }
}
// Method decorator uses metadata that param decorator initialized before
function Validate() {
  return function (target: any, methodKey: string, descriptor: any) {
    const originalMethod = target[methodKey]
    const maxDecoKey = target.name + methodKey + 'Max'

    descriptor.value = function (...args: any[]) {
      for (const param of METADATA[maxDecoKey])
        if (args[param.index] > param.maxValue)
          throw new Error(`\x1b[31mParameter "${param.key}" of method "${methodKey}" must be <= ${param.maxValue}.\x1b[0m`)

      return originalMethod(...args)
    }

    return descriptor
  }
}

//* Class
@Log()
class User {
  constructor(name: any) {
    this.name = name
  }
  @IsString()
  name: any

  speak(sound: string, listener: string) {
    // throw new Error('Custom error from class method') //* Error
    return listener +  ' heard ' + sound
  }

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
  new User('Alex'), 
  new User('Bod'),
  // new User(123) //* Error
]

//* Execute methods
for (const user of users){
  const efficiency = Number(Math.random().toFixed(3))

  user.speak('miaow-miaow', 'everyone')

  user.calcSalary(500, efficiency)
  user.calcSalary(1000, efficiency)
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



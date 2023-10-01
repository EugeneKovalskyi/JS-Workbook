'use strict'

let str1 = '[[{}]](((()))[[]]{{}}){}'

function isValidString() {
  let array = new Array()
  let brackets = {
    ')': '(',
    '}': '{',
    ']': '[',
  }

  if (str1.length % 2 === 1) return false

  for (let i = 0; i < str.length; i++) {
    if (str1[i] in brackets) {
      if (brackets[str1[i]] === array.at(-1)) {
        array.pop()
        continue
      } else return false
    }

    array.push(str1[i])
  }

  return array.length ? false : true
}

// console.log(isValidString())

function isValidRoute() {
  let route = ['N', 'E', 'W', 'S', 'W', 'E', 'E', 'S', 'W', 'N']
  let sidesCounter = {
    N: 0,
    E: 0,
    W: 0,
    S: 0,
  }

  for (let i = 0; i < route.length; i++) {
    sidesCounter[route[i]]++
  }

  return sidesCounter.W === sidesCounter.E && sidesCounter.S === sidesCounter.N
    ? true
    : false
}

// console.log(isValidRoute())

function inspectTwitt() {
  let twitt = 'fsfdkFIREjnjfFURYdsff'
  let exp = /FIRE|FURY/
  let array = ['FIRE', 'FIRE', 'FURY', 'FIRE', 'FURY', 'FURY']
  let fireCounter = 0
  let furyCounter = 0
  let result = []

  for (let i = 0; i < array.length; i++) {
    if (array[i] === 'FIRE') {
      fireCounter++

      if (fireCounter === 1) result.push('You')

      if (fireCounter > 1) result.push('and you')

      if (array[i] !== array[i + 1]) {
        fireCounter = 0
        result.push('are fired!')
      }
    } else if (array[i] === 'FURY') {
      furyCounter++

      if (furyCounter === 1) result.push('I am')

      if (furyCounter > 1) result.push('very')

      if (array[i] !== array[i + 1]) {
        furyCounter = 0
        result.push('furious!')
      }
    }
  }

  return result.join(' ')
}

// console.log(inspectTwitt())

let str2 = 'A'
let num1 = 99

function tag(strings, arg1, arg2) {
  console.log(strings)
  console.log(arg1, arg2)
  console.log(strings.raw)
}

// tag`That ${str2} isn't eaquel ${num1}!`

function inspectTwittByMasha() {
  let array = ['FIRE', 'FIRE', 'FURY', 'FIRE', 'FURY', 'FURY']
  let result = []

  for (let i = 0; i < array.length; i++) {
    if (array[i] === 'FIRE') {
      if (array[i + 1] !== 'FIRE') {
        result.push('You are fired!')
      } else {
        result.push('You and you')

        for (i++; array[i] === 'FIRE'; i++) {
          if (array[i + 1] === 'FIRE') {
            result.push('and you')
          } else if (array[i + 1] !== 'FIRE') {
            result.push('are fired!')
          }
        }

        i--
      }
    } else if (array[i] === 'FURY') {
      if (array[i + 1] !== 'FURY') {
        result.push('I am furious!')
      } else {
        result.push('I am very')

        for (i++; array[i] === 'FURY'; i++) {
          if (array[i + 1] === 'FURY') {
            result.push('very')
          } else if (array[i + 1] !== 'FURY') {
            result.push('furious!')
          }
        }

        i--
      }
    }
  }

  return result.join(' ')
}

// console.log(inspectTwittByMasha())

let str3 = 'web-site-you-know-about-it-some-times-old-are-crazy'

function camelize(str) {
  return str
    .split('-')
    .map((word, index) =>
      index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join('')
}

// console.log(camelize(str3))

let array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

function filterRange(arr, a, b) {
  return arr.filter((value) => a <= value && value <= b)
}

// console.log(filterRange(array2, 2, 7))
// console.log(array2);

function filterRangeInPlace(arr, a, b) {
  for (let i = 0; i < arr.length; i++) {
    let val = arr[i]

    if (val < a || val > b) {
      arr.splice(i, 1)
      i--
    }
  }
}

// filterRangeInPlace(array2, 2, 7)
// console.log(array2);

let array3 = [5, 2, 1, -10, 8]

function sortDescending(arr) {
  arr.sort((current, next) => next - current)
}

// sortNumbers(array3)
// console.log(array3);

let array4 = ['HTML', 'JavaScript', 'CSS']

function copySorted(arr) {
  return arr.slice().sort()
}

// console.log(copySorted(array4))

let array5 = [
  { name: 'Вася', age: 25 },
  { name: 'Петя', age: 30 },
  { name: 'Маша', age: 28 },
]

// console.log(array5.map((obj) => obj.name))

// console.log(array5.sort((curr, next) => curr.age - next.age))

let array6 = [
  { name: 'Вася', surname: 'Пупкин', id: 1 },
  { name: 'Петя', surname: 'Иванов', id: 2 },
  { name: 'Маша', surname: 'Петрова', id: 3 },
]

// console.log(
//   array6.map((obj) => ({ fullname: `${obj.name} ${obj.surname}`, id: obj.id }))
// )

let array7 = [1, 2, 3]

function shuffle(arr) {
  arr.sort(() => Math.random() - Math.random())
}

function shuffle2(arr) {
  for (let i = array7.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array7[i], array7[j]] = [array7[j], array7[i]]
  }
}

// console.log(array7)

function getAverageAge(arr) {
  return users.reduce((prev, obj) => prev + obj.age, 0) / arr.length
}

// console.log(getAverageAge(array5))

let array8 = [
  'кришна',
  'кришна',
  'харе',
  'харе',
  'харе',
  'харе',
  'кришна',
  'кришна',
  ':-O',
]

function unique(arr) {
  let result = []

  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) result.push(arr[i])
  }

  return result
}

// console.log(unique(array8))

let array9 = [
  { id: 'john', name: 'John Smith', age: 20 },
  { id: 'ann', name: 'Ann Smith', age: 24 },
  { id: 'pete', name: 'Pete Peterson', age: 31 },
]

function groupById(arr) {
  // for (let i = 0; i < arr.length; i++) {
  //   newObj[arr[i].id] = arr[i]
  // }

  return arr.reduce((resultObj, obj) => {
    resultObj[obj.id] = obj
    return resultObj
  }, {})
}

// console.log(groupById(array9))

let array10 = [
  'Hare',
  'Krishna',
  'Hare',
  'Krishna',
  'Krishna',
  'Krishna',
  'Hare',
  'Hare',
  ':-O',
]

function unique2(arr) {
  return Array.from(new Set(arr))
}

// console.log(unique2(array10))

let array11 = ['nap', 'teachers', 'cheaters', 'PAN', 'ear', 'era', 'hectares']

function aclean(arr) {
  let map = new Map()

  for (let word of arr) {
    let key = word.toLowerCase().split('').sort().join('')

    map.set(key, word)
  }

  return Array.from(map.values())
}

// console.log(aclean(array11))

let obj = {
  John: 100,
  Pete: 300,
  Mary: 250,
}

function sumSalaries(obj) {
  return Object.values(obj).reduce((result, value) => result + value, 0)
}

// console.log(sumSalaries(obj))

function countKeys(obj) {
  return Object.keys(obj).length
}

// console.log(countKeys(obj))

let obj2 = {
  John: 100,
  Pete: 300,
  Mary: 250,
}

function topSalary(obj) {
  let maxName = null
  let maxSalary = null

  for (let [name, salary] of Object.entries(obj)) {
    if (salary > maxSalary) [maxName, maxSalary] = [name, salary]
  }

  return maxName
}

// console.log(topSalary(salaries))

function getWeekDay(date) {
  let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']

  return days[date.getDay()]
}

// console.log(getWeekDay(new Date(2014, 0, 3)))

function getDateAgo(date, days) {
  return new Date(date.getTime() - days * 24 * 60 * 60 * 1000)
}

// console.log(getDateAgo(new Date(2015, 0, 2), 730))

function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

// console.log(getLastDayOfMonth(2012, 1))

function getSecondsToday() {
  let time = new Date()

  return time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()
}

// console.log(getSecondsToday())

function getSecondsToTomorrow() {
  let time = new Date()
  let tomorrow = new Date(
    time.getFullYear(),
    time.getMonth(),
    time.getDate() + 1
  )

  return Math.round((tomorrow.getTime() - time.getTime()) / 1000)
}

// console.log(getSecondsToTomorrow())

function formatDate(date) {
  let timeDifference = new Date().getTime() - date.getTime()

  if (timeDifference < 1000) {
    return 'Just now'
  }

  if (timeDifference < 60 * 1000) {
    return `${timeDifference / 1000} sec. ago`
  }

  if (timeDifference < 60 * 60 * 1000) {
    return `${timeDifference / 1000 / 60} min. ago`
  }

  let day = ('0' + date.getDate()).slice(-2)
  let month = ('0' + (date.getMonth() + 1)).slice(-2)
  let year = date.getFullYear()
  let hours = date.getHours()
  let minutes = date.getMinutes()

  return `${day}.${month}.${year} ${hours}:${minutes}`
}

// console.log(formatDate(new Date(new Date() - 1)))
// console.log(formatDate(new Date(new Date() - 30 * 1000)))
// console.log(formatDate(new Date(new Date() - 5 * 60 * 1000)))
// console.log(formatDate(new Date(new Date() - 86400 * 1000)))

function JSONExercise() {
  let room = {
    number: 23,
  }

  let meetup = {
    title: 'Совещание',
    occupiedBy: [{ name: 'Иванов' }, { name: 'Петров' }],
    place: room,
  }

  room.occupiedBy = meetup
  meetup.self = meetup

  return JSON.stringify(meetup, function replacer(key, value) {
    return key !== '' && value === meetup ? undefined : value
  })
}

// console.log(JSONExercise())

function fib(n) {
  return Math.round(
    (((1 + Math.sqrt(5)) / 2) ** n - ((1 - Math.sqrt(5)) / 2) ** n) /
      Math.sqrt(5)
  )
}

// console.log(fibonachi(77))

function fib2(n) {
  let arr = [1, 1, 2]

  for (let i = 2; i < n; i++) {
    arr[2] = arr[0] + arr[1]
    arr[0] = arr[1]
    arr[1] = arr[2]
  }

  return arr[2]
}

// console.log(fib2(77))

function fib3(n) {
  return n <= 1 ? n : fib3(n - 1) + fib3(n - 2)
}

// console.log(fib3(5))

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
}

function printList(list) {
  let tempLink = list

  while (tempLink) {
    console.log(tempLink.value)
    tempLink = tempLink.next
  }
}

// printList(list)

function printList2(list) {
  console.log(list.value)

  if (list.next !== null) {
    printList(list.next)
  }
}

// printList2(list)

function printReverseList(list) {
  let arr = new Array()
  let tempLink = list

  while (tempLink) {
    arr.push(tempLink.value)
    tempLink = tempLink.next
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i])
  }
}

// printReverseList(list)

function printReverseList2(list) {
  if (list.next !== null) {
    printReverseList2(list.next)
  }

  console.log(list.value)
}

// printReverseList2(list)

let array12 = [1, 2, 3, 4, 5, 6, 7]

function inBetween(x, y) {
  return function (element) {
    return element >= x && element <= y
  }
}

function inArray(arr) {
  return function (element) {
    return arr.includes(element)
  }
}

// console.log(array12.filter(inBetween(3, 6)))
// console.log(array12.filter(inArray([1, 2, 10])))

function makeCounter() {
  let count = 0

  function counter() {
    counter.set = (value) => (count = value)

    counter.decrease = () => --count

    return ++count
  }

  return counter
}

let counter = makeCounter()

// console.log(counter())
// console.log(counter.set(10))
// console.log(counter.decrease())

function printNumbersTimeout(from, to) {
  let current = from

  setTimeout(function foo() {
    if (current > to) return

    console.log(current)
    current++

    setTimeout(foo, 1000)
  }, 1000)
}

// printNumbersTimeout(1, 5)

function printNumbersInterval(from, to) {
  let current = from

  let timerId = setInterval(function () {
    if (current === to) clearInterval(timerId)

    console.log(current++)
  }, 1000)
}

// printNumbersInterval(1, 5)

let workers = {
  someProp: 10,

  someMethod(arg1, arg2) {
    return arg1 + arg2 + this.someProp
  },
}

workers.someMethod = cachingDecorator(workers.someMethod, hash)

function hash() {
  return [].join.call(arguments)
}

function cachingDecorator(func, hash) {
  let cache = new Map()

  return function (...args) {
    let key = hash(arguments)

    if (cache.has(key)) return cache.get(key)

    let result = func.apply(this, args)

    cache.set(key, result)

    return result
  }
}

// console.log(workers.someMethod(1, 2))

function foo(a, b) {
  return a + b
}

function spy(func) {
  wrapper.calls = []

  function wrapper(...args) {
    wrapper.calls.push(args)

    return func.apply(this, args)
  }

  return wrapper
}

foo = spy(foo)

// console.log(foo(1, 2))
// console.log(foo.calls)

function foo2(x) {
  console.log(x)
}

function delay(func, ms) {
  return function () {
    setTimeout(() => {
      func.apply(this, arguments)
    }, ms)
  }
}

let f1 = delay(foo2, 1000)
let f2 = delay(foo2, 2000)

// f1('test 1000')
// f2('test 2000')

function foo3(x) {
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

foo3 = debounce(foo3, 2000)

// foo3(1)
// foo3(2)
// setTimeout(foo3, 1000, 3)
// setTimeout(foo3, 3000, 4)
// foo3(5)
// setTimeout(foo3, 8000, 6)

function foo4(x) {
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

let f3 = throttle(foo4, 1000)

// f3(1)
// f3(2)
// f3(3)

function Calculator() {
  this.operationStorage = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
  }

  this.calculate = (str) => {
    let [x, operator, y] = str.split(' ')

    return this.operationStorage[operator](+x, +y)
  }

  this.addMethod = (operator, func) => (this.operationStorage[operator] = func)
}

let powerCalc = new Calculator()

powerCalc.addMethod('*', (a, b) => a * b)
powerCalc.addMethod('/', (a, b) => a / b)
powerCalc.addMethod('**', (a, b) => a ** b)

// console.log(powerCalc.calculate('3 + 7'))
// console.log(powerCalc.calculate('2 * 3'))
// console.log(powerCalc.calculate('2 ** 3'))

function toStringForDictionary() {
  let dictionary = Object.create(null, {
    toString: {
      value() {
        return Object.keys(this).join()
      },

      enumerable: false,
    },
  })

  dictionary.apple = 'Apple'
  dictionary.orange = 'Orange'
  dictionary.__proto__ = 'TEST'

  for (let key in dictionary) {
    console.log(key)
  }

  return dictionary.toString()
}

// console.log(toStringForDictionary())

class Clock {
  constructor({ template }) {
    this.template = template
  }

  render() {
    let date = new Date()

    let hours = date.getHours()
    if (hours < 10) hours = '0' + hours

    let minutes = date.getMinutes()
    if (minutes < 10) minutes = '0' + minutes

    let seconds = date.getSeconds()
    if (seconds < 10) seconds = '0' + seconds

    let output = this.template
      .replace('hh', hours)
      .replace('mm', minutes)
      .replace('ss', seconds)

    console.log(output)
  }

  start() {
    this.render()
    this.timer = setInterval(() => this.render(), 1000)
  }

  stop() {
    clearInterval(this.timer)
  }
}

class ExtendedClock extends Clock {
  constructor(options) {
    super(options)

    let { precision = 1000 } = options

    this.precision = precision
  }

  start() {
    this.render()
    this.timer = setInterval(() => this.render(), this.precision)
  }
}

// let clock = new ExtendedClock({ template: 'hh:mm:ss', precision: 500 })
// clock.start()

// class b_tree {}
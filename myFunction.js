Function.prototype.myCall = function (context = global, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Type Error')
  }
  context = context || global // 兼容 null 的情况
  const fn = Symbol()
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}

const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1

var isArrayLike = function (collection) {
  const length = collection.length
  // length是数值，非负，且小于等于MAX_ARRAY_INDEX
  // MAX_ARRAY_INDEX = Math.pow(2, 53) - 1
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
}

Function.prototype.myApply = function (context = global, args) {
  if (typeof this !== 'function') {
    throw new TypeError('Type Error')
  }
  if (!isArrayLike(args)) {
    throw new TypeError('CreateListFromArrayLike called on non-object')
  }
  context = context || global // 兼容 null 的情况
  const fn = Symbol()
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}

Function.prototype.myBind = function (context = global, ...args1) {
  if (typeof this !== 'function') {
    throw new TypeError('Type Error')
  }

  const fn = this

  return function F(...args2) {
    if (this instanceof F) {
      // 说明是构造函数
      return new F(...args1, ...args2)
    } else {
      return fn.call(context, ...args1, ...args2)
    }
  }
}

function foo(name) {
  console.log('I am ', name)
}

function add(a, b) {
  console.log(a + b)
}

// console.log(foo.call(null, 'bar'))
// console.log(foo.myCall(null, 'bar'))
// console.log(add.apply(null, [1, 1]))
// console.log(add.myApply(null, [1, 1]))
// console.log(add.myApply(null, 1, 1))

const addOne = add.myBind(null, 1)
const result = addOne(1)
console.log(result)

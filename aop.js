const { curry } = require('./curry.js')

function beforeFoo() {
  console.log('before foo')
}

function foo() {
  console.log('foo')
}

function afterFoo() {
  console.log('after foo')
}

function before(fn) {
  return curry(2, fn)(...args)
}

before(beforeFoo)(foo)

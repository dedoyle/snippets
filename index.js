const { curry } = require('./curry.js')

function typeCheck(regx, str) {
  return regx.test(str)
}

const onlyNumber = curry(typeCheck)(/^\d+$/g)
const onlyLetter = curry(typeCheck)(/^[a-zA-Z]+$/g)

console.log(onlyNumber('123123'))
console.log(onlyNumber('123A123'))
console.log(onlyLetter('AsfksdA'))
console.log(onlyLetter('A11111A'))

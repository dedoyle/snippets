const curry = (fn) => {
  return function inner(...args) {
    if (args.length < fn.length) {
      return inner.bind(null, ...args)
    }
    return fn.apply(null, args)
  }
}

const curryN = (n, fn) => {
  
}

module.exports = {
  curry,
  curryN
}
function compose(...fns) {
  return fns.reduce((acc, fn) => (...args) => acc(fn(...args)) /* 默认数组第一个元素 , fns[0] */)
}

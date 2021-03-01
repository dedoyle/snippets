const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(executor) {
  this.state = PENDING
  this.value = null
  this.reason = null
  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []

  const resolve = (value) => {
    if (this.state === PENDING) {
      this.state = FULFILLED
      this.value = value
    }
  }

  const reject = (reason) => {
    if (this.state === PENDING) {
      this.state = REJECTED
      this.reason = reason
    }
  }

  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled != 'function') {
    onFulfilled = function (value) {
      return value
    }
  }
  if (typeof onRejected != 'function') {
    onRejected = function (reason) {
      throw reason
    }
  }
  switch (this.state) {
    case FULFILLED:
      onFulfilled(this.value)
      break
    case REJECTED:
      onRejected(this.reason)
      break
    case PENDING:
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
      break
  }
}

new MyPromise((resolve, reject) => {
  resolve('hello promise')
})

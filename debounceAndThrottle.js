function debounce(fn, time) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
}

function throttle(fn, time) {
  let timer
  return function (...args) {
    if (timer) return

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, time)
  }
}

let i = 0
const fn = throttle(() => {
  console.log(i++)
}, 500)
window.addEventListener('mousemove', fn)

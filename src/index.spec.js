import test from 'ava'
import isPromise from 'is-promise'
import Promise from './index'
const ES6Promise = global.Promise

test('Can create a new Promise', (t) => {
  const promise = new Promise(() => null)
  t.truthy(promise)
})

test('Promise has a state', (t) => {
  const promise = new Promise(() => null)
  t.truthy(promise.state)
})

test('Change state to resolved', (t) => {
  var test = (resolve) => {
    resolve()
  }
  const promise = new Promise(test)
  t.is(promise.state, 'resolved')
})

test('Promise resolves with value', (t) => {
  const promise = new Promise((resolve) => {
    resolve('123')
  })
  t.is(promise.value, '123')
})

test('Has a then method', (t) => {
  const promise = new Promise(() => null)
  t.is(typeof promise.then, 'function')
})

test('Has a then method', (t) => {
  t.plan(1)
  const promise = new Promise((resolve) => {
    resolve('123')
  })
  promise.then((val) => {
    t.is(val, '123')
  })
})

test('Change state to resolved, after timeout', (t) => {
  t.plan(2)
  return new ES6Promise((res) => {
    var test = (resolve) => {
      setTimeout(resolve, 1)
    }
    const promise = new Promise(test)
    t.is(promise.state, 'pending')
    promise.then(() => {
      t.is(promise.state, 'resolved')
      res()
    })
  })
})

test('Our promise is a Promise', (t) => {
  const newPromise = new Promise((resolve) => {
    resolve('123')
  })
  t.truthy(isPromise(newPromise))
})

test('then should always return instance of our Promise', (t) => {
  const promise = new Promise((resolve) => {
    resolve('123')
  })
  var result = promise.then((val) => val)
  t.truthy(isPromise(result))
})

test('Promises should be chainable', (t) => {
  t.plan(2)
  const promise1 = new Promise((resolve) => {
    resolve(2)
  })
  const promise2 = promise1.then((val) => {
    t.is(val, 2)
    return val * 2
  })
  promise2.then((val) => {
    t.is(val, 4)
  })
})


function Promise (fn) {
  var self = this
  this.state = 'pending'
  this.value = undefined
  this.onResolved = undefined

  function resolve (newValue) {
    self.state = 'resolved'
    self.value = newValue
    if (self.onResolved) {
      self.onResolved(newValue)
    }
  }

  this.then = function (callback) {
    return new Promise((res) => {
      self.onResolved = function(val) {
        var result = callback(val)
        res(result)
      }
      if (self.state === 'resolved'){
        self.onResolved(self.value)
      }
    })
  }

  fn(resolve)
}

export default Promise

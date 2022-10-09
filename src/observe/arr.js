// （1）重写数组的 push() 函数
let oldArrayProtoMethods = Array.prototype

// （2）继承
let ArrayMethods = Object.create(oldArrayProtoMethods)

// (3) 劫持
let methods = ['push', 'pop', 'unshift', 'shift', 'slice']

methods.forEach((item) => {
  ArrayMethods[item] = function (...args) {
    
  }
})

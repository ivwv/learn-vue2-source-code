// （1）重写数组的 push() 函数
let oldArrayProtoMethods = Array.prototype

// （2）继承
export let ArrayMethods = Object.create(oldArrayProtoMethods)

// (3) 劫持
let methods = ['push', 'pop', 'unshift', 'shift', 'slice']

methods.forEach((item) => {
  ArrayMethods[item] = function (...args) {
    // {list:[]}
    console.log('劫持数组')
    // 通过 aldArr.apply(this,args) 劫持旧的数组方法 ，改变旧的数组方法为当前的新数组方法
    let result = oldArrayProtoMethods[item].apply(this, args)
    return result
  }
})

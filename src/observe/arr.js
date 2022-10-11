// （1）重写数组的 push() 函数
let oldArrayProtoMethods = Array.prototype

// （2）继承
export let ArrayMethods = Object.create(oldArrayProtoMethods)

// (3) 劫持
let methods = ['push', 'pop', 'unshift', 'shift', 'slice']

methods.forEach((item) => {
  ArrayMethods[item] = function (...args) {
    // {list:[]}
    // console.log('劫持数组')
    // 通过 aldArr.apply(this,args) 劫持旧的数组方法 ，改变旧的数组方法为当前的新数组方法
    let result = oldArrayProtoMethods[item].apply(this, args)
    // console.log(args)
    // 数组追加对象的情况 要进行劫持  arr.push({a:1})   arr.unsfift
    let inserted
    switch (item) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.splice(2) // arr.splice(0,1,{a:6})
    }
    // console.log(inserted)
    let ob = this.__ob__ // 得到
    // 判断
    if (inserted) {
      ob.observerArray(inserted) //对我们添加的对象进行劫持
    }

    return result
  }
})

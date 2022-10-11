import { observer } from './observe/index.js'

export function initState(vm) {
  let opts = vm.$options
  // console.log(opts)
  //   判断
  if (opts.props) {
    initProps(vm)
  }
  if (opts.data) {
    initData(vm)
  }
  if (opts.watch) {
    initWatch(vm)
  }
  if (opts.computed) {
    initComputed(vm)
  }
  if (opts.methods) {
    initMethods(vm)
  }
}

function initComputed(vm) {}
function initMethods(vm) {}
function initProps(vm) {}
function initWatch(vm) {}

// 对data进行初始化
function initData(vm) {
  // console.log('data初始化')
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data
  // console.log(data)

  // 将 data上的说所有属性代理到 实例上 {a:1,b:2}
  for (let key in data) {
    proxy(vm, '_data', key)
  }

  // 对数据进行劫持
  observer(data)
}

function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      // console.log('proxy-get')
      return vm[source][key]
    },
    set(newValue) {
      // console.log('proxy-set')
      vm[source][key] = newValue
    },
  })
}

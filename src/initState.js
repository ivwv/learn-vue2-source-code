import { observer } from './observe/index.js'

export function initState(vm) {
  let opts = vm.$options
  //   console.log(opts)
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
  //   console.log(data)
  // 对数据进行劫持
  observer(data)
}

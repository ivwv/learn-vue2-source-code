(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function observer(data) {
    //   console.log(data)
    // 1.判断
    if (typeof data != 'object' || data == null) {
      return data
    }
    //   是对象的形式
    return new Observer(data)
  }
  class Observer {
    constructor(value) {
      // 判断数据
      console.log(value);
      if (Array.isArray(value)) {
        console.log('数组');
      } else {
        this.walk(value); // 遍历
      }
    }
    walk(data) {
      let keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        //将每一个数据拿出来 对每一个属性进行劫持
        let key = keys[i]; //data每一个键
        let value = data[key]; //通过键获取每一个值
        //   数据劫持方法
        defineReactive(data, key, value);
      }
    }
  }

  // 对对象中的属性进行劫持
  function defineReactive(data, key, value) {
    //{a:{b:1}}
    /**
     * 问题一
     * 由于 Object.defineProperty() 只能代理第一层的数据,只能对对象中的一个属性进行劫持
     * 假如对象内还嵌套了一层对象，这不能代理
     * 此时需要进行递归代理
     * 由于 该文件内 的 observer() 方法 传递的是一个data 对象
     * 此方法内的value也是传递过来的对象，所以可以将 value 传递过来再调用 observer() 方法
     *
     */
    // 深度代理 递归
    observer(value);

    Object.defineProperty(data, key, {
      // 获取触发
      get() {
        console.log('获取');
        return value
      },
      // 设置触发
      set(newValue) {
        console.log('设置值');
        // 判断新值是否和旧值一样 ，一样就返回
        if (newValue == value) return
        /**
         * 问题二
         * 当修改为对象时，再调用 observer() 方法进行新对象代理
         */
        observer(newValue); // 如果用户设置的值是对象就进行递归
        value = newValue;
      },
    });
  }

  // vue2  Object.defineProperty 缺点 对象中的一个属性进行劫持 {a:1,b:2}

  // 数组形式 {list:[1,2,3,4],arr:[{a:1}]}
  // 方法函数劫持 , 重写数组方法 arr.push()  就是对 arr.push()经行劫持

  function initState(vm) {
    let opts = vm.$options;
    //   console.log(opts)
    //   判断
    if (opts.props) ;
    if (opts.data) {
      initData(vm);
    }
    if (opts.watch) ;
    if (opts.computed) ;
    if (opts.methods) ;
  }

  // 对data进行初始化
  function initData(vm) {
    // console.log('data初始化')
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    //   console.log(data)
    // 对数据进行劫持
    observer(data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      // console.log(options)
      let vm = this;
      vm.$options = options;
      // 初始化状态
      initState(vm);
    };
  }

  function Vue(options) {
    //   console.log(options);
    //   初始化
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map

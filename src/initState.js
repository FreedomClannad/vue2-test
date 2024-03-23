import { observer } from "./observer/index";
export function initState(vm) {
  let opts = vm.$options;
  console.log(opts);
  // 判断
  if (opts.props) {
    initProps();
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.watch) {
    initWatch();
  }
  if (opts.computed) {
    initComputed();
  }
  if (opts.methods) {
    initMethods();
  }
}

function initProps() {}
// 对Data的初始化
function initData(vm) {
  console.log("data初始化");
  // 数据初始化 1.对象 2.函数
  let data = vm.$options.data;
  // 这里data使用call把this指向了vue
  data = vm._data = typeof data === "function" ? data.call(vm) : data;

  // data{} 1.对象 2.数组
  // 将data山所有属性代理到实例上： {a: 1, b:2}
  for (let key in data) {
    proxy(vm, "_data", key);
  }

  // 对数据进行劫持
  observer(data);
}
function initWatch() {}
function initComputed() {}
function initMethods() {}

function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newValue) {
      vm[source][key] = newValue;
    },
  });
}

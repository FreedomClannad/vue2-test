// 重写数组
// 1.获取原来的数组的方法
let oldArrayProtoMethods = Array.prototype;

// 2.继承原来的方法
export let ArrayMethods = Object.create(oldArrayProtoMethods);

// 3.劫持
let methods = ["push", "pop", "unshift", "shift", "splice"];

methods.forEach((item) => {
  ArrayMethods[item] = function (...args) {
    // {list:[]}
    console.log("劫持数组");
    let result = oldArrayProtoMethods[item].apply(this, args);
    return result;
  };
});

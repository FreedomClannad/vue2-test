// 重写数组
// 1.获取原来的数组的方法
let oldArrayProtoMethods = Array.prototype;

// 2.继承原来的方法
export let ArrayMethods = Object.create(oldArrayProtoMethods);

// 3.劫持
let methods = ["push", "pop", "unshift", "shift", "splice"];

methods.forEach((item) => {
  ArrayMethods[item] = function (...args) {
    let result = oldArrayProtoMethods[item].apply(this, args);
    // 问题: 数组追加对象的情况下 arr.push({a: 1})
    let inserted;
    switch (item) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.splice(2); // arr.splice(0, 1, {a: 6})
        break;
    }
    let ob = this.__ob__;
    if (inserted) {
      ob.observerArray(inserted); // 对我们添加的对象进行劫持
    }
    return result;
  };
});

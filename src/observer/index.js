export function observer(data) {
  // 1.判断
  if (typeof data !== "object" || data === null) {
    return data;
  }
  // 2.对象通过一个类
  return new Observer(data);
}

// vue2 Object.defineProperty 缺点， 只能劫持对象中一个属性

class Observer {
  constructor(value) {
    this.walk(value); // 遍历
  }
  walk(data) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      // 对象的每个属性进行劫持
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value);
    }
  }
}
// 对象中的属性进行劫持
function defineReactive(data, key, value) {
  observer(value);
  Object.defineProperty(data, key, {
    get() {
      console.log("获取");
      return value;
    },
    set(newValue) {
      // 修改数据
      if (newValue === data) {
        return value;
      }
      observer(newValue); // 如果用户设置的值是对象进行递归
      console.log("设置");
      value = newValue;
    },
  });
}

// 总结: 1. 对象
/**
 * 总结
 * 1.对象
 * 1 Object.defineProperty 有缺点 只能 对象中的一个属性进行劫持
 * 2 遍历{a: 1, b: 2, obj: {c: 3}}
 * 3 递归 get set 进行设置
 */

import { ArrayMethods } from "./arr";
export function observer(data) {
  // 给value 定义一个属性

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
    Object.defineProperty(value, "__ob__", {
      enumerable: false,
      value: this,
    });
    // 判断数据
    if (Array.isArray(value)) {
      // 使用函数劫持
      // __proto__ 数组的原型
      value.__proto__ = ArrayMethods;
      // 如果你是数组对象
      this.observerArray(value); // 处理数组对象的劫持
    } else {
      this.walk(value); // 遍历
    }
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
  observerArray(value) {
    // [{a: 1}]
    for (let i = 0; i < value.length; i++) {
      observer(value[i]);
    }
  }
}
// 对象中的属性进行劫持
function defineReactive(data, key, value) {
  observer(value);
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      // 修改数据
      if (newValue === data) {
        return value;
      }
      observer(newValue); // 如果用户设置的值是对象进行递归
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

/**
 * 数组 {list: [1, 2, 3, 4,], arr: [{a: 1}]}
 * 函数劫持, 重写数组方法 arr.push()
 */

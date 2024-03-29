import { initState } from "./initState";
import { compileToFunction } from "./compile/index";
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    let vm = this;
    vm.$options = options;
    // 初始化状态
    initState(vm);

    // 渲染模板
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };

  // 创建$mount
  Vue.prototype.$mount = function (el) {
    // el template render
    let vm = this;
    el = document.querySelector(el); // 获取元素
    let options = vm.$options;
    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        // 获取html
        el = el.outerHTML;

        // console.log(el);
        // <div id="app">Hello Word{{message}}</div>
        // 变成ast语法树
        let ast = compileToFunction(el);
        // render()

        //
      }
    }
  };
}

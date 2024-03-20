import bable from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
export default {
  input: "./src/index.js", // 打包入口文件
  output: {
    file: "dist/vue.js",
    format: "umd",
  },
};

import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
export default {
  input: "./src/index.js", // 打包入口文件
  output: {
    file: "dist/vue.js",
    format: "umd",
    name: "Vue",
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    serve({
      port: 3000,
      contentBase: "", // "" 表示当前目录
      openPage: "/index.html",
    }),
  ],
};

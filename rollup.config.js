import babel from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";
export default {
  input: "./src/index.js", //打包的入口函数
  output: {
    file: "dist/vue.js",
    format: "umd", //在window上 Vue new Vue
    name: "Vue",
    sourcemap: true,
  },
  plugin: [
    babel({
      exclude: "node_modules/**",
    }),
    serve({
      // 3000
      port: 3000,
      // '' 字符串 表示当前目录
      contentBase: "",
      // 要打开的文件
      openPage: "./index.html",
    }),
  ],
};

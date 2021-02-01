/*
 * @Description: babel
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-14 09:20:06
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-10-27 10:25:11
 */
module.exports = {
  presets: [
    "@vue/app",
    "@vue/babel-preset-jsx",
    ["@babel/env", { modules: false, debug: true, targets: {} }]
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 3
      }
    ]
  ]
};

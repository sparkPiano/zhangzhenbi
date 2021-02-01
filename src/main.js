/*
 * @Description: 入口文件
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-05-25 15:18:58
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-12-14 16:02:22
 * @FilePath: \ccbProject\ccb_5g\src\main.js
 */

// eslint-disable-next-line no-unused-vars
import objectAssign from "object-assign";
import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./vuex/store";
import qs from "qs"; //配合qs模块转化post请求的参数
import Api from "./api";
import Echarts from "echarts";
import { sync } from "vuex-router-sync";
import VueCookies from "vue-cookies";
import VerifyCode from "@/utils/verifyCode";
import General from "@/utils/general";
import { EventBus } from "@/utils/event-bus";
import Md5 from "js-md5";
import { Base64 } from "js-base64";
import QRCode from "qrcodejs2";
import html2canvas from "html2canvas";
import wxapi from "@/plugins/wxapi.js";
import local from "@/utils/Location.js";

// import './vux/vuxComponent';
//全局导入
// import '!style-loader!css-loader!less-loader!./assets/styles/global.less';
// import '!style-loader!css-loader!less-loader!./assets/styles/variables.less';
import {
  Group,
  Cell,
  Icon,
  Box,
  DatetimePlugin,
  CloseDialogsPlugin,
  ConfigPlugin,
  BusPlugin,
  DevicePlugin,
  ToastPlugin,
  AlertPlugin,
  ConfirmPlugin,
  LoadingPlugin,
  WechatPlugin,
  AjaxPlugin,
  AppPlugin
} from "vux";

import "./plugins/rem";
import dateFormat from "./plugins/date";

import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, {
  ak: "nNjDVHeO593g2dL2oWFWfuv0ihRGtewS" //这里是你申请的key
});

import { NoticeBar } from "vue-easy-notice-bar";
Vue.use(NoticeBar);

import { VueJsonp } from "vue-jsonp";
Vue.use(VueJsonp);
// import Vconsole from "vconsole";
// if (process.env.NODE_ENV !== "production") {
//   let vConsole = new Vconsole();
//   Vue.use(vConsole);
// }

Vue.component("group", Group);
Vue.component("cell", Cell);
Vue.component("icon", Icon);
Vue.component("box", Box);

Vue.use(VueCookies);
Vue.prototype.$ip = "http://128.192.120.2";
Vue.prototype.$xhr = Api;
Vue.prototype.$qs = qs;
Vue.prototype.$echarts = Echarts;
Vue.prototype.$verifyCode = VerifyCode;
Vue.prototype.$dateFormat = dateFormat;
Vue.prototype.$md5 = Md5;
Vue.prototype.$base64 = Base64;
Vue.prototype.$EventBus = EventBus;
Vue.prototype.$general = General;
Vue.prototype.$qrcode = QRCode;
Vue.prototype.$html2canvas = html2canvas;
Vue.prototype.$wxapi = wxapi;
Vue.prototype.$local = local;

Vue.config.productionTip = false;
if (process.env.NODE_ENV === "production") {
  Vue.prototype.$ip = "https://buy.ccb.com";
} else {
  Vue.prototype.$ip = "http://128.192.120.2";
}

require("es6-promise").polyfill();

// global VUX config
Vue.use(ConfigPlugin, {
  $layout: "VIEW_BOX" // global config for VUX, since v2.5.12
});

// plugins
Vue.use(DevicePlugin);
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);
Vue.use(WechatPlugin);
Vue.use(AjaxPlugin);
Vue.use(BusPlugin);
Vue.use(DatetimePlugin);

Element.prototype.trigger = function(eventName) {
  this.dispatchEvent(new Event(eventName));
};

// test
if (process.env.platform === "app") {
  Vue.use(AppPlugin, store);
}

const FastClick = require("fastclick");
FastClick.attach(document.body);

Vue.use(CloseDialogsPlugin, router);
sync(store, router);

// simple history management
const history = window.sessionStorage;
history.clear();
let historyCount = history.getItem("count") * 1 || 0;
history.setItem("/product", 0);
let isPush = false;
let isTouchStart = false;
let endTime = Date.now();
let methods = ["push", "go", "replace", "forward", "back"];

document.addEventListener("touchend", () => {
  isTouchStart = false;
  endTime = Date.now();
});
document.addEventListener("touchstart", () => {
  isTouchStart = true;
});
methods.forEach(key => {
  console.log("key", key, router);
  let method = router[key].bind(router);
  router[key] = function(...args) {
    isPush = true;
    method.apply(null, args);
  };
});

/**
 * @description: 全局路由前置守卫
 * @event: beforeEach
 * @param {function} callback
 * @return: *
 */
router.beforeEach(function(to, from, next) {
  store.commit("updateLoadingStatus", { isLoading: true });
  console.log("main");
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);
  let direction;

  if (toIndex) {
    if (
      !fromIndex ||
      parseInt(toIndex, 10) > parseInt(fromIndex, 10) ||
      (toIndex === "0" && fromIndex === "0")
    ) {
      direction = "forward";
    } else {
      direction = "reverse";
    }
  } else {
    ++historyCount;
    history.setItem("count", historyCount);
    to.path !== "/product" && history.setItem(to.path, historyCount);
    direction = "forward";
  }

  // 判断是否是ios左滑返回 或者 右滑前进
  if (
    toIndex &&
    toIndex !== "0" &&
    !isPush &&
    (Date.now() - endTime < 377 || isTouchStart)
  ) {
    store.commit("updateDirection", { direction: "" });
  } else {
    store.commit("updateDirection", { direction: direction });
  }
  isTouchStart = false;

  if (/\/http/.test(to.path)) {
    let url = to.path.split("http")[1];
    window.location.href = `http${url}`;
  } else {
    next();
  }
});

/**
 * @description: 全局路由后置守卫
 * @event: afterEach
 * @param {function} callback
 * @return: *
 */
// eslint-disable-next-line no-unused-vars
router.afterEach(function(to) {
  isPush = false;
  store.commit("updateLoadingStatus", { isLoading: false });
  // eslint-disable-next-line no-empty
  if (process.env.NODE_ENV === "production") {
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

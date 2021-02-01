/*
 * @Description: Axios
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-05-25 15:34:46
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-12-10 17:33:01
 * @FilePath: \ccbProject\ccb_5g\src\api\index.js
 */
import Vue from "vue";
import Axios from "axios";
import qs from "qs";
import { Base64 } from "js-base64";
import General from "@/utils/general";
import { AlertPlugin } from "vux";

Vue.use(AlertPlugin);

const MobileDetect = require("mobile-detect");

const md = new MobileDetect();

const brand = md.mobile();
const os_type = md.os();

let baseUrl = `${location.protocol}//${location.host}`;
const contentType = "application/json;charset=utf-8";

let header = {
  agent: "mbp1.0",
  version: "3.00",
  device: `${brand},${getMobileType()}`,
  platform: navigator.platform || `${os_type},${getOSVersion()}`,
  local: navigator.language,
  language:
    navigator.languages.length > 1
      ? navigator.languages[1]
      : navigator.language.split("-")[0],
  ext: ""
};

/**
 * @description: 获取手机类型
 * @event: getMobileType
 * @param {*} *
 * @return: 手机类型
 */
function getMobileType() {
  const device_type = navigator.userAgent; //获取userAgent信息
  const os = md.os(); //获取系统
  let model = "";
  if (os == "iOS") {
    //ios系统的处理
    model = md.mobile();
  } else if (os == "AndroidOS") {
    //Android系统的处理
    const sss = device_type.split(";");
    let i = sss.contains("Build/");
    if (i > -1) {
      model = sss[i].substring(0, sss[i].indexOf("Build/"));
    }
  }
  return model;
}

/**
 * @description: 获取手机系统版本
 * @event: getOSVersion
 * @param {*} *
 * @return: 手机系统版本
 */
function getOSVersion() {
  let u = navigator.userAgent,
    version = "";
  if (u.indexOf("Mac OS X") > -1) {
    //ios
    let regStr_saf = /OS [\d._]*/gi;
    let verinfo = u.match(regStr_saf);
    version = (verinfo + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, ".");
  } else if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    //android
    version = u.substr(
      u.indexOf("Android") + 8,
      u.indexOf(";", u.indexOf("Android")) - u.indexOf("Android") - 8
    );
  } else if (u.indexOf("BB10") > -1) {
    //黑莓bb10系统
    version = u.substr(
      u.indexOf("BB10") + 5,
      u.indexOf(";", u.indexOf("BB10")) - u.indexOf("BB10") - 5
    );
  } else if (u.indexOf("IEMobile")) {
    //windows phone
    version = u.substr(
      u.indexOf("IEMobile") + 9,
      u.indexOf(";", u.indexOf("IEMobile")) - u.indexOf("IEMobile") - 9
    );
  }
  return version;
}

/**
 * @description: 创建Axios实例
 * @event: *
 * @param {type}
 * @return: 返回实例
 */
console.log("baseUrl", baseUrl);
const http = Axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  crossDomain: true,
  headers: {
    "Content-Type": contentType
  }
  // transformRequest: [
  //   function(data) {
  //     let newData = "";
  //     for (let k in data) {
  //       if (data.hasOwnProperty(k) === true) {
  //         newData +=
  //           encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) + "&";
  //       }
  //     }
  //     return newData;
  //   }
  // ]
});
// 添加请求拦截器
http.interceptors.request.use(
  function(config) {
    console.log("config", config);
    // 在发送请求之前做些什么
    if (config.changeType === "blob") {
      config.responseType = "blob";
    }
    if (config.method === "post" || config.method === "put") {
      if (config.changeType === "form") {
        // 此处设置文件上传，配置单独请求头
        config.headers = {
          "Content-Type": "multipart/form-data;charset=utf-8"
        };
        config.data = qs.parse(config.data);
      } else {
        config.headers = {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        };
        config.data = qs.stringify(config.data);
      }
    } else {
      config.headers = {
        "Content-Type": "application/json;charset=utf-8"
      };
      if (config.changeType === "blob") {
        config.headers = {
          "Content-Type":
            "application/json;application/octet-stream;charset=utf-8"
        };
      }
      config.data = qs.parse(config.params);
      config.params = qs.parse(config.params);
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

let i = 0;
// 添加响应拦截器
http.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    console.log("拦截响应", response);
    if (response.config.changeType == "blob") {
      return response;
    } else {
      const status = response.status;
      if (!response.data.HEADER || !response.data.BODY) {
        return response;
      } else {
        const retCode = response.data.HEADER.retcode;
        const msg = response.data.HEADER.retmsg;
        if (status >= 200 && status < 300) {
          if (retCode === "000000" || retCode === "000000000000") {
            return response;
          } else {
            if (!response.config.customContent) {
              new Vue().$vux.alert.show({
                title: "提示",
                content: `响应状态码：${retCode}，状态信息：${msg}`,
                onShow() {
                  console.log("Plugin: I'm showing");
                },
                onHide() {
                  console.log("Plugin: I'm hiding");
                }
              });
            }
            return response;
          }
        } else {
          if (!response.config.customContent) {
            new Vue().$vux.alert.show({
              title: "提示",
              content: `响应状态码：${retCode}，状态信息：${msg}`,
              onShow() {
                console.log("Plugin: I'm showing");
              },
              onHide() {
                console.log("Plugin: I'm hiding");
              }
            });
          }
          return response;
        }
      }
    }
  },
  function(error) {
    // 对响应错误做点什么
    new Vue().$vux.alert.show({
      title: "提示",
      content: `${error.message}，请联系相关人员修复`,
      onShow() {
        console.log("Plugin: I'm showing");
      },
      onHide() {
        console.log("Plugin: I'm hiding");
      }
    });
    return {
      error: error,
      status: parseInt(
        `${error.message}`.substring(
          `${error.message}`.lastIndexOf(" "),
          `${error.message}`.length + 1
        )
      ),
      message: `${error.message}`,
      data: {}
    };
  }
);

/**
 * @description: ajax请求
 * @event: apiAxios
 * @param {string} method 请求类型
 * @param {string} url api接口服务
 * @param {string/object} params 请求参数
 * @param {string} changeType 自定义请求类型，用于设定Content-type类型
 * @param {string/object} response 响应结果
 * @return: Promise
 */
function apiAxios(method, url, params, changeType, response, customContent) {
  http({
    method: changeType === "form" ? "POST" : method,
    url: url,
    changeType: changeType,
    customContent: customContent,
    data: method === "POST" || method === "PUT" ? params : null,
    params: method === "GET" || method === "DELETE" ? params : null
    // paramsSerializer: function(params) {
    //   let retParams = null;
    //   // eslint-disable-next-line no-debugger
    //   debugger;
    //   retParams = decodeURIComponent(
    //     qs.stringify(params, { arrayFormat: "indices" })
    //   );
    //   return retParams;
    // }
  })
    .then(function(res) {
      response(res);
    })
    .catch(function(err) {
      response(err);
    });
}

export default {
  get: (url, params, changeType, response, customContent) =>
    apiAxios("GET", url, params, changeType, response, customContent),
  post: (url, params, changeType, response, customContent) =>
    apiAxios("POST", url, params, changeType, response, customContent),
  put: (url, params, changeType, response, customContent) =>
    apiAxios("PUT", url, params, changeType, response, customContent),
  delete: (url, params, changeType, response, customContent) =>
    apiAxios("DELETE", url, params, changeType, response, customContent),
  getOSVersion: () => getOSVersion(),
  getMobileType: () => getMobileType(),
  header: header
};

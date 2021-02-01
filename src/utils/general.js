// 设计稿以750px为宽度，而把页面宽度设计为10rem的情况下

//如果设计稿基于iphone6，横向分辨率为750，body的width为750 / 100 = 7.5rem
//如果设计稿基于iphone4/5，横向分辨率为640，body的width为640 / 100 = 6.4rem
function setRem() {
  // 实际设备页面宽度和设计稿的比值
  let deviceWidth = document.documentElement.clientWidth;
  if (deviceWidth > 750) deviceWidth = 750;
  document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
  // if (deviceWidth > 750) deviceWidth = 750;
  // let scale = 1 / devicePixelRatio;
  // document
  //   .querySelector('meta[name="viewport"]')
  //   .setAttribute(
  //     "content",
  //     "initial-scale=" +
  //       scale +
  //       ", maximum-scale=" +
  //       scale +
  //       ", minimum-scale=" +
  //       scale +
  //       ", user-scalable=no"
  //   );
  // // 计算实际的rem值并赋予给html的font-size
  // document.documentElement.style.fontSize = deviceWidth / 10 + "px";
}
// setRem();
// window.addEventListener("resize", () => {
//   setRem();
// });

/**
 * @description: cookieName
 * @event: clearCookie
 * @param {*} cookieName 键名
 * @return: void
 */
function clearCookie(cookieName) {
  let now = new Date(),
    yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24);
  setCookie(cookieName, "", yesterday);
}
/**
 * @description: 设置cookies
 * @event: setCookie
 * @param {*} cookieName 键名
 * @param {*} cookieValue 键值
 * @param {*} expires 过期时间
 * @param {*} path 路径
 * @param {*} domain 域名
 * @param {*} secure 安全
 * @return: void
 */
function setCookie({
  cookieName,
  cookieValue,
  expires,
  path = "/",
  domain,
  secure
}) {
  let cookie = escape(cookieName) + "=" + escape(cookieValue);
  if (expires) cookie += ";expires=" + expires.toGMTString();
  if (expires) cookie += ";path=" + path;
  if (expires) cookie += ";domain=" + domain;
  if (expires) cookie += ";secure=" + secure;
  document.cookie = cookie;
}

/**
 * @description: 获取cookies
 * @event: getCookie
 * @param {*} cookieName 键名
 * @return: 返回键值
 */
function getCookie(cookieName) {
  let cookieValue = "",
    cookie = document.cookie,
    posName = cookie.indexOf(escape(cookieName) + "=");
  if (posName != -1) {
    let posValue = posName + (escape(cookieName) + "=").length,
      endPos = cookie.indexOf(";", posValue);
    if (endPos != -1)
      cookieValue = unescape(cookie.substring(posValue, endPos));
    else cookieValue = unescape(cookie.substring(posValue));
  }
  return cookieValue;
}
/**
 * @description: 深拷贝
 * @event: deepCopy
 * @param {*} obj 需要进行深拷贝的对象
 * @return: 返回深拷贝值
 */
function deepCopy(obj) {
  if (obj === null) return null;
  if (typeof obj !== "object") return obj;
  if (obj.constructor === Date) return new Date(obj);
  if (obj.constructor === RegExp) return new RegExp(obj);
  let newObj = new obj.constructor(); //保持继承链
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      //不遍历其原型链上的属性
      let val = obj[key];
      newObj[key] = typeof val === "object" ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
    }
  }
  return newObj;
}
/**
 * @description: 绘制钟表刻度线
 * @event: createTimeLine
 * @return: 返回刻度列表
 */
function createTimeLine() {
  /* 绘制钟表的时钟刻度线 */
  let list = [];
  // key1表示x方向上的偏移量，key2表示y方向上的偏移量
  let val, key1, key2;
  for (let i = 0; i < 36; i++) {
    val = i * 10;
    key1 = 290;
    key2 = 0;
    if (val >= 180 && val < 270) {
      key1 = 290 / 100;
    }
    if (val >= 270 && val < 360) {
      key1 = 288 / 100;
    }
    if (val >= 0 && val < 180) {
      key1 = 286 / 100;
    }

    if (val > 90 && val < 270) {
      key2 = 1;
    }
    if (val < 90 || val > 270) {
      key2 = -1;
    }
    list.push({ deg: val, key1: key1 + "rem", key2: key2 });
  }
  console.log(this.list);
  return list;
}
/**
 * @description: 判断是否为微信客户端
 * @event: isMiniProgram
 * @return: 返回Promise对象
 */
function isMiniProgram() {
  return new Promise((resolve, reject) => {
    if (
      navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1 ||
      navigator.userAgent.match(/_SQ_/i) == "_sq_"
    ) {
      // eslint-disable-next-line no-undef
      wx.miniProgram.getEnv(res => {
        if (!res.miniprogram) {
          resolve(false);
          return;
        } else {
          resolve(true);
        }
      });
    } else {
      resolve(false);
      return;
    }
  });
}

// 获取本地存储
function getCache(name) {
  return localStorage.getItem(name) || "";
}
// 设置本地存储
function setCache(name, value) {
  localStorage.setItem(name, value);
}

function clearCache(name) {
  localStorage.removeItem(name);
}

/**
 * @description: 时间格式化
 * @event: formatTime
 * @param {*} date 需要格式化的时间/字符串
 * @param {*} fmt：格式，如"yyyy-MM-dd"为2016-05-03，"yyyy-M-d"为2016-5-3，"MM-dd hh:mm"为05-03 17:08
 * @return: 格式化后的时间格式
 */
function formatTime(date, fmt) {
  if (!date) return;
  if (
    typeof date === "string" ||
    (typeof date === "object" && date.constructor === Date)
  ) {
    if (typeof date === "string") {
      date = date.replace(/-/g, "/");
      let index = date.indexOf(",");
      if (index > -1) {
        date = date.substring(0, index);
      }
      date = new Date(date);
      if (date == "Invalid Date") return date;
    }
    let o = {
      "M+": date.getMonth() + 1, //月份
      "D+": date.getDate(), //日
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "H+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    };
    if (/((y+)|(Y+))/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  } else {
    return date;
  }
}
// url参数及操作 ============================
// 获取所有的url参数，有参数时，只返回指定参数
function GetQueryString(name) {
  return name ? getQueryStringByName(name) : getUrlParam();
}
//根据QueryString参数名称获取值
function getQueryStringByName(name, search) {
  search = search || location.search;
  var result = search.match(new RegExp("[?&]" + name + "=([^&]+)", "i"));
  if (result == null || result.length < 1) return "";
  return unescape(result[1]);
}
// 获取所有的url参数，有参数时，只返回指定参数
function getUrlParam(name, search) {
  search = search || location.search.replace(/^\?/, "");
  var r = {};
  if (search) {
    var param = unescape(search).split("&");
    for (var i = 0; i < param.length; i++) {
      var item = param[i].split("=");
      r[item[0]] = item[1];
    }
  }
  return name ? r[name] : r;
}

// 获取当前时间， 并返回年月日
function getTimeX(time) {
  let date = new Date(time);
  let month;
  let day;
  // console.log(date.getMonth())
  //  console.log(date.getDate())
  if (date.getMonth() < 9) month = "0" + (date.getMonth() + 1) + "-";
  else month = date.getMonth() + 1 + "-";
  if (date.getDate() < 10) day = "0" + date.getDate();
  else day = date.getDate();
  return date.getFullYear() + "-" + month + day;
}

function deepClone(source) {
  const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
  for (let keys in source) {
    // 遍历目标
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === "object") {
        // 如果值是对象，就递归一下
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}

function deepCopyObj(obj, newObj) {
  newObj = newObj || {};
  for (let key in obj) {
    if (typeof obj[key] == "object") {
      newObj[key] = obj[key].constructor === Array ? [] : {};
      deepClone(obj[key], newObj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

//阻止浏览器的默认行为
function stopDefault(e) {
  //阻止默认浏览器动作(W3C)
  if (e && e.preventDefault) e.preventDefault();
  //IE中阻止函数器默认动作的方式
  else window.event.returnValue = false;
  return false;
}
//停止冒泡行为
function stopBubble(e) {
  //如果提供了事件对象，则这是一个非IE浏览器
  if (e && e.stopPropagation)
    //因此它支持W3C的stopPropagation()方法
    e.stopPropagation();
  //否则，我们需要使用IE的方式来取消事件冒泡
  else window.event.cancelBubble = true;
}

function getAddressDetail(it, list) {
  let that = this;
  let area = [];
  let list1 = list.filter(val => {
    return val.value === it;
  }, []);
  let list2 = list.filter(val => {
    return val.value === (list1.length ? list1[0].parent : "");
  }, []);

  let list3 = list.filter(val => {
    return val.value === (list2.length ? list2[0].parent : "");
  }, []);

  console.log("list1", list1, list2, list3);
  area.push(list3.length ? list3[0].name : "");
  area.push(list2.length ? list2[0].name : "");
  area.push(list1.length ? list1[0].name : "");
  return area;
}

export default {
  clearCookie,
  getCookie,
  setCookie,
  setRem,
  deepCopy,
  createTimeLine,
  isMiniProgram,
  getQueryStringByName,
  GetQueryString,
  getUrlParam,
  formatTime,
  getCache,
  setCache,
  clearCache,
  getTimeX,
  deepClone,
  deepCopyObj,
  stopDefault,
  stopBubble,
  getAddressDetail
};

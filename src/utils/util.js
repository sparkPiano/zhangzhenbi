const globalData = {};

function putData(key, value) {
  console.log("putData key[" + key + "] value[" + value + "]");
  console.log(globalData);
  globalData[key] = value;
}

function getData(key) {
  return globalData[key] ? globalData[key] : "";
}

function removeData(key) {
  globalData[key] = "";
}
// 获取当前时间，格式YYYY-MM-DD
function getNowFormatDate(monthParam, dateParam, type, str) {
  var date = new Date();
  date.setMonth(date.getMonth() + monthParam);
  date.setDate(date.getDate() + dateParam);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (hours >= 0 && hours <= 9) {
    hours = "0" + hours;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = "0" + seconds;
  }
  str = str || "";
  var currentdate = year + str + month + str + strDate;
  var currentTime = hours + str + minutes + str + seconds;
  if (type) {
    return currentTime;
  } else {
    return currentdate;
  }
}

function timesFun(timesData) {
  // 如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  // var dateBegin = new Date(timesData.replace(/-/g, '/'))// 将-转化为/，使用new Date
  var dateBegin = timesData;
  var dateEnd = new Date(); // 获取当前时间
  var dateDiff = dateEnd.getTime() - dateBegin.getTime(); // 时间差的毫秒数
  var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); // 计算出相差天数
  var leave1 = dateDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000)); // 计算出小时数
  // 计算相差分钟数
  var leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000)); // 计算相差分钟数
  // 计算相差秒数
  // var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  // var seconds = Math.round(leave3 / 1000)
  var timesString = "";
  if (dayDiff != 0) {
    timesString = dayDiff + "天前";
  } else if (dayDiff == 0 && hours != 0) {
    timesString = hours + "小时前";
  } else if (dayDiff == 0 && hours == 0) {
    timesString = minutes + "分前";
  }
  return timesString;
}
// map to string tools
function map2Str(mapParam) {
  var reqParaAsJason = "";
  var i = 0;
  for (var key in mapParam) {
    if (i != 0) {
      reqParaAsJason += ",";
    }
    reqParaAsJason += '"' + key + '":"' + mapParam[key] + '"';
    i++;
  }
  return "{" + reqParaAsJason + "}";
}

// map to string tools
function paras2Str(mapParam) {
  var reqParaAsJason = "";
  var i = 0;
  for (var key in mapParam) {
    reqParaAsJason += "&" + key + "=" + mapParam[key];
    i++;
  }
  return reqParaAsJason;
}
// 近3个月
function getLast3Month() {
  var now = new Date();
  var year = now.getFullYear();
  let month = now.getMonth() + 1; //0-11表示1-12月
  let commonth = now.getMonth() + 1; //0-11表示1-12月
  let endmonth = "";
  let day = now.getDate();
  let comday = now.getDate();
  let endday = "";
  var dateObj = {};
  if (commonth >= 0 && commonth <= 9) {
    commonth = "0" + commonth;
  }
  if (comday >= 0 && comday <= 9) {
    comday = "0" + comday;
  }
  dateObj.now = year + "" + commonth + "" + comday;
  var nowMonthDay = new Date(year, month, 0).getDate(); //当前月的总天数
  if (month - 3 <= 0) {
    //如果是1、2、3月，年数往前推一年
    var last3MonthDay = new Date(
      year - 1,
      12 - (3 - parseInt(month)),
      0
    ).getDate(); //3个月前所在月的总天数
    if (last3MonthDay < day) {
      endmonth = 12 - (3 - month);
      endday = last3MonthDay;
      if (endmonth >= 0 && endmonth <= 9) {
        endmonth = "0" + endmonth;
      }
      if (endday >= 0 && endday <= 9) {
        endday = "0" + endday;
      }
      //3个月前所在月的总天数小于现在的天日期
      dateObj.last = year - 1 + "" + endmonth + "" + endday;
    } else {
      endmonth = 12 - (3 - month);
      endday = day;
      if (endmonth >= 0 && endmonth <= 9) {
        endmonth = "0" + endmonth;
      }
      if (endday >= 0 && endday <= 9) {
        endday = "0" + endday;
      }
      dateObj.last = year - 1 + "" + endmonth + "" + endday;
    }
  } else {
    let last3MonthDay = new Date(year, parseInt(month) - 3, 0).getDate(); //3个月前所在月的总天数
    if (last3MonthDay < day) {
      //3个月前所在月的总天数小于现在的天日期
      if (day < nowMonthDay) {
        endmonth = month - 3;
        endday = last3MonthDay - (nowMonthDay - day);
        if (endmonth >= 0 && endmonth <= 9) {
          endmonth = "0" + endmonth;
        }
        if (endday >= 0 && endday <= 9) {
          endday = "0" + endday;
        }
        //当前天日期小于当前月总天数,2月份比较特殊的月份
        dateObj.last = year + "" + endmonth + "" + endday;
      } else {
        endmonth = month - 3;
        endday = last3MonthDay;
        if (endmonth >= 0 && endmonth <= 9) {
          endmonth = "0" + endmonth;
        }
        if (endday >= 0 && endday <= 9) {
          endday = "0" + endday;
        }
        dateObj.last = year + "" + endmonth + "" + endday;
      }
    } else {
      endmonth = month - 3;
      endday = day;
      if (endmonth >= 0 && endmonth <= 9) {
        endmonth = "0" + endmonth;
      }
      if (endday >= 0 && endday <= 9) {
        endday = "0" + endday;
      }
      dateObj.last = year + "" + endmonth + "" + endday;
    }
  }
  return dateObj;
}
// 近一个月
function getLastMonth() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1; //0-11表示1-12月
  let commonth = now.getMonth() + 1; //0-11表示1-12月
  let endmonth = "";
  let day = now.getDate();
  let comday = now.getDate();
  let endday = "";
  let dateObj = {};
  if (commonth >= 0 && commonth <= 9) {
    commonth = "0" + commonth;
  }
  if (comday >= 0 && comday <= 9) {
    comday = "0" + comday;
  }
  dateObj.now = year + "" + commonth + "" + comday;
  let nowMonthDay = new Date(year, month, 0).getDate(); //当前月的总天数
  if (month - 1 <= 0) {
    endday = day;
    if (endday >= 0 && endday <= 9) {
      endday = "0" + endday;
    }
    //如果是1月，年数往前推一年<br>
    dateObj.last = year - 1 + "" + 12 + "" + endday;
  } else {
    let lastMonthDay = new Date(year, parseInt(month) - 1, 0).getDate();
    if (lastMonthDay < day) {
      //1个月前所在月的总天数小于现在的天日期
      if (day < nowMonthDay) {
        endmonth = month - 1;
        endday = lastMonthDay - (nowMonthDay - day);
        if (endmonth >= 0 && endmonth <= 9) {
          endmonth = "0" + endmonth;
        }
        if (endday >= 0 && endday <= 9) {
          endday = "0" + endday;
        }
        //当前天日期小于当前月总天数
        dateObj.last = year + "" + endmonth + "" + endday;
      } else {
        endmonth = month - 1;
        endday = lastMonthDay;
        if (endmonth >= 0 && endmonth <= 9) {
          endmonth = "0" + endmonth;
        }
        if (endday >= 0 && endday <= 9) {
          endday = "0" + endday;
        }
        dateObj.last = year + "" + endmonth + "" + endday;
      }
    } else {
      endmonth = month - 1;
      endday = day;
      if (endmonth >= 0 && endmonth <= 9) {
        endmonth = "0" + endmonth;
      }
      if (endday >= 0 && endday <= 9) {
        endday = "0" + endday;
      }
      dateObj.last = year + "" + endmonth + "" + endday;
    }
  }
  return dateObj;
}
// 近一周
function getLastWeek() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1; //0-11表示1-12月
  let commonth = now.getMonth() + 1; //0-11表示1-12月
  let endmonth = "";
  let day = now.getDate();
  let comday = now.getDate();
  let endday = "";
  let dateObj = {};
  if (commonth >= 0 && commonth <= 9) {
    commonth = "0" + commonth;
  }
  if (comday >= 0 && comday <= 9) {
    comday = "0" + comday;
  }
  dateObj.now = year + "" + commonth + "" + comday;
  if (day - 7 <= 0) {
    //如果在当月7日之前
    let lastMonthDay = new Date(year, parseInt(month) - 1, 0).getDate(); //1周前所在月的总天数
    if (month - 1 <= 0) {
      endday = 31 - (7 - day);
      if (endday >= 0 && endday <= 9) {
        endday = "0" + endday;
      }
      //如果在当年的1月份
      dateObj.last = year - 1 + "" + 12 + "" + endday;
    } else {
      endmonth = month - 1;
      endday = lastMonthDay - (7 - day);
      if (endmonth >= 0 && endmonth <= 9) {
        endmonth = "0" + endmonth;
      }
      if (endday >= 0 && endday <= 9) {
        endday = "0" + endday;
      }
      dateObj.last = year + "" + endmonth + "" + endday;
    }
  } else {
    endmonth = month;
    endday = day - 7;
    if (endmonth >= 0 && endmonth <= 9) {
      endmonth = "0" + endmonth;
    }
    if (endday >= 0 && endday <= 9) {
      endday = "0" + endday;
    }
    dateObj.last = year + "" + endmonth + "" + endday;
  }
  return dateObj;
}
function dateOptions(text) {
  const end = new Date();
  const start = new Date(new Date().toDateString());
  if (text == "x001") {
    //"当天"
    start.setTime(end.getTime());
  } else if (text == "x002") {
    //本周
    start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
  } else if (text == "x003") {
    //一个月
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
  } else if (text == "x004") {
    //三个月
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
  }
  let month = start.getMonth() + 1 + "";
  if (start.getMonth() + 1 >= 0 && start.getMonth() + 1 <= 9) {
    month = "0" + (start.getMonth() + 1);
  }
  let day = start.getDate() + "";
  if (start.getDate() >= 0 && start.getDate() <= 9) {
    day = "0" + start.getDate();
  }
  let endmonth = end.getMonth() + 1 + "";
  if (end.getMonth() + 1 >= 0 && end.getMonth() + 1 <= 9) {
    endmonth = "0" + (end.getMonth() + 1);
  }
  let endday = end.getDate() + "";
  if (end.getDate() >= 0 && end.getDate() <= 9) {
    endday = "0" + end.getDate();
  }
  return {
    now: [start.getFullYear(), month, day].join(""),
    last: [end.getFullYear(), endmonth, endday].join("")
  };
}
function getAppDate(AddDayCount, dayLen) {
  let date = new Date();
  let base = new Date(date).getTime();
  base = base + AddDayCount * (24 * 3600 * 1000);
  let oneDay = 24 * 3600 * 1000;
  let dateList = [];
  let data = [Math.random() * 300];
  let time = new Date(base);

  const b = { key: "", value: "" };
  let month1 = time.getMonth() + 1;
  let strDate1 = time.getDate();
  if (month1 >= 1 && month1 <= 9) {
    month1 = "0" + month1;
  }
  if (strDate1 >= 0 && strDate1 <= 9) {
    strDate1 = "0" + strDate1;
  }
  b.value = [time.getFullYear(), month1, strDate1].join("-");
  b.key = "" + time.getFullYear() + month1 + strDate1;

  dateList.push(b);

  for (let i = 1; i < dayLen; i++) {
    //控制需要的天数
    let now = new Date((base += oneDay)); //这里控制往前一周还是往后一周
    const a = { key: "", value: "" };
    let month = now.getMonth() + 1;
    let strDate = now.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    a.value = [now.getFullYear(), month, strDate].join("-");
    a.key = "" + now.getFullYear() + month + strDate;

    dateList.push(a);
    // dateList.push(Math.round((Math.random() - 0.5) * 20 + dateList[i - 1]));
  }
  let newdate = dateList;
  //var newdate = date.reverse(); //往后一周的话需要将数组倒叙，完后不需要
  // console.log(newdate);
  // console.log(newdate[0]); //需要哪天直接下标取就行了
  return newdate;

  //数据插入table显示，可忽略
  //var str = "";
  //for (let i = 0; i < newdate.length; i++) {
  //str += '<tr>' + newdate[i] + '</tr></br>';
  //};
  //console.log(str);
  //document.getElementById("time").innerHTML = str;//拼接完字符串数组后用innerHTML把它渲染到页面中
}
export default {
  putData: putData,
  getData: getData,
  removeData: removeData,
  getNowFormatDate: getNowFormatDate,
  timesFun: timesFun,
  paras2Str: paras2Str,
  map2Str: map2Str,
  getAppDate: getAppDate,
  dateOptions: dateOptions,
  getLast3Month: getLast3Month,
  getLastMonth: getLastMonth,
  getLastWeek: getLastWeek
};

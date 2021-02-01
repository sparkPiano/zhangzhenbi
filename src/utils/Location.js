/*
 * @Description: Location
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-12-14 11:23:53
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-14 17:12:50
 */
let type3 = [550, 30]; //设定  google  gps格式转换
function Location() {}
Location.prototype.getLocation = function(callback) {
  let options = {
    enableHighAccuracy: true,
    maximumAge: 1000
  };
  let self = this;
  self.loadBaiduMapApi(callback);
  //   if (navigator.geolocation) {
  //     //浏览器支持geolocation
  //     navigator.geolocation.getCurrentPosition(
  //       function(position) {
  //         //经度
  //         var longitude = position.coords.longitude;
  //         //纬度
  //         var latitude = position.coords.latitude;
  //         self.loadMapApi(longitude, latitude);
  //       },
  //       self.onError,
  //       options
  //     );
  //   } else {
  //     //浏览器不支持geolocation
  //     self.loadBaiduMapApi();
  //   }
};
Location.prototype.loadMapApi = function(longitude, latitude) {
  let self = this;
  const oHead = document.getElementsByTagName("head").item(0);
  const oScript = document.createElement("script");
  oScript.type = "text/javascript";
  oScript.src =
    "http://api.map.baidu.com/getscript?v=2.0&ak=nNjDVHeO593g2dL2oWFWfuv0ihRGtewS&services=&t=20140930184510";
  oHead.appendChild(oScript);
  oScript.onload = function(date) {
    // eslint-disable-next-line no-undef
    const point = new BMap.Point(longitude, latitude);
    // eslint-disable-next-line no-undef
    const gc = new BMap.Geocoder();
    gc.getLocation(point, function(rs) {
      const addComp = rs.addressComponents;
      self.callback(addComp);
    });
  };
};

Location.prototype.loadBaiduMapApi = function(callback) {
  let self = this;
  const oHead = document.getElementsByTagName("head").item(0);
  const oScript = document.createElement("script");
  oScript.type = "text/javascript";
  oScript.src =
    "http://api.map.baidu.com/getscript?v=2.0&ak=nNjDVHeO593g2dL2oWFWfuv0ihRGtewS&services=&t=20140930184510";
  oHead.appendChild(oScript);
  oScript.onload = function(date) {
    let currentLat, currentLon, acc;
    // eslint-disable-next-line no-undef
    const geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      console.log("init Map");
      // eslint-disable-next-line no-undef
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        console.log("进来了");
        // eslint-disable-next-line no-undef
        const mk = new BMap.Marker(r.point);
        currentLat = r.point.lat;
        currentLon = r.point.lng;
        acc = r.accuracy;
      }
    }, self.onError);
    setTimeout(function() {
      // eslint-disable-next-line no-undef
      const pt = new BMap.Point(currentLon, currentLat);
      let accTran = self.getTransType(acc);
      // eslint-disable-next-line no-undef
      const convertor = new BMap.Convertor();
      convertor.translate([pt], accTran, 5, function(resPoint) {
        if (resPoint && resPoint.points && resPoint.points.length > 0) {
          currentLon = resPoint.points[0].lng;
          currentLat = resPoint.points[0].lat;
        }
        // eslint-disable-next-line no-undef
        const point = new BMap.Point(currentLon, currentLat);
        // eslint-disable-next-line no-undef
        const geo = new BMap.Geocoder();
        geo.getLocation(point, res => {
          callback && callback(res);
        });
      });
    }, 1000);
  };
};

Location.prototype.onError = function(error) {
  switch (error.code) {
    case 1:
      alert("位置服务被拒绝");
      break;
    case 2:
      alert("暂时获取不到位置信息");
      break;
    case 3:
      alert("获取信息超时");
      break;
    case 4:
      alert("未知错误");
      break;
  }
};

Location.prototype.getTransType = function(accuracy) {
  if (window.localStorage) {
    var transType = localStorage.getItem("xdlcfwapp_transType");
    if (transType != null && transType != "") {
      return transType;
    }
  }

  for (var i = 0; i < type3.length; i++) {
    if (type3[i] == accuracy) {
      localStorage.setItem("xdlcfwapp_transType", 3);
      return 3;
    }
  }
  localStorage.setItem("xdlcfwapp_transType", 1);
  return 1;
};

export default Location;

<template>
  <div style="overflow: hidden;">
    <ccb-search
      :formEleProp="formEleProp.searchVal"
      :formEle="formEle"
      :btnObj="btnObj"
    >
    </ccb-search>
    <ccb-raceLamp
      v-if="
        formEleProp.raceLamp.raceLampList &&
          formEleProp.raceLamp.raceLampList.length > 0
      "
      :formEleProp="formEleProp.raceLamp"
    ></ccb-raceLamp>
    <!-- <ccb-net-list
      v-if="showType == '1'"
      :formEleProp="formEleProp.netLists"
    ></ccb-net-list> -->

    <ccb-net-list-map
      @gotoNetDetail="gotoNetDetail"
      @ready="ready"
      @dragendNetLists="dragendNetLists"
      :formEleProp="formEleProp.netLists"
      :zoom="zoom"
      :hackReset="hackReset"
      :autoLocationPoint="autoLocationPoint"
      :initLocation="initLocation"
      :center="center"
    >
    </ccb-net-list-map>
    <ccb-net-detail
      @getNetDetail="getNetDetail"
      @gotoNetCalendar="gotoNetCalendar"
      :formEleProp="formEleProp.netInfoAll"
    ></ccb-net-detail>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import {
  Swiper,
  SwiperItem,
  Marquee,
  MarqueeItem,
  XButton,
  ChinaAddressV4Data,
  Value2nameFilter as value2name
} from "vux";

function getResult(val) {
  let rs = [];
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    });
  }
  return rs;
}
export default {
  name: "netListPg",
  data() {
    return {
      showType: "1",
      onFetching: false,
      showBorders: false,
      showVerticalDividers: false,
      menusList: [],
      cellList: [],
      cellList1: [],
      formEleProp: {
        paomadengText: "",
        raceLamp: {
          raceLampLeftIcon: "",
          raceLampBgColor: "#f2f6c7",
          raceLampColor: "#d4b86a",
          raceLampDuration: 20,
          raceLampOutview: true,
          raceLampThreeD: true,
          raceLampHandleNotice: () => {},
          raceLampList: []
        },

        searchVal: {
          customClass: false,
          isShowLeft: true,
          isShowRight: false,
          pos: "广州市",
          placeholder: "请输入网点名称、地址关键字",
          cancelText: "",
          results: [],
          autoFixed: true,
          top: "0.46rem",
          position: "absolute",
          autoScrollToTop: false,
          searchSlotTitle: "searchVal",
          searchRef: "search",
          onFocus: this.onFocus,
          onCancel: this.onCancel,
          onSubmit: this.onSubmit,
          onResultClick: this.onResultClick,
          onChange: this.onChange,
          onBlur: this.onBlur,
          onClear: this.onClear
        },
        netLists: {
          bmLabelStyle: {
            color: "#ccc",
            fontSize: "12px",
            zIndex: "1",
            border: "none",
            backgroundColor: "#eeeeee",
            borderRadius: "10px",
            padding: "1px 2px"
          },
          ready: this.initLocalInfo,
          list: []
        },
        netInfoAll: {
          netInfo: {},
          netDetailInfo: {},
          netImg: {
            calendarImg: require("../../assets/images/calendar.png")
          },
          netOther: {
            show1: false,
            popupPosition: "bottom"
          }
        },
        masker: {
          color: "",
          opacity: 0.5,
          fullscreen: false,
          badgeText: "8"
        }
      },
      formEle: {
        searchVal: "",
        netLists: null,
        masker: null
      },
      btnObj: {
        btnName: "筛选",
        btnMini: true,
        btnPlain: true
      },
      testData: [],
      value2: ["天津市", "市辖区", "和平区"],
      center: {
        lng: 116.42017592867,
        lat: 39.911693711975
      },
      zoom: 16,
      initLocation: false,
      autoLocationPoint: {
        lng: 0,
        lat: 0
      },
      hackReset: true,
      markerIcon: require("@/assets/images/outlet_marker_icon.png"),
      markerIconS: require("@/assets/images/outlet_marker_icon_pressed.png"),
      controlIcon: require("@/assets/images/outlet_map_center.png"),
      geolocation: null, // Geolocation对象实例
      positioning: false, // 定位中
      positioningInterval: null, // 定位倒计时计时器
      countDown: 30, // 倒计时，单位秒
      location: null // 位置信息
    };
  },
  created() {
    let that = this;
    that.getraceLamp(); //跑马灯
  },
  mounted() {},
  updated() {},
  computed: {
    ...mapState(["netList"]),
    ...mapGetters({
      getXurrNetList: "getNetList"
    })
  },
  watch: {
    // getXurrNetList() {
    //   console.log("BBBBBBBBBBB", this.getXurrNetList);
    //   let that = this;
    //   that.hackReset = false;
    // that.$nextTick(() => {
    // that.formEleProp.netLists.list = this.getXurrNetList.netList;
    // that.formEleProp.netLists.list = [
    //   {
    //     netFlag: "1",
    //     netDcc: "442000043",
    //     distance: "638.0",
    //     netName: "深圳东海支行",
    //     Dstn_Len: "894",
    //     netArea: "深圳市福田区深南大道7028号时代科技大厦一楼01-D、07、08单元",
    //     longitude: "114.031792",
    //     latitude: "22.544051",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000157",
    //     distance: "1113.0",
    //     netName: "深圳中旅公馆支行",
    //     Dstn_Len: "1222",
    //     netArea: "深圳市福田区润田路中旅国际公馆二期商铺",
    //     longitude: "114.022005",
    //     latitude: "22.555364",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000104",
    //     distance: "620.0",
    //     netName: "深圳英龙支行",
    //     Dstn_Len: "1321",
    //     netArea: "深圳市福田区深南大道6025号英龙展业大厦首层",
    //     longitude: "114.028337",
    //     latitude: "22.540923",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000039",
    //     distance: "1316.0",
    //     netName: "深圳泰然支行",
    //     Dstn_Len: "1395",
    //     netArea: "深圳市福田区车公庙工业区第三小区304栋首层",
    //     longitude: "114.037263",
    //     latitude: "22.540467",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000162",
    //     distance: "2075.0",
    //     netName: "深圳香蜜湖支行",
    //     Dstn_Len: "1519",
    //     netArea: "深圳市福田区红荔路8007号土地房产交易大厦一楼",
    //     longitude: "114.045852",
    //     latitude: "22.549323",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000118",
    //     distance: "2442.0",
    //     netName: "深圳景田支行",
    //     Dstn_Len: "1562",
    //     netArea: "深圳市景田北路21号名进投资大厦一楼",
    //     longitude: "114.042927",
    //     latitude: "22.561427",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000086",
    //     distance: "2591.0",
    //     netName: "深圳景苑支行",
    //     Dstn_Len: "2127",
    //     netArea: "深圳市福田区新闻路合正名园C座首层",
    //     longitude: "114.051108",
    //     latitude: "22.547816",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000105",
    //     distance: "2930.0",
    //     netName: "深圳红荔支行",
    //     Dstn_Len: "2205",
    //     netArea: "深圳市福田区景田路擎天华庭裙楼101商铺",
    //     longitude: "114.051369",
    //     latitude: "22.558018",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000094",
    //     distance: "1451.0",
    //     netName: "深圳园博园支行",
    //     Dstn_Len: "2500",
    //     netArea: "深圳市福田区竹子林紫竹六道越海家园裙楼首层",
    //     longitude: "114.013132",
    //     latitude: "22.540628",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000147",
    //     distance: "3433.0",
    //     netName: "深圳梅景支行",
    //     Dstn_Len: "2567",
    //     netArea: "深圳市梅林一村28栋一楼",
    //     longitude: "114.045664",
    //     latitude: "22.57097",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000153",
    //     distance: "2179.0",
    //     netName: "深圳金沙支行",
    //     Dstn_Len: "2674",
    //     netArea: "深圳市福田区福荣路鸿景湾名苑首层",
    //     longitude: "114.034455",
    //     latitude: "22.528107",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000155",
    //     distance: "3298.0",
    //     netName: "深圳国会大厦支行",
    //     Dstn_Len: "2999",
    //     netArea: "深圳市福田区国际商会大厦A座首层",
    //     longitude: "114.0579",
    //     latitude: "22.543123",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000036",
    //     distance: "2936.0",
    //     netName: "深圳铁路支行",
    //     Dstn_Len: "3013",
    //     netArea: "深圳市福田区新洲九街福昌苑首层",
    //     longitude: "114.049315",
    //     latitude: "22.53086",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000034",
    //     distance: "3756.0",
    //     netName: "深圳分行营业部",
    //     Dstn_Len: "3316",
    //     netArea: "深圳市福田区益田路6003号荣超商务中心A座",
    //     longitude: "114.06222",
    //     latitude: "22.550319",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000088",
    //     distance: "3389.0",
    //     netName: "深圳新洲支行",
    //     Dstn_Len: "3359",
    //     netArea: "深圳市福田区新洲花园大厦首层",
    //     longitude: "114.055535",
    //     latitude: "22.532582",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000091",
    //     distance: "4237.0",
    //     netName: "深圳莲花北支行",
    //     Dstn_Len: "3538",
    //     netArea: "深圳市福田区莲花北村富莲大厦2栋首层",
    //     longitude: "114.060908",
    //     latitude: "22.566261",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000152",
    //     distance: "2528.0",
    //     netName: "深圳侨城东支行",
    //     Dstn_Len: "3640",
    //     netArea: "深圳市侨城东新浩城首层",
    //     longitude: "114.003172",
    //     latitude: "22.537539",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000093",
    //     distance: "3899.0",
    //     netName: "深圳中心区支行",
    //     Dstn_Len: "3691",
    //     netArea: "深圳市福田中心区益田路4068号卓越时代广场一楼",
    //     longitude: "114.063293",
    //     latitude: "22.539809",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000156",
    //     distance: "3683.0",
    //     netName: "深圳金地支行",
    //     Dstn_Len: "3870",
    //     netArea: "深圳市福田区新洲南路沙尾工业区先龙大厦楼",
    //     longitude: "114.051883",
    //     latitude: "22.523203",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442101368",
    //     distance: "4587.0",
    //     netName: "前海分行",
    //     Dstn_Len: "4150",
    //     netArea: "深圳市福田区金田路4036号荣超大厦1-3楼",
    //     longitude: "114.06969",
    //     latitude: "22.554308",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000100",
    //     distance: "4758.0",
    //     netName: "深圳天健世纪支行",
    //     Dstn_Len: "4369",
    //     netArea: "深圳市福田区福中一路天健世纪花园1栋首层",
    //     longitude: "114.071721",
    //     latitude: "22.55255",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000145",
    //     distance: "4407.0",
    //     netName: "深圳益民支行",
    //     Dstn_Len: "4410",
    //     netArea: "深圳市福田区益田路2004号共和世家碧云轩一楼",
    //     longitude: "114.064594",
    //     latitude: "22.528862",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000069",
    //     distance: "5213.0",
    //     netName: "深圳梅林支行",
    //     Dstn_Len: "4544",
    //     netArea: "深圳市福田区梅林广厦路云中大厦一楼",
    //     longitude: "114.067753",
    //     latitude: "22.572604",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000109",
    //     distance: "4375.0",
    //     netName: "深圳益田支行",
    //     Dstn_Len: "4548",
    //     netArea: "深圳市福田区益田村23栋一楼",
    //     longitude: "114.057909",
    //     latitude: "22.520074",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000007",
    //     distance: "3607.0",
    //     netName: "深圳华侨城支行",
    //     Dstn_Len: "4732",
    //     netArea: "深圳市南山区华侨城湖滨花园裙楼",
    //     longitude: "113.991142",
    //     latitude: "22.542121",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000080",
    //     distance: "4846.0",
    //     netName: "深圳皇岗支行",
    //     Dstn_Len: "4801",
    //     netArea: "深圳市福田区金田路2009号",
    //     longitude: "114.070404",
    //     latitude: "22.531523",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000103",
    //     distance: "5069.0",
    //     netName: "深圳福华支行",
    //     Dstn_Len: "4922",
    //     netArea: "深圳市福田区彩田路海天大厦一楼",
    //     longitude: "114.074649",
    //     latitude: "22.538772",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000067",
    //     distance: "5335.0",
    //     netName: "深圳莲花山支行",
    //     Dstn_Len: "4963",
    //     netArea: "深圳市福田区红荔西路莲花大厦东座首层",
    //     longitude: "114.076973",
    //     latitude: "22.554931",
    //     Cur_StCd: "2"
    //   },
    //   {
    //     netFlag: "1",
    //     netDcc: "442000002",
    //     distance: "5133.0",
    //     netName: "深圳福田支行",
    //     Dstn_Len: "4985",
    //     netArea: "深圳市中心五路大中华国际交易广场西侧",
    //     longitude: "114.075322",
    //     latitude: "22.539024",
    //     Cur_StCd: "2"
    //   }
    // ];
    // if (that.formEleProp.netLists.list.length > 0) {
    //   that.hackReset = true;
    //   that.formEleProp.netLists.list.map(el => {
    //     el.url = that.markerIcon;
    //   });
    //   console.log(
    //     "that.formEleProp.netLists.list",
    //     that.formEleProp.netLists.list
    //   );
    //   that.formEleProp.netLists.list[0].url = that.markerIconS;
    //   console.log("cccccccccccccccccccccc", that.formEleProp.netInfoAll);
    //   that.formEleProp.netInfoAll.netInfo = that.formEleProp.netLists.list[0];
    // }
    // });
    // }
    // ,
    // netList: {
    //   handler: function(newVal, oldVal) {
    //     let that = this;
    //     that.hackReset = false;
    //     that.$nextTick(() => {
    //       console.log("watch netList", newVal, oldVal);
    //       that.formEleProp.netLists.list = newVal.netList;
    //       if (that.formEleProp.netLists.list.length > 0) {
    //         that.hackReset = true;
    //         that.formEleProp.netLists.list.map(el => {
    //           el.url = that.markerIcon;
    //         });
    //         console.log(
    //           "that.formEleProp.netLists.list",
    //           that.formEleProp.netLists.list
    //         );
    //         that.formEleProp.netLists.list[0].url = that.markerIconS;
    //         console.log("cccccccccccccccccccccc", that.formEleProp.netInfoAll);
    //         that.formEleProp.netInfoAll.netInfo =
    //           that.formEleProp.netLists.list[0];
    //       }
    //     });
    //   },
    //   deep: true
    // }
  },
  methods: {
    showAd(item) {
      console.log("showAd", item);
    },
    gotoNetDetail(val, list) {
      //跳转到详情传值
      console.log("netInfoAll netInfo", val, list);
      this.formEleProp.netInfoAll.netInfo = val;
      this.formEleProp.netLists.list = list;
    },
    ready({ BMap, map }) {
      let that = this;
      let geolocation = new BMap.Geolocation();

      //获取地理位置信息
      /*     if (geolocation) {
        // 开启SDK辅助定位，仅当使用环境为移动web混合开发，且开启了定位sdk辅助定位功能后生效
        geolocation.enableSDKLocation();
        // 开始定位
        this.positioning = true;
        // 倒计时
        this.positioningInterval = setInterval(() => {
          if (this.countDown === 0) {
            this.countDown = 30;
            clearInterval(this.positioningInterval);
          } else {
            this.countDown--;
          }
        }, 1000);
        // 位置选项
        const positionOptions = {
          enableHighAccuracy: true, // 要求浏览器获取最佳结果
          timeout: 30, //    超时时间
          maximumAge: 0 // 允许返回指定时间内的缓存结果。如果此值为0，则浏览器将立即获取新定位结果
        };
        // 获取用户位置信息
        geolocation.getCurrentPosition(position => {
          that.resetPositioning();
          // 获取定位结果状态码
          const statusCode = geolocation.getStatus();
          let msg = "由于未知错误而无法检索设备的位置"; // 提示消息
          let msgType = "error"; // 消息类型
          // 判断结果状态码，为0代表获取成功，读取省市、经纬度
          const myGeo = new BMap.Geocoder();
          switch (statusCode) {
            case 0:
              msgType = "success";
              msg = "获取地理位置定位请求成功";
              myGeo.getLocation(
                new BMap.Point(position.point.lng, position.point.lat),
                data => {
                  if (data.addressComponents) {
                    const result = data.addressComponents;
                    const location = {
                      creditLongitude: position.point.lng, // 经度
                      creditLatitude: position.point.lat, // 纬度
                      creditProvince: result.province || "", // 省
                      creditCity: result.city || "", // 市
                      creditArea: result.district || "", // 区
                      creditStreet:
                        (result.street || "") + (result.streetNumber || "") // 街道
                    };
                    // that.location = location;
                    // that.creditLongitude = location.creditLongitude;
                    // that.creditLatitude = location.creditLatitude;
                    // that.creditCity = location.creditCity;
                    that.center = {
                      lng: location.creditLongitude,
                      lat: location.creditLatitude
                    };
                    that.location = {
                      province: result.province,
                      city: location.creditCity,
                      lng: location.creditLongitude,
                      lat: location.creditLatitude
                    };
                    that.formEleProp.searchVal.pos = result.city;
                    console.log("center", that.location);
                    // that.autoLocationPoint = {
                    //   lng: location.creditLongitude,
                    //   lat: location.creditLatitude
                    // };
                    that.initLocation = true;
                    console.log("center", that.center);
                    that.getnetList(that.location.lng, that.location.lat);
                  }
                }
              );
              // if (position) {
              //   // 数据变量定义
              //   let lat = 0.0; // 经度
              //   let lng = 0.0; // 纬度
              //   let province = "未知"; // 经度
              //   let city = "未知"; // 纬度

              //   // 坐标
              //   if (position.point) {
              //     lat = position.point.lat;
              //     lng = position.point.lng;
              //   }
              //   // 位置
              //   if (position.address) {
              //     province = position.address.province;
              //     city = position.address.city;
              //   }
              //   that.location = {
              //     province: province,
              //     city: city,
              //     lng: lng,
              //     lat: lat
              //   };
              // } else {
              //   msg = "由于未知错误而无法检索设备的位置";
              // }
              break;
            case 2:
              msg = "由于未知错误而无法检索设备的位置";
              break;
            case 4:
            case 5:
              msg = "位置服务请求非法";
              break;
            case 6:
              msg = "应用程序没有使用位置服务的权限";
              break;
            case 7:
              msg = "网络不可用或者无法连接到获取位置信息的卫星";
              break;
            case 8:
              msg = "无法在指定的最大超时间隔内检索位置信息";
              break;
            default:
              msg = "由于未知错误而无法检索设备的位置";
              break;
          }
          // that.$notification[msgType]({
          //   key: NotificationKey,
          //   message: "提示",
          //   description: msg
          // });
          console.log(msg, that.location);
        }, positionOptions);
      } else {
        // that.$notification.error({
        //   key: NotificationKey,
        //   message: "提示",
        //   description: "您的浏览器不支持地理位置服务"
        // });
        console.log("您的浏览器不支持地理位置服务");
      }
      // const geolocation = new BMap.Geolocation();
      //获取当前地理位置信息
      // geolocation.getCurrentPosition(
      //   r => {
      //     console.log("地理信息", r);
      //     that.center = {
      //       lng: r.longitude,
      //       lat: r.latitude
      //     };
      //     that.autoLocationPoint = {
      //       lng: r.longitude,
      //       lat: r.latitude
      //     };
      //     that.initLocation = true;
      //     that.zoom = 16;
      //     console.log("center", that.center);
      //     that.getnetList(r.longitude, r.latitude);
      //   },
      //   { enableHighAccuracy: true }
      // );
      // console.log("子emit父组件方法", BMap, map);
      */
    },
    // 重置定位相关数据
    resetPositioning() {
      this.positioning = false;
      this.location = null;
      this.countDown = 30;
      clearInterval(this.positioningInterval);
    },
    dragendNetLists(el) {
      let that = this;
      //拖拽时获取新的网点列表
      console.log(
        "拖拽时获取新的网点列表 lng:" + el.point.lng + "lat:" + el.point.lat
      );
      that.getnetList(el.point.lng, el.point.lat);
    },
    getnetList(longitude, latitude) {
      //获取网点列表
      let that = this;
      that.formEleProp.netLists.list = [
        {
          netFlag: "1",
          netDcc: "110605900",
          distance: "1179.0",
          netName: "北京东方广场支行营业部",
          Dstn_Len: "361",
          netArea: "北京市东城区东长安街1号东方广场E1座二层",
          longitude: "116.420202",
          latitude: "39.915329",
          Cur_StCd: "0"
        },
        {
          netFlag: "1",
          netDcc: "110608400",
          distance: "1408.0",
          netName: "北京王府井大街支行",
          Dstn_Len: "699",
          netArea: "北京市东城区帅府园胡同13号",
          longitude: "116.418317",
          latitude: "39.918176",
          Cur_StCd: "0"
        },
        {
          netFlag: "1",
          netDcc: "110623600",
          distance: "401.0",
          netName: "北京前门支行营业部",
          Dstn_Len: "714",
          netArea: "北京市东城区西打磨厂1号",
          longitude: "116.418111",
          latitude: "39.905933",
          Cur_StCd: "0"
        },
        {
          netFlag: "1",
          netDcc: "110019500",
          distance: "639.0",
          netName: "北京朝阳北路支行",
          Dstn_Len: "1010",
          netArea: "北京市朝阳区朝阳北路129号院2号楼地上一层06号",
          longitude: "116.410859",
          latitude: "39.911491",
          Cur_StCd: "0"
        },
        {
          netFlag: "1",
          netDcc: "110385600",
          distance: "990.0",
          netName: "北京明光支行营业部",
          Dstn_Len: "1439",
          netArea: "北京市崇文区珠市口东大街5号，光明日报集团大楼一层",
          longitude: "116.420726",
          latitude: "39.899186",
          Cur_StCd: "0"
        },
        {
          netFlag: "1",
          netDcc: "110385500",
          distance: "2094.0",
          netName: "北京王府井支行营业部",
          Dstn_Len: "1442",
          netArea: "北京市东城区王府井大街99号",
          longitude: "116.416962",
          latitude: "39.924715",
          Cur_StCd: "0"
        },
        {
          netFlag: "1",
          netDcc: "110625200",
          distance: "1253.0",
          netName: "北京天坛支行营业部",
          Dstn_Len: "1492",
          netArea: "北京市崇文区崇外大街114号",
          longitude: "116.425794",
          latitude: "39.900049",
          Cur_StCd: "0"
        },
        {
          netFlag: "1",
          netDcc: "110763600",
          distance: "2084.0",
          netName: "北京建国支行营业部",
          Dstn_Len: "1823",
          netArea: "北京市建国门内大街8号中粮广场B座",
          longitude: "116.436285",
          latitude: "39.912655",
          Cur_StCd: "0"
        }
      ];
      if (that.formEleProp.netLists.list.length > 0) {
        // that.hackReset = true;
        that.formEleProp.netLists.list.map(el => {
          el.url = that.markerIcon;
        });
        console.log(
          "that.formEleProp.netLists.list",
          that.formEleProp.netLists.list
        );
        that.formEleProp.netLists.list[0].url = that.markerIconS;
        console.log("cccccccccccccccccccccc", that.formEleProp.netInfoAll);
        that.formEleProp.netInfoAll.netInfo = that.formEleProp.netLists.list[0];
      }
      console.log("MH3008:", longitude, "_____", latitude);

      // let params = {
      //   TXCODE: "MH3008",
      //   DataDic: 1,
      //   userid: 1,
      //   longitude: longitude,
      //   latitude: latitude,
      //   radius: 5000,
      //   curStCd: 4
      // };
      // that.getNetListAsync(params);
      // console.log("retData1", that.netList);
      // console.log("retData2", that.$store.state.netList);
    },
    getNetDetail() {
      //网点详情页信息
      let that = this;
      console.log("网点详情页信息11111111111111", that.formEleProp);
      that.formEleProp.netInfoAll.netDetailInfo = {
        queueInfo: {
          companyState: "",
          personState: "",
          vipQueueCount: "--",
          vipState: "",
          pubWrkQueueCount: "--",
          prvtWrkQueueCount: "--"
        },
        levelInfo: { vipLevel: "", vipFlag: "0" },
        workInfo: {
          corp_am: "08:00-11:35",
          prvt_rst_stTm: "11:35",
          net_name: "",
          prvt_oprg_stTm: "08:00",
          prvt_rst_edTm: "14:20",
          type: "1",
          net_id: "",
          prvt_oprg_edTm: "18:40",
          corp_pm: "14:20-18:40",
          prvt: "08:00-11:35 14:20-18:40",
          month: "10",
          year: "2020",
          day: "24"
        },
        contractInfo: {
          netPhone: "86-020-83847279",
          holidayTimeForPerson: "08:00-18:40",
          saturdayTime: "08:00:00-18:40:00",
          sundayTime: "08:00:00-11:35:00,14:20:00-18:40:00",
          afternoonWorkTimeForCompnay: "14:20:00-18:40:00",
          morningWorkTimeForCompnay: "08:00:00-11:35:00",
          Oprg_Tm_Remark: null,
          netAddress: "123456",
          netLongitude: "113.271885000593",
          netType: "1",
          netName: "广州仓边路支行",
          netLatitude: "23.1299340006545",
          workTimeForPreson: "08:00:00-11:35:00,14:20:00-18:40:00"
        }
      };
      that.formEleProp.netInfoAll.netOther.show1 = true;
      console.log("网点详情页信息222222222222222222222222222");
    },
    gotoNetCalendar() {
      this.$router.push({
        name: "netCalendar"
      });
    },
    getraceLamp() {
      //获取跑马灯数据
      let that = this;
      let data = [
        {
          msg_id: "11111120200213120060",
          msg_desc:
            "疫情防控时期，网点营业时间可能根据本地政府、监管要求临时调整，给您带来不便敬请谅解。",
          msg_url: ""
        },
        {
          msg_id: "11111120200213120061",
          msg_desc:
            "疫情防控时期，网点营业时间可能根据本地政府、监管要求临时调整，给您带来不便敬请谅解1。",
          msg_url: ""
        }
      ];
      that.formEleProp.raceLamp.raceLampList = [];
      for (let item of data) {
        that.formEleProp.raceLamp.raceLampList.push(item.msg_desc);
      }
      console.log(
        "that.formEleProp.raceLamp.raceLampList",
        that.formEleProp.raceLamp.raceLampList
      );
    },

    setFocus() {
      this.$children[0].$refs.search.setFocus();
    },
    onResultClick(item) {
      window.alert("you click the result item: " + JSON.stringify(item));
    },
    onChange(val) {
      console.log("on-change", val);
      this.results = val ? getResult(this.value) : [];
    },
    onSubmit() {
      this.$children[0].$refs.search.setBlur();
      this.$vux.toast.show({
        type: "text",
        position: "top",
        text: "on submit"
      });
    },
    onFocus() {
      // this.formEleProp.searchVal.customClass = true;
    },
    onCancel() {
      let that = this;
      console.log("on cancel");
    },
    onBlur() {
      console.log("on blur");
    },
    onClear() {
      console.log("on clear");
    },
    onScrollBottom() {
      let that = this;
      if (this.onFetching) {
        // do nothing
      } else {
        this.onFetching = true;
        setTimeout(() => {
          this.formEleProp.netLists.prodLists = [
            ...this.formEleProp.netLists.prodLists,
            ...this.testData
          ];
          console.log("ref setTimeout", this.$children);
          let $ref = null;
          for (let ref of this.$children) {
            if (ref.$refs[this.formEleProp.netLists.scrollerBottomRef]) {
              $ref = ref.$refs.scrollerRef;
              break;
            }
          }
          this.$nextTick(() => {
            $ref.reset();
          });
          this.onFetching = false;
        }, 2000);
      }
    },
    showDetail(item) {
      console.log("item", item);
      this.$router.push({
        name: "productDetail"
      });
      this.$store.commit("updateProductDetail", {
        obj: item
      });
    },
    onInputBlur(val, $event) {
      console.log("blur", val, $event);
    },
    onInputFocus(val, $event) {
      console.log("focus", val, $event);
    },
    onInputEnter(val, $event) {
      console.log("enter", val, $event);
    },
    onInputChange(val) {
      console.log("change", val);
      // this.formEle.ccbInput = val;
      console.log("change", this.formEle.ccbInput);
    },
    inputClickErrIcon(error) {
      console.log("errIcon", error);
    },
    inputClickClearIcon() {
      console.log("clearIcon");
    },
    getName(value) {
      return value2name(value, ChinaAddressV4Data);
    },
    onClick(i) {
      console.log(i);
    },
    ...mapActions(["getNetListAsync"])
  },
  components: {
    "ccb-search": () => import("@/components/packages/search/Index.vue"),
    "ccb-net-list": () => import("@/components/packages/netQuery/Index.vue"),
    "ccb-net-list-map": () =>
      import("@/components/packages/netQuery/netListMap.vue"),
    "ccb-raceLamp": () => import("@/components/packages/raceLamp/Index.vue"),
    "ccb-input": () => import("@/components/packages/genericForm/CcbInput.vue"),
    "ccb-textarea": () =>
      import("@/components/packages/genericForm/CcbTextarea.vue"),
    "ccb-address": () =>
      import("@/components/packages/genericForm/CcbAddress.vue"),
    "ccb-net-detail": () =>
      import("@/components/packages/netQuery/netDetail.vue"),
    XButton,
    Marquee,
    Swiper,
    SwiperItem,
    MarqueeItem
  },
  destroyed() {}
};
</script>
<style lang="less" scoped>
.align-middle {
  text-align: left;
}
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.text-scroll p {
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
</style>

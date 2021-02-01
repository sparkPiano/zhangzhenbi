<template>
  <div style="overflow: hidden;">
    <!-- 搜索 -->
    <ccb-search
      :formEleProp="formEleProp.searchVal"
      :formEle="formEle"
      :btnObj="btnObj"
    >
    </ccb-search>
    <!-- 广播 -->
    <ccb-raceLamp
      v-if="net_notice_switch == 'false'"
      :formEleProp="formEleProp.raceLamp"
    ></ccb-raceLamp>
    <!-- 网点列表 -->
    <ccb-net-list
      @newRiLiData="newRiLiData"
      @handleListData="handleListData"
      @getNetDetail="getNetDetail"
      @gotoNetCalendar="gotoNetCalendar"
      v-show="showType == '2'"
      :formEleProp="formEleProp.netLists"
      style="height: 100%;
    overflow: scroll;"
    ></ccb-net-list>
    <!-- 网点地图 -->
    <ccb-net-list-map
      style="overflow: hidden;"
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
    <!-- 网点详情 -->
    <ccb-net-detail
      v-show="netDetailCom"
      @getNetDetail="getNetDetail"
      @gotoNetCalendar="gotoNetCalendar"
      :formEleProp="formEleProp.netInfoAll"
    ></ccb-net-detail>
    <!-- 地图、列表图标 -->
    <ccb-location-list v-if="true" ref="handleLocationList">
    </ccb-location-list>
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
import { mixin } from "@/mixins/mixin";

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
  mixins: [mixin],
  data() {
    return {
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
          pos: "北京市",
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
      // 默认北京天安门经纬度
      center: {
        lng: 116.397469,
        lat: 39.908821
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
  mounted() {
    console.log("AAAAAAAAAAAAAAAAAAAAA");
    let that = this;
    this.$store.commit("updateShowType", { value: "1" });
    this.$store.commit("updateNetDetailCom", { value: true });
  },
  updated() {},
  computed: {
    ...mapState({
      showType: state => state.netPage.showType,
      netList: state => state.netList,
      netDetailCom: state => state.netPage.netDetailCom,
      showLocationList: state => state.netPage.showLocationList,
      wParam: state => state.userInfo.wParam,
      net_notice_switch: state => state.netPage.net_notice_switch
    }),
    ...mapGetters({
      getXurrNetList: "getNetList",
      getXurrRaceLamp: "getRaceLampLight",
      getXurrNetDetail: "getNetDetail3004"
    })
  },
  watch: {
    getXurrNetDetail() {
      let that = this;
      console.log("getXurrNetDetail", this.getXurrNetDetail);
      that.$nextTick(() => {
        that.formEleProp.netInfoAll.netDetailInfo = that.getXurrNetDetail;
      });
    },
    getXurrNetList() {
      console.log("getXurrNetList", this.getXurrNetList);
      let that = this;
      that.hackReset = false;
      that.$nextTick(() => {
        that.formEleProp.netLists.list = this.getXurrNetList.netList;
        that.$general.setCache(
          "cacheNetDataList",
          JSON.stringify(this.getXurrNetList.netList)
        );
        if (
          that.formEleProp.netLists.list &&
          that.formEleProp.netLists.list.length > 0
        ) {
          that.$store.commit("updateLocaListState", { value: true });
          that.hackReset = true;
          that.formEleProp.netLists.list.map(el => {
            el.url = that.markerIcon;
          });
          console.log(
            "that.formEleProp.netLists.list",
            that.formEleProp.netLists.list
          );
          that.formEleProp.netLists.list[0].url = that.markerIconS;
          console.log("cccccccccccccccccccccc", that.formEleProp.netInfoAll);
          that.formEleProp.netInfoAll.netInfo =
            that.formEleProp.netLists.list[0];
        }
      });
    },
    getXurrRaceLamp() {
      let that = this;
      console.log("this.getXurrRaceLamp", this.getXurrRaceLamp);
      if (that.getXurrRaceLamp && that.getXurrRaceLamp.length > 0) {
        for (let item of that.getXurrRaceLamp) {
          that.formEleProp.raceLamp.raceLampList.push(item.msg_desc);
        }
      }
    }
  },
  methods: {
    newRiLiData(res) {
      console.log("从列表页传来的日历数据", res);
      this.lastListData = res;
    },
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
      console.log("geolocation", geolocation);
      //获取地理位置信息
      if (geolocation) {
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
          console.log("getCurrentPosition position", position);
          that.resetPositioning();
          // 获取定位结果状态码
          const statusCode = geolocation.getStatus();
          console.log("statusCode", statusCode);
          let msg = "由于未知错误而无法检索设备的位置"; // 提示消息
          // 判断结果状态码，为0代表获取成功，读取省市、经纬度
          switch (statusCode) {
            case 0:
              msg = "获取地理位置定位请求成功";
              if (position) {
                console.log("switch position", position);
                console.log("switch accuracy", position.accuracy);
                if (position.accuracy != null) {
                  //accuracy 用户点击同意授权位置accuracy不为空\
                  that.center = {
                    lng: position.point.lng,
                    lat: position.point.lat
                  };
                  that.location = {
                    province: position.address.province,
                    city: position.address.city
                  };
                  that.formEleProp.searchVal.pos = position.address.city;
                  that.initLocation = true;
                  console.log("center", that.center);
                  console.log("location", that.location);
                  that.getnetList(that.center.lng, that.center.lat);
                } else {
                  //accuracy 用户点击不同意授权位置accuracy为空 默认北京天安门经纬度处理
                  console.log("北京逻辑处理");
                  that.getnetList(that.center.lng, that.center.lat);
                }
              } else {
                msg = "由于未知错误而无法检索设备的位置";
              }
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
          if (statusCode == "0") return;
          that.$vux.toast.text(msg, "Middle");
          console.log(
            "浏览器statusCode状态码为:",
            statusCode,
            "提示信息为:",
            msg
          );
        }, positionOptions);
      } else {
        that.$vux.toast.text("您的浏览器不支持地理位置服务", "Middle");
      }
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
      console.log("MH3041:", longitude, "_____", latitude);
      let params = {
        TXCODE: "MH3041",
        DataDic: 1,
        userid: 1,
        longitude: longitude,
        latitude: latitude,
        radius: 5000,
        curStCd: 4
      };
      that.$store.dispatch("getNetListAsync", params);
    },
    handleListData(item) {
      console.log("父调子传值", item);
      this.formEleProp.netInfoAll.netInfo = item;
    },
    getNetDetail(branchId) {
      //网点详情页信息
      let that = this;
      let domCcbNetDetail = document.getElementsByClassName("ccb-net-detail");
      domCcbNetDetail[0].style.display = "block";
      console.log("parent getNetDetail", that.formEleProp);
      that.formEleProp.netInfoAll.netOther.show1 = true;
      that.$store.dispatch("requireMH3004", branchId);

      // that.formEleProp.netInfoAll.netDetailInfo = {
      //   queueInfo: {
      //     companyState: "",
      //     personState: "",
      //     vipQueueCount: "--",
      //     vipState: "",
      //     pubWrkQueueCount: "--",
      //     prvtWrkQueueCount: "--"
      //   },
      //   levelInfo: { vipLevel: "", vipFlag: "0" },
      //   workInfo: {
      //     corp_am: "08:00-11:35",
      //     prvt_rst_stTm: "11:35",
      //     net_name: "",
      //     prvt_oprg_stTm: "08:00",
      //     prvt_rst_edTm: "14:20",
      //     type: "1",
      //     net_id: "",
      //     prvt_oprg_edTm: "18:40",
      //     corp_pm: "14:20-18:40",
      //     prvt: "08:00-11:35 14:20-18:40",
      //     month: "10",
      //     year: "2020",
      //     day: "24"
      //   },
      //   contractInfo: {
      //     netPhone: "86-020-83847279",
      //     holidayTimeForPerson: "08:00-18:40",
      //     saturdayTime: "08:00:00-18:40:00",
      //     sundayTime: "08:00:00-11:35:00,14:20:00-18:40:00",
      //     afternoonWorkTimeForCompnay: "14:20:00-18:40:00",
      //     morningWorkTimeForCompnay: "08:00:00-11:35:00",
      //     Oprg_Tm_Remark: null,
      //     netAddress: "123456",
      //     netLongitude: "113.271885000593",
      //     netType: "1",
      //     netName: "广州仓边路支行",
      //     netLatitude: "23.1299340006545",
      //     workTimeForPreson: "08:00:00-11:35:00,14:20:00-18:40:00"
      //   }
      // };
    },
    gotoNetCalendar(res) {
      let that = this;
      if (this.showType == "2") {
        this.$router.push({
          name: "netCalendar",
          params: {
            detail: that.lastListData
          }
        });
        return;
      }
      this.$router.push({
        name: "netCalendar",
        params: {
          detail: res
        }
      });
    },
    getraceLamp() {
      //获取跑马灯数据
      let that = this;
      that.$store.commit("dealRaceLampPrams", {
        wParam: decodeURIComponent(that.wParam),
        paramID1: "mh_common",
        paramKey1: "hsh_request_mobile_uri_led",
        paramType1: "1",
        paramID2: "mh_common",
        paramKey2: "net_notice_switch",
        paramType2: "1"
      });
      that.$store.dispatch("reqiureRaceLamp");
    },

    setFocus() {
      this.$children[0].$refs.search.setFocus();
    },
    onResultClick(item) {
      window.alert("you click the result item: " + JSON.stringify(item));
    },
    onChange(val) {
      console.log("on-change", val);
      let that = this;
      let _search = this.formEle.searchVal;
      let new_search_list = JSON.parse(
        this.$general.getCache("cacheNetDataList")
      );
      that.formEleProp.netLists.list = new_search_list;
      if (_search) {
        //不区分大小写处理
        var reg = new RegExp(_search, "ig");
        //es6 filter过滤匹配，有则返回当前，无则返回所有
        that.formEleProp.netLists.list = new_search_list.filter(function(e) {
          //匹配所有字段
          return Object.keys(e).some(function(key) {
            return e[key].match(reg);
          });
          //匹配某个字段
          //  return e.name.match(reg);
        });
        console.log("new_search_list", new_search_list);
      }
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
      console.log("搜索聚焦方法");
      this.$refs.handleLocationList.listIcon1();
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
    }
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
    "ccb-location-list": () =>
      import("@/components/packages/netQuery/ccbLocationList.vue"),
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

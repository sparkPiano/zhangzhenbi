<template>
  <div class="ccb-net-detail">
    <div class="panel-bottom" v-if="formEleProp.netInfo.Dstn_Len">
      <div class="marg15">
        <div class="panel-bottom-icon" @click="showPopup">
          <i class="iconfont icon-xiangshang"></i>
        </div>
        <div class="panel-bottom-name" @click="showPopup">
          {{ formEleProp.netInfo.netName }}
          <img
            @click="daohang"
            style="width: 18px; margin-left: 20px"
            src="@/assets/images/main_icon_worker_harbor_list_goto.png"
            alt=""
          />
        </div>
        <div class="panel-bottom-addr" @click="showPopup">
          <span v-if="formEleProp.netInfo.netArea">{{
            formEleProp.netInfo.netArea
          }}</span>
          <span v-if="formEleProp.netInfo.Dstn_Len">{{
            dealDistance(formEleProp.netInfo.Dstn_Len)
          }}</span>
        </div>
      </div>
    </div>
    <div
      v-if="formEleProp.netDetailInfo && formEleProp.netDetailInfo.contractInfo"
    >
      <popup
        v-model="formEleProp.netOther.show1"
        is-transparent
        :position="formEleProp.netOther.popupPosition"
        width="100%"
        @on-hide="handlePopupT"
      >
        <div class="popup">
          <ccb-generic-form>
            <template slot="content">
              <div class="panel-icon-center panel-bag" @click="hidePopup">
                <i class="iconfont  icon-xiangxia"></i>
              </div>
              <ccb-cell class="border-bottom">
                <template slot="cellTitle">
                  <div class="cellTitle-div">
                    <span class="title">{{ formEleProp.netInfo.netName }}</span>
                    <img
                      @click="daohang"
                      style="width: 16px;"
                      src="@/assets/images/main_icon_worker_harbor_list_goto.png"
                      alt=""
                    />
                  </div>
                  <div class="net-info cellTitle-div">
                    <span>
                      <i class="iconfont icon-dianhua"></i>
                    </span>
                    <span class="title1 mar10 colfon">{{
                      formEleProp.netDetailInfo.contractInfo.netPhone
                    }}</span>
                  </div>
                  <div class="net-info cellTitle-div">
                    <span>
                      <i class="iconfont icon-dingwei1"></i>
                    </span>
                    <span class="title1 mar10 colfon">{{
                      formEleProp.netInfo.netArea
                    }}</span>
                  </div>
                </template>
              </ccb-cell>
              <div class="netInfo border-bottom">
                <flexbox>
                  <flexbox-item :span="9"
                    ><div class="flex-left x-sold-title_first">
                      今日营业情况<span>{{
                        `(${formEleProp.netDetailInfo.workInfo.year}/${Number(
                          formEleProp.netDetailInfo.workInfo.month
                        ) + 1}/${formEleProp.netDetailInfo.workInfo.day})`
                      }}</span>
                    </div></flexbox-item
                  >
                  <flexbox-item
                    ><div class="flex-right">
                      {{
                        formEleProp.netDetailInfo.workInfo.prvt == "00:00-00:00"
                          ? "休息"
                          : "营业"
                      }}
                    </div></flexbox-item
                  >
                </flexbox>
                <flexbox>
                  <flexbox-item
                    ><div class="flex-left">对私营业时间</div></flexbox-item
                  >
                  <flexbox-item
                    ><div class="flex-right">
                      {{ worktime_for_person }}
                    </div></flexbox-item
                  >
                </flexbox>
                <flexbox>
                  <flexbox-item
                    ><div class="flex-left">对公营业时间</div></flexbox-item
                  >
                  <flexbox-item
                    ><div class="flex-right">
                      {{ only_crop }}
                    </div></flexbox-item
                  >
                </flexbox>
                <flexbox>
                  <flexbox-item
                    ><div class="flex-left">当前排队人数</div></flexbox-item
                  >
                  <flexbox-item
                    ><div
                      class="flex-right"
                      style="display: flex;align-items: center;margin-left: 35px;"
                      v-if="false"
                    >
                      更新时间：<span>09:30</span>
                      <img
                        style="margin-left: 20px;width:17px;height:17px;"
                        class="iconfont icon-shuaxin"
                        :class="{ refreshRe: isRotate }"
                        @click="refresh"
                        src="@/assets/images/refresh.png"
                        alt=""
                      /></div
                  ></flexbox-item>
                </flexbox>
                <flexbox>
                  <flexbox-item><div class="flex-left">VIP</div></flexbox-item>
                  <flexbox-item
                    ><div class="flex-center">
                      <span>{{
                        formEleProp.netDetailInfo.queueInfo.vipQueueCount
                      }}</span>
                    </div></flexbox-item
                  >
                  <flexbox-item
                    ><div class="flex-right">
                      <span class="dot"></span>
                      {{
                        formEleProp.netDetailInfo.queueInfo.vipState == "0" ||
                        formEleProp.netDetailInfo.queueInfo.vipState == ""
                          ? "空闲"
                          : formEleProp.netDetailInfo.queueInfo.vipState == "1"
                          ? "顺畅"
                          : formEleProp.netDetailInfo.queueInfo.vipState == "2"
                          ? "繁忙"
                          : ""
                      }}
                    </div></flexbox-item
                  >
                </flexbox>
                <flexbox>
                  <flexbox-item><div class="flex-left">个人</div></flexbox-item>
                  <flexbox-item
                    ><div class="flex-center">
                      {{
                        formEleProp.netDetailInfo.queueInfo.prvtWrkQueueCount
                      }}
                    </div></flexbox-item
                  >
                  <flexbox-item
                    ><div class="flex-right">
                      <span class="dot"></span>
                      {{
                        formEleProp.netDetailInfo.queueInfo.personState ==
                          "0" ||
                        formEleProp.netDetailInfo.queueInfo.personState == ""
                          ? "空闲"
                          : formEleProp.netDetailInfo.queueInfo.personState ==
                            "1"
                          ? "顺畅"
                          : formEleProp.netDetailInfo.queueInfo.personState ==
                            "2"
                          ? "繁忙"
                          : ""
                      }}
                    </div></flexbox-item
                  >
                </flexbox>
                <flexbox>
                  <flexbox-item><div class="flex-left">对公</div></flexbox-item>
                  <flexbox-item
                    ><div class="flex-center">
                      {{ formEleProp.netDetailInfo.queueInfo.pubWrkQueueCount }}
                    </div></flexbox-item
                  >
                  <flexbox-item
                    ><div class="flex-right">
                      <span class="dot"></span>
                      {{
                        formEleProp.netDetailInfo.queueInfo.companyState ==
                          "0" ||
                        formEleProp.netDetailInfo.queueInfo.companyState == ""
                          ? "空闲"
                          : formEleProp.netDetailInfo.queueInfo.companyState ==
                            "1"
                          ? "顺畅"
                          : formEleProp.netDetailInfo.queueInfo.companyState ==
                            "2"
                          ? "繁忙"
                          : ""
                      }}
                    </div></flexbox-item
                  >
                </flexbox>
              </div>
              <div class="netInfo">
                <flexbox class="border-bottom-none">
                  <flexbox-item :span="9"
                    ><div class="flex-left x-sold-title_first">
                      查看网点日历
                    </div></flexbox-item
                  >
                  <flexbox-item
                    ><div class="flex-right">
                      <img
                        @click="gotoCalendar"
                        style="width: 18px;margin-left: 20px;"
                        :src="formEleProp.netImg.calendarImg"
                        alt=""
                      /></div
                  ></flexbox-item>
                </flexbox>
              </div>

              <ccb-tips :header="header">
                <template slot="xContent">
                  <div class="ccb-tips_content">
                    <ul>
                      <li>
                        当前排队人数仅供参考，具体等候人数以实际情况为准。
                      </li>
                    </ul>
                  </div>
                </template>
              </ccb-tips>
            </template>
          </ccb-generic-form>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import {
  Cell,
  Flexbox,
  FlexboxItem,
  XButton,
  Panel,
  Popup,
  TransferDom
} from "vux";
import CcbCell from "../genericForm/CcbCell.vue";
export default {
  name: "ccb-net-detail",
  data() {
    return {
      header: {
        title: "温馨提示"
      },
      currDate: "",
      worktime_for_state: "",
      worktime_for_person: "",
      only_crop: "",
      isRotate: false
    };
  },
  props: {
    formEleProp: {
      type: Object,
      default: () => ({})
    },
    formEle: {
      type: Object,
      default: () => ({})
    },
    btnObj: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    console.log(
      "formEleProp.netImg.calendarImg",
      this.formEleProp.netImg.calendarImg
    );
  },
  computed: {
    ...mapState({
      showType: state => state.netPage.showType
    }),
    ...mapGetters({
      getXurrriliList: "getriliList"
    })
  },
  watch: {
    getXurrriliList() {
      console.log("日历数据", this.getXurrriliList);
      // console.log("ddddddddzz", that.calendarInfo);
    }
  },
  mounted() {
    let that = this;
    this.timer = setInterval(this.getSetInterval, 1000);
  },
  // beforeDestroy() {
  //   clearInterval(this.timer);
  // },
  methods: {
    handlePopupT() {
      if (this.showType == "2") {
        let domCcbNetDetail = document.getElementsByClassName("ccb-net-detail");
        domCcbNetDetail[0].style.display = "none";
      }
      console.log("DDDDDDDDDDDDDdddd");
    },
    refresh() {
      console.log("refresh");
      this.isRotate = true;
      // 监听数据加载 如果加载完成就不让其旋转
      // this.$bus.$on("refreshOff", this.off);
      // // 发出消息更新页面
      // // 另外一边通过事件总线发出对应的消息
      // this.$emit("refreshPage");
      let that = this;
      setTimeout(() => {
        that.isRotate = false;
      }, 1200);
    },
    dealDistance(Dstn_Len) {
      if (Dstn_Len < 1000) {
        return Dstn_Len + "m";
      } else {
        return (Dstn_Len / 1000).toFixed(1) + "km";
      }
    },
    gotoCalendar() {
      //网点日历、
      console.log("gotoCalendar");
      this.$emit("gotoNetCalendar", this.getXurrriliList);
    },
    getSetInterval() {
      let that = this;
      let workInfo = that.formEleProp.netDetailInfo.workInfo
        ? that.formEleProp.netDetailInfo.workInfo
        : null;
      if (workInfo) {
        that.setWorkDisplay(workInfo);
        clearInterval(that.timer);
      }
    },
    showPopup() {
      // this.formEleProp.netOther.show1 = true;
      //获取网点详情信息
      this.$emit("getNetDetail", this.formEleProp.netInfo.netDcc);
      let that = this;
      let info = that.formEleProp;
      console.log("netDetailPage-that.formEleProp", that.formEleProp);

      // let workInfo = info.netDetailInfo.workInfo
      //   ? info.netDetailInfo.workInfo
      //   : null;
      // if (workInfo) {
      //   that.setWorkDisplay(workInfo);
      // }
      let contractInfo = that.formEleProp.netDetailInfo.contractInfo
        ? that.formEleProp.netDetailInfo.contractInfo
        : {};
      this.$store.dispatch("requireZZB012", this.formEleProp.netInfo);
    },
    hidePopup() {
      console.log("closeDetail____________dfgfhfgfedsfghjggfghgfds");
      if (this.showType == "2") {
        let domCcbNetDetail = document.getElementsByClassName("ccb-net-detail");
        domCcbNetDetail[0].style.display = "none";
      }
      this.formEleProp.netOther.show1 = false;
    },
    daohang() {
      console.log("daohang", this.formEleProp.netInfo);
      let openLtt = (
        Number(this.formEleProp.netInfo.latitude) + 0.006
      ).toString();
      let openLgt = (
        Number(this.formEleProp.netInfo.longitude) + 0.0065
      ).toString();
      window.location.href = `http://api.map.baidu.com/marker?location=${openLtt},${openLgt}&title=${this.formEleProp.netInfo.netArea}&output=html`;
    },
    isTimeAvalibel(timeStr) {
      var regTime = new RegExp("^\\d{2}:\\d{2}$");
      if (timeStr) {
        return timeStr != "00:00" && regTime.exec(timeStr);
      }
      return false;
    },
    setWorkDisplay(info) {
      console.log("info", info);
      // this.currDate = `(${info.year}/${info.month}/${info.day})`;
      // this.worktime_for_state = this.isRestState(info) ? "休息" : "营业";
      //20200731 优化对私营业时间显示
      this.worktime_for_person = this.getPrivateTime(info);
      //如果对私休息，则对公也休息。如果对私营业。判断对公是否休息。
      if (this.isRestPrvt(info)) {
        this.only_crop = "休息";
      } else {
        this.only_crop = this.getPublicTime(info);
      }
    },
    /*
     * 完全休息 贴上休字图片
     */
    isRestState(info) {
      if (this.isRestPrvt(info)) {
        return true;
      } else {
        return false;
      }
    },
    getPublicTime(info) {
      //处理对公营业时间
      if (info) {
        if (this.isRestCropAm(info)) {
          //上午休息
          if (this.isRestCropPm(info)) {
            //下午休息
            return "休息";
          } else {
            //下午营业
            return "休息、" + info.corp_pm;
          }
        } else {
          //上午营业
          if (this.isRestCropPm(info)) {
            //下午休息
            return info.corp_am + "、休息";
          } else {
            //下午营业
            return info.corp_am + "、" + info.corp_pm;
          }
        }
        // $("#only_crop_pm").text(isRestCropPm(info) ? "休息" : info.corp_pm);
        // $("#only_crop_am").text(isRestCropAm(info) ? "休息" : info.corp_am+"、");
      }
      return "休息";
    },
    getPrivateTime(info) {
      //处理对私营业时间
      if (info) {
        //对私营业开始时间 和 结束时间有效
        if (
          this.isTimeAvalibel(info.prvt_oprg_stTm) &&
          this.isTimeAvalibel(info.prvt_oprg_edTm)
        ) {
          //对私休息开始时间 和 结束时间有效
          if (
            this.isTimeAvalibel(info.prvt_rst_stTm) &&
            this.isTimeAvalibel(info.prvt_rst_edTm)
          ) {
            //休息时间在营业时间范围内
            if (
              info.prvt_oprg_stTm.replace(":", "") <=
                info.prvt_rst_stTm.replace(":", "") &&
              info.prvt_rst_edTm.replace(":", "") <=
                info.prvt_oprg_edTm.replace(":", "")
            ) {
              return (
                info.prvt_oprg_stTm +
                "-" +
                info.prvt_rst_stTm +
                "、" +
                info.prvt_rst_edTm +
                "-" +
                info.prvt_oprg_edTm
              );
            } else {
              return info.prvt_oprg_stTm + "-" + info.prvt_oprg_edTm;
            }
          } else {
            return info.prvt_oprg_stTm + "-" + info.prvt_oprg_edTm;
          }
        }
      }
      return "休息";
    },
    /*
     *	对私是否休息状态
     */
    isRestPrvt(info) {
      if (info.prvt == "00:00-00:00") {
        return true;
      } else {
        return false;
      }
    },
    /*
     *	对公上午是否休息状态
     */
    isRestCropAm(info) {
      if (info.corp_am == "00:00-00:00") {
        return true;
      } else {
        return false;
      }
    },
    /*
     *	对公下午是否休息状态
     */
    isRestCropPm(info) {
      if (info.corp_pm == "00:00-00:00") {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    Cell,
    Flexbox,
    FlexboxItem,
    XButton,
    Panel,
    Popup,
    TransferDom,
    "ccb-cell": () => import("@/components/packages/genericForm/CcbCell.vue"),
    "ccb-generic-form": () =>
      import("@/components/packages/genericForm/Index.vue"),
    "ccb-tips": () => import("@/components/packages/tips/Index.vue"),
    CcbCell
  }
};
</script>

<style lang="less" scope>
@import "~vux/src/styles/1px.less";
* {
  touch-action: pan-y;
}

.weui-cell:before {
  border-top: none !important;
}
#app .router-view {
  background-color: #ffffff !important;
}
#app .weui-tab__panel {
  background-color: #f0f0f0 !important;
  .weui-cell:before {
    border-top: 0 !important;
    // border-bottom: 0.2rem solid #f0f0f0 !important;
    left: 0 !important;
  }
}
#app .weui-panel {
  background-color: #f0f0f0 !important;
  .weui-panel__hd:after {
    border-bottom: none !important;
  }
}
.weui-cells:after {
  border-bottom: none !important;
}
.ccb-net-detail {
  .netInfo {
    padding: 10px 15px;
    background: #ffffff;
    font-size: 12px;
    .flex-left {
      text-align: left;
    }
    .flex-center {
      text-align: center;
    }
    .flex-right {
      text-align: right;
    }
    .vux-flex-row {
      line-height: 30px;
    }
  }
  .x-sold-title_first {
    font-size: 15px;
    color: #252424;
    padding: 4px 0 !important;
    span {
      font-size: 13px;
      font-weight: normal;
    }
  }
  .dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: rgb(59, 207, 116);
    border-radius: 50%;
  }
  .border-bottom {
    border-bottom: 10px solid #f0f0f0;
  }
  .border-bottom-none {
    border-bottom: none !important;
  }

  .title {
    // color: rgb(57, 102, 174);
    font-weight: 800;
    position: relative;
    padding: 12px 20px 12px 0;
  }
  .title1 {
    position: relative;
    padding: 12px 20px 12px 0;
  }

  .x-sold-title_second {
    color: #5a5c5e93;
  }

  .ccb-tips_content {
    ul {
      list-style: none;
    }
  }
  .panel-icon-center {
    text-align: center;
  }
  .panel-bag {
    background: #ffffff;
  }

  .panel-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ffffff;
    width: 100%;
    min-height: 90px;
    z-index: 9999;
  }
  .marg15 {
    margin: 0 15px;
  }
  .panel-bottom-icon {
    text-align: center;
  }
  .panel-bottom-name {
    font-size: 15px;
    font-weight: 500;
  }
  .panel-bottom-name {
    font-size: 15px;
    font-weight: 500;
    color: #473636;
  }
  .panel-bottom-addr {
    display: flex;
    justify-content: space-between;
  }
  .panel-bottom-addr span:nth-child(1) {
    width: 85%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .vux-popup-dialog {
    z-index: 10000 !important;
  }
}
.cellTitle-div {
  display: flex;
  align-items: center;
  height: 24px;
}
.mar10 {
  margin-left: 10px;
}
.colfon {
  font-size: 12px;
}
.refreshRe {
  -webkit-animation: rotate 1.2s linear infinite; /*Safari and Chrome*/
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg); /* IE 9 */
    -moz-transform: rotate(0deg); /* Firefox */
    -o-transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg); /* IE 9 */
    -moz-transform: rotate(360deg); /* Firefox */
    -o-transform: rotate(360deg);
  }
}

@-webkit-keyframes rotate {
  0% {
    -moz-transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
  }
}
</style>

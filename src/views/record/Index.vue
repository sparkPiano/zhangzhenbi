<!--
 * @Description: test
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-07-22 09:25:47
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-12-04 17:00:31
 * @FilePath: \ccbProject\ccb_5g\src\views\test\Index.vue
-->

<template>
  <div class="record" style="height: 100%;padding: 0;position: fixed;">
    <!-- 顶部Tab选项 -->
    <tab
      :line-width="2"
      active-color="#000"
      bar-active-color="#2E66AE"
      default-color="#9DB1C1"
      @on-item-click="onIndexChange"
    >
      <tab-item
        :selected="demo3 === item"
        v-for="(item, index) in list3"
        :class="{ 'vux-1px-r': index === 0 }"
        @click="demo3 = item"
        :key="index"
        @on-item-click="onIndexChange(index)"
        >{{ item }}</tab-item
      >
    </tab>
    <!-- 中间滚动列表 -->
    <scroller
      lock-x
      :height="height"
      @on-scroll-bottom="onScrollBottom"
      ref="scrollerBottom"
      :scrollbar-y="scrollbarY"
    >
      <!-- 预约记录列表 -->
      <div class="box2">
        <ccb-cell
          slot="header"
          :formEleProp="formEleProp.searchVal"
          :formEle="formEle"
          :btnObj="demo3 == list3[0] ? btnObj : {}"
        >
        </ccb-cell>
        <!-- <p v-for="i in bottomCount" :key="i">placeholder {{ i }}</p> -->
      </div>
      <!-- 提示文字 -->
      <div
        style="margin-top: 2.4em;text-align: center;color: #999999;"
        v-if="!showTips"
      >
        {{ loading }}
      </div>

      <!-- <load-more
        background-color="#ffffff"
        :tip="loading"
        :show-loading="showLoading"
      ></load-more> -->
    </scroller>
    <!-- 页尾温馨提示 -->
    <!-- v-if="showTips" -->
    <div
      style="padding:15px;background-color: #ffffff;position: absolute;bottom: 40px;"
      id="noticeD"
      v-if="showTips"
    >
      <div class="notice_h1">温馨提示：</div>
      <div class="notice_p" id="notice_content">
        <div>
          如您之前使用他人账号进行付款，还可通过验证支付账号或他人手机银行进行查询。
          <div class="hideWord" @click="toRecordQuery()">
            点击这里，立即查询
          </div>
          。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixins/mixin";
import { mapActions, mapState } from "vuex";
import Vue from "vue";
import { Base64 } from "js-base64";
import { AlertPlugin } from "vux";
import { Scroller, Tab, TabItem, XButton, Card, LoadMore } from "vux";
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
function getNetBankDetailCallback(data) {
  return data;
}
export default {
  name: "record",
  mixins: [mixin],
  data() {
    return {
      showTips: false, //是否展示温馨提示
      num: 1,
      loading: "正在加载中...",
      showLoading: true,
      scrollbarY: true,
      height:
        (window.innerHeight ||
          window.screen.height ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) > 660
          ? "-0"
          : this.showTips
          ? "-140"
          : "-0", //"100%",
      bottomCount: 10,
      onFetching: false,
      tabInx: "0", //提取状态
      list3: ["待提取", "已提取"], //, "已提取"
      demo3: "待提取",
      index: 0,
      formEleProp: {
        searchVal: {
          clickNative: this.clickNative,
          list: [],
          itemborderIntent: true,
          isShowPreview: true,
          isShowButton: true,
          customClass: false,
          //插槽
          isShowAftertitle: true,
          //属性
          // title: "纪念币",
          // value: "2",
          inlineDesc: "",
          link: "",
          isLink: false,
          primary: "",
          isLoading: false,
          valueAlign: "",
          borderIntent: false,
          arrowDirection: "",
          disabled: false,
          alignItems: "",
          cellStyle: "",

          // isShowLeft: false,
          // isShowRight: true,
          results: [],
          top: "46px",
          position: "absolute"
        }
      },
      formEle: {
        searchVal: "",
        production: null
      },
      btnObj: {
        btnName: "修改",
        btnMini: true,
        btnPlain: true,
        btnStyle:
          "border:1px solid #3966AE;border-radius:20px;color:#3966AE;height:25px;line-height:25px;",

        refreshCode: this.toUpdateRecord
      },
      testData: [],
      netID: "",
      netInx: 0,
      wParam: ""
    };
  },
  created() {
    let that = this;
    that.getRecordList(1);
    console.log("==that.recordList==", that.recordList);
  },
  mounted() {
    let that = this;
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({ top: 0 });
    });
  },
  updated() {},
  computed: {
    ...mapState(["recordList", "userInfo", "recordError"])
  },
  watch: {
    recordError(newVal, oldVal) {
      console.log("recordError", newVal, oldVal);
      this.loading = "已经没有更多数据了";
      this.showLoading = false;
      this.onFetching = true;
      if (newVal.retcode == "YDCA0311Z022") {
        console.log("showTips");
        this.onTips();
      } else {
        new Vue().$vux.alert.show({
          title: "提示",
          content: `响应状态码：${newVal.retCode}，状态信息：${newVal.msg}`,
          onShow() {
            console.log("Plugin: I'm showing");
          },
          onHide() {
            console.log("Plugin: I'm hiding");
          }
        });
      }
    },
    recordList(newVal, oldVal) {
      console.log("recordList", newVal, oldVal);
      this.test(newVal);
    },
    userInfo: {
      handler: (newVal, oldVal) => {
        console.log("userInfo", newVal, oldVal);
      },
      deep: true
    }
  },
  methods: {
    onTips() {
      this.showTips = true;
    },
    offTips() {
      this.showTips = false;
    },
    test(data) {
      let that = this;
      if (data && data.WTEXTR_PD) {
        // var b = [];
        that.netInx = 0;
        data.WTEXTR_PD.forEach(item => {
          this.netID = item.Rgs_InsID;
          let netDetatil = {};
          //查询网点地址和网点电话，未查询到或失败展示 --
          that.$xhr.post(
            "/ccbsns/SNSService",
            {
              TXCODE: "MH3004",
              wParam: decodeURIComponent(that.wParam),
              branchId: item.Rgs_InsID
            },
            null,
            response => {
              if (response.status >= 200 && response.status < 300) {
                let resData = eval(response.data);
                netDetatil = resData.contractInfo;
                console.log("netDetatil", netDetatil);
              } else {
                console.log(response.message); //请求失败，response为失败信息
              }

              let itemData = this.f(
                item,
                netDetatil.netAddress ? netDetatil.netAddress : "--",
                netDetatil.netPhone ? netDetatil.netPhone : "--"
              );
              this.formEleProp.searchVal.list.push(itemData);
            }
            // }
          );
        });
        console.log(
          "this.formEleProp.searchVal.list",
          this.formEleProp.searchVal.list
        );
      } else {
        console.log("暂无数据");
        that.loading = "已经没有更多数据了";
        that.showLoading = false;
        that.onFetching = true;
      }
    },
    f(item, netAddress, netPhone) {
      // ["购买数量","预约日期","提取网点","网点地址","联系电话","提取状态"]
      let par = {};
      let b2 = [
        {
          label: "购买数量",
          value: `${item.Txn_Num + "件"}`,
          id: `${item.Txn_Num}`
        },
        {
          label: "预约日期",
          value: `${item.Frcst_Rtrv_Dt}`,
          id: `${item.Frcst_Rtrv_Dt}`
        },
        {
          label: "提取网点",
          value: `${item.Rgs_Inst_Nm}`,
          id: `${item.Rgs_Inst_Nm}`
        },
        {
          label: "网点地址",
          value: `${netAddress}`, //""
          id: `${netAddress}` //
        },
        {
          label: "联系电话",
          value: `${netPhone}`, //`
          id: `${netPhone}` //`
        },
        {
          label: "提取状态",
          value: `${this.list3[item.PM_WtExtr_Rcrd_StCd]}`,
          id: `${item.PM_WtExtr_Rcrd_StCd}`
        }
      ];
      this.$set(par, "title", item.PM_Nm);
      this.$set(par, "PM_PD_ID", item.PM_PD_ID);
      this.$set(par, "PM_Sell_Ar_ID", item.PM_Sell_Ar_ID);
      this.$set(par, "data", b2);
      console.log("f", par);
      // this.formateItemDate(par)
      // this.formEleProp.searchVal.list.push(par);
      return par;
    },
    getRecordList(num) {
      console.log("num", num);
      let that = this;
      if (num == 1) {
        that.num = 1;
        console.log("+++", num);
        that.formEleProp.searchVal.list = [];
      }
      if (that.userInfo.wParam != undefined) {
        console.log("set Cookie success");
        that.wParam = that.userInfo.wParam;
        this.$general.setCache("wParam", that.userInfo.wParam);
      } else {
        that.wParam = this.$general.getCache("wParam");
      }
      let params = {
        TXCODE: "ZZB007",
        wParam: decodeURIComponent(that.wParam),
        PM_WtExtr_Rcrd_StCd: this.tabInx, //0-未提取 1-已提取 默认上送未提取
        CorpPrvt_Cd: "1", //对公对私代码 1 对私 2对公
        REC_IN_PAGE: "5",
        PAGE_JUMP: num,
        Enqr_StDt: "20200101",
        QRY_END_DT: "20221201"
        // Cst_ID: "000100000004941204" //客户编号
      };
      that.getRecordListAsync(params);

      // console.log("==getRecordListAsync==", that.$store.state.recordList);
    },
    clickNative(value) {
      console.log(" clickNative value", value);
    },
    toUpdateRecord(value) {
      console.log("toUpdateRecord", value);
      //点击“修改”或点击“点击这里，立即查询”
      this.$router.push({
        name: "appointment",
        params: value
      });
    },
    toRecordQuery(value) {
      console.log(value);
      //点击“修改”或点击“点击这里，立即查询”
      this.$router.push({
        name: "appointment",
        params: {}
      });
    },
    onIndexChange(index) {
      this.loading = "正在加载中...";
      this.showLoading = true;
      this.demo3 = this.list3[index];
      this.tabInx = index;
      this.onFetching = false;
      this.getRecordList(1);
      console.log("onIndexChange", this.demo3);
    },
    onScrollBottom() {
      let that = this;
      console.log("do onScrollBottom", this.onFetching);
      if (this.onFetching) {
        // do nothing
        // console.log("do nothing", this.onFetching);
      } else {
        console.log("else do nothing");
        if (JSON.stringify(that.recordList) != "[]") {
          that.showLoading = true;
          that.loading = "正在加载中...";
          this.onFetching = true;
          that.num++;
          let totalPage = that.recordList.TOTAL_PAGE;
          console.log("num", totalPage, that.num);
          if (totalPage >= that.num) {
            that.getRecordList(that.num);
          }
          setTimeout(() => {
            let $ref = null;
            // for (let ref of that.$children) {
            //   if (ref.$refs[that.formEleProp.searchVal.scrollerBottomRef]) {
            //     $ref = ref.$refs.scrollerRef;
            //     break;
            //   }
            // }
            let len = that.formEleProp.searchVal.list.length;
            let totalNum = that.recordList.TOTAL_REC;
            console.log("44444", len, totalNum);
            if (totalNum && len < totalNum) {
              that.$nextTick(() => {
                // $ref.reset();
                this.$refs.scrollerBottom.reset();
              });
              that.onFetching = false;
              that.showLoading = false;
              that.loading = "上拉刷新";
            } else {
              that.loading = "已经没有更多数据了";
              that.showLoading = false;
              // this.$refs.scrollerBottom.disablePullup();
              that.onFetching = true;
            }
          }, 2000);
          // this.showLoading = false;
          // console.log(this.formEleProp.searchVal.list);
          // this.bottomCount += 10;
          // this.$nextTick(() => {
          //   this.$refs.scrollerBottom.reset();
          // });
          // }, 2000);
        } else {
          that.getRecordList(1);
        }
      }
    },
    ...mapActions(["getRecordListAsync"])
  },
  components: {
    "ccb-cell": () => import("@/components/packages/cell/Index.vue"),
    XButton,
    Tab,
    TabItem,
    Card,
    Scroller,
    LoadMore
  },
  destroyed() {}
};
</script>
<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/center.less";
.record {
  .hideWord {
    // margin:0px auto 0px auto;
    display: inline-block;
    color: #0ab6f2;
  }
  .weui-tab__panel {
    padding: 0 !important;
    // opacity: 0.9;
  }
  .weui-tab {
    padding: 0 !important;
    .weui-tab__panel {
      padding: 0 !important;
    }
  }
  .box {
    padding: 15px;
  }
  .vux-slider {
    background-color: #ffffff !important;
  }
  .weui-cell__ft {
    text-align: left !important;
  }
  .vux-label {
    width: 100px !important;
  }
  // .weui-form-preview__bd {
  //   color: black !important;
  // }

  // .weui-form-preview__label {
  //   margin-right: 0 !important;
  //   min-width: auto !important;
  // }
  .weui-form-preview__item {
    display: flex !important;
  }
  .weui-form-preview__label {
    width: 60px !important;
  }
  .weui-form-preview__value {
    flex: 1 !important;
    text-align: left !important;
  }
}
</style>
<style lang="less">
.record {
  .weui-form-preview__item {
    display: flex;
  }
  .weui-form-preview__label {
    width: 60px;
  }
  .weui-form-preview__value {
    flex: 1;
    text-align: left;
  }
}

.record.router-view {
  > div:nth-child(2) {
    background-color: #fff;
  }
}
</style>

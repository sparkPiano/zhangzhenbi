<!--
 * @Description: test
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-07-22 09:25:47
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-12-04 17:02:03
 * @FilePath: \ccbProject\ccb_5g\src\views\test\Index.vue
-->

<template>
  <div class="detail" style="height: 100%;padding: 0;position: fixed;">
    <!-- 顶部选项栏 -->
    <ccb-cell :formEleProp="formEleProp.searchVal" :radioObj="radioObj">
    </ccb-cell>
    <!-- 中间滚动列表 -->
    <scroller
      ref="scrollerBottom"
      lock-x
      :height="height"
      @on-scroll-bottom="onScrollBottom"
      :scrollbar-y="scrollbarY"
    >
      <div class="scroll-box" style="padding: 0;">
        <!-- 顶部选项栏可选下拉列表 -->
        <template v-if="radioObj.arrowDirection">
          <group
            style="display: block;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.5);opacity: 1;position:fixed;z-index:999;color:black;"
          >
            <ccb-radio :radioObj="radioObj"></ccb-radio>
            <div v-if="isDiy">
              <group>
                <datetime
                  v-model="value1"
                  @on-change="datetimeChange"
                  title="开始时间"
                  @on-cancel="log('cancel')"
                  @on-confirm="datetimeConfirm"
                  @on-hide="log('hide', $event)"
                ></datetime>
                <datetime
                  v-model="value2"
                  @on-change="datetimeChange"
                  title="结束时间"
                  @on-cancel="log('cancel')"
                  @on-confirm="datetimeConfirm"
                  @on-hide="log('hide', $event)"
                ></datetime>
                <x-button @click.native="changeDate">确定</x-button>
              </group>
            </div>
          </group>
        </template>
        <!-- 交易明细列表 -->
        <ccb-cell :formEleProp="formEleProp.production" :radioObj="radioObj">
        </ccb-cell>
      </div>
      <!-- 提示文字 -->
      <div style="padding-top: 2.4em;text-align: center;color: #999999;">
        {{ loading }}
      </div>

      <!-- <load-more
        background-color="#ffffff"
        :tip="loading"
        :show-loading="showLoading"
      ></load-more> -->
    </scroller>
    <!-- 页尾温馨提示 -->
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
import util from "@/utils/util.js";
import store from "@/vuex/store";
import Vue from "vue";
import { Base64 } from "js-base64";
import { AlertPlugin } from "vux";
import {
  Datetime,
  Scroller,
  Tab,
  TabItem,
  XButton,
  Card,
  Radio,
  TransferDom,
  LoadMore
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
  name: "detail",
  mixins: [mixin],
  data() {
    return {
      showTips: false,
      isDiy: false, //自定义时间
      num: 1, //页数
      loading: "正在加载中...",
      showLoading: true,
      scrollbarY: true, //是否显示垂直方向滚动条
      height:
        (window.innerHeight ||
          window.screen.height ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) > 660
          ? "-0"
          : "-0", //"100%",
      type1: "x003",
      type2: "y001",
      type3: "z001",
      // show1: false,
      radioObj: {},
      value1: "",
      value2: "",
      list: [],
      // list3: ["收到的消息", "发出的消息"],
      // demo3: "收到的消息",
      index: 0,
      onFetching: false,
      formEleProp: {
        searchVal: {
          displayClass: true,
          selectStyle: {},
          cellConStyle:
            "display:flex !important;background-color:#F4F8FB;color:#3765AE;text-align:right;padding: 5px 10px;",
          isShowRadio: true,
          recordList: "",
          list: [
            {
              title: "一个月", //查询日期
              default: "x003",
              changeRadio: this.changeRadioFcn1,
              arrowDirection: false,
              cellStyle:
                "font-size:0.13rem;border:none;background-color:#F4F8FB;color:#3765AE;padding-right: 0px !important;padding-left: 10px !important;width:0.9rem;",
              data: [
                {
                  icon: "",
                  key: "x001",
                  value: "当天"
                },
                {
                  icon: "",
                  key: "x002",
                  value: "本周"
                },
                {
                  icon: "",
                  key: "x003",
                  value: "一个月"
                },
                {
                  icon: "",
                  key: "x004",
                  value: "三个月"
                },
                {
                  icon: "",
                  key: "x005",
                  value: "自定义"
                }
              ]
            },
            {
              title: "全部业务类别", //业务类别
              default: "y001",
              changeRadio: this.changeRadioFcn2,
              arrowDirection: false,
              data: [
                {
                  icon: "",
                  key: "y001",
                  value: "全部业务类别"
                },
                {
                  icon: "",
                  key: "2383",
                  value: "购买（自提）"
                },
                {
                  icon: "",
                  key: "2385",
                  value: "购买（配送）"
                },
                {
                  icon: "",
                  key: "2386",
                  value: "提取"
                }
              ]
            },
            {
              title: "全部交易渠道", //交易渠道
              default: "z001",
              arrowDirection: false,
              changeRadio: this.changeRadioFcn3,
              data: [
                {
                  icon: "",
                  key: "z001",
                  value: "全部交易渠道"
                },
                {
                  icon: "",
                  key: "20170029", //20180030 低柜
                  value: "网点柜台"
                },
                {
                  icon: "",
                  key: "10010001",
                  value: "网上银行"
                },
                {
                  icon: "",
                  key: "10030006",
                  value: "手机银行"
                },
                {
                  icon: "",
                  key: "30240092",
                  value: "微信银行"
                }
              ]
            }
          ],
          itemborderIntent: false,
          isShowPreview: false,
          isShowButton: false,
          customClass: false,
          //属性
          // title: "纪念币",
          // value: "",
          link: false,
          isLink: true,
          arrowDirection: true,
          disabled: false,
          alignItems: "",
          cellStyle:
            "font-size:0.13rem;border:none;background-color:#F4F8FB;color:#3765AE;padding-right: 0px !important;width:1.4rem;", //
          clickNative: this.clickNative
        },
        //交易明细列表
        production: {
          isShowSlot: true,
          displayClass: false,
          selectStyle: {},
          isShowRadio: false,
          recordList: "",
          list: [],
          itemborderIntent: false,
          isShowPreview: false,
          isShowButton: false,
          customClass: false,
          //属性
          // title: "纪念币",
          // value: "",
          link: false,
          isLink: true,
          arrowDirection: true,
          disabled: false,
          alignItems: "",
          cellStyle:
            "font-size:0.13rem;color: black;line-height:30px;border-bottom:0.01rem solid #D9D9D9 !important;", //
          clickNative: this.clickChange
        }
      },
      testData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },
  created() {
    let that = this;
    // that.$store.state.detailList = [];
    that.getDetailList(1);
  },
  mounted() {
    let that = this;
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({ top: 0 });
    });
  },
  updated() {},
  computed: {
    ...mapState(["detailList", "userInfo", "detilError"])
  },
  watch: {
    detilError(newVal, oldVal) {
      console.log("detilError", newVal, oldVal);
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
    detailList(newVal, oldVal) {
      console.log("detailList", newVal, oldVal);
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
    toRecordQuery(value) {
      console.log(value);
      //点击“修改”或点击“点击这里，立即查询”
      this.$router.push({
        name: "appointment",
        params: {}
      });
    },
    changeDate() {
      let that = this;
      if (that.value1 == "" && that.value2 == "") {
        console.log("未选", that.value1);
      } else if (that.value1 == "") {
        console.log("开始时间为空", that.value1);
      } else if (that.value2 == "") {
        console.log("结束时间为空", that.value2);
      } else {
        that.isDiy = false;
        that.formEleProp.searchVal.list[0].arrowDirection = false;
        that.formEleProp.production.list = [];
        let params = {
          TXCODE: "ZZB006",
          wParam: decodeURIComponent(that.userInfo.wParam),
          // Cst_ID: "000100000004941204", //"044190000103299250",
          Enqr_StDt: that.value1.replace(/-/g, ""), //"20200101",
          QRY_END_DT: that.value2.replace(/-/g, ""), //"20211230",
          PM_Txn_Smy_Cd: that.type2 == "y001" ? "" : that.type2,
          Chnl_Cgy_List_Val: that.type3 == "z001" ? "" : that.type3,
          REC_IN_PAGE: "10",
          PAGE_JUMP: "1"
        };
        that.getDetailListAsync(params);
        console.log(
          "changeDate",
          that.value1.replace(/-/g, ""),
          that.value2.replace(/-/g, "")
        );
      }
    },
    //选择自定义时间调试 cancel hide
    log(str1, str2 = "") {
      console.log(str1, str2);
    },
    //选择自定义时间
    datetimeConfirm(val) {
      console.log("on-confirm arg", val);
      console.log("current value", this.value1);
    },
    //切换自定义时间
    datetimeChange(value) {
      console.log("change", value);
    },
    //处理业务类别
    transPM(PM_Txn_Smy_Cd) {
      let disVal = "";
      switch (PM_Txn_Smy_Cd) {
        case "2383":
          disVal = "购买（自提）";
          break;
        case "2384":
          disVal = "实物购买";
          break;
        case "2385":
          disVal = "购买（配送）";
          break;
        case "2386":
          disVal = "提取";
          break;
      }
      return disVal;
    },
    //处理交易渠道
    transChnl(Chnl_Cgy_List_Val) {
      let disVal = "";
      switch (Chnl_Cgy_List_Val) {
        case "10010001":
          disVal = "网银";
          break;
        case "20170029":
          disVal = "高柜";
          break;
        case "20180030":
          disVal = "低柜";
          break;
        case "10030006":
          disVal = "手机银行";
          break;
        case "30240092":
          disVal = "微信渠道";
          break;
      }
      return disVal;
    },
    getDetailList(num) {
      let that = this;
      if (num == 1) {
        that.num = 1;
        console.log("+++", num);
        that.formEleProp.production.list = [];
      }
      let date = util.getLastMonth(); //dateOptions("x003");
      console.log("date", date);
      let params = {
        TXCODE: "ZZB006",
        wParam: decodeURIComponent(that.userInfo.wParam),
        // Cst_ID: "000100000004941204", //"044190000103299250",
        Enqr_StDt: date.last, //"20200101",
        QRY_END_DT: date.now, //"20211230",
        PM_Txn_Smy_Cd: "",
        Chnl_Cgy_List_Val: "",
        REC_IN_PAGE: "10",
        PAGE_JUMP: num
      };
      that.getDetailListAsync(params);
      // console.log("==getDetailListAsync==", that.$store.state.detailList);
    },
    test(data) {
      console.log("detail data");
      if (data && data.CMMNMD_CN_DSTRN_DTL) {
        var b = [];
        let that = this;
        b = data.CMMNMD_CN_DSTRN_DTL;
        b.forEach(item => {
          this.$set(item, "arrowDirection", "none");
          this.$set(item, "title", that.transPM(item.PM_Txn_Smy_Cd));
          this.$set(
            item,
            "inlineDesc",
            (item.Txn_Dt + "").substring(0, 4) +
              "/" +
              (item.Txn_Dt + "").substring(4, 6) +
              "/" +
              (item.Txn_Dt + "").substring(6, 8)
          );
          this.$set(item, "value", that.transChnl(item.TXN_ITT_CHNL_CGY_CODE));
          this.$set(item, "price", Number(item.TxnAmt).toFixed(2));
        });
        for (let j = 0; j < b.length; j++) {
          this.formEleProp.production.list.push(b[j]);
        }
      } else {
        console.log("暂无数据");
        this.loading = "已经没有更多数据了";
        this.showLoading = false;
        this.onFetching = true;
      }
    },
    f(v1, v2, v3) {
      let that = this;
      this.formEleProp.production.list = [];
      let date = "";
      if (v1 == "x001") {
        date = util.dateOptions(v1);
      } else if (v1 == "x002") {
        date = util.getLastWeek();
      } else if (v1 == "x003") {
        date = util.getLastMonth();
      } else if (v1 == "x004") {
        date = util.getLast3Month();
      } else if (v1 == "x005") {
        date = {
          now: that.value2.replace(/-/g, ""),
          last: that.value1.replace(/-/g, "")
        };
      }
      console.log("date", date);
      let params = {
        TXCODE: "ZZB006",
        wParam: decodeURIComponent(that.userInfo.wParam),
        // Cst_ID: "000100000004941204", //"044190000103299250",
        Enqr_StDt: date.last, //"20200101",
        QRY_END_DT: date.now, //"20211230",
        PM_Txn_Smy_Cd: v2 == "y001" ? "" : v2,
        Chnl_Cgy_List_Val: v3 == "z001" ? "" : v3,
        REC_IN_PAGE: "10",
        PAGE_JUMP: "1"
      };
      that.getDetailListAsync(params);
    },
    //切换时间
    changeRadioFcn1(value, label) {
      console.log("change:", value, label);

      if (value != "x005") {
        this.isDiy = false;
        this.formEleProp.searchVal.list[0].arrowDirection = false;
        this.formEleProp.searchVal.list[0].title = label;
        this.formEleProp.searchVal.list[0].default = value;
        this.type1 = value;
        console.log(
          "type1:" +
            this.type1 +
            "   type2:" +
            this.type2 +
            "   type3:" +
            this.type3
        );
        this.f(this.type1, this.type2, this.type3);
      } else {
        this.formEleProp.searchVal.list[0].title = label;
        this.formEleProp.searchVal.list[0].default = value;
        this.type1 = value;
        console.log(
          "type1:" +
            this.type1 +
            "   type2:" +
            this.type2 +
            "   type3:" +
            this.type3
        );
        this.isDiy = true;
      }
    },
    //切换业务类别
    changeRadioFcn2(value, label) {
      console.log("change:", value, label);
      this.formEleProp.searchVal.list[1].arrowDirection = false;
      this.formEleProp.searchVal.list[1].title = label;
      this.formEleProp.searchVal.list[1].default = value;
      this.type2 = value;
      console.log(
        "type1:" + this.type1 + "type2:" + this.type2 + "type3:" + this.type3
      );
      this.f(this.type1, this.type2, this.type3);
    },
    //切换交易渠道
    changeRadioFcn3(value, label) {
      console.log("change:", value, label);
      this.formEleProp.searchVal.list[2].arrowDirection = false;
      this.formEleProp.searchVal.list[2].title = label;
      this.formEleProp.searchVal.list[2].default = value;
      this.type3 = value;
      console.log(
        "type1:" + this.type1 + "type2:" + this.type2 + "type3:" + this.type3
      );
      this.f(this.type1, this.type2, this.type3);
    },
    clickChange(value) {
      this.$router.push({
        name: "itemDetail",
        params: {
          name: "itemDetail test",
          value: value
        }
      });
    },
    clickNative(value, index) {
      //上方下拉列表
      console.log("value", value);
      if (value !== "") {
        for (let i = 0; i < this.formEleProp.searchVal.list.length; i++) {
          // console.log("------------", i, index);
          if (i != index) {
            this.formEleProp.searchVal.list[i].arrowDirection = false;
          } else {
            this.formEleProp.searchVal.list[index].arrowDirection = !this
              .formEleProp.searchVal.list[index].arrowDirection;
            this.radioObj = this.formEleProp.searchVal.list[index];
            console.log("this.radioObj", this.radioObj.arrowDirection);
            // if (this.formEleProp.searchVal.list[index].arrowDirection) {
            //   this.show1 = !this.show1;
            // }
            this.isDiy = false;
            console.log(this.formEleProp.searchVal.list[index].arrowDirection);
          }
        }
      }
    },
    onScrollBottom() {
      let that = this;
      console.log("do onScrollBottom", this.onFetching);
      if (this.onFetching) {
        // do nothing
        // console.log("do nothing", this.onFetching);
      } else {
        console.log("else do nothing");
        if (JSON.stringify(that.detailList) != "[]") {
          that.showLoading = true;
          that.loading = "正在加载中...";
          this.onFetching = true;
          that.num++;
          let totalPage = that.detailList.TOTAL_PAGE;
          console.log("num", that.num);
          if (totalPage >= that.num) {
            that.getDetailList(that.num);
          }
          setTimeout(() => {
            let $ref = null;
            // for (let ref of that.$children) {
            //   if (ref.$refs["scrollerBottom"]) {
            //     $ref = ref.$refs.scrollerBottom;
            //     break;
            //   }
            // }
            let len = that.formEleProp.production.list.length;
            let totalNum = that.detailList.TOTAL_REC;
            console.log("44444", len, totalNum);
            if (totalNum && len < totalNum) {
              that.$nextTick(() => {
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
          that.getDetailList(1);
        }
      }
    },
    ...mapActions(["getDetailListAsync"])
  },
  directives: {
    TransferDom
  },
  components: {
    "ccb-radio": () => import("@/components/packages/radio/Index.vue"),
    "ccb-cell": () => import("@/components/packages/cell/Index.vue"),
    "ccb-search": () => import("@/components/packages/search/Index.vue"),
    "ccb-prod-menus": () => import("@/components/packages/prodMenus/Index.vue"),
    "ccb-product": () => import("@/components/packages/product/Index.vue"),
    Datetime,
    XButton,
    Tab,
    TabItem,
    Card,
    Radio,
    Scroller,
    LoadMore
  },
  destroyed() {}
};
</script>
<style lang="less">
div,
span,
input {
  box-sizing: border-box;
}
</style>
<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/center.less";
.detail {
  background-color: #ffffff !important;
  // select,
  // .weui-select,
  // .weui-cell__bd .weui-select {
  //   color: #09b6f2 !important;
  // }
  .weui-cell_select .weui-cell__bd:after {
    content: " ";
    display: inline-block;
    height: 0.06rem;
    width: 0.06rem;
    border-width: 0.02rem 0 0 0.02rem;
    border-color: #09b6f2;
    border-style: solid;
  }
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
  .vux-slider {
    background-color: #ffffff !important;
  }
  .weui-cell__ft {
    text-align: left !important;
  }
  .vux-label {
    width: 100px !important;
  }
  .weui-cell .weui-cell_radio .weui-check__label {
  }
  .setRadio {
    background-color: #09b6f2 !important;
  }
}
</style>

<!--
 * @Description: test
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-07-22 09:25:47
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-12-04 17:01:29
 * @FilePath: \ccbProject\ccb_5g\src\views\test\Index.vue
-->

<template>
  <div class="logisticsDetail">
    <div>
      <card class="card-demo-flex card-demo-content01">
        <ccb-cell
          slot="header"
          :formEleProp="formEleProp.searchVal"
          :formEle="formEle"
        >
        </ccb-cell>
      </card>
      <ccb-process :dataProcess="dataProcess"></ccb-process>
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixins/mixin";
import store from "@/vuex/store";
import { mapActions, mapState } from "vuex";
import Api from "@/api/index";
import {
  Timeline,
  TimelineItem,
  Tab,
  TabItem,
  XButton,
  Swiper,
  SwiperItem,
  Card
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
  name: "logisticsDetail",
  mixins: [mixin],
  data() {
    return {
      ShipperCode: [
        { index: "SF", label: "顺丰速运" },
        { index: "HTKY", label: "百世快递" },
        { index: "ZTO", label: "中通快递" },
        { index: "STO", label: "申通快递" },
        { index: "YTO", label: "圆通速递" },
        { index: "YD", label: "韵达速递" },
        { index: "YZPY", label: "邮政快递包裹" },
        { index: "EMS", label: "EMS" },
        { index: "HHTT", label: "天天快递" },
        { index: "JD", label: "京东快递" },
        { index: "UC", label: "快递柜或驿站签收" },
        { index: "DBL", label: "德邦快递" },
        { index: "ZJS", label: "宅急送" },
        { index: "TNT", label: "TNT快递" }
      ],
      status: ["暂无轨迹信息", "已揽收", "在途中", "签收", "问题件"],
      statusEx: [
        { index: "0", label: "暂无轨迹信息" },
        { index: "1", label: "已揽收" },
        { index: "2", label: "在途中" },
        { index: "201", label: "到达派件城市" },
        { index: "202", label: "派件中" },
        { index: "211", label: "已放入快递柜或驿站" },
        { index: "3", label: "已签收" },
        { index: "301", label: "正常签收" },
        { index: "302", label: "派件异常后最终签收" },
        { index: "304", label: "代收签收" },
        { index: "311", label: "快递柜或驿站签收" },
        { index: "4", label: "问题件" },
        { index: "401", label: "发货无信息" },
        { index: "402", label: "超时未签收" },
        { index: "403", label: "超时未更新" },
        { index: "404", label: "拒收(退件)" },
        { index: "405", label: "派件异常" },
        { index: "406", label: "退货签收" },
        { index: "407", label: "退货未签收" },
        { index: "412", label: "快递柜或驿站超时未取" }
      ],
      dataProcess: {
        data: []
      },
      count: 3,
      list3: ["收到的消息", "发出的消息"],
      demo3: "收到的消息",
      index: 0,
      onFetching: false,
      showBorders: false,
      showVerticalDividers: false,
      menusList: [],
      cellList: [],
      cellList1: [],
      formEleProp: {
        searchVal: {
          clickNative: () => console.log("on clickNative"),
          recordList: "",
          list: [],
          itemborderIntent: true,
          isShowPreview: true,
          isShowButton: false,
          customClass: false,
          //插槽
          isShowAftertitle: true,
          isShowChild: false,
          isShowInlinedesc: false,
          isShowCellTitle: false,
          isShowArrowDirection: false,
          //属性
          title: "纪念币",
          value: "2",
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
          cellStyle: ""
        },
        production: {}
      },
      formEle: {
        searchVal: "",
        production: null
      },
      testData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      Ovrlsttn_EV_Trck_No: "",
      PM_PD_ID: ""
    };
  },
  created() {
    // this.formEleProp.searchVal.list[0].value
    console.log("PM_PD_ID---------", JSON.stringify(this.$route.params));
    if (JSON.stringify(this.$route.params) != "{}") {
      this.PM_PD_ID = this.$route.params.value.data[0].value;
      this.$general.setCache("PM_PD_ID", this.PM_PD_ID);
      console.log("PM_PD_ID---------", this.PM_PD_ID);
    }

    // Ovrlsttn_EV_Trck_No  this.$route.params.itemDetail.CMMNMD_CN_DSTRN_DTL.PM_PD_ID;
    console.log("created", JSON.parse(this.$general.getCache("itemDetail")));
    let itemDetail = JSON.parse(this.$general.getCache("itemDetail"));
    let that = this;
    if (JSON.stringify(itemDetail) != "[]") {
      this.dealData(itemDetail);
      that.getEncrypt(itemDetail);
    } else if (this.$general.getCache("itemDetail")) {
      this.dealData(this.$general.getCache("itemDetail"));
      that.getEncrypt(this.$general.getCache("itemDetail"));
    }
  },
  mounted() {
    let that = this;
  },
  updated() {},
  computed: {
    ...mapState(["encryptDa"]),
    itemDetail() {
      return this.$store.state.itemDetail;
    }
  },
  watch: {
    encryptDa(newVal, oldVal) {
      console.log("encryptDa", newVal, oldVal);
      this.getlogisticsList(newVal.result.encryptData);
      // this.test(newVal);
      // console.log("==this.test(newVal)==", this.test(newVal));
    }
  },
  methods: {
    getEncrypt(itemDetail) {
      if (JSON.stringify(itemDetail) != "[]") {
        console.log("CMMNMD_CN_DSTRN_DTL", itemDetail.CMMNMD_CN_DSTRN_DTL);
        if (itemDetail.CMMNMD_CN_DSTRN_DTL) {
          itemDetail.CMMNMD_CN_DSTRN_DTL.forEach(item => {
            this.Ovrlsttn_EV_Trck_No = item.Ovrlsttn_EV_Trck_No;
            this.$general.setCache(
              "Ovrlsttn_EV_Trck_No",
              this.Ovrlsttn_EV_Trck_No
            );
            console.log(
              "Ovrlsttn_EV_Trck_No---------",
              this.Ovrlsttn_EV_Trck_No
            );
          });
        }
      }
      let that = this;
      let param = {
        sysTraceId: this.Ovrlsttn_EV_Trck_No
          ? this.Ovrlsttn_EV_Trck_No
          : this.$general.getCache("Ovrlsttn_EV_Trck_No"), //"1020010691611450997001810 1020010681612073830041924", //交易流水号 this.Ovrlsttn_EV_Trck_No ? this.Ovrlsttn_EV_Trck_No : this.$general.getCache("Ovrlsttn_EV_Trck_No")
        requestTime: new Date().getTime() + "", //请求时间
        productId: this.PM_PD_ID
          ? this.PM_PD_ID
          : this.$general.getCache("PM_PD_ID"), //"861100101 10389182", //商品后端ID   this.PM_PD_ID ? this.PM_PD_ID : this.$general.getCache("PM_PD_ID");
        clientChannel: "02" //渠道号 微信02
      };
      let params = {
        TXCODE: "ZZB014",
        JSONENCRYPT: JSON.stringify(param)
      };
      that.getEncryptAsync(params);
      //getlogisticsList
    },
    dealData(itemDetail) {
      if (itemDetail && itemDetail.CMMNMD_CN_DSTRN_DTL) {
        let that = this;
        itemDetail.CMMNMD_CN_DSTRN_DTL.forEach(item => {
          this.$set(
            this.formEleProp.searchVal,
            "PM_Txn_Smy_Cd",
            item.PM_Txn_Smy_Cd
          );
          let itemData = this.f(item, this.formEleProp.searchVal.PM_Txn_Smy_Cd);
          console.log("itemData---------", itemData);
          this.formEleProp.searchVal.list.push(itemData);
        });
        console.log(
          "detail CMMNMD_CN_DSTRN_DTL",
          this.formEleProp.searchVal.list
        );
      }
    },
    f(item, PM_Txn_Smy_Cd) {
      //处理交易信息
      let par = {};
      let b2;
      if (PM_Txn_Smy_Cd == "2385") {
        //配送
        par = {};
        b2 = [
          {
            label: "收货人姓名",
            value: `${item.RcvG_CtcPsn_Nm}`,
            id: `${item.RcvG_CtcPsn_Nm}`
          },
          {
            label: "联系电话",
            value: `${item.RcvG_CtcPsn_TelNo}`,
            id: `${item.RcvG_CtcPsn_TelNo}`
          },
          {
            label: "收货地址",
            value: `${item.DlvGds_Adr_Dsc}`,
            id: `${item.DlvGds_Adr_Dsc}`
          },
          {
            label: "物流公司",
            value: "", //`${item.PM_WtExtr_Rcrd_StCd}`,
            id: "" //`${item.PM_WtExtr_Rcrd_StCd}`
          },
          {
            label: "快递单号",
            value: "", //`${item.PM_WtExtr_Rcrd_StCd}`,
            id: "" //`${item.PM_WtExtr_Rcrd_StCd}`
          },
          {
            label: "配送状态",
            value: "", //`${item.PM_WtExtr_Rcrd_StCd}`,
            id: "" //`${item.PM_WtExtr_Rcrd_StCd}`
          }
        ];
        this.$set(par, "isShowGray", true);
        this.$set(par, "data", b2);
        console.log("f", par);
        return par;
      }
    },
    getlogisticsList(encryptDa) {
      let that = this;
      that.$xhr.post(
        `${that.$ip}/webapi/QueryLogisticForNobleServlet?json_data=${encryptDa}`,
        {},
        // `${that.$ip}/webapi/QueryLogisticForNobleServlet?`,
        // { json_data: encryptDa },
        null,
        response => {
          console.log("api");
          const retCode = response.data.Code;
          if (retCode == "1") {
            // let logisticData = {
            //   Code: "1",
            //   msg: "处理成功",
            //   result: {
            //     EBusinessID: "1237100",
            //     ShipperCode: "YD",
            //     Success: true,
            //     LogisticCode: "390141793061",
            //     State: "3",
            //     StateEx: "3",
            //     Location: "威海市",
            //     Traces: [
            //       {
            //         AcceptTime: "2016-10-26 18:31:38",
            //         AcceptStation: "【北京环铁站】的【互优图书】已收件",
            //         Location: "北京市",
            //         Action: "1"
            //       },
            //       {
            //         AcceptTime: "2016-10-26 19:53:50",
            //         AcceptStation:
            //           "快件在【北京环铁站】装车,正发往【北京分拨中心】",
            //         Location: "北京市",
            //         Action: "2"
            //       }
            //     ]
            //   }
            // };
            let logisticData = response;
            this.formEleProp.searchVal.list[0].data[3].id =
              logisticData.result.ShipperCode;
            this.formEleProp.searchVal.list[0].data[3].value =
              logisticData.result.ShipperCode;
            this.formEleProp.searchVal.list[0].data[4].id =
              logisticData.result.LogisticCode;
            this.formEleProp.searchVal.list[0].data[4].value =
              logisticData.result.LogisticCode;
            this.formEleProp.searchVal.list[0].data[5].id =
              logisticData.result.State;
            this.formEleProp.searchVal.list[0].data[5].value = this.status[
              logisticData.result.State
            ];
            this.setTraces(logisticData.result.Traces);

            console.log(this.formEleProp.searchVal.list[0].data[3]);
          } else {
            this.$vux.toast.show({
              type: "text",
              position: "middle",
              text: response.data.msg,
              time: 3000
            });
          }
          // Api.post(
          //   "/queryLogistic?json_data=" + JSON.stringify(params),
          //   {},
          //   null,
        }
      );
    },
    deal(data) {
      let date = new Date(data.AcceptTime);
      console.log("date", date);
      let par = {
        opeTime: this.formatTime(new Date(data.AcceptTime)),
        opeDate: this.formatDate(new Date(data.AcceptTime)),
        opeTitle: `${this.qdChange(data.Action, this.statusEx)}`, //同StateEx
        opeRemark: `${"[" + data.Location + "]：" + data.AcceptStation}`
      };
      return par;
    },
    formatDate(date) {
      var mymonth = date.getMonth() + 1;
      var myweekday = date.getDate();

      if (mymonth < 10) {
        mymonth = "0" + mymonth;
      }
      if (myweekday < 10) {
        myweekday = "0" + myweekday;
      }
      return mymonth + "-" + myweekday;
    },
    formatTime(date) {
      var hour = date.getHours();
      var minu = date.getMinutes();
      return hour + ":" + minu;
    },
    qdChange(value, list) {
      for (let e = 0; e < list.length; e++) {
        if (value == list[e].index) {
          console.log("qdChange", list[e].index, value, list[e].label);
          return list[e].label;
        }
      }
    },
    setTraces(Traces) {
      console.log("Traces.length", Traces.length);
      if (Traces.length > 0) {
        for (let i = Traces.length - 1; i >= 0; i--) {
          console.log("Traces.length==for", Traces.length);
          let itemData = this.deal(Traces[i]);
          this.dataProcess.data.push(itemData);
        }
        // Traces.forEach(item => {
        //   let itemData = this.deal(item);
        //   this.dataProcess.data.push(itemData);
        // });
      }
    },
    toRecordQuery(value) {
      console.log(value);
      //点击“修改”或点击“点击这里，立即查询”
      this.$router.push({
        name: "myAppointment",
        params: {
          PrdFlBil_ID: ""
        }
      });
    },
    demo01_onIndexChange(index) {
      this.demo3 = index;
      console.log("demo01_onIndexChange", this.demo3);
    },
    onItemClick(index) {
      console.log("on item click:", index);
    },
    showAd(item) {
      console.log("showAd", item);
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
      this.formEleProp.searchVal.customClass = true;
    },
    onCancel() {
      let that = this;
      console.log("on cancel");
    },
    onBlur() {
      console.log("on blur");
      document.querySelector(".weui-search-bar__cancel-btn").trigger("click");
      this.formEleProp.searchVal.customClass = false;
    },
    onClear() {
      console.log("on clear");
    },
    onScrollBottom() {
      if (this.onFetching) {
        // do nothing
      } else {
        this.onFetching = true;
        setTimeout(() => {
          this.formEleProp.production.prodLists = [
            ...this.formEleProp.production.prodLists,
            ...this.testData
          ];
          this.$nextTick(() => {
            this.$children[2].$refs[
              this.formEleProp.production.scrollerBottomRef
            ].reset();
          });
          this.onFetching = false;
        }, 2000);
      }
    },
    ...mapActions(["getEncryptAsync"])
  },
  components: {
    "ccb-process": () => import("@/components/packages/process/Index.vue"),
    "ccb-cell": () => import("@/components/packages/cell/Index.vue"),
    "ccb-search": () => import("@/components/packages/search/Index.vue"),
    "ccb-prod-menus": () => import("@/components/packages/prodMenus/Index.vue"),
    "ccb-product": () => import("@/components/packages/product/Index.vue"),
    XButton,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Card,
    Timeline,
    TimelineItem
  },
  destroyed() {}
};
</script>
<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/center.less";
.logisticsDetail {
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
  // .tab-swiper {
  //   background-color: #fff;
  //   height: 100px;
  // }
  .vux-slider {
    background-color: #ffffff !important;
  }
  .weui-cell__ft {
    text-align: left !important;
  }
  .vux-label {
    width: 100px !important;
  }

  .timeline-demo {
    .vux-timeline {
      padding: 10px;
      padding-left: 100px;
    }
    /deep/.vux-timeline-item-content {
      padding: 0 0 20px 30px !important;
    }
    p {
      // color: #888;
      // font-size: 0.8rem;
    }
    h4 {
      // color: #666;
      // font-weight: normal;
    }
    .recent {
      color: rgb(4, 190, 2);
    }
  }
}
</style>
<style lang="less">
.logisticsDetail {
  .weui-form-preview__item {
    display: flex;
  }
  .weui-form-preview__label {
    width: 120px;
  }
  .weui-form-preview__value {
    flex: 1;
    text-align: left;
  }
}
</style>

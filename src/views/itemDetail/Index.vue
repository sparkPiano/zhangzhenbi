<!--
 * @Description: test
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-07-22 09:25:47
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-12-04 17:01:43
 * @FilePath: \ccbProject\ccb_5g\src\views\test\Index.vue
-->

<template>
  <div class="itemDetail">
    <div>
      <card class="card-demo-flex card-demo-content01">
        <ccb-cell
          slot="header"
          :formEleProp="formEleProp.searchVal"
          :formEle="formEle"
          :btnObj="btnObj"
        >
        </ccb-cell>
      </card>
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixins/mixin";
import { mapActions, mapState } from "vuex";
import store from "@/vuex/store";
import { Tab, TabItem, XButton, Swiper, SwiperItem, Card } from "vux";
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
  name: "itemDetail",
  mixins: [mixin],
  data() {
    return {
      stCdStatus: ["未提取", "已提取", "交易已失效"],
      qd2Data: [
        {
          icon: "",
          key: "2383",
          value: "购买（自提）"
        },
        {
          icon: "",
          key: "2384",
          value: "实物购买"
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
      ],
      qd3Data: [
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
      ],
      logisticsFlag: false, //配送
      hasTitle: false,
      list3: ["收到的消息", "发出的消息"],
      demo3: "收到的消息",
      index: 0,
      onFetching: false,
      showBorders: false,
      showVerticalDividers: false,
      menusList: [],
      cellList: [],
      cellList1: [],
      detailPar: [
        "交易时间",
        "业务类别",
        "交易渠道",
        "交易机构",
        "付款账号",
        "购买总数量",
        "购买总金额",
        "提取网点",
        "预约日期",
        "交易状态"
      ],
      formEleProp: {
        searchVal: {
          cellStyle: "border-top:0.01rem solid #D9D9D9 !important;",
          recordList: "",
          list: [],
          clickNative: () => console.log("on clickNative"),
          itemborderIntent: true,
          isShowPreview: true,
          isShowButton: false,
          customClass: false,
          //属性
          disabled: false,
          alignItems: "",

          // isShowLeft: false,
          // isShowRight: true,
          cancelText: "",
          results: [],
          onFocus: this.onFocus,
          onCancel: this.onCancel,
          onSubmit: this.onSubmit,
          onResultClick: this.onResultClick,
          onChange: this.onChange,
          onBlur: this.onBlur,
          onClear: this.onClear
        }
      },
      formEle: {
        searchVal: "",
        production: null
      },
      btnObj: {
        btnName: "查看物流",
        btnMini: true,
        btnPlain: true,
        btnStyle:
          "border:1px solid #09b6f2;border-radius:20px;color:#09b6f2;height:25px;line-height:25px;",

        refreshCode: this.toRecordQuery
      },
      testData: []
    };
  },
  created() {
    let that = this;
    console.log("create", JSON.stringify(that.$route.params));
    if (JSON.stringify(that.$route.params) != "{}") {
      store.commit("itemDeParam", that.$route.params);
      that.$general.setCache("itemDeParam", JSON.stringify(that.$route.params));
      console.log("test route", this.$route.params);
      if (this.$route.params.value.PM_Txn_Smy_Cd != "2385") {
        that.getItemDetail(this.$route.params);
      } else {
        that.logisticsFlag = true;
        that.getwlItemDetail(this.$route.params); //查配送详情
      }
    } else if (that.$general.getCache("itemDeParam")) {
      console.log(
        "create general",
        JSON.parse(that.$general.getCache("itemDeParam"))
      );
      // } else if (store.state.itemDeParam) {
      let itemDeParam = JSON.parse(that.$general.getCache("itemDeParam"));
      if (itemDeParam.value.PM_Txn_Smy_Cd != "2385") {
        console.log("test", itemDeParam);
        that.getItemDetail(itemDeParam);
      } else {
        that.logisticsFlag = true;
        that.getwlItemDetail(itemDeParam); //查配送详情
      }
    }
  },
  mounted() {
    let that = this;
  },
  updated() {},
  computed: {
    ...mapState(["itemDetail", "userInfo"])
  },
  watch: {
    itemDetail(newVal, oldVal) {
      console.log("itemDetail", newVal, oldVal);
      // this.gotoSuc(newVal);
      this.test(newVal);
      // console.log("==this.test(newVal)==", this.test(newVal));
    },
    userInfo: {
      handler: (newVal, oldVal) => {
        console.log("userInfo", newVal, oldVal);
      },
      deep: true
    }
  },
  methods: {
    qdChange(value, list) {
      for (let e = 0; e < list.length; e++) {
        if (value == list[e].key) {
          console.log("qdChange", list[e].key, value, list[e].value);
          return list[e].value;
        }
      }
      // list.forEach((item, index) => {
      //   if (item.key == value) {
      //     console.log("qdChange", item.key, value);
      //     return item.value;
      //   }
      // });
    },
    test(data) {
      if (this.logisticsFlag && data && data.CMMNMD_CN_DSTRN_DTL) {
        let that = this;
        data.CMMNMD_CN_DSTRN_DTL.forEach(item => {
          this.$set(
            this.formEleProp.searchVal,
            "PM_Txn_Smy_Cd",
            item.PM_Txn_Smy_Cd
          );
          let itemData = this.f(item, this.formEleProp.searchVal.PM_Txn_Smy_Cd);
          this.formEleProp.searchVal.list.push(itemData);
        });
        console.log(
          "detail CMMNMD_CN_DSTRN_DTL",
          this.formEleProp.searchVal.list
        );
      } else if (data && data.CMMNMD_CN_TXN_DTL) {
        let PD_item = data.CMMNMD_CN_DTL_PD[0] || {};
        // var b = [];
        let that = this;
        data.CMMNMD_CN_TXN_DTL.forEach(item => {
          this.$set(
            this.formEleProp.searchVal,
            "PM_Txn_Smy_Cd",
            item.PM_Txn_Smy_Cd
          );
          let itemData = this.f(
            item,
            this.formEleProp.searchVal.PM_Txn_Smy_Cd,
            PD_item
          );
          this.formEleProp.searchVal.list.push(itemData);
        });
        console.log(
          "detail CMMNMD_CN_TXN_DTL",
          this.formEleProp.searchVal.list
        );
      }
      if (this.logisticsFlag && data && data.CMMNMDCN_DSTRN_DTL_PD) {
        let that = this;
        data.CMMNMDCN_DSTRN_DTL_PD.forEach(item => {
          // this.netID = item.Rgs_InsID;
          // this.getNetDetail(item.Rgs_InsID);
          let itemData = this.e(item, this.formEleProp.searchVal.PM_Txn_Smy_Cd);
          this.formEleProp.searchVal.list.push(itemData);
        });
        console.log(
          " product CMMNMDCN_DSTRN_DTL_PD",
          this.formEleProp.searchVal.list
        );
      } else if (data && data.CMMNMD_CN_DTL_PD) {
        // var b = [];
        let that = this;
        data.CMMNMD_CN_DTL_PD.forEach(item => {
          // this.netID = item.Rgs_InsID;
          // this.getNetDetail(item.Rgs_InsID);
          let itemData = this.e(item, this.formEleProp.searchVal.PM_Txn_Smy_Cd);
          this.formEleProp.searchVal.list.push(itemData);
        });
        console.log(
          " product CMMNMD_CN_DTL_PD",
          this.formEleProp.searchVal.list
        );
      }
      // else {
      //   console.log("暂无数据");
      // }
    },
    e(item, PM_Txn_Smy_Cd) {
      //处理配送产品
      let par = {};
      let b2 = [
        {
          label: "产品代码",
          value: `${item.PM_PD_ID}`,
          id: `${item.PM_PD_ID}`
        },
        {
          label: "购买数量",
          value: `${item.Txn_Num + "件"}`,
          id: `${item.Txn_Num}`
        },
        {
          label: "产品价格",
          value: `${
            item.PM_Ent_TrdTckt_Prc
              ? Number(item.PM_Ent_TrdTckt_Prc).toFixed(2) + "元/件"
              : "0.00元/件"
          }`,
          id: `${item.PM_Ent_TrdTckt_Prc}`
        },
        {
          label: "购买金额",
          value: `${
            item.TxnAmt ? Number(item.TxnAmt).toFixed(2) + "元" : "0.00元"
          }`, //`${this.recordNetDetail.contractInfo.netAddress}`,
          id: `${item.TxnAmt}` //`${this.recordNetDetail.contractInfo.netAddress}`
        }
      ];
      this.$set(par, "title", item.PM_Nm);
      if (!this.hasTitle) {
        this.$set(par, "groupTitle", true);
        this.hasTitle = true;
      }

      if (PM_Txn_Smy_Cd == "2383") {
        //2383-装帧普制币购买（自提） 2384-装帧普制币实物购买
        //2385-装帧普制币购买（配送） 2386-装帧普制币提取
        this.$set(par, "itemTitle", "自提产品");
        // this.$set(par, "isShowButton", true);
      } else if (PM_Txn_Smy_Cd == "2384") {
        this.$set(par, "itemTitle", "实物购买");
        this.$set(par, "isShowButton", true);
      } else if (PM_Txn_Smy_Cd == "2385") {
        this.$set(par, "itemTitle", "配送产品");
        this.$set(par, "isShowButton", true);
      } else if (PM_Txn_Smy_Cd == "2386") {
        this.$set(par, "itemTitle", "提取产品");
      }
      this.$set(par, "data", b2);
      console.log("e", par);
      // this.formateItemDate(par)
      // this.formEleProp.searchVal.list.push(par);
      return par;
    },
    f(item, PM_Txn_Smy_Cd, PD_item) {
      console.log("f=================", PD_item);
      //处理交易信息
      let par = {};
      let b2;
      if (PM_Txn_Smy_Cd == "2383") {
        //2383-装帧普制币购买（自提） 2384-装帧普制币实物购买
        //2385-装帧普制币购买（配送） 2386-装帧普制币提取
        par = {};
        b2 = [
          {
            label: "交易时间",
            value: `${(item.Txn_Dt + "").substring(0, 4) +
              "/" +
              (item.Txn_Dt + "").substring(4, 6) +
              "/" +
              (item.Txn_Dt + "").substring(6, 8)}`,
            id: `${item.Txn_Dt}`
          },
          {
            label: "业务类别",
            value: `${this.qdChange(item.PM_Txn_Smy_Cd, this.qd2Data)}`,
            id: `${item.PM_Txn_Smy_Cd}`
          },
          {
            label: "交易渠道",
            value: `${this.qdChange(item.TXN_ITT_CHNL_CGY_CODE, this.qd3Data)}`,
            id: `${item.TXN_ITT_CHNL_CGY_CODE}`
          },
          {
            label: "交易机构",
            value: `${item.Hdl_Inst_Nm}`, //`${this.recordNetDetail.contractInfo.netAddress}`,
            id: `${item.Hdl_Inst_Nm}` //`${this.recordNetDetail.contractInfo.netAddress}`
          },
          {
            label: "付款账号",
            value: `${item.Cst_AccNo}`, //`${item.CardNo}`, //`${this.recordNetDetail.contractInfo.netPhone}`,
            id: `${item.Cst_AccNo}` //`${this.recordNetDetail.contractInfo.netPhone}`
          },
          {
            label: "购买总数量",
            value: `${item.Txn_Num + "件"}`,
            id: `${item.Txn_Num}`
          },
          {
            label: "购买总金额",
            value: `${item.Tot_MkDAm + "元"}`,
            id: `${item.Tot_MkDAm}`
          },
          {
            label: "提取网点",
            value: `${item.Hdl_Inst_Nm}`, //`${this.recordNetDetail.contractInfo.netAddress}`,
            id: `${item.Hdl_Inst_Nm}` //`${this.recordNetDetail.contractInfo.netAddress}`
          },
          {
            label: "预约日期",
            value: `${(PD_item.Frcst_Rtrv_Dt + "").substring(0, 4) +
              "/" +
              (PD_item.Frcst_Rtrv_Dt + "").substring(4, 6) +
              "/" +
              (PD_item.Frcst_Rtrv_Dt + "").substring(6, 8)}`, //`${this.recordNetDetail.contractInfo.netPhone}`,
            id: `${PD_item.Frcst_Rtrv_Dt}` //`${this.recordNetDetail.contractInfo.netPhone}`
          },
          {
            label: "交易状态",
            value: `${this.stCdStatus[PD_item.PM_WtExtr_Rcrd_StCd]}`, //`${item.PM_WtExtr_Rcrd_StCd}`,
            id: `${PD_item.PM_WtExtr_Rcrd_StCd}`
          }
        ];
      } else if (PM_Txn_Smy_Cd == "2384") {
        //实物购买
        par = {};
        b2 = [
          {
            label: "交易时间",
            value: `${(item.Txn_Dt + "").substring(0, 4) +
              "/" +
              (item.Txn_Dt + "").substring(4, 6) +
              "/" +
              (item.Txn_Dt + "").substring(6, 8)}`,
            id: `${item.Txn_Dt}`
          },
          {
            label: "业务类别",
            value: `${this.qdChange(item.PM_Txn_Smy_Cd, this.qd2Data)}`,
            id: `${item.PM_Txn_Smy_Cd}`
          },
          {
            label: "交易渠道",
            value: `${this.qdChange(item.TXN_ITT_CHNL_CGY_CODE, this.qd3Data)}`,
            id: `${item.TXN_ITT_CHNL_CGY_CODE}`
          },
          {
            label: "交易机构",
            value: `${item.Hdl_Inst_Nm}`, //`${this.recordNetDetail.contractInfo.netAddress}`,
            id: `${item.Hdl_Inst_Nm}` //`${this.recordNetDetail.contractInfo.netAddress}`
          },
          {
            label: "购买总数量",
            value: `${item.Txn_Num}`,
            id: `${item.Txn_Num}`
          },
          {
            label: "交易状态",
            value: "", //`${item.PM_WtExtr_Rcrd_StCd}`,
            id: `${item.PM_WtExtr_Rcrd_StCd}`
          }
        ];
      } else if (PM_Txn_Smy_Cd == "2385") {
        //配送
        par = {};
        b2 = [
          {
            label: "交易时间",
            value: `${(item.Txn_Dt + "").substring(0, 4) +
              "/" +
              (item.Txn_Dt + "").substring(4, 6) +
              "/" +
              (item.Txn_Dt + "").substring(6, 8)}`,
            id: `${item.Txn_Dt}`
          },
          {
            label: "业务类别",
            value: `${this.qdChange(item.PM_Txn_Smy_Cd, this.qd2Data)}`,
            id: `${item.PM_Txn_Smy_Cd}`
          },
          {
            label: "交易渠道",
            value: `${this.qdChange(item.TXN_ITT_CHNL_CGY_CODE, this.qd3Data)}`,
            id: `${item.TXN_ITT_CHNL_CGY_CODE}`
          },
          {
            label: "交易机构",
            value: `${item.Hdl_Inst_Nm}`, //`${this.recordNetDetail.contractInfo.netAddress}`,
            id: `${item.Hdl_Inst_Nm}` //`${this.recordNetDetail.contractInfo.netAddress}`
          },
          {
            label: "付款账号",
            value: `${item.Acc_ID}`, //`${item.Hdl_Inst_Nm}`, //`${this.recordNetDetail.contractInfo.netPhone}`,
            id: `${item.Acc_ID}` //`${item.Hdl_Inst_Nm}` //`${this.recordNetDetail.contractInfo.netPhone}`
          },
          {
            label: "购买总数量",
            value: `${item.Txn_Num + "件"}`,
            id: `${item.Txn_Num}`
          },
          {
            label: "购买总金额",
            value: `${Number(item.TxnAmt).toFixed(2) + "元"}`,
            id: `${item.TxnAmt}`
          },
          {
            label: "运费",
            value: `${Number(item.Dstrn_Fee).toFixed(2) + "元"}`,
            id: `${item.Dstrn_Fee}`
          },
          {
            label: "合计金额",
            value: `${(Number(item.TxnAmt) + Number(item.Dstrn_Fee)).toFixed(
              2
            ) + "元"}`,
            id: `${Number(item.TxnAmt) + Number(item.Dstrn_Fee)}`
          },
          {
            label: "交易状态",
            value: "", //`${item.PM_WtExtr_Rcrd_StCd}`,
            id: `${item.PM_WtExtr_Rcrd_StCd}`
          },
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
          }
        ];
      } else if (PM_Txn_Smy_Cd == "2386") {
        //提取
        par = {};
        b2 = [
          {
            label: "交易时间",
            value: `${(item.Txn_Dt + "").substring(0, 4) +
              "/" +
              (item.Txn_Dt + "").substring(4, 6) +
              "/" +
              (item.Txn_Dt + "").substring(6, 8)}`,
            id: `${item.Txn_Dt}`
          },
          {
            label: "业务类别",
            value: `${this.qdChange(item.PM_Txn_Smy_Cd, this.qd2Data)}`,
            id: `${item.PM_Txn_Smy_Cd}`
          },
          {
            label: "交易渠道",
            value: `${this.qdChange(item.TXN_ITT_CHNL_CGY_CODE, this.qd3Data)}`,
            id: `${item.TXN_ITT_CHNL_CGY_CODE}`
          },
          {
            label: "交易机构",
            value: `${item.Hdl_Inst_Nm}`, //`${this.recordNetDetail.contractInfo.netAddress}`,
            id: `${item.Hdl_Inst_Nm}` //`${this.recordNetDetail.contractInfo.netAddress}`
          },
          {
            label: "购买总数量",
            value: `${item.Txn_Num + "件"}`,
            id: `${item.Txn_Num}`
          },
          {
            label: "交易状态",
            value: "", //`${item.PM_WtExtr_Rcrd_StCd}`,
            id: `${item.PM_WtExtr_Rcrd_StCd}`
          }
        ];
      }

      this.$set(par, "isShowGray", true);
      this.$set(par, "data", b2);
      console.log("f", par);
      // this.formateItemDate(par)
      // this.formEleProp.searchVal.list.push(par);
      return par;
    },
    getItemDetail(param) {
      let that = this;
      let params = {
        TXCODE: "ZZB004",
        wParam: decodeURIComponent(that.userInfo.wParam),
        PM_Sell_Ar_ID: param.value.PM_Sell_Ar_ID,
        PM_Txn_Smy_Cd: param.value.PM_Txn_Smy_Cd,
        Ovrlsttn_EV_Trck_No: param.value.Ovrlsttn_EV_Trck_No
      };
      that.getItemDetailAsync(params);
      // console.log("==getItemDetailAsync==", that.$store.state.itemDetail);
    },
    getwlItemDetail(param) {
      let that = this;
      let params = {
        TXCODE: "ZZB008",
        wParam: decodeURIComponent(that.userInfo.wParam),
        PM_Sell_Ar_ID: param.value.PM_Sell_Ar_ID,
        PM_Txn_Smy_Cd: param.value.PM_Txn_Smy_Cd,
        Ovrlsttn_EV_Trck_No: param.value.Ovrlsttn_EV_Trck_No
      };
      that.getItemDetailAsync(params);
      // console.log("==getItemDetailAsync==", that.$store.state.itemDetail);
    },
    toRecordQuery(value) {
      console.log(value);
      //点击“修改”或点击“点击这里，立即查询”
      this.$general.setCache("itemDetail", JSON.stringify(this.itemDetail));
      this.$general.clearCache("PM_PD_ID");
      console.log("itemDetail", this.itemDetail);
      this.$router.push({
        name: "logisticsDetail",
        params: {
          value: value,
          itemDetail: this.itemDetail,
          Ovrlsttn_EV_Trck_No: "",
          PM_PD_ID: ""
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
    ...mapActions(["getItemDetailAsync"])
  },
  components: {
    "ccb-cell": () => import("@/components/packages/cell/Index.vue"),
    XButton,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Card
  },
  destroyed() {}
};
</script>
<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/center.less";
.itemDetail {
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
}
</style>
<style lang="less">
.itemDetail {
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

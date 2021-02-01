<!--
 * @Description: payment-success
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-18 11:00:30
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-10 10:29:17
-->
<template>
  <ccb-success
    :cellPreview="cellPreview"
    :btnObj="btnObj"
    :successTips="successTips"
    :successTipstDesc="successTipstDesc"
  >
    <template slot="footerContent">
      <ccb-more-ads :imgUrl="imgUrl"></ccb-more-ads>
    </template>
  </ccb-success>
</template>
<script>
import ad from "../../assets/images/ads/ad1.png";
import { mixin } from "@/mixins/mixin";
import { mapMutations } from "vuex";
export default {
  name: "payment-success",
  mixins: [mixin],
  data() {
    return {
      imgUrl: ad,
      successTips: "装帧普制币购买成功",
      successTipstDesc:
        "请于预约日期持本人有效身份证件前往预约网点办理提取业务。",
      cellPreview: {
        list: []
      },
      normalPreview: {
        bodyItems: [],
        footerBtns: []
      },
      btnObj: {
        header: {
          text: "完成",
          plain: true,
          mini: true,
          completeOpr: this.completePayment
        },
        content: [
          {
            text: "预约记录查询",
            plain: true,
            mini: false,
            completeOpr: this.yuYueJiLu
          },
          {
            text: "交易明细查询",
            plain: true,
            mini: false,
            completeOpr: this.jiaoYiMingXi
          },
          {
            text: "返回",
            plain: true,
            mini: false,
            completeOpr: this.retHome
          }
        ]
      },
      successFooter: {
        header: { title: "更多精彩" },
        footer: {},
        clickFooter: () => ({}),
        clickHeader: () => ({})
      }
    };
  },
  created() {
    let that = this;
    let payList = that.$general.getCache("paymentProductList")
      ? JSON.parse(that.$general.getCache("paymentProductList"))
      : [];
    let ids = payList.map(item => {
      return item.id;
    });
    let count = 0,
      amount = 0;
    for (let list of payList) {
      count += parseInt(list.singleNum);
      amount += parseFloat(list.price) * parseInt(list.singleNum);
    }
    let tijiaoInfo = that.$general.getCache("tijiaoInfo")
      ? JSON.parse(that.$general.getCache("tijiaoInfo"))
      : new Object({});
    let tqWay = that.$general.getCache("tqWay")
      ? that.$general.getCache("tqWay")
      : "";
    const res = [
      {
        title: "购买总金额",
        value: amount
      },
      {
        title: "购买总数量",
        value: count
      },
      {
        title: "提取方式",
        value: tqWay == "0" ? "网点自提" : "送货上门"
      },
      {
        title: "提取网点",
        value: tijiaoInfo.net
      },
      {
        title: "提取日期",
        value: tijiaoInfo.date
      }
    ];

    for (let item of res) {
      that.cellPreview.list.push({
        label: item.title,
        value: item.value
      });
    }
    let cartProductList = that.$general.getCache("cartProductList")
      ? JSON.parse(that.$general.getCache("cartProductList"))
      : [];
    let filterList = cartProductList.filter(val => {
      return ids.indexOf(val.id) < 0;
    });
    that.updateCartNumber({ result: filterList.length });
    that.$general.setCache("cartNumber", filterList.length);
    that.$general.setCache("cartProductList", JSON.stringify(filterList));
    that.$general.clearCache("paymentProductList");
  },
  mounted() {
    let that = this;
  },
  updated() {},
  computed: {},
  watch: {},
  methods: {
    completePayment() {
      console.log("完成");
      this.$router.push({
        name: "product"
      });
      this.$general.setCache("/product", "product");
    },
    yuYueJiLu() {
      console.log("预约记录");
      this.$router.push({
        name: "product"
      });
      this.$general.setCache("/record", "record");
    },
    jiaoYiMingXi() {
      console.log("交易明细");
      this.$router.push({
        name: "product"
      });
      this.$general.setCache("/detail", "detail");
    },
    retHome() {
      console.log("返回");
      this.$router.push({
        name: "product"
      });
      this.$general.setCache("/product", "product");
    },
    ...mapMutations(["updateCartNumber"])
  },
  destroyed() {},
  components: {
    "ccb-success": () => import("@/components/packages/success/Index.vue"),
    "ccb-more-ads": () => import("@/components/packages/ads/Ads.vue")
  }
};
</script>
<style lang="less" scoped></style>

<!--
 * @Description: detail
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-09 16:15:24
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-11 10:51:22
-->
<template>
  <div class="ccb-detail_container">
    <ccb-detail
      :formEleProp="formEleProp.detail"
      :qrCode="qrCode"
      :saveBtn="saveBtn"
      :shareBtn="shareBtn"
      :showDialog="showDialog"
      @showOrHideDialog="showOrHideDialog"
    ></ccb-detail>
    <ccb-add-to-cart
      :formEleProp="formEleProp.cartNumber"
      :formEle="formEle"
      :leftBtn="leftBtn"
      :rightBtn="rightBtn"
      @change-number="onChangeToNumber"
    ></ccb-add-to-cart>
    <ccb-buoy
      :formEleProp="formEleProp.masker"
      :formEle="formEle"
      @click.native="goToCart"
    ></ccb-buoy>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { mixin } from "@/mixins/mixin";
export default {
  name: "detail",
  mixins: [mixin],
  data() {
    return {
      detail: null,
      showDialog: false,
      formEleProp: {
        detail: {},
        cartNumber: {
          xNumberTitle: "",
          xNumberMin: 0,
          xNumberMax: 100000,
          xNumberStep: 1,
          xNumberFillable: false,
          xNumberWidth: "30px",
          xNumberButtonStyle: "square",
          xNumberAlign: "left",
          // xNumberChange: this.onChangeToNumber,
          xNumberSlotTitle: "cartNumber"
        },
        masker: {
          color: "",
          opacity: 0.5,
          fullscreen: false,
          badgeText: parseInt(this.cartNumber)
            ? parseInt(this.cartNumber)
            : parseInt(this.$general.getCache("cartNumber")) > 0
            ? parseInt(this.$general.getCache("cartNumber"))
            : 0
        }
      },
      formEle: {
        cartNumber: 0,
        masker: null
      },
      qrCode: {
        type: "img",
        size: 30,
        bgColor: "#FFFFFF",
        fgColor: "#000000",
        val: ""
      },
      leftBtn: {
        btnName: "加入购物车",
        btnMini: true,
        btnPlain: true,
        addToCart: this.addToCart
      },
      rightBtn: {
        btnName: "立即购买",
        btnMini: true,
        btnPlain: true,
        purchase: this.purchase
      },
      saveBtn: {
        btnName: "保存到手机",
        btnMini: true,
        btnPlain: true,
        saveToMobile: this.saveToMobile
      },
      shareBtn: {
        btnName: "立即分享",
        btnMini: true,
        btnPlain: true,
        share: this.share
      },
      blobRes: null,
      yunfei: 0
    };
  },
  created() {
    let that = this;
    console.log(
      "params-detail222",
      JSON.stringify({
        productInfo: this.productDetail[0],
        userInfo: { ACCT_NO: this.userInfo.ACCT_NO }
      })
    );
    that.getKuaiDiFei();
    that.formEleProp.detail = that.productDetail[0];
    that.qrCode.val = JSON.stringify({
      productInfo: that.productDetail[0],
      userInfo: { ACCT_NO: that.userInfo.ACCT_NO }
    });
  },
  mounted() {
    let that = this;
    // that.$wxapi.wxRegister(this.wxRegCallback);
  },
  updated() {},
  computed: {
    ...mapState(["productDetail", "userInfo", "cartNumber"])
  },
  watch: {},
  methods: {
    showOrHideDialog(val) {
      this.showDialog = val;
    },
    onChangeToNumber(val, $e) {
      console.log("onChangeToNumber", val, this.formEle.cartNumber);
    },
    addToCart() {
      let that = this;
      console.log("addToCart");
      that.$vux.toast.show({
        text: "添加成功，产品已在购物车等您",
        position: "middle",
        type: "text",
        width: "3rem"
      });

      let tempList =
        that.$general.getCache("cartProductList") &&
        JSON.parse(that.$general.getCache("cartProductList")).length
          ? JSON.parse(that.$general.getCache("cartProductList"))
          : [];
      if (that.formEle.cartNumber > 0) {
        that.formEleProp.masker.badgeText += this.formEle.cartNumber;
        that.$general.setCache("cartNumber", that.formEleProp.masker.badgeText);
        for (let i = 0; i < that.formEle.cartNumber; i++) {
          tempList.push(that.productDetail[0]);
        }
        if (
          parseInt(that.$general.getCache("cartNumber")) > 0 &&
          that.cartNumber < 1
        ) {
          that.updateCartNumber({
            result: parseInt(that.$general.getCache("cartNumber"))
          });
        } else {
          that.updateCartNumber({
            result: parseInt(this.formEle.cartNumber)
          });
        }
      } else if (that.formEle.cartNumber == 0) {
        that.formEleProp.masker.badgeText += 1;
        that.$general.setCache("cartNumber", that.formEleProp.masker.badgeText);
        tempList.push(that.productDetail[0]);
        if (
          parseInt(that.$general.getCache("cartNumber")) > 0 &&
          that.cartNumber < 1
        ) {
          that.updateCartNumber({
            result: parseInt(that.$general.getCache("cartNumber"))
          });
        } else {
          that.updateCartNumber({
            result: 1
          });
        }
      }
      that.$general.setCache("cartProductList", JSON.stringify(tempList));
    },
    purchase() {
      let that = this;
      console.log("purchase", that.formEle.cartNumber);
      let youkeAddress = that.$general.getCache("cacheAddressList")
        ? JSON.parse(that.$general.getCache("cacheAddressList"))
        : [];
      if (that.userInfo.BIND_FLAG != "4" || youkeAddress.length) {
        that.$general.setCache("agreeStatus", 0);
        that.$general.setCache("addressStatus", 0);
        let tempList1 = [];
        for (let i = 0; i < that.formEle.cartNumber; i++) {
          let obj = that.productDetail[0];
          tempList1.push(obj);
        }
        console.log("tempList1", tempList1);
        that.$store.commit("updatePurchasingDetail", {
          obj: tempList1.length ? tempList1 : that.productDetail
        });
        that.$router.push({
          name: "buynow",
          params: { yunfei: that.yunfei }
        });
      } else {
        that.$vux.toast.show({
          text: "请新增收货地址后，再进行下一步操作",
          position: "middle",
          type: "text",
          width: "3rem"
        });
      }
    },
    saveToMobile(val) {
      let that = this;
      console.log("saveToMobile");

      (window.html2canvas || that.$html2canvas)(
        document.getElementById("imageWraper"),
        { backgroundColor: null, useCORS: true, allowTaint: true, scale: 0.8 }
      ).then(canvas => {
        let saveUrl = canvas.toDataURL("image/png");
        let aLink = document.createElement("a");
        let blob = that.base64ToBlob(saveUrl);
        let evt = document.createEvent("HTMLEvents");
        console.log("htmlCavans", canvas, saveUrl, blob, evt);
        evt.initEvent("click", true, true);
        aLink.download = val + ".png";
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
        console.log("htmlCavans111", aLink);
        that.showDialog = false;
        that.$vux.toast.show({
          text: "图片已保存到手机相册",
          position: "top",
          type: "success",
          width: "3rem",
          time: 500
        });
      });
    },
    share(val, desc) {
      let that = this;
      (window.html2canvas || that.$html2canvas)(
        document.getElementById("imageWraper"),
        { backgroundColor: null, useCORS: true, allowTaint: true, scale: 0.8 }
      )(document.getElementById("imageWraper")).then(canvas => {
        let saveUrl = canvas.toDataURL("image/png");
        // let blob = that.base64ToBlob(saveUrl);
        // that.blobRes = URL.createObjectURL(blob);
        let pic = saveUrl;
        console.log("share", val, desc);
        that.showDialog = false;
        that.$wxapi.wxRegister(this.wxRegCallback({ val, pic, desc }));
      });
    },
    base64ToBlob(code) {
      let parts = code.split(";base64,");
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    },
    wxRegCallback({ val, pic, desc }) {
      let that = this;
      console.log("share11", val, desc);
      // 用于微信JS-SDK回调
      that.wxShareTimeline({ val, pic, desc });
      that.wxShareAppMessage({ val, pic, desc });
    },
    wxShareTimeline({ val, pic, desc }) {
      let that = this;
      // 微信自定义分享到朋友圈
      let option = {
        title: val, // 分享标题, 请自行替换
        link: window.location.href, // 分享链接，根据自身项目决定是否需要split
        imgUrl: pic, // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          that.$vux.toast.show({
            text: "成功分享至朋友圈",
            position: "middle",
            type: "success",
            width: "3rem",
            time: 1000
          });
        },
        error: () => {
          that.$vux.toast.show({
            text: "已取消分享",
            position: "middle",
            type: "cancel",
            width: "3rem",
            time: 1000
          });
        }
      };
      // 将配置注入通用方法
      this.$wxapi.ShareTimeline(option);
    },
    wxShareAppMessage({ val, pic, desc }) {
      let that = this;
      // 微信自定义分享给朋友"限时团购周 挑战最低价"
      let option = {
        title: val, // 分享标题, 请自行替换
        desc: desc, // 分享描述, 请自行替换
        link: window.location.href, // 分享链接，根据自身项目决定是否需要split
        imgUrl: pic, // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          that.$vux.toast.show({
            text: "成功分享给微信好友",
            position: "middle",
            type: "success",
            width: "3rem",
            time: 1000
          });
        },
        error: () => {
          that.$vux.toast.show({
            text: "已取消分享",
            position: "middle",
            type: "cancel",
            width: "3rem",
            time: 1000
          });
        }
      };
      // 将配置注入通用方法
      this.$wxapi.ShareAppMessage(option);
    },
    goToCart() {
      let that = this;
      let youkeAddress = that.$general.getCache("cacheAddressList")
        ? JSON.parse(that.$general.getCache("cacheAddressList"))
        : [];
      if (that.userInfo.BIND_FLAG != "4" || youkeAddress.length) {
        that.$router.push({
          name: "shoppingCart",
          params: { yunfei: that.yunfei }
        });
      } else {
        this.$vux.toast.show({
          type: "text",
          position: "middle",
          text: "请新增收货地址后，再进行下一步操作",
          width: "3rem"
        });
      }
    },
    getKuaiDiFei() {
      let that = this;
      that.$xhr.post(
        "/ccbsns/SNSService",
        {
          TXCODE: "ZZB015",
          BsPD_ECD: "J14",
          wParam: decodeURIComponent(that.userInfo.wParam)
        },
        null,
        response => {
          let retCode = response.data.HEADER.retcode;
          if (retCode == "000000" || retCode == "000000000000") {
            that.yunfei = response.data.BODY.Dstrn_Fee;
          }
        }
      );
      setTimeout(() => {
        that.yunfei = 8;
      }, 3000);
    },
    ...mapMutations(["updateCartNumber"])
  },
  components: {
    "ccb-detail": () => import("@/components/packages/product/Detail.vue"),
    "ccb-add-to-cart": () =>
      import("@/components/packages/product/AddToCart.vue"),
    "ccb-buoy": () => import("@/components/packages/buoy/Index.vue")
  },
  destroyed() {}
};
</script>
<style lang="less" scoped></style>

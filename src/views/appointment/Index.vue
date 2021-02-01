<!--
 * @Description: test
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-07-22 09:25:47
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-12-04 17:02:15
 * @FilePath: \ccbProject\ccb_5g\src\views\test\Index.vue
-->

<template>
  <div class="appointment" style="height:100%;position: relative;">
    <div>
      <!-- 顶部Tab选项 -->
      <tab
        v-if="showTab"
        :line-width="2"
        active-color="#3966AE"
        bar-active-color="#2E66AE"
        default-color="#666"
        @on-item-click="demo01_onIndexChange"
      >
        <tab-item
          :selected="demo3 === item"
          v-for="(item, index) in list3"
          :class="{ 'vux-1px-r': index === 0 }"
          @click="demo3 = item"
          :key="index"
          @on-item-click="demo01_onIndexChange(item)"
          >{{ item }}</tab-item
        >
      </tab>
      <!-- 修改预约记录 -->
      <ccb-input
        v-if="demo3 == '修改'"
        :formEleProp="formEleProp.updateVal"
        :formEle="formEle"
        :btnObj="{}"
      ></ccb-input>
      <!-- 账号查询 -->
      <ccb-input
        v-if="showTab && demo3 == list3[0]"
        :formEleProp="formEleProp.searchVal"
        :formEle="formEle"
        :btnObj="{}"
      >
      </ccb-input>
      <!-- 手机银行查询 -->
      <ccb-input
        v-if="showTab && demo3 == list3[1]"
        :formEleProp="formEleProp.production"
        :formEle="formEle"
        :btnObj="{}"
      >
      </ccb-input>
      <!-- <ccb-input></ccb-input> -->
    </div>
    <div
      style="text-align: center;width: 100%;position: absolute; bottom: 0px;padding-bottom: 50px;"
    >
      <x-button class="button_btn" @click.native="btnSubmit()">{{
        buttonTxt
      }}</x-button>
    </div>
    <toast
      v-model="showPositionValue"
      type="text"
      :time="1000"
      is-show-mask
      :text="toastValue"
      :position="position"
      width="20em"
    ></toast>
  </div>
</template>

<script>
import { mixin } from "@/mixins/mixin";
import { mapActions, mapState } from "vuex";
import util from "@/utils/util.js";
import Vue from "vue";
import { Base64 } from "js-base64";
import { AlertPlugin } from "vux";
// import snsitf from "@/api/request/snsitf.js";
import {
  Toast,
  PopupRadio,
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
  name: "appointment",
  mixins: [mixin],
  data() {
    return {
      isSend: true,
      toastValue: "",
      position: "middle",
      showPositionValue: false,
      buttonTxt: "下一步",
      showTab: false,
      list3: ["账号查询", "手机银行查询"],
      demo3: "账号查询",
      index: 0,
      onFetching: false,
      showBorders: false,
      showVerticalDividers: false,
      formEleProp: {
        updateVal: {
          cellConStyle: "font-size:14px;",
          labelWidth: "width:100px !important;",
          recordList: "",
          list: [
            {
              readonly: true,
              title: "产品名称",
              placeholder: "",
              value: "" //"泰山普通纪念币"
            },
            {
              readonly: true,
              title: "购买数量",
              placeholder: "",
              value: "" //"1件"
            },
            {
              cellClass: "downPop",
              cellStyle: "font-size:14px;width: 100% !important;",
              isRadio: true,
              closeRadio: this.closeRadio,
              // groupTitle: true,
              title: "预约日期",
              placeholder: "请选择预约日期",
              value: "", //"2020/01/01",
              // onHide: this.onHide,
              // onShow: this.onShow,
              default: "", //"x003",
              changeRadio: this.changeRadioFcn1,
              arrowDirection: false,
              options2: []
            },

            {
              readonly: true,
              title: "提取网点",
              placeholder: "",
              value: "" //"建行北京上地支行"
            },
            {
              readonly: true,
              title: "网点地址",
              placeholder: "",
              value: "" //"北京市海淀区上地信息路28号信息大厦1层"
            },
            {
              readonly: true,
              title: "联系电话",
              placeholder: "",
              value: "" //"010-62967186"
            }
          ],
          itemborderIntent: false,
          isShowPreview: false,
          customClass: false,
          //属性
          arrowDirection: "",
          disabled: false,
          alignItems: "",
          cellStyle: "",

          // isShowLeft: false,
          // isShowRight: true,
          cancelText: "",
          results: [],
          autoFixed: true,
          onFocus: this.onFocus,
          onCancel: this.onCancel,
          onChange: this.onChange,
          onBlur: this.onBlur,
          onEnter: this.onEnter,
          onClear: this.onClear
        },
        searchVal: {
          isShowButton: false,
          cellConStyle: "font-size:14px;",
          labelWidth: "width:100px !important;",
          recordList: "",
          list: [
            {
              title: "储蓄帐号",
              placeholder: "请输入活期储蓄帐号(卡、折)",
              value: ""
            },
            {
              title: "证件号码",
              placeholder: "请输入证件号码后四位，不区分大小写",
              value: ""
            },
            {
              title: "短信验证码",
              placeholder: "请输入短信验证码",
              value: "",
              isShowButton: true,
              btnDisabled: false,
              max: 6,
              btnObj: {
                btnName: "点击获取",
                btnMini: true,
                btnPlain: true,
                btnStyle:
                  "border:none;color:#3966AE;height:25px;line-height:25px;",
                refreshCode: this.toGetSMS //this.toRecordQuery
              }
            }
          ],
          itemborderIntent: false,
          isShowPreview: false,
          customClass: false,
          //属性
          arrowDirection: "",
          disabled: false,
          alignItems: "",
          cellStyle: "",

          // isShowLeft: false,
          // isShowRight: true,
          cancelText: "",
          results: [],
          autoFixed: true,
          onFocus: this.onFocus,
          onCancel: this.onCancel,
          onChange: this.onChange,
          onBlur: this.onBlur,
          onEnter: this.onEnter,
          onClear: this.onClear
        },
        production: {
          isShowButton: false,
          cellConStyle: "font-size:14px;",
          labelWidth: "width:100px !important;",
          recordList: "",
          list: [
            {
              title: "手机号码",
              placeholder: "请输入手机号码",
              value: ""
            },
            {
              title: "证件号码",
              placeholder: "请输入证件号码后四位，不区分大小写",
              value: ""
            },
            {
              title: "附加码",
              placeholder: "请输入附加码",
              value: "",
              max: 6,
              isShowButton: true,
              btnObj: {
                extraImg:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAoCAIAAACHGsgUAAADaklEQVR42uXavY4TMRAH8L+9LU8A0okSiQdAQlAgUXEtVEeL6HkCKuh4BTokWhqe4MrrqXmQCO9usjie8XjGH0kQ1ii6nJxN8tsZ7+xusDMO4Nvugod3ExvA/ejv/chNXoP57rv/eCAaGveeWB7+vDEOjs8scONMu/3VpWUcrC/ODe5VH5bHX6WN350P5bntu4/YG3rQC1vCnhUm0H/dXD+JQ/M22+SXD1/EUQQNc64fvY5DeBfrzLdXb9io1zwl1uL1M36qxHJ+CqHEEpgaycpYGq8cFiYfQnjhOk2vEEfgo3M0TGOxEi/ggSmzgpeDY4PFotPmjThQ0zXjtlCKnBSrrgzZLFNmVvBK5lDWhIlF1wTwKd5JNViyl2HNWsg2NX0ZslhCAdK8q0ilSPDj/KjHErz0WIkai8V6yVg0rXJHCaUd8LW+DGWvCqw4s4rJxUpZsVrszowFvGvH2iojkdJgVdgVsJSdxMkyi8IFr1xatbQLrF0ZS+PVHSvxErDYGmzssIAvrN2lYFGv7biZ0BSxBnWk2swqetVhAU8FLHbBMmHJnf1ALNnLcm74e5/Yy3VbExZNtBwW2xKdFEvwqsisItbmlTylXmzWUK/25BqL5cRLvcErkaVYxcKkWH+/W2i8j8nGYgHfNV5CZgWvHJkJS2i7ZILY66SZVexac2XIkg3CCitbzuvfwGLJemElXmHCoevYx1aSDT0qQhSwnPMmL80CH5PJWPoToKNDIbkWtKkNz6wRXisZO00jZV222BqM865nGcZewGfZK8ESvDpi0UrU91m0ZlvXLDa/cpclil60w5i8l7GAH3qsYgcfNxbADVuz1M6wwCu9gHuslxDLR9wvZPzlYzclwU6rODFke/2cne1oGLwoWe4cSMm0tvJrZq1rf93NHuUNHqa4SO/as3VIvOQLEjkmF43DPvSmm6nyNOvJjcar8pZ67hBZu7V5zJWYDPR8l7JFyQuHY9xtR6/1F0CWTU1xZiWIdPT7ccOdqSTRlhHSno9/OqXcIPViT5WGI2a80LxzvKYklWoslnB2qczECkc2xTpgmZYwOd0ELD3Z8cd7nHecioiJF3pUvs1LTreiVwWZsFauZMpM3Bb4941YLYfIWE2D1Z1MWdHdMqtLS+HnRtmbjgkdU2zeVW6aXPbu9B8CuLKNLEDVQwAAAABJRU5ErkJggg==",
                btnName: "",
                btnMini: true,
                btnPlain: true,
                btnStyle:
                  "border:none;color:#3966AE;height:25px;line-height:25px;"
                // refreshCode: this.getExtraCode
              }
            },
            {
              title: "短信验证码",
              placeholder: "请输入短信验证码",
              value: "",
              max: 6,
              isShowButton: true,
              btnObj: {
                btnName: "点击获取",
                btnMini: true,
                btnPlain: true,
                btnStyle:
                  "border:none;color:#3966AE;height:25px;line-height:25px;",

                refreshCode: this.toRecordQuery
              }
            },
            {
              title: "登录密码",
              placeholder: "请输入登录密码",
              value: "",
              max: 6,
              isShowButton: true,
              btnObj: {
                btnName: "遗忘密码",
                btnMini: true,
                btnPlain: true,
                btnStyle:
                  "border:none;color:#3966AE;height:25px;line-height:25px;",

                refreshCode: this.toRecordQuery
              }
            }
          ],
          itemborderIntent: false,
          isShowPreview: false,
          customClass: false,
          //属性
          arrowDirection: "",
          disabled: false,
          alignItems: "",
          cellStyle: "",
          onFocus: this.onFocus,
          onCancel: this.onCancel,
          onChange: this.onChange,
          onBlur: this.onBlur,
          onEnter: this.onEnter,
          onClear: this.onClear,
          extraImg: "",
          PM_PD_ID: "",
          PM_Sell_Ar_ID: ""
        }
      },
      formEle: {
        searchVal: "",
        production: null
      }
    };
  },
  created() {
    let that = this;
    if (JSON.stringify(that.$route.params) != "{}") {
      that.demo3 = "修改";
      that.showTab = false;
      that.buttonTxt = "确定";
      let updateData = that.$route.params;
      console.log("updateData------------", updateData);
      this.PM_PD_ID = updateData.PM_PD_ID;
      this.PM_Sell_Ar_ID = updateData.PM_Sell_Ar_ID;
      this.formEleProp.updateVal.list[0].value = updateData.title;
      this.formEleProp.updateVal.list[2].default = updateData.data[1].value;
      for (let i = 0; i < 5; i++) {
        console.log("set updateData------------");
        this.formEleProp.updateVal.list[i + 1].value = updateData.data[i].value;
      }
      this.getAppDateList();
    } else {
      // this.$router.go(-1);
      that.demo3 = "账号查询";
      that.showTab = true;
    }
    console.log("appointment", that.demo3);
  },
  mounted() {
    let that = this;
  },
  updated() {},
  computed: {
    ...mapState(["appoDate", "userInfo"])
  },
  watch: {
    appoDate(newVal, oldVal) {
      console.log("appoDate", newVal, oldVal);
      this.gotoSuc(newVal);
      // this.test(newVal);
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
    changeAppoDate() {
      let that = this;
      that.formEleProp.searchVal.list = [];
      let params = {
        TXCODE: "ZZB009",
        wParam: decodeURIComponent(that.userInfo.wParam),
        PM_Sell_Ar_ID: this.PM_Sell_Ar_ID,
        PM_PD_ID: this.PM_PD_ID,
        Frcst_Rtrv_Dt: this.formEleProp.updateVal.list[2].default
      };
      that.changeAppoDateAsync(params);
    },
    getAppDateList() {
      this.formEleProp.updateVal.list[2].options2 = util.getAppDate(6, 30);
      console.log(this.formEleProp.updateVal.list[2].options2);
    },
    closeRadio() {
      this.formEleProp.updateVal.list[2].isRadio = false;
    },
    //获取附加码
    // getExtraCode() {
    //   snsitf
    //     .callPrivBankServiceByPost("SGF027", {})
    //     .then(res => {
    //       // console.log("附加码", res.data.steam);
    //       if (res.HEADER.retCode == "000000") {
    //         //  $("#extraImg").attr("src","data:image/png;base64," + res.data.steam);
    //         this.extraImg = "data:image/png;base64," + res.data.steam;
    //         this.formEleProp.production.list[2].btnObj.extraImg =
    //           "data:image/png;base64," + res.data.steam;
    //         console.log("data:image/png;base64," + res.data.steam);
    //         this.remark = res.data.REMARK;
    //       } else {
    //         this.errorMsg = res.HEADER.retmsg;
    //         this.errorCode = res.HEADER.retCode;
    //         this.$vux.toast.show({
    //           type: "text",
    //           text: this.errorMsg + "\n参考码：" + this.errorCode,
    //           width: "200px"
    //         });
    //         // Dialog.alert({
    //         //   title: "提示",
    //         //   message: this.errorMsg + "\n参考码：" + this.errorCode
    //         // }).then(() => {});
    //         //  this.$toast(res.HEADER.retmsg);
    //         return false;
    //       }
    //     })
    //     .catch(err => {
    //       this.$vux.toast.show({
    //         type: "text",
    //         position: "top",
    //         text: "SGF027请求失败"
    //       });
    //       // this.$toast("SGF027请求失败");
    //       console.log("SGF027" + " fail callback" + err);
    //     });
    // },
    toGetSMS(i, title) {
      console.log("toGetSMS", i, title);
      let _this = this;
      var myreg = /^(((11[0-9]{1})|(12[0-9]{1})|(13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
      if (this.formEleProp.searchVal.list[0].value.length == 0) {
        this.toastValue = "输入的手机号为空";
        this.showPositionValue = true;
        return false;
      } else if (this.formEleProp.searchVal.list[1].value.length < 11) {
        this.toastValue = "手机号长度有误";
        this.showPositionValue = true;
        return false;
      }
      // else if (!myreg.test(this.phoneNumber)) {
      //   this.toastValue = "手机号有误";
      //   this.showPositionValue = true;
      //   return false;
      // }
      else {
        if (this.isSend) {
          var second = 60;
          this.formEleProp.searchVal.list[i].btnObj.btnName =
            second + "s后重发";
          this.formEleProp.searchVal.list[i].btnObj.btnStyle =
            "border:none;color:#666;height:25px;line-height:25px;";
          this.isSend = false;
          this.formEleProp.searchVal.list[i].btnObj.btnDisabled = true;
          var that = this;
          var appCount = setInterval(function() {
            second -= 1;
            that.formEleProp.searchVal.list[i].btnObj.btnName =
              second + "s后重发";
            if (second < 1) {
              clearInterval(appCount);
              that.formEleProp.searchVal.list[i].btnObj.btnName = "点击获取";
              that.formEleProp.searchVal.list[i].btnObj.btnStyle =
                "border:none;color:#3966AE;height:25px;line-height:25px;";
              that.isSend = true;
              this.formEleProp.searchVal.list[i].btnObj.btnDisabled = true;
            }
          }, 1000);
        }
      }
    },
    btnSubmit() {
      if (this.buttonTxt === "下一步") {
        console.log("on btnNext");
      } else {
        console.log("on btnSubmit zzb009");
        this.changeAppoDate();
      }
    },
    gotoSuc(data) {
      this.$router.replace({
        name: "success",
        params: {
          appointTime: this.formEleProp.updateVal.list[2].default,
          netName: this.formEleProp.updateVal.list[3].value
        }
      });
    },
    toRecordQuery(value) {
      console.log(value);
      //点击“修改”或点击“点击这里，立即查询”
      // this.$router.push({
      //   name: "myAppointment",
      //   params: {
      //     PrdFlBil_ID: ""
      //   }
      // });
    },
    demo01_onIndexChange(index) {
      this.demo3 = index;
      console.log("demo01_onIndexChange", this.demo3);
      if (this.demo3 == "手机银行查询") {
        // this.getExtraCode();
      }
    },
    onChange(val) {
      console.log("on-change", val);
      this.results = val ? getResult(this.value) : [];
    },
    onFocus() {
      console.log("on Focus");
      // this.formEleProp.searchVal.customClass = true;
    },
    onCancel() {
      let that = this;
      console.log("on cancel");
    },
    onBlur() {
      console.log("on blur");
      // document.querySelector(".weui-search-bar__cancel-btn").trigger("click");
      // this.formEleProp.searchVal.customClass = false;
    },
    onEnter() {
      console.log("on Enter");
      // document.querySelector(".weui-search-bar__cancel-btn").trigger("click");
      // this.formEleProp.searchVal.customClass = false;
    },
    onShow() {
      console.log("on show");
    },
    onHide(type) {
      console.log("on hide", type);
    },
    onPickChange(val) {
      console.log("val change", val);
    },
    onClear() {
      console.log("on clear");
    },
    ...mapActions(["changeAppoDateAsync"])
  },
  components: {
    "ccb-input": () => import("@/components/packages/input/Index.vue"),
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
    PopupRadio,
    Toast
  },
  destroyed() {}
};
</script>
<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/center.less";
.appointment {
  background-color: #ffffff !important;
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
  .weui-cells_radio {
    background-color: #ffffff !important;
  }
  .button_btn {
    text-align: center;
    width: 70%;
    height: 35px;
    background: #ffffff;
    border: 0.01rem solid #23a8f5;
    border-radius: 25px;
    font-size: 14px;
    color: #23a8f5;
  }
}
</style>
<style lang="less">
.appointment {
  .weui-cells:before {
    border: none !important;
  }
  .weui-cells:after {
    border: none !important;
  }
}
.vux-popup-dialog {
  background-color: rgb(255, 255, 255) !important;
}
</style>

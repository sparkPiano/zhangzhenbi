<!--
 * @Description: payment
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-09 17:04:51
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-09 10:05:27
-->
<template>
  <div class="ccb-payment">
    <ccb-tab :formEleProp="formEleProp.tab" :formEle="formEle"></ccb-tab>
    <ccb-generic-form v-if="this.formEle.tabIndex === 0">
      <ccb-input
        :formEleProp="formEleProp.input1"
        :formEle="formEle"
        :labelWidth="labelWidth"
        :labelMarginRight="labelMarginRight"
        :labelAlign="labelAlign"
      >
        <template slot="savingsInput">
          <!-- <x-button
            type="default"
            mini
            plain
            @click.native="selectBindingAccount"
            >{{ depositBtnName }}</x-button
          > -->
          <ccb-button :btnObj="btnObjSet.obj2"></ccb-button>
        </template>
      </ccb-input>
      <ccb-input
        :formEleProp="formEleProp.input2"
        :formEle="formEle"
        :labelWidth="labelWidth"
        :labelMarginRight="labelMarginRight"
        :labelAlign="labelAlign"
      ></ccb-input>
    </ccb-generic-form>
    <ccb-generic-form v-else-if="this.formEle.tabIndex === 1">
      <ccb-input
        :formEleProp="formEleProp.input3"
        :formEle="formEle"
        :labelWidth="labelWidth"
        :labelMarginRight="labelMarginRight"
        :labelAlign="labelAlign"
      ></ccb-input>
      <ccb-input
        :formEleProp="formEleProp.input4"
        :formEle="formEle"
        :labelWidth="labelWidth"
        :labelMarginRight="labelMarginRight"
        :labelAlign="labelAlign"
      ></ccb-input>
      <ccb-input
        :formEleProp="formEleProp.input5"
        :formEle="formEle"
        :labelWidth="labelWidth"
        :labelMarginRight="labelMarginRight"
        :labelAlign="labelAlign"
      >
        <template slot="savingsInput">
          <!-- <ccb-button :btnObj="btnObjSet.obj3"></ccb-button> -->
          <div
            class="ccb-additionalCode"
            id="additional"
            @click="refreshAdditionalCode"
          ></div>
        </template>
      </ccb-input>
      <ccb-input
        :formEleProp="formEleProp.input6"
        :formEle="formEle"
        :labelWidth="labelWidth"
        :labelMarginRight="labelMarginRight"
        :labelAlign="labelAlign"
      >
        <template slot="savingsInput">
          <ccb-button :btnObj="btnObjSet.obj4"></ccb-button>
        </template>
      </ccb-input>
      <ccb-input
        :formEleProp="formEleProp.input7"
        :formEle="formEle"
        :labelWidth="labelWidth"
        :labelMarginRight="labelMarginRight"
        :labelAlign="labelAlign"
      >
        <template slot="savingsInput">
          <ccb-button :btnObj="btnObjSet.obj5"></ccb-button>
        </template>
      </ccb-input>
    </ccb-generic-form>
    <ccb-tips :header="header">
      <template slot="xContent">
        <div class="ccb-tips_content">
          <ul>
            <li>
              1、支付成功后，如需查询装帧普制币交易明细，可通过支付账号持有人的手机银行或者验证支付账号方式进行查询。
            </li>
            <li>
              2、如购买的装帧普制币提取方式为网点自提，需支付账号持有人本人携带身份证前往网点领取。
            </li>
          </ul>
        </div>
      </template>
    </ccb-tips>
    <div class="ccb-btn-container">
      <ccb-button :btnObj="btnObjSet.obj1" class="ccb-next"></ccb-button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mixin } from "@/mixins/mixin";
export default {
  name: "payment",
  mixins: [mixin],
  data() {
    return {
      labelWidth: "1rem",
      labelMarginRight: "0.05rem",
      labelAlign: "left",
      formEleProp: {
        tab: {
          lineWidth: 3,
          activeColor: "#3966ae",
          defaultColor: "",
          disabledColor: "",
          barActiveColor: "#3966ae",
          animate: true,
          customBarWidth: null,
          badgeLabel: "",
          badgeBg: "",
          badgeColor: "",
          preventDefault: true,
          scrollThreshold: 4,
          barPosition: "bottom",
          onBeforeIndexChange: this.onBeforeIndexChange,
          list: [
            {
              title: "账号支付",
              selected: true,
              disabled: false,
              badgeLabel: "",
              badgeColor: "",
              badgeBg: ""
            },
            {
              title: "手机银行支付",
              selected: false,
              disabled: false,
              badgeLabel: "",
              badgeColor: "",
              badgeBg: ""
            }
          ],
          itemBadgeLabel: "",
          itemBadgeBg: "",
          itemBadgeColor: "",
          onItemClick: this.onItemClick
        },
        input1: {
          xInputType: "text",
          xInputRequired: true,
          xInputTitle: "储蓄账号",
          xInputPlaceholder: "请输入",
          xInputShowClear: true,
          xInputDisabled: false,
          xInputReadonly: false,
          xInputPlaceholderAlign: "left",
          xInputTextAlign: "left",
          xInputShouldToastError: true,
          xInputBlur: this.onInputBlur,
          xInputFocus: this.onInputFocus,
          xInputEnter: this.onInputEnter,
          xInputChange: this.onInputChange,
          xInputClickErrIcon: this.inputClickErrIcon,
          xInputClickClearIcon: this.inputClickClearIcon,
          xInputSlotTitle: "input1",
          xInputRight: "savingsInput"
        },
        input2: {
          xInputType: "text",
          xInputRequired: true,
          xInputTitle: "证件号码",
          xInputPlaceholder: "证件号码后四位，不区分大小写",
          xInputShowClear: true,
          xInputDisabled: false,
          xInputReadonly: false,
          xInputPlaceholderAlign: "left",
          xInputTextAlign: "left",
          xInputShouldToastError: true,
          xInputBlur: this.onInputBlur1,
          xInputFocus: this.onInputFocus1,
          xInputEnter: this.onInputEnter1,
          xInputChange: this.onInputChange1,
          xInputClickErrIcon: this.inputClickErrIcon1,
          xInputClickClearIcon: this.inputClickClearIcon1,
          xInputSlotTitle: "input2"
        },
        input3: {
          xInputType: "text",
          xInputRequired: true,
          xInputTitle: "手机号码",
          xInputPlaceholder: "请输入手机号码",
          xInputShowClear: true,
          xInputDisabled: false,
          xInputReadonly: false,
          xInputPlaceholderAlign: "left",
          xInputTextAlign: "left",
          xInputBlur: () => console.log("input3 blur"),
          xInputFocus: () => console.log("input3 Focus"),
          xInputEnter: () => console.log("input3 Enter"),
          xInputChange: () => console.log("input3 Change"),
          xInputClickErrIcon: () => console.log("input3 ErrIcon"),
          xInputClickClearIcon: () => console.log("input3 ClearIcon"),
          xInputSlotTitle: "input3"
        },
        input4: {
          xInputType: "text",
          xInputRequired: true,
          xInputTitle: "证件号码",
          xInputPlaceholder: "证件号码后四位，不区分大小写",
          xInputShowClear: true,
          xInputDisabled: false,
          xInputReadonly: false,
          xInputPlaceholderAlign: "left",
          xInputTextAlign: "left",
          xInputShouldToastError: true,
          xInputBlur: () => console.log("input4 blur"),
          xInputFocus: () => console.log("input4 Focus"),
          xInputEnter: () => console.log("input4 Enter"),
          xInputChange: () => console.log("input4 Change"),
          xInputClickErrIcon: () => console.log("input4 ErrIcon"),
          xInputClickClearIcon: () => console.log("input4 ClearIcon"),
          xInputSlotTitle: "input4",
          xInputRightFullHeight: "savingsInput"
        },
        input5: {
          xInputType: "text",
          xInputRequired: true,
          xInputTitle: "附加码",
          xInputPlaceholder: "请输入附加码",
          xInputShowClear: true,
          xInputDisabled: false,
          xInputReadonly: false,
          xInputPlaceholderAlign: "left",
          xInputTextAlign: "left",
          xInputShouldToastError: true,
          xInputBlur: () => console.log("input5 blur"),
          xInputFocus: () => console.log("input5 Focus"),
          xInputEnter: () => console.log("input5 Enter"),
          xInputChange: this.verifyAdditionalCode,
          xInputClickErrIcon: () => console.log("input5 ErrIcon"),
          xInputClickClearIcon: () => console.log("input5 ClearIcon"),
          xInputSlotTitle: "input5",
          xInputRight: "savingsInput"
        },
        input6: {
          xInputType: "text",
          xInputRequired: true,
          xInputTitle: "短信验证码",
          xInputPlaceholder: "请输入短信验证码",
          xInputShowClear: true,
          xInputDisabled: false,
          xInputReadonly: false,
          xInputPlaceholderAlign: "left",
          xInputTextAlign: "left",
          xInputShouldToastError: true,
          xInputBlur: () => console.log("input6 blur"),
          xInputFocus: () => console.log("input6 Focus"),
          xInputEnter: () => console.log("input6 Enter"),
          xInputChange: () => console.log("input6 Change"),
          xInputClickErrIcon: () => console.log("input6 ErrIcon"),
          xInputClickClearIcon: () => console.log("input6 ClearIcon"),
          xInputSlotTitle: "input6",
          xInputRight: "savingsInput"
        },
        input7: {
          xInputType: "text",
          xInputRequired: true,
          xInputTitle: "登录密码",
          xInputPlaceholder: "请输入登录密码",
          xInputShowClear: true,
          xInputDisabled: false,
          xInputReadonly: false,
          xInputPlaceholderAlign: "left",
          xInputTextAlign: "left",
          xInputShouldToastError: true,
          xInputBlur: () => console.log("input7 blur"),
          xInputFocus: () => console.log("input7 Focus"),
          xInputEnter: () => console.log("input7 Enter"),
          xInputChange: () => console.log("input7 Change"),
          xInputClickErrIcon: () => console.log("input7 ErrIcon"),
          xInputClickClearIcon: () => console.log("input7 ClearIcon"),
          xInputSlotTitle: "input7",
          xInputRight: "savingsInput"
        }
      },
      formEle: {
        tabIndex: 0,
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
        input7: ""
      },
      header: {
        title: "温馨提示"
      },
      btnObjSet: {
        obj1: {
          clickBtnEvent: this.clickBtnEvent,
          btnType: "default",
          btnMini: false,
          btnPlain: true,
          btnName: "下一步"
        },
        obj2: {
          clickBtnEvent: this.selectBindingAccount,
          btnType: "default",
          btnMini: true,
          btnPlain: true,
          btnName: "选择绑定账户",
          btnDisabled: false
        },
        obj3: {
          clickBtnEvent: this.getSmsCode,
          btnType: "default",
          btnMini: true,
          btnPlain: true,
          btnName: "点击获取"
        },
        obj4: {
          clickBtnEvent: this.getSmsCode,
          btnType: "default",
          btnMini: true,
          btnPlain: true,
          btnName: "点击获取"
        },
        obj5: {
          clickBtnEvent: this.forgetPWD,
          btnType: "default",
          btnMini: true,
          btnPlain: true,
          btnName: "遗忘密码"
        }
      },
      verifyCodeObj: null
    };
  },
  created() {
    let that = this;
    let aPay = that.$general.getCache("aPay")
      ? JSON.parse(that.$general.getCache("aPay"))
      : null;
    let mPay = that.$general.getCache("mPay")
      ? JSON.parse(that.$general.getCache("mPay"))
      : null;
    if (aPay) {
      that.formEle.input1 = aPay.input1;
      that.formEle.input2 = aPay.input2;
    }
    if (mPay) {
      that.formEle.input3 = aPay.input3;
      that.formEle.input3 = aPay.input3;
    }
    if (that.userInfo.BIND_FLAG == "4") {
      that.btnObjSet.obj2.btnDisabled = true;
    }
  },
  mounted() {
    let that = this;
  },
  computed: {
    ...mapState(["purchasingDetail", "userInfo"])
  },
  updated() {
    let that = this;
    if (that.formEle.tabIndex === 1) {
      that.$nextTick(() => {
        const options = {
          id: "additional",
          type: "blend",
          width: "80", // 默认canvas宽度
          height: "40" // 默认canvas高度
        };
        console.log("333", that);
        const verifyCodeObj = new that.$verifyCode(options);
        that.verifyCodeObj = verifyCodeObj;
      });
    }
  },
  watch: {},
  destroyed() {},
  methods: {
    onBeforeIndexChange(index) {
      let that = this;
      console.log("on-before-index-change", index);
      that.$vux.loading.show({
        text: "loading"
      });
      setTimeout(() => {
        that.$vux.loading.hide();
        that.formEle.tabIndex = index;
      }, 1000);
    },
    onItemClick(val) {
      console.log("onItemClick", val);
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
      console.log("change", this.formEle.input1);
    },
    inputClickErrIcon(error) {
      console.log("errIcon", error);
    },
    inputClickClearIcon() {
      console.log("clearIcon");
    },
    onInputBlur1(val, $event) {
      console.log("blur", val, $event);
    },
    onInputFocus1(val, $event) {
      console.log("focus", val, $event);
    },
    onInputEnter1(val, $event) {
      console.log("enter", val, $event);
    },
    onInputChange1(val) {
      console.log("change", val);
      // this.formEle.ccbInput = val;
      console.log("change", this.formEle.input2);
    },
    inputClickErrIcon1(error) {
      console.log("errIcon", error);
    },
    inputClickClearIcon1() {
      console.log("clearIcon");
    },
    selectBindingAccount($e) {
      console.log("selectBindingAccount", $e);
    },
    getSmsCode($e) {
      console.log("getSmsCode", $e);
    },
    forgetPWD($e) {
      console.log("forgetPWD", $e);
    },
    clickBtnEvent() {
      let that = this;
      console.log("clickBtnEvent");
      if (that.formEle.tabIndex == 0) {
        that.$general.setCache(
          "aPay",
          JSON.stringify({
            input1: that.formEle.input1,
            input2: that.formEle.input2
          })
        );
        if (that.formEle.input1 && that.formEle.input2) {
          that.$router.push({
            name: "paymentDetail"
          });
        } else {
          that.$vux.toast.show({
            text: "请确认信息是否填写完整",
            position: "middle",
            type: "text",
            width: "3rem"
          });
        }
      } else {
        that.$general.setCache(
          "mPay",
          JSON.stringify({
            input3: that.formEle.input3,
            input4: that.formEle.input4
          })
        );
        if (
          that.formEle.input3 &&
          that.formEle.input4 &&
          that.formEle.input5 &&
          that.formEle.input6 &&
          that.formEle.input7
        ) {
          that.$router.push({
            name: "paymentDetail"
          });
        } else {
          that.$vux.toast.show({
            text: "请确认信息是否填写完整",
            position: "middle",
            type: "text",
            width: "3rem"
          });
        }
      }
    },
    refreshAdditionalCode() {
      //初始化验证码
      let that = this;
      that.verifyCodeObj.refresh();
    },
    verifyAdditionalCode() {
      let that = this;
      const res = that.verifyCodeObj.validate(that.formEle.input5);
      if (res) {
        that.$vux.toast.show({
          text: "验证通过"
        });
      } else {
        that.$vux.toast.show({
          text: "验证码错误"
        });
      }
    }
  },
  components: {
    "ccb-tab": () => import("@/components/packages/tab/Index.vue"),
    "ccb-generic-form": () =>
      import("@/components/packages/genericForm/Index.vue"),
    "ccb-input": () => import("@/components/packages/genericForm/CcbInput.vue"),
    "ccb-tips": () => import("@/components/packages/tips/Index.vue"),
    "ccb-button": () =>
      import("@/components/packages/genericForm/CcbButton.vue")
  }
};
</script>
<style lang="less" scoped>
.ccb-payment {
  .weui-cell__ft {
    color: #3966ae !important;
  }
  .ccb-btn-container {
    padding: 10px 30px;
    padding-top: 130px;
    font-size: 18px;
    background-color: #ffffff;
  }
  .ccb-button.ccb-next {
    border-width: 1px !important;
    font-size: 18px !important;
    border-radius: 100px !important;
  }
  .ccb-tips_content {
    ul {
      list-style: none;
    }
  }
  .ccb-input {
    .weui-cell__ft {
      .ccb-button {
        border: 0 !important;
        padding: 0 !important;
      }
    }
  }
}
.ccb-additionalCode {
  display: inline-block;
  vertical-align: middle;
}
</style>

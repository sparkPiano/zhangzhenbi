<!--
 * @Description: payment-detail
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-16 15:20:10
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-09 10:05:55
-->
<template>
  <div class="ccb-payment-detail">
    <ccb-generic-form class="ccb-product_list">
      <template v-if="cellList.list && cellList.list.length">
        <ccb-cell
          v-for="(item, index) in cellList.list"
          :formEleProp="item"
          :key="index"
        >
          <template slot="cellContent">
            <div class="ccb-cell-content_desc">
              <div class="ccb-cell-receiver">{{ item.title }}</div>
              <div class="ccb-cell-contractMobile">
                套内数量：{{ item.numbers }}{{ item.numUnit }}
              </div>
              <!-- <div class="ccb-cell-shippingDddress">
                {{ `${item.price}元/${item.unit}` }}
              </div> -->
              <div class="ccb-cell-numbers">{{ `x ${item.singleNum}` }}</div>
            </div>
          </template>
          <!-- <template slot="imgIcon">
            <span><i class="iconfont icon-dingwei1"></i></span>
          </template> -->
          <template slot="cellTitle">
            <div class="ccb-cell-title">
              <img :src="item.img" alt="" />
            </div>
          </template>
        </ccb-cell>
      </template>
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
          <ccb-button :btnObj="btnObjSet.obj1"
            ><template slot="rightText"
              >{{ `${btnObjSet.obj1.btnName}${countdown.show ? "(" : ""}`
              }}<countdown
                v-model="countdown.time"
                @on-finish="countdown.finish"
                :start="countdown.start"
                v-show="countdown.show"
              ></countdown
              >{{ countdown.show ? ")" : "" }}</template
            ></ccb-button
          >
        </template>
      </ccb-input>
      <div class="ccb-sms-tips" v-show="isShowTips">
        <span>已向您139****0953的手机发送验证码</span>
      </div>
    </ccb-generic-form>
    <div class="ccb-btn-container">
      <ccb-button :btnObj="btnObjSet.obj2" class="ccb-next"></ccb-button>
    </div>
  </div>
</template>
<script>
import { Countdown } from "vux";
import { mapState } from "vuex";
import { mixin } from "@/mixins/mixin";
export default {
  name: "payment-detail",
  mixins: [mixin],
  data() {
    return {
      labelWidth: "1rem",
      labelMarginRight: "0.05rem",
      labelAlign: "left",
      isShowTips: false,
      formEleProp: {
        input1: {
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
          xInputBlur: this.onInputBlur,
          xInputFocus: this.onInputFocus,
          xInputEnter: this.onInputEnter,
          xInputChange: this.onInputChange,
          xInputClickErrIcon: this.inputClickErrIcon,
          xInputClickClearIcon: this.inputClickClearIcon,
          xInputSlotTitle: "input1",
          xInputRight: "savingsInput"
        }
      },
      formEle: {
        input1: ""
      },
      cellList: {
        list: []
      },
      btnObjSet: {
        obj1: {
          clickBtnEvent: this.getSMSCode,
          btnType: "default",
          btnMini: true,
          btnPlain: true,
          btnName: "点击获取"
        },
        obj2: {
          clickBtnEvent: this.confirmInfo,
          btnType: "default",
          btnMini: false,
          btnPlain: true,
          btnName: "确定"
        }
      },
      countdown: {
        time: 60,
        start: false,
        show: false,
        finish: this.onFinish
      }
    };
  },
  created() {
    this.cellList.list = this.cellList.list.concat(this.purchasingDetail);
  },
  mounted() {
    let that = this;
  },
  updated() {},
  computed: {
    ...mapState(["purchasingDetail"])
  },
  watch: {},
  destroyed() {},
  methods: {
    getSMSCode() {
      console.log("getSMSCode");
      this.countdown.start = true;
      this.countdown.show = true;
      this.btnObjSet.obj1.btnName = "重新获取";
      this.isShowTips = true;
    },
    confirmInfo() {
      let that = this;
      console.log("confirmInfo");
      that.$router.push({
        name: "paymentSuccess"
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
      console.log("change", this.formEle.input1);
    },
    inputClickErrIcon(error) {
      console.log("errIcon", error);
    },
    inputClickClearIcon() {
      console.log("clearIcon");
    },
    onFinish(index) {
      console.log("current index", index);
      this.countdown.time = 60;
      this.countdown.start = false;
      this.countdown.show = false;
      this.isShowTips = false;
    }
  },
  components: {
    "ccb-generic-form": () =>
      import("@/components/packages/genericForm/Index.vue"),
    "ccb-cell": () => import("@/components/packages/genericForm/CcbCell.vue"),
    "ccb-input": () => import("@/components/packages/genericForm/CcbInput.vue"),
    "ccb-button": () =>
      import("@/components/packages/genericForm/CcbButton.vue"),
    Countdown
  }
};
</script>
<style lang="less" scoped>
.ccb-product_list {
  .weui-cells {
    &::before {
      height: 0 !important;
      border-top: 0 !important;
    }
  }
  .ccb-cell-title {
    width: 120px;
    max-height: 100px;
    height: 75px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .weui-cell__ft {
    // align-self: center !important;
    position: relative !important;
  }
  .vux-cell-primary {
    margin-left: -20px !important;
  }
}
.ccb-cell-numbers {
  position: absolute;
  right: 0;
  bottom: 0;
}
.ccb-sms-tips {
  padding: 10px 15px;
  font-size: 14px;
  background-color: #ffffff;
  position: relative;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #d9d9d9;
    color: #d9d9d9;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
.vux-x-input {
  margin-top: 6px;
  .weui-cell__ft {
    .ccb-button {
      border: 0;
      padding: 0;
    }
  }
}
.ccb-btn-container {
  padding: 10px 30px;
  padding-top: 320px;
  font-size: 18px;
  background-color: #ffffff;
}
.ccb-button.ccb-next {
  border-width: 1px;
  font-size: 18px;
  border-radius: 100px;
}
</style>

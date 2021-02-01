<!--
 * @Description: ccb-cart-detail
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-11 09:17:55
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-09 10:29:54
-->
<template>
  <div class="ccb-cart-detail">
    <group @click.native="formEleProp.selectAddress" v-if="isShowCell1">
      <template v-if="!this.$slots.cell1">
        <ccb-cell :formEleProp="formEleProp">
          <template slot="cellContent">
            <slot name="cellContent"></slot>
          </template>
          <template slot="imgIcon">
            <slot name="imgIcon"></slot>
          </template>
          <template slot="cellInlineDesc">
            <slot name="cellInlineDesc"></slot>
          </template>
          <template slot="cellTitle">
            <slot name="cellTitle"></slot>
          </template>
        </ccb-cell>
      </template>
      <slot name="cell1"></slot>
    </group>
    <div class="ccb-address_save" v-if="isShowAddress">
      <div class="ccb-form" v-if="!this.$slots.address">
        <input
          class="ccb-input"
          id="address"
          type="checkbox"
          :value="formEle.addressStatus"
          v-model="formEle.addressStatus"
          @change="formEleProp.onChangeAddress"
        />
        <label for="ccbInput" class="ccb-label">{{
          formEleProp.addressLabel
        }}</label>
      </div>
      <slot name="address"></slot>
    </div>
    <div class="ccb-divider" v-if="isShowDivider">
      <div class="cbb-divider_line" v-if="!this.$slots.divider">
        <div
          v-for="i in lineToEnd"
          :key="i"
          :class="{ 'ccb-odd': i % 2 > 0, 'ccb-even': i % 2 <= 0 }"
        ></div>
      </div>
      <slot name="divider"></slot>
    </div>
    <group class="ccb-product_list">
      <template
        v-if="!this.$slots.cell2 && formEleProp.list && formEleProp.list.length"
      >
        <ccb-cell
          v-for="(item, index) in formEleProp.list"
          :formEleProp="item"
          :key="index"
        >
          <template slot="cellContent">
            <div class="ccb-cell-content_desc">
              <div class="ccb-cell-receiver">{{ item.title }}</div>
              <div class="ccb-cell-contractMobile">
                套内数量：{{ item.numbers }}{{ item.numUnit }}
              </div>
              <div class="ccb-cell-shippingDddress">
                {{ `${item.price}元/${item.unit}` }}
              </div>
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
      <slot name="cell2"></slot>
    </group>
    <div class="ccb-purchasing-info">
      <ccb-form-preview
        :isUseGroupStyle="isUseGroupStyle"
        :normalPreview="normalPreview"
        v-if="!this.$slots.purchasingInfo"
      ></ccb-form-preview>
      <slot name="purchasingInfo"></slot>
    </div>
    <div class="ccb-tiqu-info">
      <group v-if="isShowTiQuInfo">
        <ccb-cell
          :formEleProp="formElePropOne"
          :labelWidth="labelWidth"
          :labelMarginRight="labelMarginRight"
          :labelAlign="labelAlign"
          v-if="!this.$slots.cell3"
        >
          <template slot="cellContent">
            {{ formElePropOne.managerNo }}
          </template>
          <template slot="cellTitle">
            {{ formElePropOne.managerName }}
          </template>
        </ccb-cell>
        <slot name="cell3"></slot>
      </group>
      <group v-else>
        <template v-if="!this.$slots.cell3">
          <ccb-address
            :formEleProp="formElePropOne.area"
            :formEle="formEle"
            :labelWidth="labelWidth"
            :labelMarginRight="labelMarginRight"
            :labelAlign="labelAlign"
          ></ccb-address>
          <ccb-popup-picker
            :formEleProp="formElePropOne.net"
            :formEle="formEle"
            :labelWidth="labelWidth"
            :labelMarginRight="labelMarginRight"
            :labelAlign="labelAlign"
          >
          </ccb-popup-picker>
          <ccb-datetime
            :formEleProp="formElePropOne.date"
            :formEle="formEle"
            :labelWidth="labelWidth"
            :labelMarginRight="labelMarginRight"
            :labelAlign="labelAlign"
          >
          </ccb-datetime>
          <ccb-input
            :formEleProp="formElePropOne.mgInput"
            :formEle="formEle"
            :labelWidth="labelWidth"
            :labelMarginRight="labelMarginRight"
            :labelAlign="labelAlign"
          ></ccb-input>
        </template>
        <slot name="cell3"></slot>
      </group>
    </div>
    <div class="ccb-agree">
      <div class="ccb-form">
        <input
          class="ccb-input"
          id="agree"
          type="checkbox"
          :value="formEle.agreeStatus"
          v-model="formEle.agreeStatus"
          @change="formEleProp.onChangeAgree"
        />
        <label for="ccbInput" class="ccb-label">{{
          formEleProp.agreeLabel
        }}</label>
        <div class="ccb-agreement">
          <a href="javascript:" @click="formEleProp.openAgreement">{{
            `《${formEleProp.agreement}》`
          }}</a>
        </div>
      </div>
      <slot name="agree"></slot>
    </div>
    <div class="ccb-btn">
      <x-button
        v-if="!this.$slots.rightBtn"
        :type="rightBtn.btnType"
        :mini="rightBtn.btnMini"
        :plain="rightBtn.btnPlain"
        :disabled="rightBtn.btnDisabled"
        :text="rightBtn.btnName"
        :link="rightBtn.btnLink"
        :gradients="rightBtn.btnGradients"
        :action-type="rightBtn.btnActionType"
        :show-loading="rightBtn.btnShowLoading"
        @click.native="rightBtn.confirmInfo"
      >
        <template v-if="!this.$slots.rightText">
          <i
            class="iconfont"
            :class="rightBtn.iconClass"
            v-if="rightBtn.iconClass"
          ></i>
          <span class="ccb-btn_text">{{ rightBtn.btnName }}</span>
        </template>
        <slot name="rightText"></slot>
      </x-button>
      <slot name="rightBtn"></slot>
    </div>
  </div>
</template>
<script>
import { XButton } from "vux";
export default {
  name: "ccb-cart-detail",
  data() {
    return {
      lineToEnd: 0,
      screenWidth: 0
    };
  },
  props: {
    labelWidth: {
      type: String
    },
    labelAlign: {
      type: String
    },
    labelMarginRight: {
      type: String
    },
    isUseGroupStyle: {
      type: Boolean,
      default: false
    },
    normalPreview: {
      type: Object,
      default: () => ({
        bodyItems: [],
        footerBtns: []
      })
    },
    formElePropOne: {
      type: Object,
      default: () => ({})
    },
    formEleProp: {
      type: Object,
      default: () => ({})
    },
    formEle: {
      type: Object,
      default: () => ({})
    },
    isShowCell1: {
      type: Boolean,
      default: true
    },
    isShowAddress: {
      type: Boolean,
      default: true
    },
    isShowDivider: {
      type: Boolean,
      default: true
    },
    rightBtn: {
      type: Object,
      default: () => ({})
    },
    isShowTiQuInfo: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    let that = this;
    that.screenWidth =
      document.body.clientWidth || document.documentElement.clientWidth;
    that.lineToEnd = Math.ceil(that.screenWidth / 24);
  },
  watch: {
    "formEle.addressStatus": {
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          console.log(
            "addressStatus11",
            document.querySelector("#address").value
          );
        });
      },
      deep: true
    },
    "formEle.agreeStatus": {
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          console.log("agreeStatus333", document.querySelector("#agree").value);
        });
      },
      deep: true
    }
  },
  methods: {},
  components: {
    XButton,
    "ccb-cell": () => import("@/components/packages/genericForm/CcbCell.vue"),
    "ccb-form-preview": () =>
      import("@/components/packages/genericForm/CcbFormPreview.vue"),
    "ccb-address": () =>
      import("@/components/packages/genericForm/CcbAddress.vue"),
    "ccb-datetime": () =>
      import("@/components/packages/genericForm/CcbDatetime.vue"),
    "ccb-popup-picker": () =>
      import("@/components/packages/genericForm/CcbPopupPicker.vue"),
    "ccb-input": () => import("@/components/packages/genericForm/CcbInput.vue")
  }
};
</script>
<style lang="less" scoped>
.ccb-divider {
  padding: 0 10px;
  background-color: #ffffff;
  .cbb-divider_line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      flex: 0 1 auto;
      height: 6px;
      width: 24px;
      clip-path: polygon(21% 0, 100% 0, 79% 100%, 0 100%);
    }
    div.ccb-odd {
      background-color: rgb(254, 129, 88);
    }
    div.ccb-even {
      background-color: rgb(141, 209, 251);
    }
  }
}
.ccb-address_save,
.ccb-agree {
  font-size: 14px;
  background-color: #ffffff;
  .ccb-form {
    text-align: left;
    font-size: 14px;
    input,
    label {
      display: inline-block;
      vertical-align: middle;
      line-height: 20px;
    }
    input {
      width: 20px;
      height: 20px;
      &:checked {
        background-color: #ffffff;
      }
    }
  }
  .ccb-agreement {
    a {
      color: rgb(20, 107, 183);
    }
  }
}
.ccb-address_save {
  padding: 10px 35px;
}
.ccb-agree {
  padding: 15px;
}
// .ccb-product_list {
//   .weui-cells {
//     &::before {
//       height: 0 !important;
//       border-top: 0 !important;
//     }
//   }
//   .ccb-cell-title {
//     width: 120px;
//     max-height: 100px;
//     height: 75px;
//     img {
//       width: 100%;
//       height: 100%;
//     }
//   }
//   .weui-cell__ft {
//     align-self: center !important;
//     position: relative;
//   }
//   .vux-cell-primary {
//     margin-left: -10px !important;
//   }
// }
.ccb-cell-numbers {
  position: absolute;
  right: 0;
  bottom: 0;
}

// .ccb-tiqu-info {
//   margin: 10px 0;
//   .vux-cell-primary {
//     margin-left: -10px !important;
//     flex: 3 !important;
//   }
//   .ccb-cell-content {
//     margin-left: 20px !important;
//     text-align: left !important;
//   }
//   .ccb-cell .weui-cell__ft {
//     margin-right: 140px !important;
//   }
//   .ccb-address {
//     .weui-cell__ft {
//       flex: 1 !important;
//     }
//   }
//   .ccb-poopup-picker {
//     .weui-cell__ft {
//       flex: 1 !important;
//     }
//   }
//   .ccb-datetime {
//     .weui-cell__ft {
//       flex: 1 !important;
//     }
//   }
// }

// .ccb-purchasing-info {
//   .weui-form-preview__hd {
//     height: 0 !important;
//     line-height: 0 !important;
//     padding: 0 !important;
//   }
//   .weui-form-preview__value {
//     text-align: left !important;
//   }
// }
.ccb-btn {
  background-color: #ffffff;
  padding: 30px 35px;
  button.weui-btn,
  input.weui-btn {
    width: 100% !important;
    display: block !important;
    border-radius: 30px !important;
    height: 50px !important;
    font-size: 18px !important;
    line-height: 50px !important;
  }
}
</style>

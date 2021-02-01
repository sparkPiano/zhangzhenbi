<!--
 * @Description: ccb-add-to-cart
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-10 16:13:08
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-20 11:01:43
-->
<template>
  <div class="ccb-add-to-cart">
    <template v-if="!this.$slots.cart">
      <group class="ccb-cart_number">
        <ccb-number
          :formEleProp="formEleProp"
          :formEle="formEle"
          @change-number="onChangeToNumber"
          v-if="!this.$slots.cartNum"
        ></ccb-number>
        <slot name="cartNum" v-else></slot>
      </group>
      <div class="ccb-cart_btn" v-if="!this.$slots.cartBtn">
        <x-button
          v-if="!this.$slots.leftBtn"
          :type="leftBtn.btnType"
          :mini="leftBtn.btnMini"
          :plain="leftBtn.btnPlain"
          :disabled="leftBtn.btnDisabled"
          :text="leftBtn.btnName"
          :link="leftBtn.btnLink"
          :gradients="leftBtn.btnGradients"
          :action-type="leftBtn.btnActionType"
          :show-loading="leftBtn.btnShowLoading"
          @click.native="leftBtn.addToCart"
        >
          <template v-if="!this.$slots.leftText">
            <i
              class="iconfont"
              :class="leftBtn.iconClass"
              v-if="leftBtn.iconClass"
            ></i>
            <span class="ccb-cart_btn__text">{{ leftBtn.btnName }}</span>
          </template>
          <slot name="leftText"></slot>
        </x-button>
        <slot name="leftBtn" v-else></slot>

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
          @click.native="rightBtn.purchase"
        >
          <template v-if="!this.$slots.rightText">
            <i
              class="iconfont"
              :class="rightBtn.iconClass"
              v-if="rightBtn.iconClass"
            ></i>
            <span class="ccb-cart_btn__text">{{ rightBtn.btnName }}</span>
          </template>
          <slot name="rightText"></slot>
        </x-button>
        <slot name="rightBtn" v-else></slot>
      </div>
      <slot name="cartBtn" v-else></slot>
    </template>
    <slot name="cart" v-else></slot>
  </div>
</template>
<script>
import { XButton } from "vux";
export default {
  name: "ccb-add-to-cart",
  data() {
    return {};
  },
  props: {
    formEleProp: {
      type: Object,
      default: () => ({})
    },
    formEle: {
      type: Object,
      default: () => ({})
    },
    leftBtn: {
      type: Object,
      default: () => ({})
    },
    rightBtn: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    console.log("formEleProp---formEle", this.formEleProp, this.formEle);
  },
  methods: {
    onChangeToNumber(val, $e) {
      console.log("onChangeToNumber66666", val, this.formEle.cartNumber);
      this.$emit("change-number", val, $e);
    }
  },
  components: {
    XButton,
    "ccb-number": () =>
      import("@/components/packages/genericForm/CcbNumber.vue")
  }
};
</script>
<style lang="less" scoped></style>

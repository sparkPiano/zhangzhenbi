<!--
 * @Description: ccb-button
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-10 16:32:29
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-30 17:02:55
-->
<template>
  <x-button
    class="ccb-button"
    v-if="!this.$slots.rightBtn"
    @click.native="btnObj.clickBtnEvent(objVal)"
    :type="btnObj.btnType"
    :mini="btnObj.btnMini"
    :plain="btnObj.btnPlain"
    :disabled="btnObj.btnDisabled"
    :text="btnObj.btnName"
    :link="btnObj.btnLink"
    :gradients="btnObj.btnGradients"
    :action-type="btnObj.btnActionType"
    :show-loading="btnObj.btnShowLoading"
  >
    <template v-if="!this.$slots.rightText"
      ><i class="iconfont" :class="btnObj.icon" v-if="btnObj.icon"></i
      ><img :src="btnObj.img" alt="" v-else />{{ btnObj.btnName }}</template
    >
    <slot name="rightText"></slot>
  </x-button>
</template>
<script>
import { XButton } from "vux";
export default {
  name: "ccb-button",
  data() {
    return {};
  },
  props: {
    btnObj: {
      type: Object,
      default: () => ({})
    },
    objVal: {
      type: [Object, String]
    }
  },
  methods: {},
  components: {
    XButton
  }
};
</script>
<style lang="less" scoped>
.ccb-button {
  background-color: #ffffff;
  border-width: 0;
  font-size: 14px;
  border: 1px solid #3966ae;
  color: #3966ae;
}
</style>

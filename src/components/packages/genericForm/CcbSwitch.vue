<!--
 * @Description: ccb-switch
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 16:05:53
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-03 11:04:41
-->
<template>
  <x-switch
    class="ccb-switch"
    :title="formEleProp.xSwitchTitle"
    :disabled="formEleProp.xSwitchDisabled"
    :inline-desc="formEleProp.xSwitchInlineDesc"
    :prevent-default="formEleProp.xSwitchPreventDefault"
    :value-map="formEleProp.xSwitchValMap"
    @on-change="formEleProp.xSwitchChange"
    @on-click="formEleProp.xSwitchClick"
    v-model="formEle[formEleProp.xSwitchSlotTitle]"
  ></x-switch>
</template>

<script>
import { XSwitch } from "vux";
export default {
  name: "ccb-switch",
  props: {
    formEleProp: {
      type: Object,
      default: () => ({})
    },
    formEle: {
      type: Object,
      default: () => ({})
    },
    labelWidth: {
      type: String
    },
    labelAlign: {
      type: String
    },
    labelMarginRight: {
      type: String
    }
  },
  methods: {},
  components: {
    XSwitch
  }
};
</script>
<style lang="less" scoped>
.ccb-switch {
  /deep/ .weui-cell__bd {
    font-size: 14px;
  }
}
</style>

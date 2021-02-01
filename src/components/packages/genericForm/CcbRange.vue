<!--
 * @Description: ccb-range
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 16:04:41
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-13 20:27:53
-->
<template>
  <range
    :decimal="formEleProp.rangeDecimal"
    :min="formEleProp.rangeMin"
    :max="formEleProp.rangeMax"
    :step="formEleProp.rangeStep"
    :disabled="formEleProp.rangeDisabled"
    :minHTML="formEleProp.rangeMinHtml"
    :maxHTML="formEleProp.rangeMaxHtml"
    :disabled-opacity="formEleProp.rangeDisabledOpacity"
    :rangeBarHeight="formEleProp.rangeBarHeight"
    @on-change="formEleProp.rangeChange"
    @on-touchstart="formEleProp.rangeTouchStart"
    @on-touchend="formEleProp.rangeTouchEnd"
    v-model="formEle[formEleProp.rangeSlotTitle]"
  ></range>
</template>

<script>
import { Range } from "vux";
export default {
  name: "ccb-range",
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
    Range
  }
};
</script>
<style lang="less" scoped></style>

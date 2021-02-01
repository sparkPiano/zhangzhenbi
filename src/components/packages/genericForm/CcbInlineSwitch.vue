<!--
 * @Description: ccb-inline-calendar
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-17 15:35:22
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-17 16:04:58
-->

<template>
  <inline-x-switch
    :disabled="formEleProp.disabled"
    :value-map="formEleProp.valueMap"
    @on-change="formEleProp.onChange"
    v-model="formEleProp[switchSlotTitle]"
  ></inline-x-switch>
</template>
<script>
import { InlineCalendar } from "vux";
export default {
  name: "ccb-inline-calendar",
  props: {
    formEleProp: {
      type: Object,
      default: () => ({})
    },
    formEle: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {},
  components: {
    InlineCalendar
  }
};
</script>
<style lang="less" scoped></style>

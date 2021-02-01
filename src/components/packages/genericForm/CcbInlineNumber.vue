<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-17 15:35:08
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-17 16:03:45
-->
<!--
 * @Description: ccb-inline-calendar
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-17 15:35:22
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-17 15:37:56
-->

<template>
  <inline-x-number
    :width="formEleProp.width"
    :button-style="formEleProp.round"
    :min="formEleProp.min"
    :max="formEleProp.max"
    v-model="formEle[formEleProp.numberSlotTitle]"
  ></inline-x-number>
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

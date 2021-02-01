<!--
 * @Description: ccb-calendar
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 15:37:11
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-13 20:22:51
-->
<template>
  <calendar
    :title="formEleProp.calendarTitle"
    :placeholder="formEleProp.calendarPlaceholder"
    :show-popup-header="formEleProp.calendarPopHeader"
    :popup-header-title="formEleProp.calendarPopHeaderTitle"
    :display-format="formEleProp.calendarFormat"
    :readonly="formEleProp.calendarReadonly"
    :disable-past="formEleProp.calendarDdisablePast"
    :disable-future="formEleProp.calendarDisableFuture"
    @on-change="formEleProp.calendarChange"
    @on-show="formEleProp.calendarShow"
    @on-hide="formEleProp.calendarHide"
    v-model="formEle[formEleProp.calendarSlotTitle]"
  ></calendar>
</template>

<script>
import { Calendar } from "vux";
export default {
  name: "ccb-calendar",
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
    Calendar
  }
};
</script>
<style lang="less" scoped>
.vux-calendar {
  font-size: 14px;
  .weui-cell {
    font-size: 14px;
  }
}
</style>

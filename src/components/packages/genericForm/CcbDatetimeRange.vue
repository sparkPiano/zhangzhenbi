<!--
 * @Description: ccb-datetime-range
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 16:03:15
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-13 20:26:32
-->
<template>
  <datetime-range
    :title="formEleProp.datetimeRangeTitle"
    :inline-desc="formEleProp.datetimeRangeInlineDesc"
    :placeholder="formEleProp.datetimeRangePlaceholder"
    :start-date="formEleProp.datetimeRangeStartdate"
    :end-date="formEleProp.datetimeRangeEnddate"
    :format="formEleProp.datetimeRangeFormat"
    @on-change="formEleProp.datetimeRangeChange"
    v-model="formEle[formEleProp.datetimeRangeSlotTitle]"
  ></datetime-range>
</template>

<script>
import { DatetimeRange } from "vux";
export default {
  name: "ccb-datetime-range",
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
    DatetimeRange
  }
};
</script>
<style lang="less" scoped></style>

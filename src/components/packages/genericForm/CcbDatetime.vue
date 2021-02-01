<!--
 * @Description: ccb-datetime
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 16:02:50
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-25 10:55:48
-->
<template>
  <datetime
    class="ccb-datetime"
    :title="formEleProp.datetimeTitle"
    :format="formEleProp.datetimeFormat"
    :inline-desc="formEleProp.datetimeInlineDesc"
    :placeholder="formEleProp.datetimePlaceholder"
    :min-year="formEleProp.datetimeMinYear"
    :max-year="formEleProp.datetimeMaxYear"
    :min-hour="formEleProp.datetimeMinHour"
    :max-hour="formEleProp.datetimeMaxHour"
    :confirm-text="formEleProp.datetimeConfirmText"
    :cancel-text="formEleProp.datetimeCancelText"
    :clear-text="formEleProp.datetimeClearText"
    :year-row="formEleProp.datetimeYearRow"
    :month-row="formEleProp.datetimeMonthRow"
    :day-row="formEleProp.datetimeDayRow"
    :hour-row="formEleProp.datetimeHourRow"
    :minute-row="formEleProp.datetimeMinuteRow"
    :start-date="formEleProp.datetimeStartDate"
    :end-date="formEleProp.datetimeEndDate"
    :required="formEleProp.datetimeRequired"
    :display-format="formEleProp.datetimeDisplayFormat"
    :readonly="formEleProp.datetimeReadonly"
    :show.sync="formEleProp.datetimeShowSync"
    :minute-list="formEleProp.datetimeMinuteList"
    :hour-list="formEleProp.datetimeHourList"
    :default-selected-value="formEleProp.datetimeSelectedValue"
    :compute-hours-function="formEleProp.datetimeHourFunc"
    :compute-days-function="formEleProp.datetimeDaysFunc"
    :order-map="formEleProp.datetimeOrderMap"
    :value-text-align="formEleProp.datetimeValueTextAlign"
    @on-change="formEleProp.datetimeChange"
    @on-clear="formEleProp.datetimeClear"
    @on-show="formEleProp.datetimeShow"
    @on-hide="formEleProp.datetimeHide"
    @on-cancel="formEleProp.datetimeCancel"
    @on-confirm="formEleProp.datetimeConfirm"
    v-model="formEle[formEleProp.datetimeSlotTitle]"
  >
    <span slot="title" v-if="this.$slots[formEleProp.datetimeSlotTitle]">
      <slot :name="formEleProp.datetimeSlotTitle"></slot>
    </span>
  </datetime>
</template>

<script>
import { Datetime } from "vux";
export default {
  name: "ccb-datetime",
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
    Datetime
  }
};
</script>
<style lang="less" scoped>
.ccb-datetime {
  font-size: 14px;
  /deep/ .weui-cell__ft {
    padding-left: 10px;
  }
}
</style>

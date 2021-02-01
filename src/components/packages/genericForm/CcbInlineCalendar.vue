<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-17 15:34:54
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-18 09:29:55
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
  <inline-calendar
    class="ccb-inline-calendar"
    :ref="formEleProp.calendarRef"
    :show.sync="formEleProp.show"
    :render-month="formEleProp.renderMonth"
    :start-date="formEleProp.startDate"
    :end-date="formEleProp.endDate"
    :range="formEleProp.range"
    :show-last-month="formEleProp.showLastMonth"
    :show-next-month="formEleProp.showNextMonth"
    :highlight-weekend="formEleProp.highlightWeekend"
    :return-six-rows="formEleProp.return6Rows"
    :hide-header="formEleProp.hideHeader"
    :hide-week-list="formEleProp.hideWeekList"
    :replace-text-list="formEleProp.replaceTextList"
    :weeks-list="formEleProp.weeksList"
    :render-function="formEleProp.buildSlotFn"
    :render-on-value-change="formEleProp.valueChange"
    :disable-past="formEleProp.disablePast"
    :disable-future="formEleProp.disableFuture"
    :marks="formEleProp.marks"
    :disable-weekend="formEleProp.disableWeekend"
    :disable-date-function="formEleProp.disableDateFunction"
    v-model="formEle[formEleProp.calendarSlotTitle]"
    @on-change="formEleProp.onChange"
    @on-view-change="formEleProp.onViewChange"
    @on-select-single-date="formEleProp.selectSingleDate"
  >
    <template slot="each-day">
      <slot name="each-day"></slot>
    </template>
  </inline-calendar>
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
<style lang="less" scoped>
.ccb-inline-calendar {
  background: rgba(255, 255, 255, 0.9);
}
</style>

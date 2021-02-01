<!--
 * @Description: ccb-checker
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 15:58:08
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-13 20:23:09
-->
<template>
  <checker
    :default-item-class="formEleProp.checkerDefaultClass"
    :selected-item-class="formEleProp.checkerSelectedClass"
    :disabled-item-class="formEleProp.checkerDisabledClass"
    :type="formEleProp.checkerType"
    :max="formEleProp.checkerMax"
    :radio-required="formEleProp.checkerRadioRequired"
    v-model="formEle[formEleProp.checkerSlotTitle]"
    @on-change="formEleProp.checkerChange"
  >
    <checker-item
      v-for="(item, index) in formEleProp.checkerItems"
      :key="index"
      :value="item.value"
      v-show="formEleProp.checkerItems.length > 0"
      >{{ item.value }}</checker-item
    >
    <checker-item
      v-for="i in 4"
      :key="i"
      :value="i"
      v-show="formEleProp.checkerItems.length <= 0"
      >{{ i }}</checker-item
    >
  </checker>
</template>
<script>
import { Checker, CheckerItem } from "vux";
export default {
  name: "ccb-checker",
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
    Checker,
    CheckerItem
  }
};
</script>
<style lang="less" scoped></style>

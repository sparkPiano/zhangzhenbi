<!--
 * @Description: ccb-check-icon
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 15:40:33
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-10-28 15:32:11
-->
<template>
  <check-icon
    :value.sync="formEle[formEleProp.checkIconSlotTitle]"
    :type="formEleProp.checkIconType"
  ></check-icon>
</template>
<script>
import { CheckIcon } from "vux";
export default {
  name: "ccb-check-icon",
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
    CheckIcon
  }
};
</script>
<style lang="less" scoped></style>

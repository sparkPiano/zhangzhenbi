<!--
 * @Description: ccb-picker
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 16:03:33
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-10-28 15:31:11
-->
<template>
  <picker
    :data="formEleProp.pickerData"
    :columns="formEleProp.pickerColumns"
    :fixed-columns="formEleProp.pickerFixedCols"
    :column-width="formEleProp.pickerClosWidth"
    @on-change="formEleProp.pickerChange"
    v-model="formEle[formEleProp.pickerSlotTitle]"
    :ref="formEleProp.pickerRef"
  ></picker>
</template>

<script>
import { Picker } from "vux";
export default {
  name: "ccb-picker",
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
    Picker
  }
};
</script>
<style lang="less" scoped></style>

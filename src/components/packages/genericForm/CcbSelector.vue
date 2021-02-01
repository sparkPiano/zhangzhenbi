<!--
 * @Description: ccb-selector
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 16:05:12
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-13 20:28:16
-->
<template>
  <selector
    :title="formEleProp.selectorTitle"
    :direction="formEleProp.selectorDirection"
    :options="formEleProp.selectorOptions"
    :name="formEleProp.selectorName"
    :placeholder="formEleProp.selectorPlaceholder"
    :readonly="formEleProp.selectorReadonly"
    :value-map="formEleProp.selectorValMap"
    @on-change="formEleProp.selectorChange"
    v-model="formEle[formEleProp.selectorSlotTitle]"
  ></selector>
</template>

<script>
import { Selector } from "vux";
export default {
  name: "ccb-selector",
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
    Selector
  }
};
</script>
<style lang="less" scoped></style>

<!--
 * @Description: ccb-rater
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 16:04:52
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-10-28 15:30:40
-->
<template>
  <rater
    :max="formEleProp.raterMax"
    :disabled="formEleProp.raterDisabled"
    :star="formEleProp.raterStar"
    :active-color="formEleProp.raterActiveColor"
    :margin="formEleProp.raterMargin"
    :font-size="formEleProp.raterFontSize"
    :min="formEleProp.raterMin"
    v-model="formEle[formEleProp.raterSlotTitle]"
  ></rater>
</template>

<script>
import { Rater } from "vux";
export default {
  name: "ccb-rater",
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
    Rater
  }
};
</script>
<style lang="less" scoped></style>

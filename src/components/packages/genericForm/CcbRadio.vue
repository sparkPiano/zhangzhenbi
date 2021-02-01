<!--
 * @Description: ccb-radio
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 16:04:26
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-13 20:27:45
-->
<template>
  <radio
    class="ccb-radio"
    :options="formEleProp.radioOptions"
    :fill-mode="formEleProp.radioFillMode"
    :fill-placeholder="formEleProp.radioPlaceholder"
    :fill-label="formEleProp.radioLabel"
    :disabled="formEleProp.radioDisabled"
    :selected-label-style="formEleProp.radioSelectedLabelStyle"
    @on-change="formEleProp.radioChange"
    v-model="formEle[formEleProp.radioEachItem]"
  >
    <template slot-scope="props" slot="each-item">
      <slot :name="formEleProp.radioEachItem" :info="props"> </slot>
    </template>
  </radio>
</template>

<script>
import { Radio } from "vux";
export default {
  name: "ccb-radio",
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
    Radio
  }
};
</script>
<style lang="less" scoped>
.weui-cells_radio {
  font-size: 14px;
  .weui-cell {
    font-size: 14px;
  }
}
</style>

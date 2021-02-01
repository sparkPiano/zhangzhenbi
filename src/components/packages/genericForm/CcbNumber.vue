<!--
 * @Description: ccb-number
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 16:06:04
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-08 14:12:30
-->
<template>
  <x-number
    class="ccb-number"
    :title="formEleProp.xNumberTitle"
    :min="formEleProp.xNumberMin"
    :max="formEleProp.xNumberMax"
    :step="formEleProp.xNumberStep"
    :fillable="formEleProp.xNumberFillable"
    :width="formEleProp.xNumberWidth"
    :button-style="formEleProp.xNumberButtonStyle"
    :align="formEleProp.xNumberAlign"
    @on-change="onNumberChange"
    v-model="formEle[formEleProp.xNumberSlotTitle]"
  ></x-number>
</template>

<script>
import { XNumber } from "vux";
export default {
  name: "ccb-number",
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
  watch: {},
  mounted() {},
  updated() {},
  methods: {
    onNumberChange(val) {
      console.log("ccb-number", val);
      this.$emit("change-number", val, this);
    }
  },
  components: {
    XNumber
  }
};
</script>
<style lang="less" scoped>
.weui-cell.ccb-number {
  font-size: 14px;
  padding: 10px 0;
  /deep/ .vux-number-selector {
    border: 0;
    font-size: 14px;
  }
  /deep/ .vux-number-selector-sub,
  /deep/ .vux-number-selector-plus {
    border-radius: 0;
  }
  /deep/ .vux-number-selector-plus {
    padding: 5px 8px;
  }
  /deep/ .vux-number-selector.vux-number-disabled svg {
    fill: #ccc;
  }
  /deep/ .vux-number-selector svg {
    fill: #3966ae;
    width: 14px;
    height: 14px;
  }
  /deep/ .vux-number-input {
    background-color: #f2f2f2;
    border: 0;
    font-size: 14px;
  }
}
</style>

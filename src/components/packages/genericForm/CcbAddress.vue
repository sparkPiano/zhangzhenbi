<!--
 * @Description: ccb-address
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 16:05:34
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-13 19:08:22
-->
<template>
  <x-address
    class="ccb-address"
    :raw-value="formEleProp.xAddressRawValue"
    :title="formEleProp.xAddressTitle"
    :list="formEleProp.xAddressList"
    :placeholder="formEleProp.xAddressPlaceholder"
    :inline-desc="formEleProp.xAddressInlineDesc"
    :show.sync="formEleProp.xAddressShowSync"
    :hide-district="formEleProp.xAddressHideDistrict"
    :value-text-align="formEleProp.xAddressValTextAlign"
    :popup-style="formEleProp.xAddressPopupStyle"
    :disabled="formEleProp.xAddressDisabled"
    @on-hide="formEleProp.xAddressHide"
    @on-show="formEleProp.xAddressShow"
    @on-shadow-change="formEleProp.xAddressShadowChange"
    v-model="formEle[formEleProp.xAddressSlotTitle]"
  >
    <span
      slot="title"
      v-if="
        !formEleProp.xAddressTitle && this.$slots[formEleProp.xAddressSlotTitle]
      "
    >
      <slot :name="formEleProp.xAddressSlotTitle"></slot>
    </span>
  </x-address>
</template>

<script>
import { XAddress } from "vux";
export default {
  name: "ccb-address",
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
    XAddress
  }
};
</script>
<style lang="less" scoped>
.ccb-address {
  font-size: 14px;
  /deep/ .weui-textarea {
    font-size: 14px;
  }
}
</style>

<!--
 * @Description: ccb-popup-picker
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 16:03:50
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-25 10:35:28
-->
<template>
  <popup-picker
    class="ccb-poopup-picker"
    :title="formEleProp.popupPickerTitle"
    :show.sync="formEleProp.popupPickerShowSync"
    :inline-desc="formEleProp.popupPickerInlineDesc"
    :placeholder="formEleProp.popupPickerPlaceholder"
    :show-name="formEleProp.popupPickerShowName"
    :value-text-align="formEleProp.popupPickerValTextAlign"
    :display-format="formEleProp.popupPickerDisplayFormat"
    :popup-style="formEleProp.popupPickerPopupStyle"
    :confirm-text="formEleProp.popupPickerConfirmText"
    :cancel-text="formEleProp.popupPickerCancelText"
    :popup-title="formEleProp.popupPickerPopupTitle"
    :disabled="formEleProp.popupPickerDisabled"
    :data="formEleProp.popupPickerData"
    @on-change="formEleProp.popupPickerChange"
    @on-show="formEleProp.popupPickerShow"
    @on-hide="formEleProp.popupPickerHide"
    @on-shadow-change="formEleProp.popupPickerShadowChange"
    v-model="formEle[formEleProp.popupPickerSlotTitle]"
  >
    <span slot="title" v-if="this.$slots[formEleProp.popupPickerSlotTitle]">
      <slot :name="formEleProp.popupPickerSlotTitle"></slot>
    </span>
  </popup-picker>
</template>

<script>
import { PopupPicker } from "vux";
export default {
  name: "ccb-popup-picker",
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
    PopupPicker
  }
};
</script>
<style lang="less" scoped>
.ccb-poopup-picker {
  font-size: 14px;
}
</style>

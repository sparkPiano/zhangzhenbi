<!--
 * @Description: ccb-input
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 16:06:19
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-04 09:53:45
-->
<template>
  <x-input
    class="ccb-input"
    :type="formEleProp.xInputType"
    :is-type="formEleProp.xInputIsType"
    :required="formEleProp.xInputRequired"
    :title="formEleProp.xInputTitle"
    :placeholder="formEleProp.xInputPlaceholder"
    :show-clear="formEleProp.xInputShowClear"
    :min="formEleProp.xInputMin"
    :max="formEleProp.xInputMax"
    :disabled="formEleProp.xInputDisabled"
    :readonly="formEleProp.xInputReadonly"
    :debounce="formEleProp.xInputDebounce"
    :placeholder-align="formEleProp.xInputPlaceholderAlign"
    :text-align="formEleProp.xInputTextAlign"
    :label-width="formEleProp.xInputLabelWidth"
    :mask="formEleProp.xInputMask"
    :should-toast-error="formEleProp.xInputShouldToastError"
    @on-blur="formEleProp.xInputBlur"
    @on-focus="formEleProp.xInputFocus"
    @on-enter="formEleProp.xInputEnter"
    @on-change="formEleProp.xInputChange"
    @on-click-error-icon="formEleProp.xInputClickErrIcon"
    @on-click-clear-icon="formEleProp.xInputClickClearIcon"
    v-model="formEle[formEleProp.xInputSlotTitle]"
  >
    <label
      slot="label"
      v-if="!formEleProp.xInputTitle && formEleProp.xInputLabel"
    >
      <slot :name="formEleProp.xInputLabel"></slot>
    </label>
    <template
      slot="restricted-label"
      v-if="!formEleProp.xInputTitle && formEleProp.xInputRestrictedLabel"
    >
      <slot :name="formEleProp.xInputRestrictedLabel"></slot>
    </template>
    <template slot="right" v-if="formEleProp.xInputRight">
      <slot :name="formEleProp.xInputRight"></slot>
    </template>
    <template slot="right-full-height" v-if="formEleProp.xInputRightFullHeight">
      <slot :name="formEleProp.xInputRightFullHeight"></slot>
    </template>
  </x-input>
</template>

<script>
import { XInput } from "vux";
export default {
  name: "ccb-input",
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
    XInput
  }
};
</script>
<style lang="less" scoped>
.ccb-input {
  font-size: 14px;
  /deep/ .weui-cell__bd {
    // margin-left: -10px;
  }
}
</style>

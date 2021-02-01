<!--
 * @Description: ccb-textarea
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 16:06:49
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-13 20:28:27
-->
<template>
  <x-textarea
    class="ccb-textarea"
    :title="formEleProp.xTextareaTitle"
    :inline-desc="formEleProp.xTextareaInlineDesc"
    :show-counter="formEleProp.xTextareaShowCounter"
    :max="formEleProp.xTextareaMax"
    :name="formEleProp.xTextareaName"
    :placeholder="formEleProp.xTextareaPlaceholder"
    :rows="formEleProp.xTextareaRows"
    :cols="formEleProp.xTextareaCols"
    :height="formEleProp.xTextareaHeight"
    :readonly="formEleProp.xTextareaReadonly"
    :disabled="formEleProp.xTextareaDisabled"
    :autosize="formEleProp.xTextareaAutoSize"
    @on-change="formEleProp.xTextareaChange"
    @on-focus="formEleProp.xTextareaFocus"
    @on-blur="formEleProp.xTextareaBlur"
    v-model="formEle[formEleProp.xTextareaSlotTitle]"
  >
    <template slot="label" v-if="formEleProp.xTextareaLabel">
      <slot :name="formEleProp.xTextareaLabel"></slot>
    </template>
    <template
      slot="restricted-label"
      v-if="formEleProp.xTextareaRestrictedLabel"
    >
      <slot :name="formEleProp.xTextareaRestrictedLabel"></slot>
    </template>
  </x-textarea>
</template>

<script>
import { XTextarea } from "vux";
export default {
  name: "ccb-textarea",
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
    XTextarea
  }
};
</script>
<style lang="less" scoped>
.weui-cell {
  font-size: 14px;
}
</style>

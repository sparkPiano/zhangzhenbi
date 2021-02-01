<!--
 * @Description: ccb-cell
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-02 10:54:15
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-19 16:03:39
-->
<template>
  <cell
    class="ccb-cell"
    :title="formEleProp.cellTitle"
    :value="formEleProp.cellValue"
    :inline-desc="formEleProp.cellInlineDesc"
    :link="formEleProp.cellLink"
    :is-link="formEleProp.cellIsLink"
    :primary="formEleProp.cellPrimary"
    :is-loading="formEleProp.cellIsLoading"
    :value-align="formEleProp.cellValueAlign"
    :border-intent="formEleProp.cellBorderIntent"
    :arrow-direction="formEleProp.cellArrowDirection"
    :disabled="formEleProp.cellDisabled"
    :align-items="formEleProp.cellAlignItems"
  >
    <div
      class="ccb-cell-content"
      v-if="!formEleProp.cellValue && this.$slots.cellContent"
    >
      <slot name="cellContent"></slot>
    </div>
    <img
      slot="icon"
      :src="formEleProp.cellIconUrl"
      v-if="formEleProp.hasCellIcon && !this.$slots.imgIcon"
    />
    <template slot="icon" v-else-if="this.$slots.imgIcon">
      <slot name="imgIcon"></slot>
    </template>
    <template slot="child" v-if="this.$slots.cellChild">
      <slot name="cellChild"></slot>
    </template>
    <template
      slot="inline-desc"
      v-if="!formEleProp.cellInlineDesc && this.$slots.cellInlineDesc"
    >
      <slot name="cellInlineDesc"></slot>
    </template>
    <template
      slot="title"
      v-if="!formEleProp.cellTitle && this.$slots.cellTitle"
    >
      <slot name="cellTitle"></slot>
    </template>
  </cell>
</template>

<script>
import { Cell } from "vux";
export default {
  name: "ccb-cell",
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
  mounted() {},
  methods: {},
  components: {
    Cell
  }
};
</script>
<style lang="less" scoped>
.weui-cell {
  font-size: 14px;
  align-items: flex-start;
  background-color: #ffffff;
}
.ccb-cell-content {
  text-align: left;
  font-size: 14px;
  padding-left: 10px;
}
</style>

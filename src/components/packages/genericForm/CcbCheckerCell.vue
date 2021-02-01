<!--
 * @Description: ccb-checker-cell
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-19 14:20:50
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-23 10:49:36
-->
<template>
  <div class="ccb-checker-cell">
    <ccb-cell
      :formEleProp="formEleProp"
      :formEle="formEle"
      :labelWidth="labelWidth"
      :labelMarginRight="labelMarginRight"
      :labelAlign="labelAlign"
    >
      <div
        slot="cellContent"
        v-if="!formEleProp.cellValue && this.$slots.cellContent"
      >
        <slot name="cellContent"></slot>
      </div>
      <img
        slot="imgIcon"
        :src="formEleProp.cellIconUrl"
        v-if="formEleProp.hasCellIcon && !this.$slots.imgIcon"
      />
      <template slot="imgIcon" v-else-if="this.$slots.imgIcon">
        <slot name="imgIcon"></slot>
      </template>
      <template slot="cellChild" v-if="this.$slots.cellChild">
        <slot name="cellChild"></slot>
      </template>
      <template
        slot="cellInlineDesc"
        v-if="!formEleProp.cellInlineDesc && this.$slots.cellInlineDesc"
      >
        <slot name="cellInlineDesc"></slot>
      </template>
      <template
        slot="cellTitle"
        v-if="!formEleProp.cellTitle && this.$slots.cellTitle"
      >
        <slot name="cellTitle"></slot>
      </template>
    </ccb-cell>
    <div class="ccb-inline-desc">
      <div class="ccb-inline-desc_left">
        <span>{{ formElePropOne.inlineDescLeft }}</span>
        <span>{{ `${formEleProp.numbers * formEleProp.price}元` }}</span>
      </div>
      <div class="ccb-inline-desc_right">
        <ccb-number
          :formEleProp="{
            xNumberSlotTitle: 'number_' + formEleProp.id,
            ...propObj
          }"
          :formEle="{
            ['number_' + formEleProp.id]: formEleProp.numbers
          }"
          @change-number="onChangeNumber"
        ></ccb-number>
        <ccb-button :btnObj="btnObj" class="ccb-next"></ccb-button>
      </div>
    </div>
    <slot name="tool"></slot>
  </div>
</template>
<script>
export default {
  name: "ccb-checker-cell",
  data() {
    return {};
  },
  props: {
    propObj: {
      type: Object,
      default: () => ({})
    },
    btnObj: {
      type: Object,
      default: () => ({})
    },
    formElePropOne: {
      type: Object,
      default: () => ({})
    },
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
    },
    isUseIcon: {
      type: Boolean,
      default: false
    },
    selectIconClass: {
      type: String
    },
    unSelectIconClass: {
      type: String
    },
    selectedImg: {
      type: String
    },
    unSelectedImg: {
      type: String
    }
  },
  mounted() {
    console.log(
      "ccb-checker-cell",
      this.isUseIcon,
      this.selectIconClass,
      this.unSelectIconClass,
      this.selectedImg,
      this.unSelectedImg
    );
  },
  methods: {
    onChangeNumber(val, $e) {
      console.log("checker 2222", val);
      console.log("23333322", $e);
    }
  },
  components: {
    "ccb-cell": () => import("@/components/packages/genericForm/CcbCell.vue"),
    "ccb-number": () =>
      import("@/components/packages/genericForm/CcbNumber.vue"),
    "ccb-button": () =>
      import("@/components/packages/genericForm/CcbButton.vue")
  }
};
</script>
<style lang="less" scoped></style>

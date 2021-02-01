<!--
 * @Description: ccb-tab
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-13 09:15:35
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-07 15:09:42
-->
<template>
  <div class="ccb-tab">
    <tab
      v-if="!this.$slots.ccbTab"
      :line-width="formEleProp.lineWidth"
      :active-color="formEleProp.activeColor"
      :default-color="formEleProp.defaultColor"
      :disabled-color="formEleProp.disabledColor"
      :bar-active-color="formEleProp.barActiveColor"
      :animate="formEleProp.animate"
      :custom-bar-width="formEleProp.customBarWidth"
      :badge-label="formEleProp.badgeLabel"
      :badge-background="formEleProp.badgeBg"
      :badge-color="formEleProp.badgeColor"
      :prevent-default="formEleProp.preventDefault"
      :scroll-threshold="formEleProp.scrollThreshold"
      :bar-position="formEleProp.barPosition"
      @on-before-index-change="formEleProp.onBeforeIndexChange"
      v-model="formEle.tabIndex"
    >
      <tab-item
        v-for="(item, index) in formEleProp.list"
        :selected="item.selected"
        :disabled="item.disabled"
        :badge-label="formEleProp.itemBadgeLabel || item.badgeLabel"
        :badge-background="formEleProp.itemBadgeBg || item.badgeBg"
        :badge-color="formEleProp.itemBadgeColor || item.badgeColor"
        @on-item-click="onItemClick"
        :key="index"
        >{{ item.title }}</tab-item
      >
    </tab>
    <slot name="ccbTab"></slot>
  </div>
</template>
<script>
import { Tab, TabItem } from "vux";
export default {
  name: "ccb-tab",
  data() {
    return {};
  },
  props: {
    formEleProp: {
      type: Object,
      default: () => ({})
    },
    formEle: {
      type: Object,
      default: () => ({})
    }
  },
  created() {},
  mounted() {},
  methods: {
    onBeforeIndexChange(val) {
      this.$emit("onBeforeIndexChange", val);
    },
    onItemClick(val) {
      this.$emit("onItemClick", val, this);
    }
  },
  components: {
    Tab,
    TabItem
  }
};
</script>
<style lang="less" scoped>
@height: 55px;
.ccb-tab {
  /deep/ .vux-tab-wrap {
    padding-top: @height;
  }
  /deep/ .vux-tab-container {
    height: @height;
  }
  /deep/ .vux-tab {
    height: @height;
    .vux-tab-item {
      line-height: @height;
    }
  }
}
</style>

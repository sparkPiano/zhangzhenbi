<!--
 * @Description: ccb-prodMenus
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-14 15:08:15
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-11 12:15:29
-->
<template>
  <div class="x-prodMenus">
    <grid
      :show-lr-borders="showBorders"
      :show-vertical-dividers="showVerticalDividers"
      :rows="rows"
      :cols="cols"
    >
      <grid-item
        v-for="(item, index) in menusList"
        :key="index"
        :link="item.link"
      >
        <img slot="icon" :src="item.img" v-if="item.img" />
        <i slot="icon" class="icon iconfont" :class="item.iconClass" v-else></i>
        <span slot="label" v-if="item.label">{{ item.label }}</span>
        <span slot="label" v-else>{{ "九宫格" }}</span>
      </grid-item>
      <slot name="gridItem"></slot>
    </grid>
  </div>
</template>

<script>
import { Grid, GridItem } from "vux";
export default {
  name: "ccb-prodMenus",
  data() {
    return {};
  },
  props: {
    menusList: {
      type: Array
    },
    rows: {
      type: Number,
      default: 3
    },
    cols: {
      type: Number,
      default: 4
    },
    showBorders: {
      type: Boolean,
      default: true
    },
    showVerticalDividers: {
      type: Boolean,
      default: true
    },
    gridItemIcon: {
      type: String
    },
    gridItemLabel: {
      type: String
    },
    gridItemLink: {
      type: String
    }
  },
  components: {
    Grid,
    GridItem
  }
};
</script>

<style lang="less" scoped>
.weui-grid:after {
  height: 0;
  border-bottom: 0;
}
/deep/ .weui-grid__label {
  font-size: 12px;
}
.iconfont {
  font-size: 30px;
}
/deep/ .weui-grid__icon {
  width: 30px;
  height: 30px;
  img {
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>

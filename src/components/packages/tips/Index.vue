<!--
 * @Description: ccb-tips
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-16 11:32:13
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-16 15:18:02
-->
<template>
  <card :header="header" :footer="footer" class="ccb-tips">
    <template slot="header" v-if="!header.title && this.$slots.xHeader">
      <slot name="xHeader"></slot>
    </template>
    <template slot="content">
      <slot name="xContent"></slot>
    </template>
    <template slot="footer" v-if="!footer.title && this.$slots.xFooter">
      <slot name="xFooter"></slot>
    </template>
  </card>
</template>

<script>
import { Card } from "vux";
export default {
  name: "ccb-tips",
  data() {
    return {};
  },
  props: {
    header: {
      type: Object,
      default: () => ({
        title: ""
      })
    },
    footer: {
      type: Object,
      default: () => ({
        title: "",
        link: ""
      })
    }
  },
  methods: {},
  components: {
    Card
  }
};
</script>

<style lang="less" scoped>
.ccb-tips {
  background-color: #f2f2f2;
  padding: 10px 0;
  /deep/ .weui-panel__hd {
    font-size: 14px;
  }
  &::before {
    height: 0 !important;
    border: 0 !important;
  }
  /deep/ .vux-card-content {
    padding: 0 15px;
    font-size: 14px;
  }
}
</style>

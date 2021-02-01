<!--
 * @Description: ccb-generic-form
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-16 15:12:33
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-23 09:30:13
-->
<template>
  <div class="x-generic-form">
    <group
      :label-width="labelWidth"
      :title="groupTitle"
      :title-color="groupTitleColor"
      :label-align="labelAlign"
      :label-margin-right="labelMarginRight"
      :gutter="groupGutter"
    >
      <!-- <group-title
        slot="title"
        v-if="!groupTitle && this.$slots.customGroupTitle"
        ><slot name="customGroupTitle"></slot
      ></group-title> -->
      <slot></slot>
      <slot name="content"></slot>
    </group>
  </div>
</template>
<script>
import { TransferDom, GroupTitle } from "vux";
export default {
  name: "ccb-generic-form",
  directives: {
    TransferDom
  },
  props: {
    formEleProp: {
      type: Object,
      default: () => ({})
    },
    formEle: {
      type: Object,
      default: () => ({})
    },
    groupTitle: {
      type: String
    },
    groupTitleColor: {
      type: String
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
    groupGutter: {
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    changeValue(val) {
      this.value1 = val;
      this.$refs.datetime.render();
    },
    changeFormatAndValue() {
      this.format = "YYYY-MM-DD HH";
      this.$nextTick(() => {
        this.value1 = "2019-10-23 10";
        this.$refs.datetime.render();
      });
    }
  },
  components: {
    GroupTitle
  }
};
</script>
<style lang="less" scoped>
.weui-cells__title {
  color: #000000;
  text-align: left;
  margin-bottom: 0;
}
.x-generic-form {
  /deep/ .weui-cells {
    background-color: #ffffff;
  }
}
</style>

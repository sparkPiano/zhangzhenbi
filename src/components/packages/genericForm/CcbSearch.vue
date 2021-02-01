<!--
 * @Description: ccb-search
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-04 15:18:26
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-13 20:28:04
-->
<template>
  <div
    class="ccb-search"
    :class="{ isShow: formEleProp.customClass ? true : false }"
  >
    <search
      :placeholder="formEleProp.placeholder"
      :cancel-text="formEleProp.cancelText"
      :results="formEleProp.results"
      :auto-fixed="formEleProp.autoFixed"
      :top="formEleProp.top"
      :position="formEleProp.position"
      :auto-scroll-to-top="formEleProp.autoScrollToTop"
      v-model="formEleProp[formEleProp.searchSlotTitle]"
      @on-focus="formEleProp.onFocus"
      @on-cancel="formEleProp.onCancel"
      @on-submit="formEleProp.onSubmit"
      @on-result-click="formEleProp.onResultClick"
      @on-change="formEleProp.onChange"
      @on-blur="formEleProp.onBlur"
      @on-clear="formEleProp.onClear"
      :ref="formEleProp.searchRef"
    >
      <template v-if="this.$slots.searchResult">
        <slot name="searchResult"></slot>
      </template>
      <template slot="left" v-if="this.$slots.serachLeft">
        <slot name="serachLeft"></slot>
      </template>
      <template slot="right" v-if="this.$slots.serachRight">
        <slot name="serachRight"></slot>
      </template>
    </search>
  </div>
</template>
<script>
import { Search } from "vux";
export default {
  name: "ccb-search",
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
    Search
  }
};
</script>

<style lang="less">
.ccb-search {
  .weui-search-bar {
    background-color: #ffffff;
  }
  .weui-search-bar__label {
    text-align: left;
    line-height: 30px;
    border-radius: 100px;
    background-color: #f2f2f2;
    .weui-icon-search {
      margin-left: 10px;
      margin-right: 0;
    }
  }
  .vux-search-mask {
    width: 100%;
    background-color: #ffffff;
    opacity: 0.3;
  }
  .weui-search-bar__box {
    border-radius: 100px;
    .weui-search-bar__input {
      height: 30px;
      line-height: 30px;
    }
    .weui-icon-search {
      line-height: 38px;
    }
  }
  .weui-search-bar__form {
    background-color: #ffffff;
    &::after {
      background-color: #ffffff;
      border-radius: 100px;
    }
  }
}
</style>

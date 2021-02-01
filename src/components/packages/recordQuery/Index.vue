<!--
 * @Description: ccb-card
 * @Version: 1.0
 * @Autor: Tang Li
 * @Date: 2020-11-06 09:18:26
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-06 17:54:08
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
      v-model="formEle[formEleProp.searchSlotTitle]"
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
      <template slot="left">
        <span
          class="ccb-search_pos"
          v-if="!this.$slots.serachLeft && formEleProp.isShowLeft"
          >{{ formEleProp.pos }}</span
        >
        <slot name="serachLeft"></slot>
      </template>
      <template slot="right">
        <div
          class="ccb-search_btn"
          v-if="!this.$slots.serachRight && formEleProp.isShowRight"
        >
          <x-button
            v-if="!this.$slots.searchRightBtn"
            @click.native="btnObj.refreshCode"
            :type="btnObj.btnType"
            :mini="btnObj.btnMini"
            :plain="btnObj.btnPlain"
            :disabled="btnObj.btnDisabled"
            :text="btnObj.btnName"
            :link="btnObj.btnLink"
            :gradients="btnObj.btnGradients"
            :action-type="btnObj.btnActionType"
            :show-loading="btnObj.btnShowLoading"
          >
            <template v-if="!this.$slots.customBtnText">
              <i class="iconfont icon-filter"></i>
              <span class="ccb-search_btn__text">{{ btnObj.btnName }}</span>
            </template>
            <slot name="customBtnText"></slot>
          </x-button>
          <slot name="searchRightBtn"></slot>
        </div>
        <slot name="serachRight"></slot>
      </template>
    </search>
  </div>
</template>
<script>
import { Search, XButton } from "vux";
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
    btnObj: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {},
  components: {
    Search,
    XButton
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
  button.weui-btn_plain-primary,
  input.weui-btn_plain-primary,
  button.weui-btn_plain-default,
  input.weui-btn_plain-default {
    border-width: 0;
    color: rgb(57, 102, 174);
    font-size: 16px;
    padding: 0 10px;
  }
}
</style>

<template>
  <div class="ccb-edit-button">
    <box gap="15px">
      <flexbox
        :gutter="formEleProp.gutter"
        :orient="formEleProp.orient"
        :justify="formEleProp.justify"
        :align="formEleProp.align"
        :wrap="formEleProp.wrap"
        :direction="formEleProp.direction"
      >
        <template v-if="!this.$slots.flexboxItem">
          <flexbox-item
            :span="btnObj.span"
            :order="btnObj.order"
            v-for="(list, index) in btnObj.btnLists"
            :key="index"
          >
            <x-button
              class="ccb-edit-button-base"
              :class="list.buttonClass"
              :type="list.btnType"
              :mini="list.btnMini"
              :plain="list.btnPlain"
              :disabled="list.btnDisabled"
              :text="list.btnName"
              :link="list.btnLink"
              :gradients="list.btnGradients"
              :action-type="list.btnActionType"
              :show-loading="list.btnShowLoading"
              @click.native="list.onBtn"
            ></x-button>
          </flexbox-item>
        </template>
        <slot name="flexboxItem"></slot>
      </flexbox>
    </box>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, XButton } from "vux";
export default {
  name: "ccb-edit-button",
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
    Flexbox,
    FlexboxItem,
    XButton
  }
};
</script>

<style lang="less" scope>
#app .router-view {
  background-color: #ffffff !important;
}
.ccb-edit-button {
  background-color: #ffffff !important;
  font-size: 15px;
  .gray {
    border-radius: 99px !important;
    border-color: #b2b2b2 !important;
    color: #b2b2b2 !important;
    &:active {
      border-color: rgba(178, 178, 178, 0.6) !important;
      color: rgba(178, 178, 178, 0.6) !important;
      background-color: transparent;
    }
  }
  .blue {
    border-radius: 99px !important;
    border-color: #3966ae !important;
    color: #3966ae !important;
    &:active {
      border-color: rgba(57, 102, 174, 0.6) !important;
      color: rgba(57, 102, 174, 0.6) !important;
      background-color: transparent;
    }
  }
}
</style>

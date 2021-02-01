<!--
 * @Description: ccb-search
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-04 15:18:26
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-06 09:42:43
-->
<template>
  <!-- :style="formEleProp.displayClass ? 'display:flex !important;' : ''" 
  :style="formEleProp.isShowRadio ? 'display:flex !important;' : ''"-->
  <div
    :style="formEleProp.cellConStyle ? formEleProp.cellConStyle : ''"
    class="ccb-cell"
    :class="{
      isShow: formEleProp.customClass ? true : false
    }"
  >
    <!-- <scroller
      v-if="formEleProp.isShowScroll"
      :lock-x="formEleProp.lockX"
      :lock-y="formEleProp.lockY"
      :height="formEleProp.height"
      :scrollbar-x="formEleProp.scrollbarX"
      :scrollbar-y="formEleProp.scrollbarY"
      :bounce="formEleProp.bounce"
      :use-pulldown="formEleProp.usePulldown"
      :use-pullup="formEleProp.usePullup"
      :pulldown-config="formEleProp.pulldownConfig"
      :pullup-config="formEleProp.pullupConfig"
      :scroll-bottom-offset="formEleProp.scrollBottomOffset"
      @on-scroll="formEleProp.onScroll"
      @on-scroll-bottom="formEleProp.onScrollBottom"
      @on-pulldown-loading="formEleProp.onPulldownLoading"
      @on-pullup-loading="formEleProp.onPullupLoading"
      :ref="formEleProp.scrollerBottomRef"
      v-model="formEle[formEleProp.prodSlotTitle]"
    > -->
    <group
      v-for="(o, i) of formEleProp.list"
      :key="formEleProp.list[i].default"
      :label-width="groupLabelWidth"
      :title="groupTitle"
      :title-color="groupTitleColor"
      :label-align="groupLabelAlign"
      :label-margin-right="groupLabelMarginRight"
      :gutter="groupGutter"
    >
      <!-- <group-title slot="title">
        <span class="x-sold-title_first">产品超市</span>
        <span style="">
          <span>
            <x-icon type="ios-arrow-right" size="24"></x-icon>
          </span>
        </span>
      </group-title> -->
      <group-title
        v-if="o.groupTitle"
        slot="title"
        style="display:flex;justify-content:space-between;align-items:center;"
      >
        <span class="x-sold-title_first" style="padding:0;">{{
          o.itemTitle
        }}</span>
        <x-icon
          v-if="o.groupTitleIcon"
          type="ios-arrow-right"
          size="24"
        ></x-icon>
      </group-title>

      <cell
        :title="o.title ? o.title : ''"
        :value="o.value ? o.value : ''"
        :inline-desc="o.inlineDesc ? o.inlineDesc : ''"
        :link="o.link ? o.link : ''"
        :is-link="formEleProp.isLink ? formEleProp.isLink : false"
        :primary="formEleProp.primary ? formEleProp.primary : ''"
        :is-loading="formEleProp.isLoading ? formEleProp.isLoading : false"
        :value-align="formEleProp.valueAlign ? formEleProp.valueAlign : 'left'"
        :border-intent="
          formEleProp.borderIntent ? formEleProp.borderIntent : false
        "
        :arrow-direction="
          o.arrowDirection && o.arrowDirection != 'none'
            ? 'up'
            : o.arrowDirection == 'none'
            ? o.arrowDirection
            : 'down'
        "
        :disabled="formEleProp.disabled ? formEleProp.disabled : false"
        :align-items="
          formEleProp.alignItems ? formEleProp.alignItems : 'center'
        "
        :style="o.cellStyle ? o.cellStyle : formEleProp.cellStyle"
        @click.native="formEleProp.clickNative(o, i)"
      >
        <slot v-if="formEleProp.isShowSlot">
          <template style="display: flex;flex-wrap: wrap;">
            <div style="width: 100px;float:right;padding-right: 10px;">
              <div style="color: #3765AE;font-size: 16px;">
                <span v-if="o.price">{{ "￥" + o.price }}</span>
                <div v-else>&nbsp;</div>
              </div>
              <div>{{ o.value }}</div>
            </div>

            <!-- <span class="x-sold-title_second">
              <span>全部产品</span>
              <span>
                <x-icon type="ios-arrow-right" size="24"></x-icon>
              </span>
            </span> -->
          </template>
          <slot name="customGroupTitle"></slot>
        </slot>
        <!-- <div slot="after-title" v-if="!this.$slots.customGroupTitle">
          <slot name="customGroupTitle"></slot>
        </div> -->
        <!-- <template v-if="this.$slots.cellResult">
          <slot name="cellResult"></slot>
        </template>
        <img
          slot="icon"
          :width="formEleProp.imgWidth"
          :style="formEleProp.imgstyle"
          :src="formEleProp.imgsrc"
        /> -->

        <!-- :button-global-border-radius="btnObj.btnborderRadius"
            :button-global-font-color="btnObj.btnColor" -->
        <div v-if="formEleProp.isShowButton || o.isShowButton">
          <x-button
            @click.native="btnObj.refreshCode(o)"
            :type="btnObj.btnType"
            :mini="btnObj.btnMini"
            :plain="btnObj.btnPlain"
            :disabled="btnObj.btnDisabled"
            :text="btnObj.btnName"
            :link="btnObj.btnLink"
            :gradients="btnObj.btnGradients"
            :action-type="btnObj.btnActionType"
            :show-loading="btnObj.btnShowLoading"
            :style="btnObj.btnStyle"
          >
            <!-- <template v-if="!this.$slots.cellBtnText">
              <i class="iconfont icon-filter" v-if="btnObj.isShowIcon"></i>
              <span class="ccb-search_btn__text">{{ btnObj.btnName }}</span>
            </template> -->
            <!-- <slot name="cellBtnText"></slot> -->
          </x-button>
        </div>
      </cell>

      <!-- v-if="formEleProp.isShowPreview" -->

      <!-- <div
        v-if="formEleProp.isShowPreview"
        class="weui-cell vux-cell-form-preview"
        style="padding: 0.1rem 0.15rem;font-size: 16px;line-height: 25px;"
        :class="{ 'vux-cell-no-border-intent': !formEleProp.itemborderIntent }"
      >
        <div class="weui-form-preview__bd">
          <div
            class="weui-form-preview__item"
            v-for="(item, i) in formEleProp.list[i].data"
            :key="i"
          >
            <label class="weui-form-preview__label" v-html="item.label"></label>
            <span class="weui-form-preview__value" v-html="item.value"></span>
          </div>
        </div>
      </div> -->

      <cell-form-preview
        v-if="formEleProp.isShowPreview"
        :list="formEleProp.list[i].data"
        :border-intent="formEleProp.itemborderIntent"
      >
      </cell-form-preview>
      <div class="gray_stripes" v-if="o.isShowGray"></div>
    </group>
    <!-- </scroller> -->
  </div>
</template>
<script>
import {
  Scroller,
  Radio,
  CellBox,
  CellFormPreview,
  Cell,
  Group,
  GroupTitle,
  XButton
} from "vux";
export default {
  name: "ccb-cell",
  data() {
    return {};
  },
  props: {
    radioObj: {
      type: Object,
      default: () => ({})
    },
    formEle: {
      type: Object,
      default: () => ({})
    },
    formEleProp: {
      type: Object,
      default: () => ({})
    },
    btnObj: {
      type: Object,
      default: () => ({})
    },
    groupTitle: {
      type: String
    },
    groupTitleColor: {
      type: String
    },
    groupLabelWidth: {
      type: String
    },
    groupLabelAlign: {
      type: String
    },
    groupLabelMarginRight: {
      type: String
    },
    groupGutter: {
      type: String
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs[this.formEleProp.scrollerBottomRef].reset({ top: 0 });
    // });
  },
  methods: {},
  components: {
    Scroller,
    CellFormPreview,
    Cell,
    Group,
    GroupTitle,
    XButton,
    CellBox,
    Radio
  }
};
</script>

<style lang="less" scope="scoped">
.ccb-cell {
  .weui-cells_radio {
    font-size: 13px;
  }
  .ccb-cell {
    // border-bottom: 0.01rem solid #d9d9d9;
    .weui-cell {
      border: none !important;
      // .vux-cell-no-border-intent {
      //   padding-top: 0 !important;
      //   padding-bottom: 0 !important;
      // }

      .vux-cell-form-preview {
        :before {
          border: none !important;
        }
        border-top: none !important;
      }

      .weui-cell__hd {
        padding-left: 0 !important;
      }
    }
  }
  .weui-btn {
    border-radius: 20px !important;
    color: #3966ae;
  }
  .weui-cell__ft {
    position: absolute;
    right: 20px;
    // right: 0px;
  }
  .weui-cell__ft.vux-cell-align-left {
    text-align: right !important;
  }
  // .weui-cell_access .weui-cell__ft:after {
  //   right: -0.2rem;
  // }
  .vux-cell-form-preview {
    padding-top: 0 !important;
  }
  .weui-cell:before {
    border: none !important;
  }
  .weui-cells__title {
    margin-top: 5px;
    height: 40px;
    line-height: 40px;
  }
  .vux-x-icon {
    fill: #3966ae;
  }
  .gray_stripes {
    height: 10px;
    background-color: #f6f6f6;
  }
  .weui-cells:before {
    border: none !important;
  }
  .weui-cells:after {
    border: none !important;
  }
  .vux-label-desc {
    color: #909191 !important;
    font-size: 12px;
  }
  .weui-form-preview__bd {
    color: black !important;
  }

  .weui-form-preview__label {
    margin-right: 0 !important;
    min-width: auto !important;
  }
  .weui-form-preview__value {
    padding-left: 10px;
  }
}
</style>

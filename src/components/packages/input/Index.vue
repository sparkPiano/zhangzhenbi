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
  <div class="ccb-input">
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
      <popup-radio
        v-if="o.isRadio"
        :title="o.title"
        :options="o.options2"
        v-model="o.default"
        :placeholder="o.placeholder"
        :style="o.cellStyle"
      >
        <p
          slot="popup-header"
          style="text-align: center;padding: 8px 0;color: #ffffff;font-size: 14px;background-color:#3A67AE;position: relative;"
        >
          <!-- <img src="@/assets/images/acc-close.png" /> -->
          <!-- <i
            class="iconfont icon-shanchu1"
            style="position: absolute;left: 10px;"
          ></i> -->
          <!-- 
            @click="o.closeRadio" -->
          {{ "请选择" + o.title }}
        </p>
      </popup-radio>
      <x-input
        v-if="o.isRadio == undefined"
        :style="o.cellStyle ? o.cellStyle : formEleProp.cellConStyle"
        :title="o.title ? o.title : ''"
        :value="o.value ? o.value : ''"
        :type="o.type ? o.type : ''"
        :is-type="o.isType ? o.isType : ''"
        :required="o.required ? o.required : false"
        :placeholder="o.placeholder ? o.placeholder : ''"
        :show-clear="o.showClear ? o.showClear : true"
        :min="o.min ? o.min : 1"
        :max="o.max ? o.max : 100"
        :disabled="o.disabled ? o.disabled : false"
        :readonly="o.readonly ? o.readonly : false"
        :debounce="o.debounce ? o.debounce : 0"
        :placeholder-align="o.placeholderAlign"
        :text-align="o.textAlign"
        :label-width="formEleProp.labelWidth"
        :mask="o.mask"
        :should-toast-error="o.shouldToastError ? o.shouldToastError : true"
        @on-blur="formEleProp.onBlur"
        @on-focus="formEleProp.onFocus"
        @on-enter="formEleProp.onEnter"
        @on-change="formEleProp.onChange"
        :ref="formEleProp.inputRef"
      >
        <!-- @on-click-error-icon="formEleProp.onClickErrorIcon" -->
        <!-- @on-click-clear-icon="formEleProp.onClickClearIcon" -->
        <!-- <template slot="label">
          <span
            class="ccb-search_pos"
            v-if="!this.$slots.label && formEleProp.isLabel"
            >{{ formEleProp.pos }}</span
          >
          <slot name="label"></slot>
        </template> -->
        <!-- <template v-if="!hasRightFullHeightSlot" class="vux-x-input-right-full">
          <slot name="right-full-height"></slot>
        </template>
        <template :style="formEleProp.labelStyles" v-if="!hasRestrictedLabel">
          <slot name="restricted-label"></slot>
        </template> -->
        <!-- <template slot="right">
          <div class="ccb-search_btn" v-if="formEleProp.isShowRight"> -->
        <div slot="right" v-if="formEleProp.isShowButton || o.isShowButton">
          <x-button
            @click.native="btnObj.refreshCode(o.title)"
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
        <div slot="right" v-if="o.isShowButton">
          <x-button
            @click.native="o.btnObj.refreshCode(i, o.btnObj.btnName)"
            :type="o.btnObj.btnType"
            :mini="o.btnObj.btnMini"
            :plain="o.btnObj.btnPlain"
            :disabled="o.btnObj.btnDisabled"
            :text="o.btnObj.btnName"
            :link="o.btnObj.btnLink"
            :gradients="o.btnObj.btnGradients"
            :action-type="o.btnObj.btnActionType"
            :show-loading="o.btnObj.btnShowLoading"
            :style="o.btnObj.btnStyle"
          >
            <template v-if="o.btnObj.extraImg">
              <img
                id="extraImg"
                style="vertival-align:middle;width:80px;height:22px;"
                :src="o.btnObj.extraImg"
              />
            </template>
            <!-- <template v-if="!this.$slots.cellBtnText">
              <i class="iconfont icon-filter" v-if="btnObj.isShowIcon"></i>
              <span class="ccb-search_btn__text">{{ btnObj.btnName }}</span>
            </template> -->
            <!-- <slot name="cellBtnText"></slot> -->
          </x-button>
        </div>
        <!-- <slot name="searchRightBtn"></slot>
          </div>
        </template> -->
      </x-input>
      <!-- v-if="formEleProp.isShowPreview" -->
      <cell-form-preview
        v-if="formEleProp.isShowPreview"
        :list="formEleProp.list[i].data"
        :border-intent="formEleProp.itemborderIntent"
      >
      </cell-form-preview>
      <div class="gray_stripes" v-if="o.isShowGray"></div>
      <!-- <template
        v-if="formEleProp.arrowDirection && formEleProp.isShowArrowDirection"
      >
        <slot name="arrowDirection"></slot>
      </template> -->
    </group>
  </div>
</template>
<script>
import {
  XInput,
  Radio,
  CellBox,
  CellFormPreview,
  Cell,
  Group,
  GroupTitle,
  XButton,
  PopupRadio,
  PopupPicker
} from "vux";
export default {
  name: "ccb-input",
  data() {
    return {};
  },
  props: {
    radioObj: {
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
  methods: {},
  components: {
    CellFormPreview,
    Cell,
    Group,
    GroupTitle,
    XButton,
    CellBox,
    Radio,
    XInput,
    PopupRadio,
    PopupPicker
  }
};
</script>

<style lang="less" scope="scoped">
.ccb-input {
  // .ccb-cell {
  //   // border-bottom: 0.01rem solid #d9d9d9;
  //   .weui-cell {
  //     border: none !important;
  //     // .vux-cell-no-border-intent {
  //     //   padding-top: 0 !important;
  //     //   padding-bottom: 0 !important;
  //     // }

  //     .vux-cell-form-preview {
  //       :before {
  //         border: none !important;
  //       }
  //       border-top: none !important;
  //     }

  //     .weui-cell__hd {
  //       padding-left: 0 !important;
  //     }
  //   }
  // }
  .weui-btn {
    padding-left: 0px;
  }
  // .weui-cell__ft {
  //   position: absolute;
  //   right: 20px;
  //   // right: 0px;
  // }
  // .weui-cell__ft.vux-cell-align-left {
  //   text-align: right !important;
  // }
  // // .weui-cell_access .weui-cell__ft:after {
  // //   right: -0.2rem;
  // // }
  // .vux-cell-form-preview {
  //   padding-top: 0 !important;
  // }
  // .weui-cell:before {
  //   border: none !important;
  // }
  // .weui-cells__title {
  //   margin-top: 5px;
  //   height: 40px;
  //   line-height: 40px;
  // }
  // .vux-x-icon {
  //   fill: #09b6f2;
  // }
  // .gray_stripes {
  //   height: 10px;
  //   background-color: #f6f6f6;
  // }
  // .weui-cells:before {
  //   border: none;
  // }
  .weui-cell__ft {
    text-align: left !important;
    display: flex;
    align-items: center;
  }
  // p {
  //   display: block !important;
  //   width: 1.05rem !important;
  //   flex: none !important;
  // }
  // .downPop .weui-cell__ft {
  //   position: inherit !important;
  //   width: 100%;
  // }
  // p {
  //   display: block !important;
  //   width: 1.05rem !important;
  //   flex: none !important;
  // }
  .vux-cell-bd {
    display: block !important;
    width: 1.05rem !important;
    flex: none !important;
  }
  .downRadio {
    font-size: 13px;
    background: #f4f8fb;
    position: relative;
    color: #2c3e50;
    .selectedCss {
      background-color: #3a66af;
      color: #ffffff;
    }

    .normalCss {
      padding: 0.1rem 0.15rem;
      position: relative;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
    }
  }
  .vux-popup-dialog {
    background-color: rgb(255, 255, 255) !important;
  }
  .vux-cell-value {
    color: #2c3e50;
  }
  .weui-cell_access .weui-cell__ft:after {
    left: 220px !important;
  }
}
</style>

<style lang="">
.weui-cell__ft .weui-icon-checked {
  display: none;
}
.weui-cells_radio .weui-cell__bd {
  text-align: center !important;
}
.vux-popup-dialog {
  height: 30% !important;
  display: flex;
  flex-direction: column;
}
.weui-cells_radio {
  flex: 1;
  overflow-y: scroll;
}
</style>

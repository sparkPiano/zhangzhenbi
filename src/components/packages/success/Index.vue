<!--
 * @Description: ccb-success
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-22 09:42:16
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-11 11:29:25
-->
<template>
  <card
    :header="formCard.header"
    :footer="formCard.footer"
    @on-click-footer="formCard.clickFooter"
    @on-click-header="formCard.clickHeader"
  >
    <div slot="content" class="x-success_card__content">
      <div class="x-success_header" v-if="!this.$slots.successHeader">
        <div class="x-success_header__one">
          <x-button
            :text="btnObj.header.text"
            :disabled="btnObj.header.disabled"
            :type="btnObj.header.type"
            :mini="btnObj.header.mini"
            :plain="btnObj.header.plain"
            :action-type="btnObj.header.actionType"
            :link="btnObj.header.link"
            :show-loading="btnObj.header.showLoading"
            :gradients="btnObj.header.gradients"
            @click.native="btnObj.header.completeOpr"
          ></x-button>
        </div>
        <div class="x-success_header__two">
          <div class="x-success_tips">{{ successTips }}</div>
          <div class="x-success_tips__desc">{{ successTipstDesc }}</div>
        </div>
        <div class="x-success_header__three" v-if="imgSrc || successImg">
          <img class="x-success_img" :src="imgSrc || successImg" />
        </div>
      </div>
      <div class="x-success_content" v-if="!this.$slots.successContent">
        <group
          :label-width="groupLabelWidth"
          :title="groupTitle"
          :title-color="groupTitleColor"
          :label-align="groupLabelAlign"
          :label-margin-right="groupLabelMarginRight"
          :gutter="groupGutter"
          v-if="isUseGroupStyle"
        >
          <group-title
            slot="title"
            v-show="!groupTitle && this.$slots.customGroupTitle"
            ><slot name="customGroupTitle"></slot
          ></group-title>
          <cell-form-preview
            :list="cellPreview.list"
            :border-intent="cellPreview.borderIntent"
          ></cell-form-preview>
        </group>
        <form-preview
          :header-label="normalPreview.headerLabel"
          :header-value="normalPreview.headerValue"
          :body-items="normalPreview.bodyItems"
          :footer-buttons="normalPreview.footerBtns"
          v-else
        ></form-preview>
        <div class="x-success_content__btn" v-if="!this.$slots.contentBtn">
          <x-button
            v-for="(item, index) in btnObj.content"
            :key="index"
            :text="item.text"
            :disabled="item.disabled"
            :type="item.type"
            :mini="item.mini"
            :plain="item.plain"
            :action-type="item.actionType"
            :link="item.link"
            :show-loading="item.showLoading"
            :gradients="item.gradients"
            @click.native="item.completeOpr"
          ></x-button>
        </div>
        <div class="x-success_content__btn" v-else>
          <slot name="contentBtn"></slot>
        </div>
      </div>
      <div class="x-success_footer" v-if="!this.$slots.successFooter">
        <card
          :header="successFooter.header"
          :footer="successFooter.footer"
          @on-click-footer="successFooter.clickFooter"
          @on-click-header="successFooter.clickHeader"
        >
          <div slot="content" class="x-success_footer__other">
            <slot name="footerContent"></slot></div
        ></card>
      </div>
      <slot name="successHeader"></slot>
      <slot name="successContent"></slot>
      <slot name="successFooter"></slot>
    </div>
  </card>
</template>

<script>
import { Card, XButton, GroupTitle, FormPreview, CellFormPreview } from "vux";
import successImg from "@/assets/images/success.png";
export default {
  name: "ccb-success",
  data() {
    return {
      successImg: successImg
    };
  },
  props: {
    imgSrc: {
      type: String
    },
    successTips: {
      type: String,
      default: "支取成功"
    },
    successTipstDesc: {
      type: String,
      default: "请于预约日期持本人有效身份证件前往预约网点办理提取业务。"
    },
    formCard: {
      type: Object,
      default: () => ({
        header: {},
        footer: {},
        clickFooter: () => ({}),
        clickHeader: () => ({})
      })
    },
    successFooter: {
      type: Object,
      default: () => ({
        header: { title: "更多精彩" },
        footer: {},
        clickFooter: () => ({}),
        clickHeader: () => ({})
      })
    },
    btnObj: {
      type: Object,
      default: () => ({
        header: {
          type: "default",
          disabled: false,
          mini: false,
          plain: false,
          showLoading: false,
          completeOpr: () => {
            console.log("completeOpr");
          }
        },
        content: [
          {
            type: "default",
            disabled: false,
            mini: false,
            plain: false,
            showLoading: false,
            completeOpr: () => {
              console.log("completeOpr-content1");
            }
          },
          {
            type: "default",
            disabled: false,
            mini: false,
            plain: false,
            showLoading: false,
            completeOpr: () => {
              console.log("completeOpr-content2");
            }
          }
        ]
      })
    },
    cellPreview: {
      type: Object,
      default: () => ({
        borderIntent: true
      })
    },
    normalPreview: {
      type: Object,
      default: () => ({
        bodyItems: [],
        footerBtns: []
      })
    },
    isUseGroupStyle: {
      type: Boolean,
      default: true
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
  methods: {
    completeOpr() {
      console.log("completeOpr", this);
    }
  },
  components: {
    Card,
    XButton,
    GroupTitle,
    FormPreview,
    CellFormPreview
  }
};
</script>
<style lang="less" scoped>
.x-success_content {
  /deep/ .weui-cell.vux-cell-form-preview {
    padding: 10px 25px;
  }
}
</style>

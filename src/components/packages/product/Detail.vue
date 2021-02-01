<!--
 * @Description: ccb-detail
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-09 16:28:09
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-09 10:34:17
-->
<template>
  <div class="ccb-detail">
    <template v-if="!this.$slots.customDetail">
      <div class="ccb-detail_img">
        <img :src="formEleProp.img" alt="" v-if="!this.$slots.img" />
        <slot name="img"></slot>
      </div>
      <div class="ccb-detail_desc">
        <template v-if="!this.$slots.desc">
          <div class="ccb-detail_desc__title">
            <div class="ccb-detail_desc__name">{{ formEleProp.title }}</div>
            <div class="ccb-detail_desc__price">
              {{ `${formEleProp.price}元/${formEleProp.unit}` }}
            </div>
            <div
              class="ccb-detail_desc__qrcode"
              @click="showOrHideDialog(true)"
            >
              <qrcode
                :value="qrCode.val"
                :type="qrCode.type"
                :size="qrCode.size"
                :bg-color="qrCode.bgColor"
                :fg-color="qrCode.fgColor"
              ></qrcode>
            </div>
          </div>
          <div class="ccb-detail_desc__content">
            <template v-if="!this.$slots.content">
              <div class="ccb-detail_item">
                <label>产品代码</label>
                <span>{{ formEleProp.productNo }}</span>
              </div>
              <div class="ccb-detail_item">
                <label>套内数量</label>
                <span>{{ formEleProp.numbers }}{{ formEleProp.numUnit }}</span>
              </div>
              <div
                class="ccb-detail_item"
                v-if="
                  formEleProp.expDelivery && formEleProp.receiptWayNo == '01'
                "
              >
                <label>快递</label>
                <span>{{ formEleProp.expDelivery }}</span>
              </div>
            </template>
            <slot name="content"></slot>
          </div>
        </template>
        <slot name="desc"></slot>
      </div>
      <div
        class="ccb-detail_receiptway"
        ccb-detail_receiptway
        v-if="!this.$slots.receiptway"
      >
        <div class="ccb-detail_item">
          <label>提取方式</label>
          <span>{{ formEleProp.receiptWay }}</span>
        </div>
      </div>
      <slot name="receiptway" v-else>{{}}</slot>
      <div class="ccb-detail_productdesc" v-if="!this.$slots.productdesc">
        <div class="ccb-detail_productdesc__name">产品介绍</div>
        <div
          class="ccb-detail_productdesc__content"
          v-html="
            formEleProp.productDesc.replace(/\r\n|\n\r|\r|\n/gi, '<br />')
          "
        ></div>
      </div>
      <slot name="productdesc" v-else></slot>
    </template>
    <slot name="customDetail"></slot>
    <div v-transfer-dom>
      <x-dialog v-model="showDialog" class="ccb-dialog">
        <div class="ccb-dialog-logo">
          <div class="ccb-dialog-logo_img">
            <img :src="ccbLogo" alt="" />
          </div>
        </div>
        <div id="imageWraper">
          <div class="ccb-dialog-title">{{ formEleProp.title }}</div>
          <div class="ccb-dialog-img-box">
            <qrcode
              :value="qrCode.val"
              :type="qrCode.type"
              :size="160"
              :bg-color="qrCode.bgColor"
              :fg-color="qrCode.fgColor"
            ></qrcode>
          </div>
          <div class="ccb-dialog-tips">
            <span>打开微信扫一扫识别</span>
          </div>
        </div>
        <div class="ccb-dialog-btn">
          <x-button
            v-if="!this.$slots.saveBtn"
            :type="saveBtn.btnType"
            :mini="saveBtn.btnMini"
            :plain="saveBtn.btnPlain"
            :disabled="saveBtn.btnDisabled"
            :text="saveBtn.btnName"
            :link="saveBtn.btnLink"
            :gradients="saveBtn.btnGradients"
            :action-type="saveBtn.btnActionType"
            :show-loading="saveBtn.btnShowLoading"
            @click.native="saveBtn.saveToMobile(formEleProp.title)"
          >
            <template v-if="!this.$slots.saveBtnText">
              <i
                class="iconfont"
                :class="saveBtn.iconClass"
                v-if="saveBtn.iconClass"
              ></i>
              <span class="ccb-cart_btn__text">{{ saveBtn.btnName }}</span>
            </template>
            <slot name="saveBtnText"></slot>
          </x-button>
          <slot name="saveBtn" v-else></slot>

          <x-button
            v-if="!this.$slots.shareBtn"
            :type="shareBtn.btnType"
            :mini="shareBtn.btnMini"
            :plain="shareBtn.btnPlain"
            :disabled="shareBtn.btnDisabled"
            :text="shareBtn.btnName"
            :link="shareBtn.btnLink"
            :gradients="shareBtn.btnGradients"
            :action-type="shareBtn.btnActionType"
            :show-loading="shareBtn.btnShowLoading"
            @click.native="
              shareBtn.share(
                formEleProp.title,
                formEleProp.productDesc.replace(/\r\n|\n\r|\r|\n/gi, '<br />')
              )
            "
          >
            <template v-if="!this.$slots.shareBtnText">
              <i
                class="iconfont"
                :class="shareBtn.iconClass"
                v-if="shareBtn.iconClass"
              ></i>
              <span class="ccb-cart_btn__text">{{ shareBtn.btnName }}</span>
            </template>
            <slot name="shareBtnText"></slot>
          </x-button>
          <slot name="shareBtn" v-else></slot>
        </div>
        <div @click="showOrHideDialog(false)" class="ccb-dialog-close">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import {
  Qrcode,
  TransferDomDirective as TransferDom,
  XDialog,
  XButton
} from "vux";
import ccbLogo from "@/assets/images/ccb_logo.png";
export default {
  name: "ccb-detail",
  data() {
    return {
      ccbLogo: ccbLogo
    };
  },
  directives: {
    TransferDom
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    formEleProp: {
      type: Object,
      default: () => ({})
    },
    qrCode: {
      type: Object,
      default: () => ({})
    },
    saveBtn: {
      type: Object,
      default: () => ({})
    },
    shareBtn: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    showOrHideDialog(val) {
      this.$emit("showOrHideDialog", val);
    }
  },
  components: {
    Qrcode,
    XDialog,
    XButton
  }
};
</script>
<style lang="less" scoped>
.ccb-dialog-btn {
  display: flex;
  position: relative;
  padding: 10px 0;
  .weui-btn {
    width: 100%;
    border-width: 0;
  }
  .weui-btn + .weui-btn {
    margin-top: 0 !important;
  }
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    color: #d9d9d9;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }
  &::after {
    content: " ";
    position: absolute;
    left: 50%;
    top: 0;
    width: 1px;
    bottom: 0;
    border-right: 1px solid #d9d9d9;
    color: #d9d9d9;
    transform-origin: 100% 0;
    transform: scaleX(0.5);
  }
}
.ccb-dialog-close {
  background-color: transparent;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 5010;
  margin-top: 20px;
  border-radius: 50%;
  border: 1px solid #ffffff;
}
.vux-close {
  width: 30px;
  height: 30px;
  &::before,
  &::after {
    top: 15px;
    width: 30px;
    background-color: #ffffff;
  }
}
</style>

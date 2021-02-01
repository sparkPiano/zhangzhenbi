<!--
 * @Description: ccb-buoy
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-06 15:36:33
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-10 18:03:48
-->
<template>
  <masker
    :color="formEleProp.color"
    :opacity="formEleProp.opacity"
    :fullscreen="formEleProp.fullscreen"
  >
    <template v-if="!this.$slots.customMasker">
      <div v-if="!this.$slots.customgBg" class="ccb-buoy-img">
        <img :src="imgSrc" alt="" />
      </div>
      <slot name="customgBg" v-else></slot>
      <div slot="content" class="ccb-buoy-title">
        <badge
          :text="formEleProp.badgeText"
          v-if="!this.$slots.customContent && formEleProp.badgeText > 0"
        ></badge>
        <slot name="customContent" v-else></slot>
      </div>
    </template>
    <slot name="customMasker"></slot>
  </masker>
</template>

<script>
import imgSrc from "../../../assets/images/b1x.png";
import { Masker, Badge } from "vux";
export default {
  name: "ccb-buoy",
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
    imgSrc: {
      type: String,
      default: imgSrc
    }
  },
  methods: {},
  components: {
    Masker,
    Badge
  }
};
</script>
<style lang="less" scoped>
.ccb-buoy-img {
  display: block;
  position: relative;
  height: 50px;
  width: 50px;
  // border-radius: 50%;
  z-index: 10;
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
}
.ccb-buoy-title {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  .vux-badge-single {
    width: 20px;
  }
  .vux-badge {
    height: 20px;
    line-height: 20px;
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: #ffffff;
    color: rgb(57, 102, 174);
    font-size: 14px;
  }
}
</style>

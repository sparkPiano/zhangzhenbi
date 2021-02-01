<!--
 * @Description: ads
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-14 11:05:23
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-10-14 15:01:30
-->
<template>
  <div class="x-ads">
    <swiper
      :loop="loop"
      :auto="auto"
      :list="adsList"
      :index="adsIndex"
      :direction="direction"
      :show-dots="showDots"
      :show-desc-mask="showDescMask"
      :dots-position="dotsPosition"
      :dots-class="dotsClass"
      :interval="interval"
      :threshold="threshold"
      :duration="duration"
      :height="adsHeight"
      :aspect-ratio="aspectRatio"
      :min-moving-distance="minMovingDistance"
      @on-index-change="ads_onIndexChange"
      @click.native="openAd(adsIndex)"
    >
      <slot name="swiperItem"></slot>
    </swiper>
  </div>
</template>

<script>
import { Swiper } from "vux";
export default {
  name: "x-ads",
  data() {
    return {
      adsIndex: 0
    };
  },
  props: {
    adsEvent: {
      type: String,
      default: "showAd"
    },
    adsList: {
      type: Array
    },
    showDots: {
      type: Boolean,
      default: true
    },
    showDescMask: {
      type: Boolean,
      default: true
    },
    dotsPosition: {
      type: String,
      default: "right"
    },
    dotsClass: {
      type: String
    },
    auto: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    threshold: {
      type: Number,
      default: 50
    },
    duration: {
      type: Number,
      default: 300
    },
    aspectRatio: {
      type: Number
    },
    minMovingDistance: {
      type: Number
    },
    adsHeight: {
      type: String,
      default: "180px"
    },
    direction: {
      type: String,
      default: "horizontal"
    }
  },
  methods: {
    ads_onIndexChange(index) {
      let that = this;
      console.log("adsIndex", index);
      that.adsIndex = index;
    },
    openAd(item) {
      let that = this;
      console.log("item", item);
      that.$emit(that.adsEvent, item);
    }
  },
  components: {
    Swiper
  }
};
</script>

<style lang="less" scoped></style>

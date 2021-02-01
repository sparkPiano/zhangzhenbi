<!--
 * @Description: ccb-ads
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-23 15:18:22
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-02 17:07:25
-->
<template>
  <div class="x-ads_more">
    <img :src="imgUrl" alt="" class="x-ads_img" />
    <slot name="adsContent"></slot>
    <slot name="adsImg"></slot>
  </div>
</template>
<script>
export default {
  name: "ccb-ads",
  data() {
    return {};
  },
  props: {
    imgUrl: {
      type: String
    }
  },
  methods: {},
  components: {}
};
</script>
<style lang="less" scoped></style>

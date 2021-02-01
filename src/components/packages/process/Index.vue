<!--
 * @Description: ccb-search
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-04 15:18:26
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-06 09:42:43
-->
<template>
  <div class="ccb-process" v-if="JSON.stringify(dataProcess.data) != '[]'">
    <div class="line"></div>
    <div
      class="wrap"
      v-for="(itemName, index) of dataProcess.data"
      :key="index"
    >
      <!-- :class="index != 0 ? 'aaa' : 'active'" -->

      <!-- <text class="text1">{{ itemName.opeTime }}</text> -->
      <div :class="index != 0 ? 'noneC icon' : 'activeIcon icon'"></div>
      <div :class="index != 0 ? 'title' : 'title active'">
        <div>{{ itemName.opeDate }}</div>
        <div>{{ itemName.opeTime }}</div>
      </div>

      <div
        v-if="itemName.opeTitle"
        :class="index != 0 ? 'time blackC fontS' : 'time2'"
      >
        {{ itemName.opeTitle }}
      </div>
      <div :class="index != 0 ? 'time' : 'time blackC'">
        {{ itemName.opeRemark }}
      </div>
    </div>
  </div>
</template>
<script>
import { Cell } from "vux";
export default {
  name: "ccb-process",
  data() {
    return {};
  },
  props: {
    dataProcess: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {},
  components: {
    Cell
  }
};
</script>

<style lang="less" scope="scoped">
.ccb-process {
  background: #fff;
  position: relative;
  padding-left: 70px;
  color: #999;
  // border-radius: 0px 0px 20px 20px;
  .line {
    min-height: 0.8rem;
    position: absolute;
    top: 25px;
    bottom: 82px;
    border-left: 1px solid #ccc;
    left: 75px;
    z-index: 1;
  }

  .wrap {
    text-align: left;
    min-height: 0.8rem;
  }

  .wrap:last-child {
    // height: 66px;
    border: none;
  }
  .aaa {
    margin: 0px;
    padding: 0px;
  }
  .text1 {
    padding: 0px 0px 0px 10px;
    width: 140px;
    height: 40px;
    position: relative;
    left: -0px;
    z-index: 5;
    float: left;
    // top: 35px;
    font-size: 14px;
  }
  .activeIcon {
    color: #27b6f2;
    background: #27b6f2;
  }
  .active {
    color: #27b6f2;
  }
  .noneC {
    color: #ccc;
    background: #ccc;
  }
  .blackC {
    color: #2c3e50;
  }
  .fontS {
    font-size: 14px;
  }
  .time {
    font-size: 12px;
    // margin-top: 32px;
    margin-left: 30px;
    width: 220px;
    // line-height: 16px;
  }
  .time2 {
    font-size: 14px;
    // margin-top: 22px;
    margin-left: 30px;
    // width: 470px;
    color: #27b6f2;
    // line-height: 16px;
  }

  .icon {
    padding: 0px 0px 0px 0px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: relative;
    top: 20px;
    z-index: 5;
  }

  .title {
    position: absolute;
    font-size: 12px;
    margin-left: 20px;
    left: 0;
    // width: 50px;
    text-align: right;
  }
  .title div:last-child {
    font-size: 10px;
    line-height: 10px;
  }
}
</style>

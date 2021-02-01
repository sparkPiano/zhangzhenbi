<template>
  <div class="race-panle">
    <div
      class="wrap"
      :style="'left:' + warpLeft + 'px;width:' + wrapWidth + 'px;'"
    >
      <div
        class="text"
        v-for="(item, index) in formEleProp.paomadengList"
        :key="index"
      >
        {{ item.msg_desc }}
      </div>
    </div>
  </div>
</template>

<script>
// import {  } from '@/'
export default {
  name: "ccb-raceLamp",
  props: {
    formEleProp: {
      type: Object,
      default: () => {
        return {};
      }
    },
    list: {
      type: [Array],
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      wrapWidth: 0,
      warpLeft: 0,
      racePanleWidth: 0
    };
  },
  created() {},
  mounted() {
    let listLength = this.formEleProp.paomadengList.length;
    let textWidth = document.getElementsByClassName("text")[0].offsetWidth;
    this.wrapWidth = listLength * textWidth;
    this.racePanleWidth = document.getElementsByClassName(
      "race-panle"
    )[0].offsetWidth;
    this.raceInit();
  },
  methods: {
    raceInit() {
      let that = this;
      let timeRace = setInterval(() => {
        that.warpLeft -= 1;
        if (that.warpLeft < -300) {
          that.warpLeft = 0;
        }
      }, 20);
    }
  }
};
</script>

<style lang="less" scoped>
.race-panle {
  width: 100%;
  height: 34px;
  overflow: scroll;
  position: relative;
  .wrap {
    width: 300%;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    .text {
      padding-left: 50px;
    }
  }
}
</style>

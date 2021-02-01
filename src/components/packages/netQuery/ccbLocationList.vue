<template>
  <div class="ccbLocationList">
    <div
      class="locationIcon"
      @click="handleLocationIcon1"
      v-bind:class="{ blue: handleLocationIcon }"
    >
      <img :src="locationIcon" alt="" />
      <span>地图</span>
    </div>
    <div class="line"></div>
    <div
      class="locationIcon"
      @click="listIcon1"
      v-bind:class="{ blue: listIconClass }"
    >
      <img :src="listIcon" alt="" />
      <span>列表</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ccbLocationList",
  components: {},
  props: {
    showType: {
      type: String
    }
  },
  data() {
    return {
      locationIcon: require("@/assets/images/ditu-xuanzhong.png"),
      listIcon: require("@/assets/images/liebiao-weixuanzhong.png"),
      handleLocationIcon: true,
      listIconClass: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 地图
    handleLocationIcon1() {
      this.handleLocationIcon = true;
      this.listIconClass = false;
      this.locationIcon = require("@/assets/images/ditu-xuanzhong.png");
      this.listIcon = require("@/assets/images/liebiao-weixuanzhong.png");
      this.$store.commit("updateShowType", { value: "1" });
      this.$store.commit("updateNetDetailCom", { value: true });
    },
    // 列表
    listIcon1() {
      this.listIconClass = true;
      this.handleLocationIcon = false;
      this.locationIcon = require("@/assets/images/ditu-weixuanzhong.png");
      this.listIcon = require("@/assets/images/liebiao-xuanzhong.png");
      this.$store.commit("updateShowType", { value: "2" });
      this.$store.commit("updateNetDetailCom", { value: false });
    }
  }
};
</script>

<style lang="less" scoped>
.ccbLocationList {
  position: fixed;
  bottom: 120px;
  left: 20px;
  width: 180px;
  height: 40px;
  background: #999;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .blue {
    color: #3865af !important;
  }
  img {
    width: 30px;
    height: 30px;
  }
  .line {
    width: 0.5px;
    height: 30px;
    background: #fefffe;
  }
  .locationIcon {
    font-size: 13px;
    color: white;
    align-items: center;
    display: flex;
    span {
      margin-left: 5px;
    }
  }
}
</style>

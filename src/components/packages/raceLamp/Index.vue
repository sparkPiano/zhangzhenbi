<template>
  <div class="ccb-raceLamp">
    <notice-bar
      class="notice-bar-left-icon-none"
      :text="formEleProp.raceLampList"
      :bg-color="formEleProp.raceLampBgColor"
      :color="formEleProp.raceLampColor"
      :duration="30"
    />
  </div>
</template>
<script>
export default {
  name: "ccb-raceLamp",
  components: {},
  data() {
    return {
      timer: null
    };
  },
  props: {
    formEleProp: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  created() {},
  mounted() {},
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    handleNotice(e) {
      console.log("handleNotice", e);
    }
  }
};
</script>
<style scoped lang="less">
.notice-bar {
  font-size: 12px;
}
</style>
<style lang="less">
.ccb-raceLamp {
  .notice-bar {
    padding-left: 10px;
  }
  .left-icon {
    display: none !important;
  }
  .notice-bar .text-container {
    width: 100%;
    margin-left: 0;
  }
}
</style>

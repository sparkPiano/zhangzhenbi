<template>
  <div id="app">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <div v-transfer-dom>
      <actionsheet
        :menus="menus"
        v-model="showMenu"
        @on-click-menu="selectMenu"
      ></actionsheet>
    </div>
    <view-box
      ref="viewBox"
      class="ccb-viewbox"
      v-if="this.$route.meta.isShowTabbar"
    >
      <x-header
        v-if="isShowNav && $route.meta.isShowHeader"
        slot="header"
        class="header"
        :left-options="leftOptions"
        :right-options="rightOptions"
        :title="title"
        :transition="headerTransition"
        @on-click-more="onClickMore"
      ></x-header>
      <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
      <div class="el-logo">
        <!-- <img :src="this.logo" /> -->
      </div>
      <transition
        @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
        :name="viewTransition"
        :css="!!direction"
      >
        <router-view
          class="router-view"
          :class="{ isVisibility: $route.meta.isShowHeader ? true : false }"
        >
        </router-view>
      </transition>
      <tabbar slot="bottom" class="vux-ccb-tabbar" icon-class="vux-center">
        <tabbar-item
          :link="{
            path: '/home',
            name: 'home',
            params: { login: this.$store.state.login }
          }"
          :selected="route.path === '/home'"
        >
          <span
            class="ccb-icon-22 vux-ccb-tabbar-icon-home"
            slot="icon"
            style="position:relative;top: -2px;"
            >&#xe637;</span
          >
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item
          :link="{
            path: '/apps',
            name: 'apps',
            params: { login: this.$store.state.login }
          }"
          :selected="route.path === '/apps'"
          badge="9"
        >
          <span class="ccb-icon-22" slot="icon">&#xe633;</span>
          <span slot="label">
            <span>应用</span>
          </span>
        </tabbar-item>
      </tabbar>
    </view-box>
    <view-box ref="viewBox" class="ccb-viewbox" v-else>
      <x-header
        v-if="isShowNav && $route.meta.isShowHeader"
        slot="header"
        class="header"
        :left-options="leftOptions"
        :right-options="rightOptions"
        :title="title"
        :transition="headerTransition"
        @on-click-more="onClickMore"
      ></x-header>
      <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
      <div class="el-logo">
        <!-- <img :src="this.logo" /> -->
      </div>
      <transition
        @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
        :name="viewTransition"
        :css="!!direction"
      >
        <router-view
          class="router-view"
          :class="{ isVisibility: $route.meta.isShowHeader ? true : false }"
        ></router-view>
      </transition>
      <!-- <div class="footer">
        <span>版权所有中国建设银行版权所有京IPC备13030780号</span>
        <br />
        <span>京公网安备：110102000450</span>
      </div> -->
      <!-- <tabbar slot="bottom" class="vux-ccb-tabbar" icon-class="vux-center">
        <tabbar-item :link="{ path: '/' }" :selected="route.path === '/'">
          <span
            class="ccb-icon-22 vux-ccb-tabbar-icon-home"
            slot="icon"
            style="position:relative;top: -2px;"
            >&#xe637;</span
          >
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item
          :link="{ path: '/apps' }"
          :selected="route.path === '/apps'"
          badge="9"
        >
          <span class="ccb-icon-22" slot="icon">&#xe633;</span>
          <span slot="label">
            <span>应用</span>
          </span>
        </tabbar-item>
      </tabbar>-->
    </view-box>
  </div>
</template>
<script>
// import logo from "@/assets/images/logo.png";
// import { bannerList } from "./plugins/banner";
import {
  Actionsheet,
  ViewBox,
  XHeader,
  Tabbar,
  TabbarItem,
  Loading,
  TransferDom
} from "vux";
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { mixin } from "@/mixins/mixin";
export default {
  mixins: [mixin],
  directives: {
    TransferDom
  },
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Loading,
    Actionsheet
  },
  methods: {
    onClickMore() {
      let that = this;
      that.showMenu = true;
    },
    selectMenu() {},
    ...mapActions(["updateFiveGPosition"])
  },
  created() {},
  mounted() {
    let that = this;
    that.handler = () => {
      if (that.path === "/home") {
        that.box = document.querySelector("#home");
        that.updateFiveGPosition(that.box.scrollTop);
      }
    };
    that.$nextTick(() => {
      that.entryUrl = that.eUrl;
    });
  },
  beforeDestroy() {
    let that = this;
    that.box && that.box.removeEventListener("scroll", that.handler, false);
  },
  watch: {
    path(path) {
      let that = this;
      if (path === "/home") {
        setTimeout(() => {
          that.box = document.querySelector("#home");
          if (that.box) {
            that.box.removeEventListener("scroll", that.handler, false);
            that.box.addEventListener("scroll", that.handler, false);
          }
        }, 1000);
      } else {
        that.box && that.box.removeEventListener("scroll", that.handler, false);
      }
      if (!that.$route.meta.isShowTabbar) {
        console.log(
          "isShowTabbar",
          that.$route.meta.isShowTabbar,
          document.querySelector("#vux_view_box_body")
        );
        document
          .querySelector("#vux_view_box_body")
          .classList.add("ccb-showtabbar");
      } else {
        document
          .querySelector("#vux_view_box_body")
          .classList.remove("ccb-showtabbar");
      }
      if (!that.$route.meta.isShowHeader) {
        document
          .querySelector("#vux_view_box_body")
          .classList.add("hiheHeader");
      } else {
        document
          .querySelector("#vux_view_box_body")
          .classList.remove("hiheHeader");
      }
    },
    entryUrl: {
      handler(oldVal, newVal) {
        console.log("oldEntryUrl,newEntryUrl", oldVal, newVal);
      }
    }
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      deviceready: state => state.app.deviceready,
      fiveGTop: state => state.vux.fiveGScrollTop,
      isLoading: state => {
        // console.log("computed isLoading", state);
        return state.vux.isLoading;
      },
      direction: state => state.vux.direction,
      eUrl: state => state.entryUrl
    }),
    isShowNav() {
      let that = this;
      // eslint-disable-next-line no-console
      console.log("entryUrl", that.$store.state.entryUrl);
      if (that.$store.state.entryUrl.indexOf("hide-nav") > -1) {
        return false;
      }
      return true;
    },
    leftOptions() {
      return {
        // showBack: this.$route.path != "/home" ? true : false,
        // backText: this.$route.path != "/home" ? this.$route.meta.name : ""
        showBack: !this.$route.meta.isShowTabbar ? true : false,
        backText: !this.$route.meta.isShowTabbar ? this.$route.meta.name : "",
        preventGoBack: false
      };
    },
    rightOptions() {
      return {
        showMore: false
      };
    },
    headerTransition() {
      let that = this;
      if (!that.direction) return "";
      console.log("direction", that.direction);
      return that.direction === "forward"
        ? "vux-header-fade-in-right"
        : "vux-header-fade-in-left";
    },
    // eslint-disable-next-line vue/return-in-computed-property
    componentName() {
      let that = this;
      if (that.route.path) {
        const parts = that.route.path.split("/");
        if (/component/.test(that.route.path) && parts[2]) return parts[2];
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    title() {
      let that = this;
      if (that.route.path === "/home") return "首页";
      if (that.route.path === "/apps") return "应用";
      // if (that.route.path === "/services") return "5G消息服务开通";
    },
    viewTransition() {
      let that = this;
      if (!that.direction) return "";
      return "vux-pop-" + (that.direction === "forward" ? "in" : "out");
    }
  },
  data() {
    return {
      entryUrl: this.$store.state.entryUrl,
      showMenu: false,
      drawerVisibility: false,
      menus: {
        en: "English",
        "zh-CN": "中文"
      },
      mark: 0,
      autoTimer: null
      // logo: `${logo}`
    };
  }
};
</script>
<style>
@import "./assets/iconfonts/iconfont.css";
</style>
<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/tap.less";
@import "~vux/src/styles/close.less";
@import "./assets/styles/global.less";
@import "./assets/styles/variables.less";
@import "./assets/styles/xnqui.less";
html {
  .html();
}
body {
  .body();
  .globalBg();
}
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  overflow: hidden;
  .weui-panel {
    background-color: #ffffff;
    margin-top: 0;
    // &::before,
    // &::after {
    //   height: 0;
    //   border: 0;
    // }
  }

  .header {
    width: 100%;
    height: 46px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    background-color: @header-background-color;
  }

  .vux-header .vux-header-left {
    width: 100%;
  }
  .vux-header .vux-header-left .vux-header-back {
    color: #fff;
    padding-left: 0;
    display: block;
    position: absolute;
    left: 45%;
    transform: translate(-45%, 0);
  }
  .vux-header .vux-header-right .vux-header-more {
    &::after {
      font-size: @fontSize12;
    }
  }
  .vux-header {
    .vux-header-left {
      .left-arrow {
        &::before {
          border: @leftborder;
          border-width: 1px 0 0 1px;
        }
        &::after {
          content: " ";
          display: block;
          position: relative;
          width: 1px;
          height: 21px;
          line-height: 21px;
          left: 22px;
          background: #cccccc52;
          top: 4px;
        }
      }
    }
  }
  .weui-tab__panel {
    background-color: #ffffff;
    padding-top: 46px;
    padding-bottom: 60px;
  }
  .el-logo {
    .logo();
  }
  .router-view {
    background-color: #f2f2f2;
    height: auto;
  }
  .router-view div:first-child {
    // margin-top: 0;
  }
  #vux_view_box_body.ccb-showtabbar {
    padding-bottom: 0;
  }
  #vux_view_box_body.hiheHeader {
    padding-top: 0;
  }
}
.weui-grids:before {
  // border-top: 1px solid #1e9fff @important;
  // color: #c2c2c2 @important;
  border-top: 0 @important;
  height: 0 @important;
}
.ccb-icon-22 {
  font-family: "Microsoft YaHei", "微软雅黑", KaiTi, STXingkai, STKaiti,
    sans-serif;
  font-size: @fontSize24;
  color: #888;
}
.weui-tabbar.vux-ccb-tabbar {
  background-color: #ffffff;
}
.vux-ccb-tabbar .weui-bar__item_on .ccb-icon-22 {
  color: #f70968;
}
.vux-ccb-tabbar .weui-tabbar_item.weui-bar__item_on .vux-ccb-tabbar-icon-home {
  color: rgb(53, 73, 94);
}
.ccb-icon-22:before {
  content: attr(icon);
}
.vux-ccb-tabbar-component {
  background-color: #f70968;
  color: #fff;
  border-radius: 7px;
  padding: 0 4px;
  line-height: 14px;
}
.weui-tabbar__icon {
  width: 37.5px;
  height: 37.5px;
}
.weui-tabbar__icon + .weui-tabbar__label {
  margin-top: 0 !important;
  font-size: @fontSize12;
}
.vux-ccb-header-box {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
@font-face {
  font-family: PingFangSC-Regular, "Microsoft YaHei", "微软雅黑", KaiTi,
    STXingkai, STKaiti, sans-serif;
  src: url("./assets/iconfonts/font_70323_wlronpvr565yiudi.eot");
  src: url("./assets/iconfonts/font_70323_wlronpvr565yiudi.eot?#iefix")
      format("embedded-opentype"),
    url("./assets/iconfonts/font_70323_wlronpvr565yiudi.woff") format("woff"),
    url("./assets/iconfonts/font_70323_wlronpvr565yiudi.ttf") format("truetype"),
    url("./assets/iconfonts/font_70323_wlronpvr565yiudi.svg#iconfont")
      format("svg");
}
.ccb-icon {
  font-family: PingFangSC-Regular, "Microsoft YaHei", "微软雅黑", KaiTi,
    STXingkai, STKaiti, sans-serif;
  font-size: @fontSize20;
  color: #04be02;
}
.ccb-icon-big {
  font-size: @fontSize28;
}
.ccb-icon:before {
  content: attr(icon);
}
.router-view {
  width: 100%;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  font-size: @fontSize12;
  text-align: center;
}

.vux-check-icon > .weui-icon-success,
.vux-check-icon > .weui-icon-success-circle {
  &:before {
    color: rgb(9, 182, 242);
  }
}
.weui-icon-success {
  font-size: @fontSize32;
  color: rgb(9, 182, 242);
}
.weui-icon-circle {
  font-size: @fontSize32;
}
.vux-popup-header {
  background-color: #ffffff !important;
  border-radius: 16px 16px 0 0;
}
.vux-popup-header-left,
.vux-popup-header-right {
  font-family: PingFangSC-Regular, "Microsoft YaHei", "微软雅黑", KaiTi,
    STXingkai, STKaiti, sans-serif;
  font-size: @fontSize16;
  color: rgb(9, 182, 242);
}
.vux-popup-dialog {
  // background-color: transparent !important;
}
.vux-picker {
  background-color: #fff;
}
.vux-x-dialog-absolute .weui-dialog {
  position: fixed;
}
.weui-dialog {
  max-width: 750px;
  max-height: 667px;
  border-radius: 20px;
}
.weui-dialog__hd {
  padding-top: 20px;
}
.weui-dialog__title {
  font-family: PingFangSC-Regular, "Microsoft YaHei", "微软雅黑", KaiTi,
    STXingkai, STKaiti, sans-serif;
  font-size: @fontSize14 !important;
  color: #333333 !important;
  letter-spacing: 0;
  text-align: center !important;
  line-height: @fontSize14 !important;
}
.weui-dialog__bd {
  font-size: 13px !important;
  color: rgb(131, 131, 131);
  text-align: left !important;
  padding: 10px !important;
}
.weui-dialog__ft {
  font-family: PingFangSC-Regular, "Microsoft YaHei", "微软雅黑", KaiTi,
    STXingkai, STKaiti, sans-serif;
  font-size: @fontSize14 !important;
  letter-spacing: 0;
  text-align: center !important;
  padding: 0;
}
.weui-dialog__btn_primary {
  color: rgb(9, 182, 242) !important;
}
// .weui-actionsheet_toggle {
//   background-color: transparent !important;
// }
// .weui-actionsheet__menu {
//   border-top-left-radius: 30px;
//   border-top-right-radius: 30px;
// }
// .weui-actionsheet__cell {
//   padding: 20px 0 !important;
//   font-size: 28px !important;
// }
.scroller-item {
  font-family: PingFangSC-Regular, "Microsoft YaHei", "微软雅黑", KaiTi,
    STXingkai, STKaiti, sans-serif;
  font-size: @fontSize16 !important;
  color: #333333 !important;
  text-align: center !important;
}
</style>

<template>
  <div class="ccb-net-list-map" id="container">
    <baidu-map
      :center="center"
      :zoom="zoom"
      class="bm-view"
      @dragend="dragend($event)"
      @ready="handler"
      :offset="{ width: 0, height: 100 }"
    >
      <!-- 标记点-->
      <bm-marker
        v-for="(item, index) in formEleProp.list"
        :key="index"
        @click="handlerMarker(index)"
        :position="{ lng: item.longitude, lat: item.latitude }"
        :dragging="false"
        animation="BMAP_ANIMATION_BOUNCE"
        :icon="{
          url: item.url,
          opts: { imageSize: { width: 26, height: 36 } },
          size: { width: 26, height: 36 }
        }"
      >
        <bm-label
          v-if="item.Cur_StCd == '0'"
          content="休息中"
          :labelStyle="formEleProp.bmLabelStyle"
          :offset="{ width: -5, height: -16 }"
        />
      </bm-marker>
      <!-- 定位功能-->
      <bm-geolocation
        :showAddressBar="true"
        :autoLocation="true"
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :offset="{ width: 5, height: 70 }"
      >
      </bm-geolocation>
      <!-- 地图 卫星 三维-->
      <bm-map-type
        :map-types="[
          'BMAP_NORMAL_MAP',
          'BMAP_HYBRID_MAP',
          'BMAP_SATELLITE_MAP',
          'BMAP_PERSPECTIVE_MAP'
        ]"
        anchor="BMAP_ANCHOR_TOP_RIGHT"
      ></bm-map-type>
      <!-- 自定位控件-->
      <bm-control :offset="{ width: 177, height: 220 }">
        <img class="controlIcon" :src="controlIcon" alt="" />
      </bm-control>
    </baidu-map>
  </div>
</template>
<script>
import {
  Cell,
  Flexbox,
  FlexboxItem,
  XButton,
  Panel,
  Popup,
  Group,
  XSwitch,
  TransferDom
} from "vux";
import CcbSearch from "../genericForm/CcbSearch.vue";
export default {
  name: "ccb-net-list-map",
  directives: {
    TransferDom
  },
  components: {
    Cell,
    Flexbox,
    FlexboxItem,
    XButton,
    "ccb-cell": () => import("@/components/packages/genericForm/CcbCell.vue"),
    "ccb-net-detail": () =>
      import("@/components/packages/netQuery/netDetail.vue"),
    Panel,
    Popup,
    Group,
    XSwitch,
    TransferDom,
    CcbSearch
  },
  props: {
    formEleProp: {
      type: Object,
      default: () => ({})
    },
    center: {
      type: Object,
      default: () => ({ lng: 116.42017592867, lat: 39.911693711975 })
    },
    autoLocationPoint: {
      type: Object,
      default: () => ({ lng: 0, lat: 0 })
    },
    zoom: {
      type: Number,
      default: 3
    },
    initLocation: {
      type: Boolean,
      default: false
    },
    hackReset: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      markerIcon: require("../../../assets/images/outlet_marker_icon.png"),
      markerIconS: require("../../../assets/images/outlet_marker_icon_pressed.png"),
      controlIcon: require("../../../assets/images/outlet_map_center.png"),
      markerArr: [],
      netInfo: {}
    };
  },
  created() {},
  mounted() {
    console.log("DDDDDDD", this.$props.formEleProp, this.$props.center);
  },
  methods: {
    handler({ BMap, map }) {
      let that = this;
      console.log("实际ready", BMap, map);
      that.$emit("ready", { BMap, map });
    },
    daohang(val) {
      console.log("sdfghfgsfd");
    },
    handlerMarker(index) {
      //点击具体某一网点
      let markers = [...this.formEleProp.list];
      console.log("index: ", index);
      markers.map(el => {
        el.url = this.markerIcon;
      });
      markers[index].url = this.markerIconS;
      this.netInfo = markers[index];
      console.log("this.netInfo", this.netInfo);
      this.$emit("gotoNetDetail", this.netInfo, markers);
    },
    dragend(e) {
      //拖拽时重新获取网点列表
      console.log("e marker", e);
      this.$emit("dragendNetLists", e);
    }
  }
};
</script>

<style>
#app .router-view {
  height: 100%;
}

.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
.bm-view {
  height: calc(100% - 50px - 90px);
}

.ccb-net-list-map {
  width: 100%;
  height: 100%;
}
.controlIcon {
  width: 21px;
}
</style>

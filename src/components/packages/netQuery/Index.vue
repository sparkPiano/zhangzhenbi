<template>
  <div class="ccb-net-list">
    <group class="ccb-net_list">
      <template
        v-if="!this.$slots.cell2 && formEleProp.list && formEleProp.list.length"
      >
        <div
          v-for="(item, index) in formEleProp.list"
          :key="index"
          class="ccb-net_item"
        >
          <ccb-cell :formEleProp="item">
            <template slot="cellTitle" class="ccb-net-status">
              <div class="ccb-net-status-left">
                <span class="net-name-title">{{ item.netName }}</span>
                <span class="bg-bule">{{
                  item.Cur_StCd == "0"
                    ? "休息中"
                    : item.Cur_StCd == "1"
                    ? "营业中"
                    : item.Cur_StCd == "2"
                    ? "营业中"
                    : ""
                }}</span>
                <span
                  v-if="item.Cur_StCd == '1' || item.Cur_StCd == '2'"
                  class="border-bule"
                  >{{
                    item.Cur_StCd == "0"
                      ? ""
                      : item.Cur_StCd == "1"
                      ? "仅对私"
                      : item.Cur_StCd == "2"
                      ? "对公"
                      : ""
                  }}</span
                >
                <span v-if="item.Cur_StCd == '2'" class="border-bule">{{
                  item.Cur_StCd == "0"
                    ? ""
                    : item.Cur_StCd == "1"
                    ? ""
                    : item.Cur_StCd == "2"
                    ? "对私"
                    : ""
                }}</span>
                <!-- <span class="border-bule">仅对私</span> -->
              </div>
              <div class="ccb-net-status-right">
                <!-- <img src="../../../assets/images/u19.png" alt="" /> -->
                <span>网点</span>
              </div>
            </template>
          </ccb-cell>
          <p class="line"></p>
          <ccb-cell
            :formEleProp="item"
            @click.native="onClickNetDetail(item)"
            class="dealAlgin"
          >
            <template slot="cellTitle">
              <div class="cellTitle-netArea">
                <span>{{ item.netArea }}</span>
              </div>
            </template>
            <template slot="cellContent">
              <div>
                <span>{{ dealDistance(item.Dstn_Len) }}</span>
                <span>
                  <i class="iconfont icon-xiangyou"></i>
                </span>
              </div>
            </template>
          </ccb-cell>
        </div>
        <div class="ccb-net-list-end-item">- 已加载全部网点 -</div>
      </template>
      <div class="noDateDiv" v-else>
        <img src="@/assets/images/no-record.png" alt="" />
        <p>无符合查询条件的网点，请使用其他搜索条件</p>
      </div>
      <slot name="cell2"></slot>
    </group>
  </div>
</template>
<script>
import { Cell, Flexbox, FlexboxItem, XButton } from "vux";
import { mapActions, mapState, mapGetters } from "vuex";
import CcbCell from "../genericForm/CcbCell.vue";
export default {
  name: "ccb-net-list",
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
    btnObj: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters({
      getXurrriliList: "getriliList"
    })
  },
  watch: {
    getXurrriliList() {
      console.log("日历数据列表页", this.getXurrriliList);
      this.$emit("newRiLiData", this.getXurrriliList);
      // console.log("ddddddddzz", that.calendarInfo);
    }
  },
  mounted() {
    console.log("formEleProp", this.$props.formEleProp.list);
  },
  methods: {
    onClickNetDetail(item) {
      console.log("onClickNetDetail", item);
      this.$emit("handleListData", item);
      this.$emit("getNetDetail", item.netDcc);
      this.$store.dispatch("requireZZB012", item);
    },
    dealDistance(Dstn_Len) {
      if (Dstn_Len < 1000) {
        return Dstn_Len + "m";
      } else {
        return (Dstn_Len / 1000).toFixed(1) + "km";
      }
    }
  },
  components: {
    Cell,
    Flexbox,
    FlexboxItem,
    XButton,
    "ccb-cell": () => import("@/components/packages/genericForm/CcbCell.vue"),
    CcbCell
  }
};
</script>

<style lang="less" scope>
#app .router-view {
  background-color: #ffffff !important;
}
.line {
  border: 1px solid #ededed;
}
.dealAlgin {
  align-items: center !important;
}
.cellTitle-netArea {
  width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ccb-net_item {
  border-bottom: 10px solid #cccccc;
  .flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .weui-cell:before {
    left: 0 !important;
  }
  .ccb-net-status {
    position: relative;
  }
  .ccb-net-status-right {
    position: absolute;
    right: 15px;
    top: 10px;
    height: 15px;
    img {
      height: 100%;
    }
    span {
      width: 45px;
      height: 20px;
      background: #6958b3;
      display: inline-block;
      color: white;
      text-align: center;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }
  }
  .ccb-net-status-left {
    display: flex;
    align-items: center;
    padding-top: 0.2rem;
    font-size: 0.18rem;
    color: #000000e8;
    > span {
      padding: 2px 5px;
    }
    .net-name-title {
      width: 150px;
      overflow: hidden;
      display: inline-block;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .bg-bule {
      width: 45px;
      height: 19px;
      display: inline-block;
      text-align: center;
      color: #06b5f2;
      border: none;
      background: #dbeefb;
      border-radius: 0.14rem;
      font-size: 0.13rem;
    }
    .border-bule {
      margin-left: 10px;
      display: inline-block;
      text-align: center;
      color: #06b5f2;
      border: 1px solid #06b5f2;
      border-radius: 0.14rem;
      font-size: 0.12rem;
    }
  }
}
.ccb-net-list-end-item {
  width: 100%;
  height: 140px;
  text-align: center;
  padding-top: 20px;
  font-size: 14px;
  color: #999;
}
.noDateDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-top: 150px;
    width: 90px;
    height: 90px;
  }
  p {
    font-size: 14px;
    color: #999;
    margin-top: 20px;
  }
}
</style>

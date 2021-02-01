<template>
  <div>
    <ccb-search
      :formEleProp="formEleProp.searchVal"
      :formEle="formEle"
      :btnObj="btnObj"
    >
    </ccb-search>
    <marquee>
      <marquee-item
        v-for="i in 5"
        :key="i"
        @click.native="onClick(i)"
        class="align-middle"
        >hello world {{ i }}</marquee-item
      >
    </marquee>
    <ccb-net-detail :formEleProp="formEleProp.detail"> </ccb-net-detail>
  </div>
</template>

<script>
import {
  Swiper,
  SwiperItem,
  Marquee,
  MarqueeItem,
  XButton,
  ChinaAddressV4Data,
  Value2nameFilter as value2name
} from "vux";
import CcbCell from "../../components/packages/genericForm/CcbCell.vue";
function getResult(val) {
  let rs = [];
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    });
  }
  return rs;
}
export default {
  name: "netList",
  data() {
    return {
      onFetching: false,
      showBorders: false,
      showVerticalDividers: false,
      menusList: [],
      cellList: [],
      cellList1: [],
      formEleProp: {
        searchVal: {
          customClass: false,
          isShowLeft: true,
          isShowRight: false,
          pos: "广州市",
          placeholder: "请输入网点名称、地址关键字",
          cancelText: "",
          results: [],
          autoFixed: true,
          top: "0.46rem",
          position: "absolute",
          autoScrollToTop: false,
          searchSlotTitle: "searchVal",
          searchRef: "search",
          onFocus: this.onFocus,
          onCancel: this.onCancel,
          onSubmit: this.onSubmit,
          onResultClick: this.onResultClick,
          onChange: this.onChange,
          onBlur: this.onBlur,
          onClear: this.onClear
        },
        detail: {
          netName: "fggfdfsds",
          netDetail: "sfdgfhgfgdfdsfgdssgffsd",
          status: "2",
          destance: "1.2公里",

          height: "-200",

          gutter: 0,
          orient: "horizontal",
          justify: "",
          align: "",
          wrap: "",
          direction: "",
          span: null,
          order: "",
          onScroll: () => console.log("on scroll"),
          onScrollBottom: this.onScrollBottom,
          onPulldownLoading: () => console.log("on pulldownLoading"),
          onPullupLoading: () => console.log("on pullupLoading"),
          showDetail: item => this.showDetail(item)
        },

        masker: {
          color: "",
          opacity: 0.5,
          fullscreen: false,
          badgeText: "8"
        }
      },
      formEle: {
        searchVal: "",
        netLists: null,
        masker: null
      },
      btnObj: {
        btnName: "筛选",
        btnMini: true,
        btnPlain: true
      },
      testData: [],
      value2: ["天津市", "市辖区", "和平区"]
    };
  },
  created() {
    let that = this;
    that.getnetList();
  },
  mounted() {},
  updated() {},
  computed: {},
  watch: {},
  methods: {
    showAd(item) {
      console.log("showAd", item);
    },
    getnetList() {
      let that = this;
      let url = "";
      if (process.env.NODE_ENV === "production") {
        url = "/SNS/BoundCurrency/json/netList.json?v=" + Math.random();
        console.log("production", url);
      } else {
        url = "/json/netList.json?v=" + Math.random();
        console.log("dev", url);
      }
      that.$xhr.get(url, {}, null, response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response);
          that.testData = response.data.BODY.list;
        } else {
          console.log(response.message); //请求失败，response为失败信息
        }
      });
    },
    setFocus() {
      this.$children[0].$refs.search.setFocus();
    },
    onResultClick(item) {
      window.alert("you click the result item: " + JSON.stringify(item));
    },
    onChange(val) {
      console.log("on-change", val);
      this.results = val ? getResult(this.value) : [];
    },
    onSubmit() {
      this.$children[0].$refs.search.setBlur();
      this.$vux.toast.show({
        type: "text",
        position: "top",
        text: "on submit"
      });
    },
    onFocus() {
      // this.formEleProp.searchVal.customClass = true;
    },
    onCancel() {
      let that = this;
      console.log("on cancel");
    },
    onBlur() {
      console.log("on blur");
      // document.querySelector(".weui-search-bar__cancel-btn").trigger("click");
      // this.formEleProp.searchVal.customClass = false;
    },
    onClear() {
      console.log("on clear");
    },
    onScrollBottom() {
      let that = this;
      if (this.onFetching) {
        // do nothing
      } else {
        this.onFetching = true;
        setTimeout(() => {
          this.formEleProp.netLists.prodLists = [
            ...this.formEleProp.netLists.prodLists,
            ...this.testData
          ];
          console.log("ref setTimeout", this.$children);
          let $ref = null;
          for (let ref of this.$children) {
            if (ref.$refs[this.formEleProp.netLists.scrollerBottomRef]) {
              $ref = ref.$refs.scrollerRef;
              break;
            }
          }
          this.$nextTick(() => {
            $ref.reset();
          });
          this.onFetching = false;
        }, 2000);
      }
    },
    showDetail(item) {
      console.log("item", item);
      this.$router.push({
        name: "productDetail"
      });
      this.$store.commit("updateProductDetail", {
        obj: item
      });
    },
    onInputBlur(val, $event) {
      console.log("blur", val, $event);
    },
    onInputFocus(val, $event) {
      console.log("focus", val, $event);
    },
    onInputEnter(val, $event) {
      console.log("enter", val, $event);
    },
    onInputChange(val) {
      console.log("change", val);
      // this.formEle.ccbInput = val;
      console.log("change", this.formEle.ccbInput);
    },
    inputClickErrIcon(error) {
      console.log("errIcon", error);
    },
    inputClickClearIcon() {
      console.log("clearIcon");
    },
    getName(value) {
      return value2name(value, ChinaAddressV4Data);
    },
    onClick(i) {
      console.log(i);
    }
  },
  components: {
    "ccb-search": () => import("@/components/packages/search/Index.vue"),
    "ccb-net-list": () => import("@/components/packages/netQuery/Index.vue"),
    "ccb-input": () => import("@/components/packages/genericForm/CcbInput.vue"),
    "ccb-textarea": () =>
      import("@/components/packages/genericForm/CcbTextarea.vue"),
    "ccb-address": () =>
      import("@/components/packages/genericForm/CcbAddress.vue"),
    "ccb-net-detail": () =>
      import("@/components/packages/netQuery/netDetail.vue"),
    XButton,
    Marquee,
    Swiper,
    SwiperItem,
    MarqueeItem,
    CcbCell
  },
  destroyed() {}
};
</script>
<style lang="less" scoped></style>

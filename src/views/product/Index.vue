<!--
 * @Description: test
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-07-22 09:25:47
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-12-11 12:11:41
-->

<template>
  <div>
    <ccb-search
      :formEleProp="formEleProp.searchVal"
      :formEle="formEle"
      :btnObj="btnObj"
    >
    </ccb-search>
    <ccb-prod-menus
      :menusList="menusList"
      :showBorders="showBorders"
      :showVerticalDividers="showVerticalDividers"
    ></ccb-prod-menus>
    <ccb-product :formEleProp="formEleProp.product" ref="ccbProduct">
      <template slot="customGroupTitle">
        <span class="x-sold-title_first">产品超市</span>
        <span class="x-sold-title_second" @click="getAllProduct">
          <span>全部产品</span>
          <span>
            <x-icon type="ios-arrow-right" size="24"></x-icon>
          </span>
        </span>
      </template>
    </ccb-product>
    <ccb-buoy
      :formEleProp="formEleProp.masker"
      :formEle="formEle"
      @click.native="goToCart"
    ></ccb-buoy>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import defaultImg from "@/assets/images/product/p0.png";
import defaultQrcode from "@/assets/images/qrcode.png";
import { mixin } from "@/mixins/mixin";
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
  name: "product",
  mixins: [mixin],
  data() {
    return {
      num: 0,
      onFetching: false,
      showBorders: false,
      showVerticalDividers: false,
      menusList: [],
      formEleProp: {
        searchVal: {
          customClass: false,
          isShowLeft: false,
          isShowRight: true,
          pos: "广州市",
          placeholder: "请输入搜索关键字",
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
        product: {
          lockX: true,
          lockY: false,
          height: "-250",
          scrollbarX: false,
          scrollbarY: false,
          bounce: true,
          usePulldown: false,
          usePullup: false,
          pulldownConfig: null,
          pullupConfig: {
            content: "上拉刷新",
            pullUpHeight: 60,
            height: 40,
            autoRefresh: false,
            downContent: "",
            upContent: "",
            loadingContent: "",
            clsPrefix: "xs-plugin-pullup-"
          },
          scrollBottomOffset: 200,
          scrollerBottomRef: "scrollerRef",
          prodSlotTitle: "production",
          loading: "正在加载中...",
          gutter: 0,
          orient: "horizontal",
          justify: "",
          align: "",
          wrap: "",
          direction: "",
          span: null,
          order: "",
          onScroll: () => "",
          onScrollBottom: this.onScrollBottom,
          onPulldownLoading: () => "",
          onPullupLoading: () => "",
          showDetail: item => this.showDetail(item),
          prodLists: [],
          leftText: "",
          rightText: "",
          showLoading: true,
          addToCart: this.addToCart
        },
        masker: {
          color: "",
          opacity: 0.5,
          fullscreen: false,
          badgeText: this.$general.getCache("cartProductList")
            ? JSON.parse(this.$general.getCache("cartProductList")).length
            : 0
        }
      },
      formEle: {
        searchVal: "",
        product: null,
        masker: null
      },
      btnObj: {
        btnName: "筛选",
        btnMini: true,
        btnPlain: true,
        triggerEvent: this.filterData
      },
      testData: [],
      yunfei: 0,
      productName: ""
    };
  },
  created() {
    let that = this;
    that.getProdMenusList();
    that.getProductList(1, that.productName);
    // that.getCacheProductList();
    console.log("query");
    let queryParam = that.$general.getQueryStringByName(
      "wParam",
      "?" + window.location.href.split("?")[1]
    );
    // that.updateWParam(queryParam);
    let len = that.$general.getCache("cartProductList")
      ? JSON.parse(that.$general.getCache("cartProductList")).length
      : 0;
    that.$general.setCache("cartNumber", len);
    that.updateCartNumber({ result: len });
    that.formEleProp.masker.badgeText = len;
    let redirect = that.$general.getCache("/record");
    let redirect1 = that.$general.getCache("/detail");
    let redirect2 = that.$general.getCache("/product");
    if (redirect) {
      that.$router.push({
        name: "record"
      });
      that.$general.clearCache("/record");
    }
    if (redirect1) {
      that.$router.push({
        name: "detail"
      });
      that.$general.clearCache("/detail");
    }
    if (redirect2) {
      that.$router.push({
        name: "product"
      });
      that.$general.clearCache("/product");
    }
    that.getBindUserInfo();
  },
  mounted() {
    let that = this;
  },
  updated() {
    let that = this;
  },
  computed: {
    ...mapState([
      "wParam",
      "cacheProductList",
      "productList",
      "cartNumber",
      "retPage",
      "userInfo",
      "queryCondition"
    ])
  },
  watch: {
    productList: {
      handler(newVal, oldVal) {
        let that = this;
        console.log("111111", newVal, oldVal);
        that.$nextTick(() => {
          that.formEleProp.product.prodLists = [
            ...that.formEleProp.product.prodLists,
            ...newVal.GRP.map(item => {
              return {
                id: item.ASPD_ID,
                title: item.ASPD_Nm,
                img: defaultImg,
                price: item.Br_Sell_Prc,
                unit: item.Prc_UnCd == "10" ? "件" : "件",
                numUnit: "枚",
                qrcode: defaultQrcode,
                productNo: item.PM_PD_ID,
                numbers: item.SetInnr_CmmnMd_Cn_Num
                  ? item.SetInnr_CmmnMd_Cn_Num
                  : 1,
                expDelivery: "不包邮",
                receiptWay:
                  item.PD_Dstrn_MtdCd == "01"
                    ? "送货上门"
                    : item.PD_Dstrn_MtdCd == "02"
                    ? "网点自提"
                    : "送货上门/网点自提",
                productDesc: item.Ast_RcmdInf_Intd_Cmnt,
                receiptWayNo: item.PD_Dstrn_MtdCd
              };
            })
          ];
          that.$general.setCache(
            "cacheProductList",
            JSON.stringify(that.cacheProductList)
          );
        });
      },
      deep: true
    }
  },
  methods: {
    showAd(item) {
      console.log("showAd", item);
    },
    getProdMenusList() {
      let that = this;
      let url = "";
      if (process.env.NODE_ENV === "production") {
        url = "/SNS/BoundCurrency/json/prodMenus.json?v=" + Math.random();
        console.log("production", url);
      } else {
        url = "/json/prodMenus.json?v=" + Math.random();
        console.log("dev", url);
      }
      that.$xhr.get(url, {}, null, response => {
        const retCode = response.data.HEADER.retcode;
        if (retCode === "000000" || retCode === "000000000000") {
          console.log(response);
          that.menusList = response.data.BODY.list;
        } else {
          console.log(response.message); //请求失败，response为失败信息
        }
      });
    },
    getProductList(num, name) {
      let that = this;
      let params = {
        TXCODE: "ZZB001",
        AlSal_Ind: 1,
        Txn_Itt_Chnl_TpCd: "0092",
        REC_IN_PAGE: 10,
        PAGE_JUMP: num
      };
      if (
        that.queryCondition &&
        (that.queryCondition.price || that.queryCondition.parValue)
      ) {
        Object.assign(params, {
          BlUntMsrmntCnMdCnDnmn: that.queryCondition.parValue
        });
      }
      if (name) {
        Object.assign(params, {
          ASPD_Nm: name
        });
      }
      that.getProductListAsync(params);
    },
    getCacheProductList() {
      let that = this;
      let params = {
        TXCODE: "ZZB001",
        AlSal_Ind: 1,
        Txn_Itt_Chnl_TpCd: "0092",
        REC_IN_PAGE: 50,
        PAGE_JUMP: 1
      };
      that.getProductListAsync(params);
    },
    getBindUserInfo() {
      let that = this;
      let params = {
        TXCODE: "ZZB003",
        wParam: decodeURIComponent(that.wParam)
      };
      that.getBindUserInfoAsync(params);
    },
    setFocus() {
      this.$children[0].$refs.search.setFocus();
    },
    onResultClick(item) {
      window.alert("you click the result item: " + JSON.stringify(item));
    },
    onChange(val) {
      let that = this;
      that.productName = val;
      console.log("on-change", val);
      that.getProductList(1, that.productName);
    },
    onSubmit() {
      this.$children[0].$refs.search.setBlur();
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
      if (that.onFetching) {
        // do nothing
        that.updateQueryCondition({ result: { price: "", parVal: "" } });
      } else {
        that.formEleProp.product.showLoading = true;
        that.formEleProp.product.loading = "正在加载中...";
        that.onFetching = true;
        that.num++;
        let totalPage = that.productList.TOTAL_PAGE;
        if (totalPage >= that.num && that.num != 1) {
          that.getProductList(that.num, that.productName);
        }
        setTimeout(() => {
          // that.formEleProp.product.prodLists = [
          //   ...that.formEleProp.product.prodLists,
          //   ...that.testData
          // ];
          let $ref = null;
          for (let ref of that.$children) {
            if (ref.$refs[that.formEleProp.product.scrollerBottomRef]) {
              $ref = ref.$refs.scrollerRef;
              break;
            }
          }
          let len = that.formEleProp.product.prodLists.length;
          let totalNum = that.productList.TOTAL_REC;
          console.log("44444");
          if (len < totalNum && totalNum) {
            that.$nextTick(() => {
              $ref.reset();
            });
            that.onFetching = false;
            that.formEleProp.product.showLoading = false;
            that.formEleProp.product.loading = "上拉刷新";
          } else {
            that.formEleProp.product.loading = "已经没有更多数据了";
            that.formEleProp.product.showLoading = false;
            that.$refs.ccbProduct.disablePullup();
            that.updateQueryCondition({ result: { price: "", parVal: "" } });
            that.onFetching = true;
          }
        }, 5000);
      }
    },
    showDetail(item) {
      let that = this;
      console.log("showDetail", item);
      that.$router.push({
        name: "productDetail"
      });
      that.$store.commit("updateProductDetail", {
        obj: [item]
      });
    },
    getAllProduct() {
      let that = this;
      console.log("getAllProduct");
      that.$router.push({
        name: "allProduct"
      });
    },
    filterData($e) {
      let that = this;
      console.log("event", $e);
      that.$router.push({
        name: "productScreening"
      });
      that.updateRetPage({ result: "single" });
    },
    addToCart(item, event) {
      let that = this;
      console.log("addToCart", item);
      //获得event对象兼容性写法
      event = event || window.event;
      //阻止浏览器默认行为兼容性写法
      event.preventDefault
        ? event.preventDefault()
        : (event.returnValue = false);
      //阻止冒泡写法
      event.stopPropagation
        ? event.stopPropagation()
        : (event.cancelBubble = true);
      if (
        parseInt(that.$general.getCache("cartNumber")) > 0 &&
        that.cartNumber < 1
      ) {
        that.updateCartNumber({
          result: parseInt(that.$general.getCache("cartNumber"))
        });
      }
      that.updateCartNumber({ result: that.cartNumber + 1 });
      that.formEleProp.masker.badgeText =
        that.cartNumber || parseInt(that.$general.getCache("cartNumber"));
      let tempList =
        that.$general.getCache("cartProductList") &&
        JSON.parse(that.$general.getCache("cartProductList")).length
          ? JSON.parse(that.$general.getCache("cartProductList"))
          : [];
      tempList.push(item);
      that.$general.setCache("cartProductList", JSON.stringify(tempList));
      if (that.cartNumber > 0) {
        that.$general.setCache("cartNumber", that.cartNumber);
      }
    },
    goToCart() {
      let that = this;
      let youkeAddress = that.$general.getCache("cacheAddressList")
        ? JSON.parse(that.$general.getCache("cacheAddressList"))
        : [];
      if (that.userInfo.BIND_FLAG != "4" || youkeAddress.length) {
        that.$router.push({
          name: "shoppingCart",
          params: { yunfei: that.yunfei }
        });
      } else {
        that.$vux.toast.show({
          type: "text",
          position: "middle",
          text: "请新增收货地址后，再进行下一步操作",
          width: "3rem"
        });
      }
    },
    getKuaiDiFei() {
      let that = this;
      that.$xhr.post(
        "/ccbsns/SNSService",
        {
          TXCODE: "ZZB015",
          BsPD_ECD: "J14"
        },
        null,
        response => {
          let retCode = response.data.HEADER.retcode;
          if (retCode == "000000" || retCode == "000000000000") {
            that.yunfei = response.data.BODY.Dstrn_Fee;
          }
        }
      );
      setTimeout(() => {
        that.yunfei = 8;
      }, 3000);
    },
    ...mapActions([
      "getProductListAsync",
      "getBindUserInfoAsync",
      "getCacheProductListAsync"
    ]),
    ...mapMutations([
      "updateWParam",
      "updateRetPage",
      "updateCartNumber",
      "updateQueryCondition"
    ])
  },
  components: {
    "ccb-search": () => import("@/components/packages/search/Index.vue"),
    "ccb-prod-menus": () => import("@/components/packages/prodMenus/Index.vue"),
    "ccb-product": () => import("@/components/packages/product/Index.vue"),
    "ccb-buoy": () => import("@/components/packages/buoy/Index.vue")
  },
  destroyed() {}
};
</script>

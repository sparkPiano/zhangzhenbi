<!--
 * @Description: test
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-07-22 09:25:47
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-12-09 17:21:50
 * @FilePath: \ccbProject\ccb_5g\src\views\test\Index.vue
-->

<template>
  <div>
    <ccb-search
      :formEleProp="formEleProp.searchVal"
      :formEle="formEle"
      :btnObj="btnObj"
    >
    </ccb-search>
    <ccb-generic-form>
      <template slot="content">
        <ccb-input
          :formEleProp="formEleProp.ccbInput"
          :formEle="formEle"
          :labelWidth="labelWidth"
          :labelMarginRight="labelMarginRight"
          :labelAlign="labelAlign"
        >
        </ccb-input>
        <ccb-textarea
          :formEleProp="formEleProp.textarea1"
          :formEle="formEle"
          :labelWidth="labelWidth"
          :labelMarginRight="labelMarginRight"
          :labelAlign="labelAlign"
        ></ccb-textarea>
        <ccb-address
          :formEleProp="formEleProp.addressVal"
          :formEle="formEle"
          :labelWidth="labelWidth"
          :labelMarginRight="labelMarginRight"
          :labelAlign="labelAlign"
        ></ccb-address>
        <ccb-number
          :formEleProp="formEleProp.ccbNum"
          :formEle="formEle"
          @change-number="onChangeNumber"
        ></ccb-number>
      </template>
    </ccb-generic-form>
    <ccb-inline-calendar
      :formEleProp="formEleProp.inlineCalendar"
      :formEle="formEle"
    ></ccb-inline-calendar>
    <qrcode
      :value="qrCode.val"
      :type="qrCode.type"
      :size="qrCode.size"
      :bg-color="qrCode.bgColor"
      :fg-color="qrCode.fgColor"
    ></qrcode>
    <ccb-prod-menus
      :menusList="menusList"
      :showBorders="showBorders"
      :showVerticalDividers="showVerticalDividers"
    ></ccb-prod-menus>
    <ccb-product :formEleProp="formEleProp.production">
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
    <ccb-buoy :formEleProp="formEleProp.masker" :formEle="formEle"></ccb-buoy>
  </div>
</template>

<script>
import {
  ChinaAddressV4Data,
  Value2nameFilter as value2name,
  Qrcode
} from "vux";
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
  name: "test",
  data() {
    return {
      qrCode: {
        type: "img",
        size: 30,
        bgColor: "#FFFFFF",
        fgColor: "#000000",
        val: "4444444"
      },
      labelWidth: "1rem",
      labelMarginRight: "0.1rem",
      labelAlign: "left",
      onFetching: false,
      showBorders: false,
      showVerticalDividers: false,
      menusList: [],
      cellList: [],
      cellList1: [],
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
        production: {
          lockX: true,
          lockY: false,
          height: "-200",
          scrollbarX: false,
          scrollbarY: false,
          bounce: true,
          usePulldown: false,
          usePullup: false,
          pulldownConfig: null,
          pullupConfig: null,
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
          onScroll: () => console.log("on scroll"),
          onScrollBottom: this.onScrollBottom,
          onPulldownLoading: () => console.log("on pulldownLoading"),
          onPullupLoading: () => console.log("on pullupLoading"),
          showDetail: item => this.showDetail(item),
          prodLists: [],
          leftText: "",
          rightText: ""
        },
        masker: {
          color: "",
          opacity: 0.5,
          fullscreen: false,
          badgeText: "8"
        },
        ccbInput: {
          xInputType: "text",
          xInputRequired: true,
          xInputTitle: "客户经理编号",
          xInputPlaceholder: "请输入",
          xInputShowClear: true,
          xInputDisabled: false,
          xInputReadonly: false,
          xInputPlaceholderAlign: "left",
          xInputTextAlign: "left",
          xInputShouldToastError: true,
          xInputBlur: this.onInputBlur,
          xInputFocus: this.onInputFocus,
          xInputEnter: this.onInputEnter,
          xInputChange: this.onInputChange,
          xInputClickErrIcon: this.inputClickErrIcon,
          xInputClickClearIcon: this.inputClickClearIcon,
          xInputSlotTitle: "ccbInput",
          xInputLabel: "ccbInputLabel"
        },
        textarea1: {
          xTextareaTitle: "编号",
          xTextareaShowCounter: false,
          xTextareaMax: 100,
          xTextareaPlaceholder: "选填",
          xTextareaRows: 3,
          xTextareaCols: 30,
          xTextareaHeight: 0,
          xTextareaReadonly: false,
          xTextareaDisabled: false,
          xTextareaAutoSize: false,
          xTextareaChange: () => console.log("t2-focus"),
          xTextareaFocus: () => console.log("t2-focus"),
          xTextareaBlur: () => console.log("t2-blur"),
          xTextareaSlotTitle: "textarea1"
        },
        addressVal: {
          xAddressTitle: "所在地区",
          xAddressList: ChinaAddressV4Data,
          xAddressPlaceholder: "-请选择-",
          xAddressShowSync: false,
          xAddressValTextAlign: "left",
          xAddressHide: () => console.log(""),
          xAddressShow: () => console.log(""),
          xAddressShadowChange: () => console.log(""),
          xAddressSlotTitle: "addressVal"
        },
        inlineCalendar: {
          calendarRef: "calendar",
          show: true,
          renderMonth: [2020, 12],
          startDate: "2020-11-01",
          endDate: "2020-12-31",
          range: false,
          showLastMonth: false,
          showNextMonth: false,
          highlightWeekend: true,
          return6Rows: false,
          hideHeader: false,
          hideWeekList: false,
          replaceTextList: {
            TODAY: "今"
          },
          weeksList: [],
          buildSlotFn: this.buildSlotFn,
          valueChange: true,
          disablePast: false,
          disableFuture: false,
          marks: [],
          disableWeekend: false,
          disableDateFunction: date => {
            if (
              date.formatedDate <
                this.$general.formatTime(new Date(), "yyyy-MM-dd") ||
              date.formatedDate >
                this.$general.formatTime(
                  new Date(new Date().setDate(new Date().getDate() + 30)),
                  "yyyy-MM-dd"
                )
            ) {
              return true;
            }
          },
          calendarSlotTitle: "inlineCalendar",
          onChange: this.onChangeInlineCalendar,
          onViewChange: this.onViewChange,
          selectSingleDate: this.selectSingleDate
        },
        ccbNum: {
          xNumberTitle: "",
          xNumberMin: 0,
          xNumberMax: 100000,
          xNumberStep: 1,
          xNumberFillable: false,
          xNumberWidth: "30px",
          xNumberButtonStyle: "square",
          xNumberAlign: "left",
          xNumberSlotTitle: "ccbNum"
        }
      },
      formEle: {
        searchVal: "",
        production: null,
        masker: null,
        ccbInput: "",
        textarea1: "",
        addressVal: [],
        inlineCalendar: null,
        ccbNum: 0
      },
      btnObj: {
        btnName: "筛选",
        btnMini: true,
        btnPlain: true
      },
      testData: []
    };
  },
  created() {
    let that = this;
    that.getProdMenusList();
    that.getSoldProdList();
    that.getProductionList();
  },
  mounted() {},
  updated() {},
  computed: {},
  watch: {},
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
        if (response.status >= 200 && response.status < 300) {
          console.log(response);
          that.menusList = response.data.BODY.list;
        } else {
          console.log(response.message); //请求失败，response为失败信息
        }
      });
    },
    getSoldProdList() {
      let that = this;
      let url = "";
      if (process.env.NODE_ENV === "production") {
        url = "/SNS/BoundCurrency/json/soldProd.json?v=" + Math.random();
        console.log("production", url);
      } else {
        url = "/json/soldProd.json?v=" + Math.random();
        console.log("dev", url);
      }
      that.$xhr.get(url, {}, null, response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response);
          that.cellList = response.data.BODY.list1;
          that.cellList1 = response.data.BODY.list2;
          that.cellList2 = response.data.BODY.list3;
          that.cellList3 = response.data.BODY.list4;
        } else {
          console.log(response.message); //请求失败，response为失败信息
        }
      });
    },
    getProductionList() {
      let that = this;
      that.$xhr.get(
        "/json/productionList.json?v=" + Math.random(),
        {},
        null,
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response);
            that.testData = response.data.BODY.list;
          } else {
            console.log(response.message); //请求失败，response为失败信息
          }
        }
      );
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
          this.formEleProp.production.prodLists = [
            ...this.formEleProp.production.prodLists,
            ...this.testData
          ];
          console.log("ref setTimeout", this.$children);
          let $ref = null;
          for (let ref of this.$children) {
            if (ref.$refs[this.formEleProp.production.scrollerBottomRef]) {
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
        obj: [item]
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
    doShowAddress() {
      this.formEleProp.addressVal.xAddressShowSync = true;
      setTimeout(() => {
        this.formEleProp.addressVal.xAddressShowSync = false;
      }, 2000);
    },
    getName(value) {
      return value2name(value, ChinaAddressV4Data);
    },
    onChangeInlineCalendar() {
      console.log("onChangeInlineCalendar");
    },
    onViewChange() {
      console.log("onViewChange");
    },
    selectSingleDate() {
      console.log("selectSingleDate");
    },
    buildSlotFn(line, index, data) {
      console.log("ddddd", data);
      return /0|6/.test(data.weekDay)
        ? '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:red;border-radius:50%;"></span></div>'
        : '<div style="height:19px;"></div>';
    },
    getAllProduct() {
      console.log("getAllProduct");
      this.$router.push({
        name: "allProduct"
      });
    },
    onChangeNumber(val, $e) {
      console.log("onNumberChange33333", val);
      console.log("23333322", $e);
    }
  },
  components: {
    "ccb-search": () => import("@/components/packages/search/Index.vue"),
    "ccb-prod-menus": () => import("@/components/packages/prodMenus/Index.vue"),
    "ccb-product": () => import("@/components/packages/product/Index.vue"),
    "ccb-buoy": () => import("@/components/packages/buoy/Index.vue"),
    "ccb-input": () => import("@/components/packages/genericForm/CcbInput.vue"),
    "ccb-textarea": () =>
      import("@/components/packages/genericForm/CcbTextarea.vue"),
    "ccb-address": () =>
      import("@/components/packages/genericForm/CcbAddress.vue"),
    "ccb-generic-form": () =>
      import("@/components/packages/genericForm/Index.vue"),
    "ccb-inline-calendar": () =>
      import("@/components/packages/genericForm/CcbInlineCalendar.vue"),
    "ccb-number": () =>
      import("@/components/packages/genericForm/CcbNumber.vue"),
    Qrcode
  },
  destroyed() {}
};
</script>

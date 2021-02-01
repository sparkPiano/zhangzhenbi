/* eslint-disable no-dupe-keys */
<template>
  <div>
    <ccb-address :formEleProp="formEleProp.addressVal" :formEle="formEle">
    </ccb-address>
    <ccb-button :btnObj="btnObj"> </ccb-button>
  </div>
</template>

<script>
import { mixin } from "@/mixins/mixin";
import { mapActions, mapState, mapGetters } from "vuex";
import { XButton, ChinaAddressV4Data } from "vux";
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
  mixins: [mixin],
  name: "index",
  data() {
    return {
      onFetching: false,
      showBorders: false,
      showVerticalDividers: false,
      menusList: [],
      formEleProp: {
        addressVal: {
          groupTitle: "",
          titleColor: "",
          labelWidth: "",
          labelAlign: "",
          labelMarginRight: "",
          gutter: "10px",
          cellName: "胡国英",
          edit: "编辑",
          onEditAddr: this.onEditAddr, //编辑地址
          addrLists: [
            // {
            //   custName: "胡国英",
            //   isdefault: "1",
            //   addr: "光送上年微客男女都是男方",
            //   phone: "18174665211"
            // },
            // {
            //   custName: "胡国英2",
            //   isdefault: "0",
            //   addr: "光送上年微客男女都是男方2",
            //   phone: "181746652112"
            // }
          ]
        }
      },
      formEle: {
        addressVal: [],
        production: null
      },
      btnObj: {
        btnLists: [
          {
            btnName: " + 新建收货地址",
            btnMini: false,
            btnPlain: true,
            btnType: "primary",
            buttonClass: "blue",
            onBtn: this.onEditAddr
          }
        ]
      }
    };
  },
  created() {
    let that = this;
    if (this.bindFlag == "4") {
      console.log("游客模式");
      let LIST = that.$general.getCache("cacheAddressList")
        ? JSON.parse(that.$general.getCache("cacheAddressList"))
        : [];
      console.log("游客模式下LIST", LIST);
      if (LIST && LIST.length > 0) {
        that.formEleProp.addressVal.addrLists = LIST;
      }
    } else {
      this.$store.dispatch("requireZZB002");
    }
  },
  mounted() {
    let that = this;
  },
  updated() {},
  computed: {
    ...mapState({
      bindFlag: state => state.userInfo.BIND_FLAG
    }),
    ...mapGetters({
      getXurrZzb002: "getAddressZzb002"
    })
  },
  watch: {
    getXurrZzb002() {
      let that = this;
      console.log("getXurrZzb002", that.getXurrZzb002);
      if (that.getXurrZzb002 && that.getXurrZzb002.length > 0) {
        that.formEleProp.addressVal.addrLists = that.getXurrZzb002;
      }
    }
  },
  methods: {
    onEditAddr(item, index) {
      //编辑地址
      console.log("编辑地址", item, index);
      this.$store.commit("updateTypeIndex", { value: index });

      if (item) {
        item["editType"] = "1"; //修改
      } else {
        item = { editType: "0" }; //新增
      }
      this.$router.push({
        name: "editAddress",
        params: item
      });
    },
    setFocus() {
      this.$children[0].$refs.address.setFocus();
    },
    onResultClick(item) {
      window.alert("you click the result item: " + JSON.stringify(item));
    },
    onChange(val) {
      console.log("on-change", val);
      this.results = val ? getResult(this.value) : [];
    },
    onSubmit() {
      this.$children[0].$refs.address.setBlur();
      this.$vux.toast.show({
        type: "text",
        position: "top",
        text: "on submit"
      });
    },
    onFocus() {
      this.formEleProp.addressVal.customClass = true;
    },
    onCancel() {
      let that = this;
      console.log("on cancel");
    },
    onBlur() {
      console.log("on blur");
      document.querySelector(".weui-search-bar__cancel-btn").trigger("click");
      this.formEleProp.addressVal.customClass = false;
    },
    onClear() {
      console.log("on clear");
    },
    onScrollBottom() {
      if (this.onFetching) {
        // do nothing
      } else {
        this.onFetching = true;
        setTimeout(() => {
          this.formEleProp.production.prodLists = [
            ...this.formEleProp.production.prodLists,
            ...this.testData
          ];
          this.$nextTick(() => {
            this.$children[2].$refs[
              this.formEleProp.production.scrollerBottomRef
            ].reset();
          });
          this.onFetching = false;
        }, 2000);
      }
    }
  },
  components: {
    "ccb-address": () => import("@/components/packages/address/Index.vue"),
    "ccb-button": () => import("@/components/packages/button/Index.vue"),
    XButton
  },
  destroyed() {}
};
</script>

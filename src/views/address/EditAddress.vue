<template>
  <div>
    <!-- <ccb-edit-address :formEleProp="formEleProp" :formEle="formEle">
    </ccb-edit-address> -->
    <group>
      <ccb-input
        :formEleProp="formEleProp.inutVal1"
        :formEle="formEle"
        :labelWidth="labelWidth"
        :labelMarginRight="labelMarginRight"
        :labelAlign="labelAlign"
      >
      </ccb-input>
      <ccb-input
        :formEleProp="formEleProp.inutVal2"
        :formEle="formEle"
        :labelWidth="labelWidth"
        :labelMarginRight="labelMarginRight"
        :labelAlign="labelAlign"
      >
      </ccb-input>
      <ccb-address
        :formEleProp="formEleProp.addressVal"
        :formEle="formEle"
        :labelWidth="labelWidth"
        :labelMarginRight="labelMarginRight"
        :labelAlign="labelAlign"
      >
      </ccb-address>
      <ccb-textarea
        :formEleProp="formEleProp.texteareVal"
        :formEle="formEle"
        :labelWidth="labelWidth"
        :labelMarginRight="labelMarginRight"
        :labelAlign="labelAlign"
      ></ccb-textarea>
      <ccb-switch
        :formEleProp="formEleProp.switchVal"
        :formEle="formEle"
        :labelWidth="labelWidth"
        :labelMarginRight="labelMarginRight"
        :labelAlign="labelAlign"
      ></ccb-switch>
    </group>
    <ccb-edit-button :btnObj="btnObj"> </ccb-edit-button>
  </div>
</template>

<script>
import { mixin } from "@/mixins/mixin";
import { mapActions, mapState, mapGetters } from "vuex";
import {
  ChinaAddressV4Data,
  Toast,
  Value2nameFilter as value2name,
  XAddress
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
  mixins: [mixin],
  name: "editAddress",
  data() {
    return {
      tipMsg: "",
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
        inputLabelWidth: "100px",
        itemValue: [],
        inutVal1: {
          xInputType: "text",
          xInputIsType: null,
          xInputRequired: true,
          xInputTitle: "收货人姓名",
          xInputPlaceholder: "请输入",
          xInputShowClear: true,
          xInputMin: null,
          xInputMax: null,
          xInputDisabled: false,
          xInputReadonly: false,
          xInputDebounce: null,
          xInputPlaceholderAlign: "left",
          xInputTextAlign: "left",
          xInputLabelWidth: "1rem",
          xInputMask: "",
          xInputShouldToastError: true,
          xInputBlur: () => console.log("xInputBlur"),
          xInputFocus: () => console.log("xInputBlur"),
          xInputEnter: () => console.log("xInputBlur"),
          xInputChange: () => console.log("xInputBlur"),
          xInputClickErrIcon: () => console.log("xInputBlur"),
          xInputClickClearIcon: () => console.log("xInputBlur"),
          xInputSlotTitle: "inutVal1",
          xInputLabel: "ccbInputLabel",
          xInputRestrictedLabel: "",
          xInputRight: "",
          xInputRightFullHeight: ""
        },
        inutVal2: {
          xInputType: "text",
          xInputIsType: null,
          xInputRequired: true,
          xInputTitle: "联系电话",
          xInputPlaceholder: "请输入",
          xInputShowClear: true,
          xInputMin: null,
          xInputMax: null,
          xInputDisabled: false,
          xInputReadonly: false,
          xInputDebounce: null,
          xInputPlaceholderAlign: "left",
          xInputTextAlign: "left",
          xInputLabelWidth: "1rem",
          xInputMask: "",
          xInputShouldToastError: true,
          xInputBlur: () => console.log("xInputBlur"),
          xInputFocus: () => console.log("xInputBlur"),
          xInputEnter: () => console.log("xInputBlur"),
          xInputChange: () => console.log("xInputBlur"),
          xInputClickErrIcon: () => console.log("xInputBlur"),
          xInputClickClearIcon: this.xInputClickClearIcon,
          xInputSlotTitle: "inutVal2",
          xInputLabel: "ccbInputLabel",
          xInputRestrictedLabel: "",
          xInputRight: "",
          xInputRightFullHeight: ""
        },
        addressVal: {
          // xAddressRawValue: "",
          xAddressTitle: "所在地区",
          xAddressList: ChinaAddressV4Data,
          xAddressPlaceholder: "-请选择-",
          // xAddressInlineDesc: "",
          xAddressShowSync: false,
          // xAddressHideDistrict: "",
          xAddressValTextAlign: "left",
          // xAddressPopupStyle: "",
          // xAddressDisabled: "",
          xAddressHide: this.xAddressHide,
          xAddressShow: this.xAddressShow,
          xAddressShadowChange: this.xAddressShadowChange,
          xAddressSlotTitle: "addressVal"
        },
        texteareVal: {
          xTextareaTitle: "详细地址",
          xTextareaInlineDesc: "",
          xTextareaShowCounter: false,
          xTextareaMax: 100,
          xTextareaName: "",
          xTextareaPlaceholder: "请填写详细信息",
          xTextareaRows: 3,
          xTextareaCols: 30,
          xTextareaHeight: 0,
          xTextareaReadonly: false,
          xTextareaDisabled: false,
          xTextareaAutoSize: false,
          xTextareaChange: this.xTextareaChange,
          xTextareaFocus: this.xTextareaFocus,
          xTextareaBlur: this.xTextareaBlur,
          xTextareaSlotTitle: "texteareVal"
        },
        switchVal: {
          xSwitchTitle: "设为默认地址",
          // xSwitchDisabled: "",
          // xSwitchInlineDesc: "",
          // xSwitchPreventDefault: "",
          xSwitchValMap: [false, true],
          xSwitchChange: this.xSwitchChange,
          xSwitchClick: this.xSwitchClick,
          xSwitchSlotTitle: "switchVal"
        }
      },
      formEle: {
        inutVal1: "",
        inutVal2: "",
        texteareVal: "",
        addressVal: [],
        switchVal: false
      },
      btnObj: {
        btnLists: [
          {
            btnName: "删除",
            btnMini: false,
            btnPlain: true,
            btnType: "primary",
            buttonClass: "gray",
            onBtn: this.onBtnLeft
          },
          {
            btnName: "保存",
            btnMini: false,
            btnPlain: true,
            btnType: "primary",
            buttonClass: "blue",
            onBtn: this.onBtnRight
          }
        ]
      },
      testData: []
    };
  },
  created() {
    let that = this;
    that.formEleProp.itemValue = that.$route.params;
    let data = that.$route.params;
    console.log("编辑传过来的值", data);
    that.formEle.inutVal1 = data.Cst_Nm;
    that.formEle.inutVal2 = data.MblPh_No;
    that.formEle.texteareVal = data.Dtl_Adr;
    // that.formEle.addressVal = this.getName(data.CntyAndDstc_Cd);
    let newRegion = data.Prov_AtnmsRgon_Cd; //省
    let newRegion2 = data.Urbn_AtnmsDstc_Cd; //市
    let newRegion3 = data.CntyAndDstc_Cd; //区
    var str1 = `${data.Prov_AtnmsRgon_Cd},${data.Urbn_AtnmsDstc_Cd},${data.CntyAndDstc_Cd}`;
    let endNewRegion = str1.split(","); // 在每个逗号(,)处进行分解。
    that.formEle.addressVal = endNewRegion;
    if (!newRegion && !newRegion2 && !newRegion3) {
      that.formEle.addressVal = ["110000", "110100", "110101"];
    }
    console.log("DDDDDDDDD", that.formEle.addressVal);
    // that.formEle.addressVal = ["430000", "430400", "430407"];
    that.formEle.switchVal = data.Rsrv_Fld_1 == "1" ? true : false;
  },
  mounted() {
    let that = this;
    if (this.$route.params.target) {
      that.btnObj.btnLists = [
        {
          btnName: "保存",
          btnMini: false,
          btnPlain: true,
          btnType: "primary",
          buttonClass: "blue",
          onBtn: this.onBtnRight
        }
      ];
    }
  },
  updated() {},
  computed: {
    ...mapState({
      bindFlag: state => state.userInfo.BIND_FLAG,
      typeIndex: state => state.address.typeIndex
    }),
    ...mapGetters({
      getXurrZzb002: "getAddressZzb002"
    })
  },
  watch: {
    getXurrZzb002() {
      let that = this;
      console.log("getXurrZzb002", that.getXurrZzb002);
      if (that.getXurrZzb002 && that.getXurrZzb002.length == 0) {
        that.$vux.toast.text(this.tipMsg, "Middle");
        setTimeout(() => {
          // that.$router.push({
          //   name: "address",
          //   params: {}
          // });
          that.$router.go(-1);
        }, 500);
      }
    }
  },
  methods: {
    showAd(item) {
      console.log("showAd", item);
    },
    onBtnLeft() {
      //删除
      console.log("删除");
      let that = this;
      console.log("编辑传过来的值11", that.formEle);
      if (this.bindFlag == "4") {
        console.log("游客模式删除编辑删除");
        console.log("typeIndex", this.typeIndex);
        let LIST = that.$general.getCache("cacheAddressList")
          ? JSON.parse(that.$general.getCache("cacheAddressList"))
          : [];
        LIST.splice(this.typeIndex, 1);
        that.$general.setCache("cacheAddressList", JSON.stringify(LIST));
        that.$vux.toast.text("删除成功", "Middle");
        setTimeout(() => {
          // that.$router.push({
          //   name: "address",
          //   params: {}
          // });
          that.$router.go(-1);
        }, 500);
        return;
      }
      this.tipMsg = "删除成功";
      let params = {};
      params.Seq_No = that.formEleProp.itemValue.Seq_No; //顺序号
      params.Cst_ID = that.formEleProp.itemValue.Chnl_ID; //客户编号
      this.$store.commit("updateAstate", { value: 2 }); //2是删除数据
      this.$store.dispatch("requireZZB002", params);
    },
    onBtnRight() {
      //保存
      console.log("保存");
      let that = this;
      console.log("编辑传过来的值11", that.formEle);
      if (
        !that.formEle.inutVal1 ||
        !that.formEle.inutVal2 ||
        !that.formEle.texteareVal
      ) {
        that.$vux.toast.text("请检查是否填写完整", "Middle");
        return;
      }
      // <!--游客模式新增逻辑->
      console.log("游客状态", this.bindFlag);
      if (this.bindFlag == "4" && that.$route.params.target) {
        console.log("游客模式新增保存");
        this.tipMsg = "新增成功";
        let LIST = that.$general.getCache("cacheAddressList")
          ? JSON.parse(that.$general.getCache("cacheAddressList"))
          : [];
        let params = {};
        params.Cst_Nm = that.formEle.inutVal1;
        params.MblPh_No = that.formEle.inutVal2;
        params.Dtl_Adr = that.formEle.texteareVal;
        params.Rsrv_Fld_1 = that.formEle.switchVal ? "1" : "0";
        params.Urbn_AtnmsDstc_Cd = that.changeAddressTion[1]; //城市自治州代码
        params.Prov_AtnmsRgon_Cd = that.changeAddressTion[0]; //省自治区代码
        params.CntyAndDstc_Cd = that.changeAddressTion[2]; //区县代码
        params.Seq_No = "";
        params.Chnl_ID = "";
        params.Rsrv_Fld_2 = "";
        params.Rcrd_Crt_Dt_Tm = "";

        if (params.Rsrv_Fld_1 == "1") {
          for (let key of LIST) {
            if (key.Rsrv_Fld_1 == "1") {
              key.Rsrv_Fld_1 = "0";
            }
          }
          LIST.unshift(params);
        } else {
          LIST.push(params);
        }

        that.$general.setCache("cacheAddressList", JSON.stringify(LIST));
        that.$vux.toast.text(this.tipMsg, "Middle");
        setTimeout(() => {
          // that.$router.push({
          //   name: "address",
          //   params: {}
          // });
          that.$router.go(-1);
        }, 500);
        return;
      }
      if (this.bindFlag == "4") {
        console.log("游客模式保存编辑保存");
        console.log("typeIndex", this.typeIndex);
        let LIST = that.$general.getCache("cacheAddressList")
          ? JSON.parse(that.$general.getCache("cacheAddressList"))
          : [];
        let params = {};
        params.Cst_Nm = that.formEle.inutVal1;
        params.MblPh_No = that.formEle.inutVal2;
        params.Dtl_Adr = that.formEle.texteareVal;
        params.Rsrv_Fld_1 = that.formEle.switchVal ? "1" : "0";
        params.Urbn_AtnmsDstc_Cd = that.changeAddressTion[1]; //城市自治州代码
        params.Prov_AtnmsRgon_Cd = that.changeAddressTion[0]; //省自治区代码
        params.CntyAndDstc_Cd = that.changeAddressTion[2]; //区县代码
        params.Seq_No = "";
        params.Chnl_ID = "";
        params.Rsrv_Fld_2 = "";
        params.Rcrd_Crt_Dt_Tm = "";
        if (params.Rsrv_Fld_1 == "1") {
          for (let key of LIST) {
            if (key.Rsrv_Fld_1 == "1") {
              key.Rsrv_Fld_1 = "0";
            }
          }
          LIST.splice(this.typeIndex, 1);
          LIST.unshift(params);
        } else {
          LIST.splice(this.typeIndex, 1, params);
        }

        that.$general.setCache("cacheAddressList", JSON.stringify(LIST));
        that.$vux.toast.text("修改成功", "Middle");
        setTimeout(() => {
          // that.$router.push({
          //   name: "address",
          //   params: {}
          // });
          that.$router.go(-1);
        }, 500);
        return;
      }
      // <!-- 新增逻辑start ->
      if (that.$route.params.target) {
        console.log("登录状态下新增");
        this.tipMsg = "新增成功";
        let params = {};
        params.Cst_Nm = encodeURIComponent(that.formEle.inutVal1); //客户名称
        params.MblPh_No = that.formEle.inutVal2; //手机号码
        params.Urbn_AtnmsDstc_Cd = that.changeAddressTion[1]; //城市自治州代码
        params.Prov_AtnmsRgon_Cd = that.changeAddressTion[0]; //省自治区代码
        params.CntyAndDstc_Cd = that.changeAddressTion[2]; //区县代码
        params.Dtl_Adr = encodeURIComponent(that.formEle.texteareVal); //详细地址
        params.Rsrv_Fld_1 = that.formEle.switchVal; //默认地址
        this.$store.commit("updateAstate", { value: 1 }); //1是新增数据
        this.$store.dispatch("requireZZB002", params);
        return;
      }
      // <!--新增逻辑end ->
      this.tipMsg = "保存成功";
      let params = that.formEle;
      params.Seq_No = that.formEleProp.itemValue.Seq_No; //顺序号
      params.Cst_ID = that.formEleProp.itemValue.Chnl_ID; //客户编号
      params.MblPh_No = that.formEle.inutVal2; //手机号码
      params.Urbn_AtnmsDstc_Cd = that.changeAddressTion[1]; //城市自治州代码
      params.Prov_AtnmsRgon_Cd = that.changeAddressTion[0]; //省自治区代码
      params.CntyAndDstc_Cd = that.changeAddressTion[2]; //区县代码
      params.Dtl_Adr = encodeURIComponent(that.formEle.texteareVal); //详细地址
      params.Rsrv_Fld_1 = that.formEle.switchVal; //默认地址
      params.Cst_Nm = encodeURIComponent(that.formEle.inutVal1); //客户名称
      this.$store.commit("updateAstate", { value: 3 }); //3是修改数据
      this.$store.dispatch("requireZZB002", params);
    },
    xInputClickClearIcon(str) {
      console.log("xInputClickClearIcon:", str);
    },
    xInputClickErrIcon2(str) {
      console.log("xInputClickErrIcon:", str);
    },
    xAddressHide(str) {
      console.log("xAddressHide", str);
    },
    xAddressShow(str) {
      console.log("xAddressShow", str);
    },
    xAddressShadowChange(ids, names) {
      console.log("xAddressShadowChange:", ids, names);
      let that = this;
      that.changeAddressTion = ids;
    },
    getName(value) {
      let that = this;
      let list = ChinaAddressV4Data;
      return that.$general.getAddressDetail(value, list);
    },
    xTextareaChange(str) {
      console.log("xTextareaChange:", str);
    },
    xTextareaFocus(str) {
      console.log("xTextareaFocus:", str);
    },
    xTextareaBlur(str) {
      console.log("xTextareaBlur:", str);
    },
    xSwitchChange(str) {
      console.log("xSwitchChange:", str);
      console.log(
        "xSwitchChange xSwitchSlotTitle:",
        this.formEleProp.xSwitchSlotTitle
      );
    },
    xSwitchClick(newVal, oldVal) {
      console.log("xSwitchClick newVal:", newVal);
      console.log("xSwitchClick oldVal:", oldVal);
    }
  },
  components: {
    XAddress,
    Toast,
    "ccb-input": () => import("@/components/packages/genericForm/CcbInput.vue"),
    "ccb-address": () =>
      import("@/components/packages/genericForm/CcbAddress.vue"),
    "ccb-switch": () =>
      import("@/components/packages/genericForm/CcbSwitch.vue"),
    "ccb-textarea": () =>
      import("@/components/packages/genericForm/CcbTextarea.vue"),
    "ccb-generic-form": () =>
      import("@/components/packages/genericForm/Index.vue"),
    "ccb-edit-button": () => import("@/components/packages/button/Index.vue")
  },
  destroyed() {}
};
</script>

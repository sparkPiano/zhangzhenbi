<!--
 * @Description: ccb-buy-now
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-11 09:17:55
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-14 16:06:18
-->
<template>
  <div class="ccb-cart-detail">
    <div v-transfer-dom>
      <actionsheet
        :menus="menus"
        v-model="showMenu"
        @on-click-menu="selectMenu"
        @on-after-hide="hideMenus"
        @on-after-show="showMenus"
        show-cancel
      ></actionsheet>
    </div>
    <ccb-cart-detail
      :formEleProp="formEleProp.cartDetail"
      :formElePropOne="formEleProp.mangerInfo"
      :formEle="formEle"
      :isShowCell1="isShowCell1"
      :isShowAddress="isShowAddress"
      :isShowDivider="isShowDivider"
      :isShowTiQuInfo="isShowTiQuInfo"
      :isUseGroupStyle="isUseGroupStyle"
      :normalPreview="normalPreview"
      :rightBtn="rightBtn"
      :labelWidth="labelWidth"
      :labelMarginRight="labelMarginRight"
      :labelAlign="labelAlign"
    >
      <template slot="cellTitle">
        <div class="ccb-cell-title">
          <div>{{ Receiver }}</div>
          <div>{{ contractMobile }}</div>
          <div>{{ shippingDddress }}</div>
        </div>
      </template>
      <template slot="cellContent">
        <div class="ccb-cell-content_desc">
          <div class="ccb-cell-receiver">{{ shippingInfo.Receiver }}</div>
          <div class="ccb-cell-contractMobile">
            {{ shippingInfo.contractMobile }}
          </div>
          <div class="ccb-cell-shippingDddress">
            {{ shippingInfo.shippingDddress }}
          </div>
        </div>
      </template>
      <template slot="imgIcon">
        <span><i class="iconfont icon-dingwei1"></i></span>
      </template>
    </ccb-cart-detail>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import {
  ChinaAddressV4Data,
  Value2nameFilter as value2name,
  TransferDom,
  Actionsheet
} from "vux";
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
  name: "ccb-buy-now",
  mixins: [mixin],
  directives: {
    TransferDom
  },
  data() {
    return {
      showMenu: false,
      menus: [],
      labelWidth: "1rem",
      labelMarginRight: "0.1rem",
      labelAlign: "left",
      isShowAddress: true,
      isShowDivider: true,
      isShowCell1: true,
      isShowTiQuInfo: false,
      goTo: this.$route.query.goTo,
      Receiver: "收货人",
      contractMobile: "联系电话",
      shippingDddress: "收货地址",
      shippingInfo: {
        Receiver: "",
        contractMobile: "",
        shippingDddress: ""
      },
      formEleProp: {
        cartDetail: {
          cellIsLink: true,
          onChangeAddress: this.onChangeAddress,
          onChangeAgree: this.onChangeAgree,
          openAgreement: this.openAgreement,
          list: [],
          addressLabel: "保存为默认地址",
          agreeLabel: "我已认真阅读并同意一下协议",
          agreement: "中国建设银行装帧普制币客户须知",
          selectAddress: this.selectAddress
        },
        mangerInfo: {
          managerNo: "10930534",
          managerName: "客户经理编号",
          area: {
            xAddressTitle: "提取地区",
            xAddressList: ChinaAddressV4Data,
            xAddressPlaceholder: "-请选择-",
            xAddressShowSync: false,
            xAddressValTextAlign: "left",
            xAddressHide: this.handleArea,
            xAddressShow: () => console.log(""),
            xAddressShadowChange: () => console.log(""),
            xAddressSlotTitle: "area"
          },
          net: {
            popupPickerTitle: "提取网点",
            popupPickerShowSync: null,
            popupPickerInlineDesc: "",
            popupPickerPlaceholder: "-请选择-",
            popupPickerShowName: false,
            popupPickerValTextAlign: "left",
            popupPickerDisplayFormat: () => "",
            popupPickerPopupStyle: null,
            popupPickerConfirmText: "",
            popupPickerCancelText: "",
            popupPickerPopupTitle: "",
            popupPickerDisabled: false,
            popupPickerData: [],
            popupPickerChange: this.handleNet,
            popupPickerShow: () => console.log(""),
            popupPickerHide: () => console.log(""),
            popupPickerShadowChange: () => console.log(""),
            popupPickerSlotTitle: "net"
          },
          date: {
            datetimeTitle: "提取日期",
            datetimeFormat: "YYYY/MM/DD",
            datetimeInlineDesc: "",
            datetimePlaceholder: "-请选择-",
            datetimeMinYear: null,
            datetimeMaxYear: null,
            datetimeMinHour: 0,
            datetimeMaxHour: 23,
            datetimeConfirmText: "确认",
            datetimeCancelText: "取消",
            datetimeClearText: "",
            datetimeYearRow: "",
            datetimeMonthRow: "",
            datetimeDayRow: "",
            datetimeHourRow: "",
            datetimeMinuteRow: "",
            datetimeStartDate: this.$general.formatTime(
              this.getTime(),
              "yyyy-MM-dd"
            ),
            datetimeEndDate: "",
            datetimeRequired: false,
            datetimeDisplayFormat: null,
            datetimeReadonly: null,
            datetimeShowSync: null,
            datetimeMinuteList: null,
            datetimeHourList: null,
            datetimeSelectedValue: "",
            datetimeHourFunc: null,
            datetimeDaysFunc: null,
            datetimeOrderMap: null,
            datetimeValueTextAlign: "left",
            datetimeChange: this.handleDatetime,
            datetimeClear: () => console.log(""),
            datetimeShow: () => console.log(""),
            datetimeHide: () => console.log(""),
            datetimeCancel: () => console.log(""),
            datetimeConfirm: () => console.log(""),
            datetimeSlotTitle: "date"
          },
          mgInput: {
            xInputType: "text",
            xInputRequired: false,
            xInputTitle: "客户经理编号",
            xInputPlaceholder: "(选填)",
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
            xInputSlotTitle: "mgInput"
          }
        }
      },
      formEle: {
        cartDetail: null,
        masker: null,
        addressStatus: 0,
        agreeStatus: 0,
        area: [],
        net: [],
        date: "",
        mgInput: ""
      },
      isUseGroupStyle: false,
      normalPreview: {
        bodyItems: [],
        footerBtns: [],
        headerLabel: "",
        headerValue: ""
      },
      rightBtn: {
        btnName: "确定",
        btnMini: true,
        btnPlain: true,
        confirmInfo: this.confirmInfo,
        btnDisabled: true
      },
      numTotal: 0,
      amountTotal: 0
    };
  },
  created() {
    let that = this;
    console.log("goto", that.goTo);
    if (that.goTo) {
      that.isShowAddress = false;
      that.isShowDivider = false;
      that.isShowCell1 = false;
      that.isShowTiQuInfo = false;
    } else {
      that.isShowTiQuInfo = true;
    }
    console.log("purchasingDetail222", that.purchasingDetail);
    that.formEle.agreeStatus = parseInt(that.$general.getCache("agreeStatus"));
    that.formEle.addressStatus = parseInt(
      that.$general.getCache("addressStatus")
    );
    if (that.formEle.agreeStatus) {
      that.rightBtn.btnDisabled = false;
    }
    if (that.userInfo.BIND_FLAG != "4") {
      // 获取收货地址
      that.getAddressList();
    } else {
      that.menus = [
        {
          label: "收货地址",
          type: "info"
        }
      ];
      let youkeAddress = that.$general.getCache("cacheAddressList")
        ? JSON.parse(that.$general.getCache("cacheAddressList"))
        : [];
      for (let item of youkeAddress) {
        let name = that.getName(item.CntyAndDstc_Cd);
        let val = "",
          _char = "";
        for (let i = 0; i < name.length; i++) {
          val += _char + name[i];
          if (name[i]) {
            _char = "/";
          }
        }
        let obj = {
          label: `${
            item.Rsrv_Fld_1 == "1"
              ? "<span style='color: #3966ae'>默认地址</span>"
              : ""
          } ${item.Cst_Nm} ${item.MblPh_No}<br />${val} ${item.Dtl_Adr}`,
          type: "default",
          value: `${val} ${item.Dtl_Adr}`,
          name: `${item.Cst_Nm}`,
          mobileNo: `${item.MblPh_No}`,
          obj: item
        };
        if (item.Rsrv_Fld_1 == "1") {
          that.shippingInfo = {
            Receiver: item.Cst_Nm,
            contractMobile: item.MblPh_No,
            shippingDddress: `${val} ${item.Dtl_Adr}`
          };
          that.$general.setCache("defaultAddr", JSON.stringify(item));
        }
        that.menus.push(obj);
      }
    }
    let lists = that.purchasingDetail;
    let amountTotal = 0,
      totalMoney = 0;
    let obj = Object.create({});

    let obj1 = {},
      obj2 = {};
    let list2 = [];
    if (!that.goTo) {
      list2 = lists.reduce(function(item, next) {
        obj2[next.id] = (obj2[next.id] ? parseInt(obj2[next.id]) : 0) + 1;
        obj1[next.id] ? "" : (obj1[next.id] = true && item.push(next));
        return item;
      }, []);
      console.log("list2", list2);
      for (let it of list2) {
        it["singleNum"] = obj2[it.id];
        that.numTotal += parseInt(obj2[it.id]);
      }
      console.log("single", that.numTotal);
      that.formEleProp.cartDetail.list = that.formEleProp.cartDetail.list.concat(
        list2
      );
      for (let list of lists) {
        amountTotal += parseFloat(list.price);
        // numTotal += parseInt(list.numbers);
      }
      that.updatePurchasingDetail({ obj: list2 });
      that.$general.setCache("paymentProductList", JSON.stringify(list2));
    } else {
      list2 = lists;
      console.log("single111", that.numTotal);
      that.formEleProp.cartDetail.list = that.formEleProp.cartDetail.list.concat(
        list2
      );
      for (let list of lists) {
        amountTotal += parseFloat(list.price) * parseInt(list.singleNum);
        that.numTotal += parseInt(list.singleNum);
      }
      that.$general.setCache("paymentProductList", JSON.stringify(list2));
    }
    // totalMoney = amountTotal + 8.0;
    console.log("yunfei", that.$route.params.yunfei);
    let tmpList = [];
    if (!that.goTo) {
      if (lists[0].receiptWayNo == "01") {
        tmpList = [
          {
            label: "购买总金额",
            value: `${parseFloat(amountTotal).toFixed(2)}元`
          },
          {
            label: "购买总数量",
            value: `${that.numTotal}件`
          },
          {
            label: "运费",
            value: `${parseFloat(that.$route.params.yunfei).toFixed(2)}元`
          },
          {
            label: "合计金额",
            value: `${(
              parseFloat(amountTotal) + parseFloat(that.$route.params.yunfei)
            ).toFixed(2)}元`
          }
        ];
      } else {
        tmpList = [
          {
            label: "购买总金额",
            value: `${parseFloat(amountTotal).toFixed(2)}元`
          },
          {
            label: "购买总数量",
            value: `${that.numTotal}件`
          },
          {
            label: "合计金额",
            value: `${parseFloat(amountTotal).toFixed(2)}元`
          }
        ];
      }
    } else {
      tmpList = [
        {
          label: "购买总金额",
          value: `${parseFloat(amountTotal).toFixed(2)}元`
        },
        {
          label: "购买总数量",
          value: `${that.numTotal}件`
        }
      ];
    }

    that.normalPreview.bodyItems = that.normalPreview.bodyItems.concat(tmpList);
    console.log("tmplist", that.normalPreview);
  },
  mounted() {
    let that = this;
    if (that.goTo) {
      that.initPos();
    }
  },
  updated() {},
  computed: {
    ...mapState(["purchasingDetail", "userInfo", "address"])
  },
  watch: {
    "formEle.addressStatus": {
      handler(newVal, oldVal) {},
      deep: true
    },
    "formEle.agreeStatus": {
      handler(newVal, oldVal) {},
      deep: true
    }
  },
  methods: {
    getTime() {
      let d = new Date();
      d.setDate(d.getDate() + 5);
      return d;
    },
    onChangeAddress(val) {
      let that = this;
      let addr = that.$general.getCache("selectedAddr")
        ? JSON.parse(that.$general.getCache("selectedAddr"))
        : JSON.parse(that.$general.getCache("defaultAddr"));
      console.log("addr", addr);
      if (val.target.checked) {
        that.formEle.addressStatus = 1;
        that.$general.setCache("addressStatus", that.formEle.addressStatus);
        that.$xhr.post(
          "/ccbsns/SNSService",
          {
            TXCODE: "ZZB002",
            Ebnk_MsgRp_Fcn_No: 3,
            Seq_No: addr.Seq_No, //顺序号
            QRY_G: "",
            Cst_Nm: addr.Cst_Nm, //客户名称
            MblPh_No: addr.MblPh_No, //手机号码
            Urbn_AtnmsDstc_Cd: addr.Urbn_AtnmsDstc_Cd, //城市自治州代码
            Prov_AtnmsRgon_Cd: addr.Prov_AtnmsRgon_Cd, //省自治区代码
            CntyAndDstc_Cd: addr.CntyAndDstc_Cd, //区县代码
            Dtl_Adr: addr.Dtl_Adr, //详细地址
            Rsrv_Fld_1: "1", //默认地址
            wParam: decodeURIComponent(that.userInfo.wParam)
          },
          null,
          response => {
            const retCode = response.data.HEADER.retcode;
            if (retCode === "000000" || retCode === "000000000000") {
              console.log("addr-modify", response.data.BODY);
              that.$vux.toast.show({
                text: "成功保存为默认地址",
                position: "middle",
                type: "success",
                width: "3rem"
              });
            } else {
              console.log(response.data.HEADER);
              that.$vux.toast.show({
                text: "保存失败",
                position: "middle",
                type: "warn",
                width: "3rem"
              });
            }
          }
        );
      } else {
        this.formEle.addressStatus = 0;
        this.$general.setCache("addressStatus", this.formEle.addressStatus);
      }
    },
    onChangeAgree(val) {
      if (val.target.checked) {
        this.formEle.agreeStatus = 1;
        this.rightBtn.btnDisabled = false;
        this.$general.setCache("agreeStatus", this.formEle.agreeStatus);
      } else {
        this.formEle.agreeStatus = 0;
        this.rightBtn.btnDisabled = true;
        this.$general.setCache("agreeStatus", this.formEle.agreeStatus);
      }
    },
    openAgreement() {
      console.log("openAgreement");
    },
    confirmInfo() {
      let that = this;
      console.log("confirmInfo");
      that.$general.clearCache("aPay");
      that.$general.clearCache("mPay");
      if (
        that.formEle.area.length &&
        that.formEle.net.length &&
        that.formEle.date
      ) {
        let tijiaoList = that.purchasingDetail.map(item => {
          return item.productNo;
        });
        that
          .checkSoldProduct(tijiaoList)
          .then(res => {
            let lists = res.Rst_Grp && res.Rst_Grp.length ? res.Rst_Grp : [];
            let tmpList = lists.filter(val => {
              return val.AlSal_Ind == "0";
            });
            let str = "",
              _char = "";
            for (let item of tmpList) {
              str += _char + item.PM_PD_ID;
              _char = "、";
            }
            if (str) {
              that.$vux.toast.show({
                text: `${str}已停售，请返回购物车删除`,
                position: "middle",
                type: "warn",
                width: "3rem"
              });
            } else {
              let obj = {
                area: `${that.formEle.area[0]} ${that.formEle.area[1]} ${that.formEle.area[2]}`,
                net: `${that.formEle.net[0].split(" ")[0]}`,
                date: `${that.formEle.date}`
              };
              that.$general.setCache("tijiaoInfo", JSON.stringify(obj));
              that.$router.push({
                name: "payment"
              });
            }
          })
          .catch(err => {
            that.$vux.toast.show({
              text: err && err.HEADER ? err.HEADER.retmsg : err,
              position: "middle",
              type: "warn",
              width: "3rem"
            });
          });
      } else {
        that.$vux.toast.show({
          type: "text",
          position: "middle",
          text: `${!that.formEle.area.length ? "提取地区未填写、" : ""}${
            !that.formEle.net.length ? "提取网点未填写、" : ""
          }${!that.formEle.date.length ? "提取日期未填写" : ""}`,
          width: "3rem"
        });
      }
      that.$router.push({
        name: "payment"
      });
    },
    checkSoldProduct(list) {
      let that = this;
      that.$xhr.post(
        "/ccbsns/SNSService",
        {
          TXCODE: "ZZB005",
          params: list,
          wParam: decodeURIComponent(that.userInfo.wParam)
        },
        null,
        response => {
          const retCode = response.data.HEADER.retcode;
          if (retCode === "000000" || retCode === "000000000000") {
            console.log("checkSoldProduct", response.data.BODY);
            Promise.resolve(response.data.BODY);
          } else {
            console.log(response.data.HEADER);
            Promise.reject(response.data);
          }
        }
      );
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
      this.formEleProp.mangerInfo.area.xAddressShowSync = true;
      setTimeout(() => {
        this.formEleProp.mangerInfo.area.xAddressShowSync = false;
      }, 2000);
    },
    getName(value) {
      let that = this;
      let list = ChinaAddressV4Data;
      return that.$general.getAddressDetail(value, list);
    },
    selectAddress() {
      let that = this;
      console.log("selectAddress");
      that.showMenu = true;
      if (that.userInfo.BIND_FLAG != "4") {
        // 获取收货地址
        that.getAddressList();
      } else {
        let youkeAddress = that.$general.getCache("cacheAddressList")
          ? JSON.parse(that.$general.getCache("cacheAddressList"))
          : [];
        that.menus = [
          {
            label: "收货地址",
            type: "info"
          }
        ];
        for (let item of youkeAddress) {
          let name = that.getName(item.CntyAndDstc_Cd);
          let val = "",
            _char = "";
          for (let i = 0; i < name.length; i++) {
            val += _char + name[i];
            if (name[i]) {
              _char = "/";
            }
          }
          let obj = {
            label: `${
              item.Rsrv_Fld_1 == "1"
                ? "<span style='color: #3966ae'>默认地址</span>"
                : ""
            } ${item.Cst_Nm} ${item.MblPh_No}<br />${val} ${item.Dtl_Adr}`,
            type: "default",
            value: `${val} ${item.Dtl_Adr}`,
            name: `${item.Cst_Nm}`,
            mobileNo: `${item.MblPh_No}`,
            obj: item
          };
          if (item.Rsrv_Fld_1 == "1") {
            that.shippingInfo = {
              Receiver: item.Cst_Nm,
              contractMobile: item.MblPh_No,
              shippingDddress: `${val} ${item.Dtl_Adr}`
            };
            that.$general.setCache("defaultAddr", JSON.stringify(item));
          }
          that.menus.push(obj);
        }
      }
    },
    selectMenu(val, item) {
      let that = this;
      console.log("selectMenu", val, item);
      that.shippingInfo = {
        Receiver: item.name,
        contractMobile: item.mobileNo,
        shippingDddress: item.value
      };
      that.formEle.addressStatus = 0;
      that.$general.setCache("addressStatus", that.formEle.addressStatus);
      that.$general.setCache("selectedAddr", JSON.stringify(item.obj));
    },
    getAddressList() {
      let that = this;
      that.$xhr.post(
        "/ccbsns/SNSService",
        {
          TXCODE: "ZZB002",
          Ebnk_MsgRp_Fcn_No: that.address.Ebnk_MsgRp_Fcn_No,
          Cst_ID: [],
          Seq_No: [],
          QRY_G: "",
          wParam: decodeURIComponent(that.userInfo.wParam)
        },
        null,
        response => {
          const retCode = response.data.HEADER.retcode;
          if (retCode === "000000" || retCode === "000000000000") {
            console.log("query", response.data.BODY.LIST, that.menus);
            that.menus = [
              {
                label: "收货地址",
                type: "info"
              }
            ];
            for (let item of response.data.BODY.LIST) {
              let name = that.getName(item.CntyAndDstc_Cd);
              let val = "",
                _char = "";
              for (let i = 0; i < name.length; i++) {
                val += _char + name[i];
                if (name[i]) {
                  _char = "/";
                }
              }
              let obj = {
                label: `${
                  item.Rsrv_Fld_1 == "1"
                    ? "<span style='color: #3966ae'>默认地址</span>"
                    : ""
                } ${item.Cst_Nm} ${item.MblPh_No}<br />${val} ${item.Dtl_Adr}`,
                type: "default",
                value: `${val} ${item.Dtl_Adr}`,
                name: `${item.Cst_Nm}`,
                mobileNo: `${item.MblPh_No}`,
                obj: item
              };
              if (item.Rsrv_Fld_1 == "1") {
                that.shippingInfo = {
                  Receiver: item.Cst_Nm,
                  contractMobile: item.MblPh_No,
                  shippingDddress: `${val} ${item.Dtl_Adr}`
                };
                that.$general.setCache("defaultAddr", JSON.stringify(item));
              }
              that.menus.push(obj);
            }
            console.log("menus---", that.menus);
          } else {
            console.log(response.data.HEADER);
          }
        }
      );
    },
    hideMenus() {
      console.log("hideMenus");
    },
    showMenus() {
      console.log("showMenus");
    },
    getArea(val) {
      let that = this;
      console.log("area", this.formEle.area, val);
      that.$xhr.post(
        "/ccbsns/SNSService",
        {
          TXCODE: "ZZB017",
          ADiv_Cd: val,
          wParam: decodeURIComponent(that.userInfo.wParam)
        },
        null,
        response => {
          const retCode = response.data.HEADER.retcode;
          if (retCode === "000000" || retCode === "000000000000") {
            console.log("handleArea", response.data.BODY);
            let list =
              response.data.BODY.INST_GRP && response.data.BODY.INST_GRP.length
                ? response.data.BODY.INST_GRP
                : [];
            let lists = list.map(val => {
              return `${val.CCBIns_Chn_ShrtNm} ${val.Fix_TelNo}<br />${val.Dtl_Adr} 机构编号:${val.CCBIns_ID}`;
            }, []);
            that.formEle.net = lists.length ? list : [];
          } else {
            console.log(response.data.HEADER);
            that.$vux.toast.show({
              text:
                response.data && response.data.HEADER
                  ? response.data.HEADER.retmsg
                  : response.data,
              position: "middle",
              type: "warn",
              width: "3rem"
            });
          }
        }
      );
    },
    handleArea(val) {
      let that = this;
      console.log("area", this.formEle.area, val);
      that.getArea(val && val.length ? val[2] : "");
    },
    handleNet(val) {
      console.log("net", val);
    },
    handleDatetime(val) {
      console.log("date", val);
    },
    initPos() {
      let that = this;
      console.log("1111111");
      let list = ChinaAddressV4Data;
      // eslint-disable-next-line no-undef
      let local = new that.$local();
      local.getLocation(function(res) {
        console.log("position", res);
        let addComp = res.addressComponents;
        let province = addComp.province;
        let city = addComp.city;
        let area = addComp.district;
        let list1 = list.filter(item => {
          return item.name.indexOf(province) > -1;
        });
        let threePoint = list1[0].value.substr(0, 3);
        let list2 = list.filter(item => {
          return item.value.indexOf(threePoint) > -1;
        });
        let list21 = list2.filter(item => {
          return item.name.indexOf(city) > -1;
        });
        let list3 = list2.filter(item => {
          return item.name.indexOf(area) > -1;
        });
        that.formEle.area = [list1[0].value, list21[0].value, list3[0].value];
        that.getArea(list3[0].value);
      });
    },
    ...mapMutations(["updatePurchasingDetail"])
  },
  components: {
    "ccb-cart-detail": () =>
      import("@/components/packages/product/CartDetail.vue"),
    Actionsheet
  },
  destroyed() {}
};
</script>
<style lang="less">
.weui-cells {
  &::after {
    height: 0;
    border-bottom: 0;
  }
}
.ccb-cart-detail {
  .weui-cell_access .weui-cell__ft {
    flex: 3;
  }
}
</style>

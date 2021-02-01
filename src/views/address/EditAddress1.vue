<template>
  <div class="EditAddress1">
    <group>
      <x-input
        style="font-size: 14px;"
        label-width="100px"
        title="收货人姓名"
        placeholder="请输入姓名"
        v-model="name"
      ></x-input>
    </group>
    <group>
      <x-input
        style="font-size: 14px;"
        label-width="100px"
        title="联系电话"
        v-model="phone"
        placeholder="请输入电话"
      ></x-input>
    </group>
    <group>
      <x-address
        style="font-size: 14px;"
        @on-hide="valuetrue"
        title="所在地区"
        v-model="address"
        :list="addressData"
        @on-shadow-change="onShadowChange"
        placeholder="请选择地址"
      ></x-address>
    </group>
    <group>
      <x-textarea
        class="ccb-textarea"
        label-width="100px"
        style="font-size: 14px;"
        title="详细地址"
        v-model="area"
        placeholder="请输入详细地址"
      ></x-textarea>
    </group>
    <group>
      <x-switch
        style="font-size: 14px;"
        title="设为默认地址"
        v-model="defaultAddress"
      ></x-switch>
    </group>
    <div class="delSaveBtn">
      <div class="delSaveBtn-del" @click="del">删除</div>
      <div class="delSaveBtn-save" @click="save">保存</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-dupe-keys */
import {
  XInput,
  XAddress,
  XTextarea,
  XSwitch,
  ChinaAddressV4Data,
  XButton
} from "vux";
export default {
  name: "editAddress1",
  data() {
    return {
      name: "",
      phone: "",
      address: ["110000", "110100", "110101"],
      area: "",
      addressData: ChinaAddressV4Data,
      defaultAddress: false
    };
  },
  created() {},
  mounted() {
    let that = this;
    console.log("query params", JSON.parse(this.$route.query));
    let res = JSON.parse(this.$route.query);
    this.name = res.Cst_Nm;
    this.phone = res.MblPh_No;
    this.area = res.Dtl_Adr;
    this.defaultAddress = res.Rsrv_Fld_1 == "1" ? true : false;
  },
  updated() {},
  computed: {},
  watch: {},
  methods: {
    del() {},
    save() {},
    bgColorSwitch() {
      return "red";
    },
    valuetrue() {
      this.valueCode = this.value;
    },
    onShadowChange(index, item) {
      console.log("onShadowChnge", index, item);
      this.value = index;
      this.adress = item;
    }
  },
  components: {
    XInput,
    XAddress,
    XTextarea,
    XSwitch,
    XButton
  },
  destroyed() {}
};
</script>
<style lang="less" scoped>
.EditAddress1 {
  background: #fff !important;
}
.weui-textarea {
  margin-left: 30px !important;
}
.delSaveBtn {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 100px;
  div {
    width: 35%;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .delSaveBtn-del {
    border-radius: 20px;
    border: 1px solid #999999;
    color: #999;
  }
  .delSaveBtn-save {
    border-radius: 20px;
    border: 1px solid #3966ae;
    color: #3966ae;
  }
}
</style>

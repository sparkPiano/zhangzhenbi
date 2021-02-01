<!--
 * @Description: productscreening
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-30 14:07:33
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-09 10:40:55
-->
<template>
  <div class="ccb-product-screening">
    <ccb-product :formEleProp="formEleProp.productPrice">
      <template slot="customGroupTitle">
        <span class="x-sold-title_first">价格</span>
      </template>
      <template slot="customProd">
        <div class="ccb-form">
          <div
            class="ccb-form-item"
            v-for="(item, index) in formEleProp.formObj.priceList"
            :key="index"
          >
            <input
              class="ccb-input"
              type="radio"
              :value="item.value"
              v-model="formEle[item.field]"
              @change="onChangePrice"
            />
            <label for="ccbInput" class="ccb-label">{{ item.label }}</label>
          </div>
        </div>
      </template>
    </ccb-product>
    <ccb-product :formEleProp="formEleProp.productParValue">
      <template slot="customGroupTitle">
        <span class="x-sold-title_first">面值</span>
      </template>
      <template slot="customProd">
        <div class="ccb-form">
          <div
            class="ccb-form-item"
            v-for="(item, index) in formEleProp.formObj.parValueList"
            :key="index"
          >
            <input
              class="ccb-input"
              type="radio"
              :value="item.value"
              v-model="formEle[item.field]"
              @change="onChangeParValue"
            />
            <label for="ccbInput" class="ccb-label">{{ item.label }}</label>
          </div>
        </div>
      </template>
    </ccb-product>
    <div class="ccb-btn">
      <ccb-button :btnObj="btnObjSet.letfBtn"></ccb-button>
      <ccb-button :btnObj="btnObjSet.rightBtn"></ccb-button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { mixin } from "@/mixins/mixin";
export default {
  name: "productScreening",
  mixins: [mixin],
  data() {
    return {
      formEleProp: {
        productPrice: {},
        productParValue: {},
        formObj: {
          priceList: [
            {
              field: "price",
              label: "全部",
              value: "all"
            },
            {
              field: "price",
              label: "5元以下",
              value: "5"
            },
            {
              field: "price",
              label: "5元-10元(含5元)",
              value: "5-10"
            },
            {
              field: "price",
              label: "10元-50元(含10元)",
              value: "10-50"
            },
            {
              field: "price",
              label: "50元-100元(含50元)",
              value: "50-100"
            },
            {
              field: "price",
              label: "100元以上(含100元)",
              value: "100"
            }
          ],
          parValueList: [
            {
              field: "parValue",
              label: "全部",
              value: "all"
            },
            {
              field: "parValue",
              label: "5元以下",
              value: "5"
            },
            {
              field: "parValue",
              label: "5元-10元(含5元)",
              value: "5-10"
            },
            {
              field: "parValue",
              label: "10元-50元(含10元)",
              value: "10-50"
            },
            {
              field: "parValue",
              label: "50元-100元(含50元)",
              value: "50-100"
            },
            {
              field: "parValue",
              label: "100元以上(含100元)",
              value: "100"
            }
          ]
        }
      },
      formEle: {
        price: "all",
        parValue: "all"
      },
      btnObjSet: {
        letfBtn: {
          btnName: "重置",
          btnMini: false,
          btnPlain: false,
          clickBtnEvent: this.resetCondition
        },
        rightBtn: {
          btnName: "确定",
          btnMini: false,
          btnPlain: false,
          clickBtnEvent: this.confirmCondition
        }
      }
    };
  },
  created() {},
  mounted() {
    let that = this;
  },
  updated() {},
  computed: {
    ...mapState(["retPage"])
  },
  watch: {},
  methods: {
    resetCondition(val) {
      console.log("reset", val);
      this.formEle.price = "all";
      this.formEle.parValue = "all";
    },
    confirmCondition(val) {
      let that = this;
      console.log("confirm", val);
      that.$router.go(-1);
      // that.$router.push({
      //   name: that.retPage == "all" ? "allProduct" : "product",
      //   params: { queryCondition: that.formEle }
      // });
      that.updateQueryCondition({ result: that.formEle });
    },
    onChangePrice() {
      console.log("onChangePrice", this.formEle.price);
    },
    onChangeParValue() {
      console.log("onChangeParValue", this.formEle.parValue);
    },
    ...mapMutations(["updateQueryCondition"])
  },
  components: {
    "ccb-product": () => import("@/components/packages/product/Index.vue"),
    "ccb-button": () =>
      import("@/components/packages/genericForm/CcbButton.vue")
  },
  destroyed() {}
};
</script>

<style lang="less" scoped>
.ccb-form {
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  flex-flow: row wrap;
  align-items: center;
  font-size: 14px;
  padding: 15px 0;
  .ccb-form-item {
    padding: 5px;
    font-size: 14px;
    flex: 1;
    min-width: 40%;
    input[type="radio"] {
      margin-right: 10px;
      margin-left: 10px;
      cursor: pointer;
      width: 20px;
      height: 25px;
      position: relative;
    }

    input[type="radio"]:after {
      position: absolute;
      width: 20px;
      height: 25px;
      top: 0;
      left: -6px;
      content: " ";
      background-color: #fff;
      color: #fff;
      display: inline-block;
      visibility: visible;
      border: 1px solid grey;
      padding-left: 5px;
      border-radius: 3px;
    }

    input[type="radio"]:checked:after {
      background-color: #0f97e7;
      content: "✓";
      font-size: 20px;
    }

    input[type="radio"]:disabled:after {
      width: 20px;
      height: 25px;
      top: 0;
      color: #fff;
      display: inline-block;
      visibility: visible;
      border: 1px solid grey;
      padding-left: 5px;
      border-radius: 3px;
      background-color: #e9e7e3;
      content: "✓";
      font-size: 20px;
    }
  }
}
.ccb-btn {
  display: flex;
  padding-top: 130px;
  padding-bottom: 30px;
  background-color: #ffffff;
  .ccb-button {
    border-width: 1px;
    border-radius: 30px;
    margin: 0 8px;
    font-size: 18px;
  }
  .weui-btn + .weui-btn {
    margin-top: auto !important;
  }
}
</style>

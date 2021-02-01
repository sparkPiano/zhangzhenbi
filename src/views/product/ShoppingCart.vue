<!--
 * @Description: shopping-cart
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-09 16:17:54
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-11 11:30:24
-->
<template>
  <div class="ccb-cart ccb-product_list">
    <sticky scroll-box="vux_view_box_body">
      <ccb-tab
        :formEleProp="formEleProp.tab"
        :formEle="formEle"
        @onItemClick="onItemClick"
      ></ccb-tab>
    </sticky>
    <ccb-generic-form v-show="this.formEle.tabIndex == 0">
      <div
        class="ccb-checker-cell"
        v-for="item in formEleProp.cell.list"
        :key="item.id"
      >
        <ccb-cell :formEleProp="item" :formEle="formEle">
          <template slot="cellContent">
            <div class="ccb-cell-content_desc">
              <div class="ccb-cell-receiver">{{ item.title }}</div>
              <div class="ccb-cell-contractMobile">
                套内数量：{{ item.numbers }}{{ item.numUnit }}
              </div>
              <div class="ccb-cell-shippingDddress">
                {{ `${item.price}元/${item.unit}` }}
              </div>
            </div>
          </template>
          <template slot="cellTitle">
            <div class="ccb-cell-title">
              <img :src="item.img" alt="" />
            </div>
          </template>
          <template slot="imgIcon">
            <span class="ccb-cell_hd" @click="selectItemWdzt(item.id)">
              <i
                class="iconfont"
                :class="
                  selectObj.wdzt['ccbNumber_' + item.id]
                    ? selectIconClass
                    : unSelectIconClass
                "
                v-if="isUseIcon"
              ></i>
              <img
                :src="
                  selectObj.wdzt['ccbNumber_' + item.id]
                    ? selectedImg
                    : unSelectedImg
                "
                alt=""
                v-else
              />
            </span>
          </template>
        </ccb-cell>
        <div class="ccb-inline-desc">
          <div class="ccb-inline-desc_left">
            <span>{{ formEleProp.cell.inlineDescLeft }}</span>
            <span>{{
              `${parseFloat(
                (formEle["ccbNumber_" + item.id]
                  ? formEle["ccbNumber_" + item.id]
                  : item.singleNum) * item.price
              ).toFixed(2)}元`
            }}</span>
          </div>
          <div class="ccb-inline-desc_right">
            <ccb-number
              :formEleProp="formEleProp['ccbNumber_' + item.id]"
              :formEle="formEle"
              :id="'ccbNumber_' + item.id"
              @change-number="onChangeNumberWdzt"
            ></ccb-number>
            <ccb-button
              :btnObj="btnObjSet.obj1"
              :objVal="item.id"
              class="ccb-next"
            ></ccb-button>
          </div>
        </div>
      </div>
      <div class="ccb-all-select">
        <span
          class="ccb-all-select_img"
          @click="isAllSelect.wdzt = !isAllSelect.wdzt"
        >
          <img :src="!isAllSelect.wdzt ? unSelectedImg : selectedImg" alt="" />
        </span>
        <span class="ccb-all-select_label">{{ allSelectLabel }}</span>
      </div>
      <div class="ccb-jifei-info">
        <div class="ccb-jifei-info_jine">
          购买总金额：{{ amount.toFixed(2) }}元
        </div>
        <div class="ccb-jifei-info_number">购买总数量：{{ count }}件</div>
      </div>
    </ccb-generic-form>
    <ccb-generic-form v-show="this.formEle.tabIndex == 1">
      <div
        class="ccb-checker-cell"
        v-for="item in formEleProp.cell.list1"
        :key="item.id"
      >
        <ccb-cell :formEleProp="item" :formEle="formEle">
          <template slot="cellContent">
            <div class="ccb-cell-content_desc">
              <div class="ccb-cell-receiver">{{ item.title }}</div>
              <div class="ccb-cell-contractMobile">
                套内数量：{{ item.numbers }}{{ item.numUnit }}
              </div>
              <div class="ccb-cell-shippingDddress">
                {{ `${item.price}元/${item.unit}` }}
              </div>
            </div>
          </template>
          <template slot="cellTitle">
            <div class="ccb-cell-title">
              <img :src="item.img" alt="" />
            </div>
          </template>
          <template slot="imgIcon">
            <span class="ccb-cell_hd" @click="selectItemShsm(item.id)">
              <i
                class="iconfont"
                :class="
                  selectObj.shsm['ccbNumber_' + item.id]
                    ? selectIconClass
                    : unSelectIconClass
                "
                v-if="isUseIcon"
              ></i>
              <img
                :src="
                  selectObj.shsm['ccbNumber_' + item.id]
                    ? selectedImg
                    : unSelectedImg
                "
                alt=""
                v-else
              />
            </span>
          </template>
        </ccb-cell>
        <div class="ccb-inline-desc">
          <div class="ccb-inline-desc_left">
            <span>{{ formEleProp.cell.inlineDescLeft }}</span>
            <span>{{
              `${parseFloat(
                (formEle["ccbNumber_" + item.id]
                  ? formEle["ccbNumber_" + item.id]
                  : item.singleNum) * item.price
              ).toFixed(2)}元`
            }}</span>
          </div>
          <div class="ccb-inline-desc_right">
            <ccb-number
              :formEleProp="formEleProp['ccbNumber_' + item.id]"
              :formEle="formEle"
              :id="'ccbNumber_' + item.id"
              @change-number="onChangeNumberShsm"
            ></ccb-number>
            <ccb-button
              :btnObj="btnObjSet.obj1"
              :objVal="item.id"
              class="ccb-next"
            ></ccb-button>
          </div>
        </div>
      </div>
      <div class="ccb-all-select">
        <span
          class="ccb-all-select_img"
          @click="isAllSelect.shsm = !isAllSelect.shsm"
        >
          <img :src="!isAllSelect.shsm ? unSelectedImg : selectedImg" alt="" />
        </span>
        <span class="ccb-all-select_label">{{ allSelectLabel }}</span>
      </div>
      <div class="ccb-jifei-info">
        <div class="ccb-jifei-info_jine">
          购买总金额：{{ amount1.toFixed(2) }}元({{
            `${yunfei > 0 ? "含运费" : "不含运费"}`
          }})
        </div>
        <div class="ccb-jifei-info_number">购买总数量：{{ count1 }}件</div>
      </div>
    </ccb-generic-form>
    <div class="ccb-jiesuan">
      <ccb-button :btnObj="btnObjSet.obj2"></ccb-button>
    </div>
  </div>
</template>
<script>
import selectedImg from "@/assets/images/u75_selected.png";
import unSelectedImg from "@/assets/images/u75.png";
import { mixin } from "@/mixins/mixin";
import { mapState, mapMutations } from "vuex";
import { Sticky } from "vux";
export default {
  name: "shopping-cart",
  mixins: [mixin],
  data() {
    return {
      labelWidth: "1rem",
      labelMarginRight: "0.05rem",
      labelAlign: "left",
      isUseIcon: false,
      selectIconClass: "",
      unSelectIconClass: "",
      selectedImg: selectedImg,
      unSelectedImg: unSelectedImg,
      allSelectLabel: "全选",
      isAllSelect: {
        shsm: false,
        wdzt: false
      },
      selectObj: {
        shsm: {},
        wdzt: {}
      },
      multiplePrices: {},
      amount: 0,
      amount1: 0,
      count: 0,
      count1: 0,
      yunfei: 0,
      ccbNumber: {
        xNumberTitle: "",
        xNumberMin: 0,
        value: 0,
        xNumberMax: 100000,
        xNumberStep: 1,
        xNumberFillable: false,
        xNumberWidth: "30px",
        xNumberButtonStyle: "square",
        xNumberAlign: "left",
        xNumberSlotTitle: ""
      },
      formEleProp: {
        tab: {
          lineWidth: 3,
          activeColor: "#3966ae",
          defaultColor: "",
          disabledColor: "",
          barActiveColor: "#3966ae",
          animate: true,
          customBarWidth: null,
          badgeLabel: "",
          badgeBg: "",
          badgeColor: "",
          preventDefault: true,
          scrollThreshold: 4,
          barPosition: "bottom",
          onBeforeIndexChange: this.onBeforeIndexChange,
          list: [
            {
              title: "网点自提",
              selected: true,
              disabled: false,
              badgeLabel: "",
              badgeColor: "",
              badgeBg: ""
            },
            {
              title: "送货上门",
              selected: false,
              disabled: false,
              badgeLabel: "",
              badgeColor: "",
              badgeBg: ""
            }
          ],
          itemBadgeLabel: "",
          itemBadgeBg: "",
          itemBadgeColor: "",
          onItemClick: this.onItemClick
        },
        cell: {
          inlineDescLeft: "小计：",
          list: [],
          list1: [],
          tmplist: [],
          tmplist1: []
        }
      },
      formEle: {
        tabIndex: 0
      },
      btnObjSet: {
        obj1: {
          clickBtnEvent: this.delete,
          btnType: "default",
          btnMini: true,
          btnPlain: true,
          btnName: "删除"
        },
        obj2: {
          clickBtnEvent: this.jieSuan,
          btnType: "default",
          btnMini: false,
          btnPlain: true,
          btnName: "结算",
          btnDisabled: true
        }
      },
      isFirst: false,
      amountTotal: 0,
      numTotal: 0,
      tmpCartProductList: [],
      wdztList: [],
      shsmList: []
    };
  },
  created() {
    let that = this;
    let lists = that.$general.getCache("cartProductList")
      ? JSON.parse(that.$general.getCache("cartProductList"))
      : [];
    let amountTotal = 0,
      numTotal = 0,
      totalMoney = 0;

    let obj1 = {},
      obj2 = {};
    let list2 = [];
    list2 = lists.reduce(function(item, next) {
      obj2[next.id] = (obj2[next.id] ? parseInt(obj2[next.id]) : 0) + 1;
      obj1[next.id] ? "" : (obj1[next.id] = true && item.push(next));
      return item;
    }, []);
    console.log("list2", list2);
    for (let it of list2) {
      it["singleNum"] = obj2[it.id];
    }
    that.tmpCartProductList = list2;
    console.log("tmpCartProductList", that.tmpCartProductList);
    that.formEleProp.cell.list = list2.filter(val => {
      return val.receiptWayNo == "02"; //网点自提
    });
    that.formEleProp.cell.list1 = list2.filter(val => {
      return val.receiptWayNo == "01"; //送货上门
    });

    console.log(
      "过滤后",
      that.formEleProp.cell.list,
      that.formEleProp.cell.list1
    );
    for (let list of list2) {
      amountTotal += parseFloat(list.price) * parseInt(list.singleNum);
      numTotal += parseInt(list.singleNum);
    }

    // that.amountTotal = amountTotal;
    // that.numTotal = numTotal;
    that.isFirst = true;

    console.log("multiple", numTotal, amountTotal);
    //网点自提
    for (let item of that.formEleProp.cell.list) {
      let obj = Object.assign({}, that.ccbNumber, {
        xNumberSlotTitle: "ccbNumber_" + item.id,
        value: item.singleNum
      });
      that.formEleProp["ccbNumber_" + item.id] = obj;
      that.$set(that.formEle, "ccbNumber_" + item.id, item.singleNum);
      that.$set(that.selectObj["wdzt"], "ccbNumber_" + item.id, false);
      that.$set(that.multiplePrices, "ccbNumber_" + item.id, item.price);
    }
    //送货上门
    for (let item of that.formEleProp.cell.list1) {
      let obj = Object.assign({}, that.ccbNumber, {
        xNumberSlotTitle: "ccbNumber_" + item.id,
        value: item.singleNum
      });
      that.formEleProp["ccbNumber_" + item.id] = obj;
      that.$set(that.formEle, "ccbNumber_" + item.id, item.singleNum);
      that.$set(that.selectObj["shsm"], "ccbNumber_" + item.id, false);
      that.$set(that.multiplePrices, "ccbNumber_" + item.id, item.price);
    }
    console.log("2222", that.selectObj, that.formEle);
  },
  mounted() {
    // console.log("33333", this.formEle, this.formEleProp);
    let that = this;
  },
  updated() {
    let that = this;
    // console.log("updated", this.formEle, this.formEleProp);
  },
  computed: {
    ...mapState(["purchasingDetail"])
  },
  watch: {
    formEle: {
      handler(newVal, oldVal) {
        let that = this;
        that.count = 0;
        that.count1 = 0;
        that.amount = 0;
        that.amount1 = 0;
        let mapVal = true;
        console.log("formEle", newVal, oldVal);
        if (that.isFirst) {
          // that.count = that.numTotal;
          // that.count1 = that.numTotal;
          // that.amount = that.amountTotal;
          // that.amount1 = that.amountTotal;
        } else {
          for (let it in that.selectObj.shsm) {
            //送货上门
            that.count1 += that.selectObj.shsm[it] ? that.formEle[it] : 0;
            that.amount1 +=
              (that.selectObj.shsm[it] ? that.formEle[it] : 0) *
              that.multiplePrices[it];
            if (that.selectObj.shsm[it]) {
              that.btnObjSet.obj2.btnDisabled = false;
            }
          }
          for (let it in that.selectObj.wdzt) {
            //网点自提
            that.count += that.selectObj.wdzt[it] ? that.formEle[it] : 0;
            that.amount +=
              (that.selectObj.wdzt[it] ? that.formEle[it] : 0) *
              that.multiplePrices[it];
            if (that.selectObj.wdzt[it]) {
              that.btnObjSet.obj2.btnDisabled = false;
            }
          }
        }
      },
      deep: true
    },
    "formEleProp.cell.list": {
      handler(newVal, oldVal) {
        let that = this;
        console.log("formEleProp.cell.list", newVal, oldVal);
        // if (that.wdztList.length) {
        //   that.formEleProp.cell.list = that.wdztList;
        // }
      },
      deep: true
    },
    "formEleProp.cell.list1": {
      handler(newVal, oldVal) {
        let that = this;
        console.log("formEleProp.cell.list1", newVal, oldVal);
        // if (that.shsmList.length) {
        //   that.formEleProp.cell.list1 = that.shsmList;
        // }
      },
      deep: true
    },
    "selectObj.shsm": {
      handler(newVal, oldVal) {
        //送货上门
        let that = this;
        console.log("selectObj.shsm", newVal, oldVal);
        let mapVal = true;
        for (let item in newVal) {
          mapVal = newVal[item] && mapVal;
          if (newVal[item]) {
            that.btnObjSet.obj2.btnDisabled = false;
          }
        }
        if (mapVal) {
          that.count1 = 0;
          that.amount1 = 0;
          for (let i in newVal) {
            that.count1 += that.formEle[i];
            that.amount1 += that.formEle[i] * that.multiplePrices[i];
          }
        } else {
          that.count1 = 0;
          that.amount1 = 0;
          if (that.isFirst) {
            // that.count = that.numTotal;
            // that.count1 = that.numTotal;
            // that.amount = that.amountTotal;
            // that.amount1 = that.amountTotal;
          } else {
            for (let j in newVal) {
              that.count1 += newVal[j] ? that.formEle[j] : 0;
              that.amount1 +=
                (newVal[j] ? that.formEle[j] : 0) * that.multiplePrices[j];
            }
          }
          that.isFirst = false;
        }
        that.isAllSelect.shsm = mapVal;
        console.log("selectObjMap", mapVal);
      },
      deep: true
    },
    "selectObj.wdzt": {
      handler(newVal, oldVal) {
        //网点自提
        let that = this;
        console.log("selectObj.wdzt", newVal, oldVal);
        let mapVal = true;
        for (let item in newVal) {
          mapVal = newVal[item] && mapVal;
          if (newVal[item]) {
            that.btnObjSet.obj2.btnDisabled = false;
          }
        }
        if (mapVal) {
          that.count = 0;
          that.amount = 0;
          for (let i in newVal) {
            that.count += that.formEle[i];
            that.amount += that.formEle[i] * that.multiplePrices[i];
          }
        } else {
          that.count = 0;
          that.amount = 0;
          if (that.isFirst) {
            // that.count = that.numTotal;
            // that.count1 = that.numTotal;
            // that.amount = that.amountTotal;
            // that.amount1 = that.amountTotal;
          } else {
            for (let j in newVal) {
              that.count += newVal[j] ? that.formEle[j] : 0;
              that.amount +=
                (newVal[j] ? that.formEle[j] : 0) * that.multiplePrices[j];
            }
          }
          that.isFirst = false;
        }
        that.isAllSelect.wdzt = mapVal;
        console.log("selectObjMap", mapVal);
      },
      deep: true
    },
    "isAllSelect.shsm": {
      handler(newVal, oldVal) {
        //送货上门
        let that = this;
        let mapVal = true;
        console.log("isAllSelect", newVal, oldVal);
        if (newVal) {
          that.btnObjSet.obj2.btnDisabled = false;
          that.count1 = 0;
          that.amount1 = 0;
          if (that.formEleProp.cell.list1.length < 1) {
            for (let item in that.selectObj.shsm) {
              that.formEle[item] = 0;
            }
          }
          for (let item1 in that.selectObj.shsm) {
            that.selectObj.shsm[item1] = that.selectObj.shsm[item1]
              ? that.selectObj.shsm[item1]
              : newVal;
            that.count1 += that.formEle[item1];
            that.amount1 += that.formEle[item1] * that.multiplePrices[item1];
          }
        } else {
          that.count1 = 0;
          that.amount1 = 0;
          for (let list in that.selectObj.shsm) {
            mapVal = that.selectObj.shsm[list] && mapVal;
          }
          if (!mapVal) {
            for (let it in that.selectObj.shsm) {
              that.selectObj.shsm[it] = that.selectObj.shsm[it]
                ? that.selectObj.shsm[it]
                : newVal;
              that.count1 += that.selectObj.shsm[it] ? that.formEle[it] : 0;
              that.amount1 +=
                (that.selectObj.shsm[it] ? that.formEle[it] : 0) *
                that.multiplePrices[it];
            }
          } else {
            for (let it in that.selectObj.shsm) {
              that.selectObj.shsm[it] = newVal;
              that.count1 += that.selectObj.shsm[it] ? that.formEle[it] : 0;
              that.amount1 +=
                (that.selectObj.shsm[it] ? that.formEle[it] : 0) *
                that.multiplePrices[it];
            }
          }
        }
      },
      deep: true
    },
    "isAllSelect.wdzt": {
      handler(newVal, oldVal) {
        //网点自提
        let that = this;
        let mapVal = true;
        console.log("isAllSelect", newVal, oldVal);
        if (newVal) {
          that.count = 0;
          that.amount = 0;
          if (that.formEleProp.cell.list.length < 1) {
            for (let item in that.selectObj.wdzt) {
              that.formEle[item] = 0;
            }
          }
          for (let item1 in that.selectObj.wdzt) {
            that.selectObj.wdzt[item1] = that.selectObj.wdzt[item1]
              ? that.selectObj.wdzt[item1]
              : newVal;
            that.count += that.formEle[item1];
            that.amount += that.formEle[item1] * that.multiplePrices[item1];
          }
        } else {
          that.count = 0;
          that.amount = 0;
          for (let list in that.selectObj.wdzt) {
            mapVal = that.selectObj.wdzt[list] && mapVal;
          }
          if (!mapVal) {
            for (let it in that.selectObj.wdzt) {
              that.selectObj.wdzt[it] = that.selectObj.wdzt[it]
                ? that.selectObj.wdzt[it]
                : newVal;
              that.count += that.selectObj.wdzt[it] ? that.formEle[it] : 0;
              that.amount +=
                (that.selectObj.wdzt[it] ? that.formEle[it] : 0) *
                that.multiplePrices[it];
            }
          } else {
            for (let it in that.selectObj.wdzt) {
              that.selectObj.wdzt[it] = newVal;
              that.count += that.selectObj.wdzt[it] ? that.formEle[it] : 0;
              that.amount +=
                (that.selectObj.wdzt[it] ? that.formEle[it] : 0) *
                that.multiplePrices[it];
            }
          }
        }
      },
      deep: true
    }
  },
  destroyed() {},
  methods: {
    onBeforeIndexChange(index) {
      let that = this;
      console.log("on-before-index-change", index);
      that.$vux.loading.show({
        text: "loading"
      });
      setTimeout(() => {
        that.$vux.loading.hide();
        that.formEle.tabIndex = index;
        console.log("tmpCartProductList1", that.tmpCartProductList);
        if (index == 0) {
          that.formEleProp.cell.list = that.tmpCartProductList.filter(val => {
            return val.receiptWayNo == "02";
          });
        } else {
          that.formEleProp.cell.list1 = that.tmpCartProductList.filter(val => {
            return val.receiptWayNo == "01";
          });
        }
      }, 500);
    },
    onItemClick(val, $e) {
      let that = this;
      // console.log("onItemClick", val);
      // console.log("tmpCartProductList2", that.tmpCartProductList);
      // if (val == 0) {
      //   that.formEleProp.cell.list = that.tmpCartProductList.filter(val => {
      //     return val.receiptWayNo == "01";
      //   });
      // } else {
      //   that.formEleProp.cell.list = that.tmpCartProductList.filter(val => {
      //     return val.receiptWayNo == "02";
      //   });
      // }
    },
    delete(val) {
      let that = this;
      console.log("delete", val);
      that.formEleProp.cell.list = that.formEleProp.cell.list.filter(item => {
        return item.id != val;
      });
      that.formEleProp.cell.list1 = that.formEleProp.cell.list1.filter(item => {
        return item.id != val;
      });
      that.count1 =
        that.count1 > 0
          ? that.count1 -
            (that.selectObj.shsm["ccbNumber_" + val]
              ? that.formEle["ccbNumber_" + val]
              : 0)
          : 0;
      that.count =
        that.count > 0
          ? that.count -
            (that.selectObj.wdzt["ccbNumber_" + val]
              ? that.formEle["ccbNumber_" + val]
              : 0)
          : 0;
      that.amount1 =
        that.amount1 > 0
          ? that.amount1 -
            (that.selectObj.shsm["ccbNumber_" + val]
              ? that.formEle["ccbNumber_" + val]
              : 0) *
              that.multiplePrices["ccbNumber_" + val]
          : 0;
      that.amount =
        that.amount > 0
          ? that.amount -
            (that.selectObj.wdzt["ccbNumber_" + val]
              ? that.formEle["ccbNumber_" + val]
              : 0) *
              that.multiplePrices["ccbNumber_" + val]
          : 0;
      if (that.formEleProp.cell.list1.length < 1) {
        that.isAllSelect.shsm = false;
        that.count1 = 0;
        that.amount1 = 0;
        console.log("999", that.formEleProp.cell.list1.length);
      } else if (that.formEleProp.cell.list1.length == 1) {
        that.isAllSelect.shsm = true;
        that.formEle["ccbNumber_" + val] = 0;
      }
      if (that.formEleProp.cell.list.length < 1) {
        that.isAllSelect.wdzt = false;
        that.count = 0;
        that.amount = 0;
        console.log("999", that.formEleProp.cell.list.length);
      } else if (that.formEleProp.cell.list.length == 1) {
        that.isAllSelect.wdzt = true;
        that.formEle["ccbNumber_" + val] = 0;
      }
    },
    onChangeNumberWdzt(val, $e) {
      let that = this;
      console.log("ccb-number-wdzt", val, $e);
      let list = that.$general.getCache("cartProductList")
        ? JSON.parse(that.$general.getCache("cartProductList"))
        : [];
      let id = $e.$el.id.split("_")[1];
      let obj11 = {},
        obj22 = {},
        obj33 = null;
      let list2 = [];
      list2 = list.reduce(function(item, next) {
        obj22[next.id] = (obj22[next.id] ? parseInt(obj22[next.id]) : 0) + 1;
        if (id == next.id) {
          obj33 = next;
        }
        obj11[next.id] ? "" : (obj11[next.id] = true && item.push(next));
        return item;
      }, []);
      console.log("id---wdzt", val, obj22[id]);
      if (val > obj22[id]) {
        if (obj33) {
          list.push(obj33);
        }
        obj22[id] = obj22[id] + 1;
      } else {
        obj22[id] = obj22[id] - 1;
        for (let i in list) {
          if (list[i].id == id) {
            list.splice(i, 1);
            break;
          }
        }
      }
      for (let it of list2) {
        it["singleNum"] = obj22[it.id];
      }

      that.tmpCartProductList = list2;
      // 网点自提
      that.wdztList = list2.filter(val => {
        return val.receiptWayNo == "02" && parseInt(val.singleNum) != 0;
      });

      that.formEleProp.cell.list = that.wdztList;
      //送货上门
      // that.formEleProp.cell.list1 = list2.filter(val => {
      //   return val.receiptWayNo == "01";
      // });
      that.$general.setCache("cartProductList", JSON.stringify(list));
      that.updateCartNumber({ result: list.length });
      that.$general.setCache("cartNumber", list.length);
    },
    onChangeNumberShsm(val, $e) {
      let that = this;
      console.log("ccb-number-shsm", val, $e);
      let list = that.$general.getCache("cartProductList")
        ? JSON.parse(that.$general.getCache("cartProductList"))
        : [];
      let id = $e.$el.id.split("_")[1];
      let obj11 = {},
        obj22 = {},
        obj33 = null;
      let list2 = [];
      list2 = list.reduce(function(item, next) {
        obj22[next.id] = (obj22[next.id] ? parseInt(obj22[next.id]) : 0) + 1;
        if (id == next.id) {
          obj33 = next;
        }
        obj11[next.id] ? "" : (obj11[next.id] = true && item.push(next));
        return item;
      }, []);
      console.log("id---shsm", val, obj22[id]);
      if (val > obj22[id]) {
        if (obj33) {
          list.push(obj33);
        }
        obj22[id] = obj22[id] + 1;
      } else {
        obj22[id] = obj22[id] - 1;
        for (let i in list) {
          if (list[i].id == id) {
            list.splice(i, 1);
            break;
          }
        }
      }
      for (let it of list2) {
        it["singleNum"] = obj22[it.id];
      }

      that.tmpCartProductList = list2;
      // 网点自提
      // that.formEleProp.cell.list = list2.filter(val => {
      //   return val.receiptWayNo == "02";
      // });
      //送货上门

      that.shsmList = list2.filter(val => {
        return val.receiptWayNo == "01" && parseInt(val.singleNum) != 0;
      });
      console.log("shsmList", that.shsmList);
      that.formEleProp.cell.list1 = that.shsmList;
      console.log("shsmList1", that.formEleProp.cell.list1);

      that.$general.setCache("cartProductList", JSON.stringify(list));
      that.updateCartNumber({ result: list.length });
      that.$general.setCache("cartNumber", list.length);
    },
    jieSuan() {
      let that = this;
      that.formEleProp.cell.tmplist = that.formEleProp.cell.list.filter(val => {
        return that.selectObj.wdzt["ccbNumber_" + val.id];
      });
      that.formEleProp.cell.tmplist1 = that.formEleProp.cell.list1.filter(
        val => {
          return that.selectObj.shsm["ccbNumber_" + val.id];
        }
      );
      console.log(
        "jieSuan",
        that.formEleProp.cell.tmplist,
        that.formEleProp.cell.tmplist1
      );
      that.$store.commit("updatePurchasingDetail", {
        obj: [
          ...that.formEleProp.cell.tmplist,
          ...that.formEleProp.cell.tmplist1
        ]
      });
      that.$general.setCache("tqWay", that.formEle.tabIndex);
      if (
        that.formEleProp.cell.tmplist.length &&
        !that.formEleProp.cell.tmplist1.length
      ) {
        that.$router.push({
          name: "buynow",
          query: {
            goTo: true
          }
        });
      }
      if (
        !that.formEleProp.cell.tmplist.length &&
        that.formEleProp.cell.tmplist1.length
      ) {
        that.$router.push({
          name: "buynow",
          query: {
            goTo: true
          }
        });
      }
      if (
        that.formEleProp.cell.tmplist.length &&
        that.formEleProp.cell.tmplist1.length
      ) {
        that.$vux.toast.show({
          type: "text",
          position: "middle",
          text: "请分别按网点自提或送货上门单独提交支付",
          width: "3rem"
        });
      }
      if (
        !that.formEleProp.cell.tmplist.length &&
        !that.formEleProp.cell.tmplist1.length
      ) {
        that.$vux.toast.show({
          type: "text",
          position: "middle",
          text: "请在网点自提或送货上门勾选商品，再进行购买结算",
          width: "3rem"
        });
      }
    },
    selectItemShsm(val) {
      console.log("selectItem", val);
      this.selectObj.shsm["ccbNumber_" + val] = !this.selectObj.shsm[
        "ccbNumber_" + val
      ];
      console.log("sel-shsm", this.selectObj.shsm);
    },
    selectItemWdzt(val) {
      console.log("selectItem", val);
      this.selectObj.wdzt["ccbNumber_" + val] = !this.selectObj.wdzt[
        "ccbNumber_" + val
      ];
      console.log("sel-wdzt", this.selectObj.wdzt);
    },
    ...mapMutations(["updateCartNumber"])
  },
  components: {
    "ccb-generic-form": () =>
      import("@/components/packages/genericForm/Index.vue"),
    "ccb-tab": () => import("@/components/packages/tab/Index.vue"),
    "ccb-checker-cell": () =>
      import("@/components/packages/genericForm/CcbCheckerCell.vue"),
    "ccb-number": () =>
      import("@/components/packages/genericForm/CcbNumber.vue"),
    "ccb-button": () =>
      import("@/components/packages/genericForm/CcbButton.vue"),
    "ccb-cell": () => import("@/components/packages/genericForm/CcbCell.vue"),
    Sticky
  }
};
</script>
<style lang="less" scoped>
.ccb-button.ccb-next {
  border-radius: 20px;
  border-width: 1px;
  line-height: 25px;
}
.ccb-jiesuan {
  background-color: #ffffff;
  padding: 30px 35px;
  .ccb-button {
    padding: 0 100px;
    border-width: 1px;
    width: 100%;
    display: block;
    border-radius: 30px;
    height: 50px;
    font-size: 18px;
    line-height: 50px;
  }
}
.ccb-cart {
  .weui-cells {
    &::after {
      height: 0 !important;
      border-bottom: 0 !important;
    }
  }
}
</style>

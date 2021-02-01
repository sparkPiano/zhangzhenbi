<!--
 * @Description: ccb-search
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-11-04 15:18:26
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-09 11:15:44
-->
<template>
  <div class="ccb-radio" v-if="radioObj != ''">
    <ul id="jquery_genr">
      <li
        v-for="(o, i) of radioObj.data"
        :key="i"
        :id="radioObj.default"
        :class="
          radioObj.default == o.key ? 'normalCss selectedCss' : 'normalCss'
        "
        @click="radioObj.changeRadio(o.key, o.value)"
      >
        {{ o.value }}
      </li>
    </ul>
  </div>
</template>
<script>
import { Cell } from "vux";
export default {
  name: "ccb-radio",
  data() {
    return {
      index: 1
    };
  },
  props: {
    radioObj: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    let that = this;
  },
  methods: {
    //只修改指定ul下的li列表
    changeColor2(obj) {
      console.log(obj);
      this.index = obj;
    }
  },
  components: {
    Cell
  }
};
</script>

<style lang="less" scope="scoped">
.ccb-radio {
  // display: block;
  // top: 80px;
  // left: 0px;
  // width: 100%;
  // height: 100%;
  // background: rgba(0, 0, 0, 0.5);
  // opacity: 1;
  // position: fixed;
  // z-index: 999;
  // color: black;
  font-size: 14px;
  background: #f4f8fb;
  position: relative;
  // padding-left: 70px;
  color: #2c3e50;
  .selectedCss {
    background-color: #3a66af;
    color: #ffffff;
  }

  .normalCss {
    padding: 0.1rem 0.15rem;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    // background-color: darkgreen;
    // font-family: "微软雅黑";
    // font-size: 120%;
    // color: aquamarine;
  }
}
</style>

<!--
 * @Description: ccb-datetime-view
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 16:02:37
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-10-28 15:31:36
-->
<template>
  <div class="ccb-datetime-view">
    <datetime-view
      ref="datetime"
      :format="formEleProp.datetimeViewFormat"
      v-model="formEle[formEleProp.datetimeViewSlotTitle]"
      v-if="!formEleProp.isShowPopup"
    ></datetime-view>
    <div v-transfer-dom v-else-if="formEleProp.isShowPopup">
      <popup v-model="showPopup">
        <datetime-view
          :format="formEleProp.datetimeViewFormat"
          v-model="formEle[formEleProp.datetimeViewSlotTitle]"
        ></datetime-view>
      </popup>
    </div>
  </div>
</template>

<script>
import { TransferDom, DatetimeView } from "vux";
export default {
  name: "ccb-datetime-view",
  directives: {
    TransferDom
  },
  props: {
    formEleProp: {
      type: Object,
      default: () => ({})
    },
    formEle: {
      type: Object,
      default: () => ({})
    },
    labelWidth: {
      type: String
    },
    labelAlign: {
      type: String
    },
    labelMarginRight: {
      type: String
    }
  },
  methods: {},
  components: {
    DatetimeView
  }
};
</script>
<style lang="less" scoped></style>

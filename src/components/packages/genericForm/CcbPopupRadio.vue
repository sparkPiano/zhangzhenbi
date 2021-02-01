<!--
 * @Description: ccb-popup-radio
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 16:04:11
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-10-28 15:30:56
-->
<template>
  <popup-radio
    :title="formEleProp.popupRadioTitle"
    :options="formEleProp.popupRadioOptions"
    :readonly="formEleProp.popupRadioReadonly"
    v-model="formEle[formEleProp.popupRadioSlotTitle]"
  >
    <span slot="popup-header" class="vux-1px-b x-popup-radio">
      <slot :name="formEleProp.popupRadioSlotTitle">
        {{ formEleProp.popupRadioSlotTitle }}
      </slot>
    </span>
    <template slot-scope="props" slot="each-item"
      ><!-- use scope="props" when vue < 2.5.0 -->
      <slot :name="formEleProp.popupRadioEachItem" v-bind:info="props">
        <p>
          {{ info.label }}
          <br />
          <span>{{ info.index }}</span>
        </p>
      </slot>
    </template>
  </popup-radio>
</template>

<script>
import { PopupRadio } from "vux";
export default {
  name: "ccb-popup-radio",
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
    PopupRadio
  }
};
</script>
<style lang="less" scoped></style>

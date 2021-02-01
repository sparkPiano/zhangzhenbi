<!--
 * @Description: ccb-check-list
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-27 16:00:48
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-13 20:23:23
-->
<template>
  <checklist
    :title="formEleProp.checklistTitle"
    :label-position="formEleProp.checklistLabelPos"
    :required="formEleProp.checklistRequired"
    :options="formEleProp.checklistOptions"
    :max="formEleProp.checklistMax"
    :min="formEleProp.checklistMin"
    :random-order="formEleProp.checklistRandomOrder"
    :check-disabled="formEleProp.checklistCheckDisabled"
    :disabled="formEleProp.checklistDisabled"
    @on-change="formEleProp.checklistChange"
    v-model="formEle[formEleProp.checklistSlotTitle]"
  ></checklist>
</template>
<script>
import { CheckList } from "vux";
export default {
  name: "ccb-check-list",
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
    CheckList
  }
};
</script>
<style lang="less" scoped></style>

<!--
 * @Description: ccb-form-preview
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-20 17:24:49
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-12 11:32:26
-->
<template>
  <card
    class="x-form-preview"
    :header="formCard.header"
    :footer="formCard.footer"
    @on-click-footer="formCard.clickFooter"
    @on-click-header="formCard.clickHeader"
  >
    <div slot="content" class="x-form-preview_card__content">
      <group
        :label-width="groupLabelWidth"
        :title="groupTitle"
        :title-color="groupTitleColor"
        :label-align="groupLabelAlign"
        :label-margin-right="groupLabelMarginRight"
        :gutter="groupGutter"
        v-if="isUseGroupStyle"
      >
        <group-title
          slot="title"
          v-show="!groupTitle && this.$slots.customGroupTitle"
          ><slot name="customGroupTitle"></slot
        ></group-title>
        <cell-form-preview
          :list="cellPreview.list"
          :border-intent="cellPreview.borderIntent"
        ></cell-form-preview>
      </group>
      <form-preview
        :header-label="normalPreview.headerLabel"
        :header-value="normalPreview.headerValue"
        :body-items="normalPreview.bodyItems"
        :footer-buttons="normalPreview.footerBtns"
        v-else
      ></form-preview>
    </div>
  </card>
</template>

<script>
import { Card, CellFormPreview, FormPreview, GroupTitle } from "vux";
export default {
  name: "ccb-form-preview",
  data() {
    return {};
  },
  props: {
    formCard: {
      type: Object,
      default: () => ({
        header: {},
        footer: {},
        clickFooter: () => {},
        clickHeader: () => {}
      })
    },
    cellPreview: {
      type: Object,
      default: () => ({
        borderIntent: true
      })
    },
    normalPreview: {
      type: Object,
      default: () => ({
        bodyItems: [],
        footerBtns: []
      })
    },
    isUseGroupStyle: {
      type: Boolean,
      default: true
    },
    groupTitle: {
      type: String
    },
    groupTitleColor: {
      type: String
    },
    groupLabelWidth: {
      type: String
    },
    groupLabelAlign: {
      type: String
    },
    groupLabelMarginRight: {
      type: String
    },
    groupGutter: {
      type: String
    }
  },
  mounted() {
    let that = this;
    console.log("Test", that);
  },
  methods: {},
  components: {
    Card,
    CellFormPreview,
    FormPreview,
    GroupTitle
  }
};
</script>
<style lang="less" scoped></style>

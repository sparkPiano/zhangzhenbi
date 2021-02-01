<template>
  <div class="ccb-address">
    <group
      v-for="(list, index) in formEleProp.addrLists"
      :key="index"
      :label-width="groupLabelWidth"
      :title="groupTitle"
      :title-color="groupTitleColor"
      :label-align="groupLabelAlign"
      :label-margin-right="groupLabelMarginRight"
      :gutter="groupGutter"
    >
      <div class="address-content">
        <flexbox>
          <flexbox-item :span="10">
            <flexbox orient="vertical">
              <flexbox
                ><flexbox-item :span="3">
                  <div class="flex-demo">
                    <div>{{ list.Cst_Nm }}</div>
                  </div> </flexbox-item
                ><flexbox-item :span="9">
                  <div class="flex-demo">
                    <div>{{ list.MblPh_No }}</div>
                  </div>
                </flexbox-item></flexbox
              >
              <flexbox class="flex-align-items">
                <flexbox-item :span="3">
                  <div class="flex-demo">
                    <div style="color:blue" v-if="list.Rsrv_Fld_1 === '1'">
                      [默认地址]
                    </div>
                  </div>
                </flexbox-item>
                <flexbox-item :span="9">
                  <div class="flex-demo">
                    <div>{{ list.Dtl_Adr }}</div>
                  </div>
                </flexbox-item>
              </flexbox>
            </flexbox>
          </flexbox-item>
          <flexbox-item
            ><div
              class="flex-right theme-color"
              @click="formEleProp.onEditAddr(list, index)"
            >
              {{ formEleProp.edit }}
            </div></flexbox-item
          >
        </flexbox>
      </div>
    </group>
  </div>
</template>
<script>
import { Group, Flexbox, FlexboxItem, XButton } from "vux";
export default {
  name: "ccb-address",
  data() {
    return {};
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
    btnObj: {
      type: Object,
      default: () => ({})
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
  methods: {},
  mounted() {},
  components: {
    Group,
    Flexbox,
    FlexboxItem,
    XButton
  }
};
</script>

<style lang="less" scope>
* {
  touch-action: pan-y;
}
.ccb-address {
  #app .router-view {
    background-color: #ffffff;
    height: 100%;
  }
  .address-content {
    margin: 10px 15px !important;
    font-size: 14px;
  }
  .flex-demo {
    color: #757575;
    text-align: left;
  }
  .flex-right {
    color: #3966ae;
    text-align: right;
  }
  .flex-align-items {
    align-items: flex-start !important;
    margin-top: 8px;
  }
  .custom-primary-color {
    font-size: 15px;
    border-radius: 99px !important;
    border-color: #3966ae !important;
    color: #3966ae !important;
    &:active {
      border-color: rgba(57, 102, 174, 0.6) !important;
      color: rgba(57, 102, 174, 0.6) !important;
      background-color: transparent;
    }
  }
  .theme-color {
    color: #3966ae;
  }
}
</style>

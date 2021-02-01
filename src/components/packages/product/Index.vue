<!--
 * @Description: ccb-production
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-14 15:08:15
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-12-11 12:17:48
-->
<template>
  <div class="x-soldProd">
    <group
      :label-width="groupLabelWidth"
      :title="groupTitle"
      :title-color="groupTitleColor"
      :label-align="groupLabelAlign"
      :label-margin-right="groupLabelMarginRight"
      :gutter="groupGutter"
    >
      <group-title slot="title" v-if="!groupTitle && !isShowAllProduct">
        <template v-if="!this.$slots.customGroupTitle"
          ><span class="x-sold-title_first">{{ formEleProp.leftText }}</span>
          <span class="x-sold-title_second">
            <span>{{ formEleProp.rightText }}</span>
            <span>
              <x-icon
                v-if="isShowArrow"
                type="ios-arrow-right"
                :size="arrowSize"
              ></x-icon>
            </span>
          </span>
        </template>
        <slot name="customGroupTitle"></slot
      ></group-title>
      <template v-if="!this.$slots.customProd">
        <scroller
          :lock-x="formEleProp.lockX"
          :lock-y="formEleProp.lockY"
          :height="formEleProp.height"
          :scrollbar-x="formEleProp.scrollbarX"
          :scrollbar-y="formEleProp.scrollbarY"
          :bounce="formEleProp.bounce"
          :use-pulldown="formEleProp.usePulldown"
          :use-pullup="formEleProp.usePullup"
          :pulldown-config="formEleProp.pulldownConfig"
          :pullup-config="formEleProp.pullupConfig"
          :scroll-bottom-offset="formEleProp.scrollBottomOffset"
          @on-scroll="formEleProp.onScroll"
          @on-scroll-bottom="formEleProp.onScrollBottom"
          @on-pulldown-loading="formEleProp.onPulldownLoading"
          @on-pullup-loading="formEleProp.onPullupLoading"
          :ref="formEleProp.scrollerBottomRef"
          v-model="formEle[formEleProp.prodSlotTitle]"
        >
          <div class="ccb-production_items" v-if="!this.$slots.scrollDiv">
            <flexbox
              :gutter="formEleProp.gutter"
              :orient="formEleProp.orient"
              :justify="formEleProp.justify"
              :align="formEleProp.align"
              :wrap="formEleProp.wrap"
              :direction="formEleProp.direction"
            >
              <template v-if="!this.$slots.flexboxItem">
                <flexbox-item
                  :span="formEleProp.span"
                  :order="formEleProp.order"
                  v-for="(list, index) in formEleProp.prodLists"
                  :key="index"
                  @click.native="formEleProp.showDetail(list)"
                >
                  <div class="ccb-production_show">
                    <div class="ccb-production_pic">
                      <img
                        :src="list.img"
                        alt=""
                        class="ccb-production_pic__img"
                      />
                    </div>
                    <div class="ccb-production_desc">
                      <span class="ccb-production_desc__title">{{
                        list.title
                      }}</span>
                      <span class="ccb-production_desc__price">{{
                        `${list.price}元/${list.unit}`
                      }}</span>
                      <span
                        class="ccb-production_desc__btn"
                        @click="formEleProp.addToCart(list, $event)"
                      >
                        <img :src="imageSrcBtn" alt="" />
                      </span>
                    </div>
                  </div>
                </flexbox-item>
              </template>
              <slot name="flexboxItem"></slot>
            </flexbox>
            <load-more
              :tip="formEleProp.loading"
              :show-loading="formEleProp.showLoading"
            ></load-more>
          </div>
          <slot name="scrollDiv"></slot>
        </scroller>
      </template>
      <slot name="customProd"></slot>
    </group>
  </div>
</template>

<script>
import imageSrc from "../../../assets/images/b1x.png";
import {
  Group,
  GroupTitle,
  Scroller,
  Flexbox,
  FlexboxItem,
  LoadMore,
  Icon
} from "vux";
export default {
  name: "ccb-product",
  data() {
    return {};
  },
  props: {
    isShowAllProduct: {
      type: Boolean,
      default: false
    },
    formEleProp: {
      type: Object,
      default: () => ({})
    },
    formEle: {
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
    },
    cellTitle: {
      type: String
    },
    cellValue: {
      type: String
    },
    cellInlineDesc: {
      type: String
    },
    cellLink: {
      type: [String, Object]
    },
    cellIsLink: {
      type: Boolean,
      default: false
    },
    cellPrimary: {
      type: String,
      default: "title"
    },
    cellIsLoading: {
      type: Boolean,
      default: false
    },
    cellValueAlign: {
      type: String,
      default: "left"
    },
    cellBorderIntent: {
      type: Boolean,
      default: true
    },
    cellArrowDirection: {
      type: String
    },
    cellDisabled: {
      type: Boolean
    },
    cellAlignItems: {
      type: String,
      default: "center"
    },
    isShowArrow: {
      type: Boolean,
      default: true
    },
    arrowSize: {
      type: String,
      default: "24"
    },
    imageSrcBtn: {
      type: String,
      default: imageSrc
    }
  },
  mounted() {
    if (this.formEleProp.scrollerBottomRef) {
      this.$nextTick(() => {
        this.$refs[this.formEleProp.scrollerBottomRef].reset({ top: 0 });
      });
    }
  },
  methods: {
    disablePullup() {
      console.log("disablePullup");
      this.$refs[this.formEleProp.scrollerBottomRef].disablePullup();
    }
  },
  components: {
    Group,
    GroupTitle,
    Scroller,
    Flexbox,
    FlexboxItem,
    LoadMore,
    Icon
  }
};
</script>

<style lang="less" scoped>
// .weui-cells__title {
//   font-size: 14px;
//   padding: 12px;
// }
// .weui-grid__icon {
//   border-radius: 50%;
// }

.vux-flexbox {
  flex-wrap: wrap;
  position: relative;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid#9a9a9a;
    color: #9a9a9a;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
  &::after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-left: 1px solid#9a9a9a;
    color: #9a9a9a;
    transform-origin: 0 0;
    transform: scaleX(0.5);
  }
  .vux-flexbox-item {
    position: relative;
    flex: 0 0 auto;
    min-width: auto;
    width: 50%;
    &::before {
      content: " ";
      position: absolute;
      right: 0;
      top: 0;
      width: 1px;
      bottom: 0;
      border-right: 1px solid#9a9a9a;
      color: #9a9a9a;
      transform-origin: 100% 0;
      transform: scaleX(0.5);
    }
    &::after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid#9a9a9a;
      color: #9a9a9a;
      transform-origin: 0 100%;
      transform: scaleY(0.5);
    }
  }
}
.ccb-production_items {
  .ccb-production_show {
    .ccb-production_pic__img {
      width: 100%;
      height: 100%;
    }
    .ccb-production_desc {
      padding: 0 10px;
      margin: 5px 10px;
      font-size: 14px;
      .ccb-production_desc__title,
      .ccb-production_desc__price {
        display: block;
        word-break: break-all;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .ccb-production_desc__price {
        color: #f00000;
        padding-top: 10px;
      }
      .ccb-production_desc__btn {
        width: 30px;
        height: 30px;
        display: block;
        position: absolute;
        right: 10px;
        bottom: 5px;
        z-index: 1000;
        img {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
}
</style>

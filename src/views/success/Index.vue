<!--
 * @Description: 成功
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-11-18 17:05:11
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-10-12 11:11:21
 * @FilePath: \ccbProject\ccb_5g\src\views\login\Index.vue
-->
<template>
  <div class="ccb-success">
    <div style="position: relative;height: 100%;">
      <div style="overflow: hidden;">
        <div
          style="line-height: 100px;height: 100px;background-color: #3A66AF;"
        >
          <span
            style="padding: 10px;height: 20px;line-height: 20px;float: right;font-size: 14px;color: #ffffff;"
            @click="complete()"
            >完成</span
          >
        </div>
        <div style="padding-bottom: 40px;text-align: center;">
          <div style="position: absolute;top: 0.6rem;width: 100%;">
            <span class="icon_success"></span>
          </div>
        </div>
        <div
          style="font-size:14px;line-height:24px;padding: 0px 14px;text-align: center;"
        >
          <span
            style="font-size: 22px;color: #3A66AF;height:64px;line-height:64px;display: inline-block;vertical-align: 25px;"
            >预约信息提交成功</span
          >
        </div>

        <div style="padding:0 30px;">
          <div class="line_style_d">
            <span class="line_text1_style">提取网点</span>
            <span class="line_text2_style">{{ dataObj.netName }}</span>
          </div>
          <div class="line_style_d">
            <span class="line_text1_style">预约日期</span>
            <span class="line_text2_style">{{ dataObj.appointTime }}</span>
          </div>
        </div>
        <!-- <div>
          <div style="padding: 14px 14px 6px 14px;font-size: 14px;color: #666;">温馨提示：</div>
          <ul class="tips">
            <li>您可在预约取款日期持有效身份证件及取款账户介质前往预约网点办理预约取款业务。</li>
            <li>如果您当日累计取款金额超过等值1万美元(含),请提前致电营业网点或95533,咨询需提供的具体证明材料。</li>
            <li>为节省您到柜面的业务办理时间,若您办理支取外币的账户为预约网点所在分行开立,可提前在线完成购汇操作。跨一级分行支取外币需支付手续费,详询预约网点。</li>
          </ul>
        </div> -->

        <div style="text-align: center;padding: 30px 0">
          <button class="btn" @click="complete()">预约记录查询</button>
          <button class="btn" @click="toDetail()">交易明细查询</button>
          <button class="btn" @click="toHome()">返回</button>
        </div>
      </div>
      <!-- <img :src="imageSrcBtn" alt="" /> -->
      <!-- <div class="bottom">
        <div>更多精彩</div>
        <div class="bottom_copyright"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mixin } from "../../mixins/mixin";
import imageSrc from "@/assets/images/logo.png";
export default {
  name: "ccb-success",
  data() {
    return {
      dataObj: {
        appointTime: "",
        netName: ""
      },
      type: "dots"
    };
  },
  mixins: [mixin],
  props: {
    imageSrcBtn: {
      type: String,
      default: imageSrc
    }
  },
  created() {
    let that = this;
    if (that.$route.params != {}) {
      let sucessData = that.$route.params;
      console.log("success", that.$route.params);
      that.dataObj.appointTime =
        (sucessData.appointTime + "").substring(0, 4) +
        "/" +
        (sucessData.appointTime + "").substring(4, 6) +
        "/" +
        (sucessData.appointTime + "").substring(6, 8);
      that.dataObj.netName = sucessData.netName;
    }
  },
  mounted() {},
  methods: {
    toDetail() {
      this.$router.replace({
        name: "detail"
      });
    },
    toHome() {
      this.$router.replace({
        name: "product"
      });
    },
    complete() {
      console.log("on complete");
      this.$router.replace({
        name: "record"
      });
    }
  },
  beforeDestroy() {},
  computed: {},
  watch: {},
  components: {}
};
</script>
<style lang="less" scoped>
.ccb-success {
  background-color: #ffffff !important;
  .bottom {
    // width: 100%;
    background-color: #f8f8f8;
    // margin: 20px;
    padding: 10px;
    /* position: absolute;
    bottom: 0 */
  }
  .bottom_copyright {
    // margin-top: 30px;
    // margin-bottom: 30px;
    font-size: 14px;
    color: #cccccc;
    text-align: center;
    display: inline-block;
  }
  .btn {
    border: 0.02rem solid #3a66af;
    border-radius: 0.5rem;
    margin-right: 0.1rem;
    padding: 0.05rem 0rem 0.06rem 0rem;
    text-align: center;
    color: #3a66af;
    font-size: 0.12rem;
    background: #ffffff;
    width: 100px;
  }
  .hideWord {
    text-align: center;
    margin: 10px 0px;
    color: #0ab6f2;
    width: 100%;
  }

  .line_style {
    height: 50px;
    border-bottom: 1px solid #f0f0f0;
  }
  .line_style_d {
    height: 45px;
    border-bottom: 0 none;
    border-bottom: 1px solid #cdcdcd !important;
  }

  .line_text1_style {
    padding: 0 20px 0 0;
    line-height: 50px;
    font-size: 14px;
    display: inline-block;
    width: 35%;
    box-sizing: border-box;
  }

  .line_text2_style {
    width: 65%;
    line-height: 50px;
    font-size: 14px;
    display: inline-block;
    width: 55%;
  }

  .icon_success {
    width: 80px;
    height: 80px;
    display: inline-block;
    background-image: url("~@/assets/images/sucIcon.png");
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  // .tips {
  //   padding: 0px 14px 0 0;
  // }
  // .tips > li {
  //   line-height: 22px;
  //   font-size: 13px;
  //   color: #a2a2a2;
  //   background-image: url("~@/assets/images/active1.png");
  //   background-position: 0 -2px;
  //   background-repeat: no-repeat;
  //   padding-left: 20px;
  // }
}
</style>

<!--
 * @Description: 登录验证
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-07-22 10:41:11
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-10-12 14:46:17
 * @FilePath: \ccbProject\ccb_5g\src\views\login\Index.vue
-->
<template>
  <div class="xnqui-error">
    <xnq-error
      :styleType="type"
      :headerStyle="headerStyle"
      :isSpinner="isSpinner"
    >
      <span slot="header" v-html="htmlStr"></span>
    </xnq-error>
  </div>
</template>

<script>
export default {
  name: "x-error",
  data() {
    return {
      htmlStr: `账单查询信息已过期，请重新发送账单查询进行登录`,
      type: "dots",
      headerStyle: "inline-block",
      isSpinner: true
    };
  },
  props: {},
  created() {},
  mounted() {
    let that = this;
  },
  methods: {},
  beforeDestroy() {},
  computed: {},
  watch: {},
  components: {
    "xnq-error": () => import("@/components/common/Error.vue")
  }
};
</script>
<style lang="less" scoped></style>

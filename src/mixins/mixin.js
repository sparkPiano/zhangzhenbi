/*
 * @Description: mixins
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-07-22 15:50:06
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-12-04 16:57:12
 * @FilePath: \ccbProject\ccb_5g\src\mixins\mixin.js
 */
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export const mixin = {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  updated() {},
  methods: {
    login() {
      let that = this;
      that.$xhr.post(
        "/CCBRCS/ccbsns/Login",
        {
          params: sessionStorage.getItem("half")
        },
        "login",
        response => {
          // eslint-disable-next-line no-empty
          console.log("response---", response);
          if (response.status >= 200 && response.status < 300) {
            if (
              response.data &&
              response.data.HEADER.retcode === "000000000000"
            ) {
              that.$store.commit("updateLogin", { login: true });
              console.log("response--token", response);
              sessionStorage.setItem("sunny", response.data.BODY.token);
              console.log("login", that.$store.state.login);
              that.$router.push({
                params: {
                  login: true
                },
                name: "billingdetails",
                path: "/billingdetails"
              });
            } else {
              that.$general.clearCache("param_a");
              that.$store.commit("updateLogin", { login: false });
              that.$vux.alert.show({
                title: "温馨提示",
                content: `状态码：${response.data.HEADER.retcode}，状态信息：${
                  response.data.HEADER.retmsg
                    ? response.data.HEADER.retmsg
                    : response.message
                    ? response.message
                    : "登录失败"
                }，重新发送账单查询。`,
                buttonText: "返回",
                onShow() {},
                onHide() {
                  that.$router.push({
                    path: "/error",
                    name: "error",
                    params: { login: false },
                    query: { hide: "hide-nav" }
                  });
                }
              });
            }
          } else {
            that.$general.clearCache("param_a");
            that.$store.commit("updateLogin", { login: false });
            that.$vux.alert.show({
              title: "温馨提示",
              content: `状态码：${response.data.HEADER.retcode}，状态信息：${
                response.data.HEADER.retmsg
                  ? response.data.HEADER.retmsg
                  : response.message
                  ? response.message
                  : "登录失败"
              }，重新发送账单查询。`,
              buttonText: "返回",
              onShow() {
                // eslint-disable-next-line no-console
                console.log("Plugin: I'm showing");
              },
              onHide() {
                // eslint-disable-next-line no-console
                console.log("Plugin: I'm hiding");
                that.$router.push({
                  path: "/error",
                  name: "error",
                  params: { login: false },
                  query: { hide: "hide-nav" }
                });
              }
            });
          }
        }
      );
    },
    goBack(name, n) {
      if (n != "" && n != null && n != undefined) {
        this.$router ? this.$router.go(n) : window.history.go(n);
      } else {
        this.$router.push({
          name: name
        });
      }
    }
  },
  components: {}
};

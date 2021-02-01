/*
 * @Description: router
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-05-25 15:35:21
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-12-04 11:56:03
 * @FilePath: \ccbProject\ccb_5g\src\router\router.js
 */

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Vue from "vue";
import Router from "vue-router";
import VueCookies from "vue-cookies";
import store from "../vuex/store";
import General from "@/utils/general";

Vue.use(Router);
Vue.use(VueCookies);
/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
const router = new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("../views/home/Home.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "首页",
        requireAuth: true,
        isShowTabbar: true,
        isShowHeader: true,
        name: ""
      }
    },
    {
      path: "/",
      meta: {
        title: "装帧普制币",
        name: ""
      },
      redirect: "/product"
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/Index.vue"),
      meta: {
        title: "登录",
        name: "",
        isShowHeader: false
      },
      query: { hide: "hide-nav" }
    },
    {
      path: "/apps",
      name: "apps",
      component: () => import("../views/apps/Applications.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "应用",
        requireAuth: true,
        isShowTabbar: true,
        isShowHeader: true,
        name: "返回"
      }
    },
    {
      path: "/product",
      name: "product",
      component: () => import("../views/product/Index.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "装帧普制币",
        requireAuth: true,
        isShowHeader: true,
        name: "装帧普制币"
      }
    },
    {
      path: "/allProduct",
      name: "allProduct",
      component: () => import("../views/product/AllProduct.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "装帧普制币",
        requireAuth: true,
        isShowHeader: true,
        name: "装帧普制币"
      }
    },
    {
      path: "/productDetail",
      name: "productDetail",
      component: () => import("../views/product/Detail.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "产品详情",
        requireAuth: true,
        isShowHeader: true,
        name: "产品详情"
      }
    },
    {
      path: "/shoppingCart",
      name: "shoppingCart",
      component: () => import("../views/product/ShoppingCart.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "购物车",
        requireAuth: true,
        isShowHeader: true,
        name: "购物车"
      }
    },
    {
      path: "/settlement",
      name: "settlement",
      component: () => import("../views/product/Settlement.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "装帧普制币",
        requireAuth: true,
        isShowHeader: true,
        name: "装帧普制币"
      }
    },
    {
      path: "/buynow",
      name: "buynow",
      component: () => import("../views/product/BuyNow.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "装帧普制币",
        requireAuth: true,
        isShowHeader: true,
        name: "装帧普制币"
      }
    },
    {
      path: "/payment",
      name: "payment",
      component: () => import("../views/product/Payment.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "支付",
        requireAuth: true,
        isShowHeader: true,
        name: "支付"
      }
    },
    {
      path: "/paymentDetail",
      name: "paymentDetail",
      component: () => import("../views/product/PaymentDetail.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "支付",
        requireAuth: true,
        isShowHeader: true,
        name: "支付"
      }
    },
    {
      path: "/paymentSuccess",
      name: "paymentSuccess",
      component: () => import("../views/product/PaymentSuccess.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "购买成功",
        requireAuth: true,
        isShowHeader: false,
        name: "购买成功"
      }
    },
    {
      path: "/productScreening",
      name: "productScreening",
      component: () => import("../views/product/ProductScreening.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "产品筛选",
        requireAuth: true,
        isShowHeader: true,
        name: "产品筛选"
      }
    },
    {
      path: "/error",
      name: "error",
      component: () => import("../views/error/Index.vue"),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        title: "错误页",
        isShowHeader: false,
        name: "错误页"
      },
      query: { hide: "hide-nav" }
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/test/Index.vue"),
      meta: {
        title: "测试",
        isShowHeader: true,
        name: "测试"
      }
    },
    {
      path: "/record",
      name: "record",
      component: () => import("../views/record/Index.vue"),
      meta: {
        title: "预约记录查询",
        isShowHeader: true,
        name: "预约记录查询"
      }
    },
    {
      path: "/detail",
      name: "detail",
      component: () => import("../views/detail/Index.vue"),
      meta: {
        title: "交易明细查询",
        isShowHeader: true,
        name: "交易明细查询"
      }
    },
    {
      path: "/itemDetail",
      name: "itemDetail",
      component: () => import("../views/itemDetail/Index.vue"),
      meta: {
        title: "交易详情",
        isShowHeader: true,
        name: "交易详情"
      }
    },
    {
      path: "/logisticsDetail",
      name: "logisticsDetail",
      component: () => import("../views/logisticsDetail/Index.vue"),
      meta: {
        title: "物流详情",
        isShowHeader: true,
        name: "物流详情"
      }
    },
    {
      path: "/appointment",
      name: "appointment",
      component: () => import("../views/appointment/Index.vue"),
      meta: {
        title: "预约记录查询",
        isShowHeader: true,
        name: "预约记录查询"
      }
    },
    {
      path: "/success",
      name: "success",
      component: () => import("../views/success/Index.vue"),
      meta: {
        title: "",
        isShowHeader: false,
        name: "成功页"
      }
    },
    {
      path: "/test1",
      name: "test1",
      component: () => import("../views/test/Index.vue"),
      meta: {
        title: "测试11111",
        isShowHeader: true,
        name: "测试11111"
      }
    },
    {
      path: "/netList",
      name: "netList",
      component: () => import("../views/net/Index.vue"),
      meta: {
        title: "提取网点查询",
        isShowHeader: true,
        name: "提取网点查询列表"
      }
    },
    {
      path: "/netDetail",
      name: "netDetail",
      component: () => import("../views/net/netDetail.vue"),
      meta: {
        title: "提取网点查询",
        isShowHeader: true,
        name: "提取网点查询详情"
      }
    },
    {
      path: "/netCalendar",
      name: "netCalendar",
      component: () => import("../views/net/netCalendar.vue"),
      meta: {
        title: "网点日历",
        isShowHeader: true,
        name: "网点日历"
      }
    },
    {
      path: "/address",
      name: "address",
      component: () => import("../views/address/Index.vue"),
      meta: {
        title: "收货地址",
        isShowHeader: true,
        name: "收货地址"
      }
    },
    {
      path: "/editAddress",
      name: "editAddress",
      component: () => import("../views/address/EditAddress.vue"),
      meta: {
        title: "修改收货地址",
        isShowHeader: true,
        name: "修改收货地址"
      }
    },
    {
      path: "/editAddress1",
      name: "editAddress1",
      component: () => import("../views/address/EditAddress1.vue"),
      meta: {
        title: "修改收货地址",
        isShowHeader: true,
        name: "修改收货地址"
      }
    }
  ]
});
const routeList = [];
router.beforeEach((to, from, next) => {
  console.log("ready to enter 1", to);
  console.log("ready to leave 1", from);
  console.log("href", to.fullPath);
  store.commit("updateEntryUrl", {
    entryUrl: to.fullPath
  });
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    console.log("router login 1", store.state.login);

    if (new Boolean(General.getCache("param_a")).valueOf()) {
      console.log(
        "router param_a",
        new Boolean(General.getCache("param_a")).valueOf()
      );
      store.commit("updateLogin", {
        login: new Boolean(General.getCache("param_a")).valueOf()
      });
    }
    if (store.state.login) {
      General.setCache("param_a", store.state.login);
      // 通过vuex state获取当前登录状态
      console.log("router login 2", store.state.login);
      next();
    } else {
      next(
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        {
          path: "/error",
          name: "error",
          query: { hide: "hide-nav" }
        }
      );
    }
  } else {
    //如果不需要正常跳转
    next();
  }
});
router.afterEach((to, from) => {
  //这里不接收next
  // store.dispatch("updateLoginAsync", store.state.login);
  console.log("ready to login", to.params.login, store.state.login);
  console.log("ready to enter", to);
  console.log("ready to leave", from);
});
router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  // eslint-disable-next-line no-unused-vars
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    //location.reload();
    //router.replace(targetPath);
  }
});
export default router;

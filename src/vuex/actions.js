/*
 * @Description: 操作异步方式更新state
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-05-25 15:35:40
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-11-26 17:49:25
 */
import * as api from "./api";
function NFcallback(res) {
  return res;
}
const actions = {
  updateBnk_Crd_TpCd({ commit }, updatedData) {
    commit({ type: "updateBnk_Crd_TpCd", updatedData });
  },
  getCardListAysnc({ commit }, cardList) {
    commit({ type: "getCardListSync", cardList });
  },
  updateLoadingTextAsync({ commit }, loadingText) {
    commit({ type: "updateLoadingTextSync", loadingText });
  },
  updateLoginAsync({ commit }, login) {
    commit({ type: "updateLogin", login });
  },

  updateProductDetailAsync({ commit }, obj) {
    commit({ type: "updateProductDetail", obj });
  },
  updatePurchasingDetailAsync({ commit }, obj) {
    commit({ type: "updatePurchasingDetail", obj });
  },

  getProductListAsync({ commit }, params) {
    const ret = api.getProductListAsync(params);
    ret
      .then(res => {
        console.log("2");
        commit({ type: "updateProductList", result: res });
      })
      .catch(err => {
        console.log("getProductListAsync");
      });
  },

  getNetListAsync({ commit }, params) {
    const ret = api.getNetListAsync(params);
    ret
      .then(res => {
        // console.log("GGGGGGGGGGGGG", res);
        commit({ type: "updateNetList", result: res });
      })
      .catch(err => {
        console.log("getNetListAsync");
      });
  },
  getNetDetailAsync({ commit }, params) {
    const ret = api.getNetDetailAsync(params);
    ret
      .then(res => {
        commit({ type: "updateNetDetail", result: res });
      })
      .catch(err => {
        console.log("getNetDetailAsync");
      });
  },
  //跑马灯
  reqiureRaceLamp({ commit }, params) {
    const asyncReqiureRaceLamp = async function() {
      try {
        let reZZB000 = await api.reqiureZZB000(params);
        let result = await api.reqiurePWHB04(reZZB000);
        commit({ type: "updateRaceLamp", result: result.messages });
      } catch (error) {
        console.log(error);
      }
    };
    asyncReqiureRaceLamp();
  },
  getBindUserInfoAsync({ commit }, params) {
    const ret = api.getBindUserInfoAsync(params);
    ret
      .then(res => {
        commit({ type: "updateUserInfo", result: res });
      })
      .catch(err => {
        console.log("getBindUserInfoAsync");
      });
  },
  getCacheProductListAsync({ commit }, params) {
    const ret = api.getCacheProductListAsync(params);
    ret
      .then(res => {
        commit({ type: "updateUserInfo", result: res });
      })
      .catch(err => {
        console.log("getCacheProductListAsync");
      });
  },
  getRecordListAsync({ commit }, params) {
    const ret = api.getRecordListAsync(params);
    ret
      .then(res => {
        commit({ type: "updateRecordList", result: res });
      })
      .catch(err => {
        commit({ type: "updateRecordError", result: err });
        console.log("getRecordListAsync");
      });
  },
  getRecordNetDetailAsync({ commit }, params) {
    const ret = api.getRecordNetDetailAsync(params);
    ret
      .then(res => {
        commit({ type: "updateRecordNetDetail", result: res });
      })
      .catch(err => {
        console.log("getRecordNetDetailAsync");
      });
  },
  getDetailListAsync({ commit }, params) {
    const ret = api.getDetailListAsync(params);
    ret
      .then(res => {
        commit({ type: "updateDetailList", result: res });
      })
      .catch(err => {
        commit({ type: "updateDetilError", result: err });
        console.log("getDetailListAsync");
      });
  },
  getItemDetailAsync({ commit }, params) {
    const ret = api.getItemDetailAsync(params);
    ret
      .then(res => {
        commit({ type: "updateItemDetail", result: res });
      })
      .catch(err => {
        console.log("getItemDetailAsync");
      });
  },
  // 收获地址
  requireZZB002({ commit }, params) {
    const asyncReqiureZZB002 = async function() {
      try {
        let result = await api.requireZZB002(params);
        commit({ type: "updateAstate", value: 4 });
        commit({ type: "updateZzb002", result: result });
      } catch (error) {
        console.log(error);
      }
    };
    asyncReqiureZZB002();
  },
  changeAppoDateAsync({ commit }, params) {
    const ret = api.changeAppoDateAsync(params);
    ret
      .then(res => {
        commit({ type: "changeAppoDate", result: res });
      })
      .catch(err => {
        console.log("changeAppoDateAsync");
      });
  },
  getEncryptAsync({ commit }, params) {
    const ret = api.getEncryptAsync(params);
    ret
      .then(res => {
        commit({ type: "encryptDa", result: res });
      })
      .catch(err => {
        console.log("getEncryptAsync");
      });
  },
  // 获取日历列表
  requireZZB012({ commit }, params) {
    const asyncRequireZZB012 = async function() {
      try {
        let result = await api.requireZZB012(params);
        commit({ type: "updateCardDate", result: result });
      } catch (err) {
        console.log(err);
      }
    };
    asyncRequireZZB012();
  },
  // 查询网点与自助渠道详情
  requireMH3004({ commit }, params) {
    const asyncRequire3004 = async function() {
      try {
        let result = await api.requireMH3004(params);
        commit({ type: "updateNetDetail3004", result: result });
      } catch (err) {
        console.log(err);
      }
    };
    asyncRequire3004();
  }
};

export default actions;

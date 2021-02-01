/*
 * @Description: axios请求数据
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-09-28 09:30:17
 * @LastEditors: Edison Lu
 * @LastEditTime: 2020-11-27 09:19:57
 */
import { EventBus } from "../utils/event-bus";
import Api from "../api/index";
import store from "../vuex/store";

export const getProductListAsync = obj => {
  return new Promise(function(resolve, reject) {
    console.log("3");
    EventBus.$xhr.post("/ccbsns/SNSService", obj, null, response => {
      const retCode = response.data.HEADER.retcode;
      if (retCode === "000000" || retCode === "000000000000") {
        console.log("4");
        resolve(response.data.BODY);
      } else {
        reject(response.data.HEADER);
      }
    });
  });
};

function getNearNetBankList(res) {
  return res;
}
//网点列表查询
export const getNetListAsync = obj => {
  return new Promise(function(resolve, reject) {
    // store.commit("updateLoadingStatus", { isLoading: true });
    Api.post("/ccbsns/SNSService", obj, null, response => {
      let data = response.data.BODY;
      resolve(eval(data));
      store.commit("updateLoadingStatus", { isLoading: false });
    });
  });
};
//网点详情查询
export const getNetDetailAsync = obj => {
  return new Promise(function(resolve, reject) {
    store.commit("updateLoadingStatus", { isLoading: true });
    Api.post("/ccbsns/SNSService", obj, null, response => {
      const retCode = response.header.retcode;
      if (retCode === "000000" || retCode === "000000000000") {
        resolve(response.body);
        store.commit("updateLoadingStatus", { isLoading: false });
      } else {
        reject(response.header);
        store.commit("updateLoadingStatus", { isLoading: false });
      }
    });
  });
};
//广播
export const reqiureZZB000 = obj => {
  return new Promise(function(resolve, reject) {
    store.commit("updateLoadingStatus", { isLoading: true });
    let aa = `[
      {
        "paramID": "${store.state.netPage.paramID1}",
        "paramKey": "${store.state.netPage.paramKey1}",
        "paramType": "${store.state.netPage.paramType1}"
      },
      {
        "paramID": "${store.state.netPage.paramID2}",
        "paramKey": "${store.state.netPage.paramKey2}",
        "paramType": "${store.state.netPage.paramType2}"
      }
    ]`;
    let bb = JSON.stringify(JSON.parse(aa));
    Api.post(
      "/ccbsns/SNSService",
      {
        TXCODE: "ZZB000",
        wParam: decodeURIComponent(store.state.userInfo.wParam),
        params: bb
      },
      null,
      response => {
        const retCode = response.data.HEADER.retcode;
        if (retCode === "000000" || retCode === "000000000000") {
          store.commit("updateRaceLampInfo", response.data.BODY);
          resolve(response.data.BODY);
          store.commit("updateLoadingStatus", { isLoading: false });
        } else {
          reject(response.data.HEADER);
          store.commit("updateLoadingStatus", { isLoading: false });
        }
      }
    );
  });
};

//广播
export const reqiurePWHB04 = obj => {
  return EventBus.$jsonp(
    obj.mh_common_hsh_request_mobile_uri_led.hsh_request_mobile_uri_led,
    {
      TXCODE: "PWHB04",
      ChanReqType: "YCW_JSONP",
      branch_code: "",
      callbackQuery: "callback",
      callbackName: "NFcallback"
    }
  );
};
export const getBindUserInfoAsync = obj => {
  return new Promise(function(resolve, reject) {
    EventBus.$xhr.post("/ccbsns/SNSService", obj, null, response => {
      const retCode = response.data.HEADER.retcode;
      if (retCode === "000000" || retCode === "000000000000") {
        resolve(response.data.BODY);
      } else {
        reject(response.data.HEADER);
      }
    });
  });
};

export const getCacheProductListAsync = obj => {
  return new Promise(function(resolve, reject) {
    EventBus.$xhr.post("/ccbsns/SNSService", obj, null, response => {
      const retCode = response.data.HEADER.retcode;
      if (retCode === "000000" || retCode === "000000000000") {
        resolve(response.data.BODY);
      } else {
        reject(response.data.HEADER);
      }
    });
  });
};
export const getRecordListAsync = obj => {
  return new Promise(function(resolve, reject) {
    // store.commit("updateLoadingStatus", { isLoading: true });
    Api.post(
      "/ccbsns/SNSService",
      obj,
      null,
      response => {
        const retCode = response.data.HEADER.retcode;
        if (retCode === "000000" || retCode === "000000000000") {
          resolve(response.data.BODY);
          // store.commit("updateLoadingStatus", { isLoading: false });
        } else {
          reject(response.data.HEADER);
          // store.commit("updateLoadingStatus", { isLoading: false });
        }
      },
      "show"
    );
  });
};
function getNetBankDetailCallback(res) {
  return res;
}
export const getRecordNetDetailAsync = obj => {
  return new Promise(function(resolve, reject) {
    Api.get("/ccbsns/SNSService", obj, null, response => {
      let data = response.data;
      console.log("getRecordNetDetailAsync data", eval(data));
      resolve(eval(data));
    });
  });
};

export const getDetailListAsync = obj => {
  return new Promise(function(resolve, reject) {
    Api.post(
      "/ccbsns/SNSService",
      obj,
      null,
      response => {
        const retCode = response.data.HEADER.retcode;
        if (retCode === "000000" || retCode === "000000000000") {
          resolve(response.data.BODY);
        } else {
          reject(response.data.HEADER);
        }
      },
      "show"
    );
  });
};
export const getItemDetailAsync = obj => {
  return new Promise(function(resolve, reject) {
    Api.post("/ccbsns/SNSService", obj, null, response => {
      const retCode = response.data.HEADER.retcode;
      if (retCode === "000000" || retCode === "000000000000") {
        resolve(response.data.BODY);
      } else {
        reject(response.data.HEADER);
      }
    });
  });
};
export const requireZZB002 = obj => {
  return new Promise(function(resolve, reject) {
    Api.post(
      "/ccbsns/SNSService",
      {
        TXCODE: "ZZB002",
        Ebnk_MsgRp_Fcn_No: store.state.address.Ebnk_MsgRp_Fcn_No,
        Cst_ID: obj ? obj.Cst_ID : "", //客户编号
        Seq_No: obj ? obj.Seq_No : "", //顺序号
        QRY_G: "",
        NEW_VALUE: obj ? obj.NEW_VALUE : "",
        Cst_Nm: obj ? obj.Cst_Nm : "", //客户名称
        MblPh_No: obj ? obj.MblPh_No : "", //手机号码
        Urbn_AtnmsDstc_Cd: obj ? obj.Urbn_AtnmsDstc_Cd : "", //城市自治州代码
        Prov_AtnmsRgon_Cd: obj ? obj.Prov_AtnmsRgon_Cd : "", //省自治区代码
        CntyAndDstc_Cd: obj ? obj.CntyAndDstc_Cd : "", //区县代码
        Dtl_Adr: obj ? obj.Dtl_Adr : "", //详细地址
        Rsrv_Fld_1: obj ? (obj.Rsrv_Fld_1 ? "1" : "0") : "", //默认地址
        wParam: decodeURIComponent(store.state.userInfo.wParam)
      },
      null,
      response => {
        const retCode = response.data.HEADER.retcode;
        if (retCode === "000000" || retCode === "000000000000") {
          resolve(response.data.BODY.LIST);
        } else {
          reject(response.data.HEADER);
        }
      }
    );
  });
};
export const changeAppoDateAsync = obj => {
  return new Promise(function(resolve, reject) {
    store.commit("updateLoadingStatus", { isLoading: true });
    Api.post("/ccbsns/SNSService", obj, null, response => {
      const retCode = response.data.HEADER.retcode;
      if (retCode === "000000" || retCode === "000000000000") {
        resolve(response.data.BODY);
        store.commit("updateLoadingStatus", { isLoading: false });
      } else {
        reject(response.data.HEADER);
        store.commit("updateLoadingStatus", { isLoading: false });
      }
    });
  });
};
export const getEncryptAsync = obj => {
  return new Promise(function(resolve, reject) {
    store.commit("updateLoadingStatus", { isLoading: true });
    Api.post("/ccbsns/SNSService", obj, null, response => {
      const retCode = response.data.HEADER.retcode;
      if (retCode === "000000" || retCode === "000000000000") {
        resolve(response.data.BODY);
        store.commit("updateLoadingStatus", { isLoading: false });
      } else {
        reject(response.data.HEADER);
        store.commit("updateLoadingStatus", { isLoading: false });
      }
    });
  });
};
// export const logisticsDetailAsync = obj => {
//   return new Promise(function(resolve, reject) {
//     store.commit("updateLoadingStatus", { isLoading: true });
//     Api.post("/ccbsns/SNSService", obj, null, response => {
//       const retCode = response.data.HEADER.retcode;
//       if (retCode === "000000" || retCode === "000000000000") {
//         resolve(response.data.BODY);
//         store.commit("updateLoadingStatus", { isLoading: false });
//       } else {
//         reject(response.data.HEADER);
//         store.commit("updateLoadingStatus", { isLoading: false });
//       }
//     });
//   });
// };
export const requireZZB012 = obj => {
  return new Promise(function(resolve, reject) {
    Api.post(
      "/ccbsns/SNSService",
      {
        TXCODE: "ZZB012",
        NET_ID: obj.netDcc,
        NET_NAME: obj.netName,
        wParam: decodeURIComponent(store.state.userInfo.wParam)
      },
      null,
      response => {
        const retCode = response.data.HEADER.retcode;
        if (retCode === "000000" || retCode === "000000000000") {
          resolve(response.data.BODY);
        } else {
          reject(response.data.HEADER);
        }
      }
    );
  });
};
export const requireMH3004 = obj => {
  return new Promise(function(resolve, reject) {
    Api.post(
      "/ccbsns/SNSService",
      {
        TXCODE: "MH3004",
        branchId: obj,
        wParam: decodeURIComponent(store.state.userInfo.wParam)
      },
      null,
      response => {
        resolve(eval(response.data));
      }
    );
  });
};

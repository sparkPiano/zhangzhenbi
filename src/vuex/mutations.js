/*
 * @Description: 操作同步方式更新state
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-05-25 15:35:40
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-12-10 15:11:58
 */
const mutations = {
  updateRetPage(state, payload) {
    state.retPage = payload.result;
  },
  updateQueryCondition(state, payload) {
    state.queryCondition = payload.result;
  },
  updateWParam(state, payload) {
    state.wParam = payload.result;
  },
  UPDATE_LOADING(state, status) {
    state.isLoading = status;
  },
  UPDATE_DIRECTION(state, direction) {
    state.direction = direction;
  },
  updateBnk_Crd_TpCd(state, payload) {
    state.bankType = payload.updatedData;
  },
  getCardListSync(state, payload) {
    state.cardList = payload.cardList;
  },
  updateLoadingTextSync(state, payload) {
    state.loadingText = payload.loadingText;
  },
  updateLogin(state, payload) {
    state.login = payload.login;
  },
  updateEntryUrl(state, payload) {
    state.entryUrl = payload.entryUrl;
  },
  updateProductDetail(state, payload) {
    state.productDetail = payload.obj;
  },
  updatePurchasingDetail(state, payload) {
    state.purchasingDetail = payload.obj;
  },
  updateProductList(state, payload) {
    state.productList = payload.result;
    state.cacheProductList = payload.result.GRP;
  },
  updateNetList(state, payload) {
    state.netList = payload.result;
  },
  updateNetDetail(state, payload) {
    state.netDetail = payload.result;
  },
  dealRaceLampPrams(state, res) {
    state.netPage = { ...state.netPage, ...res };
  },
  updateUserInfo(state, payload) {
    state.userInfo = payload.result;
  },
  updateCacheProductList(state, payload) {
    state.cacheProductList = payload.result.GRP;
  },
  updateRecordList(state, payload) {
    state.recordList = payload.result;
  },
  updateRecordNetDetail(state, payload) {
    state.recordNetDetail = payload.result;
  },
  updateDetailList(state, payload) {
    state.detailList = payload.result;
  },
  updateItemDetail(state, payload) {
    state.itemDetail = payload.result;
  },
  updateRaceLamp(state, res) {
    let resArr = res.result;
    state.netPage.raceLampList = resArr;
  },
  updateRaceLampInfo(state, res) {
    state.netPage.net_notice_switch =
      res.mh_common_net_notice_switch.net_notice_switch;
  },
  updateShowType(state, res) {
    state.netPage.showType = res.value;
  },
  updateNetDetailCom(state, res) {
    state.netPage.netDetailCom = res.value;
  },
  updateLocaListState(state, res) {
    state.netPage.showLocationList = res.value;
  },
  changeAppoDate(state, payload) {
    state.appoDate = payload.result;
  },
  updateCartNumber(state, payload) {
    state.cartNumber = payload.result;
  },
  updateRecordError(state, payload) {
    state.recordError = payload.result;
  },
  updateDetilError(state, payload) {
    state.detilError = payload.result;
  },
  itemDeParam(state, payload) {
    state.itemDeParam = payload;
  },
  encryptDa(state, payload) {
    state.encryptDa = payload;
  },
  updateCardDate(state, payload) {
    state.netPage.riliList = payload.result;
  },
  updateNetDetail3004(state, payload) {
    state.netPage.queryNetDetailData = payload.result;
  },
  updateZzb002(state, payload) {
    state.address.addressList = payload.result;
  },
  updateAstate(state, payload) {
    state.address.Ebnk_MsgRp_Fcn_No = payload.value;
  },
  updateTypeIndex(state, payload) {
    state.address.typeIndex = payload.value;
  }
};
export default mutations;

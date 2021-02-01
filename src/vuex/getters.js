/*
 * @Description: 用于共享函数操作更新state
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-05-25 15:35:40
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-11-12 10:40:52
 * @FilePath: \ccbProject\ccb_5g\src\vuex\getters.js
 */
const getters = {
  // eslint-disable-next-line no-unused-vars
  getCardList: (state, getters) => {
    return state.cardList;
  },
  getNetList: (state, getters) => {
    return state.netList;
  },
  getRaceLampLight: (state, getters) => {
    return state.netPage.raceLampList;
  },
  getriliList: (state, getters) => {
    return state.netPage.riliList;
  },
  getNetDetail3004: (state, getters) => {
    return state.netPage.queryNetDetailData;
  },
  getAddressZzb002: (state, getters) => {
    return state.address.addressList;
  }
};

export default getters;

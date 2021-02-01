/*
 * @Description: 存储共享状态数据
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-05-25 15:35:40
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-12-08 10:23:38
 * @FilePath: \ccbProject\ccb_5g\src\vuex\state.js
 */

const state = {
  retPage: "",
  queryCondition: {},
  cartNumber: 0,
  wParam:
    "u6k9h1o4k9KkL5WVqje%2B2Yo4dpxiV0CZrsouBlmscl0oeaHV%2B3n9zm20ToDig%2F17ceHYzARxYZQ4FCZrOzQyk4gkbvKUAD3H1HHVkdSck5Legq3iUsN5DhVD%2F4gw7wUsawp7XxxSZ9Bek0Ad5dlNMlH1BfzghVFWIY5m0uF8Gt3WRWNRFMfW6YhYOlzwopWtYEQLesa08DS4K704XqEjQaPRAFZ0E3i2xi0Rug91aIOJYZQAN7DFVvf%2BccVDxzxmXCAqoJT4zW0xdnhib1DIgzcC%2BEKZ9vhn1GoGkyNbYzyMJVgduchMyy44jbWSXUpN%2FOMeRME4KNdYrU6VnvhYGX8RAmJ7y8%2BCMCGV8f0xfIfA7v%2BQZOPiTMrNSJ%2FFthaQFOXc2bqrhzEh7Cj2N6tVxzLXySkac6hUsU8aoZDx9pnEY5fXVtOkPGsCpOc34T74jd9X8uEph0mMVihmaVK3jZKK5xq805ErP1WFunHGBTKhFCr4CIf%2F4dRLTpCpeP92oNaQU%2FI4YCaEr4nML9bCKTBy%2FQrUc59P0zpF0ur4FrGdWqRp2QVc7zKbxsHWa32LgaGKmE9cW1Y9SbCZGkI0bi4dPY4ZRSjqQc5uhq0kZSIZ054XaLOhK5MChIluQ5Sq", //装帧币入口wParam
  isLoading: false,
  direction: "forward",
  bankType: [],
  cardList: [],
  loadingText: "加载中...",
  entryUrl: document.location.href,
  login: true,
  productDetail: [],
  purchasingDetail: [],
  netList: [],
  netDetail: [],
  netPage: {
    wParam: "",
    paramID1: "",
    paramKey1: "",
    paramType1: "",
    paramID2: "",
    paramKey2: "",
    paramType2: "",
    paramID3: "",
    paramKey3: "",
    paramType3: "",
    raceLampList: [],
    showType: "1", //showType控制网点地图和网点列表(ps 1是展示网点地图 2是展示网点列表)
    netDetailCom: true, // netDetailCom控制网点主页底部的详情框框(ps true是展示 false是隐藏)
    showLocationList: false,
    riliList: [],
    queryNetDetailData: [],
    net_notice_switch: null
  },
  //收获地址
  address: {
    Ebnk_MsgRp_Fcn_No: 4, //1、新增 2、删除 3、修改 4、查询
    addressList: [],
    typeIndex: 0 //删除的下标
  },
  productList: {},
  userInfo: {},
  cacheProductList: [],
  recordList: [],
  recordNetDetail: [],
  detailList: [],
  itemDetail: [],
  appoDate: [],
  recordError: [],
  detilError: [],
  itemDeParam: "",
  encryptDa: {}
};
export default state;

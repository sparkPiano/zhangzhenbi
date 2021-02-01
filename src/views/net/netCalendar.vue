<template>
  <div class="ccb-net-calendar calendarPag">
    <ccb-inline-calendar
      :formEleProp="formEleProp.inlineCalendar"
      :formEle="formEle"
    ></ccb-inline-calendar>
    <div class=" border-bottom"></div>
    <div class="netInfo">
      <flexbox>
        <flexbox-item :span="8"
          ><div class="flex-left">
            {{ netName }}
          </div></flexbox-item
        >
        <flexbox-item
          ><div class="flex-right">
            {{ date_md }}{{ date_day }}
          </div></flexbox-item
        >
      </flexbox>

      <flexbox>
        <flexbox-item
          ><div class="flex-left">
            对私营业时间
          </div></flexbox-item
        >
        <flexbox-item
          ><div class="flex-right">{{ only_prvt }}</div></flexbox-item
        >
      </flexbox>
      <flexbox>
        <flexbox-item
          ><div class="flex-left">
            对公营业时间
          </div></flexbox-item
        >
        <flexbox-item :span="8"
          ><div class="flex-right">
            {{ only_crop }}
          </div></flexbox-item
        >
      </flexbox>
    </div>
    <ccb-tips :header="header">
      <template slot="xContent">
        <div class="ccb-tips_content">
          <ul>
            <li>
              网点营业时间存在动态调整，请以提前一个工作日查询次日营业时间的结果为准。网点日历最多可查询
            </li>
          </ul>
        </div>
      </template>
    </ccb-tips>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { Flexbox, FlexboxItem } from "vux";
function getResult(val) {
  let rs = [];
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    });
  }
  return rs;
}
export default {
  name: "netList",
  data() {
    return {
      date_md: "",
      date_day: "",
      only_prvt: "",
      only_crop: "",
      formEleProp: {
        inlineCalendar: {
          calendarRef: "calendar",
          show: true,
          renderMonth: [],
          startDate: "2020-11-01",
          endDate: "2020-12-31",
          range: true,
          showLastMonth: false,
          showNextMonth: false,
          highlightWeekend: false,
          return6Rows: false,
          hideHeader: false,
          hideWeekList: false,
          replaceTextList: {},
          weeksList: [],
          buildSlotFn: this.buildSlotFn,
          valueChange: true,
          disablePast: false,
          disableFuture: false,
          marks: [],
          disableWeekend: false,
          disableDateFunction: this.disableDateFunction,
          calendarSlotTitle: "inlineCalendar",
          onChange: this.onChangeInlineCalendar,
          onViewChange: this.onViewChange,
          selectSingleDate: this.selectSingleDate
        }
      },
      formEle: {
        searchVal: "",
        production: null,
        masker: null,
        ccbInput: "",
        textarea1: "",
        addressVal: [],
        inlineCalendar: null
      },
      header: {
        title: "温馨提示"
      }
    };
  },
  watch: {
    // getXurrriliList() {
    //   console.log("日历数据", this.getXurrriliList);
    //   // console.log("ddddddddzz", that.calendarInfo);
    // }
  },
  created() {
    let that = this;
    // that.requireZZB012();
    that.getNetCalendarList(); //获取网点日历
  },
  mounted() {
    console.log("formEleProp", this.formEleProp);
    console.log("日历page", this.$route.params.detail);
  },
  updated() {},
  computed: {
    // ...mapGetters({
    //   getXurrriliList: "getriliList"
    // })
  },
  methods: {
    // requireZZB012() {
    //   this.$store.dispatch(
    //     "requireZZB012",
    //     JSON.parse(this.$route.query.detail)
    //   );
    // },
    onChangeInlineCalendar(val) {
      console.log("start1", val);
      //点击单个日期
      let currDate = "";
      let that = this;
      if (!val) {
        //今天 刚进页面时，日期处理
        val = that.info.oneTime;
        currDate =
          val.substr(0, 4) + "/" + val.substr(4, 2) + "/" + val.substr(6, 2);
      } else {
        currDate = val.replaceAll("-", "/");
      }
      console.log("start2", val);

      console.log("start3", currDate);
      let date = new Date(currDate);
      console.log("start4", date);
      that.date_md = date.getMonth() + 1 + "月" + date.getDate() + "日";
      that.date_day = " 周" + that.getWeekCn(date.getDay());
      that.calendarInfo.forEach(item => {
        let yOprgDay_Prd = item.OprgDay_Prd;
        let itemDate =
          yOprgDay_Prd.substr(0, 4) +
          "/" +
          yOprgDay_Prd.substr(4, 2) +
          "/" +
          yOprgDay_Prd.substr(6, 2);
        console.log("itemDate:", itemDate);
        console.log("val:", val);
        if (itemDate == currDate) {
          // 对私营业时间显示
          that.only_prvt = that.getPrivateTime(item);
          that.only_crop = that.getPublicTime(item);
        }
      });
    },
    onViewChange(val, index) {
      console.log("onViewChange val:", val);
      console.log("onViewChange index", index);
      // this.useCustomFn(val);
    },
    selectSingleDate(currentValue) {
      console.log("selectSingleDate", currentValue);
    },
    disableDateFunction(date) {
      // console.log("disableDateFunction", date);
      let startMonth = Number(this.calendarInfo[0].month) + 1;
      let startDate =
        this.calendarInfo[0].year +
        "-" +
        startMonth +
        "-" +
        this.calendarInfo[0].day;
      let endMonth =
        Number(this.calendarInfo[this.calendarInfo.length - 1].month) + 1;
      let endDate =
        this.calendarInfo[this.calendarInfo.length - 1].year +
        "-" +
        endMonth +
        "-" +
        this.calendarInfo[this.calendarInfo.length - 1].day;
      if (
        date.formatedDate <
          this.$general.formatTime(new Date(startDate), "yyyy-MM-dd") ||
        date.formatedDate >
          this.$general.formatTime(new Date(endDate), "yyyy-MM-dd")
      ) {
        return true;
      }
    },
    buildSlotFn(line, index, data) {
      console.log("buildSlotFn", data);
      this.calendarInfo.forEach(item => {
        if (
          data.year == item.year &&
          data.month == item.month &&
          data.day == item.day
        ) {
          data.type = item.type;
        }
      });
      if (data.type == "2") {
        console.log("2222222222");
        return '<div style="font-size:12px;text-align:center;color:#444444">仅对私</div>';
      } else if (data.type == "3") {
        console.log("33333333333333333333");
        return '<div style="position: absolute;background: red;padding: 1px 4px;right: 0px;top: -10px;font-size:10px;text-align:center;color:#ffffff">休</div><div style="height:19px;"></div>';
      } else {
        return '<div style="height:19px;"></div>';
      }

      // ? '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:red;border-radius:50%;">仅对私</span></div>'
      // ? '<div style="font-size:12px;text-align:center;color:#444444">仅对私</div>'
      // return /0|6/.test(data.weekDay)
      //   ? '<div style="position: absolute;background: red;padding: 1px 4px;right: 0px;top: 0;font-size:10px;text-align:center;color:#ffffff">休</div>'
      //   : '<div style="height:19px;"></div>';
    },
    getNetCalendarList() {
      //调接口获取网点日历列表信息
      let that = this;
      // let date = {
      //   net_name: "北京东方广场支行营业部",
      //   contractInfo: {
      //     oneTime: "2020-11-17",
      //     count: "2",
      //     calendarInfo: [
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "10",
      //         year: "2020",
      //         day: "17"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "10",
      //         year: "2020",
      //         day: "18"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "10",
      //         year: "2020",
      //         day: "19"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "10",
      //         year: "2020",
      //         day: "20"
      //       },
      //       {
      //         corp_am: "00:00-00:00",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "2",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "00:00-00:00",
      //         prvt: "09:04-16:45",
      //         month: "10",
      //         year: "2020",
      //         day: "21"
      //       },
      //       {
      //         corp_am: "00:00-00:00",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "3",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "00:00-00:00",
      //         prvt: "09:04-16:45",
      //         month: "10",
      //         year: "2020",
      //         day: "22"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "10",
      //         year: "2020",
      //         day: "23"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "10",
      //         year: "2020",
      //         day: "24"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "10",
      //         year: "2020",
      //         day: "25"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "10",
      //         year: "2020",
      //         day: "26"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "10",
      //         year: "2020",
      //         day: "27"
      //       },
      //       {
      //         corp_am: "00:00-00:00",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "2",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "00:00-00:00",
      //         prvt: "09:04-16:45",
      //         month: "10",
      //         year: "2020",
      //         day: "28"
      //       },
      //       {
      //         corp_am: "00:00-00:00",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "3",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "00:00-00:00",
      //         prvt: "09:04-16:45",
      //         month: "10",
      //         year: "2020",
      //         day: "29"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "10",
      //         year: "2020",
      //         day: "30"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "11",
      //         year: "2020",
      //         day: "1"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "11",
      //         year: "2020",
      //         day: "2"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "11",
      //         year: "2020",
      //         day: "3"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "11",
      //         year: "2020",
      //         day: "4"
      //       },
      //       {
      //         corp_am: "00:00-00:00",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "2",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "00:00-00:00",
      //         prvt: "09:04-16:45",
      //         month: "11",
      //         year: "2020",
      //         day: "5"
      //       },
      //       {
      //         corp_am: "00:00-00:00",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "3",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "00:00-00:00",
      //         prvt: "09:04-16:45",
      //         month: "11",
      //         year: "2020",
      //         day: "6"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "11",
      //         year: "2020",
      //         day: "7"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "11",
      //         year: "2020",
      //         day: "8"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "11",
      //         year: "2020",
      //         day: "9"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "11",
      //         year: "2020",
      //         day: "10"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "11",
      //         year: "2020",
      //         day: "11"
      //       },
      //       {
      //         corp_am: "00:00-00:00",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "2",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "00:00-00:00",
      //         prvt: "09:04-16:45",
      //         month: "11",
      //         year: "2020",
      //         day: "12"
      //       },
      //       {
      //         corp_am: "00:00-00:00",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "3",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "00:00-00:00",
      //         prvt: "09:04-16:45",
      //         month: "11",
      //         year: "2020",
      //         day: "13"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "11",
      //         year: "2020",
      //         day: "14"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "11",
      //         year: "2020",
      //         day: "15"
      //       },
      //       {
      //         corp_am: "09:04-11:48",
      //         prvt_rst_sttm: "",
      //         net_name: "北京东方广场支行营业部",
      //         prvt_oprg_sttm: "09:04",
      //         prvt_rst_edtm: "",
      //         type: "1",
      //         net_id: "110605900",
      //         prvt_oprg_edtm: "16:45",
      //         corp_pm: "14:30-16:45",
      //         prvt: "09:04-16:45",
      //         month: "11",
      //         year: "2020",
      //         day: "16"
      //       }
      //     ],
      //     twoTime: "2020-12-01"
      //   }
      // };
      let date = this.$route.params.detail;
      console.log("FFFFFFFFFFFFFFFFFFFFF", this.$route.params.detail);
      that.info = date.contractInfo;
      that.netName = date.net_name;
      that.curDate = that.info.oneTime;
      that.nextDate = that.info.twoTime;
      that.count = that.info.count; //1 显示一个月 2 显示两个月
      that.calendarInfo = that.info.calendarInfo;
      console.log("that.calendarInfo", that.calendarInfo);
    },
    getWeekCn(day) {
      if (day == "1") {
        return "一";
      } else if (day == "2") {
        return "二";
      } else if (day == "3") {
        return "三";
      } else if (day == "4") {
        return "四";
      } else if (day == "5") {
        return "五";
      } else if (day == "6") {
        return "六";
      } else if (day == "0") {
        return "日";
      }
    },
    getPrivateTime(info) {
      //处理对私营业时间
      let that = this;
      if (info) {
        //对私营业开始时间 和 结束时间有效
        if (
          that.isTimeAvalibel(info.prvt_oprg_sttm) &&
          that.isTimeAvalibel(info.prvt_oprg_edtm)
        ) {
          //对私休息开始时间 和 结束时间有效
          if (
            that.isTimeAvalibel(info.prvt_rst_sttm) &&
            that.isTimeAvalibel(info.prvt_rst_edtm)
          ) {
            //休息时间在营业时间范围内
            if (
              info.prvt_oprg_sttm.replace(":", "") <=
                info.prvt_rst_sttm.replace(":", "") &&
              info.prvt_rst_edtm.replace(":", "") <=
                info.prvt_oprg_edtm.replace(":", "")
            ) {
              return (
                info.prvt_oprg_sttm +
                "-" +
                info.prvt_rst_sttm +
                "、" +
                info.prvt_rst_edtm +
                "-" +
                info.prvt_oprg_edtm
              );
            } else {
              return info.prvt_oprg_sttm + "-" + info.prvt_oprg_edtm;
            }
          } else {
            return info.prvt_oprg_sttm + "-" + info.prvt_oprg_edtm;
          }
        }
      }
      return "休息";
    },
    getPublicTime(info) {
      //处理对公营业时间
      let that = this;
      if (info) {
        if (that.isRestCropAm(info)) {
          //上午休息
          if (that.isRestCropPm(info)) {
            //下午休息
            return "休息";
          } else {
            //下午营业
            return "休息、" + info.corp_pm;
          }
        } else {
          //上午营业
          if (that.isRestCropPm(info)) {
            //下午休息
            return info.corp_am + "、休息";
          } else {
            //下午营业
            return info.corp_am + "、" + info.corp_pm;
          }
        }
      }
      return "休息";
    },
    isTimeAvalibel(timeStr) {
      let regTime = new RegExp("^\\d{2}:\\d{2}$");
      if (timeStr) {
        return timeStr != "00:00" && regTime.exec(timeStr);
      }
      return false;
    },
    /*
     *	对公上午是否休息状态
     */
    isRestCropAm(info) {
      if (info.corp_am == "00:00-00:00") {
        return true;
      } else {
        return false;
      }
    },
    /*
     *	对公下午是否休息状态
     */
    isRestCropPm(info) {
      if (info.corp_pm == "00:00-00:00") {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    "ccb-inline-calendar": () =>
      import("@/components/packages/genericForm/CcbInlineCalendar.vue"),
    "ccb-tips": () => import("@/components/packages/tips/Index.vue"),
    Flexbox,
    FlexboxItem
  },
  destroyed() {}
};
</script>
<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
#app .router-view {
  background-color: #ffffff !important;
}
#app .weui-panel {
  background-color: #f0f0f0 !important;
  .weui-panel__hd:after {
    border-bottom: none !important;
  }
}
.weui-cells:after {
  border-bottom: none !important;
}
.ccb-net-calendar {
  .inline-calendar td.current > span.vux-calendar-each-date {
    background: #2863b1 !important;
  }
  .inline-calendar td.is-today,
  .inline-calendar td.is-today.is-disabled {
    color: #2863b1 !important;
  }
  .border-bottom {
    border-bottom: 10px solid #f0f0f0;
  }
  .netInfo {
    padding: 10px 15px;
    background: #ffffff;
    font-size: 14px;
    .flex-left {
      text-align: left;
    }
    .flex-center {
      text-align: center;
    }
    .flex-right {
      text-align: right;
    }
    .vux-flex-row {
      line-height: 30px;
    }
  }

  .ccb-tips_content {
    ul {
      list-style: none;
    }
  }
}
</style>
<style>
/* .ccb-net-calendar.calendarPag */
.calendarPag {
  height: 100%;
  background-color: #f0f0f0 !important;
}
</style>

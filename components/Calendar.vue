<template>
  <div class="container">
    <div class="header">
      <span class="array array-left" @click="prevMonth"></span>
      <span class="date">{{monthLabel}}</span>
      <span class="array array-right" @click="nextMonth"></span>
    </div>
    <div class="calendar-wrapper">
      <div class="label-days">
        <span v-for="name in dayNames" class="label-day">{{name}}</span>
      </div>
      <div v-for="week in weeks" class="calendar-row">
        <template v-for="n in 7">
          <span class="calendar-day not-in-month in-prev-month" v-if="week === 1 && n <= firstDay"></span>
          <span class="calendar-day not-in-month in-next-month" v-else-if="week === weeks && ((week-1)*7+n-firstDay) > lastDate"></span>
          <span class="calendar-day in-month" v-else>
            <span v-if="dayLabelFormatter" v-html="dayLabelFormatter((week-1)*7+n-firstDay)"></span>
            <span v-else>{{(week-1)*7+n-firstDay}}</span>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
function paddingZero (str) {
  const _str = '' + str
  if (_str.length < 2) {
    return '0' + _str
  }
  return _str
}
export default {
  props: {
    dayNames: {
      type: Array,
      default () {
        return ['日', '一', '二', '三', '四', '五', '六']
      },
      validator (val) {
        return val.length === 7
      }
    },
    monthLabelFormatter: {
      type: [String, Function],
      default: 'yyyy年m月'
    },
    dayLabelFormatter: {
      type: Function
    }
  },
  data () {
    const now = new Date()
    return {
      currentMonth: new Date(now.getFullYear(), now.getMonth(), 1),
      selectedDay: '',
      monthLabel: '',
      firstDay: -1,
      lastDate: 28,
      weeks: 5
    }
  },
  methods: {
    updateMonthLabel () {
      this.monthLabel = typeof this.monthLabelFormatter === 'function' ? this.monthLabelFormatter(this.currentMonth)
        : this.monthLabelFormatter.replace('yyyy', this.currentMonth.getFullYear()).replace(/m{1,2}/, this.currentMonth.getMonth() + 1)
      this.firstDay = this.currentMonth.getDay()
      this.lastDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0).getDate()
      this.weeks = Math.ceil((this.firstDay + this.lastDate) / 7)
    },
    prevMonth () {
      this.currentMonth.setMonth(this.currentMonth.getMonth() - 1)
      this.updateMonthLabel()
    },
    nextMonth () {
      this.currentMonth.setMonth(this.currentMonth.getMonth() + 1)
      this.updateMonthLabel()
    }
  },
  created () {
    this.updateMonthLabel()
  }
}
</script>
<style scoped>
.container {
  width: 375px;
  margin: 0 auto;
  background-color: #f8f8f8;
  text-align: center;
  color: #333;
  font-size: 14px;
  user-select: none;
}
.header {
  height: 43px;
  line-height: 43px;
  background-color: #f1f1f1;
}
.header .array {
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 1px solid #44A82F;
  transform: rotate3d(0, 0, 1, 45deg);
  cursor: pointer;
}
.header .array-left {
  margin-right: 38px;
  border-top: none;
  border-right: none;
}
.header .array-right {
  margin-left: 38px;
  border-left: none;
  border-bottom: none;
}
.calendar-wrapper::after,
.calendar-row::after {
  content: '';
  display: block;
  clear: both;
}
.label-days {
  background-color: #e4e4e4;
  height: 31px;
  line-height: 31px;
}
.label-day, .calendar-day {
  width: 53.57142857142856px;
  float: left;
  box-sizing: border-box;
}
.calendar-day {
  display: flex;
  height: 47px;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
}
.calendar-day:last-child {
  border-right: none;
}
.calendar-row:last-child .calendar-day {
  border-bottom: none;
}
.calendar-day.not-in-month {
  background-color: #f8f8f8;
}
.calendar-day.in-month {
  background-color: #fff;
}
</style>

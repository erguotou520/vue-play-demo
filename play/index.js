import { play } from 'vue-play'
import Calendar from '../components/Calendar.vue'

play('Calendar', module)
  .add('With price', {
    components: {
      Calendar
    },
    render (h) {
      return h('calendar', {
        props: {
          dayLabelFormatter: (day) => {
            return `<div style="font-size:16px;margin-bottom:4px;">${day}</div><div style="font-size:10px;color:#ca5937"><span style="margin-right:2px;">¥</span>${Math.ceil(Math.random()*3000)}起</div>`
          }
        }
      })
    }
  })

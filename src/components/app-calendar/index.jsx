import { computed, defineComponent, ref } from 'vue'
import { chunk } from 'lodash-es'
import './style.scss'

/**
 * @param {number} year
 * @param {number} month
 */
function daysOfMonth(year, month) {
  return new Date(year, month - 1, 0).getDate()
}

/**
 * @param {number} year
 * @param {number} month
 */
function firstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

export default defineComponent({
  name: 'app-calendar',
  props: {
    value: {
      type: Date,
      default: () => new Date()
    }
  },
  setup(props, context) {
    /**
     * @type {import('vue').Ref<Date>}
     */
    const date = ref(props.value)

    const dayCount = computed(function () {
      return daysOfMonth(date.value.getFullYear(), date.value.getMonth())
    })
    const firstDay = computed(function () {
      return firstDayOfMonth(date.value.getFullYear(), date.value.getMonth())
    })

    function prevMonth() {
      date.value = new Date(date.value.getFullYear(), date.value.getMonth() - 1, 1)
      context.emit('input', date.value)
    }
    function nextMonth() {
      date.value = new Date(date.value.getFullYear(), date.value.getMonth() + 1, 1)
      context.emit('input', date.value)
    }

    /**
     * @param {number} year
     * @param {number} month
     * @param {number} day
     */
    function selectDay(year, month, day) {
      date.value = new Date(year, month, day)
      context.emit('input', date.value)
    }

    /**
     * @param {number} start
     * @param {number} end
     */
    function renderDays(start, end) {
      /**
       * @type {Array<{prevMonth: boolean, nextMonth: boolean, value: number}>}
       */
      const result = []

      let prevMonthDays = daysOfMonth(date.value.getFullYear(), date.value.getMonth() - 1, 1)

      const _start = start || 7

      for (let i = 0; i < _start; i++) {
        result.unshift({
          prevMonth: true,
          nextMonth: false,
          value: (prevMonthDays -= 1)
        })
      }

      for (let i = 1; i <= end; i++) {
        result.push({
          prevMonth: false,
          nextMonth: false,
          value: i
        })
      }

      const leftDay = 7 * 6 - result.length

      for (let i = 1; i <= leftDay; i++) {
        result.push({
          prevMonth: false,
          nextMonth: true,
          value: i
        })
      }

      return chunk(result, 7).map(function (rows) {
        return (
          <tr>
            {rows.map(day => (
              <td
                onClick={function () {
                  let month = date.value.getMonth()

                  if (day.nextMonth) {
                    month += 1
                  }

                  if (day.prevMonth) {
                    month -= 1
                  }

                  selectDay(date.value.getFullYear(), month, day.value)
                }}
                class={[
                  'day',
                  {
                    'next-month': day.nextMonth,
                    'prev-month': day.prevMonth,
                    current: date.value.getDate() === day.value && !day.nextMonth && !day.prevMonth
                  }
                ]}
              >
                <span>{day.value}</span>
              </td>
            ))}
          </tr>
        )
      })
    }

    /**
     * @type {ReadonlyArray<string>}
     */
    const monthMap = [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ]

    return {
      renderDays,
      dayCount,
      firstDay,
      date,
      monthMap,
      prevMonth,
      nextMonth
    }
  },
  render() {
    return (
      <div class='app-calendar'>
        <div class='app-calendar__header'>
          <a href='javascript:;' class='app-calendar__icon-btn el-icon-arrow-left' onClick={this.prevMonth}></a>
          <span class='flex1 app-calendar__header-label'>
            {this.date.getFullYear()}年{this.monthMap[this.date.getMonth()]}
          </span>
          <a href='javascript:;' class='app-calendar__icon-btn el-icon-arrow-right' onClick={this.nextMonth}></a>
        </div>

        <div class='app-calendar-pane__content'>
          <table class='app-calendar-table'>
            <tbody>
              <tr>
                <th>日</th>
                <th>一</th>
                <th>二</th>
                <th>三</th>
                <th>四</th>
                <th>五</th>
                <th>六</th>
              </tr>
              {this.renderDays(this.firstDay, this.dayCount)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
})

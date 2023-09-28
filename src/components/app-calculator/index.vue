<template lang="pug">
  el-dialog(
    title="计算器"
    width="450px"
    append-to-body
    custom-class="calc-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @closed="calcHandle({ type: 'ac' })")
    section.calc-container
      .calc-display
        .calc-display-inner
          p.calc-display-process {{ processText | formatProcessText }}
          p.calc-display-result {{ resultText }}

      ol.calc-keys
        li.calc-key(v-for="item of grid"
          :key="item.label"
          :class="item.type"
          @click="calcHandle(item)") {{ item.label }}
</template>

<script>
import { defineComponent, readonly } from 'vue'
import { calculator } from '@/util'

const KEY = readonly({
  /** `(` */
  leftBracket: '(',
  /** `)` */
  rightBracket: ')',
  /** `%` */
  percent: '%',
  /** `ac` */
  ac: 'ac',
  number0: '0',
  number1: '1',
  number2: '2',
  number3: '3',
  number4: '4',
  number5: '5',
  number6: '6',
  number7: '7',
  number8: '8',
  number9: '9',
  /** `+` */
  plus: '+',
  /** `-` */
  minus: '-',
  /** `*` */
  times: '*',
  /** `/` */
  divide: '/',
  /** `.` */
  point: '.',
  /** `=` */
  equal: '='
})

/**
 * @typedef CalcItem
 * @property {string} label
 * @property {string} key
 * @property {string} code
 * @property {'number'|'symbol'|'operator'} type
 * @property {string} [value]
 * @property {'times'|'divide'|'minus'|'plus'} [map] 运算符
 */

/**
 * @type {ReadonlyArray<CalcItem>}
 */
const grid = Object.freeze([
  { label: '(', key: KEY.leftBracket, code: 'Digit9', type: 'symbol' },
  { label: ')', key: KEY.rightBracket, code: 'Digit0', type: 'symbol' },
  { label: '%', key: KEY.percent, code: 'Digit5', type: 'symbol' },
  { label: 'AC', key: KEY.ac, code: 'Backspace', type: 'ac' },

  { label: '7', key: KEY.number7, value: '7', code: 'Numpad7|Digit7', type: 'number' },
  { label: '8', key: KEY.number8, value: '8', code: 'Numpad8|Digit8', type: 'number' },
  { label: '9', key: KEY.number9, value: '9', code: 'Numpad9|Digit9', type: 'number' },
  { label: '÷', key: KEY.divide, map: 'divide', code: 'NumpadDivide', type: 'operator' },

  { label: '4', key: KEY.number4, value: '4', code: 'Numpad4|Digit4', type: 'number' },
  { label: '5', key: KEY.number5, value: '5', code: 'Numpad5|Digit5', type: 'number' },
  { label: '6', key: KEY.number6, value: '6', code: 'Numpad6|Digit6', type: 'number' },
  { label: '×', key: KEY.times, map: 'times', code: 'NumpadMultiply', type: 'operator' },

  { label: '1', key: KEY.number1, value: '1', code: 'Numpad1|Digit1', type: 'number' },
  { label: '2', key: KEY.number2, value: '2', code: 'Numpad2|Digit2', type: 'number' },
  { label: '3', key: KEY.number3, value: '3', code: 'Numpad3|Digit3', type: 'number' },
  { label: '-', key: KEY.minus, map: 'minus', code: 'NumpadSubtract', type: 'operator' },

  { label: '0', key: KEY.number0, value: '0', code: 'Numpad0|Digit0', type: 'number' },
  { label: '.', key: KEY.point, code: 'NumpadDecimal|Period', type: 'symbol' },
  { label: '=', key: KEY.equal, code: 'Equal', type: 'equal' },
  { label: '+', key: KEY.plus, map: 'plus', code: 'NumpadAdd|Equal', type: 'operator' }
])

const gridMap = new Map(grid.map(item => [item.key, item]))

export default defineComponent({
  name: 'app-calculator',
  props: {
    visible: {
      type: Boolean
    }
  },
  filters: {
    /**
     * @param {string} val
     */
    formatProcessText(val) {
      if (val) {
        return val.replace(/[+\-×÷]/g, function ($) {
          return ' ' + $ + ' '
        })
      }
    }
  },
  data() {
    return {
      result: null,
      processText: null,
      /**
       * @type {Array<CalcItem>}
       */
      queue: [],
      grid
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    },
    resultText() {
      if (this.result) {
        return this.result
      }

      return this.queue.reduce(function (previousValue, currentValue) {
        return previousValue.concat(currentValue.label)
      }, '')
    }
  },
  mounted() {
    const self = this

    /**
     * @param {KeyboardEvent} e
     */
    const keyup = function (e) {
      const item = gridMap.get(e.key)

      /**
       * 计算
       */
      if (e.key === 'Enter') {
        self.calcHandle(gridMap.get('='))
        return
      }

      /**
       * 添加计算队列
       */
      if (item) {
        console.log(item.key)
        self.calcHandle(item)
      }

      if (e.key === 'Backspace') {
        self.queue.pop()
      }
    }

    document.addEventListener('keyup', keyup)

    this.$once('hooks:beforeDestroy', function () {
      document.removeEventListener('keyup', keyup)
    })
  },
  methods: {
    /**
     * 运算队列 求值
     * @param {CalcItem[]} queue
     */
    calc(queue) {
      const value = queue.shift()
      const calc = calculator(value.value)

      for (let i = 1; i < queue.length; i++) {
        const item = queue[i - 1]
        const nextItem = queue[i]

        if (item.map) {
          calc[item.map](nextItem.value)
        }
      }

      return calc.exec()
    },
    calcHandle(item) {
      /**
       * 清空栈
       */
      if (item.type === 'ac') {
        this.queue.splice(0)
        this.processText = null
        this.result = null
        return
      }

      /**
       * 计算
       */
      if (item.type === 'equal') {
        console.log('计算')

        try {
          const data = this.processCalcQueue(this.queue)
          this.result = data

          this.processText = this.queue.reduce(function (previousValue, currentValue) {
            return previousValue.concat(currentValue.label)
          }, '')
        } catch {
          this.result = 'Error'
        }

        return
      }

      this.queue.push(item)
    },
    /**
     * @param {Array<CalcItem>} data 计算队列
     * @param {boolean} isBracket 是否是 优先级运算符队列 如 true 则遇到优先级运算符 `* /` 不再 创建优先级运算符队列
     * @returns {number}
     */
    processCalcQueue(data, isBracket = false) {
      /**
       * 计算队列
       * @type {Array<CalcItem>}
       */
      const calcQueue = []
      /**
       * 优先级运算符队列
       * @type {Array<CalcItem[]>}
       */
      const brackets = []
      /**
       * 是否 有 隐式优先级运算符
       * @description
       * 当 item type 为 `(` 则表示 显式优先级运算符，为 `* /` 则表示 隐式优先级运算符
       */
      let latentPriority = false

      for (const item of data) {
        /**
         * @type {CalcItem|null}
         */
        const lastCalcItem = calcQueue.at(-1)
        /**
         * @type {CalcItem[]|null}
         */
        const lastBracket = brackets.at(-1)

        /**
         * 创建一个新的 运算队列
         * 隐式 优先级运算符 为 false
         */
        if (item.key === KEY.leftBracket) {
          latentPriority = false
          brackets.push([])
          continue
        }

        /**
         * 开始 求值 运算队列
         */
        if (item.key === KEY.rightBracket) {
          /**
           * 在 优先级运算符队列 弹出 最后 一个运算队列
           */
          if (lastBracket) {
            brackets.pop()
          }

          /**
           * 求值该运算队列
           */
          const value = this.processCalcQueue(lastBracket, true)
          /**
           * 在 优先级运算符队列 再获取一次 最后一个 运算队列
           */
          const nextBracket = brackets.at(-1)

          /**
           * 如果有 运算队列 则
           * 将 该值插入 到 该队列
           */
          if (nextBracket) {
            nextBracket.push({ value, type: 'number' })
            continue
          }

          calcQueue.push({ value, type: 'number' })
          continue
        }

        if (item.type === 'number') {
          const calcItem = { value: item.value, type: 'number' }

          if (lastBracket) {
            lastBracket.push(item)
            continue
          }

          if (lastCalcItem) {
            if (lastCalcItem.type === 'number') {
              lastCalcItem.value = String(lastCalcItem.value) + item.key
              lastCalcItem.label = lastCalcItem.value
              continue
            }
          }

          calcQueue.push(calcItem)
          continue
        }

        /**
         * 如果 是 % 运算符
         * 则将上一个计算项值 重新 计算
         */
        if (item.key === KEY.percent) {
          if (lastBracket) {
            lastBracket.push(item)
            continue
          }

          if (lastCalcItem) {
            lastCalcItem.value = this.calc([lastCalcItem, { map: 'divide', key: '/' }, { value: 100 }])
            continue
          }
        }

        /**
         * 如 当前计算队列已是 优先级运算符队列 则 插入到 计算队列中
         * 如 当前已有优先级队列 则插入到队列中
         * 如 key 为 * / 则 标记 有 优先级运算符
         * 创建一个 运算队列
         */
        if (item.key === KEY.times || item.key === KEY.divide) {
          if (isBracket) {
            calcQueue.push(item)
            continue
          }

          /**
           * 如 已有优先级运算符队列，则 弹出该队列中原素 插入到新的队列
           */
          if (lastBracket) {
            lastBracket.push(item)
            continue
          }

          latentPriority = true
          const popItem = calcQueue.pop()

          brackets.push([popItem, { map: item.key === KEY.times ? 'times' : 'divide', key: item.key }])
          continue
        }

        /**
         * 如 有 优先级运算符标识 则 判断 当前 item.key === '+' or '-' 则
         * 优先级运算符队列 弹出最后一个 运算符计算队列 并 计算该队列
         */
        if (item.key === KEY.plus || item.key === KEY.minus) {
          if (latentPriority) {
            brackets.pop()

            /**
             * 求值 运算符队列
             */
            const value = this.processCalcQueue(lastBracket, true)
            /**
             * 在 优先级运算符队列 再获取一次 最后一个 运算队列
             */
            const nextBracket = brackets.at(-1)

            /**
             * 如果有 运算队列 则
             * 将 该值插入 到 该队列
             */
            if (nextBracket) {
              nextBracket.push({ value, type: 'number' })
              continue
            }

            /**
             * 手动 插入 计算队列
             */
            calcQueue.push({ value, type: 'number' })
            calcQueue.push(item)
            continue
          }

          latentPriority = false

          if (lastBracket) {
            lastBracket.push(item)
            continue
          }

          calcQueue.push(item)
          continue
        }

        /**
         * 如果当前 key 是 小数点 那么 就合并到上一个运算符
         * @example item = . lastCalcItem = 1 => 1.
         */
        if (item.key === KEY.point) {
          /**
           * 如果存在 优先级运算队列 那么就不做处理 添加到 队列
           */
          if (lastBracket) {
            lastBracket.push(item)
            continue
          }

          if (lastCalcItem) {
            lastCalcItem.value = String(lastCalcItem.value) + item.key
            lastCalcItem.label = lastCalcItem.value
            continue
          }
        }

        /**
         * 如果存在 优先级运算队列 添加到 队列
         */
        if (lastBracket) {
          lastBracket.push(item)
          continue
        }

        calcQueue.push(item)
      }

      /**
       * 优先级运算符没有结束标识时 手动求值
       * 优先级结束符标识 ) +-
       * 当遇到 优先级运算符在最后一项时 需要手动计算该运算队列
       * @type {CalcItem[]|null}
       */
      const lastBracket = brackets.at(-1)
      if (lastBracket) {
        const value = this.processCalcQueue(lastBracket, true)
        calcQueue.push({ value, type: 'number' })
      }

      return this.calc(calcQueue)
    }
  }
})
</script>

<style lang="scss">
.calc-dialog {
  background: #eaecf3;
}

.calc-container {
  position: relative;
  padding: 16px 16px 11px 16px;
  margin: 0 -16px;
  background: #eaecf3;
  border-radius: 16px;
}

.calc-keys {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  justify-items: center;
  padding: 0;
  margin: 0;
  margin-top: 15px;
}

.calc-key {
  display: block;
  width: 66px;
  height: 54px;
  font-size: 20px;
  line-height: 54px;
  color: #283155;
  text-align: center;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  user-select: none;
  background-image: linear-gradient(135deg, #d9dce8, #e2e4ef);
  border-radius: 16px;
  box-shadow: inset 1px 1px 1px 0px rgba(255, 255, 255, 0.8), inset -1px -1px 1px 0px rgba(40, 49, 85, 0.3),
    1px 1px 3px 0px rgba(40, 49, 85, 0.1);

  &.number {
    font-size: 24px;
    background-image: linear-gradient(135deg, #f4f5f6, #fff);

    &:hover {
      background: #dfe0e5;
    }

    &:active {
      background: #dfe0e5;
      box-shadow: none;
      transform: scale(0.95);
    }
  }

  &.equal {
    width: 66px;
    font-size: 24px;
    color: #fff;
    background: #4f6ef2;
    box-shadow: inset 1px 1px 1px 0px rgba(255, 255, 255, 0.2), inset -2px -2px 1px 0px rgba(40, 49, 85, 0.3),
      1px 1px 3px 0px rgba(168, 174, 199, 0.2);

    &:hover {
      background: #4a68e2;
    }

    &:active {
      color: #a1afe8;
      background: #4a68e2;
      box-shadow: none;
      transform: scale(0.95);
    }
  }

  &.ac {
    font-size: 20px;
    color: #fff;
    background-image: linear-gradient(135deg, #ffa80e, #ffc355);

    &:hover {
      background: #ecb34d;
    }

    &:active {
      color: #edd3a3;
      background: #ecb34d;
      box-shadow: none;
      transform: scale(0.95);
    }
  }

  &:hover {
    background: #cfd2e0;
  }

  &:active {
    color: #747a92;
    text-shadow: none;
    background: #cfd2e0;
    box-shadow: none;
    transform: scale(0.95);
  }
}

.calc-display {
  display: flex;
  height: 104px;
  padding: 12px 16px 11px 16px;
  overflow: hidden;
  background: #fff;
  border-radius: 18px;
  box-shadow: inset 1px 1px 1px 0 rgba(40, 49, 85, 0.4);
}

.calc-display-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  text-align: right;
}

.calc-display-process {
  padding-top: 6px;
  margin: 0;
  margin-left: 28px;
  overflow-x: auto;
  overflow-y: hidden;
  font-size: 16px;
  line-height: 1;
  color: #283155;
  text-align: right;
  white-space: nowrap;
  opacity: 0.5;
}

.calc-display-result {
  position: relative;
  display: block;
  margin: 0;
  overflow-x: auto;
  overflow-y: hidden;
  font-size: 47px;
  font-weight: 600;
  line-height: 1;
  color: #283155;
  white-space: nowrap;
  word-spacing: -10px;
}
</style>

<template lang="pug">
  div.data-container
    app-big-screen(:width="1920" :height="1080" :wrapperStyle="{ display: 'flex' }")
      aside.data-left
        div#chart-pie1(style="height: 240px; width: 550px;")
        div#chart-line1(style="height: 280px; width: 550px;")
        div#chart-line2(style="height: 280px; width: 550px;")
        div#chart-line6(style="height: 280px; width: 550px;")
      section.data-main.flex1
        div#chart-three(style="height: 800px; width: 880px;")
        el-row(type="flex")
          div#chart-gauge(style="height: 280px; width: 440px;")
          div#chart-line7(style="height: 280px; width: 440px;")
      aside.data-right
        div#chart-line3(style="height: 180px; width: 550px;")
        div#chart-line4(style="height: 280px; width: 550px;")
        div#chart-line5(style="height: 280px; width: 550px;")
        div#chart-radar1(style="height: 300px; width: 550px;")
</template>

<script>
import { onBeforeUnmount, onMounted, readonly } from 'vue'
import * as echarts from 'echarts'

const config = readonly({
  backgroundColor: '#081736',
  color: ['#0278e6', '#34d160', '#fcdf39', '#f19611', '#00c6ff', '#f76363']
})

function usePie1() {
  const data = [
    {
      name: '农业专业合作社',
      value: 7
    },
    {
      name: '农业企业',
      value: 6
    },
    {
      name: '农业冷藏冷库',
      value: 14
    },
    {
      name: '农业园区',
      value: 4
    }
  ]

  /**
   * @type {echarts.EChartsType}
   */
  let instance = null

  onMounted(function () {
    const el = document.querySelector('#chart-pie1')
    instance = echarts.init(el)

    instance.setOption({
      backgroundColor: config.backgroundColor,
      color: config.color,
      grid: {
        top: '30',
        left: '1%',
        right: '1%',
        bottom: '0%',
        containLabel: true
      },
      legend: {
        orient: 'vertical',
        top: 'center',
        right: '0%',
        itemGap: 20,
        itemWidth: 16,
        itemHeight: 16,
        textStyle: {
          color: '#fff',
          fontSize: 14
        },
        data: ['农业专业合作社', '农业企业', '农业冷藏冷库', '农业园区']
      },
      series: [
        {
          name: '半径模式',
          type: 'pie',
          radius: ['25%', '75%'],
          center: ['40%', '50%'],
          roseType: 'radius',
          minShowLabelAngle: 60,
          labelLine: {
            length: 1,
            length2: 10,
            smooth: true
          },
          data
        }
      ]
    })
  })

  onBeforeUnmount(function () {
    instance.dispose()
  })
}

function useLine1() {
  /**
   * @type {echarts.EChartsType}
   */
  let instance = null

  onMounted(function () {
    const el = document.querySelector('#chart-line1')
    instance = echarts.init(el)
    /**
     * @type {echarts.EChartsOption}
     */
    const options = {
      backgroundColor: config.backgroundColor,
      color: config.color,
      grid: {
        top: '0',
        left: '1%',
        right: '1%',
        bottom: '8%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#FFFFFF'
        }
      },
      yAxis: {
        type: 'value',
        min: 0,
        // max: 140,
        splitNumber: 4,
        splitLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        axisLabel: {
          show: true,
          margin: 20,
          color: '#d1e6eb'
        }
      },
      series: [
        {
          name: '示范',
          type: 'line',
          smooth: true, // 是否平滑
          showAllSymbol: true,
          // symbol: 'image://./static/images/guang-circle.png',
          symbol: 'circle',
          symbolSize: 10,
          lineStyle: {
            color: '#00b3f4',
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 5,
            shadowOffsetX: 5
          },
          label: {
            show: true,
            position: 'top',
            color: '#00b3f4'
          },
          itemStyle: {
            color: '#00b3f4',
            borderColor: '#fff',
            borderWidth: 3,
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2
          },
          tooltip: {
            show: false
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0,179,244,0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,179,244,0)'
                }
              ],
              false
            ),
            shadowColor: 'rgba(0,179,244, 0.9)',
            shadowBlur: 20
          },
          data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02, 114.02]
        }
      ]
    }

    instance.setOption(options)
  })

  onBeforeUnmount(function () {
    instance.dispose()
  })
}

function useLine2() {
  const data = ['2020-2-17', '2020-2-17', '2020-2-17', '2020-2-17', '2020-2-17', '2020-2-17', '2020-2-17']

  /**
   * @type {Echarts.EChartsType}
   */
  let instance = null

  onMounted(function () {
    const el = document.querySelector('#chart-line2')
    instance = echarts.init(el)

    instance.setOption({
      grid: {
        top: '30',
        left: '1%',
        right: '1%',
        bottom: '8%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#959FA9',
            fontSize: 14
          },
          axisTick: {
            show: false
          },
          data
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(226, 226, 226, 0.3)',
              width: 1
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgb(2,185,208)'
            }
          },
          axisLabel: {
            color: '#959FA9',
            fontSize: 14
          }
        }
      ],
      series: [
        {
          name: '车型1',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          showAllSymbol: true,
          symbolSize: 12,
          label: {
            show: true,
            position: 'top'
          },
          itemStyle: {
            color: 'rgba(119, 82, 255, 1)'
          },

          areaStyle: {
            // 区域填充样式
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(119, 82, 255, 0.28)'
                },
                {
                  offset: 1,
                  color: 'rgba(119, 82, 255, 0.01)'
                }
              ],
              false
            )
          },
          data: [80, 90, 70, 100, 110, 100, 90]
        },
        {
          name: '车型2',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          showAllSymbol: true,
          symbolSize: 12,
          label: {
            show: true,
            position: 'top'
          },
          itemStyle: {
            color: 'rgba(58, 199, 139, 1)'
          },

          areaStyle: {
            // 区域填充样式
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(58, 199, 139, 0.28)'
                },
                {
                  offset: 1,
                  color: 'rgba(58, 199, 139, 0.01)'
                }
              ],
              false
            )
          },
          data: [50, 60, 40, 60, 70, 40, 50]
        },
        {
          name: '车型3',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          showAllSymbol: true,
          symbolSize: 12,
          label: {
            show: true,
            position: 'top'
          },
          itemStyle: {
            color: 'rgba(0, 141, 240, 1)'
          },

          areaStyle: {
            // 区域填充样式
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0, 141, 240, 0.28)'
                },
                {
                  offset: 1,
                  color: 'rgba(0, 141, 240, 0.01)'
                }
              ],
              false
            )
          },
          data: [10, 50, 30, 40, 50, 30, 26]
        }
      ]
    })
  })

  onBeforeUnmount(function () {
    instance.dispose()
  })
}

function useLine3() {
  const data = ['2020-2-17', '2020-2-17', '2020-2-17', '2020-2-17', '2020-2-17', '2020-2-17', '2020-2-17']

  /**
   * @type {Echarts.EChartsType}
   */
  let instance = null

  onMounted(function () {
    const el = document.querySelector('#chart-line3')
    instance = echarts.init(el)

    instance.setOption({
      grid: {
        top: '20',
        left: '0',
        right: '10%',
        bottom: '8%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#959FA9',
            fontSize: 14
          },
          axisTick: {
            show: false
          },
          data
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(226, 226, 226, 0.3)',
              width: 1
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgb(2,185,208)'
            }
          },
          axisLabel: {
            color: '#959FA9',
            fontSize: 14
          }
        }
      ],
      series: [
        {
          name: '车型1',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          showAllSymbol: true,
          symbolSize: 12,
          label: {
            show: true,
            position: 'top'
          },
          itemStyle: {
            color: 'rgba(119, 82, 255, 1)'
          },

          areaStyle: {
            // 区域填充样式
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(119, 82, 255, 0.28)'
                },
                {
                  offset: 1,
                  color: 'rgba(119, 82, 255, 0.01)'
                }
              ],
              false
            )
          },
          data: [80, 90, 70, 100, 110, 100, 90]
        },
        {
          name: '车型2',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          showAllSymbol: true,
          symbolSize: 12,
          label: {
            show: true,
            position: 'top'
          },
          itemStyle: {
            color: 'rgba(58, 199, 139, 1)'
          },

          areaStyle: {
            // 区域填充样式
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(58, 199, 139, 0.28)'
                },
                {
                  offset: 1,
                  color: 'rgba(58, 199, 139, 0.01)'
                }
              ],
              false
            )
          },
          data: [50, 60, 40, 60, 70, 40, 50]
        },
        {
          name: '车型3',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          showAllSymbol: true,
          symbolSize: 12,
          label: {
            show: true,
            position: 'top'
          },
          itemStyle: {
            color: 'rgba(0, 141, 240, 1)'
          },

          areaStyle: {
            // 区域填充样式
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0, 141, 240, 0.28)'
                },
                {
                  offset: 1,
                  color: 'rgba(0, 141, 240, 0.01)'
                }
              ],
              false
            )
          },
          data: [10, 50, 30, 40, 50, 30, 26]
        }
      ]
    })
  })

  onBeforeUnmount(function () {
    instance.dispose()
  })
}

function useLine4() {
  /**
   * @type {echarts.EChartsType}
   */
  let instance = null

  onMounted(function () {
    const el = document.querySelector('#chart-line4')
    instance = echarts.init(el)

    instance.setOption({
      grid: {
        top: '20',
        left: '0',
        right: '10%',
        bottom: '8%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#FFFFFF'
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#4C77A3'
          }
        },
        axisLabel: {
          color: '#FFFFFF'
        }
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
          itemStyle: {
            color: '#00F8FF',
            opacity: 0
          },
          lineStyle: {}
        },
        {
          type: 'pictorialBar',
          symbolSize: [40, 20],
          symbolOffset: [0, -10],
          z: 12,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: '#00E3FE'
              },
              {
                offset: 0,
                color: '#0176CD'
              }
            ])
          },
          symbolPosition: 'end',
          data: [120, 200, 150, 80, 70, 110, 130]
        },
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          barWidth: '40',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: '#00E3FE'
              },
              {
                offset: 0,
                color: '#0176CD'
              }
            ])
          }
        }
      ]
    })
  })

  onBeforeUnmount(function () {
    instance.dispose()
  })
}

function useLine5() {
  /**
   * @type {echarts.EChartsType}
   */
  let instance = null

  onMounted(function () {
    const el = document.getElementById('chart-line5')
    instance = echarts.init(el)
    instance.setOption({
      backgroundColor: config.backgroundColor,
      grid: {
        top: '20',
        left: '0',
        right: '10%',
        bottom: '8%',
        containLabel: true
      },
      legend: {
        top: '20',
        x: 'center',
        fontSize: 16,
        color: 'rgba(101, 213, 255, 1)',
        icon: 'path://M512 881.777778 512 881.777778C716.222629 881.777778 881.777778 716.222629 881.777778 512 881.777778 307.777371 716.222629 142.222222 512 142.222222 307.777373 142.222222 142.222222 307.777371 142.222222 512 142.222222 716.222629 307.777373 881.777778 512 881.777778L512 881.777778ZM512 1024 512 1024C229.230208 1024 0 794.769789 0 512 0 229.230211 229.230208 0 512 0 794.769789 0 1024 229.230211 1024 512 1024 794.769789 794.769789 1024 512 1024L512 1024Z',
        itemWidth: 8, // 设置宽度
        itemHeight: 8, // 设置高度、
        itemGap: 12 // 设置间距
      },
      tooltip: {
        show: true,
        trigger: 'axis', // axis , item
        backgroundColor: 'RGBA(0, 49, 85, 1)',
        borderColor: 'rgba(0, 151, 251, 1)',
        borderWidth: 1,
        borderRadius: 0,
        color: '#BCE9FC',
        fontSize: 16,
        align: 'left'
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: ['奉城镇', '南桥镇', '四团镇', '青村镇', '柘林镇'],
        axisLabel: {
          // 坐标轴刻度标签的相关设置。
          interval: 0, // 设置为 1，表示『隔一个标签显示一个标签』
          //	margin:15,
          color: '#65D5FF',
          fontStyle: 'normal',
          fontSize: 16
        },
        axisTick: {
          // 坐标轴刻度相关设置。
          show: false
        },
        axisLine: {
          // 坐标轴轴线相关设置
          lineStyle: {
            color: 'rgba(77, 128, 254, 0.2)'
          }
        },
        splitLine: {
          // 坐标轴在 grid 区域中的分隔线。
          show: true,
          lineStyle: {
            color: 'rgba(77, 128, 254, 0.2)'
          }
        }
      },
      yAxis: [
        {
          type: 'value',
          splitNumber: 3,
          axisLabel: {
            color: '#65D5FF',
            fontStyle: 'normal',
            fontSize: 16
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(77, 128, 254, 0.2)'
            }
          }
        }
      ],
      series: [
        {
          name: '1月',
          type: 'pictorialBar',
          barWidth: '60%',
          stack: '总量',
          label: {
            show: false
          },
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(0, 151, 251, 1)' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(0, 34, 66, 0.2)' // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            } // 渐变颜色
          },
          symbol:
            'path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z',

          data: [23, 84, 101, 74, 87]
        },
        {
          name: '2月',
          type: 'pictorialBar',
          barWidth: '60%',
          stack: '总量',
          label: {
            show: false
          },
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(48, 236, 166, 1)' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(0, 34, 66, 0.2)' // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            } // 渐变颜色
          },
          symbol:
            'path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z',

          data: [13, 54, 71, 24, 57]
        }
      ]
    })
  })
  onBeforeUnmount(function () {
    instance.dispose()
  })
}

function useLine6() {
  /**
   * @type {echarts.EChartsType}
   */
  let instance = null

  onMounted(function () {
    const el = document.querySelector('#chart-line6')
    instance = echarts.init(el)

    instance.setOption({
      grid: {
        top: '30',
        left: '1%',
        right: '1%',
        bottom: '8%',
        containLabel: true
      },
      legend: {
        top: '0',
        right: 'center',
        itemGap: 20,
        itemWidth: 16,
        itemHeight: 16,
        color: '#fff',
        fontSize: 13,
        data: ['注册总量', '最新注册量']
      },
      xAxis: {
        type: 'category',
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#FFFFFF'
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#4C77A3'
          }
        },
        axisLabel: {
          color: '#FFFFFF'
        }
      },
      series: [
        {
          name: '注册总量',
          type: 'line',
          data: [150, 230, 224, 218, 135, 260, 147],
          symbol: 'circle',
          symbolSize: 10,
          showAllSymbol: true,
          itemStyle: {
            color: '#00b3f4',
            borderColor: '#fff',
            shadowColor: 'rgba(0, 0, 0, .3)',
            borderWidth: 3,
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0,179,244,0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,179,244,0)'
                }
              ],
              false
            ),
            shadowColor: 'rgba(0,179,244, 0.9)',
            shadowBlur: 20
          }
        },
        {
          name: '最新注册量',
          type: 'bar',
          barWidth: '20',
          data: [200, 120, 80, 70, 110, 130, 188],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: '#00E3FE'
              },
              {
                offset: 0,
                color: '#0176CD'
              }
            ])
          }
        }
      ]
    })
  })

  onBeforeUnmount(function () {
    instance.dispose()
  })
}

function useRadar1() {
  /**
   * @type {Echarts.EChartsType}
   */
  let instance = null

  onMounted(function () {
    const el = document.querySelector('#chart-radar1')
    instance = echarts.init(el)

    const color = ['#4A99FF', '#4BFFFC'] // 线条边框颜色

    instance.setOption({
      backgroundColor: config.backgroundColor,
      color,
      title: {
        text: '车辆radar图',
        color: '#fff',
        fontSize: 16,
        padding: 0,
        top: 35,
        left: 40
      },
      legend: {
        // data，就是取得每个series里面的name属性。
        orient: 'vertical',
        icon: 'circle', // 图例形状
        padding: 0,
        top: 20,
        right: '15%',
        itemWidth: 14, // 小圆点宽度
        itemHeight: 14, // 小圆点高度
        itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
        fontSize: 14,
        color: '#00E4FF'
      },
      tooltip: {
        show: true
      },
      radar: {
        center: ['50%', '50%'], // 圆心坐标距离左边和上边的距离
        radius: ['1%', '75%'], // 内外半径，不写默认是75%
        startAngle: 90, // 可以旋转图形
        shape: 'polygon',
        axisName: {
          color: '#fff',
          fontSize: 16
        },
        indicator: [
          {
            name: '小型车',
            max: 6000
          },
          {
            name: '中型车',
            max: 5000
          },
          {
            name: '大型车',
            max: 5000
          },
          {
            name: '货车',
            max: 5000
          },
          {
            name: '特种车',
            max: 5000
          },
          {
            nam: '贵宾车',
            max: 5000
          }
        ],
        splitArea: {
          show: false // 默认显示颜色分割区域，不需要显示
        },
        axisLine: {
          show: true, // 是否显示十字交叉线
          // 指向外圈文本的分隔线样式
          lineStyle: {
            color: '#153269' // 线条颜色
          }
        },
        axisLabel: { show: false },
        splitLine: {
          // 雷达一圈圈
          show: true,
          lineStyle: {
            type: 'solid',
            color: '#113865', // 雷达一圈圈颜色分隔线颜色
            width: 1 // 分隔线线宽
          }
        }
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              name: '车辆数',
              value: [4300, 4700, 3600, 3900, 3800, 4200],
              symbolSize: 8,
              symbol: 'circle',

              lineStyle: {
                width: 2
              },
              areaStyle: {
                // 单项区域填充样式
                color: {
                  type: 'linear',
                  x: 0, // 右
                  y: 0, // 下
                  x2: 1, // 左
                  y2: 1, // 上
                  colorStops: [
                    {
                      offset: 0,
                      color: color[0]
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(0,0,0,0)'
                    },
                    {
                      offset: 1,
                      color: color[0]
                    }
                  ],
                  global: false
                },
                opacity: 1 // 区域透明度
              }
            },
            {
              value: [3200, 3000, 3400, 2000, 3900, 2000],
              name: '设计车位',
              symbolSize: 8,
              symbol: 'circle',
              lineStyle: {
                width: 2
              },

              areaStyle: {
                // 单项区域填充样式
                color: {
                  type: 'linear',
                  x: 0, // 右
                  y: 0, // 下
                  x2: 1, // 左
                  y2: 1, // 上
                  colorStops: [
                    {
                      offset: 0,
                      color: color[1]
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(0,0,0,0)'
                    },
                    {
                      offset: 1,
                      color: color[1]
                    }
                  ],
                  global: false
                },
                opacity: 1 // 区域透明度
              }
            }
          ]
        }
      ]
    })
  })

  onBeforeUnmount(function () {
    instance.dispose()
  })
}

function useTree() {
  /**
   * @type {echarts.EChartsType}
   */
  let instance = null

  const getData = function () {
    const data = {
      name: '根节点1',
      value: 0,
      children: []
    }

    for (let i = 1; i <= 10; i++) {
      const obj = {
        name: '节点' + i,
        value: i,
        children: []
      }
      for (let j = 1; j <= 5; j++) {
        const obj2 = {
          name: `节点1-${i}-${j}`,
          value: 1 + '-' + i + '-' + j
        }
        if (j % 2 === 1) {
          obj2.children = []
          for (let k = 1; k <= 3; k++) {
            const obj3 = {
              name: `节点1-${i}-${j}-${k}`,
              value: 1 + '-' + i + '-' + j + '-' + k
            }
            obj2.children.push(obj3)
          }
        }

        obj.children.push(obj2)
      }

      data.children.push(obj)
    }
    let arr = []
    arr.push(data)
    //
    arr = handle(arr, 0)
    return arr
  }

  const handle = function handleData(data, index, color = '#00f6ff') {
    // index标识第几层
    return data.map((item, index2) => {
      // 计算出颜色
      if (index === 1) {
        color = config.color.find((item, eq) => eq === index2 % 10)
      }
      // 设置节点大小
      if (index === 0 || index === 1) {
        item.label = {
          position: 'inside'
          //   rotate: 0,
          //   borderRadius: "50%",
        }
      }
      // 设置label大小
      switch (index) {
        case 0:
          item.symbolSize = 70
          break
        case 1:
          item.symbolSize = 50
          break
        default:
          item.symbolSize = 10
          break
      }
      // 设置线条颜色
      item.lineStyle = { color }

      if (item.children) {
        // 存在子节点
        item.itemStyle = {
          borderColor: color,
          color
        }
        item.children = handle(item.children, index + 1, color)
      } else {
        // 不存在
        item.itemStyle = {
          color: 'transparent',
          borderColor: color
        }
      }
      return item
    })
  }

  onMounted(function () {
    const el = document.querySelector('#chart-three')
    instance = echarts.init(el)

    instance.setOption({
      backgroundColor: config.backgroundColor,
      type: 'tree',
      toolbox: {
        // 工具栏
        show: true,
        iconStyle: {
          borderColor: '#03ceda'
        },
        feature: {
          restore: {}
        }
      },
      tooltip: {
        // 提示框
        trigger: 'item',
        triggerOn: 'mousemove',
        backgroundColor: 'rgba(1,70,86,1)',
        borderColor: 'rgba(0,246,255,1)',
        borderWidth: 0.5,
        fontSize: 10
      },
      series: [
        {
          type: 'tree',
          hoverAnimation: true, // hover样式
          data: getData(),
          top: 20,
          bottom: 20,
          left: 0,
          right: 0,
          layout: 'radial',
          symbol: 'circle',
          symbolSize: 10,
          nodePadding: 20,
          animationDurationUpdate: 750,
          expandAndCollapse: true, // 子树折叠和展开的交互，默认打开
          initialTreeDepth: 2,
          focusNodeAdjacency: true,
          itemStyle: {
            borderWidth: 1
          },
          label: {
            // 标签样式
            color: '#fff',
            fontSize: 10,
            fontFamily: 'SourceHanSansCN',
            position: 'inside',
            rotate: 0
          },
          lineStyle: {
            width: 1,
            curveness: 0.5
          }
        }
      ]
    })
  })

  onBeforeUnmount(function () {
    instance.dispose()
  })
}

function useGauge() {
  /**
   * @type {echarts.EChartsType}
   */
  let instance = null
  onMounted(function () {
    const el = document.getElementById('chart-gauge')
    const value = 60
    instance = echarts.init(el)

    instance.setOption({
      backgroundColor: config.backgroundColor,
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        containLabel: true
      },
      series: [
        {
          type: 'gauge',
          radius: '100%',
          splitNumber: 10,
          min: 10,
          max: 100,
          startAngle: 225,
          endAngle: -45,
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: [[1, 'rgba(0,0,0,0)']]
            }
          }, // 仪表盘轴线
          axisTick: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.6)',
              width: 1
            },
            length: -8
          }, // 刻度样式
          splitLine: {
            show: true,
            length: -20,
            lineStyle: {
              color: 'rgba(255,255,255,0.6)'
            }
          }, // 分隔线样式
          axisLabel: {
            // show:false,
            distance: 30,
            color: '#03b7c9',
            fontSize: '14',
            fontWeight: 'bold',
            formatter: '{value}%'
          },
          pointer: {
            show: 0
          },
          detail: {
            show: 0
          }
        },

        // 内侧指针、数值显示
        {
          name: '达标率',
          type: 'gauge',
          radius: '60%',
          startAngle: 225,
          endAngle: -45,
          min: 0,
          max: 100,
          axisLine: {
            show: true,
            lineStyle: {
              width: 6,
              color: [
                [
                  value / 100,
                  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: '#ff0'
                    },
                    {
                      offset: 1,
                      color: '#f00'
                    }
                  ])
                ],
                [1, '#222e7d']
              ]
            }
          },
          axisTick: {
            show: 0
          },
          splitLine: {
            show: 0
          },
          axisLabel: {
            show: 0
          },
          pointer: {
            show: false,
            length: '105%'
          },
          detail: {
            show: true,
            offsetCenter: [0, '-10%'],
            fontSize: 25,
            color: '#fff',
            formatter: ['{name|达标率}' + '', '' + '{value}%'].join('\n'),
            rich: {
              name: {
                fontSize: 20,
                lineHeight: 40,
                color: '#fff',
                fontWeight: 'bold'
              }
            }
          },
          itemStyle: {
            color: '#03b7c9'
          },
          data: [
            {
              value
            }
          ]
        }
      ]
    })
  })
  onBeforeUnmount(function () {
    instance.dispose()
  })
}

function useLine7() {
  /**
   * @type {echarts.EChartsType}
   */
  let instance = null
  onMounted(function () {
    const el = document.getElementById('chart-line7')
    instance = echarts.init(el)
    instance.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: 40,
        left: 0,
        right: 0,
        bottom: 40
      },
      xAxis: [
        {
          type: 'category',
          data: ['工作票', '操作票', '抢修', '用电调查', '设备巡视', '现场勘查', '到岗到位'],
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.12)'
            }
          },
          axisLabel: {
            margin: 10,
            color: '#e2e9ff',
            fontSize: 14
          }
        }
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: '{value}',
            color: '#e2e9ff'
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.12)'
            }
          }
        }
      ],
      series: [
        {
          type: 'bar',
          data: [300, 450, 770, 203, 255, 188, 156],
          barWidth: '20px',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0,244,255,1)' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(0,77,167,1)' // 100% 处的颜色
                }
              ],
              false
            ),
            barBorderRadius: [30, 30, 30, 30],
            shadowColor: 'rgba(0,160,221,1)',
            shadowBlur: 4
          },
          label: {
            show: true,
            lineHeight: 21,
            width: 100,
            height: 25,
            backgroundColor: 'rgba(0,160,221,0.1)',
            borderRadius: 200,
            position: ['-5', '-40'],
            distance: 1,
            formatter: ['    {d|●}', ' {a|{c}} \n', '    {b|}'].join(''),
            rich: {
              d: {
                color: '#3CDDCF'
              },
              a: {
                color: '#fff',
                align: 'center'
              },
              b: {
                width: 1,
                height: 15,
                borderWidth: 1,
                borderColor: '#234e6c',
                align: 'left'
              }
            }
          }
        }
      ]
    })
  })
  onBeforeUnmount(function () {
    instance.dispose()
  })
}

export default {
  name: 'AppIndex',
  setup() {
    usePie1()
    useLine1()
    useLine2()
    useLine3()
    useLine4()
    useRadar1()
    useTree()
    useLine5()
    useLine6()
    useGauge()
    useLine7()
  }
}
</script>

<style lang="scss">
.data-container {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #081736;
}

.data-main {
  position: relative;
}

.data-left,
.data-right {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
</style>

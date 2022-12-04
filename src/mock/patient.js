import Mock from 'mockjs'

/**
 * @type {{data: {name: string, id: number}[]}}
 */
export const patientList = Mock.mock({
  'data|10-20': [
    {
      name: '@cname',
      id: '@id'
    }
  ]
})

/**
 * @type {{data: {name: string, id: number}[]}}
 */
export const organization = Mock.mock({
  'data|5-10': [
    {
      name: '@cname',
      id: '@id',
      icon: '@image(100x100, 4A7BF7, @cfirst)'
    }
  ]
})

/**
 * @type {{data: {name: string, id: number, value: number[]}[]}}
 */
export const glassSlide = Mock.mock({
  'data|5-8': [
    {
      name: '@ctitle(3)',
      id: '@integer(1, 100)',
      'value|1-10': ['@integer(1, 100)']
    }
  ]
})

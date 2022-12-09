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
 * @type {{data: Patient.List[]}}
 */
export const patients = Mock.mock({
  'data|20-50': [
    {
      id: '@id',
      patientName: '@cword(4,8)',
      glassSlide: '@character(upper)@character(upper)@integer(1000, 9999)',
      arrayedFig: '@image(600x600)',
      countNum: '@integer(1,100)',
      karyotypeExpression: '@word(1)@integer(10,20)/@integer(0,9)-@integer(100,200) @integer(300, 400)'
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
  'data|4': [
    {
      name: '@ctitle(3)',
      id: '@integer(1, 100)',
      'value|1-10': ['@integer(1, 100)']
    }
  ]
})

/**
 * @type {{data: {name: string, id: number, value: number[]}[]}}
 */
export const karyotype = Mock.mock({
  'data|4': [
    {
      name: '@ctitle(3)',
      id: '@integer(1, 100)',
      'value|1-10': ['@integer(1, 100)']
    }
  ]
})

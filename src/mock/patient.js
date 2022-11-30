import Mock from 'mockjs'

/**
 * @type {data: {name: string, id: number}[]}
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
 * @type {data: {name: string, id: number}[]}
 */
export const organization = Mock.mock({
  'data|1-10': [
    {
      name: '@cname',
      id: '@id'
    }
  ]
})

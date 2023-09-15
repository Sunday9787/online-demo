import Mock from 'mockjs'
import { request } from '@/util/net'

/**
 * @param {Request.List} param
 * @returns {Promise<Response.List<Product.Detail>>}
 */
export function getProductList(param) {
  if (param.current > 10) {
    return request([])
  }

  const { data } = Mock.mock({
    [`data|${param.limit}`]: [
      {
        id: '@id',
        title: '@ctitle(10,20)',
        price: '@integer(1,100)',
        'album|5': ['@image(1200x1200, @color)'],
        specs: [
          {
            id: 1,
            attr: '颜色',
            select: '',
            value: [
              { id: 0, label: '红色' },
              { id: 1, label: '绿色' },
              { id: 2, label: '蓝色' },
              { id: 3, label: '紫色' }
            ],
            img: '@image(800x800, @color, @first)'
          },
          {
            id: 2,
            attr: '尺码',
            select: '',
            value: [
              { id: 0, label: 'M' },
              { id: 1, label: 'L' },
              { id: 2, label: 'XL' }
            ],
            img: '@image(800x800, @color, @first)'
          },
          {
            id: 3,
            attr: '版型',
            select: '',
            value: [
              { id: 0, label: '宽松' },
              { id: 1, label: '紧致' }
            ],
            img: '@image(800x800, @color, @first)'
          }
        ]
      }
    ]
  })

  return request(data)
}

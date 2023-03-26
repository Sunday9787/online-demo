import Mock from 'mockjs'

/**
 * @type {Product.Detail}
 */
export const goodInfo = Mock.mock({
  id: '@id',
  title: '@cword(48)',
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
})

/**
 * @type {Product.SpecCombination[]}
 */
export const specCombinationList = [
  {
    id: 0,
    spec: [
      { id: 1, label: '颜色', value: '红色' },
      { id: 2, label: '尺码', value: 'L' },
      { id: 3, label: '版型', value: '紧致' }
    ]
  },
  {
    id: 1,
    spec: [
      { id: 1, label: '颜色', value: '绿色' },
      { id: 2, label: '尺码', value: 'L' },
      { id: 3, label: '版型', value: '紧致' }
    ]
  },
  {
    id: 3,
    spec: [
      { id: 1, label: '颜色', value: '紫色' },
      { id: 2, label: '尺码', value: 'XL' },
      { id: 3, label: '版型', value: '宽松' }
    ]
  }
]

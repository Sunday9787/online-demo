/**
 * @param {Product.CommoditySpecs[]} data
 */
function createSpecVertex(data) {
  /**
   * @type {string[]}
   */
  const vertex = data.reduce(function (previousValue, currentValue) {
    return previousValue.concat(currentValue.value.map(val => val.label))
  }, [])

  return vertex
}

class AdjoinMatrix {
  /**
   * @param {string[]} vertex
   */
  constructor(vertex) {
    /**
     * 所有顶点集合
     * @type {string[]}
     */
    this.vertex = vertex

    /**
     * @type {number}
     */
    this.quantity = this.vertex.length

    /**
     * 邻接矩阵
     * @type {Map<number, number>}
     */
    this.adjoinMatrix = new Map(
      Array(this.quantity ** 2)
        .fill(0)
        .entries()
    )
  }

  /**
   * 传入一个顶点，和当前顶点可达的顶点集合，将对应位置置为1
   * @param {string} id 顶点
   * @param {string[]} sides 当前顶点可到达顶点集合
   */
  setAdjoinVertex(id, sides) {
    const pIndex = this.vertex.indexOf(id)
    const self = this

    sides.forEach(function (item) {
      const index = self.vertex.indexOf(item)
      self.adjoinMatrix.set(pIndex * self.quantity + index, 1)
    })
  }

  /**
   * 传入顶点的值，获取该顶点的列
   * @param {string} id
   */
  getVertexCol(id) {
    const index = this.vertex.indexOf(id)
    /**
     * @type {number[]}
     */
    const col = []

    for (let pIndex = 0; pIndex < this.vertex.length; pIndex++) {
      col.push(this.adjoinMatrix.get(this.quantity * pIndex + index))
    }

    return col
  }

  /***
   * 传入一个顶点数组，求出该数组所有顶点的列的合
   * @param {string[]} ids
   */
  getColSum(ids) {
    const idsVertex = ids.map(id => this.getVertexCol(id))
    /**
     * @type {number[]}
     */
    const idsVertexSum = []

    for (let i = 0; i < this.vertex.length; i++) {
      const rowTotal = idsVertex
        .map(value => value[i])
        .reduce(function (total, current) {
          return total + current
        }, 0)

      idsVertexSum.push(rowTotal)
    }

    return idsVertexSum
  }

  /**
   * 传入一个顶点数组，求出并集
   * @param {string[]} ids
   */
  getCollection(ids) {
    const idsSum = this.getColSum(ids)
    /**
     * @type {string[]}
     */
    const collections = []

    idsSum.forEach((sum, index) => {
      if (sum && this.vertex[index]) collections.push(this.vertex[index])
    })

    return collections
  }

  /**
   * 传入一个顶点数组，求出交集
   * @param {number[]} ids
   */
  getUnions(ids) {
    const idsSum = this.getColSum(ids)
    /**
     * @type {string[]}
     */
    const unions = []

    idsSum.forEach((sum, index) => {
      if (sum >= ids.length && this.vertex[index]) unions.push(this.vertex[index])
    })

    return unions
  }
}

export class SpecMatrix extends AdjoinMatrix {
  /**
   * @param {Product.CommoditySpecs[]} specList
   * @param {Product.SpecCombination[]} specCombinationList
   */
  constructor(specList, specCombinationList) {
    super(createSpecVertex(specList))
    /**
     * @type {Product.CommoditySpecs[]}
     */
    this.specList = specList
    /**
     * @type {Product.SpecCombination[]}
     */
    this.specCombinationList = specCombinationList

    this.init()
  }

  init() {
    this.initSpec()
  }

  initSpec() {
    const self = this
    this.specCombinationList.forEach(function (item) {
      const specs = item.spec.map(spec => spec.value)
      let prevSpec = specs[0]
      let i = 0

      while (i < specs.length) {
        const sides = specs.filter(spec => spec !== prevSpec)
        self.setAdjoinVertex(prevSpec, sides)
        i++
        prevSpec = specs[i]
      }
    })
  }

  /**
   * @param {string[]} ids
   */
  getSpecsOptions(ids) {
    /**
     * @type {string[]}
     */
    let specOptionCanChoose = null

    if (ids.some(Boolean)) {
      // 过滤一下选项
      specOptionCanChoose = this.getUnions(ids.filter(Boolean))
    } else {
      // 所有可选项
      specOptionCanChoose = this.getCollection(this.vertex)
    }

    return specOptionCanChoose
  }
}

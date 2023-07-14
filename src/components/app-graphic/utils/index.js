import { VARIABLE_SHAPE, COLLECTION_SHAPE } from 'app-graphic/constant'

export const shape = {
  /**
   * @param {string} shape
   */
  isCollection(shape) {
    return COLLECTION_SHAPE.includes(shape)
  },
  /**
   * @param {string} shape
   */
  isVariable(shape) {
    return VARIABLE_SHAPE.includes(shape)
  }
}

/**
 * @param {GtGraphic.NodeData<GtGraphic.NodeData>} data
 */
export function unShapeData(data) {
  return Object.values(data).flatMap(function (item) {
    return Object.values(item.value)
  })
}

/**
 * @type {Map<number, Vue>}
 */
const instances = new Map()

const PopoverManage = {
  /**
   * @param {number} id
   * @param {Vue} instance
   */
  register(id, instance) {
    if (instances.has(id)) return

    instances.set(id, instance)
  },
  /**
   * @param {number} id
   */
  show(id) {
    for (const [key, vm] of instances) {
      if (key === id) continue
      vm.visible = false
    }
  },
  /**
   * @param {number} id
   */
  hide(id) {
    instances.get(id).visible = false
  },
  /**
   * @param {number} id
   */
  deregister(id) {
    instances.delete(id)
  }
}

export default PopoverManage

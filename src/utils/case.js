/**
 * @param {string} str
 */
export function kebabCase(str) {
  return str.replace(/([A-Z])/g, function ($0, $1, index) {
    return index > 0 ? '-' + $0.toLowerCase() : $0.toLowerCase()
  })
}

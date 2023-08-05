/**
 * 角度转弧度
 * @param {number} deg
 */
export function angelToRad(deg) {
  return (deg * Math.PI) / 180
}

/**
 * 弧度转角度
 * @param {number} deg
 */
export function radToAngle(rad) {
  return (Math.PI / 180) * rad
}

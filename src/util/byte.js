import NP from 'number-precision'

const hex = 1024
const b = 1
const kb = b * hex
const mb = kb * hex
const gb = mb * hex

const unitSize = {
  b,
  kb,
  mb,
  gb
}

const unitMap = {
  b: 'b',
  kb: 'kb',
  mb: 'mb',
  gb: 'gb'
}

const units = Object.keys(unitMap)

/**
 * @param {number} size
 * @param {string} unit
 * @param {boolean} [format]
 */
function serializeSize(size, unit, format) {
  if (format) {
    return NP.divide(size, unitSize[unit])
  }

  return NP.times(size, unitSize[unit])
}

/**
 * @param {string} size
 */
export default function (size) {
  const match = /^(?<size>[1-9]\d+)(?<unit>\w+)$/.exec(size)

  if (!match) {
    throw new Error('请输入合法数值')
  }

  if (units.indexOf(match.groups.unit) < 0) {
    throw new Error('请输入合法进制')
  }

  const byte = serializeSize(Number(match.groups.size), match.groups.unit)

  return {
    /**
     * @param {string} unit
     */
    format(unit) {
      return serializeSize(byte, unit, true) + unit
    }
  }
}

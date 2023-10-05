class Chain {
  /**
   * @param {Function} fn
   * @param {Chain} [errorChain]
   */
  constructor(fn, errorChain) {
    /**
     * @private
     * @type {Function}
     */
    this.fn = fn

    /**
     * @type {Chain | null}
     */
    this.nextChain = null

    /**
     * @type {Chain | null}
     */
    this.errorChain = errorChain
  }

  /**
   * @param {any} data
   * @param {Chain} [nextChain]
   */
  next(data, nextChain) {
    if (nextChain) {
      return nextChain.pass(data)
    }

    return this.nextChain && this.nextChain.pass(data)
  }

  pass(data) {
    const response = this.fn.call(null, data)

    if (response && response.pass) {
      return this.next(response.data)
    }

    return this.next(response.data, this.errorChain)
  }
}

function fn1() {
  const message = 'fn1'
  console.log(message)

  return {
    pass: true,
    data: [message]
  }
}

function fn2(response) {
  const message = 'fn2'
  console.log(message)
  console.log(response)

  return {
    pass: false,
    data: response.concat(message)
  }
}

function fn3(response) {
  const message = 'fn3'
  console.log(message)
  console.log(response)

  return {
    pass: true,
    data: response.concat(message)
  }
}

function fn5(response) {
  const message = 'fn5'
  console.log(message)
  console.log(response)

  return {
    pass: true,
    data: response.concat(message)
  }
}

const chain5 = new Chain(fn5)
const chain1 = new Chain(fn1)
const chain2 = new Chain(fn2, chain5)
const chain3 = new Chain(fn3)

chain1.nextChain = chain2
chain2.nextChain = chain3

chain5.nextChain = chain3

export function request(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = { data, code: 200, message: 'success' }

      if (Array.isArray(data)) {
        response.data = { list: data, total: 1000, current: 1, limit: 10 }
      }

      resolve(response.data)
    }, 300)
  })
}

export function request(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        data,
        list: data
      }

      if (Array.isArray(data)) {
        response.totalCount = data.length
      }

      resolve(response)
    }, 300)
  })
}

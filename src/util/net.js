export function request(data) {
  console.log(data)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data,
        list: data,
        totalCount: data.length
      })
    }, 300)
  })
}

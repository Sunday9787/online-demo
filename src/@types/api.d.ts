declare namespace Response {
  interface Body<T> {
    code: number
    message: string
    data: Data<T>
  }

  type Data<T> = T extends Blob ? { blob: Blob, filename: string } : T

  interface List<T> {
    list: T[]
    limit: number
    current: number
    totalCount: number
  }
}

declare namespace Request {
  interface List {
    current: number
    limit: number
  }
}

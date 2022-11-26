declare namespace Page {
  interface Table {
    loading: boolean
    data: unknown[]
  }

  interface Pagination {
    limit: number
    current: number
    total: number
  }

  interface Option {
    request: (...args: any[]) => Promise<unknown>
    /** @default true */
    immediate: boolean,
    /** 查询忽略字段 */
    ignoreField: string[]
    /** 时间范围字段映射 */
    timeFieldMap: Record<string, [string, string]>
  }
}

declare class Page extends Vue {
  /** 表格数据 */
  public table: Page.Table
  /** 分页配置 */
  public pagination: Page.Pagination

  public resetForm(ref: string): void

  public search(current?: number | Event): void
}

interface Directive {
  name: string
  option: import('vue').DirectiveOptions
}

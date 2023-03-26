namespace Product {
  interface Detail {
    id: string
    title: string
    price: number
    album: string[]
    specs: CommoditySpecs[]
  }

  interface CommoditySpecs {
    id: number
    attr: string
    select: null|number
    value: Array<{ id: number, label: string }>
  }

  interface SpecCombination {
    id: string
    spec: Array<{ id: number, label: string, value: string }>
  }
}

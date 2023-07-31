namespace Patient {
  interface List {
    id: string
    patientName: string
    glassSlide: string
    arrayedFig: string
    countNum: string
    karyotypeExpression: string
  }
}

namespace Three {
  export interface Map {
    type: string
    features: Feature[]
  }

  interface Feature {
    type: string
    properties: Properties
    geometry: Geometry
  }

  interface Geometry {
    type: string
    coordinates: [number, number][][][]
  }

  interface Properties {
    adcode: number
    name: string
    center: number[]
    centroid: number[]
    childrenNum: number
    level: string
    parent: Parent
    subFeatureIndex: number
    acroutes: number[]
  }

  interface Parent {
    adcode: number
  }
}

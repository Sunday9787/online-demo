declare namespace Graphic {
  interface ChangeDataEvent {
    cell: import('@antv/x6').Cell
    current: Record<string, unknown>
  }
}

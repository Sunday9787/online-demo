import { defineComponent } from 'vue'

export default defineComponent({
  functional: true,
  name: 'AppGrid',
  props: {
    column: {
      type: Number,
      default: 1
    },
    columnWidth: {
      type: String,
      default: '1fr'
    },
    row: {
      type: Number,
      required: false
    },
    rowHeight: {
      type: String,
      default: '1fr'
    },
    align: {
      type: String,
      default: 'top'
    },
    justify: {
      type: String,
      default: 'left'
    },
    center: {
      type: Boolean,
      default: false
    },
    gap: {
      type: String,
      required: false
    }
  },
  render(h, context) {
    const props = context.props

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${props.column}, ${props.columnWidth})`,
          gridTemplateRows: props.row ? `repeat(${props.row}, ${props.rowHeight})` : 'auto',
          justifyItems: props.center ? 'center' : props.justify,
          alignItems: props.center ? 'center' : props.align,
          gap: props.gap,
          ...context.data.staticStyle,
          ...context.data.staticClass
        }}
      >
        {context.slots().default}
      </div>
    )
  }
})

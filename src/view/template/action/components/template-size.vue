<template>
  <h1>size</h1>
</template>

<script>
import { TemplateMMSize } from '@/view/template/action/class/size'

export const size = {
  A4: new TemplateMMSize({
    width: 210,
    height: 297
  }),
  A5: new TemplateMMSize({
    width: 148,
    height: 210
  })
}

export default {
  name: 'TemplateSize',
  setup() {}
}
</script>

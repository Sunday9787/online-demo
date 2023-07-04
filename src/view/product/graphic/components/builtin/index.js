import { register } from '@antv/x6-vue-shape'
import builtinInput from './builtin-input'
import builtinPlus from './builtin-plus'

const components = [builtinInput, builtinPlus]

for (const item of components) {
  register(item.register())
}

<template lang="pug">
  el-dialog(
    title="编辑模板"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :width="store.size.width + 50 + 'px'")
    section(:style="{ height: '55vh', overflowY: 'auto' }" style="background-color: #fff;")
      div.template-document(:style="documentStyle")
        template(v-for="component of store.componentsData")
          component(
            group
            mode="element"
            :key="component.id"
            :is="component.name"
            :children="component.children"
            v-bind="component.props"
            v-if="component.name === 'builtin-group'")
          component(
            mode="element"
            :key="component.id"
            :is="component.name"
            v-model="component.value"
            v-bind="component.props"
            v-else)

    div(slot="footer")
      el-button(size="small" @click="action('cancel')") 取 消
      el-button(type="primary" size="small" @click="action('ok')") 确 定
</template>

<script>
import { createBuiltinComponent, createBuiltinComponentGroup, createId } from '@/view/template/utils'
import { useStore } from '@/view/template/hooks/useStore'

const mockComponents = [
  {
    label: '病例名称',
    create() {
      return createBuiltinComponent({ props: { label: this.label } }, 'document')
    }
  },
  {
    label: '产前编号',
    create() {
      return createBuiltinComponent({ props: { label: this.label } }, 'document')
    }
  },
  {
    label: '姓名',
    create() {
      return createBuiltinComponent({ props: { label: this.label } }, 'document')
    }
  },
  {
    label: '姓名组',
    create() {
      return createBuiltinComponentGroup(
        { builtin: true, props: { label: this.label, position: { x: 0, y: 20 } } },
        [
          createBuiltinComponent({ props: { label: '姓名1' } }, 'document'),
          createBuiltinComponent({ props: { label: '姓名2', position: { x: 20, y: 20 } } }, 'document')
        ],
        'document'
      )
    }
  },
  {
    label: '筛选项',
    create() {
      return createBuiltinComponent(
        {
          name: 'builtin-select',
          props: {
            label: this.label,
            options: [
              { label: '测试1', value: '111' },
              { label: '测试2', value: '222' },
              { label: '测试3', value: '333' }
            ]
          }
        },
        'document'
      )
    }
  }
]

/**
 * @type {Function}
 */
let resolvePromise = null

/**
 * @param {Template.Builtin[]} data
 */
function mockData(data) {
  let index = 0

  return data.map(function (item, i) {
    const component = item.create(true)

    component.uid = index++
    component.id = createId(component.uid)
    component.visible = true
    component.props.position.x = 20
    component.props.position.y = i * 100

    if (component.children) {
      component.children.forEach(function (item) {
        item.uid = index++
        item.id = createId(item.uid)
      })
    }

    return component
  })
}

export default {
  name: 'TemplateDocument',
  components: {
    BuiltinInput: () => import('../builtin/builtin-input.vue'),
    BuiltinGroup: () => import('../builtin/builtin-group.vue'),
    BuiltinSelect: () => import('../builtin/builtin-select.vue')
  },
  setup() {
    const store = useStore()
    store.size.name = 'A4'
    const components = mockData(mockComponents)

    components.forEach(function (item, i) {
      store.components.set(i, item)
      store.changes += 1
    })

    return { store }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    documentStyle() {
      return {
        borderLeftWidth: this.store.padding.left + 'mm',
        borderTopWidth: this.store.padding.top + 'mm',
        borderRightWidth: this.store.padding.right + 'mm',
        borderBottomWidth: this.store.padding.bottom + 'mm',
        width: this.store.size.width + 'px',
        height: this.store.size.height + 'px'
      }
    }
  },
  methods: {
    open() {
      this.dialogVisible = true
      return new Promise(resolve => {
        resolvePromise = resolve
      })
    },
    /**
     * @param {'cancel' | 'ok'} type
     */
    action(type) {
      this.dialogVisible = false
      resolvePromise(type)
    }
  }
}
</script>

<style lang="scss">
.template-document {
  position: relative;
  border: 0 solid #f2f2f2;
  outline: none;
  box-shadow: 0 0 8px 1px darken($color: #f2f2f2, $amount: 20%);
}
</style>

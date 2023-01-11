<template lang="pug">
  header.template-toolbar
    el-button(type="text" size="small" icon="el-icon-arrow-left" @click="goBack()") 返回

    div.flex1

    el-button(type="primary" size="small" @click="undo()")
      i.el-icon-back
      | &nbsp;撤销

    el-button(type="primary" size="small" @click="restore()")
      | 恢复&nbsp;
      i.el-icon-right
    el-button(type="primary" size="small" @click="stageClear()") 清空画布
    el-button(type="primary" size="small") 导入模板
    el-button(type="primary" size="small" @click="action(actionType.open)") 模板属性

    el-dialog(
      :visible.sync="dialog.visible"
      :close-on-click-modal="false"
      append-to-body
      title="模板属性"
      width="500px"
      @keydown.native.enter="action(actionType.submit)"
      @closed="resetForm('formRef')"
    )
      el-form(:model="form" ref="formRef" action="javascript:;" size="medium" label-suffix="：" label-width="100px")
        el-form-item(label="模板名称" prop="name")
          el-input(ref="templateName" v-model="form.name")

        el-form-item(label="尺寸" prop="size")
          el-radio-group(v-model="form.size")
            el-radio(:label="size.A4.name") A4
            el-radio(:label="size.A5.name") A5

        el-form-item(label="方向" prop="direction")
          el-radio-group(v-model="form.direction")
            el-radio(label="vertical") 纵向
            el-radio(label="horizontal") 横向

        el-form-item(label="页面边距" prop="padding")
          ol.template-toolbar-padding
            li.template-toolbar-padding-item
              label(for="padding-top") 上：
              el-row.template-toolbar-padding__inner(type="flex" align="middle")
                el-input-number.flex1(
                  id="padding-top"
                  size="small"
                  :min="0"
                  :max="40"
                  :precision="1"
                  :step="1"
                  :controls="false"
                  v-model="form.padding.top")
                span 毫米
            li.template-toolbar-padding-item
              label(for="padding-bottom") 下：
              el-row.template-toolbar-padding__inner(type="flex" align="middle")
                el-input-number.flex1(
                  id="padding-bottom"
                  size="small"
                  :min="0"
                  :max="40"
                  :precision="1"
                  :step="1"
                  :controls="false"
                  v-model="form.padding.bottom")
                span 毫米
            li.template-toolbar-padding-item
              label(for="padding-left") 左：
              el-row.template-toolbar-padding__inner(type="flex" align="middle")
                el-input-number.flex1(
                  id="padding-left"
                  size="small"
                  :min="0"
                  :max="40"
                  :precision="1"
                  :step="1"
                  :controls="false"
                  v-model="form.padding.left")
                span 毫米
            li.template-toolbar-padding-item
              label(for="padding-right") 右：
              el-row.template-toolbar-padding__inner(type="flex" align="middle")
                el-input-number.flex1(
                  id="padding-right"
                  size="small"
                  :min="0"
                  :max="40"
                  :precision="1"
                  :step="1"
                  :controls="false"
                  v-model="form.padding.right")
                span 毫米
      el-row(slot="footer" type="flex" justify="end")
        el-button(type="primary" size="small" @click="action(actionType.submit)") 确定
        el-button(size="small" @click="action(actionType.close)") 取消
</template>

<script>
import { getCurrentInstance, inject, reactive, nextTick } from 'vue'
import { cloneDeep } from 'lodash-es'
import { storeSymbol, templateChannel } from '@/view/template/constant'
import { useSize } from '@/view/template/hooks/useSize'
import { usePadding } from '@/view/template/hooks/usePadding'
import { useDialog } from '@/hooks/useDialog'
import eventBus from '@/util/eventBus'
import { TemplateEvent } from '@/view/template/utils'

export default {
  name: 'TemplateToolbar',
  setup() {
    const vm = getCurrentInstance().proxy
    /**
     * @type {Template.Store}
     */
    const store = inject(storeSymbol)
    const size = useSize()
    const form = reactive({
      name: '',
      size: '',
      direction: '',
      padding: usePadding()
    })

    const {
      state: dialog,
      action,
      actionType
    } = useDialog({
      open() {
        form.name = store.name
        form.size = store.size.name
        form.direction = store.direction
        form.padding = cloneDeep(store.padding)

        nextTick(function () {
          /**
           * @type {import('element-ui').Input}
           */
          const templateNameInput = vm.$refs.templateName
          templateNameInput.focus()
        })
      },
      submit() {
        store.name = form.name
        store.direction = form.direction
        store.size.name = form.size
        store.padding = cloneDeep(form.padding)
        action('action:hidden')
      }
    })

    return { store, size, form, dialog, action, actionType }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    stageClear() {
      const event = new TemplateEvent(templateChannel.stageClear, {
        detail: Array.from(this.store.components.values()),
        target: 'toolbar'
      })
      eventBus.$emit(templateChannel.stageClear, event)
    },
    undo() {
      const event = new TemplateEvent(templateChannel.stageClear, { detail: null, target: 'toolbar' })
      eventBus.$emit(templateChannel.stageUndo, event)
    },
    restore() {
      const event = new TemplateEvent(templateChannel.stageClear, { detail: null, target: 'toolbar' })
      eventBus.$emit(templateChannel.stageRestore, event)
    }
  }
}
</script>

<style lang="scss">
.template-toolbar {
  z-index: 1;
  position: relative;
  display: flex;
  padding: 8px 20px;
  box-shadow: 0 0 8px 1px #bfbfbf;
}

.template-toolbar-padding {
  display: inline-grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: max-content;
  margin: 0 40px 0 0;
  padding: 0;
  column-gap: 10px;
  row-gap: 10px;
  color: var(--color-text-regular);
}

.template-toolbar-padding-item {
  display: flex;
  column-gap: 5px;
}

.template-toolbar-padding__inner {
  column-gap: 5px;
}
</style>

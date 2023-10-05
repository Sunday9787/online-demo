<template lang="pug">
  div.template-property-item
    label 选项
    ol.template-property-list.flex1
      li.template-property-list-item(v-for="optionItem of option" :key="optionItem.type")
        ul.template-property-list
          li.template-property-list-item(ref="item" v-for="(item, index) in current.options" :key="item.key")
            el-input(
              v-model="item.value"
              size="mini"
              @hook:mounted="inputMounted"
              @keyup.native.enter="() => current[optionItem.type].add()")
            div(style="width: 14px; text-align: center")
              a.el-icon-delete(v-show="item.value" @pointerdown="() => current[optionItem.type].del(index)")
</template>

<script>
export default {
  name: 'TemplatePropertyOption',
  props: {
    option: {
      type: Array,
      required: true
    },
    current: {
      type: Object,
      required: true
    }
  },
  methods: {
    inputMounted() {
      /**
       * @type {HTMLLIElement}
       */
      const el = this.$refs.item[this.$refs.item.length - 1]

      this.$nextTick(function () {
        el.querySelector('input').focus()
      })
    }
  }
}
</script>

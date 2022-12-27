<template lang="pug">
  app-card(type="flex" flex1)
    ul.drag-list
      li.drag-item(
        v-for="(item, index) in data"
        :key="item.id"
        :class="item.size"
        :style="{backgroundColor: item.color}"
        draggable
        @dragstart="dragstartHandle($event, item, index)"
        @dragend="dragendHandle($event)"
        @drag="dragHandle($event)"
        @drop="dropHandle($event, item, index)"
        @dragover.prevent="noop"
      )
        | {{ item.label }}
</template>

<script>
export default {
  name: 'org-drag',
  data() {
    return {
      data: [
        { label: '一', id: 1, size: 'a5', color: '#f44336' },
        { label: '二', id: 2, size: 'a5', color: '#9c27b0' },
        { label: '三', id: 3, size: 'a4', color: '#673ab7' },
        { label: '四', id: 4, size: 'a5', color: '#2196f3' },
        { label: '五', id: 5, size: 'a5', color: '#009688' }
      ]
    }
  },
  methods: {
    /**
     * @param {DragEvent} e
     */
    dragHandle(e) {
      console.log('正在拖拉')
    },
    /**
     * @param {DragEvent} e
     */
    dragstartHandle(e, data, index) {
      console.log('开始拖拽')
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('application/json', JSON.stringify(data))
      e.dataTransfer.setData('text/plain', String(index))
    },
    /**
     * @param {DragEvent} e
     */
    dragendHandle(e) {
      console.log('结束拖拽')
      e.dataTransfer.clearData()
    },
    /**
     * @param {DragEvent} e
     */
    dropHandle(e, targetData, targetIndex) {
      let sourceData = e.dataTransfer.getData('application/json')
      let sourceIndex = e.dataTransfer.getData('text/plain')

      /**
       * @type {Template.BuiltinComponent}
       */
      sourceData = JSON.parse(sourceData)
      sourceIndex = Number(sourceIndex)
      const sortData = this.data.slice(0)

      sortData[sourceIndex] = targetData
      sortData[targetIndex] = sourceData

      this.data = sortData
    }
  }
}
</script>

<style lang="scss">
.drag-list {
  position: relative;
  display: flex;
  margin: 0;
  padding: 0;
}

.drag-item {
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;

  &.a4 {
    width: 150px;
  }

  &.a5 {
    width: 200px;
  }
}
</style>

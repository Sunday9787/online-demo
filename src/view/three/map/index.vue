<template lang="pug">
.three-container
</template>

<script>
import Map from './map'

/**
 * @returns {Promise<Three.Map>}
 */
function getData() {
  return fetch('https://geo.datav.aliyun.com/areas_v3/bound/410000_full.json').then(response => response.json())
}

export default {
  name: 'ThreeMap',
  async mounted() {
    const data = await getData()
    const map = new Map(this.$el, window.innerWidth, window.innerHeight)

    map.init(data)

    this.$on('hooks:beforeDestroy', function () {
      map.destroy()
    })
  }
}
</script>

<style lang="scss">
.three-container {
  position: relative;
  height: 100%;
}
</style>

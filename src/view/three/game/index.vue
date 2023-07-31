<template lang="pug">
.three-container
</template>

<script>
import Game from './game'

export default {
  name: 'ThreeIndex',
  mounted() {
    const game = new Game(this.$el, window.innerWidth, window.innerHeight)

    game.init()

    this.$on('hooks:beforeDestroy', function () {
      game.destroy()
    })
  }
}
</script>

<style lang="scss">
.three-container {
  height: 100%;
}
</style>

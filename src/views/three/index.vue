<template lang="pug">
.three-container
  canvas#canvas
</template>

<script>
import Game from './game'

export default {
  name: 'ThreeIndex',
  mounted() {
    const el = document.getElementById('canvas')
    const game = new Game(el, window.innerWidth, window.innerHeight)

    game.init()

    this.$on('hooks:beforeDestroy', function () {
      game.destroy()
    })
  }
}
</script>

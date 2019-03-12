<template>
  <canvas
    width="600"
    height="400"
    ref="canvas"
  ></canvas>
</template>

<script>
// library
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      lineWidth: 20,
      lineColor: 'rgb(155, 187, 89)'
    }
  },
  computed: {
    ...mapGetters({
      drawData: 'drawData'
    })
  },
  watch: {
    drawData: function() {
      if (this.drawData) this.draw()
    }
  },
  methods: {
    draw() {
      const canvas = this.$refs.canvas
      if (!canvas || !canvas.getContext) return

      // canvas.width = 600
      // canvas.height = 400

      const ctx = canvas.getContext('2d')
      ctx.lineWidth = this.lineWidth
      ctx.strokeStyle = this.lineColor
      ctx.beginPath()

      this.drawData.forEach(part => {
        ctx.lineTo(part.x, part.y)
      })
      ctx.closePath()
      ctx.stroke()
    }
  }
}
</script>

<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>

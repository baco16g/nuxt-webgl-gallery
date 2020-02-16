<template>
  <section class="artwork">
    <canvas ref="canvas" />
  </section>
</template>

<script lang="ts">
import { createComponent, ref, onMounted } from '@vue/composition-api'
import Gl from '~/pages/works/001/Gl'

export default createComponent({
  setup() {
    const canvas = ref<HTMLCanvasElement>(null)
    onMounted(() => {
      if (!canvas.value) return
      const gl = new Gl(canvas.value)
      gl.tick()
    })
    return { canvas }
  }
})
</script>

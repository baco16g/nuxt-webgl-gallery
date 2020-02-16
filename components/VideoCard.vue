<template functional>
  <div class="w-full h-full rounded overflow-hidden shadow-lg pb-3 bg-white">
    <div class="h-40 w-full bg-black">
      <video class="h-full w-full" autoplay muted loop :src="props.videoUrl" />
    </div>
    <div class="px-4 pt-4">
      <h4 class="font-bold text-xl text-gray-700 text-base">
        {{ props.title }}
      </h4>
    </div>
    <div class="px-4">
      <span class="text-sm text-gray-500">
        2020-02-16
      </span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'VideoCard',
  props: {
    title: {
      type: String,
      required: true
    },
    videoUrl: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="bg-gray-300 h-screen">
    <div class="mx-auto	 max-w-screen-lg px-12 lg:px-0">
      <h1 class="text-3xl font-bold py-12 text-gray-800">
        WebGL's Portfolio by baoc16g
      </h1>
      <div
        class="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-4"
      >
        <nuxt-link to="/works/001">
          <VideoCard
            title="Hallows"
            to="/works/001"
            video-url="/001/output.webm"
          />
        </nuxt-link>
        <nuxt-link to="/works/002">
          <VideoCard
            title="Destruction and regeneration"
            ti="/works/002"
            video-url="/002/output.webm"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import VideoCard from '~/components/VideoCard.vue'

export default {
  components: {
    VideoCard
  }
}
</script>

<style></style>

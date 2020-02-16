<template>
  <div>
    <nuxt-link
      v-if="$route.path !== '/'"
      to="/"
      class="absolute mt-3 ml-3 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow-lg"
      >Back</nuxt-link
    >
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
</style>

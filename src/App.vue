<template>
    <HomePage></HomePage>
</template>

<script>
import HomePage from './sections/HomePage.vue'

export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    HomePage
  }
}
</script>

<style>
:root {
  /* Colors */
  --bg-color: #212121;
  --accent: #2e2e2e;
  --approved: #AABA4F;
  --denied: #ED6B86;
  --limited: #769FB6;
  --other: #DCDCDC;
  --text:white;
  --subtitle: #696969;

  /* Fonts */
  --title-font: 'Chakra Petch', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --body-font: 'IBM Plex Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Font Sizes */
  --root-size: 12px;
  --h1-size: 3.8em;
  --h2-size: 1.8em;
  --h3-size: 1.3em;
  --subtitle-size: 0.6em;
}

html {
  background-color: var(--bg-color);
  color: white;
}

a {
  color: white;
}

.bg-open {
  background-color: var(--bg-color);
  height: 100vh;
  width: 98vw;
  position: fixed;
  z-index: 1;
  top: 0;
  opacity: 0.7;
}

#app {
  font-family: 'IBM Plex Sans', sans-serif;
  margin: 0;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>

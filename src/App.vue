<template>
  <AppTitle></AppTitle>
  <IntroSection :carouselData="carouselData" :movies="movies"></IntroSection>
  <BrowseFilms :movies="movies" :statusOptions="statusOptions"></BrowseFilms>
</template>

<script>
import AppTitle from './sections/AppTitle.vue'
import IntroSection from './sections/IntroSection.vue'
import BrowseFilms from './sections/BrowseFilms.vue'
import * as d3 from "d3";

export default {
  name: 'App',
  data() {
    return {
      movies: [],
      statusOptions: [],
      carouselData: [],
    }
  },
  created() {
    Promise.all([d3.csv("./movies.csv", d3.autoType)]).then(([data]) => {
    function getColByName(arr, columnName) {
        const col = [];
        for (let row = 0; row < arr.length - 1; row++) {
          const value = Object.values(arr)[row][columnName];
          col.push(value);
        }
          return col;
      }
      this.movies = data.filter(el => {return el.Status != null && el.TitleForSorting != null}).sort((a, b) => {return a.TitleForSorting - b.TitleForSorting});
      /* Status options */
      const options = Array.from(new Set(getColByName(this.movies, "Status")))
      options.push("ALL")
      this.statusOptions = options.sort();
      /* Carousel fields */
      this.carouselData = data.filter(el => {return el.Status != null && el.TitleForSorting != null && el.CarouselFlag === "TRUE"}).sort((a, b) => {return a.CarouselOrder - b.CarouselOrder});
  });
  },
  components: {
    AppTitle,
    IntroSection,
    BrowseFilms
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

#app {
  font-family: 'IBM Plex Sans', sans-serif;
  margin: 0;
}

</style>

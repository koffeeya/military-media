<template>
    <div class='page-wrapper'></div>
    <AppTitle></AppTitle>
    <IntroSection :carouselData="carouselData" :movies="movies"></IntroSection>
    <BrowseFilms :movies="movies" :statusOptions="statusOptions"></BrowseFilms>
</template>

<script>
import AppTitle from './AppTitle.vue'
import IntroSection from './IntroSection.vue'
import BrowseFilms from './BrowseFilms.vue'
import * as d3 from "d3";

export default {
  name: 'HomePage',
  data() {
    return {
      movies: [],
      statusOptions: [],
      carouselData: [],
    }
  },
  mounted() {
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


</style>
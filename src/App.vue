<template>
  <div class='page-wrapper'></div>
  <div>
      <div class="step" data-step="a">
        <AppTitle />
      </div>
      <div class="step" data-step="b">
        <IntroText />
      </div>
      <div class="step" data-step="c">
        <CarouselSection :carouselData="carouselData"></CarouselSection>
      </div>
      
      <WaffleChart :filmsByYear='filmsByYear' :rawData='rawData'></WaffleChart>
      <BrowseFilms :movies="movies" :statusOptions="statusOptions"></BrowseFilms>
  </div>
</template>

<script>
import AppTitle from './components/AppTitle.vue'
import IntroText from './sections/IntroText.vue'
import CarouselSection from './sections/CarouselSection.vue'
import WaffleChart from './components/WaffleChart.vue'
import BrowseFilms from './sections/BrowseFilms.vue'
import * as d3 from "d3";
import "intersection-observer";
import Scrollama from "scrollama";

export default {
  name: 'App',
  data() {
    return {
      rawData: [],
      movies: [],
      statusOptions: [],
      carouselData: [],
      filmsByYear: {},
    }
  },
  methods: {
    stepEnterHandler ({element, index, direction}) {
      // handle the step-event as required here
      console.log(element, index, direction)
    }
  },
  created() {
    Promise.all([d3.csv("./movies.csv", d3.autoType)]).then(([data]) => {
      this.rawData = data;
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
      /* Count By Year */
      const yearData = data.filter(el => {return el.Year != null}).sort((a, b) => {return a.Status - b.Status}).sort((a, b) => {return a.Year - b.Year});
      const yearGrouped = d3.group(yearData, d => d.Year)
      this.filmsByYear = []
      Array.from(yearGrouped, ([key, values]) => {
        this.filmsByYear.push({Year: key, Films: values});
      })
  });
  },
  mounted () {
    },
  components: {
    AppTitle,
    IntroText,
    BrowseFilms,
    WaffleChart,
    CarouselSection,
    Scrollama
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

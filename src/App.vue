<template>
  
  <!-- Sections -->
  <div ref='sections'>
    <div class="step step0" >
      <AppTitle :observer="observer" :stepList="stepList" :index='0' />
    </div>
    <div class="step step1" >
      <IntroSection :observer="observer" :stepList="stepList" :index='1' :carouselData="carouselData"></IntroSection>
    </div>
    <div class='step step2' >
      <WaffleChart :observer="observer" :stepList="stepList" :index='2' :filmsByYear='filmsByYear' :rawData='rawData'></WaffleChart>
    </div>
    <div class='step step3' >
      <BrowseFilms class='hide' :observer="observer" :stepList="stepList" :index='3' :movies="movies" :statusOptions="statusOptions"></BrowseFilms>
    </div>
  </div>
  
  <!-- Faded background -->
  <div class='page-wrapper'></div>
</template>

<script>
import AppTitle from './sections/AppTitle.vue'
import IntroSection from './sections/IntroSection.vue'
import WaffleChart from './sections/WaffleChart.vue'
import BrowseFilms from './sections/BrowseFilms.vue'
import * as d3 from "d3";

export default {
  name: 'App',
  data() {
    return {
      rawData: [],
      movies: [],
      statusOptions: [],
      carouselData: [],
      filmsByYear: {},
      observer: null,
      stepList: [
        { name: 'AppTitle', index: 0, active: false, ratio: null, direction: null, target: null },
        { name: 'IntroSection', index: 1, active: false, ratio: null, direction: null, target: null },
        { name: 'WaffleChart', index: 2, active: false, ratio: null, direction: null, target: null },
        { name: 'BrowseFilms', index: 3, active: false, ratio: null, direction: null, target: null }
      ],
      activeStep: 0,
      prevRatio: 0.0,
    }
  },
  methods: {
    handleIntersect(entries) {
      entries.forEach((entry) => {
        const entryIndex = Number(entry.target.getAttribute("data-index"));
        const entryData = this.stepList[entryIndex];
        entryData.ratio = entry.intersectionRatio;
        entryData.target = entry.target.className.split(" ")[0] // get the first class name
        // Record the scrolling direction
        if (entry.intersectionRatio > this.prevRatio) {
          entryData.direction = "up"
        } else {
          entryData.direction = "down"
        }
        // Set the visible step to active, and the remaining to inactive
        if (entry.intersectionRatio > 0.9) {
          this.hideRemainingSteps(entryIndex);
          this.activeStep = entryIndex;
          entryData.active = true;
          console.log(`step ${this.activeStep} ${entryData.name} ${entryData.direction}`);
        } else {
          entryData.active = false;
        }
        this.prevRatio = entry.intersectionRatio;
      });
    },
    hideRemainingSteps(index) {
      const stepNum = this.stepList.length;
      const allStepArr = [...Array(stepNum).keys()]
      const remainingSteps = allStepArr.filter((d) => {return d != index})
      const activeStepData = this.stepList[index]
      // Make the active step visible and sticky
      d3.select(`.${activeStepData.target}`)
          .transition()
          .duration(200)
          .style("opacity", "1");
      d3.select(`.step${index}`).classed('title-sticky', true)
      d3.select(`.step${index}`).classed('hide-sticky', false)
      // Make all inactive steps invisible and hidden
      remainingSteps.map((value) => {
        const inactiveStepData = this.stepList[value]
        inactiveStepData.active = false;
        d3.select(`.${inactiveStepData.target}`)
          .transition()
          .duration(200)
          .style("opacity", "0");
        d3.select(`.step${value}`).classed('title-sticky', false)
        d3.select(`.step${value}`).classed('hide-sticky', true)
      })
    },
    getMovieData(data) {
      this.movies = data.filter(el => {return el.Status != null && el.TitleForSorting != null}).sort((a, b) => {return a.TitleForSorting - b.TitleForSorting});
      const options = Array.from(new Set(this.getColByName(this.movies, "Status")))
      options.push("ALL")
      this.statusOptions = options.sort();
      this.carouselData = data.filter(el => {return el.Status != null && el.TitleForSorting != null && el.CarouselFlag === "TRUE"}).sort((a, b) => {return a.CarouselOrder - b.CarouselOrder});
      const yearData = data.filter(el => {return el.Year != null}).sort((a, b) => {return a.Status - b.Status}).sort((a, b) => {return a.Year - b.Year});
      const yearGrouped = d3.group(yearData, d => d.Year)
      this.filmsByYear = []
      Array.from(yearGrouped, ([key, values]) => {
        this.filmsByYear.push({Year: key, Films: values});
      })
    },
    getColByName(arr, columnName) {
      const col = [];
      for (let row = 0; row < arr.length - 1; row++) {
        const value = Object.values(arr)[row][columnName];
        col.push(value);
      }
        return col;
    },
    buildThresholdList() {
      let thresholds = [];
      let numSteps = 5;
      let arr = [...Array(numSteps).keys()]
      arr.map((value, index) => {
        let ratio = (value + 1) / numSteps;
        thresholds.push(ratio)
      })
      thresholds.push(0)
      return thresholds;
    },
    setUpObserver() {
      let options = {
        root: this.$refs.sections,
        threshold: 1.0,
      }
      this.observer = new IntersectionObserver(this.handleIntersect, options)
    },
  },
  computed: {

  },
  created() {
    // Set up the intersection observer
    this.setUpObserver();
    // Load in the data
    Promise.all([d3.csv("./movies.csv", d3.autoType)]).then(([data]) => {
      this.rawData = data;
      this.getMovieData(data);
    });
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
  components: {
    AppTitle,
    BrowseFilms,
    WaffleChart,
    IntroSection
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

  --body-font: 'IBM Plex Serif', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --card-font: 'IBM Plex Sans', sans-serif;
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

.title-sticky {
  position: sticky;
  top: 15%;
}

.hide {
  position: absolute !important;
  top: -9999px !important;
  left: -9999px !important;
}

.hide-sticky {
  position: sticky;
  top: -9999px !important;
  left: -9999px !important;
}

.invisible {
  opacity: 0;
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
  font-family: 'IBM Plex Serif', sans-serif;
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

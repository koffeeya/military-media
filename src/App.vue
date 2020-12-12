<template>
  <!-- Sections -->
  <div class="sections">
    <div class="step step1">
      <WaffleChart
        :filmsByYear="filmsByYear"
        :rawData="rawData"
        :genreList="genreOptions"
        :carouselData="carouselData"
        :genreOptions="genreOptions"
        :warOptions="warOptions"
      ></WaffleChart>
    </div>
  </div>
</template>

<script>
import WaffleChart from "./sections/WaffleChart.vue";
import * as d3 from "d3";

export default {
  name: "App",
  data() {
    return {
      rawData: [],
      movies: [],
      statusOptions: [],
      genreOptions: [],
      warOptions: [],
      carouselData: [],
      filmsByYear: {},
    };
  },
  methods: {
    getMovieData(data) {
      // All data
      this.movies = data
        .filter((el) => {
          return el.Status != null && el.TitleForSorting != null;
        })
        .sort((a, b) => {
          return a.TitleForSorting - b.TitleForSorting;
        });

      // Status Options
      const statusOptions = Array.from(
        new Set(this.getColByName(this.movies, "Status"))
      );
      this.statusOptions = statusOptions.filter(d => d != null);

      // War Options
      const warOptions = Array.from(
        new Set(this.getColByName(this.movies, "CurrentWar"))
      );
      this.warOptions = warOptions.filter(d => d != null);

      // Genres
      const allGenres = this.getColByName(this.movies, "Genre");
      const mergedGenres = [];
      allGenres.map((value) => {
        if (value != null) {
          const replaced = value.replaceAll(",", "")
          const split = replaced.split(" ");
          mergedGenres.push(...split);
        }
      });
      const genres = Array.from(new Set(mergedGenres)).sort();
      this.genreOptions = genres;

      // Carousel Data
      this.carouselData = data
        .filter((el) => {
          return (
            el.Status != null &&
            el.TitleForSorting != null &&
            el.CarouselFlag === "TRUE"
          );
        })
        .sort((a, b) => {
          return a.CarouselOrder - b.CarouselOrder;
        });

      // Data By Year
      const yearData = data
        .filter((el) => {
          return el.Year != null;
        })
      const yearGrouped = d3.group(yearData, (d) => d.Year);
      this.filmsByYear = [];
      Array.from(yearGrouped, ([key, values]) => {
        this.filmsByYear.push({ Year: key, Films: values });
      });
    },
    getColByName(arr, columnName) {
      const col = [];
      for (let row = 0; row < arr.length; row++) {
        const value = Object.values(arr)[row][columnName];
        col.push(value);
      }
      return col;
    },
  },
  created() {
    // Load in the data
    Promise.all([d3.csv("./movies.csv", d3.autoType)]).then(([data]) => {
      this.rawData = data;
      this.getMovieData(data);
    });
  },
  components: {
    //BrowseFilms,
    WaffleChart,
  },
};
</script>

<style>
:root {
  /* Colors */
  --bg-color: #141414;
  --accent: #2e2e2e;
  --approved: #aaba4f;
  --denied: #ed6b86;
  --limited: #769fb6;
  --other: #dcdcdc;
  --text: white;
  --subtitle: #696969;

  /* Fonts */
  --title-font: "Chakra Petch", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --body-font: "IBM Plex Serif", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --card-font: "IBM Plex Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Font Sizes */
  --root-size: 12px;
  --h1-size: 3.8em;
  --h2-size: 1.8em;
  --h3-size: 1.3em;
  --subtitle-size: 0.6em;
  --body-size: 22px;
}

html {
  background-color: var(--bg-color);
  color: white;
}

a {
  color: white;
  text-decoration: underline;
  text-decoration-color: gray;
  font-weight: 500;
  padding: 0px 2px;
  margin: 0px 1px;
}

a:hover {
  background-color: var(--accent);
  color: white;
  text-decoration: none;
  cursor: pointer;
}

.visible-sticky {
  position: sticky;
  top: 60px;
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
  font-family: "IBM Plex Serif", sans-serif;
  margin: 0;
}

@media only screen and (max-width: 600px) {
  .visible-sticky {
    top: 20px;
  }
  .intro-container {
    display: grid;
    grid-template-columns: 1fr;
  }

  :root {
    --body-size: 18px;
  }
}

@media only screen and (max-width: 1300px) {

  :root {
    --root-size: 10px;
  }
}
</style>

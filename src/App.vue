<template>
<div id="app">
  <div class='title-wrapper'>
    <div class='title-container'><b class='app-title first-word'>ASSISTANCE</b><b class='app-title second-word'>DENIED</b></div>
    <div class='app-subtitle'>HOW THE <b style='color: var(--approved)'>MILITARY</b> & <b style='color: var(--denied)'>HOLLYWOOD</b> WORK TOGETHER</div>
  </div>
  
  <div class='filter-container'>
    <select v-model="filterStatus" placeholder='ALL'>
      <option v-for="status in statusOptions" :key="status">
        {{status}}
      </option>
    </select>
      <input v-model='searchTerm' placeholder='Search for a film by name'>
    <div class='film-count' v-if="listLength === 1">Showing {{listLength}} film</div>
    <div class='film-count' v-else>Showing {{listLength}} films</div>
  </div>

  <div class='movie-wrapper'>
  <MovieCard v-for="movie in filteredFilms"
      :key="movie.TitleClean + movie.Year"
      :Title="movie.TitleClean"
      :Remarks="movie.Remarks"
      :Year="movie.Year"
      :Status="movie.Status"
      :Poster="movie.Poster"
      :Genre="movie.Genre"
      :ratingImdb="movie.ratingImdb"
      :imdbVotes="movie.imdbVotes"
      :FilmReleased="movie.FilmReleased"
      :Plot="movie.Plot">
  </MovieCard>
    </div>
  </div>
</template>

<script>
import MovieCard from './components/MovieCard.vue'
import * as d3 from "d3";

export default {
  name: 'App',
  data() {
    return {
      searchTerm: "",
      searchTopic: "",
      filterStatus: "ALL",
      movies: [],
      statusOptions: [],
      pluralFilms: "films",
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

      const parsed = data.filter(el => {return el.Status != null && el.TitleForSorting != null}).sort((a, b) => {return a.TitleForSorting - b.TitleForSorting});
      this.movies = parsed
      const options = Array.from(new Set(getColByName(parsed, "Status")))
      options.push("ALL")
      this.statusOptions = options.sort();
  });
  },
  computed: {
    filteredFilms() {
      let termFilter = new RegExp(this.searchTerm, 'i')
      let statusFilter = new RegExp(this.filterStatus, 'i')

      if (this.filterStatus === "ALL" && this.searchTerm === "") {
        return this.movies
      } else if (this.filterStatus != "ALL" && this.searchTerm === "") {
        return this.movies.filter(el => {
          return el.Status.match(statusFilter)
        })
      } else if (this.filterStatus === "ALL" && this.searchTerm != "") {
        return this.movies.filter(el => {
          return el.TitleForSorting.toString().match(termFilter)
        })
      } else {
        return this.movies.filter(el => {
          return el.Status.match(statusFilter) && el.TitleForSorting.toString().match(termFilter)
        })
      }
    },
    listLength() {
      return this.filteredFilms.length
    }
  },
  components: {
    MovieCard
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

.title-wrapper {
  text-align: center;
}

.app-title {
  font-family: var(--title-font);
  font-size: var(--h1-size);
  color: white;
}

.app-subtitle {
  font-size: 23.5px;
  color: var(--subtitle);
  transform: translateY(-8px);
}

.first-word {
  text-shadow: 0px 4px var(--approved);
}

.second-word {
  text-shadow: 0px 4px var(--denied);
  margin: 0px 0px 0px 10px;
}

.movie-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 10px;
  row-gap: 10px;
  margin: 0px 40px;
}

.film-count {
  font-weight: 900;
  padding: 10px;
  font-size: 18px;
}

.filter-container {
  font-family: 'IBM Plex Sans', sans-serif;
  position: sticky;
  background-color: var(--bg-color);
  opacity: 0.9;
  top: 0;
  text-align: center;
  padding: 10px 0px 20px 0px;
}

.filter-btn {
  padding: 10px;
  background-color: var(--bg-color);
  border: none;
  margin: 10px;
}

.filter-btn:hover {
  background-color: var(--bg-color);
  cursor: pointer;
}

select {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 16px;
  padding: 10px;
  margin: 10px;
  font-weight: 900;
}

input {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 16px;
  padding: 10px;
  margin: 10px;
  width: 60%;
  font-weight: 900;
}

@media only screen and (max-width: 900px) { 

  .movie-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    margin: 0px 10px;
  }


  .title-container {
    display: grid;
  }

  .second-word {
    text-shadow: 0px 4px var(--denied);
    margin: 0px 0px 0px 10px;
    transform: translateY(-22px);
  }

  .app-subtitle {
    font-size: 23.5px;
    color: var(--subtitle);
    transform: translateY(-18px);
  }

}

</style>

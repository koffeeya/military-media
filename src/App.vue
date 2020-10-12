<template>
<div id="app">
  <h1 class='app-title'>Military Movie Database</h1>
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

  <div class='movie-container'>
  <MovieCard v-for="movie in filteredFilms"
      :key="movie.Title + movie.Year"
      :Title="movie.Title"
      :Remarks="movie.Remarks"
      :Year="movie.Year"
      :Status="movie.Status">
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
      const parsed = data.filter(el => {return el.Status != null && el.Title != null}).sort((a, b) => {return a.Title - b.Title});
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
          return el.Title.toString().match(termFilter)
        })
      } else {
        return this.movies.filter(el => {
          return el.Status.match(statusFilter) && el.Title.toString().match(termFilter)
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
#app {
  font-family: 'IBM Plex Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}

.app-title {
  text-align: center;
}

.movie-container {
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: sticky;
  background-color: white;
  opacity: 0.9;
  top: 0;
  text-align: center;
  padding: 10px 0px 20px 0px;
}

.filter-btn {
  padding: 10px;
  background-color: lightgray;
  border: none;
  margin: 10px;
}

.filter-btn:hover {
  background-color: gray;
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
.movie-container {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 10px;
}

}

</style>

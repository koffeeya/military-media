d<template>
<div class='browse-title'>
  <h2>BROWSE FILMS</h2>
</div>
  <div class='filter-container'>
    <div class='filter-wrap'>
    <select v-model="filterStatus" placeholder='ALL'>
      <option v-for="status in statusOptions" :key="status">
        {{status}}
      </option>
    </select>
      <input v-model='searchTerm' placeholder='Search for a film by name'>
      </div>
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
            :Plot="movie.PlotShort"
            :Awards="movie.Awards"
            :Actors="movie.Actors"
            :Director="movie.Director">
        </MovieCard>
    </div>
</template>

<script>
import MovieCard from '../components/MovieCard.vue'

export default {
    name: 'BrowseFilms',
    props: ['movies', 'statusOptions'],
    data() {
        return {
        searchTerm: "",
        searchTopic: "",
        filterStatus: "ALL",
        pluralFilms: "films",
        sectionOpen: true,
    }
  },
  method: {
    toggleSection() {
      this.sectionOpen = !this.sectionOpen;
    },
  },
  computed: {
      toggleShow() {
          if (this.sectionOpen === true) {
              return "browser-wrapper show"
          } else {
              return "browser-wrapper hide"
          }
      },
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

<style scoped>
.browse-title {
  text-align: center;
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

    .filter-wrap{
      display: grid;
      grid-template-columns: 1fr 4fr;
      column-gap: 5px;
      margin:0px 10px 0px 10px;
    }

    select {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 12px;
      padding: 5px;
      margin: 5px;
      font-weight: 900;
      width: 100%;
    }

    input {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 12px;
      padding: 5px;
      margin: 5px;
      font-weight: 900;
      width: 90%;
    }

    .film-count {
      font-weight: 900;
      padding: 0px;
      font-size: 14px;
    }
  }

</style>

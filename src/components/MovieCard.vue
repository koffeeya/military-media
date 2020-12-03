<template>
<!-- Movie card standard v-on:click="openModal" -->
<div class='movie-card' :class="[cardStyle]">
  <div class='col1'>
    <div v-if="Poster != null" class='image-wrapper'>
      <div><img :src="posterUrl"></div>
    </div>
    <div v-else class='poster-placeholder'>NO POSTER<br>AVAILABLE</div>
  </div>
  <div class='col2'>
    <div class='card-wrapper'>
      <!-- Movie Status -->
      <div class='movie-status-wrapper'>
        <div class='movie-status' :class="movieStatus">{{ Status }}</div>
      </div>
      <!-- Title -->
      <div class='movie-title'>{{ Title }}</div>
      <!-- Subtitle -->
      <div class='movie-subtitle-wrapper'>
        <div v-if="FilmReleased === 'TRUE'" class='movie-subtitle'><b :class="textStyle">{{ Year }}</b> &nbsp;|&nbsp; <b :class="textStyle">{{ ratingImdb }} / 10</b>&nbsp; (IMDb, {{ imdbVotes }} votes)</div>
        <div v-else class='movie-subtitle'><b>FILM NOT RELEASED</b></div>
      </div>
      <!-- Remarks -->
      <div class='remarks-wrapper'>
        <div class='movie-label' :class="textStyle">DOD REMARKS</div>
        <div class='movie-remarks'>"{{ Remarks }}"</div>
      </div>
      <!-- Plot -->
      <div v-if="Plot != null" class='plot-wrapper'>
        <div class='movie-label' :class="textStyle">PLOT</div>
        <div v-if="Plot != null" class='movie-plot'>{{ Plot }}</div>
      </div>
      <div v-else></div>
      <!-- Awards -->
      <div v-if="Awards != null" class='movie-subtitle-wrapper'>
        <div class='movie-label' :class="textStyle">AWARDS</div>
        <div class='movie-plot'>{{ Awards }}</div>
      </div>
      <div v-else></div>
      <!-- Cast & Crew -->
      <div v-if="Actors != null" class='movie-subtitle-wrapper'>
        <div class='movie-label' :class="textStyle">CAST & CREW</div>
        <div class='movie-plot'><b style='color:gray; font-weight:400;'>Starring:&nbsp;</b> {{ Actors }}</div>
        <div class='movie-plot'><b style='color:gray; font-weight:400;'>Directed By:&nbsp;</b> {{ Director }}</div>
      </div>
      <div v-else></div>
      <!-- Genres -->
      <div class='genre-wrapper'>
        <GenreButton v-for="genre in genreList" :key="genre" :genre="genre" :movieStatus="Status"></GenreButton>
      </div>
      
    </div>
  </div>
</div>

</template>

<script>
import * as d3 from "d3";
import GenreButton from './GenreButton.vue'
export default {
  name: 'MovieCard',
  props: ['Title', 'Remarks', 'Year', 'FilmReleased', 'Genre', 'ratingImdb', 'imdbVotes', 'Status', 'Poster', 'Plot', 'Awards', 'Actors', 'Director'],
  data: function () {
    return {
      openStatus: false,
    }
  },
  methods: {
    openModal() {
      d3.selectAll(".movie-card-modal").classed("hide", true);
      d3.select(".page-wrapper").classed('bg-open', true)
      this.openStatus = true;
    },
    closeModal() {
      d3.select(".page-wrapper").classed('bg-open', false)
      this.openStatus = false;
    }
  },
  computed: {
    genreList() {
      if (this.Genre != null) {
        const genreArray = this.Genre.split(", ");
        return genreArray;
      } else {
        return "";
      }
    },
    /* modalStatus() {
      if (this.openStatus === true) {
        return "movie-card-modal appear"
      } else {
        return "movie-card-modal disappear hide"
      }
    }, */
    movieStatus() {
      if (this.Status === "APPROVED") {
        return "approved"
      } else if (this.Status === "DENIED") {
        return "denied"
      } else if (this.Status === "LIMITED") {
        return "limited"
      } else {
        return "other"
      }
    },
    cardStyle() {
      if (this.Status === "APPROVED") {
        return "card-approved"
      } else if (this.Status === "DENIED") {
        return "card-denied"
      } else if (this.Status === "LIMITED") {
        return "card-limited"
      } else {
        return "card-other"
      }
    },
    textStyle() {
      if (this.Status === "APPROVED") {
        return "text-approved"
      } else if (this.Status === "DENIED") {
        return "text-denied"
      } else if (this.Status === "LIMITED") {
        return "text-limited"
      } else {
        return "text-other"
      }
    },
    moviePlot() {
      let wordLimit = 15;
      let plotSplit = this.Plot.split(' ');
      if (plotSplit.length <= wordLimit) {
        return this.Plot;
      } else {
        const selectedWords = plotSplit.slice(0, wordLimit)
        selectedWords.push("...")
        const shortPlot = selectedWords.join(' ')
        return shortPlot;
      }
    },
    moviePlotModal() {
      return this.Plot;
    },
    movieRemarks() {
      let wordLimit = 35;
      let remarksSplit = this.Remarks.split(' ');
      if (remarksSplit.length <= wordLimit) {
        return this.Remarks;
      } else {
        const selectedWords = remarksSplit.slice(0, wordLimit)
        selectedWords.push("...")
        const shortRemarks = selectedWords.join(' ')
        return shortRemarks;
      }
    },
    movieRemarksModal() {
      return this.Remarks;
    },
    posterUrl() {
      return this.Poster
    },
  },
  components: {
    GenreButton
  }
};
</script>


<style scoped>

.hide {
  position: absolute !important;
  top: -9999px !important;
  left: -9999px !important;
}

.movie-card {
  padding: 10px;
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  background-color: var(--accent);
  color: var(--text);
  border-radius: 5px;
  overflow: auto;
}

.movie-card:hover {
  cursor: pointer;
}

/* .movie-card-modal {
  padding: 10px;
  margin: 10px auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  background-color: var(--accent);
  color: var(--text);
  position: fixed;
  left: 33%;
  top: 25%;
  z-index: 2;
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  overflow: auto;
  opacity: 1;
  border-radius: 5px;
} */


.movie-card-modal:hover {
  cursor: pointer;
}

.card-approved, .card-denied, .card-limited, .card-other {
  border: 2px solid var(--accent);
  box-shadow: 5px 5px var(--bg-color);
}

.card-approved:hover {
  border: 2px solid var(--approved);
  box-shadow: 5px 5px var(--approved);
}

.card-denied:hover {
  border: 2px solid var(--denied);
  box-shadow: 5px 5px var(--denied);
}

.card-limited:hover {
  border: 2px solid var(--limited);
  box-shadow: 5px 5px var(--limited);
}

.card-other:hover {
  border: 2px solid var(--other);
  box-shadow: 5px 5px var(--other);
}


.approved {
  background-color: var(--approved);
}

.denied {
  background-color: var(--denied);
}

.limited {
  background-color: var(--limited);
}

.other {
  background-color: var(--other);
}

.text-approved {
  color: var(--approved);
}

.text-denied {
  color: var(--denied);
}

.text-limited {
  color: var(--limited);
}

.text-other {
  color: rgb(153, 151, 151);
}

.movie-title {
  font-family: var(--title-font);
  font-size: var(--h2-size);
  color: white;
  font-size: 25px;
  font-weight: 900;
  padding: 5px 0px;
  line-height: 23px;
}

.movie-subtitle {
  font-size: var(--root-size);
  font-family: var(--card-font);
  padding: 5px 0px 10px 0px;
  color: var(--subtitle);
  line-height: 12px;
}

.movie-status {
  font-size: 16px;
  font-family: var(--card-font);
  width: fit-content;
  margin: 0px 0px 10px 0px;
  padding: 2px 4px 2px 4px;
  color: var(--bg-color);
  font-weight: 900;
}

.movie-label {
  font-size: var(--subtitle-size);
  font-family: var(--card-font);
  margin: 15px 0px 2px 0px;
}

.movie-remarks, .movie-plot {
  font-size: 12px;
  font-family: var(--card-font);
  text-align: left;
}

img {
  max-height: 300px;
  margin: 0px 20px 10px 0px;
  border: 0.5px solid grey;
}

.poster-placeholder {
  width: 80%;
  height: 50%;
  background-color: var(--bg-color);
  color: var(--accent);
  font-size: var(--root-size);
  font-weight: 900;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.genre-wrapper {
  display: flex;
  flex-flow: row wrap;
  margin: 15px 3px;
}

@media only screen and (max-width: 900px) { 
  .movie-container {
    padding: 10px;
    margin: 5px 0px 5px 0px;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    background-color: var(--accent);
    color: var(--text);
    border-radius: 5px;
  }

  .movie-card-modal {
    margin: 20px auto;
    position: fixed;
    left: 12%;
    top: 25%;
    width: 70%;
    max-height: 60vh;
  }

}

@media only screen and (max-height: 411px) { 

  .movie-card-modal {
    margin: 20px auto;
    position: fixed;
    left: 10%;
    top: 10%;
    width: 90%;
    max-height: 70vh;
  }

}


</style>

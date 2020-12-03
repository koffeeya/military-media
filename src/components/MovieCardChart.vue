<template>
<!-- Movie card standard -->
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
      <div class='movie-title-chart'>{{ Title }}</div>
      <!-- Subtitle -->
      <div class='movie-subtitle-wrapper'>
        <div v-if="FilmReleased === 'TRUE'" class='movie-subtitle'><b :class="textStyle">{{ Year }}</b> &nbsp;|&nbsp; <b :class="textStyle">{{ ratingImdb }} / 10</b>&nbsp; (IMDb, {{ imdbVotes }} votes)</div>
        <div v-else class='movie-subtitle'><b>FILM NOT RELEASED</b></div>
      </div>
      <!-- Remarks -->
      <div class='remarks-wrapper'>
        <div class='movie-label' :class="textStyle">DOD REMARKS</div>
        <div class='movie-remarks-chart'>"{{ movieRemarks }}"</div>
      </div>
      <div class='click-callout'>CLICK FOR MORE DETAILS</div>
    </div>
  </div>
</div>

</template>

<script>
import * as d3 from "d3";
export default {
  name: 'MovieCardChart',
  props: ['Title', 'TitleClass', 'Remarks', 'Year', 'FilmReleased', 'Genre', 'ratingImdb', 'imdbVotes', 'Status', 'Poster', 'Plot', 'Awards', 'Actors', 'Director'],
  data: function () {
    return {
    }
  },
  methods: {
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
    movieRemarks() {
      let wordLimit = 45;
      let remarksSplit = this.Remarks.split(' ');
      if (remarksSplit.length <= wordLimit) {
        return this.Remarks;
      } else {
        const selectedWords = remarksSplit.slice(0, wordLimit)
        selectedWords.push(" ... ")
        const shortRemarks = selectedWords.join(' ')
        return shortRemarks;
      }
    },
    posterUrl() {
      return this.Poster
    },
  },
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
  grid-template-columns: 1fr 1.5fr;
  background-color: var(--accent);
  color: var(--text);
  border-radius: 5px;
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

.movie-title-chart {
  font-family: var(--title-font);
  font-size: 18px;
  color: white;
  font-weight: 900;
  padding: 5px 0px;
  line-height: 20px;
}

.movie-subtitle {
  font-size: var(--root-size);
  font-family: var(--card-font);
  padding: 5px 0px 10px 0px;
  color: var(--subtitle);
  line-height: 12px;
}

.click-callout {
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

.movie-remarks-chart {
  font-size: 10px;
  font-family: var(--card-font);
  text-align: left;
}

img {
  max-height: 200px;
  max-width: 200px;
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

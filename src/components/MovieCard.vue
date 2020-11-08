<template>
<div class='movie-card' :class="cardStyle">
  <div class='col1'>
    <div v-if="Poster != null" class='image-wrapper'>
      <div><img :src="posterUrl"></div>
    </div>
    <div v-else class='poster-placeholder'></div>

  </div>
  <div class='col2'>
    <div class='card-wrapper'>

      <div class='movie-status-wrapper'>
        <div class='movie-status' :class="movieStatus">{{ Status }}</div>
      </div>

      <div class='movie-title'>{{ Title }}</div>

      <div class='movie-subtitle-wrapper'>
        <div v-if="FilmReleased === 'TRUE'" class='movie-subtitle'><b>{{ Year }}</b> &nbsp;|&nbsp; <b>{{ ratingImdb }}</b> / 10&nbsp; (IMDb, {{ imdbVotes }} votes) &nbsp;|&nbsp; <b>{{ Genre }}</b></div>
        <div v-else class='movie-subtitle'><b>FILM NOT RELEASED</b></div>
      </div>

      <div class='remarks-wrapper'>
        <div class='movie-label'>DOD REMARKS</div>
        <div class='movie-remarks'>"{{ Remarks }}"</div>
      </div>


      <div v-if="Plot != null" class='plot-wrapper'>
        <div class='movie-label'>PLOT</div>
        <div v-if="Plot != null" class='movie-remarks'><i>{{ moviePlot }}</i></div>
      </div>
      <div v-else></div>
      
    </div>
  </div>
  
</div>
</template>

<script>
export default {
  props: ['Title', 'Remarks', 'Year', 'FilmReleased', 'Genre', 'ratingImdb', 'imdbVotes', 'Status', 'Poster', 'Plot'],
  methods: {
    handleClick() {
      this.count++;
      if (this.count === 1) {
        this.plural = "time"
      } else {
        this.plural = "times"
      }
    },
  },
  computed: {
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
      
    posterUrl() {
      return this.Poster
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.movie-card {
  padding: 10px;
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  background-color: var(--accent);
  color: var(--text);
  border-radius: 5px;
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
  padding: 5px 0px 10px 0px;
  color: var(--subtitle);
  line-height: 12px;
}

.movie-status {
  font-size: 16px;
  width: fit-content;
  margin: 0px 0px 10px 0px;
  padding: 2px 4px 2px 4px;
  color: var(--bg-color);
  font-weight: 900;
}

.movie-label {
  font-size: var(--subtitle-size);
  color: var(--subtitle);
  margin: 15px 0px 2px 0px;
}

.movie-remarks {
  font-size: 12px;
  text-align: left;
}

img {
  max-width: 85%;
  max-height: 200px;
  margin: 0px 20px 0px 0px;
  border: 0.5px solid var(--bg-color);
}

.poster-placeholder {
  width: 85%;
  height: 200px;
  background-color: var(--bg-color);
}


</style>

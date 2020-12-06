<template>
<!-- Movie card standard -->
<div class='movie-card-carousel' :class="[cardStyle, carouselClass]" v-on:click="openModal">
  <div class='col1'>
    <div v-if="Poster != null" class='image-wrapper'>
      <div><img class='img-poster' :src="posterUrl"></div>
    </div>
    <div v-else class='poster-placeholder'>NO POSTER<br>AVAILABLE</div>
  </div>
  <div class='col2'>
    <div class='card-wrapper'>
      <!-- Movie Status -->
      
      <!-- Title -->
      <div class='movie-title'>{{ Title }} <b style='color:gray; font-size: 14px;'>({{ Year }})</b></div>
      <!-- Remarks -->
      <div class='movie-status-wrapper'>
          <div class='movie-label'>Request For Cooperation:</div>
        <div class='movie-status' :class="movieStatus">{{ Status }}</div>
      </div>
      <div class='remarks-wrapper'>
          <div class='movie-label'>Military Remarks:</div>
        <div class='movie-remarks'>"{{ Snippet }}"</div>
      </div>
    </div>
  </div>
</div>


</template>

<script>
/* import * as d3 from "d3"; */
export default {
  name: 'MovieCardCarousel',
  props: ['Title', 'TitleClass', 'Remarks', 'Snippet', 'CarouselOrder', 'Year', 'FilmReleased', 'Genre', 'ratingImdb', 'imdbVotes', 'Status', 'Poster', 'Plot'],
  data: function () {
    return {
      openStatus: false,
    }
  },
  computed: {
    carouselClass() {
        return "order" + this.CarouselOrder
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
    posterUrl() {
      return this.Poster
    },

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hide {
  position: absolute !important;
  top: -9999px !important;
  left: -9999px !important;
}

.movie-card-carousel {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr;
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
  font-size: 12px;
  font-family: var(--card-font);
  margin: 15px 0px 2px 0px;
}

.movie-remarks, .movie-plot {
  font-size: 12px;
  font-family: var(--card-font);
  text-align: left;
}

img {
  width: auto;
  height: 200px;
  margin: 0px 20px 10px 0px;
  border: 0.5px solid grey;
}

@media only screen and (max-width: 500px) {
  .image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    height: 125px;
    width: auto;
    margin: 0px 20px 10px 0px;
    border: 0.5px solid grey;
  }

  .movie-card-carousel {
    grid-template-columns: 1fr;
  }
}


</style>

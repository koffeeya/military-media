<template>
  <div class="waffle-item" @mouseover=onMouseOver @mouseleave=onMouseLeave :class="[{ active: hover }, movieStatus]"></div>
  <div class="hover-message" :style="{ x: +tooltipLocation[0] + 'px', y: +tooltipLocation[1] + 'px' }" v-if="hover">
    <div class='movie-card-chart'>
      <MovieCardChart
            :key="Title + Year + 'chart'"
            :Title="Title"
            :Remarks="Remarks"
            :Year="Year"
            :Status="Status"
            :Poster="Poster"
            :Genre="Genre"
            :ratingImdb="ratingImdb"
            :imdbVotes="imdbVotes"
            :FilmReleased="FilmReleased"
            :Plot="Plot"
            :Awards="Awards"
            :Actors="Actors"
            :Director="Director">
        </MovieCardChart>
    </div>
  </div>
    
  
</template>

<script>
import * as d3 from 'd3'
import MovieCardChart from '../components/MovieCardChart.vue'
export default {
  name: "WaffleItem",
  props: [
    "Title",
    "Remarks",
    "Year",
    "FilmReleased",
    "Genre",
    "ratingImdb",
    "imdbVotes",
    "Status",
    "Poster",
    "Plot",
    "Awards",
    "Actors",
    "Director",
  ],
  data() {
    return {
      hover: false,
      x: 0,
      y: 0,
    };
  },
  computed: {
    movieStatus() {
      if (this.Status === "APPROVED") {
        return "approved-waffle";
      } else if (this.Status === "DENIED") {
        return "denied-waffle";
      } else if (this.Status === "LIMITED") {
        return "limited-waffle";
      } else if (this.Status === "OTHER") {
        return "other-waffle";
      } else {
        return "none-waffle";
      }
    },

    tooltipLocation() {
      if (this.hover === false) {
        return [0, 0];
      } else {
        return [this.x, this.y];
      }
    },

    tooltipTranslate() {
      const waffleChart = document.getElementById("waffle-chart")
      const waffleRect = waffleChart.getBoundingClientRect();
      const waffleWidth = waffleRect.width;
      const minWidth = waffleWidth * 0.3;
      const maxWidth = waffleWidth * 0.9;
      const yHeight = 350;
      if (this.x > maxWidth) {
        return `translate(-350px, -${yHeight}px);`
      } else if (this.x < minWidth) {
        return `translate(-100px, -${yHeight}px);`
      } else {
        return `translate(-275px, -${yHeight}px)`
      }
    }
  },
  methods: {
    onClick() {
      console.log("clicked");
      this.click = true;
    },
    onMouseOver() {
      this.hover = true;
      this.x = +event.x;
      this.y = +event.y;
    },
    onMouseLeave() {
      this.hover = false;
      this.bottom = 0;
    },
  },
  components: {
    MovieCardChart
  }
};
</script>

<style scoped>
.hide-waffle {
  opacity: 0.05;
}

.movie-card-chart {
  width: 400px;
  overflow: hidden;
}

.hover-message {
  position: absolute;
  background-color: var(--bg-color);
  font-family: var(--card-font);
  transform: translate(-415px, -40px);
}

.active {
  cursor: pointer;
  opacity: 0.7;
}

.waffle-item {
  height: 15px;
  border: 1px solid var(--bg-color);
}

.approved-waffle {
  background-color: var(--approved);
  /* opacity: 0.4; */
}

.denied-waffle {
  background-color: var(--denied);
  /* opacity: 0.4; */
}

.limited-waffle {
  background-color: var(--limited);
  /* opacity: 0.4; */
}

.other-waffle {
  background-color: var(--other);
  /* opacity: 0.4; */
}

.none-waffle {
  background-color: transparent;
  display: none;
}
</style>

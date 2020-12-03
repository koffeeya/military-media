<template>
  <div class="waffle-item" @mouseover=onMouseOver @mouseleave=onMouseLeave @click=onClick :class="[{ active: hover }, movieStatus, TitleClass]"></div>
    <div class="hover-message" :class="tooltipTranslate" v-if="hover">
      <div class='movie-card-chart'>
        <MovieCardChart
              :key="TitleClass + '-waffleChart'"
              :Title="Title"
              :TitleClass="TitleClass"
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

    <div class='waffle-movie-card' v-if="clicked" @click="onMovieCardClick">
      <MovieCard
            :key="TitleClass + '-modalChart'"
            :Title="Title"
            :TitleClass="TitleClass"
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
        </MovieCard>
    </div>
    
</template>

<script>
import * as d3 from 'd3'
import MovieCardChart from '../components/MovieCardChart.vue'
import MovieCard from '../components/MovieCard.vue'
export default {
  name: "WaffleItem",
  props: [
    "Title",
    "TitleClass",
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
      clicked: false,
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

    genreStatus() {
      const genreClasses = [];
      if (this.Genre != null) {
        const split = this.Genre.split(",");
        split.map((value) => {
          if (value != null) {
            const cleaned = value.replace(/[^A-Z0-9]/ig, "").toLowerCase().trim()
            genreClasses.push(`.genre-${cleaned}`)
          }
        })
      }
      return genreClasses;
    },

    tooltipTranslate() {
      const waffleChart = document.getElementById("waffle-chart")
      const waffleRect = waffleChart.getBoundingClientRect();
      const waffleWidth = waffleRect.width;
      const minWidth = waffleWidth * 0.5;
      if (this.x < minWidth) {
        return "transformMinWidth"
      } else {
        return "transformNormal"
      }
    },

    movieCardTranslate() {
      const waffleChart = document.getElementById("waffle-chart")
      const waffleRect = waffleChart.getBoundingClientRect();
      const waffleWidth = waffleRect.width;
      const minWidth = waffleWidth * 0.5;
      if (this.x < minWidth) {
        return "transformMinWidth"
      } else {
        return "transformNormal"
      }
    }
  },
  methods: {
    onMouseOver() {
      this.hover = true;
      this.x = +event.x;
      this.y = +event.y;
    },
    onMouseLeave() {
      this.hover = false;
    },
    onClick() {
      this.hover = false;
      this.clicked = true;
      d3.selectAll(".waffle-movie-card").style("opacity", "0");
      d3.selectAll(".waffle-movie-card").classed('hide', true);
      d3.selectAll(".waffle-item, .year-val, .waffle-axis-title, .waffle-text")
        .style("opacity", "1")
        .transition()
        .duration(150)
        .style("opacity", "0.3");
    },
    onMovieCardClick() {
      this.clicked = false;
      d3.selectAll(".waffle-movie-card").style("opacity", "0");
      d3.selectAll(".waffle-movie-card").classed('hide', true);
      d3.selectAll(".waffle-item").style('opacity', 1);
      d3.selectAll(".waffle-item, .year-val, .waffle-axis-title, .waffle-text")
        .style("opacity", "0.3")
        .transition()
        .duration(150)
        .style("opacity", "1");
    }
  },
  components: {
    MovieCardChart,
    MovieCard
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

.waffle-movie-card {
  width: 40%;
  z-index: 3;
  position: absolute;
  top: 15%;
  left: 30%;
  margin: 10px auto;
  height: 600px;
  overflow: auto;
}

.hover-message {
  position: absolute;
  background-color: var(--bg-color);
  font-family: var(--card-font);
}

.transformMinWidth {
  transform: translate(25px, -250px);
}

.transformNormal {
  transform: translate(-415px, -250px);
}

.active {
  cursor: pointer;
  opacity: 0.7;
}

.waffle-item {
  height: 20px;
  border: 1px solid var(--bg-color);
}

.waffle-item:hover {
  border: 1px solid white;
}

.approved-waffle {
  background-color: var(--approved);
}

.denied-waffle {
  background-color: var(--denied);
}

.limited-waffle {
  background-color: var(--limited);
}

.other-waffle {
  background-color: var(--other);
}

.none-waffle {
  background-color: transparent;
  display: none;
}

</style>

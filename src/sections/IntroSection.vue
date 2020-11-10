<template>
<div class='intro-wrapper'>
  <div class='intro-text-wrapper'>
      <div class='intro-text'>
        <div class='intro-text-p1'>
          Hollywood producers have been requesting support from the U.S. military for over 100 years. But the military doesn’t always cooperate.
        </div>
        <br>
        <div class='intro-text-p2'>
          This project explores a database of <b style='color: var(--denied)'>{{ totalLength }} films</b> from the last century that <b style='color: var(--denied)'>requested production support from the U.S. military</b>.  What kinds of support does the military provide? What films make the cut, and why?
        </div>
        <br>
        <div>Scroll down to explore.</div>
      </div>
    </div>

    <div class='movie-wrapper'>
      <button class='carousel-button' @click="previousCard">LEFT</button>
          <CarouselMovieCard v-for="movie in carouselData"
              :key="movie.TitleClean + movie.Year"
              :CarouselOrder="movie.CarouselOrder"
              :Title="movie.TitleClean"
              :Remarks="movie.Remarks"
              :Snippet="movie.CarouselSnippet"
              :Year="movie.Year"
              :Status="movie.Status"
              :Poster="movie.Poster"
              :Genre="movie.Genre"
              :ratingImdb="movie.ratingImdb"
              :imdbVotes="movie.imdbVotes"
              :FilmReleased="movie.FilmReleased"
              :Plot="movie.Plot">
          </CarouselMovieCard>
        <button class='carousel-button' @click="nextCard">RIGHT</button>
    </div>
</div>
</template>

<script>
import CarouselMovieCard from '../components/CarouselMovieCard.vue'
import * as d3 from "d3";
export default {
    name: 'IntroSection',
    props: ['carouselData', 'movies'],
    data () {
      return {
        activeCard: 1,
      }
    },
    methods: {
      previousCard() {
        if (this.activeCard > 1) {
          this.activeCard -= 1
          console.log(this.activeCard, this.carouselHidden)
        } else if (this.activeCard === 1) {
          this.activeCard = 5
          console.log(this.activeCard)
        }

        d3.selectAll(`.order${this.activeCard}`)
          .style("opacity", "0")
          .transition()
          .duration(200)
          .style("opacity", "1");
        
        d3.selectAll(`.order${this.activeCard}`).classed("hide", false);

        this.carouselHidden.map((n) => {
          d3.selectAll(`.order${n}`)
            .style("opacity", "1")
            .transition()
            .duration(100)
            .style("opacity", "0");
          d3.selectAll(`.order${n}`).classed("hide", true);
        })

      },
      nextCard() {
        if (this.activeCard < this.carouselLength)  {
          this.activeCard += 1
          console.log(this.activeCard)
        } else if (this.activeCard === this.carouselLength) {
          this.activeCard = 1
          console.log(this.activeCard)
        }

        d3.selectAll(`.order${this.activeCard}`)
          .style("opacity", "0")
          .transition()
          .duration(200)
          .style("opacity", "1");
        
        d3.selectAll(`.order${this.activeCard}`).classed("hide", false);

        this.carouselHidden.map((n) => {
          d3.selectAll(`.order${n}`)
            .style("opacity", "1")
            .transition()
            .duration(100)
            .style("opacity", "0");
          d3.selectAll(`.order${n}`).classed("hide", true);
        })
      }
    },
    computed: {
      carouselLength() {
        return this.carouselData.length
      },
      carouselArray() {
        const n = this.carouselData.length
        return Array.from(Array(n).keys()).map(i => i + 1)
      },
      carouselHidden() {
        const n = this.carouselData.length
        const arr = Array.from(Array(n).keys()).map(i => i + 1)
        const remaining = arr.filter((d) => {
          return d != this.activeCard;
        })
        return remaining;
      },
      totalLength() {
        return this.movies.length
      }
    },
    mounted() {
      d3.selectAll(`.order1`).classed("hide", false);
      this.carouselHidden.map((n) => {
          d3.selectAll(`.order${n}`)
            .style("opacity", "1")
            .transition()
            .duration(100)
            .style("opacity", "0");
          d3.selectAll(`.order${n}`).classed("hide", true);
        })
    },
    components: {
      CarouselMovieCard,
    }
}
</script>

<style scoped>

.hide {
  position: absolute !important;
  top: -9999px !important;
  left: -9999px !important;
}

.intro-wrapper {
  margin: 10px 0px 500px 0px;
}

.intro-text {
  padding: 25px;
  border: 2px solid var(--denied);
  width: 30%;
  margin: 0% 0% 5% 0%;
  text-align: center;
  box-shadow: 5px 5px var(--denied);
}

.intro-text-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.movie-wrapper {
  display: flex;
  margin: 0% 25% 10% 34%;
  max-width: 600px;
}

</style>

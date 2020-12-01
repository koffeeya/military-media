<template>
  <div class='intro-container' :data-index='index'>
    <div class='first-col'>
      <IntroText />
    </div>
    <div class='second-col'>
      <div class='carousel-text-wrapper center'>
        <div class='carousel-text'>Examples of films in the database:</div>
      </div>
      <div class='carousel-icon-wrapper center'>
        <div class='carousel-icons'>{{ icons }}</div>
      </div>
      <div class='carousel-wrapper'>
        <button class='carousel-button' @click="previousCard">&#x25C0;</button>
        <div>
        <MovieCardCarousel v-for="movie in carouselData"
            :key="movie.CarouselOrder + movie.TitleClean + movie.Year + ' carouselItem'"
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
            >
          </MovieCardCarousel>
          </div>
        <button class='carousel-button' id='next-button' @click="nextCard">&#x25B6;</button>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCardCarousel from '../components/MovieCardCarousel.vue'
import IntroText from '../components/IntroText.vue'
import * as d3 from "d3";
export default {
    name: 'IntroSection',
    props: ['observer', 'stepList', 'index', 'carouselData'],
    data () {
      return {
        thisStep: this.stepList[this.index],
        activeCard: 1,
      }
    },
    methods: {
      previousCard() {
        if (this.activeCard > 1) {
          this.activeCard -= 1
        } else if (this.activeCard === 1) {
          this.activeCard = 6
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
        } else if (this.activeCard === this.carouselLength) {
          this.activeCard = 1
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
      icons() {
        const inactiveIcon = "○"
        const activeIcon = "●"
        const items = [];
        const n = this.carouselData.length
        const arr = Array.from(Array(n).keys()).map(i => i+1)
        arr.map((value) => {
          if (value === this.activeCard) {
            items.push(activeIcon)
          } else {
            items.push(inactiveIcon)
          }
        })
        return items.join(' ');
      },
      carouselLength() {
        return this.carouselData.length
      },
      carouselHidden() {
        const n = this.carouselData.length
        const arr = Array.from(Array(n).keys()).map(i => i + 1)
        const remaining = arr.filter((d) => {
          return d != this.activeCard;
        })
        return remaining;
      }
    },
    mounted() {
      this.observer.observe(this.$el);
    },
    components: {
      MovieCardCarousel,
      IntroText
    }
}
</script>

<style scoped>

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hide {
  position: absolute !important;
  top: -9999px !important;
  left: -9999px !important;
}

.intro-container {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
}

.first-col {
  margin: 0px 60px 0px 100px;
}

.second-col {
  margin: 15vh 0px;
}

.carousel-icon-wrapper {
  color: rgb(153, 151, 151);
}

.carousel-wrapper {
  display: grid;
  grid-template-columns: 0.5fr 5fr 0.5fr;
  margin: 10px 100px;
}

.carousel-text {
  margin: 0px 0px 10px 0px;
  color: var(--subtitle);
}

.carousel-button {
  font-family: var(--title-font);
  font-size: 30px;
  color: var(--accent);
  background-color: var(--bg-color);
  border: none;
}

.carousel-button:hover {
  color: var(--bg-color);
  background-color: var(--accent);
  cursor: pointer;
}

.carousel-button:focus {
  outline: none;
}

@media only screen and (max-width: 500px) { 
  .intro-container {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>

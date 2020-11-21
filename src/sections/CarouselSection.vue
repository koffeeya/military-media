<template>
    <div class='carousel-text-wrapper center'>
      <div class='carousel-text'>A few examples of films in the database:</div>
    </div>
    <div class='carousel-icon-wrapper center'>
      <div class='carousel-icons'>{{ icons }}</div>
    </div>
    <div class='carousel-wrapper'>
      <div class='spacer'></div>
      <button class='carousel-button' @click="previousCard">&#x25C1;</button>
      <CarouselMovieCard v-for="movie in carouselData"
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
        </CarouselMovieCard>
      <button class='carousel-button' id='next-button' @click="nextCard">&#x25B7;</button>
      <div class='spacer'></div>
    </div>
</template>

<script>
import CarouselMovieCard from '../components/CarouselMovieCard.vue'
import * as d3 from "d3";
export default {
    name: 'CarouselSection',
    props: ['carouselData'],
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
          this.activeCard = 6
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
    components: {
      CarouselMovieCard,
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

.carousel-icon-wrapper {
  color: rgb(153, 151, 151);
}

.carousel-wrapper {
  display: grid;
  grid-template-columns: 3fr 1fr 5fr 1fr 3fr;
  margin: 0px 0px 40px 0px;
}

.carousel-text {
  margin: 0px 0px 10px 0px;
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

@media only screen and (max-width: 900px) { 
    .carousel-wrapper {
      grid-template-columns: 0.1fr 0.5fr 5fr 0.5fr 0.1fr;
    }
}

@media only screen and (min-width: 1400px) { 
    .carousel-wrapper {
      grid-template-columns: 7fr 0.5fr 5fr 0.5fr 7fr;
    }
}

</style>

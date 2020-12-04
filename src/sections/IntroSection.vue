<template>
  <div class='intro-container' :data-index='index'>
    <div class='first-col'>
        <div class='intro-text intro-first'>
          The U.S. Department of Defense (DoD) and Hollywood have a <a href='https://en.wikipedia.org/wiki/Military-entertainment_complex' target='_new'>history of cooperation</a> that has spanned the last century of entertainment. Films that need military resources must submit (and often revise) their scripts to meet <b style='color: var(--denied)'>criteria for approval</b> that implicitly reflect the values and interests of each branch of service.
        </div>
        <div class='intro-text intro-second'>
          This project explores a database -- acquired through a <a href='https://www.spyculture.com/dod-hollywood-collaboration-database-excerpts/' target='_new'>2016 FOIA request</a> -- of <b style='color: var(--denied)'>549 film productions</b> that asked the DoD for assistance in the last 100 years. What kind of help does the military provide? What films make the cut? And what does it reveal about the kinds of stories that get told?
        </div>
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
            :key="movie.TitleClass + '-carouselItem'"
            :CarouselOrder="movie.CarouselOrder"
            :Title="movie.TitleClean"
            :TitleClass="movie.TitleClass"
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
      MovieCardCarousel
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

a {
  color: var(--denied);
  font-weight: 600;
  text-decoration-color: var(--denied);
  text-decoration-thickness: .125em;
  text-underline-offset: 1.5px;
}

a:hover {
  color: white;
  text-decoration-color: white;
  cursor: pointer;
}

.intro-text {
  font-size: var(--body-size);
}

.intro-first, .intro-second {
  opacity: 1;
  margin: 10px 10px 40px;
}

.first-col {
  margin: 50px 0px 0px 100px;
}

.second-col {
  margin: 50px auto;
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
  .first-col {
    margin: 0px 60px 60px 60px;
  }

  .intro-container {
    display: grid;
    grid-template-columns: 1fr;
  }

  .second-col {
    margin: 0px;
  }
}
</style>

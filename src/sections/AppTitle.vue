<template>
  <div class='title-wrapper' :data-index='index'>
      <div class='title-words'>

        <div class='app-title'>ASSISTANCE DENIED</div>

        <div class='subtitle-text-wrapper'>
          <div class='app-subtitle subtitle-first'>A project exploring the 100-year history of <b class='subtitle-emphasis'>cooperation</b></div>
          <div class='app-subtitle subtitle-second'>between <b class='subtitle-emphasis'>Hollywood</b> and the <b class='subtitle-emphasis'>United States military</b></div>
          <div class='app-subtitle subtitle-third'>through a database of <b class='subtitle-emphasis'>549 films</b></div>
        </div>

        <div>
          <img class='film-gif' v-for="gif in gifList" :class="[gif.class, gif.status]" :key="gif.key" :src="gif.source" @mouseover=onMouseOver @mouseleave=onMouseLeave />
        </div>

        <div class="gif-message" v-if="hover" :style="gifHoverLocation">
          <MovieCardCarousel v-for="movie in gifMovieData"
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
            :FilmReleased="movie.FilmReleased">
          </MovieCardCarousel>
        </div>

      
        <div class='contents'>
          <div class='content-btn'>SCROLL DOWN</div>
        </div>
      </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import MovieCardCarousel from '../components/MovieCardCarousel.vue';
export default {
    name: 'AppTitle',
    props: ['observer', 'stepList', 'index', 'carouselData'],
    data() {
        return {
          step: this.stepList[this.index],
          gifList: [
            {
              source: "/1.gif",
              index: 1,
              key: "gif-1",
              class: "gif1",
              status: "gif-denied"
            },
            {
              source: "/2.gif",
              index: 2,
              key: "gif-2",
              class: "gif2",
              status: "gif-approved"
            },
            {
              source: "/3.gif",
              index: 3,
              key: "gif-3",
              class: "gif3",
              status: "gif-denied"
            },
            {
              source: "/4.gif",
              index: 4,
              key: "gif-4",
              class: "gif4",
              status: "gif-approved"
            },
            {
              source: "/5.gif",
              index: 5,
              key: "gif-5",
              class: "gif5",
              status: "gif-approved"
            }
          ],
          hover: false,
          activeGifTarget: null,
          left: 0,
          top: 0
      }
    },
    methods: {
      onMouseOver(e) {
        this.hover = true;
        this.activeGifTarget = e.target.classList[1];
        this.left = +e.target.offsetLeft;
        this.top = +e.target.offsetTop;
        // filter: grayscale(0%);
        d3.select(`.${this.activeGifTarget}`)
          .transition()
          .duration(400)
          .style("filter", "grayscale(0%)")
          
      },
      onMouseLeave() {
        this.hover = false;
        this.left = 0;
        this.top = 0;
        d3.select(`.${this.activeGifTarget}`)
          .transition()
          .duration(600)
          .style("filter", "grayscale(100%)")
        this.activeGifTarget = null;
      },
    },
    computed: {
      gifMovieData() {
        const filteredData = this.carouselData.filter((d) => {
          return d.CarouselOrder === this.activeGifTarget;
        })
        console.log(filteredData);
        return filteredData;
      },
      gifHoverLocation() {
        const loc = this.left - 125;
        return `transform: translateX(${loc}px)`
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

.gif-message {
  width: 450px;
  position: absolute;
  margin: 0;
  text-align: left;
}

.film-gif {
  width: 9%;
  filter: grayscale(100%);
  margin: 100px 5px 5px 5px;
  border-radius: 10px;
  border: 5px solid black;
}

.gif-approved:hover {
  border: 5px solid var(--approved);
}

.gif-denied:hover {
  border: 5px solid var(--denied);
}

.gif-other:hover {
  border: 5px solid var(--other);
}

.film-gif:hover {
  cursor: pointer;
}

@keyframes textflicker {
  from {
    text-shadow: 1px 0 0 var(--approved), -2px 0 0 var(--approved);
  }
  to {
    text-shadow: 2px 0.5px 2px var(--denied), -1px -0.5px 2px var(--denied);
  }
}

.title-wrapper {
  margin: 150px 0px 300px 0px;
}


.title-words {
  text-align: center;
  margin: 10px;
}

.app-title {
  font-family: var(--title-font);
  font-size: 100px;
  color: var(--denied);
  font-weight: 900;
  animation-duration: 0.01s;
  animation-name: textflicker;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.app-title:hover {
   color: var(--approved);
}

.app-subtitle {
  font-size: 30px;
  color: white;
}

.subtitle-text-wrapper {
  margin: 40px 0px 0px 0px;
}

.subtitle-emphasis {
  font-weight: 900;
  color: white;
  text-shadow: 0px 2px var(--denied);
  animation-duration: 0.01s;
  animation-name: textflicker;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.subtitle-emphasis:hover {
  color: var(--denied);
}

.subtitle-first {
  margin: 0px 10px 0px 10px;
  opacity: 0;
}

.subtitle-second {
  margin: 0px 10px 0px 10px;
  opacity: 0;
}

.subtitle-third {
  margin: 0px 10px 0px 10px;
  opacity: 0;
}

.content-btn {
  background-color: var(--bg-color);
  padding: 10px 20px;
  margin: 80px 20px;
  border: none;
  font-family: var(--card-font);
  font-weight: 900;
  color: var(--denied);
}

.content-btn:hover {
  color: var(--approved);
}


@media only screen and (max-width: 900px) {

  .app-title {
    font-size: 50px;
  }

  .title-words {
    display: grid;
  }

  .app-subtitle {
    font-size: 18px;
    color: var(--subtitle);
    transform: translateY(-20px);
  }

}

</style>

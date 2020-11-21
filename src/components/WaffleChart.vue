<template>
  <div class='waffle'>
    <h2>WAFFLE CHART</h2>
  </div>
  <div class='chart-wrapper'>
    <div class='group-wrapper'>
        <div class='group-title' v-for="movie in filmsByYear" :key="movie">
            <WaffleItem v-for="film in movie.Films"
              :key="film.TitleClean + film.Year + ' waffleItem'"
              :Title="film.TitleClean"
              :Remarks="film.Remarks"
              :Year="film.Year"
              :Status="film.Status"
              :Poster="film.Poster"
              :Genre="film.Genre"
              :ratingImdb="film.ratingImdb"
              :imdbVotes="film.imdbVotes"
              :FilmReleased="film.FilmReleased"
              :Plot="film.PlotShort"
              :Awards="film.Awards"
              :Actors="film.Actors"
              :Director="film.Director">
            </WaffleItem>
            <div class='year-val'><b>{{movie.Year}}</b></div>
        </div>
    </div>
  </div>
  
</template>

<script>
//import * as d3 from 'd3'
import WaffleItem from './WaffleItem.vue'

export default {
    name: 'WaffleChart',
    props: ['filmsByYear'],
    data () {
        return {
          
        }
    },
    computed: {
      backgroundColor() {
        const colorMap = {
          "NO FILM": "transparent",
          "APPROVED": "var(--approved)",
          "DENIED": "var(--denied)",
          "LIMITED": "var(--limited)",
          "OTHER": "var(--other)",
        }

        return colorMap['status']
      }

    },
    methods:{
        
    },
    mounted() {
    },
  components: {
    WaffleItem
  }
}
</script>

<style scoped>

.group-wrapper{
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin: auto; 
}

.group-wrapper > * {
 flex: 1 1 0;
}

.year-val {
  width: 0px;
}

.year-val > b {
  white-space: nowrap;
  font-size: 10px;
  writing-mode: vertical-rl;
  text-orientation: sideways;
}

</style>
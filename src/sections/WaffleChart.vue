<template>
  <div class='waffle-chart-container' :data-index='index'>
    <div class='waffle-col-container'>
      <div class='first-col'>
        <WaffleText />
      </div>
      <div class='second-col'>
          <div class='filter-buttons'>
          <div> FILTER BY &nbsp;</div>
          <div class='btn' :class="approvedButtonStyle" @click="toggleApprovedFilter">APPROVED</div>
          <div class='btn' :class="deniedButtonStyle" @click="toggleDeniedFilter">DENIED</div>
          <div class='btn'>LIMITED</div>
          <div class='btn'>OTHER</div>
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
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import WaffleItem from '../components/WaffleItem.vue'
import WaffleText from '../components/WaffleText.vue'

export default {
    name: 'WaffleChart',
    props: ['observer', 'stepList', 'index', 'filmsByYear', 'rawData'],
    data () {
        return {
          thisStep: this.stepList[this.index],
          filterByStatusApproved: false,
          filterByStatusDenied: false,
          filterByStatusLimited: false,
          filterByStatusOther: false,
          defaultData: [],
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
      },

      approvedButtonStyle() {
       if (this.filterByStatusApproved === true) {
          d3.selectAll(".approved-waffle").classed("hide-waffle", false)
          d3.selectAll(".denied-waffle").classed("hide-waffle", true)
          d3.selectAll(".limited-waffle").classed("hide-waffle", true)
          d3.selectAll(".other-waffle").classed("hide-waffle", true)
          return "active-btn"
        } else {
          d3.selectAll(".denied-waffle").classed("hide-waffle", false)
          d3.selectAll(".limited-waffle").classed("hide-waffle", false)
          d3.selectAll(".other-waffle").classed("hide-waffle", false)
          return ""
          }
      },

      deniedButtonStyle() {
       if (this.filterByStatusDenied === true) {
          // then hide selectively
          d3.selectAll(".denied-waffle").classed("hide-waffle", false)
          d3.selectAll(".approved-waffle").classed("hide-waffle", true)
          d3.selectAll(".limited-waffle").classed("hide-waffle", true)
          d3.selectAll(".other-waffle").classed("hide-waffle", true)
          return "active-btn"
        } else {
          d3.selectAll(".approved-waffle").classed("hide-waffle", false)
          d3.selectAll(".limited-waffle").classed("hide-waffle", false)
          d3.selectAll(".other-waffle").classed("hide-waffle", false)
          return ""
          }
      },

      filteredFilms() {
        if (this.filterByStatusApproved === true) {
          const movieData = this.rawData.filter(el => {return el.Status != null && el.TitleForSorting != null})
          const filtered = movieData.filter(el => { return el.Status.match("APPROVED") })
          const grouped = this.groupDataByYear(filtered)
          return grouped;
        } else {
          //const movieData = this.rawData.filter(el => {return el.Status != null && el.TitleForSorting != null})
          const grouped = this.groupDataByYear(this.rawData)
          return grouped;
        }
      }

  },
  methods:{
    groupDataByYear(dataToGroup) {
        const yearData = dataToGroup.filter(el => {return el.Year != null}).sort((a, b) => {return a.Status - b.Status}).sort((a, b) => {return a.Year - b.Year});
        const yearGrouped = d3.group(yearData, d => d.Year)
        const yearArray = []
        const yearPushed = Array.from(yearGrouped, ([key, values]) => {
          yearArray.push({Year: key, Films: values});
        })
        return yearArray;
      },

    toggleApprovedFilter() {
      this.filterByStatusApproved = !this.filterByStatusApproved;
    },

    toggleDeniedFilter() {
      this.filterByStatusDenied = !this.filterByStatusDenied;
    }

  },
  mounted() {
    this.observer.observe(this.$el);
  },
  components: {
    WaffleItem,
    WaffleText
  }
}
</script>

<style scoped>

.waffle-chart-container {
  padding: 0px 0px 100px 0px;
}

.waffle-col-container {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
}

.btn {
    margin: 5px 10px 0px 0px;
    padding: 5px 8px;
    width: fit-content;
    color: gray;
    font-family: var(--card-font);
    font-size: var(--subtitle-size);
    font-weight: 800;
    border-radius: 5px;
    background-color: var(--accent);
}

.btn:hover {
  background-color: gray;
  color: var(--accent);
  cursor: pointer;
}

.first-col {
  margin: 0px 60px;
}

.second-col {
  margin: 40px 0px;
}

.active-btn {
  background-color: black;
  color: white;
}

.active-btn:hover {
  background-color: white;
  color:black;
}

.inactive-btn {
  background-color: var(--accent);
  color: gray;
}

.filter-buttons {
  display: flex;
  flex-flow: row wrap;
  margin: 15px 3px;
  font-family: var(--card-font);
}

.group-wrapper{
  width: 90%;
  height: 400px;
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
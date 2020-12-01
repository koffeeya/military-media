<template>
  <div class='waffle-chart-container' :data-index='index'>
    
    <div class='waffle-col-container'>
      <div class='first-col'>
        <div class='waffle-text waffle-text-one'>
          <b class='paragraph-header'>ABOUT THE CATEGORIES:</b> &nbsp;Every film in the database starts with a producer or director approaching the DoD to request production assistance. After reviewing the request and negotiating the script, the DoD can fully <button class='waffle-btn waffle-approve-btn' @mouseover="highlightOnHover('approved', waffleClasses)" @mouseout="highlightReset('approved', waffleClasses)">APPROVE</button> the request, approve <button class='waffle-btn waffle-limited-btn' @mouseover="highlightOnHover('limited', waffleClasses)" @mouseout="highlightReset('limited', waffleClasses)">LIMITED</button> assistance, or <button class='waffle-btn waffle-denied-btn' @mouseover="highlightOnHover('denied', waffleClasses)" @mouseout="highlightReset('denied', waffleClasses)">DENY</button> the request. The database also includes films in an <button class='waffle-btn waffle-other-btn' @mouseover="highlightOnHover('other', waffleClasses)" @mouseout="highlightReset('other', waffleClasses)">OTHER</button> category that did not require DoD assistance, but portrayed the military anyway. The majority of films are approved.
        </div>
      </div>
      <div class='second-col'>
        <div class='chart-wrapper' id='waffle-chart'>
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
        <div class='waffle-axis-title'>FILMS IN THE DATABASE BY RELEASE YEAR</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import WaffleItem from '../components/WaffleItem.vue'

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
          waffleClasses: [
            '.approved-waffle',
            '.denied-waffle',
            '.limited-waffle',
            '.other-waffle'
          ],
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
      },
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

    highlightOnHover(status, classList) {
      const activeClass = `.${status}-waffle`
      const remainingClasses = classList.filter((d) => {
        return d != activeClass;
      })
      remainingClasses.map((value) => {
        d3.selectAll(value)
          .style("opacity", "1")
          .transition()
          .duration(200)
          .style("opacity", "0.1");
      })
    },

    highlightReset(status, classList) {
      const activeClass = `.${status}-waffle`
      const remainingClasses = classList.filter((d) => {
        return d != activeClass;
      })
      remainingClasses.map((value) => {
        d3.selectAll(value)
          .style("opacity", "0.1")
          .transition()
          .duration(200)
          .style("opacity", "1");
      })
    }

  },
  mounted() {
    this.observer.observe(this.$el);
  },
  components: {
    WaffleItem
  }
}
</script>

<style scoped>

.paragraph-header {
  font-size: 21px;
  font-weight: 900;
  text-align: center;
  font-family: var(--card-font);
  color: gray;
}

.waffle-btn {
    margin: 5px;
    padding: 5px 8px;
    width: fit-content;
    color: gray;
    font-family: var(--card-font);
    font-size: var(--subtitle-size);
    font-weight: 800;
    border-radius: 5px;
    background-color: var(--accent);
    border: none;
}

.waffle-btn:hover {
  background-color: gray;
  color: var(--accent);
  cursor: pointer;
}

.waffle-approve-btn {
  background-color: var(--approved);
  color: var(--bg-color);
}

.waffle-approve-btn:hover {
  background-color: var(--accent);
  color: var(--approved);
}

.waffle-limited-btn {
  background-color: var(--limited);
  color: var(--bg-color);
}

.waffle-limited-btn:hover {
  background-color: var(--accent);
  color: var(--limited);
}

.waffle-denied-btn {
  background-color: var(--denied);
  color: var(--bg-color);
}

.waffle-denied-btn:hover {
  background-color: var(--accent);
  color: var(--denied);
}

.waffle-other-btn {
  background-color: var(--other);
  color: var(--bg-color);
}

.waffle-other-btn:hover {
  background-color: var(--accent);
  color: var(--other);
}

.waffle-text-container {
  padding: 50px 0px 50px 25px;
}

.waffle-text {
  margin: 25px auto;
  max-width: 65%;
  font-size: var(--body-size);
}

.waffle-chart-container {
  margin: 0px 0px 300px 0px;
}

.waffle-col-container {
  display: grid;
  grid-template-columns: 1fr;
}

.hide {
  position: absolute !important;
  top: -9999px !important;
  left: -9999px !important;
}

.waffle-axis-title {
  font-size: var(--root-size);
  font-weight: 900;
  text-align: center;
  font-family: var(--card-font);
}

.group-wrapper{
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin: 20px auto;
}

.group-wrapper > * {
 flex: 1 1 0;
}

.year-val {
  width: 0px;
  font-family: var(--card-font);
}

.year-val > b {
  white-space: nowrap;
  font-size: 10px;
  writing-mode: vertical-rl;
  text-orientation: sideways;
  margin: 5px 2px 0px 1px;
}


</style>
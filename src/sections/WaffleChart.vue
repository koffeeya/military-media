<template>
  <div class='waffle-chart-container' :data-index='index'>
    <div class='center waffle-instructions'>
      <span>Hover over or click any <span class='waffle-btn waffle-approve-btn'>BUTTON</span> to highlight parts of the chart below. Click on a film square <b class='waffle-instr-sq'>&#9632;</b> in the chart to see more details about it.</span>
    </div>
    <div class='waffle-icon-wrapper center'>
        <div class='waffle-icons'>{{ waffleTextIcons }}</div>
      </div>
    <div class='waffle-col-container'>
      <div class='first-col-waffle'>
        <button class='waffle-carousel-btn' id='waffle-prev-button' @click="previousText">&#x25C0;</button>
        <div class='waffle-carousel-text'>
          <div class='waffle-text text1'>
            Every film in the database starts with a producer or director approaching the DoD to request production assistance. After reviewing the request and negotiating the script, the DoD can fully <button class='waffle-btn waffle-approve-btn' @mouseover="highlightFilms(['approved-waffle'])" @mouseout="highlightFilmsReset(['approved-waffle'])">APPROVE</button> the request, approve <button class='waffle-btn waffle-limited-btn' @mouseover="highlightFilms(['limited-waffle'])" @mouseout="highlightFilmsReset(['limited-waffle'])">LIMITED</button> assistance, or <button class='waffle-btn waffle-denied-btn' @mouseover="highlightFilms(['denied-waffle'])" @mouseout="highlightFilmsReset(['denied-waffle'])">DENY</button> the request. The database also includes films in an <button class='waffle-btn waffle-other-btn' @mouseover="highlightFilms(['other-waffle'])" @mouseout="highlightFilmsReset(['other-waffle'])">OTHER</button> category that did not require DoD assistance, but portrayed the military anyway. The majority of films are approved.
          </div>
          <div class='waffle-text text2 hide'>
            <b>Why collaborate with Hollywood?</b> The DoD's website lists two reasons: to "accurately depict military stories and make sure sensitive information isn't disclosed." But there are clearly other reasons. For example, after <button class='waffle-btn waffle-approve-btn' @mouseover="highlightFilms(['topgunapproved'])" @mouseout="highlightFilmsReset(['topgunapproved'])">TOP GUN</button> released in 1986 -- a movie that closely involved the Pentagon from the start -- the U.S. Navy saw a 500% spike in the number of young men wanting to be Naval Aviators. The DoD’s own private data notes that Top Gun <b id='topGunHighlight'>"completed [the] rehabilitation of the military’s image, which had been savaged by the Vietnam War."</b>
          </div>
          <div class='waffle-text text3 hide'>
            Waffle text 3
          </div>
          <div class='waffle-text text4 hide'>
            Waffle text 4
          </div>
          <div class='waffle-text text5 hide'>
            Waffle text 5
          </div>
        </div>
        <button class='waffle-carousel-btn' id='waffle-right-button' @click="nextText">&#x25B6;</button>
      </div>
      

      <div class='second-col-waffle'>
        <div class='chart-wrapper' id='waffle-chart'>
          <div class='group-wrapper'>
              <div class='group-title' v-for="movie in filmsByYear" :key="movie">
                  <WaffleItem v-for="film in movie.Films"
                    :key="film.TitleClass + '-waffleItem'"
                    :Title="film.TitleClean"
                    :TitleClass="film.TitleClass"
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
          activeText: 1,
          textLength: 5,
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
      waffleTextIcons() {
        const inactiveIcon = "○"
        const activeIcon = "●"
        const items = [];
        const n = this.textLength;
        const arr = Array.from(Array(n).keys()).map(i => i+1)
        arr.map((value) => {
          if (value === this.activeText) {
            items.push(activeIcon)
          } else {
            items.push(inactiveIcon)
          }
        })
        return items.join(' ');
      },
      waffleTextHidden() {
        const n = this.textLength;
        const arr = Array.from(Array(n).keys()).map(i => i + 1)
        const remaining = arr.filter((d) => {
          return d != this.activeText;
        })
        return remaining;
        console.log(remaining);
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
    highlightFilms(arr) {
      d3.selectAll('.waffle-item')
        .style("opacity", "1")
        .transition()
        .duration(200)
        .style("opacity", "0.1");
      arr.map(className => {
        d3.selectAll(`.${className}`)
        .transition()
        .duration(200)
        .style("opacity", "1");
      })
    },
    highlightFilmsReset(arr) {
      d3.selectAll('.waffle-item')
        .transition()
        .duration(200)
        .style("opacity", "1");
    },
    previousText() {
        if (this.activeText > 1) {
          this.activeText -= 1
        } else if (this.activeText === 1) {
          this.activeText = this.textLength
        }

        d3.selectAll(`.text${this.activeText}`)
          .style("opacity", "0")
          .transition()
          .duration(200)
          .style("opacity", "1");
        
        d3.selectAll(`.text${this.activeText}`).classed("hide", false);

        this.waffleTextHidden.map((n) => {
          d3.selectAll(`.text${n}`)
            .style("opacity", "1")
            .transition()
            .duration(100)
            .style("opacity", "0");
          d3.selectAll(`.text${n}`).classed("hide", true);
        })

      },
      nextText() {
        if (this.activeText < this.textLength)  {
          this.activeText += 1
        } else if (this.activeText === this.textLength) {
          this.activeText = 1
        }

        d3.selectAll(`.text${this.activeText}`)
          .style("opacity", "0")
          .transition()
          .duration(200)
          .style("opacity", "1");
        
        d3.selectAll(`.text${this.activeText}`).classed("hide", false);

        this.waffleTextHidden.map((n) => {
          d3.selectAll(`.text${n}`)
            .style("opacity", "1")
            .transition()
            .duration(100)
            .style("opacity", "0");
          d3.selectAll(`.text${n}`).classed("hide", true);
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

.waffle-instructions {
  color: gray;
  margin: 0px 0px 40px 0px;
}

.waffle-instr-sq {
  font-size: 20px;
  color: var(--approved);
  margin: 0px 5px;
}

.waffle-instr-sq:hover {
  color: var(--denied);
  cursor: pointer;
}

/* CAROUSEL */

.waffle-icon-wrapper {
  margin: 10px 0px 30px 0px;
  font-size: 20px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.first-col-waffle {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  max-width: 70%;
  margin: 0px auto;
  position: sticky;
  top: 30px;
}

.second-col-waffle {
  margin: 0px 0px 300px 0px;
}

.waffle-text {
  font-size: var(--body-size);
  padding: 0px 10px;
  line-height: 38px;
}

.waffle-carousel-btn {
  width: 60px;
  margin: 0px auto;
  font-size: 30px;
  font-family: var(--title-font);
  color: var(--bg-color);
  border: 2px solid var(--accent);
  border-radius: 5px;
  background-color: var(--accent);
}

.waffle-carousel-btn:hover {
  color: var(--accent);
  background-color: var(--bg-color);
  cursor: pointer;
}

.paragraph-header {
  font-size: 21px;
  font-weight: 900;
  text-align: center;
  font-family: var(--card-font);
  color: gray;
}

.waffle-btn {
    margin: 0px 5px;
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
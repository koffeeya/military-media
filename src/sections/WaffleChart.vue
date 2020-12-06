<template>
  <div class='waffle-chart-container'>
    <!-- PROGRESS BAR -->
    <div class='waffle-icon-wrapper center'>
        <div class='progress-icon' :class="[`icon${step}`, iconClass(step)]" v-for="step in allStepsArr" :key="step + '-icon'"></div>
    </div>
    <!-- CONTENT -->
    <div class='waffle-col-container'>
      <!-- TEXT AREA -->
      <div class='row1'>
        <!-- PREVIOUS BUTTON -->
        <button class='waffle-carousel-btn' id='waffle-prev-button' @click="previousText">&#x25C0;</button>
        <!-- TEXT SECTIONS -->
        <div class='waffle-carousel-text'>
          <!-- SECTION 1 -->
          <div class='text1'>
            <AppTitle :carouselData="carouselData" />
          </div>
          <!-- SECTION 2 -->
          <div class='waffle-text text2 hide'>
            <div class='waffle-instructions'><b>This text is interactive:</b> Hover or click a button to highlight the chart below. Click the button again to remove the highlight. Click on a square in the chart to see more details about the film.</div>
            The first film to get full cooperation from the military may well have been <button class='text2-btn1 waffle-btn waffle-approved-btn' @click="onClick(['birthofanationapproved'])" @mouseover="highlightFilms(['birthofanationapproved'])" @mouseout="highlightFilmsReset(['birthofanationapproved'])">BIRTH OF A NATION</button> in 1915, one of the first films ever made.
          </div>
          <!-- SECTION 3 -->
          <div class='waffle-text text3 hide'>
            <div class='waffle-instructions'><b>This text is interactive:</b> Hover or click a button to highlight the chart below. Click the button again to remove the highlight. Click on a square in the chart to see more details about the film.</div>
            Every film in the database starts with a producer or director approaching the DoD to request production assistance. After reviewing the request and negotiating the script, the DoD can fully <button class='text1-btn1 waffle-btn waffle-approved-btn' @click="onClick(['approved-waffle'])" @mouseover="highlightFilms(['approved-waffle'])" @mouseout="highlightFilmsReset(['approved-waffle'])">APPROVE</button> the request, approve <button class='text1-btn2 waffle-btn waffle-limited-btn' @click="onClick(['limited-waffle'])" @mouseover="highlightFilms(['limited-waffle'])" @mouseout="highlightFilmsReset(['limited-waffle'])">LIMITED</button> assistance, or <button class='text1-btn3 waffle-btn waffle-denied-btn' @click="onClick(['denied-waffle'])" @mouseover="highlightFilms(['denied-waffle'])" @mouseout="highlightFilmsReset(['denied-waffle'])">DENY</button> the request. The database also includes films in an <button class='text1-btn4 waffle-btn waffle-other-btn' @click="onClick(['other-waffle'])" @mouseover="highlightFilms(['other-waffle'])" @mouseout="highlightFilmsReset(['other-waffle'])">OTHER</button> category that did not require DoD assistance, but portrayed the military anyway. The majority of films are approved.
          </div>
          <!-- SECTION 4 -->
          <div class='waffle-text text4 hide'>
            <div class='waffle-instructions'><b>This text is interactive:</b> Hover or click a button to highlight the chart below. Click the button again to remove the highlight. Click on a square in the chart to see more details about the film.</div>
            <b>Why collaborate with Hollywood?</b> The DoD's website lists two reasons: to "accurately depict military stories and make sure sensitive information isn't disclosed." But there are clearly other reasons. For example, after <button class='text2-btn1 waffle-btn waffle-approved-btn' @click="onClick(['topgunapproved'])" @mouseover="highlightFilms(['topgunapproved'])" @mouseout="highlightFilmsReset(['topgunapproved'])">TOP GUN</button> released in 1986 -- a movie that closely involved the Pentagon from the start -- the U.S. Navy saw a 500% spike in the number of young men wanting to be Naval Aviators. The DoD’s own private data notes that Top Gun <b id='topGunHighlight'>"completed [the] rehabilitation of the military’s image, which had been savaged by the Vietnam War."</b>
          </div>
          <!-- SECTION 5 -->
          <div class='waffle-text text5 hide'>
            Waffle text 3
          </div>
          <!-- SECTION 6 -->
          <div class='waffle-text text6 hide'>
            Waffle text 4
          </div>
        </div>
        <!-- NEXT BUTTON -->
        <button class='waffle-carousel-btn' id='waffle-right-button' @click="nextText">&#x25B6;</button>
      </div>
      
      <!-- CONTENT AREA -->
      <div class='row2'>
        <div v-if="activeText === 1"></div>
        <div v-if="activeText > 1">
          <div  class='chart-wrapper' id='waffle-chart'>
            <div class='group-wrapper'>
                  <div v-for="movie in filmsByYear" :key="movie">
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
                    <div class='year-val'><b :class="yearValueClass(movie.Year)"> {{yearValue(movie.Year)}} </b></div>
                  </div>
              </div>
          </div>
        <div class='waffle-axis-title'>FILMS IN THE DATABASE BY RELEASE YEAR</div>
        </div>
      </div>
      
    </div>

  </div>
  
</template>

<script>
import * as d3 from 'd3'
import WaffleItem from '../components/WaffleItem.vue'
import AppTitle from "./AppTitle.vue";

export default {
    name: 'WaffleChart',
    props: ['filmsByYear', 'rawData', 'carouselData'],
    data () {
        return {
          activeText: 1,
          textLength: 6,
          clicked: false,
          previouslyClicked: null,
          iconHover: false,
        }
    },
    computed: {
      allStepsArr() {
        const n = this.textLength;
        const arr = Array.from(Array(n).keys()).map(i => i + 1)
        return arr;
      },
      waffleTextHidden() {
        const remaining = this.allStepsArr.filter((d) => {
          return d != this.activeText;
        })
        return remaining;
      },
  },
  methods:{
    yearValueClass(year) {
      const mod = year % 10;
      const minYear = 1911;
      const maxYear = 2016;
      if (year === minYear || year === maxYear) {
        return "yearVisible";
      } else if (mod === 0) {
        return "yearVisible";
      } else return "yearInvisible";
    },
    yearValue(year) {
      const mod = year % 10;
      const minYear = 1911;
      const maxYear = 2016;
      if (year === minYear || year === maxYear) {
        return year;
      } else if (mod === 0) {
        return year;
      } else return ` _ _ `
    },
    iconClass(step) {
        if (step === this.activeText) {
          return "active-icon"
        } else {
          return "inactive-icon"
        }
    },

    groupDataByYear(dataToGroup) {
        const yearData = dataToGroup.filter(el => {return el.Year != null}).sort((a, b) => {return a.Status - b.Status}).sort((a, b) => {return a.Year - b.Year});
        const yearGrouped = d3.group(yearData, d => d.Year)
        const yearArray = []
        const yearPushed = Array.from(yearGrouped, ([key, values]) => {
          yearArray.push({Year: key, Films: values});
        })
        return yearArray;
      },
      onClick(arr) {
        let thisBtn = event.target.classList[0];
        d3.selectAll(`.waffle-btn`).style("border", "");

        // If you're clicking the same button, reset all filters
        // Else, select the current button and highlight its values
        if (this.clicked === true && this.previouslyClicked === thisBtn) {
          this.clicked = false;
          d3.select(`.${thisBtn}`).style("border", "");
          this.highlightFilmsReset(arr)
        } else {
          this.clicked = true;
          d3.select(`.${thisBtn}`).style("border", "2px solid white");
          d3.selectAll('.waffle-item')
            .transition()
            .duration(200)
            .style("opacity", "1");
          d3.selectAll('.waffle-item')
            .transition()
            .duration(200)
            .style("opacity", "0.1");
          arr.map(className => {
            d3.selectAll(`.${className}`)
            .transition()
            .duration(200)
            .style("opacity", "1");
          })
        }

        this.previouslyClicked = thisBtn;
      },
    highlightFilms(arr) {
      if (this.clicked === true) {
        return;
      } else {
        d3.selectAll('.waffle-item')
        .transition()
        .duration(200)
        .style("opacity", "0.1");
      arr.map(className => {
        d3.selectAll(`.${className}`)
        .transition()
        .duration(200)
        .style("opacity", "1");
      })
      }
    },
    highlightFilmsReset(arr) {
      if(this.clicked === true) {
        return;
      } else if (this.clicked === false) {
        d3.selectAll('.waffle-item')
        .transition()
        .duration(200)
        .style("opacity", "1");
      }
    },
    previousText() {
        this.clicked = false;
        d3.selectAll(`.waffle-btn`).style("border", "");
        d3.selectAll('.waffle-item')
          .transition()
          .duration(200)
          .style("opacity", "1");

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
        this.clicked = false;
        d3.selectAll(`.waffle-btn`).style("border", "");
        d3.selectAll('.waffle-item')
          .transition()
          .duration(200)
          .style("opacity", "1");

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
  components: {
    WaffleItem,
    AppTitle
  }
}
</script>

<style scoped>

/* PROGRESS BAR */

.active-icon {
  background-color: gray;
  width: 5%;
  height: 5px;
  margin: 10px 10px 30px 10px;
}

.inactive-icon {
  background-color: var(--accent);
  width: 5%;
  height: 5px;
  margin: 10px 0px 30px 0px;
}


.waffle-page-fade {
  position: absolute;
  width: 1vw;
  height: 1vh;
  top: 0;
  left: 0;
  background-color: red;
}

.waffle-instructions {
  color: gray;
  font-family: var(--card-font);
  font-size: 14px;
  line-height: 14px;
  margin: 0px 0px 20px 0px;
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
  margin: 30px 0px;
  font-size: 20px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.row1 {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  max-width: 80%;
  margin: 0px auto;
  position: sticky;
  top: 10px;
}

.row2 {
  padding: 50px 0px 0px 0px;
  margin: 0px auto;
}

.waffle-text {
  font-size: var(--body-size);
  padding: 0px 10px;
  min-height: 25vh;
}

.waffle-carousel-btn {
  height: 150px;
  transform: translateY(25vh);
  margin: 0px auto;
  font-size: 30px;
  font-family: var(--title-font);
  color: var(--denied);
  border: 2px solid var(--denied);
  border-radius: 5px;
  background-color: var(--bg-color);
}

.waffle-carousel-btn:hover {
  color: var(--bg-color);
  background-color: var(--denied);
  cursor: pointer;
}

.inactive-carousel-btn {
  opacity: 0;
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
    border-radius: 8px;
    background-color: var(--accent);
    border: none;
}

.waffle-btn:hover {
  background-color: gray;
  color: var(--accent);
  cursor: pointer;
}

.waffle-neutral-btn {
  background-color: var(--accent);
  border: 2px solid var(--bg-color);
  color: white;
}

.waffle-neutral-btn:hover {
  background-color: white;
  color: var(--accent);
}

.waffle-approved-btn {
  background-color: var(--approved);
  border: 2px solid var(--bg-color);
  color: var(--bg-color);
}

.waffle-approved-btn:hover {
  background-color: var(--accent);
  color: var(--approved);
}

.waffle-limited-btn {
  background-color: var(--limited);
  border: 2px solid var(--bg-color);
  color: var(--bg-color);
}

.waffle-limited-btn:hover {
  background-color: var(--accent);
  color: var(--limited);
}

.waffle-denied-btn {
  background-color: var(--denied);
  border: 2px solid var(--bg-color);
  color: var(--bg-color);
}

.waffle-denied-btn:hover {
  background-color: var(--accent);
  color: var(--denied);
}

.waffle-other-btn {
  background-color: var(--other);
  border: 2px solid var(--bg-color);
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
  margin: 10px 0px 10px 0px;
}

.group-wrapper{
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin: 0px auto;
}

.group-wrapper > * {
 flex: 1 1 0;
}

.yearVisible {
  opacity: 1;
}

.yearInvisible {
  color: transparent;
}

.year-val {
  width: 0px;
  font-family: var(--card-font);
  transform: translateX(-10px);
  margin: 5px 0px;
}

.year-val > b {
  white-space: nowrap;
  font-size: 14px;
  border-top: 2px solid white;
  margin: 5px 0px;
}

@media only screen and (max-width: 800px) {
  .waffle-btn {
    padding: 4px;
    margin: 0px;
  }
  .row1 {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
    max-width: 90%;
    margin: 0px auto;
    position: static;
  }

  .waffle-instructions {
    font-size: 11px;
  }

  .waffle-text {
    font-size: 16px;
    padding: 0px 10px;
    line-height: 28px;
  }

  .group-wrapper{
    padding: 10px;
    width: 90%; 
    overflow: auto;
  }
}

</style>
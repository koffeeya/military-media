<template>
  <div class="waffle-chart-container">
    <!-- PROGRESS BAR &#x25C0; &#x25B6; -->
    <div v-if="activeText > 1" class="section-title center">
      {{ stepList[activeText - 1].title }}
    </div>
    <div v-if="activeText > 1" class="waffle-icon-wrapper center">
      <button
        class="waffle-carousel-btn"
        id="waffle-prev-button"
        @click="previousText"
      >
        &#x25C0;
      </button>
      <div
        class="progress-icon"
        @click="navbarClick(step)"
        @mouseover="navbarMouseover"
        @mouseleave="navbarMouseleave"
        :class="[`icon${step}`, iconClass(step)]"
        v-for="step in allStepsArr"
        :key="step + '-icon'"
      ></div>
      <button
        class="waffle-carousel-btn"
        id="waffle-right-button"
        @click="nextText"
      >
        &#x25B6;
      </button>
    </div>

    <!-- TEXT + CONTENT AREA -->
    <div class="waffle-col-container">
      <!-- TEXT AREA -->
      <div class="row1">
        <!-- TEXT SECTIONS -->
        <div class="waffle-carousel-text">
          <!-- SECTION 1 -->
          <div class="text1">
            <AppTitle :carouselData="carouselData" />
            <div>
              <button class="enter-button" @click="navbarClick(2)">
                START EXPLORING
              </button>
            </div>
          </div>

          <!-- SECTION 2 -->
          <div class="waffle-text text2 hide">
            <div class="text-section">
              The United States military and Hollywood have been actively
              collaborating since American cinema began over 100 years ago. The
              relationship between the two industries is known as the
              <a
                href="https://en.wikipedia.org/wiki/Military-entertainment_complex"
                target="_blank"
                rel="noopener noreferrer"
                >military-entertainment complex.</a
              >
              <br />
              <br />
              This project takes a close look at the complex using a database of
              <a
                href="https://docs.google.com/spreadsheets/d/1HwdmpiSpNXfoNoI_5ndwdQi3Z3lCXU8VthPYelr6ZqA/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                >450+ film productions</a
              >
              that requested assistance from the U.S. Department of Defense
              (DoD) in the last century. The database was acquired in a
              <a
                href="https://www.spyculture.com/dod-hollywood-collaboration-database-excerpts/"
                target="_blank"
                rel="noopener noreferrer"
                >2017 FOIA request</a
              >
              by the journalist Tom Secker, and for the first time it is
              transcribed and merged with information from IMDb.
              <br />
              <br />
              <h3 class="text-emphasis">
                How does the relationship between the military and Hollywood
                work? What kinds of movies get military support? And what can we
                learn from films that do — or don’t — make the cut?
              </h3>
            </div>

            <div class="center">
              <button class="next-section-btn" @click="navbarClick(3)">
                Next: About the Data
              </button>
            </div>
          </div>

          <!-- SECTION 3 -->
          <div class="waffle-text text3 hide">
            <div class="text-section">
              <p
                class="text-emphasis"
                style="font-size: 16px; line-height: 25px;"
              >
                Hover or click on a
                <button class="text1-btn1 waffle-btn waffle-approved-btn">
                  BUTTON
                </button>
                to highlight the visualization, and click on a film square to
                learn more about it.
              </p>
              <br />
              The chart below shows all 509 films in the database by release
              year. Each square represents one film, colored by whether the
              Department of Defense
              <button
                class="text1-btn1 waffle-btn waffle-approved-btn"
                @click="onButtonClick(['approved-waffle'])"
                @mouseover="highlightFilms(['approved-waffle'])"
                @mouseout="highlightFilmsReset(['approved-waffle'])"
              >
                APPROVED
              </button>
              the production’s request for assistance, approved
              <button
                class="text1-btn2 waffle-btn waffle-limited-btn"
                @click="onButtonClick(['limited-waffle'])"
                @mouseover="highlightFilms(['limited-waffle'])"
                @mouseout="highlightFilmsReset(['limited-waffle'])"
              >
                LIMITED
              </button>
              assistance,
              <button
                class="text1-btn3 waffle-btn waffle-denied-btn"
                @click="onButtonClick(['denied-waffle'])"
                @mouseover="highlightFilms(['denied-waffle'])"
                @mouseout="highlightFilmsReset(['denied-waffle'])"
              >
                DENIED
              </button>
              assistance, or
              <button
                class="text1-btn4 waffle-btn waffle-other-btn"
                @click="onButtonClick(['other-waffle'])"
                @mouseover="highlightFilms(['other-waffle'])"
                @mouseout="highlightFilmsReset(['other-waffle'])"
              >
                OTHER
              </button>
              — a category of films that did not request military assistance but
              were included in the database anyway.
              <br />
              <br />
            </div>
            <div class="center">
              <button class="next-section-btn" @click="navbarClick(4)">
                Next: Why Collaborate?
              </button>
            </div>
          </div>

          <!-- SECTION 4 -->
          <div class="waffle-text text4 hide">
            <div class="text-section">
              Take
              <button
                class="text1-btn1 waffle-btn waffle-approved-btn"
                @click="onButtonClick(['starspangledbannerapproved'])"
                @mouseover="highlightFilms(['starspangledbannerapproved'])"
                @mouseout="highlightFilmsReset(['starspangledbannerapproved'])"
              >
                THE STAR-SPANGLED BANNER</button
              >, a 1917 silent (but highly patriotic) film from Thomas Edison's
              production company. The movie’s
              <a
                href="https://m.media-amazon.com/images/M/MV5BYTk5ZDkxNzItNGY4Zi00MjcxLTkxYTktZjljYzkzZmYwZjRmXkEyXkFqcGdeQXVyNjA5MTAzODY@._V1.jpg"
                target="_blank"
                rel="noopener noreferrer"
                >advertising</a
              >
              proudly proclaims that “a regiment of U.S. Marines helped make
              this picture” and notes that “Federal co-operation [was] a mighty
              factor” in the film’s production. This — along with the fact that
              the Marines shared the film at “425 recruiting offices” — would
              guarantee “crowded theaters for months.”
            </div>
            <div class="center">
              <button class="next-section-btn" @click="navbarClick(5)">
                Continue
              </button>
            </div>
          </div>

          <!-- SECTION 5 -->
          <div class="waffle-text text5 hide">
            <div class="text-section">
              Seventy years later, the 1986 film
              <button
                class="text1-btn1 waffle-btn waffle-approved-btn"
                @click="onButtonClick(['topgunapproved'])"
                @mouseover="highlightFilms(['topgunapproved'])"
                @mouseout="highlightFilmsReset(['topgunapproved'])"
              >
                TOP GUN
              </button>
              featured comparable cooperation from the U.S. Navy. It ended up
              that year’s
              <a
                href="https://en.wikipedia.org/wiki/1986_in_film#Highest-grossing_films_(U.S.)"
                target="_blank"
                rel="noopener noreferrer"
                >highest-grossing film</a
              >
              — so popular that the Navy
              <a
                href="http://content.time.com/time/subscriber/article/0,33009,962933-1,00.html"
                target="_blank"
                rel="noopener noreferrer"
                >set up recruiting exhibits outside of theaters</a
              >
              to capitalize on the crowds, and it sparked a wave of demand for
              war films. In the DoD’s own remarks,
              <button
                class="text1-btn1 waffle-btn waffle-approved-btn"
                @click="onButtonClick(['topgunapproved'])"
                @mouseover="highlightFilms(['topgunapproved'])"
                @mouseout="highlightFilmsReset(['topgunapproved'])"
              >
                TOP GUN
              </button>
              went beyond recruiting to complete the “rehabilitation of the
              military’s image, which had been savaged by the Vietnam War.”
            </div>
            <div class="center">
              <button class="next-section-btn" @click="navbarClick(6)">
                Continue
              </button>
            </div>
          </div>

          <!-- SECTION 6 -->
          <div class="waffle-text text6 hide">
            <div class="text-section"></div>
            <div class="center">
              <button class="next-section-btn" @click="navbarClick(7)">
                Continue
              </button>
            </div>
          </div>

          <!-- SECTION 7 -->
          <div class="waffle-text text7 hide">
            <div class="text-section"></div>
          </div>
        </div>
      </div>

      <!-- CONTENT AREA -->
      <div class="row2">
        <!-- v-if="activeText > 1" -->
        <div>
          <div v-if="activeText > 2" class="chart-wrapper" id="waffle-chart">
            <div class="group-wrapper">
              <div v-for="movie in filmsByYear" :key="movie">
                <WaffleItem
                  v-for="film in movie.Films"
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
                  :Director="film.Director"
                >
                </WaffleItem>
                <div class="year-val">
                  <b :class="yearValueClass(movie.Year)">
                    {{ yearValue(movie.Year) }}
                  </b>
                </div>
              </div>
            </div>
            <div class="waffle-axis-title">
              FILMS IN THE DATABASE BY RELEASE YEAR
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import WaffleItem from "../components/WaffleItem.vue";
import AppTitle from "./AppTitle.vue";

export default {
  name: "WaffleChart",
  props: ["filmsByYear", "rawData", "carouselData"],
  data() {
    return {
      activeText: 1,
      textLength: 7,
      clicked: false,
      previouslyClicked: null,
      navbarHover: false,
      stepList: [
        {
          step: 1,
          section: "text1",
          icon: "icon1",
          title: "Homepage",
        },
        {
          step: 2,
          section: "text2",
          icon: "icon2",
          title: "A. Introduction",
        },
        {
          step: 3,
          section: "text3",
          icon: "icon3",
          title: "B. About the Chart",
        },
        {
          step: 4,
          section: "text4",
          icon: "icon4",
          title: "C. Why Collaborate?",
        },
        {
          step: 5,
          section: "text5",
          icon: "icon5",
          title: "C. Why Collaborate?",
        },
        {
          step: 6,
          section: "text6",
          icon: "icon6",
          title: "C. Why Collaborate?",
        },
        {
          step: 7,
          section: "text7",
          icon: "icon7",
          title: "D. What Films Get Assistance?",
        },
      ],
    };
  },
  computed: {
    allStepsArr() {
      const n = this.textLength;
      const arr = Array.from(Array(n).keys()).map((i) => i + 1);
      return arr;
    },
    waffleTextHidden() {
      const remaining = this.allStepsArr.filter((d) => {
        return d != this.activeText;
      });
      return remaining;
    },
  },
  methods: {
    navbarMouseover(event) {
      const classList = event.target.className.split(" ");
      const iconValue = classList[1].slice(-1) - 1;
      if (classList.includes("active-icon")) {
        d3.select(".section-title")
          .style("opacity", "0")
          .transition()
          .duration(200)
          .style("opacity", "1")
          .style("color", "var(--denied)")
          .text(`${this.stepList[iconValue].title}`);
      } else {
        d3.select(".section-title")
          .style("opacity", "0")
          .transition()
          .duration(200)
          .style("opacity", "1")
          .style("color", "var(--accent)")
          .text(`${this.stepList[iconValue].title}`);
      }
    },
    navbarMouseleave(e) {
      d3.select(".section-title").style("color", "var(--denied)");
      d3.select(".section-title")
        .style("opacity", "0")
        .transition()
        .duration(200)
        .style("opacity", "1")
        .text(`${this.stepList[this.activeText - 1].title}`);
    },
    navbarClick(step) {
      this.activeText = step;
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
      });
    },
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
      } else return ` _ _ `;
    },
    iconClass(step) {
      if (step === this.activeText) {
        return "active-icon";
      } else {
        return "inactive-icon";
      }
    },

    onButtonClick(arr) {
      let thisBtn = event.target.classList[0];
      d3.selectAll(`.waffle-btn`).style("border", "");
      // If you're clicking the same button, reset all filters
      // Else, select the current button and highlight its values
      if (this.clicked === true && this.previouslyClicked === thisBtn) {
        this.clicked = false;
        d3.select(`.${thisBtn}`).style("border", "");
        this.highlightFilmsReset(arr);
      } else {
        this.clicked = true;
        d3.select(`.${thisBtn}`).style("border", "2px solid white");
        d3.selectAll(".waffle-item")
          .transition()
          .duration(200)
          .style("opacity", "1");
        d3.selectAll(".waffle-item")
          .transition()
          .duration(200)
          .style("opacity", "0.1");
        arr.map((className) => {
          d3.selectAll(`.${className}`)
            .transition()
            .duration(200)
            .style("opacity", "1");
        });
      }
      this.previouslyClicked = thisBtn;
    },
    highlightFilms(arr) {
      if (this.clicked === true) {
        return;
      } else {
        d3.selectAll(".waffle-item")
          .transition()
          .duration(200)
          .style("opacity", "0.1");
        arr.map((className) => {
          d3.selectAll(`.${className}`)
            .transition()
            .duration(200)
            .style("opacity", "1");
        });
      }
    },
    highlightFilmsReset(arr) {
      if (this.clicked === true) {
        return;
      } else if (this.clicked === false) {
        d3.selectAll(".waffle-item")
          .transition()
          .duration(200)
          .style("opacity", "1");
      }
    },
    topGunMouseover() {
      d3.select("#topGunHighlight")
        .transition()
        .duration(200)
        .style("color", "var(--approved)");
    },
    topGunMouseout() {
      d3.select("#topGunHighlight")
        .transition()
        .duration(200)
        .style("color", "");
    },
    previousText() {
      this.clicked = false;
      d3.selectAll(`.waffle-btn`).style("border", "");
      d3.selectAll(".waffle-item")
        .transition()
        .duration(200)
        .style("opacity", "1");
      if (this.activeText > 1) {
        this.activeText -= 1;
      } else if (this.activeText === 1) {
        this.activeText = 1;
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
      });
    },
    nextText() {
      this.clicked = false;
      d3.selectAll(`.waffle-btn`).style("border", "");
      d3.selectAll(".waffle-item")
        .transition()
        .duration(200)
        .style("opacity", "1");
      if (this.activeText < this.textLength) {
        this.activeText += 1;
      } else if (this.activeText === this.textLength) {
        this.activeText = this.textLength;
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
      });
    },
  },
  components: {
    WaffleItem,
    AppTitle,
  },
};
</script>

<style scoped>
.enter-button {
  margin: 10% 33% 0% 33%;
  padding: 10px;
  width: 33%;
  min-width: 75px;
  font-size: 15px;
  font-family: var(--title-font);
  color: var(--denied);
  border: none;
  border-radius: 5px;
  background-color: var(--accent);
  font-weight: 900;
}

.enter-button:hover {
  background-color: var(--denied);
  color: var(--bg-color);
  cursor: pointer;
}

.next-section-btn {
  margin: 0px auto;
  padding: 5px;
  width: 25%;
  min-width: 75px;
  font-size: 15px;
  font-family: var(--title-font);
  color: gray;
  border: none;
  border-radius: 5px;
  background-color: var(--bg-color);
  font-weight: 900;
  z-index: 25;
}

.next-section-btn:hover {
  background-color: gray;
  color: var(--accent);
  cursor: pointer;
}

/* PROGRESS BAR */

.section-title {
  font-family: var(--card-font);
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 900;
  margin: 20px;
  color: var(--denied);
}

.progress-icon {
  width: 3%;
  height: 15px;
  border-left: 1px solid var(--bg-color);
  border-right: 1px solid var(--bg-color);
}

.active-icon {
  background-color: gray;
}

.active-icon:hover {
  cursor: pointer;
  background-color: var(--denied);
  border-left: 1px solid var(--bg-color);
  border-right: 1px solid var(--bg-color);
}

.inactive-icon {
  background-color: var(--accent);
}

.inactive-icon:hover {
  cursor: pointer;
  background-color: gray;
  border-left: 1px solid var(--bg-color);
  border-right: 1px solid var(--bg-color);
}

/* CAROUSEL */

.waffle-icon-wrapper {
  font-size: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0px auto;
  padding: 5px;
  position: sticky;
  top: 0px;
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--accent);
  z-index: 20;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.row1 {
  padding: 20px 0px;
  margin: 0px auto;
}

.row2 {
  padding: 50px 0px 0px 0px;
  margin: 0px auto;
}

.waffle-text {
  font-size: var(--body-size);
  min-height: 25vh;
  margin: 0% auto;
  line-height: 35px;
  max-width: 45%;
  padding: 2% 0% 0%;
}

.text-section {
  margin: 2% 0% 5% 0%;
}

.text-emphasis {
  margin: 0px;
  padding: 10px 20px;
  background-color: var(--accent);
  font-family: var(--card-font);
  font-weight: 500;
  font-size: var(--body-font);
}

.waffle-carousel-btn {
  margin: 0px auto;
  padding: 2px;
  width: 5%;
  min-width: 75px;
  font-size: 15px;
  font-family: var(--title-font);
  color: var(--denied);
  border: none;
  border-radius: 5px;
  background-color: var(--accent);
}

.waffle-carousel-btn:hover {
  color: var(--bg-color);
  background-color: var(--denied);
  cursor: pointer;
}

.paragraph-header {
  font-size: 21px;
  font-weight: 900;
  text-align: center;
  font-family: var(--card-font);
  color: gray;
}

/* SECTION 2 */

/* TEXT BUTTONS */

.waffle-btn {
  margin: -5px 2px;
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

/* CHART */

.waffle-axis-title {
  font-size: var(--root-size);
  font-weight: 900;
  text-align: center;
  font-family: var(--card-font);
  margin: 10px 0px 10px 0px;
  transform: translateY(-50px);
}

.group-wrapper {
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin: 0px auto;
  transform: translateY(-50px);
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

@media only screen and (max-width: 600px) {
  .next-section-btn {
    width: 80%;
  }
  .waffle-text {
    font-size: var(--body-size);
    min-height: none;
    overflow: auto;
    margin: 0% auto;
    line-height: 26px;
    max-width: 85%;
    padding: 2% 0% 0%;
  }

  .group-wrapper {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin: auto 10px;
    overflow: auto;
    padding: 15px;
  }
}
</style>

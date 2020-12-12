<template>
  <div class="waffle-chart-container">

    <div v-if="activeText > 1" class="waffle-icon-wrapper">
      <div class="progress-icon" @click="navbarClick(step)"
        :class="[`icon${step}`, iconClass(step)]"
        v-for="step in allStepsArr"
        :key="step + '-icon'"
      ></div>
    </div>

    <!-- TEXT + CONTENT AREA -->
    <div class="col-container">
      <!-- TEXT AREA -->
      <div class="row1">
        <!-- TEXT SECTIONS -->
        <div class="waffle-carousel-text">
          <!-- SECTION 1 -->
          <div class="text1">
            <AppTitle :carouselData="carouselData" />
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
              This project takes a close look at a database of
              <a
                href="https://docs.google.com/spreadsheets/d/1HwdmpiSpNXfoNoI_5ndwdQi3Z3lCXU8VthPYelr6ZqA/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                >500+ film productions</a
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
              <div>
                But first, more about the data.
              </div>
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
                <button class="text3-btn1 waffle-btn waffle-approved-btn">
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
                @click="onButtonClick(getFilmsList('APPROVED', 'Status'))"
                @mouseover="highlightFilms(getFilmsList('APPROVED', 'Status'))"
                @mouseout="highlightFilmsReset(getFilmsList('APPROVED', 'Status'))"
              >
                APPROVED
              </button>
              the production’s request for assistance, approved
              <button
                class="text1-btn2 waffle-btn waffle-limited-btn"
                @click="onButtonClick(getFilmsList('LIMITED', 'Status'))"
                @mouseover="highlightFilms(getFilmsList('LIMITED', 'Status'))"
                @mouseout="highlightFilmsReset(getFilmsList('LIMITED', 'Status'))"
              >
                LIMITED
              </button>
              assistance,
              <button
                class="text1-btn3 waffle-btn waffle-denied-btn"
                @click="onButtonClick(getFilmsList('DENIED', 'Status'))"
                @mouseover="highlightFilms(getFilmsList('DENIED', 'Status'))"
                @mouseout="highlightFilmsReset(getFilmsList('DENIED', 'Status'))"
              >
                DENIED
              </button>
              assistance, or
              <button
                class="text1-btn4 waffle-btn waffle-other-btn"
                @click="onButtonClick(getFilmsList('OTHER', 'Status'))"
                @mouseover="highlightFilms(getFilmsList('OTHER', 'Status'))"
                @mouseout="highlightFilmsReset(getFilmsList('OTHER', 'Status'))"
              >
                OTHER
              </button>
              — a category of films that did not request military assistance but
              were included in the database anyway.
              <br />
              <br />
            </div>
          </div>

          <!-- SECTION 4 -->
          <div class="waffle-text text4 hide">
            <div class="text-section">
              Why do the military and Hollywood collaborate? The <a href="https://www.defense.gov/Explore/Inside-DOD/Blog/Article/2062735/how-why-the-dod-works-with-hollywood/" target="_blank"
                rel="noopener noreferrer">DoD's website</a> lists two reasons: to "accurately depict military stories and make sure sensitive information isn't disclosed." But there are clearly other reasons — ones that have remained mostly unchanged in the last century of cinema.
            </div>
            <div class="center">
            </div>
          </div>

          <!-- SECTION 5 starspangledbannerapproved -->
          <div class="waffle-text text5 hide">
            <div class="text-section">
              Take
              <button 
                class="text1-btn1 waffle-btn waffle-approved-btn"
                @click="onButtonClick(getFilmsList('starspangledbannerapproved', 'TitleClass'))"
                @mouseover="highlightFilms(getFilmsList('starspangledbannerapproved', 'TitleClass'))"
                @mouseout="highlightFilmsReset(getFilmsList('starspangledbannerapproved', 'TitleClass'))"
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
            </div>
          </div>

          <!-- SECTION 6 topgunapproved-->
          <div class="waffle-text text6 hide">
            <div class="text-section">
              Seventy years later, the 1986 film
              <button
                class="text1-btn1 waffle-btn waffle-approved-btn"
                @click="onButtonClick(getFilmsList('topgunapproved', 'TitleClass'))"
                @mouseover="highlightFilms(getFilmsList('topgunapproved', 'TitleClass'))"
                @mouseout="highlightFilmsReset(getFilmsList('topgunapproved', 'TitleClass'))"
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
                @click="onButtonClick(getFilmsList('topgunapproved', 'TitleClass'))"
                @mouseover="highlightFilms(getFilmsList('topgunapproved', 'TitleClass'))"
                @mouseout="highlightFilmsReset(getFilmsList('topgunapproved', 'TitleClass'))"
              >
                TOP GUN
              </button>
              went beyond recruiting to complete the “rehabilitation of the
              military’s image, which had been savaged by the Vietnam War.”
            </div>
            <div class="center">
            </div>
          </div>

          <!-- SECTION 7 -->
          <div class="waffle-text text7 hide">
            <div class="text-section">
              Examining the data reveals that while the relationship between Hollywood and the military is mutual, it is not entirely equal.
              <br>
              <br>
              Hollywood producers submit a request to the military for resources that would normally be out of reach, like shooting locations, equipment, stock footage, and expert advice. In exchange — and often as a prerequisite to approval — the DoD can <b>demand changes to the film’s script</b> that effectively guarantee positive advertising.
              <br>
              <br>
              What kinds of films get approved or denied? Explore the data to learn more.
            </div>

          </div>

          <!-- SECTION 8 -->
          <div class="waffle-text text8 hide">          
              <div class='text-section'>
                <div class='search-bar'>
                  Search
                  <select class='search-location' v-model="searchLocation" placeholder='Remarks'>
                    <option>Military Remarks</option>
                    <option>Titles</option>
                    <option>Plots</option>
                    <option>Actors</option>
                    <option>Directors</option>
                  </select> for  
                  <input class='search-input' v-model='searchTerm' :placeholder="placeholderText">
                  <button class='search-btn waffle-btn waffle-approved-btn' @click="onButtonClick(getFilmsList(`${searchTerm}`, `${searchCategory}`))">Search</button>
                  <button class='clear-btn waffle-btn waffle-neutral-btn' @click="resetAll">Clear Highlight</button>
                </div>
                
                <!-- WARS -->
                <div class='button-group'>
                  <div class='search-bar-instructions'>HIGHLIGHT FILMS RELEASED DURING MAJOR WARS, OR AN INTRAWAR PERIOD</div>
                  <button :class='[`${currentWar.toString().replaceAll(" ", "").replace("1", "One").replace("2", "Two")}-btn`]' class='war-btn waffle-btn waffle-neutral-btn' v-for="currentWar in warOptions" :key="currentWar"
                  @click="onButtonClick(getFilmsList(`${currentWar}`, 'CurrentWar'))"
                  >{{ currentWar }}</button>
                </div>
                <!-- GENRES -->
                <div class='button-group'>
                  <div class='search-bar-instructions'>HIGHLIGHT FILMS BY GENRE</div>
                  <button :class='[`${genre}-btn`]' class='genre-btn waffle-btn waffle-neutral-btn' v-for="genre in genreOptions" :key="genre"
                  @click="onButtonClick(getFilmsList(`${genre}`, 'Genre'))"
                  >{{ genre }}</button>
                </div>
              </div>
          </div>

          <!-- SECTION 9 -->
          <div class="waffle-text text9 hide">
            <div class="text-section">
              <div class='end-header'>ABOUT THE DATA</div>
              The dataset for this project was originally downloaded as a <a href='https://drive.google.com/file/d/1NeDVYu_gvEhtdQVtSFPRIapHDxJx6842/view?usp=sharing' target="_blank" rel="noopener noreferrer">PDF file</a> from <a href='https://www.spyculture.com/' target="_blank" rel="noopener noreferrer">Spy Culture</a>, the website of the journalist Tom Secker, who acquired the file in a 2017 Freedom of Information request to the U.S. Pentagon.
              <br>
              <br>
              With the help of some very patient friends, the PDF file was manually transcribed into a spreadsheet of 865 TV episodes and films. This project focused on the <a href='https://docs.google.com/spreadsheets/d/1HwdmpiSpNXfoNoI_5ndwdQi3Z3lCXU8VthPYelr6ZqA/edit?usp=sharing' target="_blank" rel="noopener noreferrer">509 films</a> in the database with confirmed release dates on IMDb. Some of the DoD's remarks were edited for spelling and clarity.
              <br>
              <br>
              The data does not encompass every single film that collaborated with the DoD in the last century — it is limited by what the Pentagon chose to release in the 2017 FOIA request and what I could find on IMDb.
              <br>
              <br>
              <div>
                <a href='https://github.com/koffeeya/military-media' target="_blank" rel="noopener noreferrer">See the project on GitHub.</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- CONTENT AREA -->
      <div class="row2">
        <!-- Waffle Chart -->
        
        <div v-if="activeText > 2 && activeText != 4 && activeText != 7 && activeText != textLength" class="group-wrapper" id='waffle-chart'>
          <div class='filmsNum ww1'>Showing {{ activeFilmsNum }} {{ filmPlural }}</div>
          <!-- Waffle Items -->
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
              <!-- Year Values -->
              <div class="year-val">
                <b :class="yearValueClass(movie.Year)">
                  {{ yearValue(movie.Year) }}
                </b>
              </div>
        </div>
        </div>
        <!-- Chart Label -->
        <div v-if="activeText > 2 && activeText != 4 && activeText != 7 && activeText != textLength" class="waffle-axis-title">
          FILMS IN THE DATABASE BY RELEASE YEAR
        </div>
        <!-- Bar Chart -->
        <div v-if="activeText > 2 && activeText != 4 && activeText != 7 && activeText != textLength" class='status-bar-chart'>
          <div class='status-bar-item approved-bar' :style="{width:`${defaultPercent.approved}%`}">{{percent.approved}}%</div>
          <div class='status-bar-item denied-bar' :style="{width:`${defaultPercent.denied}%`}">{{percent.denied}}%</div>
          <div class='status-bar-item limited-bar' :style="{width:`${defaultPercent.limited}%`}">{{percent.limited}}%</div>
          <div class='status-bar-item other-bar' :style="{width:`${defaultPercent.other}%`}">{{percent.other}}%</div>
        </div>
        <!-- Continue Button -->
        <div v-if="activeText < textLength" class="center">
          <button class="next-section-btn" @click="navbarClick(activeText + 1)">
            <svg viewBox="0 0 16 16" class="bi bi-arrow-right-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import WaffleItem from "../components/WaffleItem.vue";
import AppTitle from "./AppTitle.vue";
import GenreButton from "../components/GenreButton.vue";
import MovieCardChart from "../components/MovieCardChart.vue"

export default {
  name: "WaffleChart",
  props: ["filmsByYear", "rawData", "carouselData", "genreOptions", "warOptions"],
  data() {
    return {
      activeText: 1,
      textLength: 9,
      clicked: false,
      previouslyClicked: null,
      genreData: null,
      searchTerm: "",
      searchLocation: "Military Remarks",
      searchLocationClean: "Remarks",
      activeFilmsNum: 509,
      defaultPercent: {
        approved: 59,
        denied: 18,
        limited: 12,
        other: 11,
      },
      percent: {
        approved: 59,
        denied: 18,
        limited: 12,
        other: 11,
      },
      prevPercent: {
        approved: 59,
        denied: 18,
        limited: 12,
        other: 11,
      },
      stepList: [
        {
          step: 1,
          section: "text1",
          icon: "icon1",
        },
        {
          step: 2,
          section: "text2",
          icon: "icon2",
        },
        {
          step: 3,
          section: "text3",
          icon: "icon3",
        },
        {
          step: 4,
          section: "text4",
          icon: "icon4",
        },
        {
          step: 5,
          section: "text5",
          icon: "icon5",
        },
        {
          step: 6,
          section: "text6",
          icon: "icon6",
        },
        {
          step: 7,
          section: "text7",
          icon: "icon7",
        },
        {
          step: 8,
          section: "text8",
          icon: "icon8",
        },
        {
          step: 9,
          section: "text9",
          icon: "icon9",
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
    filmPlural() {
      if (this.activeFilmsNum === 1) {
        return "film"
      } else return "films"
    },
    placeholderText() {
      if (this.searchLocation === "Military Remarks") {
        return "negative, unrealistic, image..."
      } else if (this.searchLocation === "Titles") {
        return "transformers, francis, king kong..."
      } else if (this.searchLocation === "Plots") {
        return "vietnam, civil war, ufo..."
      } else if (this.searchLocation === "Directors") {
        return "michael bay, steven spielberg..."
      } else if (this.searchLocation === "Actors") {
        return "john wayne, tom hanks..."
      } else {
        return "search"
      }
    },
    searchCategory() {
      if (this.searchLocation === "Titles") {
        return "TitleClean"
      } else if (this.searchLocation === "Plots") {
        return "PlotShort"
      } else if (this.searchLocation === "Directors") {
        return "Director"
      } else if (this.searchLocation === "Military Remarks") {
        return "Remarks"
      } else return this.searchLocation;
    },
  },
  methods: {
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
        d3.select('.filmsNum')
          .style('opacity', 0.5)
          .transition()
          .duration(200)
          .style('opacity', 1)
        this.activeFilmsNum = arr.length;

        d3.select(`.${thisBtn}`).style("border", "2px solid white");
        d3.selectAll(".waffle-item")
          .transition()
          .duration(200)
          .style("opacity", "1");
        d3.selectAll(".waffle-item")
          .transition()
          .duration(200)
          .style("opacity", "0.1");

        // Transition the size of the bar
        d3.select('.approved-bar')
          .style("width", `${this.defaultPercent.approved}%`)
          .transition()
          .duration(200)
          .style("width", `${this.percent.approved}%`)
        d3.select('.denied-bar')
          .style("width", `${this.defaultPercent.denied}%`)
          .transition()
          .duration(200)
          .style("width", `${this.percent.denied}%`);
        d3.select('.limited-bar')
          .style("width", `${this.defaultPercent.limited}%`)
          .transition()
          .duration(200)
          .style("width", `${this.percent.limited}%`);
        d3.select('.other-bar')
          .style("width", `${this.defaultPercent.other}%`)
          .transition()
          .duration(200)
          .style("width", `${this.percent.other}%`);

        arr.map((className) => {
          d3.selectAll(`.${className}`)
            .transition()
            .duration(200)
            .style("opacity", "1");
        });
      }
      this.previouslyClicked = thisBtn;
    },
    getRolledUpData(data, query) {
      if (data.get(query) === undefined) {
        return 0;
      } else {
        return data.get(query)
      }
    },
    getStatusPercent(data) {
      const dataLen = data.length;
      const rollup = d3.rollup(data, v => v.length, d => d.Status);
      const numApproved = this.getRolledUpData(rollup, "APPROVED")
      const numDenied = this.getRolledUpData(rollup, "DENIED")
      const numLimited = this.getRolledUpData(rollup, "LIMITED")
      const numOther = this.getRolledUpData(rollup, "OTHER")

      this.percent.approved = Math.floor((numApproved / dataLen) * 100);
      this.percent.denied = Math.floor((numDenied / dataLen) * 100);
      this.percent.limited = Math.floor((numLimited / dataLen) * 100);
      const sum = this.percent.approved + this.percent.denied + this.percent.limited
      this.percent.other = 100 - sum;
    },
    getFilmsList(filterName, field) {
      const filteredData = d3.filter(this.rawData, (d) => {
        if (d[`${field}`] === null || d.TitleClass === null || d.Year === null) {
          return;
        } else {
          const cleanField = d[`${field}`].toUpperCase();
          return cleanField.includes(filterName.toUpperCase());
        }
      })
      this.getStatusPercent(filteredData);
      const filmArr = this.getColByName(filteredData, "TitleClass");
      return filmArr;
    },
    highlightFilms(arr) {
      if (this.clicked === true) {
        return;
      } else {
        d3.select('.filmsNum')
          .style('opacity', 0.5)
          .transition()
          .duration(200)
          .style('opacity', 1)
        
        this.activeFilmsNum = arr.length;

        // Transition the size of the bar
        d3.select('.approved-bar')
          .style("width", `${this.defaultPercent.approved}%`)
          .transition()
          .duration(200)
          .style("width", `${this.percent.approved}%`)
        d3.select('.denied-bar')
          .style("width", `${this.defaultPercent.denied}%`)
          .transition()
          .duration(200)
          .style("width", `${this.percent.denied}%`);
        d3.select('.limited-bar')
          .style("width", `${this.defaultPercent.limited}%`)
          .transition()
          .duration(200)
          .style("width", `${this.percent.limited}%`);
        d3.select('.other-bar')
          .style("width", `${this.defaultPercent.other}%`)
          .transition()
          .duration(200)
          .style("width", `${this.percent.other}%`);
        // Highlight the right films
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
    resetAll() {
      this.clicked = false;
      this.previouslyClicked = null;
      this.searchTerm = "";
      d3.selectAll(`.waffle-btn`).style("border", "");
        // Update the number of films
        d3.select('.filmsNum')
          .style('opacity', 1)
          .transition()
          .duration(200)
          .style('opacity', 0.5)
        const filmsWithYears = this.rawData.filter((d) => {
            return (d.Year != null && d.Status != null);
          })
        this.activeFilmsNum = filmsWithYears.length;

        // Transition the size of the bar
        d3.select('.approved-bar')
          .transition()
          .duration(200)
          .style("width", `${this.defaultPercent.approved}%`)
        d3.select('.denied-bar')
          .transition()
          .duration(200)
          .style("width", `${this.defaultPercent.denied}%`);
        d3.select('.limited-bar')
          .transition()
          .duration(200)
          .style("width", `${this.defaultPercent.limited}%`);
        d3.select('.other-bar')
          .transition()
          .duration(200)
          .style("width", `${this.defaultPercent.other}%`);
        // Reset the percentages
        this.percent = {
          approved: this.defaultPercent.approved,
          denied: this.defaultPercent.denied,
          limited: this.defaultPercent.limited,
          other: this.defaultPercent.other,
        }
        // Reset the waffle highlights
        d3.selectAll(".waffle-item")
          .transition()
          .duration(200)
          .style("opacity", "1");
    
    },
    highlightFilmsReset(arr) {
      if (this.clicked === true) {
        this.searchTerm = "";
        return;
      } else if (this.clicked === false) {
        this.searchTerm = "";
        // Update the number of films
        d3.select('.filmsNum')
          .style('opacity', 1)
          .transition()
          .duration(200)
          .style('opacity', 0.5)
        const filmsWithYears = this.rawData.filter((d) => {
            return (d.Year != null && d.Status != null);
          })
        this.activeFilmsNum = filmsWithYears.length;

        // Transition the size of the bar
        d3.select('.approved-bar')
          .transition()
          .duration(200)
          .style("width", `${this.defaultPercent.approved}%`)
        d3.select('.denied-bar')
          .transition()
          .duration(200)
          .style("width", `${this.defaultPercent.denied}%`);
        d3.select('.limited-bar')
          .transition()
          .duration(200)
          .style("width", `${this.defaultPercent.limited}%`);
        d3.select('.other-bar')
          .transition()
          .duration(200)
          .style("width", `${this.defaultPercent.other}%`);
        // Reset the percentages
        this.percent = {
          approved: this.defaultPercent.approved,
          denied: this.defaultPercent.denied,
          limited: this.defaultPercent.limited,
          other: this.defaultPercent.other,
        }
        // Reset the waffle highlights
        d3.selectAll(".waffle-item")
          .transition()
          .duration(200)
          .style("opacity", "1");
      }
    },
    getColByName(arr, columnName) {
      const col = [];
      for (let row = 0; row < arr.length ; row++) {
        const value = Object.values(arr)[row][columnName];
        col.push(value);
      }
      return col;
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
    GenreButton,
    MovieCardChart
  },
};
</script>

<style scoped>

/* STRUCTURE */
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

.row1 {
  padding: 0px;
  margin: 0px auto;
}

.row2 {
  padding: 50px 0px 0px 0px;
  margin: 0px auto;
}

.text-section {
  margin: 2% 0% 5% 0%;
}


/* NAVIGATION */
.waffle-icon-wrapper {
  margin: 0px auto;
  background-color: var(--bg-color);
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  width: 50%;
  position: sticky;
  top: 0px;
  padding: 10px 0px;
  border-bottom: 2px solid var(--accent);
}

.progress-icon {
  height: 10px;
  margin: 0px;
  border-left: 1px solid var(--bg-color);
  border-right: 1px solid var(--bg-color);
  font-size: 15px;
  text-align: center;
  font-family: var(--card-font);
  text-transform: uppercase;
  font-weight: 900;
}

.active-icon {
  background-color: white;
  color: var(--bg-color);
}

.active-icon:hover {
  cursor: pointer;
  background-color: gray;
  color: var(--bg-color);
}

.inactive-icon {
  background-color: var(--accent);
  color: transparent;
}

.inactive-icon:hover {
  cursor: pointer;
  background-color: gray;
  color: white;
}

.enter-button {
  margin: 1% 33% 0% 33%;
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
  margin: 0px 0px 10px 0px;
  padding: 5px 5px 0px;
  min-width: 80px;
  font-size: 12px;
  font-family: var(--title-font);
  color: gray;
  border: none;
  border-radius: 20px;
  background-color: var(--bg-color);
  font-weight: 900;
}

.next-section-btn:hover {
  background-color: gray;
  color: var(--accent);
  cursor: pointer;
}


/* TEXT */
.waffle-text {
  font-size: var(--body-size);
  min-height: 25vh;
  margin: 0% auto;
  line-height: 35px;
  max-width: 45%;
  padding: 2% 0% 0%;
}

.text-emphasis {
  margin: 0px 0px 20px;
  padding: 10px 20px;
  background-color: var(--accent);
  font-family: var(--card-font);
  font-weight: 500;
  font-size: var(--body-font);
}

.paragraph-header {
  font-size: 21px;
  font-weight: 900;
  text-align: center;
  font-family: var(--card-font);
  color: gray;
}

.filmsNum {
  position: absolute;
  left: 45%;
  top: 5%;
  font-weight: 500;
  opacity: 0.5;
}


/* BUTTONS */
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


/* STATUS BAR CHART */
.status-bar-chart {
  display: flex;
  margin: 0px auto;
  width: 65%;
  transform: translateY(-50px);
  font-family: var(--card-font);
  text-align: center;
  color: var(--bg-color);
}

.status-bar-item {
  height: 20px;
  margin: 1px;
  font-weight: 900;
}

.approved-bar {
  background-color: var(--approved);
  opacity: 0.8;
}

.approved-bar:hover {
  opacity: 1;
}

.denied-bar {
  background-color: var(--denied);
  opacity: 0.8;
}

.denied-bar:hover {
  opacity: 1;
}

.other-bar {
  background-color: var(--other);
  opacity: 0.8;
}

.other-bar:hover {
  opacity: 1;
}

.limited-bar {
  background-color: var(--limited);
  opacity: 0.8;
}

.limited-bar:hover {
  opacity: 1;
}

/* SEARCH SECTION */
.search-bar {
  display: float;
}

.search-location {
  font-family: var(--card-font);
  font-size: 18px;
  padding: 5px 10px;
  margin: 0px 5px 5px;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  width: fit-content;
}

.search-input {
  font-family: var(--card-font);
  font-size: 18px;
  padding: 5px 10px;
  margin: 0px 5px 15px;
  border-radius: 10px;
  border: none;
  font-weight: 500;
  width: 40%;
}

.search-bar-instructions {
  font-size: 12px;
  color: gray;
  font-family: var(--card-font);
  font-weight: 500;
  line-height: 22px;
}

.button-group {
  margin: 30px 0px;
}

/* CREDITS */
.end-header {
  font-family: var(--card-font);
  font-size: 16px;
  color: var(--denied);
  font-weight: 900;
}

/* MEDIA BREAKPOINTS */

@media only screen and (max-width: 600px) {

  .next-section-btn {
    min-width: 60px;
  }

  .waffle-text {
    font-size: var(--body-size);
    min-height: none;
    overflow: auto;
    margin: 5% auto 0%;
    line-height: 26px;
    max-width: 85%;
    padding: 2% 0% 0%;
  }

}
</style>

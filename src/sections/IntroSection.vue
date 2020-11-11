<template>
<div class='intro'>
    <div class='intro-text-section'>
        <div class='spacer'></div>
        <div class='text-wrapper'>
          <div class='intro-text-box'>
            <div class='intro-text'>
              The U.S. Department of Defense (DoD) and Hollywood have a <a href='https://en.wikipedia.org/wiki/Military-entertainment_complex' target='_new'>history of collaboration</a> that has spanned the last century of entertainment. Films that need military resources must submit (and often revise) their scripts to meet <b style='color: var(--denied)'>criteria for approval</b> that implicitly reflect the values and interests of each branch of service.
            </div>
            <div class='intro-text'>
              This project explores a database -- acquired through a <a href='https://www.spyculture.com/dod-hollywood-collaboration-database-excerpts/' target='_new'>2016 FOIA request</a> -- of <b style='color: var(--denied)'>{{ totalLength }} film productions</b> that asked the DoD for assistance in the last 100 years. What kind of help does the military provide? What films make the cut? And what does it reveal about the kinds of stories that get told?
            </div>
          </div>
        </div>
        <div class='spacer'></div>
    </div>
    <CarouselSection :carouselData="carouselData"></CarouselSection>
</div>
</template>

<script>
import CarouselSection from './CarouselSection.vue';
import * as d3 from "d3";
export default {
    name: 'IntroSection',
    props: ['carouselData', 'movies'],
    data() {
      return {
        textBoxLoaded: false,
        carouselLoaded: false,
      }
    },
    methods: {
      onLoaded() {
        this.textBoxLoaded = true;
        this.carouselLoaded = true;
      }
    },
    computed: {
      totalLength() {
        return this.movies.length
      }
    },
    mounted() {
      d3.selectAll(".intro-text-section").classed("show", true)
    },
    components: {
      CarouselSection,
    }
}
</script>

<style scoped>

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

.hide {
  position: absolute !important;
  top: -9999px !important;
  left: -9999px !important;
}

.text-wrapper {
  margin: 0px 0px 60px 0px;
  padding: 15px;
  border: 2px solid var(--denied);
  text-align: center;
  box-shadow: 5px 5px var(--denied);
  display: flex;
  justify-content: center;
  align-items: center;
}

.intro-text {
  margin: 15px 0px;
}

.intro-text-section {
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr;
}

@media only screen and (max-width: 400px) { 
    .intro-text-section {
      grid-template-columns: 0fr 7fr 0fr;
    }
}

@media only screen and (max-width: 800px) { 
    .intro-text-section {
      grid-template-columns: 1fr 5fr 1fr;
    }
}

@media only screen and (min-width: 1600px) { 
    .intro-text-section {
      grid-template-columns: 4fr 5fr 4fr;
    }
}


</style>

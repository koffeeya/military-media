<template>
<div class='intro'>
  <div class='intro-text-section'>
      <div class='spacer'></div>
      <div class='text-wrapper'>
        <div class='intro-text-box'>
          <div class='intro-text'>
            Hollywood producers have been requesting support from the U.S. military for over 100 years. But the military doesn’t always cooperate.
          </div>
          <div class='intro-text'>
            This project explores a database of <b style='color: var(--denied)'>{{ totalLength }} films</b> from the last century that <b style='color: var(--denied)'>requested production support from the U.S. military</b>.  What kinds of support does the military provide? What films make the cut, and why?
          </div>
        </div>
      </div>
      <div class='spacer'></div>
  </div>
  <CarouselSection :carouselData="carouselData" :movies="movies"></CarouselSection>
</div>
</template>

<script>
import CarouselSection from './CarouselSection.vue'
export default {
    name: 'IntroSection',
    props: ['carouselData', 'movies'],
    computed: {
      totalLength() {
        return this.movies.length
      }
    },
    components: {
      CarouselSection,
    }
}
</script>

<style scoped>

.hide {
  position: absolute !important;
  top: -9999px !important;
  left: -9999px !important;
}

.text-wrapper {
  margin: 0px 0px 60px 0px;
  padding: 20px;
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

@media only screen and (max-width: 900px) { 
    .intro-text-section {
      grid-template-columns: 1fr 5fr 1fr;
    }
}

@media only screen and (min-width: 1000px) { 
    .intro-text-section {
      grid-template-columns: 5fr 5fr 5fr;
    }
}


</style>

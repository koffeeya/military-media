<template>
  <div class='intro-text-container'>
    <div class='intro-text'>
      The U.S. Department of Defense (DoD) and Hollywood have a <a href='https://en.wikipedia.org/wiki/Military-entertainment_complex' target='_new'>history of cooperation</a> that has spanned the last century of entertainment. Films that need military resources must submit (and often revise) their scripts to meet <b style='color: var(--denied)'>criteria for approval</b> that implicitly reflect the values and interests of each branch of service.
    </div>
    <div class='intro-text'>
      This project explores a database -- acquired through a <a href='https://www.spyculture.com/dod-hollywood-collaboration-database-excerpts/' target='_new'>2016 FOIA request</a> -- of <b style='color: var(--denied)'>549 film productions</b> that asked the DoD for assistance in the last 100 years. What kind of help does the military provide? What films make the cut? And what does it reveal about the kinds of stories that get told?
    </div>
  </div>
</template>

<script>

export default {
    name: 'IntroText',
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

.intro-text-container {
  padding: 50px 0px 50px 25px;
}

.intro-text {
  margin: 45px 0px;
  font-size: 25px;
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

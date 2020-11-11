<template>
<div class='title-wrapper'>
    <div class='title-container'><b class='app-title first-word'>ASSISTANCE</b><b class='app-title second-word'>DENIED</b></div>
    <div class='app-subtitle'>HOW THE <b style='color: var(--approved)'>MILITARY</b> & <b style='color: var(--denied)'>HOLLYWOOD</b> WORK TOGETHER</div>
  </div>
</template>

<script>
export default {
    name: 'AppTitle',
}
</script>

<style scoped>

.title-wrapper {
  text-align: center;
  margin: 1% 0% 2% 0%;
}

.app-title {
  font-family: var(--title-font);
  font-size: var(--h1-size);
  color: white;
}

.app-subtitle {
  font-size: 23.5px;
  color: var(--subtitle);
  transform: translateY(-8px);
}

.first-word {
  text-shadow: 0px 4px var(--approved);
}

.second-word {
  text-shadow: 0px 4px var(--denied);
  margin: 0px 0px 0px 10px;
}


@media only screen and (max-width: 900px) {

  .app-title {
    font-size: 50px;
  }

  .title-container {
    display: grid;
  }

  .second-word {
    text-shadow: 0px 4px var(--denied);
    margin: 0px 0px 0px 10px;
    transform: translateY(-22px);
  }

  .app-subtitle {
    font-size: 18px;
    color: var(--subtitle);
    transform: translateY(-20px);
  }

}

</style>

<template>
  <div class='title-wrapper' :data-index='index'>
      <div class='title-words'>
        <div class='app-title'>ASSISTANCE DENIED</div>
        <div class='subtitle-text-wrapper'>
          <div class='app-subtitle subtitle-first'>A project exploring the 100-year history of <b class='subtitle-emphasis'>cooperation</b></div>
          <div class='app-subtitle subtitle-second'>between <b class='subtitle-emphasis'>Hollywood</b> and the <b class='subtitle-emphasis'>United States military</b></div>
          <div class='app-subtitle subtitle-third'>through a database of <b class='subtitle-emphasis'>549 films</b></div>
        </div>
        <div class='contents'>
          <div class='content-btn'>SCROLL DOWN</div>
        </div>
      </div>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
    name: 'AppTitle',
    props: ['observer', 'stepList', 'index'],
    data() {
        return {
          step: this.stepList[this.index],
      }
    },
    methods: {
      
    },
    mounted() {
      this.observer.observe(this.$el);
    },
}
</script>

<style scoped>

@keyframes textflicker {
  from {
    text-shadow: 1px 0 0 var(--approved), -2px 0 0 var(--approved);
  }
  to {
    text-shadow: 2px 0.5px 2px var(--denied), -1px -0.5px 2px var(--denied);
  }
}

.title-wrapper {
  margin: 300px 0px 300px 0px;
}


.title-words {
  text-align: center;
  margin: 10px;
}

.app-title {
  font-family: var(--title-font);
  font-size: 100px;
  color: var(--denied);
  font-weight: 900;
  animation-duration: 0.01s;
  animation-name: textflicker;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.app-title:hover {
   color: var(--approved);
}

.app-subtitle {
  font-size: 30px;
  color: white;
}

.subtitle-text-wrapper {
  margin: 40px 0px 0px 0px;
}

.subtitle-emphasis {
  font-weight: 900;
  color: white;
  text-shadow: 0px 2px var(--denied);
  animation-duration: 0.01s;
  animation-name: textflicker;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.subtitle-emphasis:hover {
  color: var(--denied);
}

.subtitle-first {
  margin: 0px 10px 0px 10px;
  opacity: 0;
}

.subtitle-second {
  margin: 0px 10px 0px 10px;
  opacity: 0;
}

.subtitle-third {
  margin: 0px 10px 0px 10px;
  opacity: 0;
}

.content-btn {
  background-color: var(--bg-color);
  padding: 10px 20px;
  margin: 80px 20px;
  border: none;
  font-family: var(--card-font);
  font-weight: 900;
  color: var(--denied);
}

.content-btn:hover {
  color: var(--approved);
}


@media only screen and (max-width: 900px) {

  .app-title {
    font-size: 50px;
  }

  .title-words {
    display: grid;
  }

  .app-subtitle {
    font-size: 18px;
    color: var(--subtitle);
    transform: translateY(-20px);
  }

}

</style>

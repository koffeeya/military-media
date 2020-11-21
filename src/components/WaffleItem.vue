<template>
  <div class="waffle-item" @mouseover=onMouseOver @mouseleave=onMouseLeave :class="[{ active: hover }, movieStatus]"></div>
  <div class="hover-message" :style="{ x: +tooltipLocation[0] + 'px', y: +tooltipLocation[1] + 'px' }" v-if="hover">
    <div>
      {{ Title }}
    </div>
  </div>
    
  
</template>

<script>
//import * as d3 from 'd3'
export default {
  name: "WaffleItem",
  props: [
    "Title",
    "Remarks",
    "Year",
    "FilmReleased",
    "Genre",
    "ratingImdb",
    "imdbVotes",
    "Status",
    "Poster",
    "Plot",
    "Awards",
    "Actors",
    "Director",
  ],
  data() {
    return {
      hover: false,
      click: false,
      x: 0,
      y: 0,
      active: false,
    };
  },
  computed: {
    movieStatus() {
      if (this.Status === "APPROVED") {
        return "approved-waffle";
      } else if (this.Status === "DENIED") {
        return "denied-waffle";
      } else if (this.Status === "LIMITED") {
        return "limited-waffle";
      } else if (this.Status === "OTHER") {
        return "other-waffle";
      } else {
        return "none-waffle";
      }
    },

    tooltipLocation() {
      if (this.hover === false) {
        return [0, 0];
      } else {
        return [this.x, this.y];
      }
    },
  },
  methods: {
    onClick() {
      console.log("clicked");
      this.click = true;
    },
    onMouseOver() {
      this.hover = true;
      this.x = +event.x;
      this.y = +event.y;
    },
    onMouseLeave() {
      this.hover = false;
      this.bottom = 0;
    },
  },
};
</script>

<style scoped>
.hover-message {
  position: absolute;
  background-color: var(--bg-color);
  transform: translateY(-50px);
}

.active {
  cursor: pointer;
  background-color: white;
  opacity: 0.7;
}

.waffle-item {
  height: 12px;
  border: 1px solid var(--bg-color);
  padding: 1px;
}

.approved-waffle {
  background-color: var(--approved);
  /* opacity: 0.4; */
}

.denied-waffle {
  background-color: var(--denied);
  /* opacity: 0.4; */
}

.limited-waffle {
  background-color: var(--limited);
  /* opacity: 0.4; */
}

.other-waffle {
  background-color: var(--other);
  /* opacity: 0.4; */
}

.none-waffle {
  background-color: transparent;
  display: none;
}
</style>

<template>
<div class='movie-card' :class="movieStatus">
  <div class='movie-status'>{{ Status }}</div>
  <div class='movie-title'>{{ Title }}</div>
  <div class='movie-year'>{{ Year }}</div>
  <div class='movie-remarks'>"{{ Remarks }}"</div>
</div>
</template>

<script>
export default {
  props: ['Title', 'Remarks', 'Year', 'Status'],
  methods: {
    handleClick() {
      this.count++;
      if (this.count === 1) {
        this.plural = "time"
      } else {
        this.plural = "times"
      }
    },
  },
  computed: {
    movieStatus() {
      if (this.Status === "APPROVED") {
        return "approved"
      } else if (this.Status === "DENIED") {
        return "denied"
      } else return "other"
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.movie-card {
  padding: 15px;
  background-color:lightgrey;
}

.movie-card:hover {
  cursor: pointer;
}

.approved {
  background-color: rgb(199, 233, 199);
}

.approved:hover {
  background-color:lightgreen;
}

.denied {
  background-color: rgb(236, 186, 186);
}

.denied:hover {
  background-color: lightcoral;
}

.other {
  background-color: rgb(236, 236, 236);
}

.other:hover {
  background-color: lightgrey;
}

.movie-title {
  font-size: 25px;
  font-weight: 900;
  padding: 5px 0px;
  color: black;
  line-height: 21px;
}

.movie-year {
  font-size: 16px;
  padding: 5px 0px;
}

.movie-status {
  font-size: 16px;
  padding: 10px 0px;
  color: black;
  font-weight: 900;
}

.movie-remarks {
  font-size: 12px;
  text-align: left;
}


</style>

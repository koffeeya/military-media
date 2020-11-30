<template>
    <div class='btn' :class="genreStyle"> {{ genre.toUpperCase() }}</div>
</template>

<script>
export default {
    name: 'GenreButton',
    props: ['genre', 'movieStatus'],
    computed: {
        genreStyle() {
            if (this.movieStatus === "APPROVED") {
                return "genre-approved"
            } else if (this.movieStatus === "DENIED") {
                return "genre-denied"
            } else if (this.movieStatus === "LIMITED") {
                return "genre-limited"
            } else {
                return "genre-other"
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btn {
        margin: 5px 10px 0px 0px;
        padding: 5px 8px;
        width: fit-content;
        color: gray;
        font-family: var(--card-font);
        font-size: var(--subtitle-size);
        font-weight: 800;
        border-radius: 5px;
    }

    .genre-approved, .genre-denied, .genre-limited, .genre-other {
        background-color: var(--bg-color);
    }

    .genre-approved:hover {
        color: var(--bg-color);
        background-color: var(--approved);
    }

    .genre-denied:hover {
        color: var(--bg-color);
        background-color: var(--denied);
    }

    .genre-limited:hover {
        color: var(--bg-color);
        background-color: var(--limited);
    }

    .genre-other:hover {
        color: var(--bg-color);
        background-color: var(--other);
    }

</style>

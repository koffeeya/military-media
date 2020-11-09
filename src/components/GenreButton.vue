<template>
    <div class='btn' :class="movieStatus">{{ genre.toUpperCase() }}</div>
</template>

<script>
export default {
    props: ['genre', 'movieStatus']
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btn {
        margin: 0px 10px 0px 0px;
        padding: 5px 8px;
        width: fit-content;
        color: var(--bg-color);
        font-family: var(--body-font);
        font-size: var(--subtitle-size);
        background-color: var(--accent);
        font-weight: 800;
        border-radius: 5px;
    }

    .approved, .denied, .limited, .other {
        background-color: var(--accent);
    }

    /* .approved:hover {
        background-color: var(--approved);
    }

    .denied:hover {
        background-color: var(--denied);
    }

    .limited:hover {
        background-color: var(--limited);
    }

    .other:hover {
        background-color: var(--other);
    } */

</style>

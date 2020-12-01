<template>
  <div class='waffle-text-container'>
    <div class='waffle-text'>
      A Hollywood film producer approaches the DoD to request <b>assistance</b>. The DoD then reviews the request along with the script, and can fully <button class='waffle-btn waffle-approve-btn'>APPROVE</button> the request, approve <button class='waffle-btn waffle-limited-btn'>LIMITED</button> assistance, or <button class='waffle-btn waffle-deny-btn'>DENY</button> the request. Interestingly, the database also includes films in an <button class='waffle-btn waffle-other-btn'>OTHER</button> category that did not require DoD assistance, but portrayed the military anyway.
    </div>
  </div>
</template>

<script>

export default {
    name: 'WaffleText',
    
}
</script>

<style scoped>

.waffle-btn {
    margin: 5px;
    padding: 5px 8px;
    width: fit-content;
    color: gray;
    font-family: var(--card-font);
    font-size: var(--subtitle-size);
    font-weight: 800;
    border-radius: 5px;
    background-color: var(--accent);
    border: none;
}

.waffle-btn:hover {
  background-color: gray;
  color: var(--accent);
  cursor: pointer;
}

.waffle-text-container {
  padding: 50px 0px 50px 25px;
}

.waffle-text {
  margin: 45px 0px;
  font-size: var(--body-size);
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

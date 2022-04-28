<template>
    <form>
       <button id="savePoem"  v-on:click="saveThisPoem"> Save poem </button>
       <button id="showSavedPoem" v-on:click="showPoemSaved"> {{this.verb}} saved poem </button>
    </form>
    
</template>

<script>
export default {
  name: 'SavePoemForm',
  data() {
    return {
    verb: "Show",
    showThePoemSaved : false,
    }
  },
  methods: {
    saveThisPoem(event) {
      event.preventDefault();
      this.$emit('saveThePoem', true);
    },
    changeVerb() {
      if (this.verb == "Show") {
        this.verb = "Don't show";
      } else {
        this.verb = "Show";
      }
    },
    showPoemSaved(event) {
      event.preventDefault();
      this.changeVerb();
      this.showThePoemSaved = !this.showThePoemSaved;
      this.$emit('showThePoemSaved', this.showThePoemSaved);
    },
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped> 


form {
  float: right;
  width : auto;
  font-family: 'Cyrene', sans-serif;
  font-size: 20px;
}

button {
  border-radius: 50vw;
  border : none;
  background-color: var(--my-main-color);
  font-family: 'Cyrene', sans-serif;
  font-size: 17px;
  color:var(--my-paper-color);
  margin:5px;
  transition : background-color 2s;
}

button:active{
  color:var(--my-main-color);
  background-color:var(--my-paper-color);
}

/*Responsive*/
@media screen and (max-aspect-ratio : 3/4) {
  button {
    font-size : 17px;
  }
}

</style>
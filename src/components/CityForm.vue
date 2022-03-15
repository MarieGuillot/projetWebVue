<template>
    <form>
      <label for="name">Enter your city : </label>
      <input type="text" id="name" name="name" required
       minlength="1" maxlength="20" size="10">
       <button id="OkButton" v-on:click="submitCity"> Ok </button>
    </form>
</template>

<script>
export default {
  name: 'CityForm',
  methods : {
    submitCity() {
      event.preventDefault();
      var txt = document.getElementById('name');
      
      this.$root.$emit('city', txt.value);
    }
  }
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

#name {
  border-radius: 50vw;
  border: solid 2px var(--my-main-color);
  background: url('../assets/paper.jpg'), var(--my-paper-color);
  background-size: 500px;
  background-blend-mode: multiply;
  font-family: 'Cyrene', sans-serif;
  font-size: 20px;
  padding-left:10px;
  color: var(--my-main-color);
}

button {
  border-radius: 50vw;
  border : none;
  background-color: var(--my-main-color);
  font-family: 'Cyrene', sans-serif;
  font-size: 17px;
  color:var(--my-paper-color);
  margin:5px;
}

button:focus{
  color:var(--my-main-color);
  background-color:var(--my-paper-color);
}


</style>
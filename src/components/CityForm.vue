<template>
    <form>
      <label for="name">Enter your city : </label>
      <input v-on:input="okOn" type="text" id="name" name="name" required
       minlength="1" maxlength="20" size="10">
       <button id="OkButton" v-on:click="submitCity" v-if="okExists"> Ok </button>
    </form>
    
</template>

<script>
export default {
  name: 'CityForm',
  data() {
    return {
			okExists: false,
	}
	},
  methods : {
    submitCity(event) {
      event.preventDefault();
      var txt = document.getElementById('name');
      this.$emit('newCitySearched', txt.value);
    },
    okOn() {
      this.okExists = true;
      var txt = document.getElementById('name');
      if (txt.value == "") {
        this.okExists = false;
      }
    },
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
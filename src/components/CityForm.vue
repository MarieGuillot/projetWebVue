<template>
    <form>
      <div class="myForm">
        <label for="name">Enter your city : </label>
        <input v-on:input="okOn" type="text" id="name" name="name" required
        minlength="1" maxlength="20" size="10">
        <button id="OkButton" v-on:click.prevent="submitCity" v-if="okExists"> Ok </button>
      </div>
      <div class="myForm">
       <label for="select" v-if="!presentWanted"> Future option : </label>
       <select name="select" v-if="!presentWanted" v-on:input="optionFutureSelected" :value='optionFuture'> 
          <option v-for="option in options" :key="option.value" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
    </form>
    
</template>

<script>
export default {
  name: 'CityForm',
  props:{
    presentWanted : {type: Boolean, default : true},
    optionFuture : String,
  },
  data() {
    return {
			okExists: false,
      options: [
      { text: 'Today + 1', value: 'day1' },
      { text: 'Today + 2', value: 'day2' },
      { text: 'Today + 3', value: 'day3' },
      { text: 'Average', value: 'average' },
    ]
	}
	},
  methods : {
    submitCity() {
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
    optionFutureSelected(event) {
      this.$emit('newOptionFuture', event.target.value);
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
  display: flex;
}

.myForm {
  padding : 5px;
  padding-top : 15px;
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
  transition : border 2s;
}

select {
  border-radius: 50vw;
  border: solid 2px var(--my-main-color);
  background: url('../assets/paper.jpg'), var(--my-paper-color);
  background-size: 500px;
  background-blend-mode: multiply;
  font-family: 'Cyrene', sans-serif;
  font-size: 20px;
  padding-left:10px;
  color: var(--my-main-color);
  margin:5px;
  transition : border 2s;
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

button:focus{
  color:var(--my-main-color);
  background-color:var(--my-paper-color);
}

/*Responsive*/
@media screen and (max-aspect-ratio : 1/1) {
  .myForm {
    padding : 5px;
  }
  form {
    font-size : min(2.5vh, 20px);
    flex-direction: column;
  }
  button {
    font-size : min(2.5vh, 20px);
  }
  select {
    font-size : min(2.5vh, 20px);
  }
  #name {
    font-size : min(2.5vh, 20px);
    background-size: 300px;
  }
}



</style>
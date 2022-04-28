<template>
<div id="OuterBlock">
  <div id="WeatherInfo">
    <p id="titleSave" v-if="showPoemSaved"> Poem saved {{computedTime}} </p>
    <!-- Temperature -->
    <p id="textTemperature"> {{computedTemperature}} </p>
    <!-- Wind -->
    <p id="textWind"> {{computedWind}} </p>
    <!-- Description -->
    <p id="textDescription" v-html="computedDescription"> </p>
    <SavePoemForm v-on:showThePoemSaved="updateShowThePoemSaved" v-on:saveThePoem="savePoem"/>
  </div>
</div>
</template>

<script>

import {extractNumberFromString, getWeatherData, optionToIndex} from '@/services/api/weatherAPI.js'
import {createAPoemWithDescription, createAVerseWithTemperature, createAVerseWithWind} from '@/services/api/poetryAPI.js'
import SavePoemForm from "./savePoemForm"

export default {
  name: 'WeatherInfo',
  components: {
    SavePoemForm,
  },
  props:{
    citySearched : {type: String, required: true},
    presentWanted : {type: Boolean, default : true},
    optionToComputeFuture : {type: String, required: true},
  },
  watch: {
		citySearched: function (newCity) {
      this.searchAndWritePoems(newCity);
		}, 

    presentWanted :function() {
      this.searchAndWritePoems(this.citySearched);
    },
    optionToComputeFuture :function() {
      this.searchAndWritePoems(this.citySearched);
    },
	},
  computed: {
		computedTemperature: function() {
      if (this.showPoemSaved) {
        return this.savedTemperature;
      } else {
        return this.temperature;
      }
		},
    computedWind: function() {
      if (this.showPoemSaved) {
        return this.savedWind;
      } else {
        return this.wind;
      }
		},
    computedDescription: function() {
      if (this.showPoemSaved) {
        return this.savedDescription;
      } else {
        return this.description;
      }
		},
    computedTime: function() {
      if (this.showPoemSaved && this.savedDate != 0) {
        let timePassed = Date.now() - this.savedDate; //milliseconds
        timePassed = timePassed/1000; //seconds
        timePassed = Math.floor(timePassed/60); //minutes
        return " : "+timePassed+" min ago";
      } else {
        return "";
      }
		}
	},

  data() {
    return {
      weatherData: [],
      temperatureValue : 0,
      windValue : 0,
      temperature : "Ask for a city", 
      wind : "And a time", 
      description : "To discover weather through a poem", 
      showPoemSaved : false,
      savedTemperature: localStorage.getItem("saveTemperature") || "",
      savedWind: localStorage.getItem("saveWind") || "",
      savedDescription: localStorage.getItem("saveDescription") || "",
      savedDate : localStorage.getItem("saveDate") || 0,
    }
  },

  mounted: function() {
    if(this.citySearched != "no city yet") {
      this.searchAndWritePoems(this.citySearched);
    }
	},

	methods: {
    updateShowThePoemSaved: function(showValue) {
      this.showPoemSaved = showValue;
    },

    savePoem: function() {
      this.savedTemperature = this.temperature,
      this.savedWind = this.wind,
      this.savedDescription = this.description,
      this.savedDate = Date.now();
      localStorage.setItem("saveDescription", this.description);
      localStorage.setItem("saveTemperature", this.temperature);
      localStorage.setItem("saveWind", this.wind);
      localStorage.setItem("saveDate", this.savedDate);
    },

    searchAndWritePoems(newcity) {
      if (this.presentWanted) {
          getWeatherData(newcity).then(
          async (data) => {
          this.weatherData = data;
          this.composeAPoemFromPresentWeather().then(
                async() => {
                  this.setFutureOrPresentColors();
                }
          );
          }
        );
      } else {
          getWeatherData(newcity).then(
          async (data) => {
          this.weatherData = data;
            this.composeAPoemFromFutureWeather().then(
                async() => {
                  this.setFutureOrPresentColors();
                }
          );
          } 
        );
      }
      
    },

    setFutureOrPresentColors() {
      this.setColors(this.temperatureValue, this.windValue);
    },

    setColors(temperatureToColor, windToColor) {
      const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
      temperatureToColor = clamp(temperatureToColor, -25.5, 25.5)*10; 
      windToColor = clamp(windToColor, 0, 63)*4;

      if(temperatureToColor >= 0) {
        document.querySelector(':root').style.setProperty("--my-main-color", "rgb("+temperatureToColor+", "+windToColor+", 0)");
      } else {
        var temperatureAbs = Math.abs(temperatureToColor);
        document.querySelector(':root').style.setProperty("--my-main-color", "rgb(0,"+ windToColor+"," +temperatureAbs+")");
      }
    },

    write(location, text, currentLetter) {
      this[location] += text[currentLetter];
      if (currentLetter < text.length-1) {
        setTimeout(this.write, 30, location, text, currentLetter+1);
      }
    },

    async completePoem(location, waitMessage, functionToCreatePoem, parameter) {
      this[location] = waitMessage;
      let poem = await functionToCreatePoem(parameter);
      this[location] = "";
      this.write(location, poem, 0);
    },

    async composeAPoemFromPresentWeather() {
      this.temperatureValue = extractNumberFromString(this.weatherData.temperature);
      this.windValue = extractNumberFromString(this.weatherData.wind);
      this.completePoem('temperature',"I am working", createAVerseWithTemperature, this.temperatureValue);
      this.completePoem('wind', "Writing your poem", createAVerseWithWind, this.windValue);
      this.completePoem('description', "Please wait", createAPoemWithDescription, this.weatherData.description);
    },

    async composeAPoemFromFutureWeather() {
      const futureTimes = ["tomorrow", "next day", "day after", "future"];
      const index = optionToIndex(this.optionToComputeFuture);
      this.completePoem('description', "Please wait", createAPoemWithDescription, futureTimes[index]);
      if (index < futureTimes.length-1) {
        this.temperatureValue = extractNumberFromString(this.weatherData.forecast[index].temperature);
        this.windValue = extractNumberFromString(this.weatherData.forecast[index].wind);
      } else {
        var sumT = 0.; 
        var sumW = 0.; 
        for (var day of this.weatherData.forecast) {
          sumT += extractNumberFromString(day.temperature);
          sumW += extractNumberFromString(day.wind);
        }
        this.temperatureValue = sumT/3.;
        this.windValue = sumW/3.;
      }
      this.completePoem('temperature',"I am working", createAVerseWithTemperature, this.temperatureValue);
      this.completePoem('wind', "Writing your poem", createAVerseWithWind, this.windValue);
    }
    },
	}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
#OuterBlock{
  text-align: center;
  padding:20px;
  padding-top: 60px;
}

#WeatherInfo {
  font-family: 'Cyrene', sans-serif;
  font-size: 20px;
  text-align: center;
  background: url('../assets/paper.jpg'), var(--my-paper-color);
  background-size : 500px;
  background-blend-mode: multiply;
  padding: 60px;
  display : inline-block;
  border-radius: 30px;
  border: solid 2px var(--my-main-color);
  box-shadow: 0px 0px 100px var(--my-main-color);
  transition : 3s;
  
} 

#titleSave {
  font-weight: bold;
}

/*Responsive */

@media screen and (max-aspect-ratio : 4/3) {
   #WeatherInfo {
    padding: 30px;
  }
}
@media screen and (max-aspect-ratio : 3/4) {
  #WeatherInfo {
    font-size : min(2.5vh, 20px);
    padding: 5vw;
  }
  #OuterBlock{
  padding:5vw;
  padding-top: 15vw;
}
}

@media screen and (max-aspect-ratio : 1/3) {
  #WeatherInfo {
    font-size : 17px;
  }
}

</style>
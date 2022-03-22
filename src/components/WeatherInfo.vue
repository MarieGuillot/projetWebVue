<template>
<div id="OuterBlock">
  <div id="WeatherInfo">
    <!-- Temperature -->
    <p id="textTemperature"> {{temperature}} </p>
    <!-- Wind -->
    <p id="textWind"> {{wind}} </p>
    <!-- Description -->
    <p id="textDescription" v-html="description"> </p>
  </div>
</div>
</template>

<script>

import {extractNumberFromString, getWeatherData, qualifyTemperature, qualifyWind} from '@/services/api/weatherAPI.js'
import {getVerseWithTheWord} from '@/services/api/poetryAPI.js'

export default {
  name: 'WeatherInfo',
  // computed: {
	// 	computedTemperature: function() {
	// 		return this.number1 + this.number2		
	// 	}
	// },
  data() {
    return {
      weatherData: [],
      request : false,
      "temperature" : "Ask for a city", 
      "wind" : "And a time", 
      "description" : "To discover weather through a poem"
    }
  },
  created: function() {
	},

  mounted() {
      this.$root.$on('city', (cityname) => {
        getWeatherData(cityname).then(
            async (data) => {
            this.weatherData = data;
            this.composeAPoemFromPresentWeather();
           // this.request = true;
            })
      // });
      // this.$root.$on('present', (isPresent) => {
      //   if (isPresent && this.request) {
      //     this.composeAPoemFromPresentWeather();
      //   }
      });
  },
	methods: {
      setColors() {
        var temperatureToColor = extractNumberFromString(this.weatherData.temperature);
      
        var windToColor = extractNumberFromString(this.weatherData.wind);
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

        temperatureToColor = clamp(temperatureToColor, -25.5, 25.5)*10; 
        console.log(temperatureToColor);
        
        windToColor = clamp(windToColor, 0, 63)*4;
        console.log(windToColor);

        if(temperatureToColor >= 0) {
          document.querySelector(':root').style.setProperty("--my-main-color", "rgb("+temperatureToColor+", "+windToColor+", 0)");
        } else {
          var temperatureAbs = Math.abs(temperatureToColor);
          document.querySelector(':root').style.setProperty("--my-main-color", "rgb(0,"+ windToColor+"," +temperatureAbs+")");
        }
      },

      async createAPoemWithDescription() {
        const weatherDescription = this.weatherData.description;
        var descriptionPoem = "";
        const words = weatherDescription.split(' ');
        for (var word of words) {
          descriptionPoem += await getVerseWithTheWord(word) + " <br> ";
        }
        this.description = descriptionPoem;
      },
      async createAVerseWithTemperature() {
        const weatherTemperature = qualifyTemperature(extractNumberFromString(this.weatherData.temperature));
        this.temperature = await getVerseWithTheWord(weatherTemperature);
      },
      async createAVerseWithWind() {
        const weatherWind = qualifyWind(extractNumberFromString(this.weatherData.wind));
        this.wind = await getVerseWithTheWord(weatherWind);
      },

			async composeAPoemFromPresentWeather() {
                this.setColors();
                this.createAPoemWithDescription();
                this.createAVerseWithTemperature();
                this.createAVerseWithWind();
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
}

</style>
<template>
<div id="OuterBlock">
  <div id="WeatherInfo">
    <!-- Temperature -->
    <p id="textTemperature"> {{computedTemperature}} </p>
    <!-- Wind -->
    <p id="textWind"> {{computedWind}} </p>
    <!-- Description -->
    <p id="textDescription" v-html="computedDescription"> </p>
  </div>
</div>
</template>

<script>

import {extractNumberFromString, getWeatherData} from '@/services/api/weatherAPI.js'
import {createAPoemWithDescription, createAVerseWithTemperature, createAVerseWithWind} from '@/services/api/poetryAPI.js'

export default {
  name: 'WeatherInfo',
  computed: {
		computedTemperature: function() {
      if(this.showPresent) {
        return this.presentTemperature;
      }
      else {
        return this.futureTemperature;
      }
		},
    computedWind: function() {
			if(this.showPresent) {
        return this.presentWind;
      }
      else {
        return this.futureWind;
      }
		},
    computedDescription: function() {
			if(this.showPresent) {
        return this.presentDescription;
      }
      else {
        return this.futureDescription;
      }
		}
	},
  data() {
    return {
      weatherData: [],
      request : false,
      presentTemperatureValue : 0,
      presentWindValue : 0,
      futureTemperatureValue : 0,
      futureWindValue : 0,
      presentTemperature : "Ask for a city", 
      presentWind : "And a time", 
      presentDescription : "To discover weather through a poem", 
      futureTemperature : "Ask for a city", 
      futureWind : "And a time", 
      futureDescription : "To discover weather through a poem", 
      showPresent : true,
    }
  },
  created: function() {
	},

  mounted() {
      this.$root.$on('city', (cityname) => {
        getWeatherData(cityname).then(
            async (data) => {
            this.weatherData = data;
            console.log(data.forecast);
            this.composeAPoemFromPresentWeather();
            this.composeAPoemFromFutureWeather();
            this.request = true;
            this.setFutureOrPresentColors();
            });
       
      });

      this.$root.$on('present', (isPresent) => {
        this.showPresent = isPresent;
        this.setFutureOrPresentColors();
      });
     
  },

	methods: {
      setFutureOrPresentColors() {
        if (this.showPresent) {
          this.setColors(this.presentTemperatureValue, this.presentWindValue);
        } else {
          this.setColors(this.futureTemperatureValue, this.futureWindValue);
        }
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

			async composeAPoemFromPresentWeather() {
        this.presentTemperatureValue = extractNumberFromString(this.weatherData.temperature);
        this.presentWindValue = extractNumberFromString(this.weatherData.wind);
        this.presentDescription = await createAPoemWithDescription(this.weatherData.description);
        this.presentTemperature = await createAVerseWithTemperature(this.presentTemperatureValue);
        this.presentWind = await createAVerseWithWind(this.presentWindValue);
        
      },

      async composeAPoemFromFutureWeather() {
        const futureTimes = ["tomorrow", "next day", "day after", "future"];
        const index = Math.floor(Math.random() * futureTimes.length);
        this.futureDescription = await createAPoemWithDescription(futureTimes[index]);
        if (index < futureTimes.length-1) {
          this.futureTemperatureValue = extractNumberFromString(this.weatherData.forecast[index].temperature);
          this.futureWindValue = extractNumberFromString(this.weatherData.forecast[index].wind);
          this.futureTemperature = await createAVerseWithTemperature(this.futureTemperatureValue);
          this.futureWind = await createAVerseWithWind(this.futureWindValue);
        } else {
          var sumT = 0.; 
          var sumW = 0.; 
          for (var day of this.weatherData.forecast) {
            sumT += extractNumberFromString(day.temperature);
            sumW += extractNumberFromString(day.wind);
          }
          this.futureTemperatureValue = sumT/3.;
          this.futureWindValue = sumW/3.;
          this.futureTemperature = await createAVerseWithTemperature(this.futureTemperatureValue);
          this.futureWind = await createAVerseWithWind(this.futureWindValue);
        }
        
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
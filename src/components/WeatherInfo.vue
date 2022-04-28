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

import {extractNumberFromString, getWeatherData} from '@/services/api/weatherAPI.js'
import {createAPoemWithDescription, createAVerseWithTemperature, createAVerseWithWind} from '@/services/api/poetryAPI.js'

export default {
  name: 'WeatherInfo',
  props:{
    citySearched : {type: String, required: true},
    presentWanted : {type: Boolean, default : true},
  },
  watch: {
		citySearched: function (newCity, oldCity) {
			console.log("city " + oldCity + " has been replace by " + newCity);
      this.searchAndWritePoems(newCity);
		}, 

    presentWanted :function(newTime, oldTime) {
			console.log("bool present " + oldTime + " has been replace by " + newTime);
      this.searchAndWritePoems(this.citySearched);
    }
	},
  computed: {
		computedTemperature: function() {
      if(this.presentWanted) {
        return this.presentTemperature;
      }
      else {
        return this.futureTemperature;
      }
		},
    computedWind: function() {
			if(this.presentWanted) {
        return this.presentWind;
      }
      else {
        return this.futureWind;
      }
		},
    computedDescription: function() {
			if(this.presentWanted) {
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
      temperatureValue : 0,
      windValue : 0,
      temperature : "Ask for a city", 
      wind : "And a time", 
      description : "To discover weather through a poem", 



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
    }
  },

  mounted: function() {
    if(this.citySearched != "no city yet") {
      this.searchAndWritePoems(this.citySearched);
    }
	},

	methods: {
      // searchAndWritePoems(newcity) {
      //    getWeatherData(newcity).then(
      //       async (data) => {
      //       this.weatherData = data;
      //       this.composeAPoemFromPresentWeather();
      //       this.composeAPoemFromFutureWeather();
      //       this.setFutureOrPresentColors();
      //       });
      // },

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
        // if (this.presentWanted) {
        //   this.setColors(this.presentTemperatureValue, this.presentWindValue);
        // } else {
        //   this.setColors(this.futureTemperatureValue, this.futureWindValue);
        // }
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
        // this.presentTemperatureValue = extractNumberFromString(this.weatherData.temperature);
        // this.presentWindValue = extractNumberFromString(this.weatherData.wind);
        // this.completePoem('presentTemperature',"I am working", createAVerseWithTemperature, this.presentTemperatureValue);
        // this.completePoem('presentWind', "Writing your poem", createAVerseWithWind, this.presentWindValue);
        // this.completePoem('presentDescription', "Please wait", createAPoemWithDescription, this.weatherData.description);
        this.temperatureValue = extractNumberFromString(this.weatherData.temperature);
        this.windValue = extractNumberFromString(this.weatherData.wind);
        this.completePoem('temperature',"I am working", createAVerseWithTemperature, this.temperatureValue);
        this.completePoem('wind', "Writing your poem", createAVerseWithWind, this.windValue);
        this.completePoem('description', "Please wait", createAPoemWithDescription, this.weatherData.description);
      },

      async composeAPoemFromFutureWeather() {
        // const futureTimes = ["tomorrow", "next day", "day after", "future"];
        // const index = Math.floor(Math.random() * futureTimes.length);
        // this.futureDescription = await createAPoemWithDescription(futureTimes[index]);
        // if (index < futureTimes.length-1) {
        //   this.futureTemperatureValue = extractNumberFromString(this.weatherData.forecast[index].temperature);
        //   this.futureWindValue = extractNumberFromString(this.weatherData.forecast[index].wind);
        //   this.futureTemperature = await createAVerseWithTemperature(this.futureTemperatureValue);
        //   this.futureWind = await createAVerseWithWind(this.futureWindValue);
        // } else {
        //   var sumT = 0.; 
        //   var sumW = 0.; 
        //   for (var day of this.weatherData.forecast) {
        //     sumT += extractNumberFromString(day.temperature);
        //     sumW += extractNumberFromString(day.wind);
        //   }
        //   this.futureTemperatureValue = sumT/3.;
        //   this.futureWindValue = sumW/3.;
        //   this.futureTemperature = await createAVerseWithTemperature(this.futureTemperatureValue);
        //   this.futureWind = await createAVerseWithWind(this.futureWindValue);
        // }
         const futureTimes = ["tomorrow", "next day", "day after", "future"];
        const index = Math.floor(Math.random() * futureTimes.length);
        this.description = await createAPoemWithDescription(futureTimes[index]);
        if (index < futureTimes.length-1) {
          this.temperatureValue = extractNumberFromString(this.weatherData.forecast[index].temperature);
          this.windValue = extractNumberFromString(this.weatherData.forecast[index].wind);
          this.temperature = await createAVerseWithTemperature(this.temperatureValue);
          this.wind = await createAVerseWithWind(this.windValue);
        } else {
          var sumT = 0.; 
          var sumW = 0.; 
          for (var day of this.weatherData.forecast) {
            sumT += extractNumberFromString(day.temperature);
            sumW += extractNumberFromString(day.wind);
          }
          this.temperatureValue = sumT/3.;
          this.windValue = sumW/3.;
          this.temperature = await createAVerseWithTemperature(this.temperatureValue);
          this.wind = await createAVerseWithWind(this.windValue);
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
  box-shadow: 0px 0px 100px var(--my-main-color);
  transition : 3s;
}

</style>
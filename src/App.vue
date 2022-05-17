<template>
<div id="page">
<link href="http://fonts.cdnfonts.com/css/palmer-grotesque" rel="stylesheet">
    <header>
      <div id="title">
      Weather Poetry
      </div>
      <CityForm  v-on:newCitySearched="updateCity" v-on:newOptionFuture="updateOptionFuture" :presentWanted="present" :optionFuture="optionToComputeFuture"/>
    </header>  
    <TimeSelection v-on:presentWanted="updateTime"/>
    <WeatherInfo :citySearched="city" :presentWanted="present" :optionToComputeFuture="optionToComputeFuture"/>
    <footer>
      <div id="infos">
      You searched {{city}}.
      </div>
    </footer>  
</div>
  
</template>

<script>

document.title = "Weather Poetry"

import WeatherInfo from "./components/WeatherInfo"
import CityForm from "./components/CityForm"
import TimeSelection from "./components/TimeSelection"

export default {
  name: 'App', 
  components: {
		WeatherInfo,
    CityForm,
    TimeSelection
	},
  data() {
  return {
    city : localStorage.getItem("search") || "no city yet", 
    present : true,
    optionToComputeFuture : localStorage.getItem("optionFuture") || "day1",
    }
  },
  watch: {
    city: function(newCity) {
      localStorage.setItem("search", newCity);
    },
    optionToComputeFuture: function(newOption) {
      localStorage.setItem("optionFuture", newOption);
    }
  },
  methods: {
    updateCity: function(cityName) {
      this.city = cityName;
    }, 
    updateOptionFuture: function(option) {
      this.optionToComputeFuture = option;
    },
    updateTime:function(isPresent) {
      this.present = isPresent;
    }, 
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style> 

:root {
  --my-main-color: #25afa8;
  --my-paper-color: rgb(255, 248, 241);
} 
/* #67abee */

@font-face {
    font-family: 'cantiquenormal';
    src: url('assets/Cantique-Normal.woff2') format('woff2'),
         url('assets/Cantique-Normal.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
font-family: 'Cyrene';
src: url('assets/Cyrene-Regular.woff') format('woff');
font-weight: normal;
font-style: normal;
}

body{
  margin: 0;
  color: var(--my-main-color);
}

html {
  background: url('./assets/paper.jpg'), var(--my-paper-color);
  background-size : 500px, cover;
  background-blend-mode: multiply;
  width:100%;
  height : 100%;
  margin-left : 0;
  overflow: hidden;
  font-family: 'cantiquenormal', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 30px;
  transition : color 2s;
}

header {
  text-align: left;
  border-bottom: solid 2px var(--my-main-color);
  padding: 20px;
  background: url('./assets/paper.jpg'), var(--my-paper-color);
  background-size : 500px;
  background-blend-mode: multiply;
  line-height: 30px;
  overflow: hidden;
  transition : color 2s, border 2s;
}

#title {
  float: left;
  margin-top: 5px;
}

footer {
  border-top: solid 2px var(--my-main-color);
  padding-top: 10px;
  height: 70px;
  position: absolute;
  bottom:0;
  width:100%;
  background: url('./assets/paper.jpg'), var(--my-paper-color);
  background-size : 500px;
  background-blend-mode: multiply;
  font-size: 20px;
}

#infos {
  float: right;
  margin-right: 20px;
}

/*Responsive */
@media screen and (max-aspect-ratio : 3/4) {
  html {
    font-size : 20px;
  }
  footer {
    font-size : 17px;
    padding-top : 5px;
    height: 50px;
  }
  header {
    padding : 10px;
    padding-bottom : 0px;
  }
}

@media screen and (max-aspect-ratio : 4/3) {
  html {
    font-size : 25px;
  }
  header {
    padding-bottom : 0px;
  }
}

@media screen and (max-aspect-ratio : 1/1) {
  html {
    font-size : 20px;
  }
}


</style>

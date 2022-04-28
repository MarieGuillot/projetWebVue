<template>
<div id="page">
<link href="http://fonts.cdnfonts.com/css/palmer-grotesque" rel="stylesheet">
    <header>
      <div id="title">
      Weather Poetry
      </div>
      <CityForm  v-on:newCitySearched="updateCity" :citySearched="city"/>
    </header>  
    <TimeSelection v-on:presentWanted="updateTime"/>
    <WeatherInfo :citySearched="city" :presentWanted="present"/>
    <footer>
      <div id="infos">
      You searched {{city}}.
      </div>
    </footer>  
</div>
  
</template>

<script>

document.title = "Weather"

import WeatherInfo from "./components/WeatherInfo"
import CityForm from "./components/CityForm"
import TimeSelection from "./components/TimeSelection"

export default {
  name: 'App', components: {
		WeatherInfo,
    CityForm,
    TimeSelection
	},
  data() {
  return {
    city : localStorage.getItem("search") || "no city yet", 
    present : true,
    }
  },
  watch: {
  city: function(newCity) {
    localStorage.setItem("search", newCity);
  }
  },
  methods: {
    updateCity: function(cityName) {
      this.city = cityName;
      console.log("city via emit :" + cityName);
    }, 
    updateTime:function(isPresent) {
      this.present = isPresent;
      console.log("present via emit :" + isPresent);
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
font-family: 'Muller Narrow Extra Light';
src: url('assets/MullerNarrow-Light.woff') format('woff');
font-weight: normal;
font-style: normal;
}

@font-face {
font-family: 'Kruda';
src: url('assets/Kruda-NarrowLight.woff') format('woff');
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

</style>

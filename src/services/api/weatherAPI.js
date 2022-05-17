const getWeatherData = async function(city) {
    
    const response = await fetch("https://goweather.herokuapp.com/weather/"+city) 
    console.log( await response.status);
    if (response.status == 200) {
        let data = await response.json();
        return data;
    } else {
        new Error(response.statusText)
    }
}

//Au cas où l'API ne fonctionne pas
const falseWeatherData = async function(city) {
    console.log("false weather in" + city);
    return {"temperature":"+15 °C","wind":"44 km/h","description":"Partly cloudy","forecast":[{"day":"1","temperature":"+14 °C","wind":"27 km/h"},{"day":"2","temperature":"17 °C","wind":"18 km/h"},{"day":"3","temperature":"17 °C","wind":"17 km/h"}]};
}

function extractNumberFromString(string) {
    var signe = 1;
    if (string[0]=="-") {
        signe = -1;
    }
    var matches = string.match(/(\d+)/);
    if (matches != null) {
        var number = signe*parseFloat(matches[0]);
    } else {
        number = 0;
    }
    return number; 
}

function qualifyWind(speed){
    if (speed < 2) {
        return "calm";
    }
    else if (speed < 11) {
        return "light";
    }
    else if (speed < 19) {
        return "gentle";
    }
    else if (speed < 29) {
        return "breeze";
    }
    else if (speed < 39) {
        return "fresh";
    }
    else if (speed < 50) {
        return "strong";
    }
    else if (speed < 101) {
        return "gale";
    }
    else if (speed < 116) {
        return "storm";
    }
    else  {
        return "hurricane";
    }
}

function optionToIndex(option) {
    if(option == "day1") {
        return 0;
    } else if (option == "day2") {
        return 1;
    } else if (option == "day3") {
        return 2;
    } else {
        return 3;
    }
}

function qualifyTemperature(temperature){
    if (temperature < -15) {
        return "freezing";
    }
    else if (temperature < 0) {
        return "cold";
    }
    else if (temperature < 10) {
        return "cool";
    }
    else if (temperature < 20) {
        return "warm";
    }
    else if (temperature < 30) {
        return "hot";
    } 
    else {
        return "burning";
    }
}

export { getWeatherData, extractNumberFromString, qualifyTemperature, qualifyWind, falseWeatherData, optionToIndex}


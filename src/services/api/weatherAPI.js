const getWeatherData = async function(city) {
    const response = await fetch("https://goweather.herokuapp.com/weather/"+city) 
    if (response.status == 200) {
        return response.json()
    } else {
        new Error(response.statusText)
    }
}

function extractNumberFromString(string) {
    var signe = 1;
    if (string[0]=="-") {
        signe = -1;
    }
    var matches = string.match(/(\d+)/)
    return signe*parseFloat(matches[0])
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

export { getWeatherData, extractNumberFromString, qualifyTemperature, qualifyWind}


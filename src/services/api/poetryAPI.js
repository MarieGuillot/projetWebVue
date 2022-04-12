import {qualifyTemperature, qualifyWind} from '@/services/api/weatherAPI.js';

const getPoetryData = async function(word) {
    const response = await fetch("https://poetrydb.org/lines/%20"+word+"%20/lines.json") 
    if (response.status == 200) {
        return response.json()
    } else {
        new Error(response.statusText)
    }
}

const getVerseWithTheWord = async function(word) {
    word = word.toLowerCase();
    var versesWithTheWord = [];
    var poetryArray = await getPoetryData(word);
    for (var poems of poetryArray) {
        for (var line of poems.lines) {
            if (line.includes(" "+word+" ")) {
                versesWithTheWord.push(line);
            }
        }
    }
    const nbLines = versesWithTheWord.length;
    const chosenVerseLocation = Math.floor(Math.random() * nbLines);
    return versesWithTheWord[chosenVerseLocation];
}

async function createAPoemWithDescription(description) {
    const weatherDescription = description;
    var descriptionPoem = "";
    const words = weatherDescription.split(' ');
    for (var word of words) {
        descriptionPoem += await getVerseWithTheWord(word) + " <br> ";
    }
    return descriptionPoem;
}

async function createAVerseWithTemperature(temperature) {
    const weatherTemperature = qualifyTemperature(temperature);
    return await getVerseWithTheWord(weatherTemperature);
}

async function createAVerseWithWind(wind) {
    const weatherWind = qualifyWind(wind);
    return await getVerseWithTheWord(weatherWind);
}


export {createAPoemWithDescription, createAVerseWithTemperature, createAVerseWithWind}
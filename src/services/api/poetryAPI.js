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

export {getVerseWithTheWord}
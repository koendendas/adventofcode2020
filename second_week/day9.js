const h = require('../helpers');
console.log('day 9');
var textByLine = h.getArrayFromInputText('second_week/inputs/day9.txt');

var preambleSize = 25;
var start = 0;
var correctInPreAmble = true;
var incorrectNumber = 0;

while(correctInPreAmble) {
    correctInPreAmble = false;
    var preamble = [];
    for (var i = start; i < preambleSize + start; i++) {
        preamble.push(textByLine[i]);
    }
    for (var i = 0; i < preamble.length; i++) {
        for (var j = 0; j < preamble.length; j++) {
            if (isSumCorrect(preamble[i], preamble[j], textByLine[preambleSize+start])) {
                correctInPreAmble = true;
            }
        }
    }
    if (!correctInPreAmble) {
        incorrectNumber = textByLine[preambleSize+start];
    }
    start++;
}

function isSumCorrect(value1, value2, sum) {
    var correct = false;
    if(value1 !== value2){
        if( (parseInt(value1) + parseInt(value2)) === parseInt(sum)){
            correct = true;
        }
    }
    return correct;
}

var index = 0;
var loop = true;

while(loop){
    var tooBig = false;
    var listOfValues = [];
    var ind = index;
    while(!tooBig){
        listOfValues.push(textByLine[ind]);
        ind++;
        if(parseInt(getSumOfArray(listOfValues)) >= parseInt(incorrectNumber)) {
            tooBig = true;
            if( parseInt(getSumOfArray(listOfValues)) === parseInt(incorrectNumber)){
                console.log('answer: ' + parseInt(getMinOfArray(listOfValues) + getMaxOfArray(listOfValues)));
                loop = false;
            }
        }
    }

    if(index===textByLine.length-2){
        loop = false;
    }
    index++;
}

function getSumOfArray(array) {
    var sum = 0;
    for(var a=0; a<array.length; a++){
        sum = sum + parseInt(array[a]);
    }
    return sum;
}

function getMaxOfArray(array){
    var max = 0;
    for(var a=0; a<array.length; a++){
        if(parseInt(array[a]) > max){
            max = parseInt(array[a]);
        }
    }
    return max;
}

function getMinOfArray(array){
    var min = Number.MAX_SAFE_INTEGER;
    for(var a=0; a<array.length; a++){
        if(parseInt(array[a]) < min){
            min = parseInt(array[a]);
        }
    }
    return min;
}
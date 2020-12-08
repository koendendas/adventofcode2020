const h = require('../helpers');
console.log('day 1');
var textByLine = h.getArrayFromInputText('first_week/inputs/day1.txt');
for(var i = 0; i < textByLine.length; i++){
    for(var j = 0; j < textByLine.length; j++){
        for(var k = 0; k < textByLine.length; k++) {
            if ((parseInt(textByLine[i]) + parseInt(textByLine[j]) + parseInt(textByLine[k])) === 2020) {
                console.log(textByLine[i] + ' + ' + textByLine[j] + ' + ' + textByLine[k] + ' = ' + (parseInt(textByLine[i]) + parseInt(textByLine[j])));
                console.log('THIS IS THE ANSWER: ' + (textByLine[i] * textByLine[j] * textByLine[k]));
            }
        }
    }
}
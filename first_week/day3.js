const h = require('../helpers');
console.log('day 3');
var textByLine = h.getArrayFromInputText('first_week/inputs/day3.txt');

var slopes = [1,3,5,7];

var multiply = 1;

for(var s = 0; s < slopes.length; s++ ) {
    var factor = Math.ceil(textByLine.length * slopes[s] / textByLine[0].length);

    var newInput = [];

    for (var i = 0; i < textByLine.length; i++) {
        var line = '';
        for (var j = 0; j < factor + 1; j++) {
            line = line + textByLine[i];
        }
        newInput.push(line);
    }
    var treeCount = 0;
    var startPos = 0;
    for (var f = 0; f < newInput.length; f++) {
        if (newInput[f].charAt(startPos) === '#') {
            treeCount++;
        }
        startPos = startPos + slopes[s];
    }
    multiply = multiply*treeCount;
}

var factor2 = Math.ceil(textByLine.length / 2) ;

var newInput2 = [];

for (var i = 0; i < textByLine.length; i++) {
    var line = '';
    for (var j = 0; j < factor2 + 1; j++) {
        line = line + textByLine[i];
    }
    newInput2.push(line);
}
var treeCount2 = 0;
var startPos2 = 0;
for (var f = 0; f < newInput2.length; f += 2) {
    console.log(newInput2[f]);
    console.log(newInput2[f].charAt(startPos2));
    if (newInput2[f].charAt(startPos2) === '#') {
        treeCount2++;
    }
    startPos2++;
}
multiply = multiply*treeCount2;
console.log(multiply);



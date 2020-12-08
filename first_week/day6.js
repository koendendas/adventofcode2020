const h = require('../helpers');
console.log('day 6');
var textByLine = h.getArrayFromInputText('first_week/inputs/day6.txt');
var groupedAnswers = [];
var answer = '';
var groupedArrayAnswers = [];
var arrayAnswer = [];
for(var i = 0; i < textByLine.length; i++){
    if(textByLine[i] !== ''){
        answer = answer+textByLine[i];
        arrayAnswer.push(textByLine[i]);
    }else{
        groupedAnswers.push(answer);
        answer = '';
        groupedArrayAnswers.push(arrayAnswer);
        arrayAnswer = [];
    }
    if( i === textByLine.length-1 ){
        groupedAnswers.push(answer);
        groupedArrayAnswers.push(arrayAnswer);
    }
}

var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

var total = 0;
for(var j=0; j<groupedArrayAnswers.length; j++){
    var indCount = 0;
    console.log(groupedArrayAnswers[j]);
    var groupSize = groupedArrayAnswers[j].length;
   // console.log(groupSize);

    for(var a=0; a<alphabet.length; a++){
        var checkedChar = alphabet[a];
        var charCount = 0;
        for(var k=0; k<groupedArrayAnswers[j].length; k++){
            if(groupedArrayAnswers[j][k].indexOf(checkedChar) > -1 ){
                charCount++;
            }
        }
        if(charCount === groupSize){
            indCount++;
        }
    }
    console.log(indCount);
    total = total+indCount;
}
console.log('total: ' + total);

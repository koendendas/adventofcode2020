const h = require('../helpers');
console.log('day 10');
var textByLine = h.getArrayFromInputText('second_week/inputs/day10.txt');
textByLine.push(0);
var oneJolt = 0;
var threeJolt = 1;
textByLine.sort(function(a,b){return a-b});
for(var i=0; i<textByLine.length; i++){
    if( textByLine[i+1]){
        var diff = parseInt(textByLine[i+1]) - parseInt(textByLine[i]);
        if(diff === 1){
            oneJolt++;
        }
        if(diff === 3){
            threeJolt++;
        }
    }
}
console.log('answer:' + oneJolt*threeJolt);

var steps = {"steps":{0:1}};
function getSteps(list) {
    for(var i = 0; i < list.length; i++) {
      var j = i+1;
      while(parseInt(list[j]) - parseInt(list[i]) <= 3) {
        if(!steps.steps[j]){
            steps.steps[j] = 0;
        }
        steps.steps[j] = steps.steps[j] + steps.steps[i];
        j++;
      }
    }
    console.log('answer: ' + steps.steps[list.length - 1]);
}
getSteps(textByLine);

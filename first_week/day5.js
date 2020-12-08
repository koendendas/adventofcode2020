const h = require('../helpers');
console.log('day 5');
var textByLine = h.getArrayFromInputText('first_week/inputs/day5.txt');
var highestId = 0;
var ids = [];
for(var i = 0; i < textByLine.length; i++){
    var row = 0;
    var range = [0,127];
    console.log(textByLine[i]);
    var firstPart = textByLine[i].substr(0,7);
    for(var j = 0; j < firstPart.length; j++){
        if(firstPart.charAt(j) === 'F' && j < firstPart.length){
            var rangeMax = range[1];
            var rangeMin = range[0];
            var rangeDiff = rangeMax-rangeMin;
            var newMax = rangeMax - Math.ceil(rangeDiff/2);
            range[0] = rangeMin;
            range[1] = newMax;
        }
        if(firstPart.charAt(j) === 'B' && j < firstPart.length){
            var rangeMax = range[1];
            var rangeMin = range[0];
            var rangeDiff = rangeMax-rangeMin;
            var newMin = rangeMin + Math.ceil(rangeDiff/2);
            range[0] = newMin;
            range[1] = rangeMax;
        }
        if( j === firstPart.length-1 ){
            row = Math.min(range[0], range[1]);
        }
    }
    var lastPart = textByLine[i].substr(7,textByLine[i].length-1);
    var width = [0,7];
    var column = 0;
    for(var l = 0; l < lastPart.length; l++){
        if(lastPart.charAt(l) === 'L' && l < lastPart.length){
            var widthMax = width[1];
            var widthMin = width[0];
            var widthDiff = widthMax-widthMin;
            var newWidthMax = widthMax - Math.ceil(widthDiff/2);
            width[0] = widthMin;
            width[1] = newWidthMax;
        }
        if(lastPart.charAt(l) === 'R' && l < lastPart.length){
            var widthMax = width[1];
            var widthMin = width[0];
            var widthDiff = widthMax-widthMin;
            var newWidthMin = widthMin + Math.ceil(widthDiff/2);
            width[0] = newWidthMin;
            width[1] = widthMax;
        }
        if( l === lastPart.length-1 ){
            column = Math.max(width[0], width[1]);
        }
    }

    var id = parseInt(row * 8 + column);
    ids.push(id);
    if( id > highestId ){
        console.log('NEW HIGHEST ID:' + id);
        highestId = id;
    }
}
console.log(128*8);
var missingIds = [];
for( var i = 0; i < ids.length; i++){
    var leftNeighbour = parseInt(ids[i]) - 1;
    var rightNeighbour = parseInt(ids[i]) + 1;
    if(leftNeighbour > 0 && ids.includes(leftNeighbour)){
    }else{
        console.log(ids[i]);
        console.log('left neighbour not found');
    }
    if(rightNeighbour > 0 && ids.includes(rightNeighbour)){
    }else{
        console.log(ids[i]);
        console.log('right neighbour not found');
    }
}
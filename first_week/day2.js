const h = require('../helpers');
console.log('day 2');
var textByLine = h.getArrayFromInputText('first_week/inputs/day2.txt');
var count = 0;
for(var i = 0; i < textByLine.length; i++){
    var array = textByLine[i].split(" ");
    var range  = array[0].split("-");
    var first = parseInt(range[0]);
    var last  = parseInt(range[1]);
    var key = array[1].substring(0, 1);
    var pass = array[2];
    console.log(first + ' ' + last + ' ' + key + ' ' + pass);
    if(pass.charAt(first-1) === key){
        if(pass.charAt(last-1) !== key) {
            count++;
        }
    }else{
        if(pass.charAt(last-1) === key) {
            count++;
        }
    }
}
console.log(count);

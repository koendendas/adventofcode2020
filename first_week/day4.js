const h = require('../helpers');
console.log('day 4');
var textByLine = h.getArrayFromInputText('first_week/inputs/day4.txt');
var passports = [];
var passport = '';
for(var i = 0; i < textByLine.length; i++){
    if(textByLine[i] !== ''){
       passport = passport + ' ' +textByLine[i];
    }else{
        passports.push(passport);
        passport = '';
    }
    if( i === textByLine.length-1 ){
        passports.push(passport);
    }
}

var passportsAsArray = [];
for(var i = 0; i < passports.length; i++){
    var passportAsArray = passports[i].split(' ');
    var passportAsJson = '{';
    for(var j = 0; j< passportAsArray.length; j++){
        if (passportAsArray[j].includes(':')){
            var passportKeys = passportAsArray[j].split(':');
            passportAsJson =  passportAsJson + '"' + passportKeys[0] + '":' + '"' + passportKeys[1] + '"';
            if( j < passportAsArray.length-1){
                passportAsJson = passportAsJson + ',';
            }
        }
    }
    var passportAsJson = passportAsJson + '}';
    passportsAsArray.push(JSON.parse(passportAsJson));
}

console.log(passportsAsArray.length);
var keys = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];

var validCount = 0;
for(var i=0; i<passportsAsArray.length; i++){
    var valid = true;
    for(var j=0; j<keys.length; j++){
        if(!passportsAsArray[i][keys[j]]){
            valid = false;
        }
        if(keys[j] === 'byr'){
            if(parseInt(passportsAsArray[i][keys[j]]) < 1920 || parseInt(passportsAsArray[i][keys[j]]) > 2002 ){
                valid = false;
            }
        }
        if(keys[j] === 'iyr'){
            if(parseInt(passportsAsArray[i][keys[j]]) < 2010 || parseInt(passportsAsArray[i][keys[j]]) > 2020 ){
                valid = false;
            }
        }
        if(keys[j] === 'eyr'){
            if(parseInt(passportsAsArray[i][keys[j]]) < 2020 || parseInt(passportsAsArray[i][keys[j]]) > 2030 ){
                valid = false;
            }
        }
        if(keys[j] === 'hgt' && passportsAsArray[i][keys[j]]){
            var measure = passportsAsArray[i][keys[j]].slice(-2);
            if(measure === 'cm' || measure === 'in' ){
                var height = passportsAsArray[i][keys[j]].substring(0, passportsAsArray[i][keys[j]].length - 2);
                if(measure === 'cm'){
                    if(height < 150 || height > 193 ){
                        valid = false;
                    }
                }
                if(measure === 'in'){
                    if(height < 59 || height > 76 ){
                        valid = false;
                    }
                }
            }else{
                valid = false;
            }
        }
        if(keys[j] === 'hcl' && passportsAsArray[i][keys[j]]) {
            var colorInd = passportsAsArray[i][keys[j]].substring(0, 1);
            if(colorInd === '#'){
                var colorCode = passportsAsArray[i][keys[j]].substring(1, passportsAsArray[i][keys[j]].length);
                if (!colorCode.match(/^[0-9A-Fa-f]{6}$/)){
                    valid = false;
                }
            }else{
                valid = false;
            }
        }
        if(keys[j] === 'ecl' && passportsAsArray[i][keys[j]]) {
            var eclKeys = ['amb','blu','brn','gry','grn','hzl','oth'];
            if(!eclKeys.includes(passportsAsArray[i][keys[j]])){
                valid = false;
            }
        }
        if(keys[j] === 'pid' && passportsAsArray[i][keys[j]]) {
            if(passportsAsArray[i][keys[j]].length === 9 ){
                console.log(passportsAsArray[i][keys[j]]);
            }else{
                valid = false;
            }
        }
    }
    if(valid){
        validCount++;
    }
}
console.log(validCount);
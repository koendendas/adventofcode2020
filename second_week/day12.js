const h = require('../helpers');
console.log('day 11');
var textByLine = h.getArrayFromInputText('second_week/inputs/day12.txt');

var currentDirection = 'E';
var x = 0;
var y = 0;
for(var i=0; i<textByLine.length; i++){
    var instruction = textByLine[i].substr(0,1);
    var value = textByLine[i].substr(1);
    if( instruction === 'F'){
        if(currentDirection === 'E'){
            x = x + parseInt(value);
        }
        if(currentDirection === 'W'){
            x = x - parseInt(value);
        }
        if(currentDirection === 'N'){
            y = y + parseInt(value);
        }
        if(currentDirection === 'S'){
            y = y - parseInt(value);
        }
    }
    if(instruction === 'N'){
        y = y + parseInt(value);
    }
    if(instruction === 'S'){
        y = y - parseInt(value);
    }
    if(instruction === 'E'){
        x = x + parseInt(value);
    }
    if(instruction === 'W'){
        x = x - parseInt(value);
    }
    if(instruction === 'R'){
       currentDirection = rotateRight(currentDirection,parseInt(value));
    }
    if(instruction === 'L'){
        currentDirection = rotateLeft(currentDirection,parseInt(value));
    }
}

function rotateRight(dir, deg){
    var stepsOf90 = parseInt(deg)/90;
    var newDir = dir;
    for(var i=0; i<stepsOf90; i++){
        if(newDir === 'N'){
            newDir = 'E';
        }
        else if(newDir === 'E'){
            newDir = 'S';
        }
        else if(newDir === 'S'){
            newDir = 'W';
        }
        else if(newDir === 'W'){
            newDir = 'N';
        }
    }
    return newDir;
}

function rotateLeft(dir, deg){
    var stepsOf90 = deg/90;
    var newDir = dir;
    for(var i=0; i<stepsOf90; i++){
        if(newDir === 'N'){
            newDir = 'W';
        }
        else if(newDir === 'W'){
            newDir = 'S';
        }
        else if(newDir === 'S'){
            newDir = 'E';
        }
        else if(newDir === 'E'){
            newDir = 'N';
        }
    }
    return newDir;
}

console.log('part1: '+ parseInt(parseInt(Math.abs(x)) + parseInt(Math.abs(y))));

var currentShipDirection = 'E';
var shipX = 0;
var shipY = 0;
var wayPointX = 10;
var wayPointY = 1;
for(var i=0; i<textByLine.length; i++){
    var instruction = textByLine[i].substr(0,1);
    var value = textByLine[i].substr(1);
    if( instruction === 'F'){
        var multiplier = parseInt(value);
        shipX = shipX + wayPointX*multiplier;
        shipY = shipY + wayPointY*multiplier;
    }
    if(instruction === 'N'){
        wayPointY = wayPointY + parseInt(value);
    }
    if(instruction === 'S'){
        wayPointY = wayPointY - parseInt(value);
    }
    if(instruction === 'E'){
        wayPointX = wayPointX + parseInt(value);
    }
    if(instruction === 'W'){
        wayPointX = wayPointX - parseInt(value);
    }
    if(instruction === 'R'){
        var newWayPointX = rotateWayPointRight(wayPointX, wayPointY, parseInt(value))[0];
        var newWayPointY = rotateWayPointRight(wayPointX, wayPointY, parseInt(value))[1];
        wayPointX = newWayPointX;
        wayPointY = newWayPointY;
     }
     if(instruction === 'L'){
        var newWayPointX = rotateWayPointLeft(wayPointX, wayPointY, parseInt(value))[0];
        var newWayPointY = rotateWayPointLeft(wayPointX, wayPointY, parseInt(value))[1];
        wayPointX = newWayPointX;
        wayPointY = newWayPointY;
     }
}

function rotateWayPointRight(wx, wy, v){
    var stepsOf90 = v/90;
    var newX = wx;
    var newY = wy;
    for(var i=0; i<stepsOf90; i++){
        var nnewX = newX;
        var nnewY = newY;
        newY = 0 - nnewX;
        newX = nnewY;
    }
    return [newX,newY];
}

function rotateWayPointLeft(wx, wy, v){
    var stepsOf90 = v/90;
    var newX = wx;
    var newY = wy;
    for(var i=0; i<stepsOf90; i++){
        var nnewX = newX;
        var nnewY = newY;
        newX = 0 - nnewY;
        newY = nnewX;
    }
    return [newX,newY];
}

console.log('part2: '+ parseInt(parseInt(Math.abs(shipX)) + parseInt(Math.abs(shipY))));
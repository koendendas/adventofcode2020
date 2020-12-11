const h = require('../helpers');
console.log('day 11');
var textByLine = h.getArrayFromInputText('second_week/inputs/day11.txt');
var seats = {};
var seatsArray = [];
for(var y=0; y<textByLine.length; y++){
    var row = textByLine[y];
    for(var x=0; x<row.length; x++){
        seatsArray.push(["y:"+y+"-x:"+x,row.charAt(x)]);
        seats["y:"+y+"-x:"+x] = {"value": row.charAt(x), "neighbours": [], "visibleSeats": []};
    }
}

function getNeighbours(seat) {
    var neighbours = [];
    var splitId = seat.split('-');
    var y = parseInt(splitId[0].split(':')[1]);
    var x = parseInt(splitId[1].split(':')[1]);
    var leftUpperNeighbourId = "y:" + parseInt(y-1) + "-x:" + parseInt(x-1);
    var leftUpperNeighbour = seats[leftUpperNeighbourId];
    if(leftUpperNeighbour && leftUpperNeighbour["value"] !== '.'){
        neighbours.push(leftUpperNeighbourId);
    }
    var upperNeighbourId = "y:" + parseInt(y-1) + "-x:" + parseInt(x);
    var upperNeighbour = seats[upperNeighbourId];
    if(upperNeighbour && upperNeighbour["value"] !== '.'){
        neighbours.push(upperNeighbourId);
    }
    var upperRightNeighbourId = "y:" + parseInt(y-1) + "-x:" + parseInt(x+1);
    var upperRightNeighbour = seats[upperRightNeighbourId];
    if(upperRightNeighbour && upperRightNeighbour["value"] !== '.'){
        neighbours.push(upperRightNeighbourId);
    }
    var leftNeighbourId = "y:" + parseInt(y) + "-x:" + parseInt(x-1);
    var leftNeighbour = seats[leftNeighbourId];
    if(leftNeighbour && leftNeighbour["value"] !== '.'){
        neighbours.push(leftNeighbourId);
    }
    var rightNeighbourId = "y:" + parseInt(y) + "-x:" + parseInt(x+1);
    var rightNeighbour = seats[rightNeighbourId];
    if(rightNeighbour && rightNeighbour["value"] !== '.'){
        neighbours.push(rightNeighbourId);
    }
    var leftDownNeighbourId = "y:" + parseInt(y+1) + "-x:" + parseInt(x-1);
    var leftDownNeighbour = seats[leftDownNeighbourId];
    if(leftDownNeighbour && leftDownNeighbour["value"] !== '.'){
        neighbours.push(leftDownNeighbourId);
    }
    var downNeighbourId = "y:" + parseInt(y+1) + "-x:" + parseInt(x);
    var downNeighbour = seats[downNeighbourId];
    if(downNeighbour && downNeighbour["value"] !== '.'){
        neighbours.push(downNeighbourId);
    }
    var downRightNeighbourId = "y:" + parseInt(y+1) + "-x:" + parseInt(x+1);
    var downRightNeighbour = seats[downRightNeighbourId];
    if(downRightNeighbour && downRightNeighbour["value"] !== '.'){
        neighbours.push(downRightNeighbourId);
    }
    return neighbours;
}

function getVisibleSeats(id) {
    var visibleSeats = [];
    var splitId = id.split('-');
    var y = parseInt(splitId[0].split(':')[1]);
    var x = parseInt(splitId[1].split(':')[1]);
    var upperLeftVisibleSeat = getVisibleSeatsFor(y,x,'-1','-1');
    if(upperLeftVisibleSeat !== ''){
        visibleSeats.push(upperLeftVisibleSeat);
    }
    var upperVisibleSeat = getVisibleSeatsFor(y,x,'-1','0');
    if(upperVisibleSeat !== ''){
        visibleSeats.push(upperVisibleSeat);
    }
    var upperRightVisibleSeat = getVisibleSeatsFor(y,x,'-1','1');
    if(upperRightVisibleSeat !== ''){
        visibleSeats.push(upperRightVisibleSeat);
    }
    var leftVisibleSeat = getVisibleSeatsFor(y,x,'0','-1');
    if(leftVisibleSeat !== ''){
        visibleSeats.push(leftVisibleSeat);
    }
    var rightVisibleSeat = getVisibleSeatsFor(y,x,'0','1');
    if(rightVisibleSeat !== ''){
        visibleSeats.push(rightVisibleSeat);
    }
    var leftDownVisibleSeat = getVisibleSeatsFor(y,x,'1','-1');
    if(leftDownVisibleSeat !== ''){
        visibleSeats.push(leftDownVisibleSeat);
    }
    var downVisibleSeat = getVisibleSeatsFor(y,x,'1','0');
    if(downVisibleSeat !== ''){
        visibleSeats.push(downVisibleSeat);
    }
    var rightDownVisibleSeat = getVisibleSeatsFor(y,x,'1','1');
    if(rightDownVisibleSeat !== ''){
        visibleSeats.push(rightDownVisibleSeat);
    }
    return visibleSeats;
}

for(var a=0; a<seatsArray.length; a++) {
    var id = seatsArray[a][0];
    seats[id].visibleSeats = getVisibleSeats(id);
    seats[id].neighbours = getNeighbours(id);
}

function getVisibleSeatsFor(y,x,diry,dirx){
    var visibleSeatId = '';
    var visibleSeatFound = false;
    var visibleY = parseInt(y);
    var visibleX = parseInt(x);
    while(!visibleSeatFound){
        visibleY = parseInt(visibleY) + parseInt(diry);
        visibleX = parseInt(visibleX) + parseInt(dirx);
        var visibleId = "y:" + parseInt(visibleY) + "-x:" + parseInt(visibleX);
        var visibleSeat = seats[visibleId];
        if(visibleSeat){
            if(visibleSeat["value"] !== '.'){
                visibleSeatFound = true;
                visibleSeatId = visibleId;
            }
        }else{
            visibleSeatFound = true;
        }
    }
    return visibleSeatId;
}

var stabilized = false;

var currentStates = h.getCopyFromArray(seats);
var counter = 0;
while(!stabilized) {
    var newStates = h.getCopyFromArray(currentStates);
    var changes = 0;
    for (var a = 0; a < seatsArray.length; a++) {
        var id = seatsArray[a][0];
        var value = currentStates[id].value;
        if(value === 'L' ){
            var neighbours = seats[id].neighbours;
            var switchToOccup = true;
            for(var n=0; n<neighbours.length; n++){
                var neighbourValue = currentStates[neighbours[n]].value;
                if(neighbourValue === '#'){
                    switchToOccup = false;
                }
            }
            if(switchToOccup){
                changes++;
                newStates[id].value = '#';
            }
        }
        if(value === '#'){
            var neighbours = seats[id].neighbours;
            var countOccupNeigh = 0;
            for(var n=0; n<neighbours.length; n++){
                var neighbourValue = currentStates[neighbours[n]].value;
                if(neighbourValue === '#'){
                    countOccupNeigh++;
                }
            }
            if(countOccupNeigh >= 4 ){
                changes++;
                newStates[id].value = 'L';
            }
        }
    }
    currentStates = h.getCopyFromArray(newStates);
    if(changes === 0) {
        stabilized = true;
    }
    counter++;
}

var occupiedCount = 0;
for (var a = 0; a < seatsArray.length; a++) {
    var seatId = seatsArray[a][0];
    if(currentStates[seatId].value === '#'){
        occupiedCount++;
    }
}
console.log('part 1: ' +occupiedCount);

var stabilized = false;

var currentStates = h.getCopyFromArray(seats);
var counter = 0;
while(!stabilized) {
    var newStates = h.getCopyFromArray(currentStates);
    var changes = 0;
    for (var a = 0; a < seatsArray.length; a++) {
        var id = seatsArray[a][0];
        var value = currentStates[id].value;
        if(value === 'L' ){
            var visibleSeats = seats[id].visibleSeats;
            var switchToOccup = true;
            for(var n=0; n<visibleSeats.length; n++){
                var visibleSeatValue = currentStates[visibleSeats[n]].value;
                if(visibleSeatValue === '#'){
                    switchToOccup = false;
                }
            }
            if(switchToOccup){
                changes++;
                newStates[id].value = '#';
            }
        }
        if(value === '#'){
            var visibleSeats = seats[id].visibleSeats;
            var countOccupNeigh = 0;
            for(var n=0; n<visibleSeats.length; n++){
                var visibleSeatValue = currentStates[visibleSeats[n]].value;
                if(visibleSeatValue === '#'){
                    countOccupNeigh++;
                }
            }
            if(countOccupNeigh >= 5 ){
                changes++;
                newStates[id].value = 'L';
            }
        }
    }
    currentStates = h.getCopyFromArray(newStates);
    if(changes === 0) {
        stabilized = true;
    }
    counter++;
}

var occupiedCount = 0;
for (var a = 0; a < seatsArray.length; a++) {
    var seatId = seatsArray[a][0];
    if(currentStates[seatId].value === '#'){
        occupiedCount++;
    }
}
console.log('part 2: ' + occupiedCount);
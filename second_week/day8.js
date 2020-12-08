const h = require('../helpers');
console.log('day 8');
var textByLine = h.getArrayFromInputText('second_week/inputs/day8.txt');
var instructions = [];
var instructionsKeyList = {"instructions": {}};
for(var i = 0; i < textByLine.length; i++){
   var instruction =  textByLine[i].split(' ');
   instructionsKeyList.instructions[i+'_'+textByLine[i].split(' ')[0]+textByLine[i].split(' ')[1]] = false;
   instructions.push(instruction);
}

getAccum(instructions,instructionsKeyList);

var instructionListsForJumps = [];
for(var i = 0; i<getAmountOfJump(); i++){
    instructionListsForJumps[i]=h.getCopyFromArray(instructions);
}
getAdjustedListReplaceJumpByNop();

var instructionKeysForJumps = mapInstructions(instructionListsForJumps);

var instructionListsForNops = [];
for(var i = 0; i<getAmountOfNop(); i++){
    instructionListsForNops[i]=h.getCopyFromArray(instructions);
}

getAdjustedListReplaceNopByJump();
var instructionKeysForNops = mapInstructions(instructionListsForNops);

for(var x=0; x<instructionListsForJumps.length; x++){
    getAccum(instructionListsForJumps[x],instructionKeysForJumps[x]);
}

for(var x=0; x<instructionListsForNops.length; x++){
    getAccum(instructionListsForNops[x],instructionKeysForNops[x]);
}

function getAccum(inList, keyList) {
    var accum = 0;
    var loop = true;
    var ind = 0;
    while(loop){
        if(inList[ind]) {
            var id = ind + '_' + inList[ind][0] + inList[ind][1];
            var visited = keyList.instructions[id];
            if (!visited) {
                var operator = inList[ind][0];
                var input = inList[ind][1];
                if (operator === 'nop') {
                    ind++;
                } else if (operator === 'acc') {
                    if (input.substr(0, 1) === '+') {
                        accum = accum + parseInt(input.substr(1));
                    } else {
                        accum = accum - parseInt(input.substr(1));
                    }
                    ind++;
                } else if (operator === 'jmp') {
                    if (input.substr(0, 1) === '+') {
                        ind = ind + parseInt(input.substr(1));
                    } else {
                        ind = ind - parseInt(input.substr(1));
                    }
                }
                keyList.instructions[id] = true;
            }
            else {
                loop = false;
            }
        }else{
            loop = false;
        }
    }
    if(getLastKey(keyList)){
        console.log("correct: " +accum);
    }
}

function getAdjustedListReplaceJumpByNop(){
    var jumps = [];
    for(var i=0; i<instructions.length; i++) {
        if(instructions[i][0] === 'jmp'){
            jumps.push(i);
        }
    }
    for(var j=0; j<jumps.length; j++){
        instructionListsForJumps[j][jumps[j]][0] = 'nop';
    }
}

function getAmountOfJump() {
    var count = 0;
    for(var i=0; i<instructions.length; i++) {
        if (instructions[i][0] === 'jmp') {
            count++;
        }
    }
    return count;
}

function getAdjustedListReplaceNopByJump(){
    var nops = [];
    for(var i=0; i<instructions.length; i++) {
        if(instructions[i][0] === 'nop' && instructions[i][1] !== '+0' && instructions[i][1] !== '-0'){
            nops.push(i);
        }
    }
    for(var j=0; j<nops.length; j++){
        instructionListsForNops[j][nops[j]][0] = 'jmp';
    }
}

function getAmountOfNop() {
    var count = 0;
    for(var i=0; i<instructions.length; i++) {
        if (instructions[i][0] === 'nop' && instructions[i][1] !== '+0' && instructions[i][1] !== '-0') {
            count++;
        }
    }
    return count;
}

function mapInstructions(instr){
    var keyList = [];
    for(var k=0; k<instr.length; k++){
        var list = {"instructions": {}};
        for(var q=0; q<instr[k].length; q++) {
            var indInstr = instr[k][q];
            var id = q + '_' + indInstr[0] + indInstr[1];
            list.instructions[id] = false;
        }
        keyList.push(list);
    }
    return keyList;
}

function getLastKey(list){
    var lastKey;
   var inss = list.instructions;
    for(var key in inss){
        if(inss.hasOwnProperty(key)){
            lastKey = key;
        }
    }
    return inss[lastKey];
}
const h = require('../helpers');
console.log('day 7');
var textByLine = h.getArrayFromInputText('first_week/inputs/day7.txt');
var containers = '{';
for(var i = 0; i < textByLine.length; i++){
    var master = textByLine[i].split('contain')[0];
    master = master.substr(0, master.length-6);
    var slaves = textByLine[i].split('contain')[1].split(',');
    var slaveValue = [];
    for(var j=0; j<slaves.length; j++){
        var slave = slaves[j];
        slave = slave.substr(1);
        if( slave.substr(slave.length-1) === '.' ){
            slave = slave.substr(0, slave.length-1);
        }
        var splitSlave = slave.split(' ');

        if( splitSlave[0] !== 'no' ){
            var amount = splitSlave[0];
            var color = splitSlave[1] + ' ' + splitSlave [2];
            slaveValue.push([color , amount]);
        }
    }
    if(slaveValue !== '' ){
        containers  = containers + '"' + master + '": '+JSON.stringify(slaveValue)+',';
    }
}
var jsonContainers = JSON.parse(containers.substr(0, containers.length-1) + '}');

var searchKey = "shiny gold";

var total = 0;
var bags = {"bags": {"shiny gold": 1}};
getAmounts(searchKey);
console.log(total);

function getAmounts(searchKey) {
    var entry = jsonContainers[searchKey];
    for(var i=0;i<entry.length;i++){
        var bagName = entry[i][0];
        var bagAmount = entry[i][1];
        var parentAmount = bags.bags[searchKey];
        total = total + bagAmount*parentAmount;
        bags.bags[bagName] = bagAmount*parentAmount;
        getAmounts(bagName);
    }
}
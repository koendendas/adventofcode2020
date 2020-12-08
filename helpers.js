const path = require('path');
const fs = require('fs');

function getArrayFromInputText(text) {
    const file = fs.readFileSync(path.resolve(__dirname, text));
    return file.toString('utf-8').split("\n");
}

function getCopyFromArray(array){
    return JSON.parse(JSON.stringify(array));
}

module.exports = {
    getCopyFromArray: getCopyFromArray,
    getArrayFromInputText: getArrayFromInputText
};
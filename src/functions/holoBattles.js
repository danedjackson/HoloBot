const fs = require("fs");
const path = require('path');

const getHoloCounters = (leadEsper, firstEsper, secondEsper) => {
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../json/espers.json')));
    const espers = [leadEsper, firstEsper, secondEsper];
    const key = espers.join(",").toLowerCase();

    let counters = null;

    if (data[key]) {
        counters = data[key].counters;
    } else {
        // Try all possible permutations of the espers
        const permutations = permute(espers);
        for (const perm of permutations) {
            const permKey = perm.join(",").toLowerCase();
            if (data[permKey]) {
                counters = data[permKey].counters;
                break;
            }
        }
    }

    if (counters) {
        return counters;
    } else {
        console.log("Key not found");
        return "No formation found.";
    }
}
// Helper function to generate all permutations of an array
function permute(arr) {
    if (arr.length <= 1) {
        return [arr];
    }

    const result = [];
    for (let i = 1; i < arr.length; i++) {
        const rest = permute([...arr.slice(1, i), ...arr.slice(i + 1)]);
        for (const restPerm of rest) {
            result.push([arr[0], arr[i], ...restPerm]);
        }
    }

    return result;
}

module.exports = { getHoloCounters }
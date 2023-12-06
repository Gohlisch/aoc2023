import {readFile} from "../utils.ts";
import {mapSeeds, parseMaps, range, reinterpretSeedsAsRanges} from "./logic.ts";

const input =  readFile("input.txt");
const wrapper = parseMaps(input);
const mappedSeeds1 = mapSeeds(wrapper);


const ranges = reinterpretSeedsAsRanges(wrapper.initialSeeds);
let lowestOverall = Number.MAX_VALUE;

function findLowestNumber(arr: number[]): number {
    let lowestNumber = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < lowestNumber) {
            lowestNumber = arr[i];
        }
    }

    return lowestNumber;
}


console.log(`Part 1: ${findLowestNumber(mappedSeeds1)}`);


const STEP = 1000000;
ranges.forEach(([start, length]) => {
    let i = 0;
    while (i+STEP < length) {
        wrapper.initialSeeds = range(start+i, STEP);
        const mapped = mapSeeds(wrapper);
        const lowest = findLowestNumber(mapped);
        if(lowest < lowestOverall) lowestOverall = lowest;
        i += STEP;
    }
    wrapper.initialSeeds = range(start+i, length-i);
    const mapped = mapSeeds(wrapper);
    const lowest = findLowestNumber(mapped);
    if(lowest < lowestOverall) lowestOverall = lowest;
});

console.log(`Part 2: ${lowestOverall}`);

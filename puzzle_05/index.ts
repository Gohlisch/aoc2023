import {readFile} from "../utils.ts";
import {mapSeeds, parseMaps} from "./logic.ts";

const input =  readFile("input.txt");
const wrapper = parseMaps(input);
const mappedSeeds = mapSeeds(wrapper);

console.log(`Part 1: ${mappedSeeds.sort((a,b) => a-b)[0]}`);
console.log(`Part 2: ${""}`);

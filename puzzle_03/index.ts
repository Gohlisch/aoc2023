import {readFile} from "../utils.ts";
import {getGearScore, getNumbersAdjacentToSymbols} from "./logic.ts";

const input =  readFile("input.txt");
const numbersAdjacent = getNumbersAdjacentToSymbols(input);
const sum = numbersAdjacent.reduce((acc, curr) => acc + curr.weight, 0);

console.log(`Part 1: ${sum}`);
console.log(`Part 2: ${getGearScore(numbersAdjacent)}`);

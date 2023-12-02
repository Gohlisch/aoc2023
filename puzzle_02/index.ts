import {readFile} from "../utils.ts";
import {
    sumOfPossibleGameIds, sumOfPowerOfRequiredCubes
} from "./logic.ts";

const input =  readFile("input.txt");

console.log(`Part 1: ${sumOfPossibleGameIds(input.split("\n"))}`);
console.log(`Part 2: ${sumOfPowerOfRequiredCubes(input.split("\n"))}`);

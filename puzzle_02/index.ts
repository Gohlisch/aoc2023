import {readFile} from "../utils.ts";
import {
    sumOfPossibleGameIds
} from "./logic.ts";

const input =  readFile("input.txt");

console.log(`Part 1: ${sumOfPossibleGameIds(input.split("\n"))}`);

// const result2 = (input)
//     .split("\n")
//     .filter(a => !!a)
//     .map( a => createNumberFromFirstAndLastDigitOrWrittenNumber(a))
//     .reduce((a,b) => a+b)
//
// console.log(`Part 1: ${result2}`);

/**
 * to low:
 * 201
 */

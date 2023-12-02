import {readFile} from "../utils.ts";
import {createNumberFromFirstAndLastDigit, createNumberFromFirstAndLastDigitOrWrittenNumber} from "./logic.ts";

const input =  readFile("input.txt");

const result1 = input.split("\n")
    .map(a => a.trim())
    .filter(a => !!a)
    .map(createNumberFromFirstAndLastDigit)
    .reduce((a,b) => a+b)

console.log(`Part 1: ${result1}`);

const result2 = (input)
    .split("\n")
    .filter(a => !!a)
    .map( a => createNumberFromFirstAndLastDigitOrWrittenNumber(a))
    .reduce((a,b) => a+b)

console.log(`Part 1: ${result2}`);

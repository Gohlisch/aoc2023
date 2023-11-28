import {readFile} from "../utils.ts";
import {calcPaper, calcRibbon} from "./logic.ts";

const input = readFile("input.txt");

const result1 =input.split("\n")
    .filter(a => !!a)
    .map(calcPaper)
    .reduce((a,b) => a+b);

console.log(`Part 1: ${result1}`);

const result2 = input.split("\n")
    .filter(a => !!a)
    .map(calcRibbon)
    .reduce((a,b) => a+b);

console.log(`Part 2: ${result2}`);

import {readFile} from "../utils.ts";
import {amountOfWaysToWin, parse} from "./logic.ts";

const input =  readFile("input.txt");

const races = parse(input);
const res = amountOfWaysToWin(races).reduce((a,b) => a*b, 1);

console.log(`Part 1: ${res}`);
console.log(`Part 2: ${0}`);

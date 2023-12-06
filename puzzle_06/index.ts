import {readFile} from "../utils.ts";
import {amountOfWaysToWin, parse, toOneRace, waysToWin} from "./logic.ts";

const input =  readFile("input.txt");

const races = parse(input);
const res = amountOfWaysToWin(races).reduce((a,b) => a*b, 1);

console.log(`Part 1: ${res}`);

const race = toOneRace(races);
const res2 = waysToWin(race).length;

console.log(`Part 2: ${res2}`);

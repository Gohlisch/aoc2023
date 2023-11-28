import {readFile} from "../utils.ts";
import {calcHousesVisited, calcHousesVisitedWithRobotSanta} from "./logic.ts";

const input = readFile("input.txt");

const result1 = calcHousesVisited(input);

console.log(`Part 1: ${result1}`);

const result2 = calcHousesVisitedWithRobotSanta(input);

console.log(`Part 2: ${result2}`);

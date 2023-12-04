import {readFile} from "../utils.ts";
import {calcCardValue, extractNumbersFromCard} from "./logic.ts";

const input =  readFile("input.txt");

const score = input.split("\n")
    .filter(a => !!a)
    .map(extractNumbersFromCard)
    .map(card => calcCardValue(card.numbers, card.winningNumbers))
    .reduce((a, b) => a + b, 0);


console.log(`Part 1: ${score}`);
console.log(`Part 2: ${null}`);

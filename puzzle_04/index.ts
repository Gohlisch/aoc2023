import {readFile} from "../utils.ts";
import {calcCardValue, calcCardWon, parseCard} from "./logic.ts";

const input =  readFile("input.txt");

const cards = input.split("\n")
    .filter(a => !!a)
    .map(parseCard);
const score = cards
    .map(card => calcCardValue(card.numbers, card.winningNumbers))
    .reduce((a, b) => a + b, 0);
const cardsWon = calcCardWon(cards);


console.log(`Part 1: ${score}`);
console.log(`Part 2: ${cardsWon}`);

import {assertEquals, assert, assertFalse} from "https://deno.land/std@0.207.0/assert/mod.ts";
import { getNumbersAdjacentToSymbols } from "./logic.ts";

const testInput = "467..114..\n" +
    "...*......\n" +
    "..35..633.\n" +
    "......#...\n" +
    "617*......\n" +
    ".....+.58.\n" +
    "..592.....\n" +
    "......755.\n" +
    "...$.*....\n" +
    ".664.598..";

Deno.test("It works", () => {
    const numbersAdjacent = getNumbersAdjacentToSymbols(testInput);

    assertEquals(numbersAdjacent.length, 8);

    const sum = numbersAdjacent.reduce((acc, curr) => acc + curr.weight, 0);
    assertEquals(sum, 4361);
});

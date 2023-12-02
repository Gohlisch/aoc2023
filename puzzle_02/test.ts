import {assertEquals, assert, assertFalse} from "https://deno.land/std@0.207.0/assert/mod.ts";
import {isGamePossible, sumOfPossibleGameIds, sumOfPowerOfRequiredCubes} from "./logic.ts";

const testInput = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n" +
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n" +
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n" +
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n" +
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";

Deno.test("Accumulates", () => {
    assertEquals(sumOfPossibleGameIds(testInput.split("\n")), 8);
})

Deno.test("few cubes possible", () => {
    assert(isGamePossible("3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n"));
});

Deno.test("to many red cubes impossible", () => {
    assertFalse(isGamePossible("8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"));
})

Deno.test("power of required cubes", () => {
    assertEquals(sumOfPowerOfRequiredCubes(["Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n"]), 48);
});


Deno.test("power of required cubes", () => {
    assertEquals(sumOfPowerOfRequiredCubes(testInput.split("\n")), 2286);
});

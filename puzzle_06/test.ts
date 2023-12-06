import {assertEquals, assert, assertFalse} from "https://deno.land/std@0.207.0/assert/mod.ts";
import {amountOfWaysToWin, parse} from "./logic.ts";

const testInput = "Time:      7  15   30\n" +
    "Distance:  9  40  200";

Deno.test("Parses", () => {
    const parsed = parse(testInput);

    assertEquals(parsed.length, 3);
});

Deno.test("Calculates", ()=>{
    const res = amountOfWaysToWin(parse(testInput)).reduce((a,b) => a*b, 1);

    assertEquals(res, 288);
});

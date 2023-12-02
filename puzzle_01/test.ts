import { assertEquals } from "https://deno.land/std@0.207.0/assert/mod.ts";
import {
    createNumberFromFirstAndLastDigit,
    createNumberFromFirstAndLastDigitOrWrittenNumber,
} from "./logic.ts";

Deno.test("replaces last word", () => {
    const line = "83hqrd1sixsevennine";

    assertEquals(createNumberFromFirstAndLastDigitOrWrittenNumber(line), 89);
});

Deno.test("replaces last word", () => {
    const line = "bskfxdm68nbtdfpbtmgpddrkkczr91";

    assertEquals(createNumberFromFirstAndLastDigit(line), 61);
});

Deno.test("replaces word, split in two", () => {
    const line = "9fivetwothree71five7oneightrt";

    assertEquals(createNumberFromFirstAndLastDigitOrWrittenNumber(line), 98);
});

Deno.test("replaces word, split in two", () => {
    const line = "3rxgts";

    assertEquals(createNumberFromFirstAndLastDigitOrWrittenNumber(line), 33);
});

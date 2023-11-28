import { assertEquals } from "https://deno.land/std@0.207.0/assert/mod.ts";
import {calcPaper, calcRibbon} from "./logic.ts";

Deno.test("Calcs paper properly (1)", () => {
    const line1 = "2x3x4";

    assertEquals(calcPaper(line1), 58);
});

Deno.test("Calcs paper properly (2)", () => {
    const line2 = "1x1x10";

    assertEquals(calcPaper(line2), 43);
});

Deno.test("Calcs ribbon properly (1)", () => {
    const line1 = "2x3x4";

    assertEquals(calcRibbon(line1), 34);
});

Deno.test("Calcs ribbon properly (2)", () => {
    const line2 = "1x1x10";

    assertEquals(calcRibbon(line2), 14);
});

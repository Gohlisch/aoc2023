import { assertEquals } from "https://deno.land/std@0.207.0/assert/mod.ts";
import {calcHousesVisited, calcHousesVisitedWithRobotSanta} from "./logic.ts";

Deno.test("Calcs simple route", () => {
    const input = ">";

    assertEquals(calcHousesVisited(input), 2);
});

Deno.test("Calcs square route", () => {
    const input = "^>v<";

    assertEquals(calcHousesVisited(input), 4);
});

Deno.test("Calcs dumb route", () => {
    const input = "^v^v^v^v^v";

    assertEquals(calcHousesVisited(input), 2);
});

Deno.test("Calcs simple route with robot santa", () => {
    const input = "^v";

    assertEquals(calcHousesVisitedWithRobotSanta(input), 3);
});

Deno.test("Calcs square route with robot santa", () => {
    const input = "^>v<";

    assertEquals(calcHousesVisitedWithRobotSanta(input), 3);
});

Deno.test("Calcs dumb route with robot santa", () => {
    const input = "^v^v^v^v^v";

    assertEquals(calcHousesVisitedWithRobotSanta(input), 11);
});

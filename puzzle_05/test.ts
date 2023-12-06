import {assertEquals, assert, assertFalse} from "https://deno.land/std@0.207.0/assert/mod.ts";
import {mapSeeds, parseMaps, reinterpretSeedsAsRanges} from "./logic.ts";

const testInput = "seeds: 79 14 55 13\n" +
    "\n" +
    "seed-to-soil map:\n" +
    "50 98 2\n" +
    "52 50 48\n" +
    "\n" +
    "soil-to-fertilizer map:\n" +
    "0 15 37\n" +
    "37 52 2\n" +
    "39 0 15\n" +
    "\n" +
    "fertilizer-to-water map:\n" +
    "49 53 8\n" +
    "0 11 42\n" +
    "42 0 7\n" +
    "57 7 4\n" +
    "\n" +
    "water-to-light map:\n" +
    "88 18 7\n" +
    "18 25 70\n" +
    "\n" +
    "light-to-temperature map:\n" +
    "45 77 23\n" +
    "81 45 19\n" +
    "68 64 13\n" +
    "\n" +
    "temperature-to-humidity map:\n" +
    "0 69 1\n" +
    "1 0 69\n" +
    "\n" +
    "humidity-to-location map:\n" +
    "60 56 37\n" +
    "56 93 4";

Deno.test("parses", () => {
    const parsed = parseMaps(testInput);

    assertEquals(parsed.initialSeeds.length, 4);
    assertEquals(parsed.maps.length, 7);
    assertEquals(parsed.maps[0].length, 2);
    assertEquals(parsed.maps[1].length, 3);
    assertEquals(parsed.maps[2].length, 4);
    assertEquals(parsed.maps[3].length, 2);
    assertEquals(parsed.maps[4].length, 3);
    assertEquals(parsed.maps[5].length, 2);
});

Deno.test("maps", () => {
    const wrapper = parseMaps(testInput);

    const mappedSeeds = mapSeeds(wrapper);

    assertEquals(mappedSeeds.sort((a,b) => a-b)[0], 35);
});


Deno.test("maps many more numbers", () => {
    const wrapper = parseMaps(testInput);

    wrapper.initialSeeds = reinterpretSeedsAsRanges(wrapper.initialSeeds);

    const mappedSeeds = mapSeeds(wrapper);

    assertEquals(mappedSeeds.sort((a,b) => a-b)[0], 46);
});

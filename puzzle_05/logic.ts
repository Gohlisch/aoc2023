import {Exception} from "https://deno.land/x/lume@v1.11.4/core/errors.ts";

export interface Range {
    destinationStart: number;
    sourceStart: number;
    length: number;
    step: number;
}

export interface MapWrapper {
    initialSeeds: number[];
    maps: Range[][];
}

const initialSeedsRegex = /seeds: (?<seeds>(\d+ ?)+)/;
const seedToSoilMapRegex = /seed-to-soil map:\n(?<map>(\d+ \d+ \d+\n)+)/;
const soilToFertilizerMapRegex = /soil-to-fertilizer map:\n(?<map>(\d+ \d+ \d+\n)+)/;
const ferilizerToWaterMapRegex = /fertilizer-to-water map:\n(?<map>(\d+ \d+ \d+\n)+)/;
const waterToLightMapRegex = /water-to-light map:\n(?<map>(\d+ \d+ \d+\n)+)/;
const lightToTemperatureMapRegex = /light-to-temperature map:\n(?<map>(\d+ \d+ \d+\n)+)/;
const temperatureToHumidityMapRegex = /temperature-to-humidity map:\n(?<map>(\d+ \d+ \d+\n)+)/;
const humidityToLocationMapRegex = /humidity-to-location map:\n(?<map>(\d+ \d+ \d+\n?)+)/;
const mapRegexs = [
    seedToSoilMapRegex,
    soilToFertilizerMapRegex,
    ferilizerToWaterMapRegex,
    waterToLightMapRegex,
    lightToTemperatureMapRegex,
    temperatureToHumidityMapRegex,
    humidityToLocationMapRegex
];

export function parseMaps(toBeParsed: string): MapWrapper {
    const seedMatch = initialSeedsRegex.exec(toBeParsed);
    if(!seedMatch || !seedMatch.groups) throw new Exception("No seeds!");

    function matchMaps(rgx: RegExp) {
        const match = rgx.exec(toBeParsed);
        if (!match || !match.groups) throw new Error(`Map regex did not match: ${rgx}`);
        return match.groups["map"];
    }

    function stringToNumberArray(str: string): number[] {
        return str.trim().split(" ").map(s => +s);
    }

    function numbersToRange(numbers: number[]): Range {
        return {destinationStart: numbers[0],sourceStart: numbers[1], length: numbers[2], step: numbers[0]-numbers[1]};
    }

    const maps: Range[][] = mapRegexs.map(matchMaps)
        .map(str => str.trim()
            .split("\n")
            .map(stringToNumberArray)
            .map(numbersToRange)
        );

    return {
        initialSeeds: stringToNumberArray(seedMatch.groups["seeds"]),
        maps,
    }
}

export function mapSeeds(wrapper: MapWrapper): number[] {
    return wrapper.initialSeeds.map(num => {
       wrapper.maps.forEach(range => num = mapNumber(num, range));
       return num;
    });
}

export function reinterpretSeedsAsRanges(seeds: number[]): [number, number][] {
    const startLengthPairs: [number, number][] = [];
    for(let i = 0; i+1 <seeds.length; i += 2) {
        startLengthPairs.push([seeds[i], seeds[i+1]]);
    }
    startLengthPairs.sort((a, b) => a[0]-b[0]);

    const mergedRanges: [number, number][] = [];
    let currentRange = startLengthPairs[0];
    for (let i = 1; i < startLengthPairs.length; i++) {
        const nextRange = startLengthPairs[i];
        if(currentRange[0]+currentRange[1] > nextRange[0]) { // overlap!
            currentRange[1] += nextRange[0]+nextRange[1]-currentRange[0]-currentRange[1];
        } else { // no overlap :(
            mergedRanges.push(currentRange);
            currentRange = nextRange;
        }
    }
    mergedRanges.push(currentRange);

    return mergedRanges;
}

export function range(start: number, length: number): number[] {
    return [...new Array(length).keys()].map(n => n+start);
}

function mapNumber(number: number, map: Range[]) {
    const range = map.find(range => isInRange(number, range));
    return range ? range.step+number : number;
}

function isInRange(number: number, range: Range): boolean {
    return number >= range.sourceStart && number < (range.sourceStart+range.length);
}

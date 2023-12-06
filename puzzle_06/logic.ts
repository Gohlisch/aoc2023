export interface Race {
    time_ms: number;
    distance_mm: number;
}

const timeRegex = /Time: (?<ms>(\s*\d+\s*)+)/;
const distanceRegex = /Distance: (?<mm>(\s*\d+\s*)+)/;

export function amountOfWaysToWin(races: Race[]): number[] {
    return races.map(waysToWin)
        .map(arr => arr.length);
}

export function parse(input: string): Race[] {
    const timesMatch = timeRegex.exec(input);
    if(!timesMatch || !timesMatch.groups) throw new Error(`No times found: ${input}`);
    const times = timesMatch.groups["ms"]
        .replaceAll(/\s+/g, " ")
        .trim()
        .split(" ")
        .map(n => +n);


    const distanceMatch = distanceRegex.exec(input);
    if(!distanceMatch || !distanceMatch.groups) throw new Error(`No distances found: ${input}`);
    const distances = distanceMatch.groups["mm"]
        .replaceAll(/\s+/g, " ")
        .trim()
        .split(" ")
        .map(n => +n);

    if(distances.length !== times.length) throw new Error(`Times (${times.length}}) do not match the amount of distances (${distances.length})`);

    return [...new Array(distances.length).keys()]
        .map(n => ({
            time_ms: times[n],
            distance_mm: distances[n],
        }));
}

function waysToWin(race: Race): number[] {
    const chargingTimesToWin = [];
    for (let chargingTime = 1; chargingTime < race.time_ms; chargingTime++) {
        const remainingTime = race.time_ms - chargingTime;
        const metersCovered = remainingTime * chargingTime;
        if(metersCovered > race.distance_mm)
            chargingTimesToWin.push(chargingTime);
    }
    return chargingTimesToWin;
}

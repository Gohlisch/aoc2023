type CountedColors = {     red: number;     green: number;     blue: number; };

const MAX_CUBES = Object.freeze({
    "red": 12,
    "green": 13,
    "blue": 14
});

const COLORS = Object.freeze(["red", "green", "blue"]);

export function sumOfPossibleGameIds(lines: string[]) {
    return lines.filter(line => !!line)
        .map(line => line.split(":"))
        .map(([gameName, gameString]) => [idOfGame(gameName), isGamePossible(gameString)] as [number, boolean])
        .filter(([_, possible]) => possible)
        .map(([idOfPossibleGame, _]) => idOfPossibleGame)
        .reduce((idA, idB) => idA + idB);
}

export function isGamePossible(gameString: string) {
    return !gameString.split(";")
        .map(a => a.trim())
        .map(revealString => revealString.split(","))
        .map(collectColoredCubes)
        .find(cubes => !isPossible(cubes as CountedColors));
}

function isPossible(reveal: CountedColors): boolean {
    return (COLORS as Array<"red" | "green" | "blue">)
        .filter((color) => MAX_CUBES[color] < reveal[color])
        .length === 0;
}

function collectColoredCubes(strings: string[]): CountedColors {
    const o: {[key: string]: number} = {};

    strings.map(a => a.trim().split(" "))
        .filter(([count, color]) => COLORS.find(c => c === color) && !Number.isNaN(+count))
        .forEach(([count, color]) => o[color] = +count);

    return o as CountedColors;
}

function idOfGame(string: string): number {
    const match =  /Game (\d+)/.exec(string);
    if(match) return +match.at(1)!;
    else throw new Error(string + " is no game id");
}

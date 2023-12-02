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

export function sumOfPowerOfRequiredCubes(lines: string[]) {
    return lines.filter(line => !!line)
        .map(line => line.split(":")[1].trim())
        .map(allRevealsOfGame => allRevealsOfGame.split(";"))
        .map(separatedRevealsOfGame => separatedRevealsOfGame.map(reveals => collectColoredCubes(reveals.split(","))))
        .map(getRequirecCubes)
        .map(powerOfCube)
        .reduce((a,b) => a+b);
}

function powerOfCube(cubes: CountedColors) {
    return cubes.red * cubes.green * cubes.blue;
}

function isPossible(reveal: CountedColors): boolean {
    return (COLORS as Array<"red" | "green" | "blue">)
        .filter((color) => MAX_CUBES[color] < reveal[color])
        .length === 0;
}

function collectColoredCubes(revealedCubes: string[]): CountedColors {
    const o: {[key: string]: number} = {};

    revealedCubes.map(a => a.trim().split(" "))
        .filter(([count, color]) => COLORS.find(c => c === color) && !Number.isNaN(+count))
        .forEach(([count, color]) => o[color] = +count);

    return o as CountedColors;
}

function idOfGame(gameName: string): number {
    const match =  /Game (\d+)/.exec(gameName);
    if(match) return +match.at(1)!;
    else throw new Error(gameName + " is no game id");
}

function getRequirecCubes(allReveals: CountedColors[]): CountedColors {
    const required: CountedColors = {
      red: 0,
      green: 0,
      blue: 0
    };

    allReveals.forEach(colors => {
        if(colors.red > required.red) required.red = colors.red;
        if(colors.blue > required.blue) required.blue = colors.blue;
        if(colors.green > required.green) required.green = colors.green;
    });

    return required;
}

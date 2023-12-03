const symbols = ["*", "#", "+", "$", "@", "&", "%", "§", "!", "?", "(", ")", "[", "]", "{", "}", "<", ">", ":", ";", ",", "-", "_", "=", "|", "~", "^", "`", "'", '"', "/"]
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

type WeightedCoordinates = {
    x: number;
    ys: number[];
    weight: number;
    gear?: Gear;
}

type Gear = {
    x: number;
    y: number;
    adjacentNumbers: [number, number][];
}

export function getGearScore(string: WeightedCoordinates[]): number {
    const o : {[key:string]: WeightedCoordinates[]}= {};

    string.filter(number => number.gear).forEach(number => {
        const x = number.gear!.x;
        const y = number.gear!.y;
        const key = x + "," + y;
        if(!o[key]) {
            o[key] = [];
        }
        o[key].push(number);
    });

    return Object.values(o)
        .filter(numbers => numbers.length === 2)
        .map(numbers => numbers.reduce((acc, curr) => acc * curr.weight, 1))
        .reduce((acc, curr) => acc + curr, 0);
}

export function getNumbersAdjacentToSymbols(string: string): WeightedCoordinates[] {
    const grid = string.split("\n")
        .map(line => line.split(""));
    const gridCheck = getGridCheck(grid);
    let coordinatesOfIncludedNumbers: [number, number, Gear | undefined][] = []

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            const gear: Gear | undefined = grid[i][j] === "*" ?  {
                x: i,
                y: j,
                adjacentNumbers: []
            } : undefined;

            if(symbols.includes(grid[i][j])) {
                if(gridCheck(i-1, j) && digits.includes(grid[i-1][j])) {
                    coordinatesOfIncludedNumbers.push([i-1, j, gear]);
                    if(gear) gear.adjacentNumbers.push([i-1, j]);
                }
                if(gridCheck(i+1, j) && digits.includes(grid[i+1][j])) {
                    coordinatesOfIncludedNumbers.push([i+1, j, gear]);
                    if(gear) gear.adjacentNumbers.push([i+1, j]);
                }
                if (gridCheck(i, j-1) && digits.includes(grid[i][j-1])) {
                    coordinatesOfIncludedNumbers.push([i, j-1, gear]);
                    if(gear) gear.adjacentNumbers.push([i, j-1]);
                }
                if(gridCheck(i, j+1) && digits.includes(grid[i][j+1])) {
                    coordinatesOfIncludedNumbers.push([i, j+1, gear]);
                    if(gear) gear.adjacentNumbers.push([i, j+1]);
                }
                if(gridCheck(i-1, j-1) && digits.includes(grid[i-1][j-1])) {
                    coordinatesOfIncludedNumbers.push([i-1, j-1, gear]);
                    if(gear) gear.adjacentNumbers.push([i-1, j-1]);
                }
                if(gridCheck(i-1, j+1) && digits.includes(grid[i-1][j+1])) {
                    coordinatesOfIncludedNumbers.push([i-1, j+1, gear]);
                    if(gear) gear.adjacentNumbers.push([i-1, j+1]);
                }
                if(gridCheck(i+1, j-1) && digits.includes(grid[i+1][j-1])) {
                    coordinatesOfIncludedNumbers.push([i+1, j-1, gear]);
                    if(gear) gear.adjacentNumbers.push([i+1, j-1]);
                }
                if(gridCheck(i+1, j+1) && digits.includes(grid[i+1][j+1])) {
                    coordinatesOfIncludedNumbers.push([i+1, j+1, gear]);
                    if(gear) gear.adjacentNumbers.push([i+1, j+1]);
                }
            }
        }
    }

    const weightedCoordinates: WeightedCoordinates[] = getWeightedCoordinates(grid);
    const includedWeightedCoordinates: Set<WeightedCoordinates> = new Set<WeightedCoordinates>();
    for (const [x, y, gear] of coordinatesOfIncludedNumbers) {

        const weightedCoordinate = weightedCoordinates.find(weightedCoordinate => weightedCoordinate.x === x && weightedCoordinate.ys.includes(y));
        if(!weightedCoordinate)
            throw new Error("Weighted coordinate not found " + JSON.stringify({x, y}));

        if(gear)
            weightedCoordinate.gear = gear;

        includedWeightedCoordinates.add(weightedCoordinate);
    }

    return Array.from(includedWeightedCoordinates);
}

function getGridCheck(grid: any[][]) {
    return (x: number, y : number) => x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;
}

function getWeightedCoordinates(grid: string[][]): WeightedCoordinates[] {
    const weightedCoordinates: WeightedCoordinates[] = [];

    for (let x = 0; x < grid.length; x++) {
        let y  = 0;
        let ys: number[] = [];
        while(y < grid[0].length) {
            if(digits.includes(grid[x][y])) ys.push(y);
            else if (ys.length > 0) {
                const weight =  +ys.reduce((otherDigits, y) => otherDigits + grid[x][+y], "")
                weightedCoordinates.push({x, ys, weight});
                ys = [];
            } else {
                ys = [];
            }

            y++;
        }

        if(digits.includes(grid[x][y])) ys.push(y);
        else if (ys.length > 0) {
            const weight =  +ys.reduce((otherDigits, y) => otherDigits + grid[x][+y], "")
            weightedCoordinates.push({x, ys, weight});
            ys = [];
        } else {
            ys = [];
        }
    }
    return weightedCoordinates;
}

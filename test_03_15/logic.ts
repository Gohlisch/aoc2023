export function calcHousesVisited(input: string) {
    const housesVisited = new Set<string>();
    const currentPosition = [0,0];

    housesVisited.add(`${currentPosition[0]},${currentPosition[1]}`);
    for(const direction of input.split("")) {

        switch (direction) {
            case ">": currentPosition[0] += 1; break;
            case "<": currentPosition[0] -= 1; break;
            case "^": currentPosition[1] += 1; break;
            case "v": currentPosition[1] -= 1; break;
        }

        housesVisited.add(`${currentPosition[0]},${currentPosition[1]}`);
    }

    return housesVisited.size;
}

export function calcHousesVisitedWithRobotSanta(input: string) {
    const realPositions = new Set<string>();
    const realPosition = [0,0];
    const robotPosition = [0,0];

    let realSantaTurn = true;
    realPositions.add(`${realPosition[0]},${realPosition[1]}`);
    for(const direction of input.split("")) {

        switch (direction) {
            case ">": if(realSantaTurn) realPosition[0] += 1; else robotPosition[0] += 1; break;
            case "<": if(realSantaTurn) realPosition[0] -= 1; else robotPosition[0] -= 1; break;
            case "^": if(realSantaTurn) realPosition[1] += 1; else robotPosition[1] += 1; break;
            case "v": if(realSantaTurn) realPosition[1] -= 1; else robotPosition[1] -= 1; break;
        }

        if(realSantaTurn) realPositions.add(`${realPosition[0]},${realPosition[1]}`);
        else realPositions.add(`${robotPosition[0]},${robotPosition[1]}`);

        realSantaTurn = !realSantaTurn;
    }

    return realPositions.size;
}

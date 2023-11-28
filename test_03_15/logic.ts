export function calcHousesVisited(input: string): number {
    const housesVisited = new Set<string>();
    const currentPosition: [number, number]  = [0,0];

    housesVisited.add(pairAsString(currentPosition));
    for(const direction of input.split("")) {
        moveInDirection(currentPosition, direction as Direction);
        housesVisited.add(pairAsString(currentPosition));
    }

    return housesVisited.size;
}

export function calcHousesVisitedWithRobotSanta(input: string): number {
    const positions = new Set<string>();
    const realPosition: [number, number] = [0,0];
    const robotPosition: [number, number]  = [0,0];

    let realSantaTurn = true;
    positions.add(pairAsString(realPosition));
    for(const direction of input.split("")) {
        const toBeMoved = realSantaTurn ? realPosition : robotPosition;

        moveInDirection(toBeMoved, direction as Direction);
        positions.add(pairAsString(toBeMoved));
        realSantaTurn = !realSantaTurn;
    }

    return positions.size;
}

type Direction = "<"|">"|"^"|"v";

function pairAsString(pair: [number, number]): string {
    return `${pair[0]},${pair[1]}`;
}

function moveInDirection( position: [number, number], direction: Direction): void {
    switch (direction) {
        case ">": position[0] += 1; break;
        case "<": position[0] -= 1; break;
        case "^": position[1] += 1; break;
        case "v": position[1] -= 1; break;
    }
}

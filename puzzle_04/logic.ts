// 819

export type Card = {
    numbers: number[];
    winningNumbers: number[];
    gameNumber: number;
}

export function extractNumbersFromCard(card: string): Card {
    const regex = /Card ( *\d+):(( *\d+ *)+)\|(( *\d+ *)+)/;
    const matches = card.match(regex);
    if(!matches) {
        throw new Error("Invalid card");
    }
    const gameNumber = parseInt(matches[1].trim());
    const numbers = matches[2].trim().split(" ").filter(a => a !== "").map(number => parseInt(number.trim()));
    const winningNumbers = matches[4].trim().split(" ").filter(a => a !== "").map(number => parseInt(number.trim()));
    return {
        numbers,
        winningNumbers,
        gameNumber
    };
}

export function calcCardValue(yourNumbers: number[], winningNumbers: number[]): number {
    const yourNumbersSet = new Set(yourNumbers);
    const winningNumbersSet = new Set(winningNumbers);
    const intersection = new Set([...yourNumbersSet].filter(x => winningNumbersSet.has(x)));
    const amountOfNumbers = intersection.size;

    return amountOfNumbers >= 1 ? Math.pow(2, intersection.size-1) : 0;
}

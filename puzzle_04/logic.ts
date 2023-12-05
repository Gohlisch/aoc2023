// 819

export type Card = {
    numbers: number[];
    winningNumbers: number[];
    gameNumber: number;
    amountOfWins?: number;
}

export function parseCard(card: string): Card {
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


export function calcCardWon(cards: Card[]): number {
    const cardsMap = new Map<number, Card>();
    const cardsWon = new Map<number, number>();

    cards.forEach(card => {
        cardsWon.set(card.gameNumber, 1);
        cardsMap.set(card.gameNumber, card);
        card.amountOfWins = calcAmountOfWins(card);
    });

    const maxGame = Math.max(...cards.map(card => card.gameNumber));
    for (let i = 1; i <= maxGame; i++) {
        const card = cardsMap.get(i);
        if(!card) throw new Error("Card not found");

        [...Array(card.amountOfWins!).keys()]
            .map(a => a + 1 + card.gameNumber)
            .forEach(gameNumber => {
                if(!cardsWon.has(gameNumber)) return;
                cardsWon.set(gameNumber, cardsWon.get(gameNumber)! + cardsWon.get(card.gameNumber)!);
            });
    }

    return Array.from(cardsWon.values()).reduce((a, b) => a + b, 0);
}

export function calcCardValue(yourNumbers: number[], winningNumbers: number[]): number {
    const yourNumbersSet = new Set(yourNumbers);
    const winningNumbersSet = new Set(winningNumbers);
    const intersection = new Set([...yourNumbersSet].filter(x => winningNumbersSet.has(x)));
    const amountOfNumbers = intersection.size;

    return amountOfNumbers >= 1 ? Math.pow(2, intersection.size-1) : 0;
}

function calcAmountOfWins(card: Card): number {
    const yourNumbersSet = new Set(card.numbers);
    const winningNumbersSet = new Set(card.winningNumbers);
    const intersection = new Set([...yourNumbersSet].filter(x => winningNumbersSet.has(x)));
    return intersection.size;
}

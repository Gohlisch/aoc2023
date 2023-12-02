export function createNumberFromFirstAndLastDigit(input: string) {
    const numbers= input.split("")
        .map(a => +a)
        .filter(a => !Number.isNaN(a));

    if(numbers.length===0) return 0;
    return numbers[0] * 10 + numbers[numbers.length - 1];
}


const writtenNumbers: [string, number][] = [
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9],
];

function findFirstDigitOrWrittenNumber(string: string): number | undefined {
    for (let i = 0; i <= string.length; i++) {
        const slice = string.substring(0, i);
        const found = writtenNumbers.filter(([word, _]) => slice.indexOf(word) !== -1)
            .map(([_, digit]) => digit);
        if(found.length > 0) return +found[0];

        const digit = +string[i];
        if(!Number.isNaN(digit)) return digit;
    }
    return undefined;
}

function findLastDigitOrWrittenNumber(string: string): number | undefined {
    for (let i = string.length; i >= 0; i--) {
        const slice = string.substring(i);
        const found = writtenNumbers.filter(([word, _]) => slice.lastIndexOf(word) !== -1)
            .map(([_, digit]) => digit);
        if(found.length > 0) return found[0];

        const digit = +string[i];
        if(!Number.isNaN(digit)) return digit;
    }
    return undefined;
}

export function createNumberFromFirstAndLastDigitOrWrittenNumber(string: string): number {
    const first = findFirstDigitOrWrittenNumber(string);
    const last = findLastDigitOrWrittenNumber(string);

    if(first === undefined || last === undefined) throw new Error(`${string} does not contain a number.`);

    return first*10 + last;
}

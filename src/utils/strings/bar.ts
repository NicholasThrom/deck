const fullCharacter = "▓";
const emptyCharacter = "░";

export function bar(amount: number, total: number, length: number = 30): string {
    const numberOfFullCharacters = amountFull(amount / total, length);
    return `[${integerBar(numberOfFullCharacters, length)}]`;
}

/**
 * Returns the number of characters that should be full
 * for the specified fraction and total.
 *
 * Rounds funny so that the bar is only full or empty
 * when the fraction is 1 or 0.
 */
function amountFull(fraction: number, length: number) {
    const count = fraction * length;

    let integer = Math.floor(count);
    const decimal = count - integer;
    const roundingPoint = Math.round(count) / length;
    if (decimal > roundingPoint) { integer += 1; }
    return integer;
}

/**
 * Returns a string containing a bar of length `total` with `full` of the items full.
 */
function integerBar(full: number, length: number) {
    const empty = length - full;

    return `${fullCharacter.repeat(full)}${emptyCharacter.repeat(empty)}`;
}

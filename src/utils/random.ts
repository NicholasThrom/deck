export function randomElement<T>(array: readonly T[]) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

export function weightedRandomElement<T>(array: readonly [number, T][]) {
    const total = array.reduce((a, b) => a + b[0], 0);
    const weight = Math.random() * total;

    let runningTotal = 0;
    for (const item of array) {
        runningTotal += item[0];
        if (runningTotal > weight) {
            return item;
        }
    }
    throw new Error("This code should be unreachable");
}

export function chance(probability: number) {
    return Math.random() < probability;
}

export function randomIn(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

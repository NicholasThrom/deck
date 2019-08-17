export function randomElement<T>(array: readonly T[]) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

export function chance(probability: number) {
    return Math.random() < probability;
}

export function randomIn(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

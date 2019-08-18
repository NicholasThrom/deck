/**
 * Waits the amount of time specified in milliseconds.
 */
export function delay(time: number): Promise<undefined> {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

/**
 * A type that can be a Promise of a type, or just that type.
 */
export type MaybePromise<T> = T | Promise<T>;

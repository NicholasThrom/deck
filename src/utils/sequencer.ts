/**
 * Calls the functions in sequence with the specified arguments.
 *
 * Curried, to make combining easier.
 */
export function sequence<T extends readonly any[]>(
    functions: ((...args: T) => Promise<boolean | undefined> | boolean | undefined | void)[],
) {
    return async (...args: T) => {
        for (const func of functions) {
            const result = await func(...args);
            if (result) { return; }
        }
    };
}

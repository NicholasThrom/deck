export function delay(time: number): Promise<undefined> {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

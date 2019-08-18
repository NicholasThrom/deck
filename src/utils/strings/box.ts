const topLine = "┏━━━━━━━┅┅┅┉┉┈┈";
const bottomLine = "┗━━━━━━━┅┅┅┉┉┈┈";
const leftCharacter = "┃";

export function box(string: string) {
    const lines = string.split("\n");

    return [
        `${topLine}`,
        ...(lines.map((line) => `${leftCharacter} ${line}`)),
        `${bottomLine}`,
    ].join("\n");
}

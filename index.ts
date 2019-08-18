import { setUp } from "./src";

// There's nothing to do after this promise,
// so it's safe to float it.
// tslint:disable-next-line no-floating-promises
(async () => {
    await setUp();
})();

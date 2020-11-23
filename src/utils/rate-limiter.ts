/**
 * The information needed to tell how much the access function has been called.
 */
interface Amount {
    value: number;
    time: number;
}

/**
 * For ensuring APIs don't get hit too much.
 *
 * For example, one endpoint may have it's own rate limiter,
 * keyed by ip address.
 *
 * These store everything in memory,
 * since a database would be a bit much.
 * This means they are a bit funky on multi-server setups,
 * specifically,
 * each server gets its own set of rate limiting.
 */
export class RateLimiter<Key> {
    private readonly counters = new Map<Key, Amount>();

    private readonly divisor: number;
    private readonly max: number;

    /**
     * Transforms the passed value to use the current time,
     * instead of the contained time.
     *
     * Adds a hit if `increment` is `true`.
     */
    private updateValue({ value, time }: Amount = { value: 0, time: 0 }, increment: boolean = true): Amount {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - time;
        return {
            value: value / 2 ** (elapsedTime / this.divisor) + (increment ? 1 : 0),
            time: currentTime,
        };
    }

    /**
     * Cleans out the unnecessary entries in the rate limiting dictionary,
     * to prevent memory leaks.
     */
    private prune() {
        this.counters.forEach((value, key) => {
            const result = this.updateValue(value, false);
            if (result.value < 0.001) { // Some small number
                this.counters.delete(key);
            }
        });
    }

    /**
     * Hits the counter for the passed key.
     *
     * Returns true if the rate limit has been hit,
     * otherwise false.
     */
    public hit(key: Key): boolean {
        this.prune(); // Not needed, but keeps memory usage down
        const currentValue = this.counters.get(key);
        const newValue = this.updateValue(currentValue);
        if (newValue.value > this.max) { return true; }
        this.counters.set(key, newValue);
        return false;
    }

    /**
     * Constructs a rate limiter with the specified parameters.
     *
     * Rate limiters do not share data in any way.
     */
    public constructor(maxSimultaneousRequests: number, cooldownTime: number) {
        if (maxSimultaneousRequests < 1.1) {
            // The math hits a pole at 1,
            // which is fine for calculus but not for actual floating point numbers,
            // so 1.1 is used.
            maxSimultaneousRequests = 1.1;
        }
        // To make the formula nicer
        const max = maxSimultaneousRequests;
        const cool = cooldownTime;
        // The math is somewhat unpleasant, but this works.
        this.divisor = cool / Math.log2(max / (max - 1));
        this.max = max;
    }
}

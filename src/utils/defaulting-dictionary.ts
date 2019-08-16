/**
 * A map that returns default values for nonexistent keys.
 */
export class DefaultingMap<Key, Value> {

    /**
     * Initializes this map with the specified default value.
     *
     * If the default value is a function,
     * it is called with the key every time a value is missing.
     */
    public constructor(defaultValue: ((key: Key) => Value)) {
        this.defaultValue = defaultValue;
    }

    /**
     * The map underlying this default map.
     */
    private readonly map: Map<Key, Value> = new Map();

    /**
     * The default value of this map,
     * or a function that returns a default value based on the key.
     */
    private readonly defaultValue: ((key: Key) => Value);

    /**
     * Returns the values stored under `key`,
     * or else the default value.
     */
    public get(key: Key): Value {
        const mapResult = this.map.get(key);
        if (mapResult) { return mapResult; }
        const defaultResult = this.defaultValue(key);
        this.set(key, defaultResult);
        return defaultResult;
    }

    /**
     * Sets the value at `key` to the specified value.
     */
    public set(key: Key, value: Value) {
        this.map.set(key, value);
    }

    /**
     * Deletes the specified key.
     */
    public delete(key: Key) {
        this.map.delete(key);
    }

}

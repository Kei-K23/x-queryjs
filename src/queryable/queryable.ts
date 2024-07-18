/**
 * Type alias for a selector function that maps an item of type T to a value of type U.
 */
type Selector<T, U> = (item: T) => U;

/**
 * Type alias for a predicate function that tests an item of type T.
 */
type Predicate<T> = (item: T) => boolean;

/**
 * A class that provides a collection of items with LINQ-style query capabilities.
 */
export default class Queryable<T> {
    private collection: T[];

    constructor(collection: T[]) {
        this.collection = collection;
    }

    /**
       * Projects each element of a collection into a new form.
       * @param selector - A transform function to apply to each element.
       * @returns A new Queryable collection of transformed elements.
       */
    select<U>(selector: Selector<T, U>): Queryable<U> {
        return new Queryable<U>(this.collection.map(selector));
    }

    /**
     * Filters a collection based on a predicate.
     * @param predicate - A function to test each element for a condition.
     * @returns A new Queryable collection of elements that satisfy the condition.
     */
    where(predicate: Predicate<T>): Queryable<T> {
        return new Queryable<T>(this.collection.filter(predicate));
    }

    /**
     * Sorts the elements of a collection in ascending order according to a key.
     * @param keySelector - A function to extract a key from an element.
     * @returns A new Queryable collection of sorted elements.
     */
    orderBy<U>(keySelector: Selector<T, U>): Queryable<T> {
        return new Queryable<T>([...this.collection].sort((a, b) => {
            const keyA = keySelector(a);
            const keyB = keySelector(b);
            return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
        }));
    }

    /**
       * Sorts the elements of a collection in descending order according to a key.
       * @param keySelector - A function to extract a key from an element.
       * @returns A new Queryable collection of sorted elements.
       */
    orderByDescending<U>(keySelector: Selector<T, U>): Queryable<T> {
        return new Queryable<T>([...this.collection].sort((a, b) => {
            const keyA = keySelector(a);
            const keyB = keySelector(b);
            return keyA > keyB ? -1 : keyA < keyB ? 1 : 0;
        }));
    }

    /**
     * Groups the elements of a collection according to a specified key selector function.
     * @param keySelector - A function to extract the key for each element.
     * @returns An object where the keys are the group keys and the values are arrays of elements.
     */
    groupBy<U extends string | number>(keySelector: Selector<T, U>): Record<U, T[]> {
        return this.collection.reduce((groups, item) => {
            const key = keySelector(item);
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(item);
            return groups;
        }, {} as Record<U, T[]>);
    }

    /**
     * Returns distinct elements from a collection according to a specified key selector function.
     * @param keySelector - A function to extract the key for each element. If not provided, the element itself is used as the key.
     * @returns A new Queryable collection of distinct elements.
     */
    distinct<U>(keySelector?: Selector<T, U>): Queryable<T> {
        const uniqueKeys = new Set<U>();
        const distinctItems: T[] = [];
        this.collection.forEach(item => {
            const key = keySelector ? keySelector(item) : (item as unknown as U);
            if (!uniqueKeys.has(key)) {
                uniqueKeys.add(key);
                distinctItems.push(item);
            }
        });
        return new Queryable<T>(distinctItems);
    }

    /**
     * Returns a specified number of contiguous elements from the start of a collection.
     * @param count - The number of elements to return.
     * @returns A new Queryable collection that contains the specified number of elements from the start.
     */
    take(count: number): Queryable<T> {
        return new Queryable<T>(this.collection.slice(0, count));
    }

    /**
    * Bypasses a specified number of elements in a collection and then returns the remaining elements.
    * @param count - The number of elements to skip.
    * @returns A new Queryable collection that contains the elements that occur after the specified index.
    */
    skip(count: number): Queryable<T> {
        return new Queryable<T>(this.collection.slice(count));
    }

    /**
     * Converts the collection to an array.
     * @returns An array that contains all the elements in the collection.
     */
    toArray(): T[] {
        return this.collection;
    }

    /**
     * Computes the sum of the sequence of numeric values that are obtained by invoking a transform function on each element of the input collection.
     * @param selector - A transform function to apply to each element.
     * @returns The sum of the projected values.
     */
    sum(selector: Selector<T, number>): number {
        return this.collection.reduce((acc, item) => acc + selector(item), 0);
    }

    /**
    * Computes the average of the sequence of numeric values that are obtained by invoking a transform function on each element of the input collection.
    * @param selector - A transform function to apply to each element.
    * @returns The average of the projected values.
    */
    average(selector: Selector<T, number>): number {
        const total = this.sum(selector);
        return total / this.collection.length;
    }

    /**
     * Determines whether any element of a collection satisfies a condition.
     * @param predicate - A function to test each element for a condition.
     * @returns true if any elements in the collection pass the test in the specified predicate; otherwise, false.
     */
    any(predicate: Predicate<T>): boolean {
        return this.collection.some(predicate);
    }

    /**
     * Determines whether all elements of a collection satisfy a condition.
     * @param predicate - A function to test each element for a condition.
     * @returns true if every element of the source collection passes the test in the specified predicate, or if the collection is empty; otherwise, false.
     */
    all(predicate: Predicate<T>): boolean {
        return this.collection.every(predicate);
    }

    /**
     * Returns the first element of a sequence that satisfies a specified condition or the first element if no condition is specified.
     * @param predicate - A function to test each element for a condition.
     * @returns The first element in the collection that passes the test in the specified predicate function or undefined if no such element is found.
     */
    first(predicate?: Predicate<T>): T | undefined {
        if (predicate) {
            return this.collection.find(predicate);
        } else {
            return this.collection[0];
        }
    }

    /**
         * Returns the first element of a sequence that satisfies a specified condition or the first element if no condition is specified, or a default value if no such element is found.
         * @param predicate - A function to test each element for a condition.
         * @param defaultValue - The value to return if no element is found. Defaults to null.
         * @returns The first element in the collection that passes the test in the specified predicate function or the default value if no such element is found.
         */
    firstOrDefault(predicate?: Predicate<T>, defaultValue: T | null = null): T | null {
        const item = predicate ? this.collection.find(predicate) : this.collection[0];
        return item !== undefined ? item : defaultValue;
    }

    /**
      * Returns the last element of a sequence that satisfies a specified condition or the last element if no condition is specified.
      * @param predicate - A function to test each element for a condition.
      * @returns The last element in the collection that passes the test in the specified predicate function or undefined if no such element is found.
      */
    last(predicate?: Predicate<T>): T | undefined {
        if (predicate) {
            return [...this.collection].reverse().find(predicate);
        } else {
            return this.collection[this.collection.length - 1];
        }
    }

    /**
     * Returns the last element of a sequence that satisfies a specified condition or the last element if no condition is specified, or a default value if no such element is found.
     * @param predicate - A function to test each element for a condition.
     * @param defaultValue - The value to return if no element is found. Defaults to null.
     * @returns The last element in the collection that passes the test in the specified predicate function or the default value if no such element is found.
     */
    lastOrDefault(predicate?: Predicate<T>, defaultValue: T | null = null): T | null {
        const item = predicate ? [...this.collection].reverse().find(predicate) : this.collection[this.collection.length - 1];
        return item !== undefined ? item : defaultValue;
    }
}

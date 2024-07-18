type Selector<T, U> = (item: T) => U;
type Predicate<T> = (item: T) => boolean;

export default class Queryable<T> {
    private collection: T[];

    constructor(collection: T[]) {
        this.collection = collection;
    }

    // Select (map)
    select<U>(selector: Selector<T, U>): Queryable<U> {
        return new Queryable<U>(this.collection.map(selector));
    }

    // Where (filter)
    where(predicate: Predicate<T>): Queryable<T> {
        return new Queryable<T>(this.collection.filter(predicate));
    }

    // OrderBy
    orderBy<U>(keySelector: Selector<T, U>): Queryable<T> {
        return new Queryable<T>([...this.collection].sort((a, b) => {
            const keyA = keySelector(a);
            const keyB = keySelector(b);
            return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
        }));
    }

    // OrderByDescending
    orderByDescending<U>(keySelector: Selector<T, U>): Queryable<T> {
        return new Queryable<T>([...this.collection].sort((a, b) => {
            const keyA = keySelector(a);
            const keyB = keySelector(b);
            return keyA > keyB ? -1 : keyA < keyB ? 1 : 0;
        }));
    }

    // GroupBy
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

    // Distinct
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

    // Take
    take(count: number): Queryable<T> {
        return new Queryable<T>(this.collection.slice(0, count));
    }

    // Skip
    skip(count: number): Queryable<T> {
        return new Queryable<T>(this.collection.slice(count));
    }

    // ToArray
    toArray(): T[] {
        return this.collection;
    }

    // Sum
    sum(selector: Selector<T, number>): number {
        return this.collection.reduce((acc, item) => acc + selector(item), 0);
    }

    // Average
    average(selector: Selector<T, number>): number {
        const total = this.sum(selector);
        return total / this.collection.length;
    }

    // Any
    any(predicate: Predicate<T>): boolean {
        return this.collection.some(predicate);
    }

    // All
    all(predicate: Predicate<T>): boolean {
        return this.collection.every(predicate);
    }

    // First
    first(predicate?: Predicate<T>): T | undefined {
        if (predicate) {
            return this.collection.find(predicate);
        } else {
            return this.collection[0];
        }
    }

    // FirstOrDefault
    firstOrDefault(predicate?: Predicate<T>, defaultValue: T | null = null): T | null {
        const item = predicate ? this.collection.find(predicate) : this.collection[0];
        return item !== undefined ? item : defaultValue;
    }

    // Last
    last(predicate?: Predicate<T>): T | undefined {
        if (predicate) {
            return [...this.collection].reverse().find(predicate);
        } else {
            return this.collection[this.collection.length - 1];
        }
    }

    // LastOrDefault
    lastOrDefault(predicate?: Predicate<T>, defaultValue: T | null = null): T | null {
        const item = predicate ? [...this.collection].reverse().find(predicate) : this.collection[this.collection.length - 1];
        return item !== undefined ? item : defaultValue;
    }
}

# X-Queryjs

`X-Queryjs` is small utility `JavaScript` library that is fully type safety, zero-dependencies and mimics the functionality and chaining capabilities of C# LINQ, allowing you to work with collections in a similar and more effective way.

## Installation

npm

```js
npm install x-queryjs
```

pnpm

```js
pnpm add x-queryjs
```

## Usage

Here is a step-by-step guide on how to use the Queryable class.

### Creating a Queryable Collection

You can create a new Queryable collection by passing an array of items to the constructor.

```typescript
import { Queryable } from 'x-queryjs';

const numbers = new Queryable([1, 2, 3, 4, 5]);
const people = new Queryable([
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
]);
```

### Methods

#### select

Projects each element of a collection into a new form.

```typescript
const names = people.select((person) => person.name);
console.log(names.toArray()); // Output: ['Alice', 'Bob', 'Charlie']
```

#### where

Filters a collection based on a predicate.

```typescript
const adults = people.where((person) => person.age >= 30);
console.log(adults.toArray()); // Output: [{ name: 'Alice', age: 30 }, { name: 'Charlie', age: 35 }]
```

#### orderBy

Sorts the elements of a collection in ascending order according to a key.

```typescript
const sortedByName = people.orderBy((person) => person.name);
console.log(sortedByName.toArray()); // Output: [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }, { name: 'Charlie', age: 35 }]
```

#### orderByDescending

Sorts the elements of a collection in descending order according to a key.

```typescript
const sortedByAgeDesc = people.orderByDescending((person) => person.age);
console.log(sortedByAgeDesc.toArray()); // Output: [{ name: 'Charlie', age: 35 }, { name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }]
```

#### groupBy

Groups the elements of a collection according to a specified key selector function.

```typescript
const groupedByAge = people.groupBy((person) => person.age);
console.log(groupedByAge);
// Output:
// {
// 25: [{ name: 'Bob', age: 25 }],
// 30: [{ name: 'Alice', age: 30 }],
// 35: [{ name: 'Charlie', age: 35 }]
// }
```

#### distinct

Returns distinct elements from a collection according to a specified key selector function.

```typescript
const distinctAges = people.distinct((person) => person.age);
console.log(distinctAges.toArray()); // Output: [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }, { name: 'Charlie', age: 35 }]
```

#### take

Returns a specified number of contiguous elements from the start of a collection.

```typescript
const firstTwo = people.take(2);
console.log(firstTwo.toArray()); // Output: [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }]
```

#### skip

Bypasses a specified number of elements in a collection and then returns the remaining elements.

```typescript
const skippedTwo = people.skip(2);
console.log(skippedTwo.toArray()); // Output: [{ name: 'Charlie', age: 35 }]
```

#### toArray

Converts the collection to an array.

```typescript
const array = people.toArray();
console.log(array); // Output: [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }, { name: 'Charlie', age: 35 }]
```

#### sum

Computes the sum of the sequence of numeric values that are obtained by invoking a transform function on each element of the input collection.

```typescript
const totalAge = people.sum((person) => person.age);
console.log(totalAge); // Output: 90
```

#### average

Computes the average of the sequence of numeric values that are obtained by invoking a transform function on each element of the input collection.

```typescript
const averageAge = people.average((person) => person.age);
console.log(averageAge); // Output: 30
```

#### any

Determines whether any element of a collection satisfies a condition.

```typescript
const hasAdults = people.any((person) => person.age >= 18);
console.log(hasAdults); // Output: true
```

#### all

Determines whether all elements of a collection satisfy a condition.

```typescript
const allAdults = people.all((person) => person.age >= 18);
console.log(allAdults); // Output: true
```

#### first

Returns the first element of a sequence that satisfies a specified condition or the first element if no condition is specified.

```typescript
const firstAdult = people.first((person) => person.age >= 30);
console.log(firstAdult); // Output: { name: 'Alice', age: 30 }
```

#### firstOrDefault

Returns the first element of a sequence that satisfies a specified condition or the first element if no condition is specified, or a default value if no such element is found.

```typescript
const firstYoungAdult = people.firstOrDefault((person) => person.age >= 20, {
  name: 'Default',
  age: 0,
});
console.log(firstYoungAdult); // Output: { name: 'Alice', age: 30 }
```

#### last

Returns the last element of a sequence that satisfies a specified condition or the last element if no condition is specified.

```typescript
const lastAdult = people.last((person) => person.age >= 30);
console.log(lastAdult); // Output: { name: 'Charlie', age: 35 }
```

#### lastOrDefault

Returns the last element of a sequence that satisfies a specified condition or the last element if no condition is specified, or a default value if no such element is found.

```typescript
const lastYoungAdult = people.lastOrDefault((person) => person.age >= 20, {
  name: 'Default',
  age: 0,
});
console.log(lastYoungAdult); // Output: { name: 'Charlie', age: 35 }
```

## Contributors

All contributors are welcome. Please create a pull request or issue.

## TODO

- [ ] Implement other queryable class for other data type like JSON and so on.
- [ ] Write thorough unit tests for every methods.
- [ ] Improve performance without using any other dependencies
- [ ] Write clear and self explanatory documentation

## License

This project is licensed under the [MIT License](./LICENSE).

---

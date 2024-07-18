import { Queryable } from '../src';

describe('Test Queryable class', () => {
  it('testing where query', () => {
    const data = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'Alice', age: 28 },
    ];

    const queryable = new Queryable(data);

    const result = queryable
      .where(person => person.age > 25)
      .toArray();

    expect(result.length).toEqual(3);
  });

  it('testing select query', () => {
    const data = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'Alice', age: 28 },
    ];

    const queryable = new Queryable(data);

    const result = queryable
      .where(person => person.id === 1)
      .select(person => ({ username: person.name }))
      .toArray();

    expect(result[0].username).toEqual("Alice");
  });

  it('testing orderBy query', () => {
    const data = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'Alice', age: 28 },
    ];

    const queryable = new Queryable(data);

    const result = queryable
      .orderBy(person => person.age)
      .toArray();

    expect(result[0].age).toEqual(25);
  });

  it('testing orderByDescending query', () => {
    const data = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'Alice', age: 28 },
    ];

    const queryable = new Queryable(data);

    const result = queryable
      .orderByDescending(person => person.age)
      .toArray();

    expect(result[0].age).toEqual(35);
  });

  it('testing groupBy query', () => {
    const data = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'Alice', age: 28 },
    ];

    const queryable = new Queryable(data);

    const result = queryable
      .groupBy(person => person.name);

    expect(result["Alice"].length).toEqual(2);
  });

  it('testing distinct query', () => {
    const data = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'Alice', age: 28 },
    ];

    const queryable = new Queryable(data);

    const result = queryable
      .distinct(person => person.name).toArray();

    expect(result.length).toEqual(3);
  });

  it('testing take query', () => {
    const data = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'Alice', age: 28 },
    ];

    const queryable = new Queryable(data);

    const result = queryable
      .take(2).toArray();

    expect(result.length).toEqual(2);
  });

  it('testing skip query', () => {
    const data = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'Alice', age: 28 },
    ];

    const queryable = new Queryable(data);

    const result = queryable
      .skip(2).toArray();

    expect(result[0].name).toEqual('Charlie');
  });

  it('testing sum query', () => {
    const data = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'Alice', age: 28 },
    ];

    const queryable = new Queryable(data);

    const result = queryable
      .sum(person => person.age);

    expect(result).toEqual(118);
  });

  it('testing average query', () => {
    const data = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'Alice', age: 28 },
    ];

    const queryable = new Queryable(data);

    const result = queryable
      .average(person => person.age);
    console.log(result);

    expect(result).toEqual(29.5);
  });

  it('testing first query', () => {
    const data = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'Alice', age: 28 },
    ];

    const queryable = new Queryable(data);

    const result = queryable
      .first();

    expect(result?.id).toEqual(1);
  });

  it('testing last query', () => {
    const data = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'Alice', age: 28 },
    ];

    const queryable = new Queryable(data);

    const result = queryable
      .last();

    expect(result?.id).toEqual(4);
  });

  it('testing firstOrDefault query', () => {
    const data = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'Alice', age: 28 },
    ];

    const queryable = new Queryable(data);

    const result = queryable
      .firstOrDefault(person => person.id === 5, {
        id: 5,
        name: "Jack",
        age: 60
      });

    expect(result?.name).toEqual("Jack");
  });

  it('testing lastOrDefault query', () => {
    const data = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'Alice', age: 28 },
    ];

    const queryable = new Queryable(data);

    const result = queryable
      .lastOrDefault(person => person.id === 5, {
        id: 5,
        name: "Jack",
        age: 60
      });

    expect(result?.name).toEqual("Jack");
  });

  it('testing lastOrDefault query', () => {
    const data = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'Alice', age: 28 },
    ];

    const queryable = new Queryable(data);

    const result = queryable
      .lastOrDefault(person => person.id === 5, {
        id: 5,
        name: "Jack",
        age: 60
      });

    expect(result?.name).toEqual("Jackk");
  });
});

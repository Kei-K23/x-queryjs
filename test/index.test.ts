import { Queryable } from '../src';

describe('Test Queryable class', () => {
  it('test for where query', () => {
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

  it('test for select query', () => {
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
});

// In this lesson we're going to implement a basic stack.
// The interfaces are given. Make sure the size cannot be modified from the
// outside.

// In JavaScript / TypeScript, we can declare getter functions using the
// following syntax:
//
// ```ts
// class MyClass {
//   get myProp (): number {
//     return 123;
//   }
// }
// ```
//
// The same works for setters, but we don't need them for this exercise.

interface IStack<T> {
  size: number;

  push(value: T): void;
  pop(): T;
  peek(): T;
  toArray(): Array<T>;
}

export class Stack<T> implements IStack<T> {
  array: Array<T>;

  constructor() {
    this.array = new Array<T>();
  }

  get size(): number {
    return this.array.length;
  }

  pop(): T {
    const top = this.array[0];
    this.array = this.array.slice(1);
    return top;
  }

  peek(): T {
    return this.array.length ? this.array[0] : null;
  }

  toArray(): T[] {
    return this.array;
  }
  push(value: T) {
    this.array = [value, ...this.array];
  }
}

interface IStackFrame<T> {
  value: T;
  next: IStackFrame<T>;
  toArray(): Array<T>;
}

class StackFrame {}

class LastStackFrame {}

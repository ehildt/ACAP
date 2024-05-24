import { challengeTraverseObject } from "./challenge-traverse-object.helper";

describe("challengeTraverseObject function", () => {
  it("should return null when input is undefined", () => {
    const result = challengeTraverseObject(undefined);
    expect(result).toBeNull();
  });

  it("should return null when input is null", () => {
    const result = challengeTraverseObject(null);
    expect(result).toBeNull();
  });

  it("should apply callback to a single value", () => {
    const mockCallback = (val: number) => val * 2;
    const result = challengeTraverseObject(5, mockCallback);
    expect(result).toBe(10);
  });

  it("should recursively apply callback to all values in an array", () => {
    const mockCallback = (val: string) => val.toUpperCase();
    const inputArray = ["apple", "banana", "cherry"];
    const expectedResult = ["APPLE", "BANANA", "CHERRY"];
    const result = challengeTraverseObject(inputArray, mockCallback);
    expect(result).toEqual(expectedResult);
  });

  it("should recursively apply callback to all values in a nested array", () => {
    const mockCallback = (val: number) => val * 2;
    const inputArray = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const expectedResult = [
      [2, 4],
      [6, 8],
      [10, 12],
    ];
    const result = challengeTraverseObject(inputArray, mockCallback);
    expect(result).toEqual(expectedResult);
  });

  it("should recursively apply callback to all values in an object", () => {
    const mockCallback = (val: number) =>
      typeof val === "number" ? val * 10 : val;

    const inputObject = {
      a: 5,
      b: {
        c: 10,
        d: "hello",
      },
      e: "world",
    };

    const expectedResult = {
      a: 50,
      b: {
        c: 100,
        d: "hello",
      },
      e: "world",
    };

    const result = challengeTraverseObject(inputObject, mockCallback);
    expect(result).toEqual(expectedResult);
  });

  it("should recursively apply callback to all values in a deeply nested object", () => {
    const mockCallback = (val: unknown) =>
      typeof val === "string" ? val.toUpperCase() : val;

    const inputObject = {
      a: {
        b: {
          c: "hello",
          d: "world",
        },
        e: {
          f: "foo",
          g: "bar",
        },
      },
      h: "baz",
    };

    const expectedResult = {
      a: {
        b: {
          c: "HELLO",
          d: "WORLD",
        },
        e: {
          f: "FOO",
          g: "BAR",
        },
      },
      h: "BAZ",
    };

    const result = challengeTraverseObject(inputObject, mockCallback);
    expect(result).toEqual(expectedResult);
  });
});

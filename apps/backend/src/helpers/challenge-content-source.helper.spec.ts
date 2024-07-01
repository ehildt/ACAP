import { challengeTraverseObject } from './challenge-traverse-object.helper';

describe('challengeTraverseObject', () => {
  it('should apply callback function to each value in the object', () => {
    const input = {
      key1: 'value1',
      key2: {
        nestedKey1: 'nestedValue1',
        nestedKey2: ['nestedArrayValue1', 'nestedArrayValue2', { deepNestedKey: 'deepNestedKey1' }],
        nestedKey3: false,
        nestedKey4: 4,
      },
    };

    const expectedOutput = {
      key1: '#1',
      key2: {
        nestedKey1: '#1',
        nestedKey2: ['#1', '#2', { deepNestedKey: '#1' }],
        nestedKey3: false,
        nestedKey4: 4,
      },
    };

    const mockCallback = jest.fn((val) => (typeof val === 'string' ? `#${val.slice(-1)}` : val));
    const result = challengeTraverseObject(input, mockCallback);
    expect(result).toEqual(expectedOutput);
    expect(mockCallback).toHaveBeenCalledTimes(7);
  });

  it('should handle arrays correctly', () => {
    const input = ['value1', { nestedKey: 'nestedValue2' }, ['nestedArrayValue3']];

    const expectedOutput = ['#1', { nestedKey: '#2' }, ['#3']];
    const mockCallback = jest.fn((val) => `#${val.slice(-1)}`);
    const result = challengeTraverseObject(input, mockCallback);
    expect(result).toEqual(expectedOutput);
    expect(mockCallback).toHaveBeenCalledTimes(3);
  });

  it('should return null if input is undefined or null', () => {
    expect(challengeTraverseObject(undefined, jest.fn())).toBeNull();
    expect(challengeTraverseObject(null, jest.fn())).toBeNull();
  });

  it('should return the original value if it is not an object or array', () => {
    const input = 'notAnObject';
    const mockCallback = jest.fn();
    const result = challengeTraverseObject(input, mockCallback);
    expect(result).toEqual(input);
    expect(mockCallback).toHaveReturnedWith(undefined);
  });
});

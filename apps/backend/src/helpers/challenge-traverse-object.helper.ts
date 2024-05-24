export function challengeTraverseObject(
  value: any,
  cb?: (val: unknown) => unknown,
) {
  if (value === undefined || value === null) return null;
  if (typeof value !== "object" && !Array.isArray(value))
    return cb?.(value) ?? value;

  if (Array.isArray(value))
    return value.map((item) => challengeTraverseObject(item, cb));

  if (typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [
        key,
        challengeTraverseObject(val, cb),
      ]),
    );
}

export const omit = (obj, ...keys) => {
  const keysToRemove = new Set(keys.flat()); // flatten the props, and convert to a Set

  return Object.fromEntries(
    // convert the entries back to object
    Object.entries(obj) // convert the object to entries
      .filter(([k]) => !keysToRemove.has(k)) // remove entries with keys that exist in the Set
  );
};

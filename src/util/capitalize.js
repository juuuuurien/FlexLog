export const capitalize = (word) => {
  if (word === "") return word;

  const _arr = word.trim().split(" ");
  const _sentence = _arr
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");

  return _sentence;
};

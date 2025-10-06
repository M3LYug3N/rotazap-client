export const pluralize = (
  count: number,
  [one, few, many]: [string, string, string]
) =>
  count % 10 === 1 && count % 100 !== 11
    ? one
    : count % 10 >= 2 &&
        count % 10 <= 4 &&
        (count % 100 < 10 || count % 100 >= 20)
      ? few
      : many;

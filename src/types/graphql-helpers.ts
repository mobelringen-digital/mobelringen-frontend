type TypeObject = { __typename?: string; [index: string]: unknown };

type FilterTypeByTypename<
  A extends TypeObject,
  Typename extends string | undefined,
> = A extends unknown ? (A["__typename"] extends Typename ? A : never) : never;

export function isTypename<
  T extends TypeObject,
  Typenames extends T["__typename"][],
>(
  type: FilterTypeByTypename<T, T["__typename"]>,
  typename: Typenames,
): type is FilterTypeByTypename<T, Typenames[number]> {
  return typename.includes(type.__typename);
}

export function findByTypename<
  T extends TypeObject,
  Typename extends T["__typename"],
>(
  type: (T | undefined | null)[] | undefined | null,
  typename: Typename,
): FilterTypeByTypename<T, Typename> | undefined {
  return type?.find(
    (item) => item?.__typename === typename,
  ) as FilterTypeByTypename<T, Typename>;
}

export function filterByTypename<
  T extends TypeObject,
  Typename extends T["__typename"],
>(
  type: (T | undefined | null)[] | undefined | null,
  typename: Typename,
): FilterTypeByTypename<T, Typename>[] | undefined {
  return type?.filter(
    (item) => item?.__typename === typename,
  ) as FilterTypeByTypename<T, Typename>[];
}

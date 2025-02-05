export type ArrayElement<ArrayType> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type NextSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export type NextServerComponentProps = {
  params: Promise<Record<string, string>>;
  searchParams: NextSearchParams;
};

export type MergeUnionByTypename<
    T extends { __typename: string }[],
    U extends { __typename: string }[],
> = {
    [K in (T[number] | U[number])["__typename"]]: Extract<
    T[number],
    { __typename: K }
> &
    Extract<U[number], { __typename: K }>;
}[(T[number] | U[number])["__typename"]];

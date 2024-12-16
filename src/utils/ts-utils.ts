export type ArrayElement<ArrayType> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type NextSearchParams = { [key: string]: string | string[] | undefined };

export type NextServerComponentProps = {
  params: Record<string, string>;
  searchParams: NextSearchParams;
};

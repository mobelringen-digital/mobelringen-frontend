export const isRangeFilter = (filterType: string) => {
  return filterType === "price";
};

export const isTextFilter = (filterType: string) => {
  return filterType === "text";
};

export const isSelectFilter = (filterType: string) => {
  return filterType === "select";
};

export const isBooleanFilter = (filterType: string) => {
  return filterType === "boolean";
};

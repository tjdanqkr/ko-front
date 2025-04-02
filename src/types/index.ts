export type Page<Type> = {
  content: Type[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};

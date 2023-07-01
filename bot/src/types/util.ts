export type RemoveArrayKeys<T> = {
  [K in keyof T as T[K] extends Array<unknown> ? never : K]: RemoveArrayKeys<
    T[K]
  >;
};

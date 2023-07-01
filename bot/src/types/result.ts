export type Ok<T> = {
  ok: true;
  data: T;
};

export type Err<E extends Error> = {
  ok: false;
  error: E;
};

export type Result<T, E extends Error> = Ok<T> | Err<E>;

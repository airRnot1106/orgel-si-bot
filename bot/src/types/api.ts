export type ApiActionResponse200<T> = {
  status: 200;
  data: T;
};

export type ApiActionResponse400 = {
  status: 400;
  error: {
    message: string;
  };
};

export type ApiActionResponse500 = {
  status: 500;
  error: {
    message: string;
  };
};

export type ApiAction<T> =
  | ApiActionResponse200<T>
  | ApiActionResponse400
  | ApiActionResponse500;

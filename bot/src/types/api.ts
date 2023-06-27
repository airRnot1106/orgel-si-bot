export type ApiActionOk<T> = {
  status: 200;
  data: T;
};

export type ApiActionErr = {
  status: 500;
  error: {
    message: string;
  };
};

export type ApiAction<T> = ApiActionOk<T> | ApiActionErr;

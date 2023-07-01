import type {
  ApiActionResponse200,
  ApiActionResponse400,
  ApiActionResponse500,
} from '@/types/api';

export const createApiActionResponse200 = <T>(
  data: T
): ApiActionResponse200<T> => ({
  status: 200,
  data,
});

export const createApiActionResponse400 = (
  message: string
): ApiActionResponse400 => ({
  status: 400,
  error: {
    message,
  },
});

export const createApiActionResponse500 = (
  message: string
): ApiActionResponse500 => ({
  status: 500,
  error: {
    message,
  },
});

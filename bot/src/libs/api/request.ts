import type { RequestWithRelations } from '@/schema/generated/prisma';
import type { ApiAction } from '@/types/api';
import type { RemoveArrayKeys } from '@/types/util';

import prisma from '@/libs/prisma';
import {
  createApiActionResponse200,
  createApiActionResponse500,
} from '@/utils/api';

type RequestFull = RemoveArrayKeys<RequestWithRelations>;

export const fetchRequest = async (args: {
  requestId: string;
}): Promise<ApiAction<RequestFull | null>> => {
  try {
    const { requestId } = args;
    const request = await prisma.request.findUnique({
      where: {
        id: requestId,
      },
      include: {
        video: {
          include: {
            channel: true,
          },
        },
        requestedBy: true,
      },
    });

    return createApiActionResponse200(request);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal Server Error';
    return createApiActionResponse500(message);
  }
};

export const fetchRequests = async (args: {
  limit: number;
}): Promise<ApiAction<RequestFull[]>> => {
  try {
    const { limit } = args;

    const requests = await prisma.request.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        video: {
          include: {
            channel: true,
          },
        },
        requestedBy: true,
      },
    });

    return createApiActionResponse200(requests);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal Server Error';
    return createApiActionResponse500(message);
  }
};

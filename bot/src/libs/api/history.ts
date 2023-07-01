import type { HistoryWithRelations } from '@/schema/generated/prisma';
import type { ApiAction } from '@/types/api';
import type { RemoveArrayKeys } from '@/types/util';

import prisma from '@/libs/prisma';
import {
  createApiActionResponse200,
  createApiActionResponse500,
} from '@/utils/api';

export const fetchHistory = async (args: {
  historyId: string;
}): Promise<ApiAction<RemoveArrayKeys<HistoryWithRelations>[]>> => {
  try {
    const { historyId } = args;

    const history = await prisma.history.findUnique({
      where: {
        id: historyId,
      },
      include: {
        request: {
          include: {
            video: {
              include: {
                channel: true,
              },
            },
            requestedBy: true,
          },
        },
      },
    });

    return createApiActionResponse200(history ? [history] : []);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal Server Error';
    return createApiActionResponse500(message);
  }
};

export const fetchHistories = async (args: {
  limit?: number | undefined;
}): Promise<ApiAction<RemoveArrayKeys<HistoryWithRelations>[]>> => {
  try {
    const { limit = 100000 } = args;

    const histories = await prisma.history.findMany({
      take: limit,
      orderBy: {
        playedAt: 'desc',
      },
      include: {
        request: {
          include: {
            video: {
              include: {
                channel: true,
              },
            },
            requestedBy: true,
          },
        },
      },
    });

    return createApiActionResponse200(histories);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal Server Error';
    return createApiActionResponse500(message);
  }
};

export const createHistory = async (args: {
  requestId: string;
}): Promise<ApiAction<RemoveArrayKeys<HistoryWithRelations>>> => {
  try {
    const { requestId } = args;

    const history = await prisma.history.create({
      data: {
        request: {
          connect: {
            id: requestId,
          },
        },
      },
      include: {
        request: {
          include: {
            video: {
              include: {
                channel: true,
              },
            },
            requestedBy: true,
          },
        },
      },
    });

    return createApiActionResponse200(history);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal Server Error';
    return createApiActionResponse500(message);
  }
};

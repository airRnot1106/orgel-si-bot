import type {
  Channel,
  Queue,
  QueueWithRelations,
  User,
  Video,
} from '@/schema/generated/prisma';
import type { ApiAction } from '@/types/api';

import prisma from '@/libs/prisma';
import {
  createApiActionResponse200,
  createApiActionResponse500,
} from '@/utils/api';

export const fetchQueue = async (): Promise<
  ApiAction<QueueWithRelations[]>
> => {
  try {
    await prisma.queue.deleteMany({
      where: {
        order: {
          lt: 0,
        },
      },
    });

    const queue = await prisma.queue.findMany({
      orderBy: {
        order: 'asc',
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
            History: true,
            Queue: {
              include: {
                request: true,
              },
            },
          },
        },
      },
    });

    return createApiActionResponse200(queue);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal Server Error';
    return createApiActionResponse500(message);
  }
};

const createQueue = async (args: {
  order: number;
  user: User;
  channel: Channel;
  video: Video;
}): Promise<QueueWithRelations> => {
  const { order, user, channel, video } = args;

  const queue = await prisma.queue.create({
    data: {
      order,
      request: {
        create: {
          video: {
            connectOrCreate: {
              where: {
                id: video.id,
              },
              create: {
                id: video.id,
                title: video.title,
                description: video.description,
                url: video.url,
                channel: {
                  connectOrCreate: {
                    where: {
                      id: channel.id,
                    },
                    create: {
                      id: channel.id,
                      name: channel.name,
                      user: channel.user,
                      url: channel.url,
                    },
                  },
                },
              },
            },
          },
          requestedBy: {
            connectOrCreate: {
              where: {
                id: user.id,
              },
              create: {
                id: user.id,
                name: user.name,
              },
            },
          },
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
          History: true,
          Queue: {
            include: {
              request: true,
            },
          },
        },
      },
    },
  });

  return queue;
};

export const pushToQueue = async (args: {
  user: User;
  channel: Channel;
  video: Video;
}): Promise<ApiAction<QueueWithRelations>> => {
  try {
    const { user, channel, video } = args;
    const lastOrder = await prisma.queue
      .findFirst({
        orderBy: {
          order: 'desc',
        },
      })
      .then((queue) => queue?.order ?? 0);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const queue = await createQueue({
      order: lastOrder + 1,
      user,
      channel,
      video,
    });

    return createApiActionResponse200(queue);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal Server Error';
    return createApiActionResponse500(message);
  }
};

export const interruptToQueue = async (args: {
  user: User;
  channel: Channel;
  video: Video;
}): Promise<ApiAction<QueueWithRelations>> => {
  try {
    await prisma.queue.updateMany({
      data: {
        order: {
          increment: 1,
        },
      },
      where: {
        order: {
          gte: 1,
        },
      },
    });

    const { user, channel, video } = args;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const queue = await createQueue({
      order: 1,
      user,
      channel,
      video,
    });

    return createApiActionResponse200(queue);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal Server Error';
    return createApiActionResponse500(message);
  }
};

export const decreaseOrder = async (): Promise<ApiAction<Queue[]>> => {
  try {
    await prisma.queue.updateMany({
      data: {
        order: {
          decrement: 1,
        },
      },
    });

    await prisma.queue.deleteMany({
      where: {
        order: {
          lt: 0,
        },
      },
    });

    const queue = await prisma.queue.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return createApiActionResponse200(queue);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal Server Error';
    return createApiActionResponse500(message);
  }
};

export const fetchCurrentVideo = async (): Promise<
  ApiAction<{
    video: Video;
    requestedBy: User;
  } | null>
> => {
  try {
    const zeroOrder = await prisma.queue.findFirst({
      where: {
        order: 0,
      },
      select: {
        request: {
          select: {
            video: true,
            requestedBy: true,
          },
        },
      },
    });
    if (!zeroOrder) return createApiActionResponse200(null);

    const currentVideo = zeroOrder.request.video;
    const { requestedBy } = zeroOrder.request;

    return createApiActionResponse200({ video: currentVideo, requestedBy });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal Server Error';

    return createApiActionResponse500(message);
  }
};

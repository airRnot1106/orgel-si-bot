import type { LanguageType } from '@/schema/generated/prisma';
import type { ApiAction } from '@/types/api';

import prisma from '@/libs/prisma';

export const fetchSettings = async (): Promise<
  ApiAction<{ language: LanguageType }>
> => {
  try {
    const settings = await prisma.setting.findUnique({
      where: {
        key: 'SETTING',
      },
    });
    if (!settings) throw new Error('Settings not found');

    const status = 200;
    const data = {
      language: settings.language,
    };

    return {
      status,
      data,
    };
  } catch (e) {
    const status = 500;
    const error = {
      message: e instanceof Error ? e.message : 'Internal Server Error',
    };

    return {
      status,
      error,
    };
  }
};

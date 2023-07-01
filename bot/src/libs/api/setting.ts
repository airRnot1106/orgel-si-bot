import type { LanguageType, Setting } from '@/schema/generated/prisma';
import type { ApiAction } from '@/types/api';

import prisma from '@/libs/prisma';
import {
  createApiActionResponse200,
  createApiActionResponse500,
} from '@/utils/api';

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

export const fetchLanguage = async (): Promise<
  ApiAction<Pick<Setting, 'language'>>
> => {
  try {
    const settings = await prisma.setting.findUnique({
      where: {
        key: 'SETTING',
      },
    });
    if (!settings) throw new Error('Settings not found');

    const { language } = settings;

    return createApiActionResponse200({ language });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal Server Error';

    return createApiActionResponse500(message);
  }
};

export const updateLanguage = async (
  args: Pick<Setting, 'language'>
): Promise<ApiAction<Pick<Setting, 'language'>>> => {
  try {
    const settings = await prisma.setting.update({
      where: {
        key: 'SETTING',
      },
      data: args,
    });

    const { language } = settings;

    return createApiActionResponse200({ language });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal Server Error';

    return createApiActionResponse500(message);
  }
};

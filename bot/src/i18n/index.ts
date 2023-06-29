import type { LanguageType } from '@/schema/generated/prisma';

import en from '@/i18n/en';
import ja from '@/i18n/ja';

export interface IMessages {
  hello: {
    description: () => string;
    content: () => string;
  };
  settings: {
    not_found: () => string;
  };
}

const messages = {
  EN: en,
  JA: ja,
} as const satisfies Record<LanguageType, IMessages>;

export class I18n {
  static t(language: LanguageType) {
    return messages[language];
  }
}
